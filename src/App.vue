<template>
  <div id="app">
    <video
      v-if="typeof store.weather.data == 'undefined'"
      class="start-video"
      src="./assets/nature.mp4"
      autoplay
      loop
      preload="auto"
      muted
      type="video/mp4"
    ></video>
    <Background
      v-if="typeof store.weather.data != 'undefined'"
      class="background"
    />
    <main>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Search for your city..."
          v-model="query"
          @keypress.enter="getWeather"
        />
        <FindLocation class="location-icon" title="Share location" />
        <i @click="getWeather" class="fas fa-search"></i>
      </div>
      <div v-if="typeof store.weather.data != 'undefined'" class="weather-box">
        <div class="location">
          <span class="city">{{ store.weather.city_name }}</span
          >,
          {{ store.weather.country_code }}
        </div>
        <div class="date">
          <span class="day">Today</span> {{ store.getCurrentDate() }}
        </div>
        <div class="temp">
          {{ Math.floor(store.weather.data[0].temp)
          }}<span class="degrees">°C</span>
        </div>
        <div class="weather">
          {{ store.weather.data[0].weather.description }}
        </div>
      </div>
      <DailyForecast
        class="daily-forecast"
        v-if="typeof store.weather.data != 'undefined'"
      />
    </main>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "@/store/index";
import Background from "@/components/Background.vue";
import FindLocation from "@/components/FindLocation.vue";
import DailyForecast from "@/components/DailyForecast.vue";

export default {
  name: "App",
  components: {
    Background,
    FindLocation,
    DailyForecast,
  },

  setup() {
    const store = useStore();
    const query = ref("");

    async function getWeather() {
      if (query.value != "") {
        try {
          let response = await fetch(
            `${store.api_base}?city=${query.value}&days=8&key=${store.api_key}`
          );
          store.weather = await response.json();
        } catch (error) {
          alert(error);
        }

        store.setBackground();
        query.value = "";
      }
    }

    return {
      store,
      query,
      getWeather,
    };
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

body {
  font-family: "Montserrat", sans-serif;
}

#app {
  position: relative;

  .start-video {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: -1;
  }

  .background {
    position: absolute;
    z-index: -1;
  }

  main {
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.4)
    );
    min-height: 100vh;
    padding: 30px;

    .search-box {
      position: relative;
      margin: 0 auto;
      margin-bottom: 40px;
      width: 100%;
      max-width: 700px;

      .search-bar {
        width: 100%;
        padding: 13px 25px;
        padding-right: 92px;
        font-size: 15px;
        outline: none;
        border: none;
        background: none;
        background-color: #fff;
        color: rgb(56, 56, 56);
        border-radius: 40px;
      }

      .location-icon {
        padding: 8px;
        position: absolute;
        top: 13%;
        right: 56px;
        color: rgb(55, 110, 182);
        font-size: 18px;
        cursor: pointer;
      }

      .fa-search {
        padding: 8px;
        position: absolute;
        top: 13%;
        right: 18px;
        color: rgb(55, 110, 182);
        font-size: 18px;
        cursor: pointer;
      }
    }

    .weather-box {
      margin-bottom: 30px;
      text-align: center;
      color: #fff;

      > * {
        margin-bottom: 8px;
      }

      .location {
        font-size: 25px;
        font-weight: 400;

        .city {
          font-weight: 500;
        }
      }

      .date {
        font-size: 15px;
        color: rgba(255, 255, 255, 0.75);

        .day {
          margin-top: 30px;
          margin-bottom: 8px;
          display: block;
          font-size: 35px;
          font-weight: 700;
          color: #fff;
        }
      }

      .temp {
        margin-top: 20px;
        margin-bottom: 0;
        font-size: 80px;
        font-weight: 700;

        .degrees {
          display: inline-block;
          margin-top: 14px;
          font-size: 30px;
          font-weight: 400;
          vertical-align: top;
        }
      }

      .weather {
        font-size: 20px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.75);
      }
    }
  }

  .daily-forecast {
    margin: 0 -30px;
  }
}
</style>
