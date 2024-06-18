
export async function getCountriesNeo(name){
        const nameCountry = name
        let countryURL = `https://restcountries.com/v3.1/alpha/${nameCountry}`
        try {
            const response = await fetch(countryURL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const countriesData = await response.json();
            console.log(countriesData)
            return countriesData;
        } catch (error) {
            console.log(`Fetch erro: ${error}`);
            throw error;
        }
}

export async function getDataViewPort(restcountriesAPI){
        let flagCountry =  restcountriesAPI[0].flags.png
        let regionNameCountry =  restcountriesAPI[0].region
        let porNameCountry =  restcountriesAPI[0].translations.por.common
        let capitalCountry =  restcountriesAPI[0].capital
        let currenciesCountry = await restcountriesAPI[0].currencies
        let languageCountry =  await restcountriesAPI[0].languages
        const contentString = `
            <div id="infowidowcontent">
                <img id="flag" src="${flagCountry}">
                <p id="region">Região: ${regionNameCountry}</p>
                <p id="portugueseNameCountry">País: ${porNameCountry}</p> 
                <p id="capitalCountry">Capital: ${capitalCountry} </p> 
                <p id="currenciesCountry">Moeda: ${Object.values(currenciesCountry).map(currency => currency.name).join(', ')} (${Object.values(currenciesCountry).map(currency => currency.symbol).join(', ')})</p>
                <p id="languageCountry">Língua: ${Object.values(languageCountry)}</p> 
                <div id="addRoutes">
                    <button id="addRoute" class="btn btn-primary" >Rotas</button>
                </div>
            </div>
                `;
        return contentString
        
} 

