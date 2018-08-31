import React from 'react';

const Entries = ({ entries }) => {
    return (
        <div>
            <h2>Numerot</h2>
            <ul className='phonebook'>
                {entries.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
            </ul>
        </div>
    );
};

export default Entries;