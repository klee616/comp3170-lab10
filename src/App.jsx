import React, { useState, useEffect } from 'react'
import './App.css'
import CountryContainer from './components/CountryContainer'
import FilterComponent from './components/FilterComponent'

function App() {
  const [countries, setCountries] = useState([]);
  const [subregions, setSubregions] = useState([]);
  const [continents, setContinents] = useState([]);
  const [isTopTen, setTopTen] = useState(false);

  const [filter, setFilter] = useState({alpha:false});

  const [status, setStatus] = useState('idle'); // idle, loading, error;

  const isLoading = status === 'loading';
  const isError = status === 'error';

  async function fetchCountriesData() {
    let countriesResponse;

    try {
      setStatus('loading');
      countriesResponse = await fetch("https://restcountries.com/v3.1/all");
      const countriesData = await countriesResponse.json();

      setCountries(countriesData);

      let subregionList = [];
      let continentList = [];
      countriesData.forEach(item => {
        if (!(subregionList.indexOf(item.subregion) >= 0) && item.subregion != undefined) subregionList.push(item.subregion)
        item.continents.forEach(contient => {
          if (continentList.indexOf(contient) == -1) continentList.push(contient)
        })
      })

      setSubregions(subregionList)
      setContinents(continentList)
      setStatus('idle');
    } catch (error) {
      setStatus('error');
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchCountriesData();
  }, [])

  // handle filter
  const handleCallBack = (formData) => {
    setFilter(formData)//population area
    if (formData.population || formData.area) {
      setTopTen(true);
    } else {
      setTopTen(false);
    }
  }

  const compareCommonName = (country1, country2) => {
    if(filter.population == true){
      if (country1.population < country2.population) return 1;
      if (country1.population > country2.population) return -1;
      return 0;
    }
    
    if(filter.area == true){
      if (country1.area < country2.area) return 1;
      if (country1.area > country2.area) return -1;
      return 0;
    }
      
    if (!filter.alpha || filter.alpha == false) return 0;
    if (country1.name.common < country2.name.common) return -1;
    if (country1.name.common > country2.name.common) return 1;
    return 0;
  }

  const countryContinentFilter = (country) => {
    if (!filter.continent || filter.continent == 'all') return true;
    return country.continents.indexOf(filter.continent) >= 0;

  }
  const contrySubRegionFilter = (country) => {
    if (!filter.subregion || filter.subregion == 'all') return true;
    return country.subregion == filter.subregion

  }
  return (
    <div>
      <h1>Countries of the World</h1>
      {<FilterComponent subregions={subregions} continents={continents} handleCallBack={handleCallBack} data={filter} />}
      <div class="content">
        {isLoading ? <p>Loading...</p>
          : isError ? <p>Error while loading data</p>
            : (
              <>
                {countries.filter(countryContinentFilter).filter(contrySubRegionFilter).sort(compareCommonName).map((country, index) => {
                  if (isTopTen & index >= 10) return (<></>);
                  return (
                    <>
                      <div key={index}>
                        <CountryContainer key={index} country={country} />
                      </div>
                    </>
                  );
                })}
              </>
            )}
      </div>
    </div>
  )
}

export default App
