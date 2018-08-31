import React from 'react';

const NewEntryForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addEntry }) => {
    return (
        <div>
            <h2>Lisää uusi</h2>
            <form onSubmit={addEntry}>
                <div>
                    nimi: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    numero: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
        </div>
    );
};

export default NewEntryForm;