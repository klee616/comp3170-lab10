 'use client'
import React, { useState, useEffect } from 'react'
import styles from './filterComponent.module.css'


function FilterComponent  ({ subregions, continents, handleCallBack, data ={alpha:false} }) {
    const [formData, setFormData] = useState(data);
  
    useEffect(()=>{
      console.log(formData);
      handleCallBack(formData);
    }, [formData])

    const handleAlphaOnChange =  (e) => {
      if (e.target.name == "alpha"){ 
        setFormData({ [e.target.name]: e.target.checked  })
      }
  
      if (e.target.name == "population") {
        if (e.target.checked == true) {
          setFormData({ ...formData, "population": true, "area": false });
        } else {
          setFormData({ ...formData, "population": false });
        }
      }
  
      if (e.target.name == "area") {
        if (e.target.checked == true) {
          setFormData({ ...formData, "area": true, "population": false });
        } else {
          setFormData({ ...formData, "area": false });
        }
      }
  
      console.log(e.target.value);
      if (e.target.name == "continent") {
        console.log(e.target.value);
        if (e.target.value != "all")  setFormData({ ...formData, "subregion": "all" , "continent": e.target.value });
        else setFormData({ ...formData, "continent": e.target.value });
      }

      if (e.target.name == "subregion") {
        console.log(e.target.value);
        if (e.target.value != "all")  setFormData({ ...formData, "continent": "all", "subregion": e.target.value } );
        else setFormData({ ...formData, "subregion": e.target.value });
      }
    }
  
    return (<>
      <form>
        <p>Filter & sort</p>
        <div className={styles.filterSortingContain}>
          <div>
            <fieldset>
              <input type='checkbox' checked={formData.alpha} name='alpha' onChange={handleAlphaOnChange} />
              <label htmlFor='alpha'>Alpha</label>
            </fieldset>
          </div>
  
          <div>
            Top 10
            <fieldset>
              <input type='checkbox' checked={formData.population} name='population' onChange={handleAlphaOnChange} />
              <label htmlFor='population'>by population</label>
            </fieldset>
            <fieldset>
              <input type='checkbox' checked={formData.area} name='area' onChange={handleAlphaOnChange} />
              <label htmlFor='area'>by area</label>
            </fieldset>
          </div>
          <div>
            <label htmlFor='continent'>by continent</label>
            <select name="continent" value={formData.continent} onChange={handleAlphaOnChange} >
              <option value='all'>All</option>
              {continents.map((continent, index) => (
                <option key={index} type={index} value={continent}>{continent}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='subregion'>by subregion</label>
            <select name="subregion" value={formData.subregion} onChange={handleAlphaOnChange}>
              <option value='all'>Choose region</option>
              {subregions.map((subregion, index) => (
                <option key={index} type={index} value={subregion}>{subregion}</option>
              ))}
            </select>
          </div>
  
        </div>
      </form></>)
  }
  export default FilterComponent;