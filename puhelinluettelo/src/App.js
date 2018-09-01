import React from 'react';
import Entries from './components/Entries'
import NewEntryForm from './components/NewEntryForm';
import Filtering from './components/Filtering';
import axios from 'axios'

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
        axios
            .get(this.db)
            .then(response => {
                this.setState({ persons: response.data })
            })
    }

    addEntry = (event) => {
        event.preventDefault()
        const name = this.state.newName.trim()
        const number = this.state.newNumber.trim()
        const found = this.state.persons.map(person => person.name).indexOf(name)

        if (name && number && found === -1) {
            const persons = this.state.persons.concat({
                name,
                number,
                id: this.state.persons.length + 1
            })
            this.setState({
                persons,
                newName: '',
                newNumber: ''
            })
        } else {
            alert("Nimi ja numero eivät saa olla tyhjiä eikä nimeä jo aiemmin lisätty.")
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
                <Entries entries={filteredEntries} />
            </div>
        )
    }
}

export default App
