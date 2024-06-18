export async function initMap(mapsData, start, final) {
    console.log(mapsData)
    console.log(start)
    console.log(final)
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      draggable:false
    })
    const latAdress = mapsData.results[0].geometry.location.lat;
    const longAdress = mapsData.results[0].geometry.location.lng;
    
    const map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: latAdress,
          lng: longAdress
        },
        zoom: 8
      });
    directionsRenderer.setMap(map);
  
    directionsService.route({
      origin: start,
      destination: final,
      travelMode: google.maps.TravelMode.DRIVING
    }).then(response => {
      console.log({response})
      directionsRenderer.setDirections(response);
    }).catch(error =>{
      console.log(error);
    });
  }