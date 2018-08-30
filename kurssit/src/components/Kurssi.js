import React from 'react'
import Osa from './Osa'

const Kurssi = ({ kurssi }) => {
    const tehtaviaYhteensa = () => {
        const tehtavat = kurssi.osat.map(osa => osa.tehtavia)
        const reducer = (accumulator, currentVal) => accumulator + currentVal

        return tehtavat.reduce(reducer)
    }

    return (
        <div>
            <h2>{kurssi.nimi}</h2>
            {kurssi.osat.map(osa => <Osa key={osa.id} osa={osa} />)}
            <p>yhteensä {tehtaviaYhteensa()} tehtävää</p>
        </div>
    );
};

export default Kurssi;