<template>
  <i class="fas fa-map-marker-alt" @click="findLocation"></i>
</template>

<script>
import { ref } from "vue";
import { useWeatherState } from "@/store/weatherState";
import { useConstants } from "@/store/constants";

export default {
  name: "FindLocation",

  setup() {
    const weatherState = useWeatherState();
    const constants = useConstants();
    const lat = ref();
    const lon = ref();

    async function success(position) {
      lat.value = position.coords.latitude;
      lon.value = position.coords.longitude;

      try {
        let response = await fetch(
          `${constants.api_base}?lat=${lat.value}&lon=${lon.value}&days=8&key=${constants.api_key}`
        );
        weatherState.setWeather(await response.json());
      } catch (err) {
        alert(err);
      }
    }

    function error() {
      alert("ERROR: Unable to retrieve your location");
    }

    function findLocation() {
      if (navigator.geolocation) {
        // checking if browser supports geolocation
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        alert("Your browser doesn't support Geolocation.");
      }
    }

    return {
      findLocation,
    };
  },
};
</script>
