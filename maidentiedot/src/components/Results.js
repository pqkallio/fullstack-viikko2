import React from 'react'
import CountryList from './CountryList'
import CountryDataSheet from './CountryDataSheet'

const Results = ({ results }) => {
    if (results.length > 10) {
        return (
            <div>
                too many matches, specify another filter
            </div>
        );
    } else if (results.length === 0) {
        return (
            <div>
                no matches
            </div>
        );
    } else if (results.length > 1) {
        return (
            <div>
                <CountryList countries={results} />
            </div>
        );
    }
    
    return (
        <div>
            <CountryDataSheet country={results[0]} />
        </div>
    );
};

export default Results;