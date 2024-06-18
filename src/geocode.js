import { Loader } from "@googlemaps/js-api-loader"
require('dotenv').config();

export async function getAdressNeo(address) {
    const apiKey = process.env.API_KEY;
    const addressMaps = address
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressMaps}&key=${apiKey}&v=3`;
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const mapsData= await response.json();
            return mapsData;
        } catch (error) {
            console.log(`Fetch erro: ${error}`);
            throw error;
        }
    }

    export async function displayMap(mapsData, contentString) {
        try {
            if (mapsData.results && mapsData.results[0] && mapsData.results[0].geometry && mapsData.results[0].geometry.location) {
                const latAdress = mapsData.results[0].geometry.location.lat;
                const longAdress = mapsData.results[0].geometry.location.lng;
    
                const loader = new Loader({
                    apiKey: process.env.API_KEY,
                    version: "weekly",
                });
    
                loader.load().then(async () => {
                    const { Map } = await google.maps.importLibrary("maps");
    
                    const map = new Map(document.getElementById("map"), {
                        center: { lat: latAdress, lng: longAdress },
                        zoom: 8,
                    });
    
                    const infowindow = new google.maps.InfoWindow({
                        content: contentString,
                        ariaLabel: "Informações",
                    });
    
                    const marker = new google.maps.Marker({
                        position: { lat: latAdress, lng: longAdress },
                        map: map,
                        title: 'Localização'
                    });
    
                    marker.addListener("click", () => {
                        infowindow.open({
                            anchor: marker,
                            map,
                        });
                    });
                });
            } else {
                console.error('Nenhum resultado encontrado ou localização não definida.');
            }
        } catch (error) {
            console.error('Error displaying map:', error);
        }
    }
    
