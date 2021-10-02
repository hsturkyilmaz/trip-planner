<template>
  <div id="app">
    <Map />
  </div>
</template>

<script>
import Map from "@/components/Map"

export default {
  name: "App",
  components: {
    Map,
  }
};
</script>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>