import styles from './CountryContainer.module.css'

export default function CountryContainer({ country }) {

    const displayCapital = (capital) => {
        return capital?capital.join(','):'';
    }

    const displayLanguages = (languagesList) =>{
        let languages = [];
        if(languagesList){
            Object.keys(languagesList).forEach(key=>languages.push(languagesList[key]))
        }
        return languages.join(',');
    }

    const displayCurrency = (currencyList) => {
        let currencuies = [];
        if(currencyList){
//            Object.keys(currencyList).forEach(key=<currencuies.push(`${currencyList[key].name} - ${currencyList[key].symbol}`))
                Object.keys(currencyList).forEach(key=>currencuies.push(`${currencyList[key].name} (${currencyList[key].symbol})`))
        }
        return currencuies.join(',');
    }

    const displayContinents = (continents) => {
        return continents.join(', ');
    }
    return (<>
        <div className={styles.countryContainer}>
            <div className={styles.contryTitle}>
            <img src={country.flags.svg} alt={country.name.common} />
                <h2>{country.name.common}</h2>
            </div>
            <div className={styles.info} >
                <p>
                    <span>Official Name:</span>
                    <span>{country.name.official}</span>
                </p>
                <p>
                    <span>Capital:</span>
                    <span>{displayCapital(country.capital) }</span>
                </p>
                <p>
                    <span>Population:</span>
                    <span>{country.population}</span>
                </p>
                <p>
                    <span>Languages:</span>
                    <span>{displayLanguages(country.languages)}</span>
                </p>
                <p>
                    <span>Currency:</span>
                    <span>{displayCurrency(country.currencies)}</span>
                </p>
                <p>
                    <span>Area (mi<sup>2</sup>):</span>
                    <span>{country.area}</span>
                </p>
                <p>
                    <span>Subregion:</span>
                    <span>{country.subregion}</span>
                </p>
                <p>
                    <span>Continents:</span>
                    <span>{displayContinents(country.continents)}</span>
                </p>
                <p>
                <a href={country.maps.googleMaps} target="_blank">Show on Google Maps</a>
                </p>
            </div>
        </div>
    </>)
}