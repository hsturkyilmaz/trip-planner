<template>
  <div class="map">
    <div class="table">
      <div>
        <h3>Start Location</h3>
        <GmapAutocomplete @place_changed="setPlace" />
        <button class="btn" @click="addMarker(0)">Add</button>
      </div>
      <div>
        <h3>End Location</h3>
        <GmapAutocomplete @place_changed="setPlace" />
        <button class="btn" @click="addMarker(1)">Add</button>
      </div>
      <div>
        <h3>Waypoints</h3>
        <GmapAutocomplete @place_changed="setPlace" :value="search"/>
        <button class="btn" @click="addMarker(2), clearField()">Add</button>
      </div>
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

.table {
  padding: 1rem;
}

.pac-target-input {
  padding: 1rem;
  width: 25rem;
}

.btn {
  margin-left: 20px;
  padding: 10px 20px;
  background-color: greenyellow;
}

</style>
