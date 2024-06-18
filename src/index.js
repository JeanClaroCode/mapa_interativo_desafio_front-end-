import "core-js";
import { getAdressNeo, displayMap } from "./geocode";
import { initializeEurope } from "./js/init";
import { getCountriesNeo, getDataViewPort } from "./countries";
import { initMap } from "./calculatedistance";
import { addNewInputAddress } from "./new_address_input";

initializeEurope();

document.getElementById('searchButton').addEventListener('click', async function() {
    const address = document.getElementById('address').value;
    if (address === '') {
        alert('Por favor, insira o nome da cidade.');
        return;
    }

    try {
        const mapsData = await getAdressNeo(address);
        const addressComponents = mapsData?.results?.[0]?.address_components;
        if (!addressComponents) {
            throw new Error('Address components not found');
        }
        const nameCountry = addressComponents[0]?.short_name;
        if (!nameCountry) {
            throw new Error('Country name not found in address components');
        }
        
        const countriesData = await getCountriesNeo(nameCountry);
        const contentString = await getDataViewPort(countriesData);
        const capital = countriesData[0]?.capital?.[0];
        if (!capital) {
            throw new Error('Capital not found for the country');
        }
        
        const newMapsData = await getAdressNeo(capital);
        displayMap(newMapsData, contentString);
        
        addNewInputAddress();
        
        const address2 = document.getElementById('address2').value;
        if (address2 === '') {
            alert('Por favor, insira o nome da segunda cidade.');
            return;
        }
        
        const mapsData2 = await getAdressNeo(address2);
        const addressComponents2 = mapsData2?.results?.[0]?.address_components;
        if (!addressComponents2) {
            throw new Error('Address components not found for second address');
        }
        const nameCountry2 = addressComponents2[0]?.short_name;
        if (!nameCountry2) {
            throw new Error('Country name not found in address components for second address');
        }
        
        const countriesData2 = await getCountriesNeo(nameCountry2);
        const capital2 = countriesData2[0]?.capital?.[0];
        if (!capital2) {
            throw new Error('Capital not found for the country of the second address');
        }
        
        const newMapsData2 = await getAdressNeo(capital2);
        initMap(newMapsData2, capital, capital2)
        console.log("Mano isso tá funcionando?");
    } catch (error) {
        console.error('Error fetching map data', error);
    }
});
