import React from 'react';

const CountryListElement = ({ country, handleClick }) => {
    return (
        <tr className='countrylistelement' value={country.name} onClick={() => handleClick(country)}>
            <td>{country.name}</td>
        </tr>
    );
}

const CountryList = ({ countries, handleClick }) => {
    return (
        <table>
            <tbody>
                {countries.map(country => <CountryListElement key={country.name} country={country} handleClick={handleClick} />)}
            </tbody>
        </table>
    );
};

export default CountryList;