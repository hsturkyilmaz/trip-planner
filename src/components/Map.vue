<template>
  <div class="map">
    <div class="map-top d-flex">
      <div class="inputs d-flex flex-column">
        <h3>🏁 Başlangıç Noktası</h3>
        <div class="d-flex flex-start">
          <GmapAutocomplete @place_changed="setPlace" :value="search" />
          <button class="btn" @click="addMarker(0), showSelection(0), clearField()">Ekle</button>
          <div class="js-origin-info"></div>
        </div>
        <h3>📍 Varış Noktası</h3>
        <div class="d-flex flex-start">
          <GmapAutocomplete @place_changed="setPlace" :value="search" />
          <button class="btn" @click="addMarker(1), showSelection(1), clearField()">Ekle</button>
          <div class="js-destination-info"></div>
        </div>
        <h3>👥 Yolcu Bilgileri</h3>
        <input placeholder="Yolcu ismi girin" class="pac-target-input text" v-model="newPassenger"/>
        <div class="d-flex flex-start">
          <GmapAutocomplete @place_changed="setPlace" :value="search" />
          <button class="btn" @click="addMarker(2), addPassenger(), showSelection(2), clearField()">Ekle</button>
          <div class="js-passenger-info"></div>
        </div>
      </div>
      <div class="table">
        <h3>🚍 Yolcular</h3>
        <ul class="passenger-table">
          <li v-for="(passenger, index)  in passengers" v-bind:key="(passenger, index)">#️⃣ {{index+1}} <br> 👥 {{passenger}} <br> 🚏 {{waypoints[index].location}}</li>
        </ul>
      </div>
    </div>
    <br />
    <GmapMap class="google-maps" :zoom="10" :center="center">
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
      passengers: [],
      newPassenger: ''
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
    },
    clearField() {
      this.search = null
    },
    showSelection(index) {
      if (index === 0) {
        document.querySelector(".js-origin-info").innerHTML = `✔️ ${this.currentPlace.name}`;
        document.querySelector(".js-origin-info").classList.add("info");
      }
      if (index === 1) {
        document.querySelector(".js-destination-info").innerHTML = `✔️ ${this.currentPlace.name}`;
        document.querySelector(".js-destination-info").classList.add("info");
      }
      if (index === 2) {
        document.querySelector(".js-passenger-info").innerHTML = `➕ ${this.currentPlace.name}`;
        document.querySelector(".js-passenger-info").classList.add("info");
      }
    },
    addPassenger(){
      this.passengers.push(this.newPassenger);
      this.newPassenger = "";
    }
  },
};
</script>

<style scoped>

.map {
  padding: 1rem;
}

.map-top {
  gap: 1rem;
}

.inputs {
  padding: 1.5rem;
  width: 50%;
  height: 27rem;
  gap: 1rem;
  background-color: #f1f2f6;
}

.pac-target-input {
  padding: 1rem;
  width: 60%;
  font-size: 1rem;
  border-radius: 0.25rem;
  border: 0.125rem solid #7bed9f;
}

.btn {
  margin-left: 1.5rem;
  padding: 1rem 1.5rem;
  background-color: #7bed9f;
  color: #fff;
  border: 0.125rem solid #7bed9f;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.btn:hover {
  background-color: #2ed573;
}

.info {
  margin-left: 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  width: 20%;
  height: auto;
  background-color: #ffc048;
  color: #fff;
  border-radius: 0.25rem;
  padding: 0.5rem;
}

.google-maps {
  width: 100%;
  height: 25rem;
}

.table {
  padding: 1.5rem;
  width: 50%;
  height: 27rem;
  gap: 1rem;
  background-color: #f1f2f6;
  overflow-y: scroll;
}

.passenger-table {
  list-style: none;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
}

.passenger-table li {
  border: 0.125rem dashed black;
  padding: 0.5rem;
}

</style>
