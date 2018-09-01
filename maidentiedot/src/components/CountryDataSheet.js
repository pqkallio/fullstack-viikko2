import React from 'react'

const CountryDataSheet = ({ country }) => {
    return (
        <div>
            <h2>{country.name} {country.nativeName}</h2>
            <p>
                Capital: {country.capital}<br />
                Population: {country.population}
            </p>
            <img 
                src={country.flag}
                width='400px'
                alt={'Flag of' + country.name}
            />
        </div>
    );
};

export default CountryDataSheet;