document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("cityInput");
  const btn = document.getElementById("searchBtn");
  const weatherCard = document.getElementById("weatherCard");
  const cityNameEl = document.getElementById("cityName");
  const tempEl = document.getElementById("temp");
  const descEl = document.getElementById("description");
  const iconEl = document.getElementById("weatherIcon");

  async function getWeather(city) {
    const apiKey = "43c07e23aa73d6c3af9aca57a7e3813b"; // Your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
      btn.disabled = true;
      cityNameEl.textContent = "Loading...";
      weatherCard.style.display = "block";

      const resp = await fetch(url);
      if (resp.status === 401) throw new Error("Invalid API key.");
      if (resp.status === 404) throw new Error("City not found.");
      if (!resp.ok) throw new Error(`Network error: ${resp.status}`);

      const data = await resp.json();

      const temp = Math.round(data.main.temp);
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;

      cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
      tempEl.textContent = `${temp}°C`;
      descEl.textContent = description;
      iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      iconEl.alt = description;

    } catch (err) {
      cityNameEl.textContent = err.message;
      tempEl.textContent = "";
      descEl.textContent = "";
      iconEl.src = "";
      weatherCard.style.display = "block";
    } finally {
      btn.disabled = false;
    }
  }

  function doSearch() {
    const city = input.value.trim();
    if (city) getWeather(city);
    else alert("Please enter a city name");
  }

  btn.addEventListener("click", doSearch);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearch();
  });
});
