import React from 'react';

const Entry = ({ entry, handleDeletion }) => {
    return (
        <tr className='entry' key={entry.id}>
            <td>
                {entry.name}
            </td>
            <td>
                {entry.number}
            </td>
            <td>
                <button onClick={handleDeletion}>Poista</button>
            </td>
        </tr>
    )
    
}

const Entries = ({ entries, handleDeletion }) => {
    return (
        <div>
            <h2>Numerot</h2>
            <table>
                <tbody>
                    {entries.map(entry => 
                        <Entry key={entry.id} entry={entry} handleDeletion={handleDeletion(entry)} />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Entries;