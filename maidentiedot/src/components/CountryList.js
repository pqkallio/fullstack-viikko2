import React from 'react';

const CountryListElement = ({ country }) => {
    return (
        <tr>
            <td>{country.name}</td>
        </tr>
    );
}

const CountryList = ({ countries }) => {
    return (
        <table>
            <tbody>
                {countries.map(country => <CountryListElement country={country} />)}
            </tbody>
        </table>
    );
};

export default CountryList;