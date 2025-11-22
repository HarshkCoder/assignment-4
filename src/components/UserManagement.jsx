import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      alert("Some error occured", error);
    }
    setLoading(false);
  };

  const goBack = () => {
    setSelectedUser(null);
    setUserPosts([]);
  };

  const fetchUserPost = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}/posts`
      );
      const data = await response.json();
      setUserPosts(data);
      setSelectedUser(id);
    } catch (error) {
      alert("Some error occured", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const term = search.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phone.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {!selectedUser && (
        <input
          type="text"
          placeholder="Search user..."
          className="border p-2 mb-4 w-[300px] rounded"
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {loading && (
        <div className="flex justify-center items-center">
          <Loader className="size-8 text-blue-600 animate-spin" />
        </div>
      )}

      {!loading && selectedUser && (
        <div className="w-[400px] mx-auto">
          <button
            onClick={goBack}
            className="mb-4 w-full bg-blue-600 text-white py-2 rounded"
          >
            ← Back to Users
          </button>

          <h2 className="text-xl font-semibold mb-2">Posts</h2>

          {userPosts.map((post) => (
            <div key={post.id} className="border p-3 rounded mb-2">
              <h3 className="font-bold">{post.title}</h3>
              <p className="text-sm mt-1">{post.body}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && !selectedUser && (
        <ul className="text-left mx-auto w-[300px]">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <li
                key={user.id}
                onClick={() => fetchUserPost(user.id)}
                className="border p-2 rounded mb-2 hover:bg-gray-100 cursor-pointer transition"
              >
                <p>
                  <strong>{user.name}</strong>
                </p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
              </li>
            ))
          ) : (
            <p className="mt-4 text-gray-500">No users found</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default UserManagement;
