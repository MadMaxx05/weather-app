<template>
  <h2 class="daily-forecast-title">Next 7 days</h2>
  <swiper
    class="daily-forecast"
    :slidesPerView="1.5"
    :spaceBetween="17"
    :freeMode="true"
    :breakpoints="{
      '375': {
        slidesPerView: 2,
      },
      '420': {
        slidesPerView: 2.5,
      },
      '500': {
        slidesPerView: 3,
      },
      '650': {
        slidesPerView: 4,
      },
      '800': {
        slidesPerView: 5,
      },
      '1000': {
        slidesPerView: 6.5,
      },
    }"
    :modules="modules"
  >
    <swiper-slide
      v-for="item in store.weather.data.slice(1)"
      :key="item.id"
      class="daily-forecast-item"
    >
      <p>{{ getDate(item.datetime) }}</p>
      <img
        class="weather-icon"
        :src="require(`@/assets/icons/${store.setIcon(item.weather.code)}`)"
        width="75"
        height="75"
      />
      <p class="temp">
        {{ Math.floor(item.temp) }}<span class="degrees">°C</span>
      </p>
    </swiper-slide>
  </swiper>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue.js";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";

// Import required modules
import { FreeMode } from "swiper";

import { useStore } from "@/store/index";

export default {
  name: "DailyForecast",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const store = useStore();

    function getDate(date) {
      let fullDate = new Date(date).toDateString();
      let splitDate = fullDate.split(" ");

      return `${splitDate[0]}, ${splitDate[1]} ${splitDate[2]}`;
    }

    return {
      modules: [FreeMode],
      store,
      getDate,
    };
  },
};
</script>

<style lang="scss" scoped>
.daily-forecast-title {
  font-size: 25px;
  color: #fff;
  font-weight: 500;
  margin-bottom: 25px;
}

.daily-forecast {
  padding: 0 30px;

  &-item {
    padding: 18px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    //min-width: 135px !important;
    background-color: #fff;
    border-radius: 25px;

    .weather-icon {
      margin: 20px 0;
      user-select: none;
      -webkit-user-select: none;
      pointer-events: none;
    }

    .temp {
      font-size: 22px;
      font-weight: 700;
      color: rgb(102, 102, 102);

      .degrees {
        display: inline-block;
        margin-top: 3px;
        font-size: 13px;
        vertical-align: top;
      }
    }
  }
}
</style>
