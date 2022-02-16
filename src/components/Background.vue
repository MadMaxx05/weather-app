<template>
  <div :class="store.backgroundClass"></div>
</template>

<script>
import { useStore } from "@/store/index";

export default {
  name: "Background",

  setup() {
    const store = useStore();

    return {
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
div {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

.clear {
  background-image: url("../assets/clear.jpg");
}

.clouds {
  background-image: url("../assets/clouds.jpg");
}

.rain {
  background-image: url("../assets/rain.jpg");
}

.thunderstorm {
  background-image: url("../assets/thunderstorm.jpg");
}

.snow {
  background-image: url("../assets/snow.jpg");
}
</style>
