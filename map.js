function initMap() {
  var userPos = {
    lat: 0,
    lng: 0,
  };
  var rendererOptions = {
    map: map,
    suppressMarkers: true,
  };
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer(rendererOptions);
  var sv = new google.maps.StreetViewService();
  var panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano")
  );
  let Url = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  var options = {
    center: { lat: 42.034534, lng: -93.620369 },
    zoom: 15,
    streetViewControl: true,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
  };
  sv.getPanorama({ location: userPos, radius: 50 }, processSVData);
  var infoWindow;
  var map = new google.maps.Map(document.getElementById("map"), options);
  directionsRenderer.setMap(map);

  function processSVData(data, status) {
    if (status === "OK") {
      panorama.setPano(data.location.pano);
      panorama.setPov({
        heading: 270,
        pitch: 0,
      });
      panorama.setVisible(true);
    } else {
      console.error("Street View data not found for this location.");
    }
  }

  addMarker({
    cords: { lat: 42.022, lng: -93.65161 },
    info:
      "<h2> Domino's Pizza<br>Address: 302 Lincoln Way #102, Ames, IA 50010 </h2>",
  });
  addMarker({
    cords: { lat: 42.02329, lng: -93.668569 },
    info: "<h2> Mc Donald's <br>3621 Lincoln Way, Ames, IA 50010</h2>",
  });
  addMarker({
    cords: { lat: 42.022571, lng: -93.648784 },
    info:
      "<h2>   Jeff's Pizza <h4>Laid-back, family-owned spot serving uniquely topped pizzas & other Italian cuisine.</h4></h2>",
  });

  infoWindow = new google.maps.InfoWindow();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        userPos.lat = position.coords.latitude;
        userPos.lng = position.coords.longitude;
        addMarker({
          cords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          info: "<h2> You are here! </h2>",
          url: Url,
        });
        infoWindow.setPosition(userPos);
        infoWindow.setContent("You are here!");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      function () {
        handleLocationError(true);
      }
    );
  } else {
    handleLocationError(false);
  }

  function handleLocationError(browserHasGeolocation) {
    browserHasGeolocation
      ? alert("Error: The Geolocation service failed.")
      : alert("Error: Your browser doesn't support geolocation.");
  }

  function calcRoute(position) {
    var start = userPos;
    var end = position;
    var request = {
      origin: start,
      destination: end,
      travelMode: "DRIVING",
      // drivingOptions: {
      //   departureTime: new Date(now),
      //   trafficModel: "pessimistic",
      // },
    };
    directionsService.route(request, function (result, status) {
      if (status == "OK") {
        directionsRenderer.setDirections(result);
        directionsRenderer.setDistance(result);
      }
    });
  }

  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.cords,
      animation: google.maps.Animation.DROP,
      map: map,
      icon: {
        url: props.url,
      },
    });
    var info = new google.maps.InfoWindow({
      content: props.info,
    });
    marker.addListener("mouseover", function () {
      info.open(map, marker);
    });
    marker.addListener("mouseout", function () {
      info.close(map, marker);
    });

    marker.addListener("click", function () {
      let pos = new google.maps.LatLng(props.cords.lat, props.cords.lng);
      sv.getPanorama({ location: pos, radius: 50 }, processSVData);
      calcRoute(pos);
    });
  }
}
