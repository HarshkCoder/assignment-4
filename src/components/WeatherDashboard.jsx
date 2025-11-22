import { Loader, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

const WeatherDashboard = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const API_KEY = "a0e2cd6867a34cd65092c02ac9c35a77";

    const getWeather = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            const data = await response.json();
            setWeather(data);
        } catch (error) {
            alert("Some error occured", error);
        }
        setLoading(false);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (city.trim() !== "") getWeather();
        }, 5 * 60000);

        return () => clearInterval(interval);
    }, [city]);

    useEffect(() => {
        if (weather && weather.main) {
            document.title = `${weather.main.temp}°C - Weather App`;
        }
    }, [weather]);

    return (
        <div className="p-6 text-center select-none">
            <div className="flex justify-center items-center gap-2">
                <input
                    type="text"
                    placeholder="Enter city"
                    className="border p-2 rounded"
                    onChange={(e) => setCity(e.target.value)}
                />
                <button
                    onClick={getWeather}
                    className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-600 hover:cursor-pointer transition"
                >
                    Search
                </button>

                <div onClick={getWeather} className="hover:cursor-pointer">
                    <RefreshCcw className="size-5" />
                </div>
            </div>

            {loading && (
                <div className="flex justify-center items-center h-[40vh]">
                    <Loader className="size-8 text-blue-500 animate-spin" />
                </div>
            )}
            {(!loading && weather) && (
                <div className="mt-4 text-lg flex flex-col justify-center items-center">
                    <div className="">{weather.name}</div>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt="weather icon"
                        className="w-24 h-24"
                    />
                    <p>🌡 Temperature: {weather.main.temp}°C</p>
                    <p>🌤 Condition: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    )
}

export default WeatherDashboard
