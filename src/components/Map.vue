<template>
  <v-flex xs4>
    <v-card>
      <div id="map"></div>
    </v-card>
  </v-flex>
</template>

<script>
import $Scriptjs from "scriptjs";
import { eventBus } from "@/event-bus.js";

export default {
  name: "Map",

  data() {
    return {
      map: null,
      marker: null,
      lastLat: null,
      lastLng: null,

      getNextPage: null,
      DEFAULT_LAT: 42.034534,
      DEFAULT_LNG: -93.620369,

      geocoder: null,
      placesService: null,
    };
  },

  mounted: function() {
    $Scriptjs(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAw1hclYoTxMTLkhN6YzdJoC42s-OAMo8Q&libraries=geometry,places",
      () => {
        this.initMap();
      }
    );

    eventBus.$on("newTextAddress", (payload) => {
      this.updateFromTextAddress(payload);
    });

    eventBus.$on("sendCityData", (payload) => {
      this.renderCityMap(payload.coordinates);
      this.setDataLayer(payload.multiPoly, payload.numGeometries);
    });

    eventBus.$on("launchKeywordSearch", (payload) => {
      this.doKeywordSearch(payload);
    });
  },

  methods: {
    wait(timeout) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, timeout);
      });
    },

    updateFromTextAddress(payload) {
      this.map.setCenter(payload.geometry.location);
      this.updateMarker(payload.geometry.location);
      this.lastLat = payload.geometry.location.lat();
      this.lastLng = payload.geometry.location.lng();
    },

    renderCityMap(myCityData) {
      myCityData.setMap(this.map);

      myCityData.addListener("click", (event) => {
        google.maps.event.trigger(this.map, "click", event);
      });
    },

    initMap() {
      this.geocoder = new google.maps.Geocoder();

      this.map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: this.DEFAULT_LAT,
          lng: this.DEFAULT_LNG,
        },
        zoom: 4,
        gestureHandling: "greedy",
      });

      this.placesService = new google.maps.places.PlacesService(this.map);

      google.maps.event.addListener(this.map, "click", (event) => {
        this.lastLat = event.latLng.lat();
        this.lastLng = event.latLng.lng();

        this.updateMarker(event.latLng);

        this.geocoder.geocode({ location: event.latLng }, (results, status) => {
          if (results) {
            eventBus.$emit("mapAddress", results);
          }
        });
      });
      eventBus.$emit("googleInit", {});
    },

    updateMarker(latLng) {
      if (!this.marker) {
        this.marker = new google.maps.Marker({
          map: this.map,
        });
      }

      this.marker.setPosition(latLng);
    },

    doSearch(params) {
      let _this = this;
      this.placesService.nearbySearch(params, async function(
        results,
        PlacesServiceStatus,
        PlaceSearchPagination
      ) {
        if (PlacesServiceStatus !== "OK") return;

        _this.searchResultMarkers(results);

        if (PlaceSearchPagination.hasNextPage) {
          await _this.wait(100);
          _this.getNextPage =
            PlaceSearchPagination.hasNextPage &&
            function() {
              PlaceSearchPagination.nextPage();
            };
        } else {
          _this.getNextPage = null;
        }
        if (_this.getNextPage) {
          _this.getNextPage();
        }
      });
    },

    googlePlacesSearch(keyword, radius = 1000) {
      if (!keyword.trim()) return;

      let params = {
        location: new google.maps.LatLng(this.lastLat, this.lastLng),
        radius: radius,
        keyword: keyword,
      };

      this.doSearch(params);
    },

    doKeywordSearch(keyword) {
      this.googlePlacesSearch(keyword, 500);
    },
  },
};
</script>

<style>
#map {
  width: 40vw;
  height: 30vw;
}
</style>
