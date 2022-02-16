import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => {
    return {
      api_key: "8ccfe5800bc04907b9665205455b53f4",
      api_base: "https://api.weatherbit.io/v2.0/forecast/daily",
      weather: {},
      backgroundClass: "",
    };
  },

  actions: {
    setBackground() {
      if (
        this.weather.data[0].weather.code >= 200 &&
        this.weather.data[0].weather.code <= 233
      )
        this.backgroundClass = "thunderstorm";
      else if (
        this.weather.data[0].weather.code >= 300 &&
        this.weather.data[0].weather.code <= 522
      )
        this.backgroundClass = "rain";
      else if (
        this.weather.data[0].weather.code >= 600 &&
        this.weather.data[0].weather.code <= 622
      )
        this.backgroundClass = "snow";
      else if (this.weather.data[0].weather.code == 800)
        this.backgroundClass = "clear";
      else if (
        this.weather.data[0].weather.code >= 801 &&
        this.weather.data[0].weather.code <= 804
      )
        this.backgroundClass = "clouds";
    },

    getCurrentDate() {
      let fullDate = new Date();
      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      let day = days[fullDate.getDay()];
      let month = months[fullDate.getMonth()];
      let date = fullDate.getDate();
      let year = 1900 + fullDate.getYear();

      return `${day}, ${month} ${date}, ${year}`;
    },

    setIcon(weatherCode) {
      if (weatherCode >= 200 && weatherCode <= 233) return "thunderstorm.png";
      else if (weatherCode >= 300 && weatherCode <= 522) return "rain.png";
      else if (weatherCode >= 600 && weatherCode <= 622) return "snow.png";
      else if (weatherCode == 800) return "clear.png";
      else if (weatherCode >= 801 && weatherCode <= 804) return "clouds.png";
    },
  },
});
