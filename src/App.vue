<template>
  <div id="app">
    <h2>Routes Google Maps</h2>
    <div>
      <table>
        <tr>
          <th>Start Location</th>
          <th><GmapAutocomplete @place_changed="setPlace" /></th>
          <th><button class="btn" @click="addMarker(0)">Add</button></th>
        </tr>
        <tr>
          <th>End Location</th>
          <th><GmapAutocomplete @place_changed="setPlace" /></th>
          <th><button class="btn" @click="addMarker(1)">Add</button></th>
        </tr>
        <tr>
          <th>Waypoints</th>
          <th><GmapAutocomplete @place_changed="setPlace" /></th>
          <th><button class="btn" @click="addMarker(2)">Add</button></th>
        </tr>
      </table>
      <div class="info"></div>
    </div>
    <br />
    <GmapMap :zoom="10" :center="center" style="width: 100%; height: 400px">
      <DirectionsRenderer
        travelMode="DRIVING"
        :origin="startLocation"
        :destination="endLocation"
        :waypoints="waypoints"
        :markers="markers"
      />
    </GmapMap>
  </div>
</template>

<script>
import DirectionsRenderer from "@/components/DirectionsRenderer";

export default {
  name: "App",
  components: {
    DirectionsRenderer,
  },
  data() {
    return {
      center: { lat: 41.015, lng: 28.979 },
      currentPlace: null,
      markers: [],
      places: [],
      startLocation: null,
      endLocation: null,
      waypoints: [],
    };
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker(index) {
      const marker = {
        lat: this.currentPlace.geometry.location.lat(),
        lng: this.currentPlace.geometry.location.lng(),
      };
      if (index === 0) this.startLocation = marker;
      if (index === 1) this.endLocation = marker;
      if (index === 2) this.waypoints.push({
        location: this.currentPlace.name,
        stopover: true,
      });
      this.center = marker;
      document.querySelector(".info").innerHTML = `${this.currentPlace.name} eklendi.` //TODO: bla bla added.
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.pac-target-input {
  padding: 10px;
  width: 400px;
}

.btn {
  margin-left: 20px;
  padding: 10px 20px;
  background-color: greenyellow;
}
</style>