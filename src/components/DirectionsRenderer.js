import { MapElementFactory } from "vue2-google-maps";

export default MapElementFactory({
  name: "directionsRenderer",

  ctr() {
    return window.google.maps.DirectionsRenderer;
  },

  events: [],

  mappedProps: {},

  props: {
    origin: { type: [Object, Array] },
    destination: { type: [Object, Array] },
    travelMode: { type: String },
    waypoints: { type: [Object, Array] },
  },

  afterCreate(directionsRenderer) {
    let directionsService = new window.google.maps.DirectionsService();

    this.$watch(
      () => [this.origin, this.destination, this.travelMode, this.waypoints],
      () => {
        
        let { origin, destination, travelMode, waypoints } = this;
        if (!origin || !destination || !travelMode || !waypoints) return;
        directionsService.route(
          {
            origin,
            destination,
            travelMode,
            waypoints,
            optimizeWaypoints: true,
          },
          (response, status) => {
            if (status !== "OK") return;
            // eslint-disable-next-line no-debugger
            debugger
            directionsRenderer.setDirections(response);
          }
        );
      }
    );
  },
});