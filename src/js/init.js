import { Loader } from "@googlemaps/js-api-loader";
require('dotenv').config();

let map; 
let markers = [];

export async function initializeEurope(){

const loader = new Loader({
  apiKey: process.env.API_KEY,
  version: "weekly",
});

loader.load().then(async () => {
  const { Map } = await google.maps.importLibrary("maps");

  function initMap(centerCoords) {
      map = new Map(document.getElementById("map"), {
          center: centerCoords,
          zoom: 4.5,
      });
      carregarMarcadores();
      map.addListener('click', (e) => {
          adicionarMarcador(e.latLng.lat(), e.latLng.lng());
      });
  }
  initMap({ lat: 53.0000, lng: 24.0000 });
});
}

function adicionarMarcador(lat, lng) {
  if (markers.length >= 5) {
    markers.shift(); 
}
const marker = new google.maps.Marker({
  position: { lat, lng },
  map: map,
});
markers.push({ lat, lng });
salvarMarcadores();
}


function salvarMarcadores() {
localStorage.setItem('marcadores', JSON.stringify(markers));
}

function carregarMarcadores() {
  const marcadoresSalvos = JSON.parse(localStorage.getItem('marcadores')) || [];
  markers = marcadoresSalvos;
  markers.forEach(marcador => {
      new google.maps.Marker({
          position: { lat: marcador.lat, lng: marcador.lng },
          map: map,
      });
  });
}


export async function apagarMarcadores() {
  const marcadoresapagados = JSON.parse(localStorage.removeItem('marcadores')) || [];
  markers = marcadoresapagados;
  markers.forEach(marcador => marcadoresapagados(marcador.lat, marcador.lng));
  }

  console.log(markers)