import React from 'react';

const Filtering = ({ filterInput, handleFiltering }) => {
    return (
        <div>
            rajaa näytettäviä: <input value={filterInput} onChange={handleFiltering} />
        </div>
    );
};

export default Filtering;