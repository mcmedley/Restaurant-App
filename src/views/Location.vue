<template>
  <v-app>
    <v-content>
      <v-container>
        <v-layout row>
          <v-flex xs5>
            <v-text-field
              outlined
              label="Location"
              placeholder=" "
              append-icon="close"
              @click:append="doClearLocation"
              v-model="theLocation"
              id="pac-input"
            >
            </v-text-field>
          </v-flex>
        </v-layout>

        <Map />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Map from "../components/Map";
import { eventBus } from "@/event-bus.js";

export default {
  name: "location",
  components: {
    Map,
  },
  data() {
    return {
      theLocation: "",
      theKeyword: "",
      cityState: "",
      curPlace: null,
      geocoder: null,
    };
  },

  mounted: function() {
    eventBus.$on("googleInit", () => {
      this.initMapAutocomplete();
    });

    eventBus.$on("mapAddress", (payload) => {
      this.updateAddressFromMap(payload);
    });
  },
  methods: {
    launchPlacesSearch() {
      eventBus.$emit("launchKeywordSearch", this.theKeyword);
    },

    doClearLocation() {
      this.theLocation = "";
      this.curPlace = "";
    },

    cityStateHelper(str) {
      let city = "";
      let state = "";

      if (!str) return "";

      const addressParts = str.split(",");
      city = addressParts[0];
      state = addressParts[1].trim().substring(0, 2);
      return `${city},${state}`;
    },

    updateAddressFromMap(payload) {
      const firstAddress = payload[0].formatted_address;
      this.theLocation = firstAddress;
      this.curPlace = this.theLocation;
      this.cityState = this.getCityState(payload);
    },

    initMapAutocomplete() {
      this.geocoder = new google.maps.Geocoder();

      const input = document.getElementById("pac-input");
      const autocomplete = new google.maps.places.Autocomplete(input);

      google.maps.event.addListener(autocomplete, "place_changed", () => {
        this.curPlace = autocomplete.getPlace();
        this.theLocation = this.curPlace.formatted_address;

        if (typeof this.curPlace.formatted_address !== "undefined") {
          this.cityState = this.cityStateHelper(
            this.curPlace.formatted_address
          );
          eventBus.$emit("newTextAddress", this.curPlace);
        }
      });
    },
  },
};
</script>

<style>
.v-input__icon--append {
  cursor: pointer;
  pointer-events: auto;
}
</style>
