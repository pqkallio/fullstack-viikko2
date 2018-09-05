import React from 'react';
import Entries from './components/Entries'
import NewEntryForm from './components/NewEntryForm';
import Filtering from './components/Filtering';
import personService from './services/persons'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.db = props.db
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filterInput: '',
        }
    }

    componentDidMount() {
        personService
            .getAll()
            .then(persons => {
                this.updatePersonsToState(persons)
            })
            .catch(error => {
                alert('Valitettavasti henkilötietoja ei voitu listata. Yritä myöhemmin uudelleen.')
            })
    }

    handleAddNewPerson = (name, number) => {
        const newPerson = {
            name,
            number
        }
        personService
            .create(newPerson)
            .then(newPerson => {
                const persons = this.state.persons.concat(newPerson)
                this.updatePersonsToState(persons)
            })
            .catch(error => {
                alert('Valitettavasti henkilöä ei voitu lisätä. Yritä myöhemmin uudelleen.')
            })
    }

    updatePersonsToState = persons => {
        persons.sort((a, b) => {
            const aName = a.name.toLowerCase()
            const bName = b.name.toLowerCase()

            if (aName < bName) {
                return -1
            } else if (bName < aName) {
                return 1
            }
            return 0
        })

        this.setState({
            persons,
            newName: '',
            newNumber: ''
        })
    }

    handleUpdateNumber = (person, number) => {
        const confirmed = window.confirm(`${person.name} on jo luettelossa, korvataanko numero?`)

        if (confirmed) {
            const newPerson = {...person, number}
            personService.update(person.id, newPerson)
                .then(newPerson => {
                    const persons = this.state.persons.filter(p => p.id !== newPerson.id).concat(newPerson)
                    this.updatePersonsToState(persons)
                })
                .catch(error => {
                    alert('Valitettavasti henkilön numeroa ei voitu päivittää. Yritä myöhemmin uudelleen.')
                })
        }
    }

    addEntry = (event) => {
        event.preventDefault()
        const name = this.state.newName.trim()
        const number = this.state.newNumber.trim()

        if (!(name && number)) {
            alert("Nimi ja numero eivät saa olla tyhjiä.")
            return
        }

        const found = this.state.persons.filter(person => person.name === name)

        if (found.length > 0) {
            this.handleUpdateNumber(found[0], number)
        } else {
            this.handleAddNewPerson(name, number)
        }
    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    handleFiltering = (event) => {
        this.setState({ filterInput: event.target.value })
    }

    handleDeletion = (person) => () => {
        const confirmed = window.confirm(`Poistetaanko ${person.name}?`)
        
        if (confirmed) {
            personService
                .deletePerson(person.id)
                .then(response => {
                    const persons = this.state.persons.filter(p => p.id !== person.id)
                    this.updatePersonsToState(persons)
                })
        }
    }

    render() {
        const filterInput = this.state.filterInput.toLowerCase()
        const filteredEntries = this.state.persons.filter(person => 
            person.name.toLowerCase().includes(filterInput) || 
            person.number.toLowerCase().includes(filterInput)
        )

        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Filtering filterInput={filterInput} handleFiltering={this.handleFiltering} />
                <NewEntryForm newName={this.state.newName} 
                              newNumber={this.state.newNumber}
                              handleNameChange={this.handleNameChange}
                              handleNumberChange={this.handleNumberChange}
                              addEntry={this.addEntry} />
                <Entries entries={filteredEntries} handleDeletion={this.handleDeletion} />
            </div>
        )
    }
}

export default App
