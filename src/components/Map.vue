<template>
  <div class="map">
    <h2>Trip Planner</h2>
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
          <th><GmapAutocomplete @place_changed="setPlace" :value="search"/></th>
          <th><button class="btn" @click="addMarker(2), clearField()">Add</button></th>
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
      <GmapMarker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
      >
      </GmapMarker>
    </GmapMap>
  </div>
</template>

<script>
import DirectionsRenderer from "@/components/DirectionsRenderer";

export default {
  name: 'Map',
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
      search: null,
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
      if (index === 0) {this.startLocation = marker;
        this.markers.push({
          position: {
            lat: this.currentPlace.geometry.location.lat(),
            lng: this.currentPlace.geometry.location.lng(),
          }
        });
      }
      if (index === 1) {this.endLocation = marker;
        this.markers = [];
      }
      if (index === 2) {this.waypoints.push({
          location: this.currentPlace.name,
          stopover: true,
        });
      }
      this.center = marker;
      document.querySelector(".info").innerHTML = `${this.currentPlace.name} eklendi.` //TODO: bla bla added.
    },
    clearField () {
      this.search = null
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
