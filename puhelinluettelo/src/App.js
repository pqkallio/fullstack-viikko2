import React from 'react';
import Entries from './components/Entries'
import NewEntryForm from './components/NewEntryForm';
import Filtering from './components/Filtering';
import personService from './services/persons'
import Notification from './components/Notification'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.db = props.db
        this.errorClassName = 'error'
        this.notificationClassName = 'notification'
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filterInput: '',
            notificationMessage: null,
            notificationType: null
        }
    }

    componentDidMount() {
        personService
            .getAll()
            .then(persons => {
                this.updatePersonsToState(persons)
            })
            .catch(error => {
                this.notifyUser(this.errorClassName,
                    'Valitettavasti henkilötietoja ei voitu listata. Yritä myöhemmin uudelleen.')
            })
    }

    notifyUser = (type, message) => {
        this.setState({
            notificationType: type,
            notificationMessage: message
        })
        setTimeout(() => this.setState({
            notificationMessage: null,
            notificationType: null
        }), 5000)
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
                this.notifyUser(this.notificationClassName,
                    `${newPerson.name} lisättiin luetteloon`)
            })
            .catch(error => {
                this.notifyUser(this.errorClassName, 
                    'Valitettavasti henkilöä ei voitu lisätä. Yritä myöhemmin uudelleen.')
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
        let confirmed = window.confirm(`${person.name} on jo luettelossa, korvataanko numero?`)

        if (confirmed) {
            const newPerson = {...person, number}
            personService.update(person.id, newPerson)
                .then(newPerson => {
                    const persons = this.state.persons.filter(p => p.id !== newPerson.id).concat(newPerson)
                    this.updatePersonsToState(persons)
                    this.notifyUser(this.notificationClassName, `Numero päivitetty: ${newPerson.name}`)
                })
                .catch(error => {
                    this.updatePersonsToState(this.state.persons.filter(p => p.id !== newPerson.id))
                    confirmed = window.confirm(`${person.name} tiedot on jo poistettu luettelosta, lisätäänkö henkilö?`)
                    if (confirmed) {
                        this.handleAddNewPerson(newPerson.name, newPerson.number)
                    }
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
                    this.notifyUser(this.notificationClassName, `Poistettiin tiedot: ${person.name}`)
                })
                .catch(error => {
                    this.notifyUser(this.errorClassName, 
                        'Valitettavasti tietoja ei voitu nyt poistaa. Yritä myöhemmin uudelleen.')
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
                <Notification type={this.state.notificationType} message={this.state.notificationMessage} />
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
