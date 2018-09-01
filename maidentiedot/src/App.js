import React from 'react'
import ReactDom from 'react-dom'
import './App.css'
import axios from 'axios'
import Results from './components/Results'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.restEndpoint = props.restEndpoint
    this.state = {
      countries: [],
      filterValue: '',
      filteredCountries: []
    }
  }

  componentDidMount() {
    console.log('did mount')
    axios
      .get(this.restEndpoint)
      .then(response => {
        console.log('promise fulfilled')
        this.setState({
          countries: response.data,
          filteredCountries: response.data
        })
      })
  }

  filterResults = (filter) => {
    const filteredCountries = this.state.countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    this.setState({ filteredCountries })
  }

  handleFiltering = (event) => {
    const filter = event.target.value
    this.setState({ filterValue: filter })
    this.filterResults(filter)
  }

  render() {
    return (
      <div>
        find countries: <input value={this.state.filterValue} onChange={this.handleFiltering} />
        <Results results={this.state.filteredCountries} />
      </div>
    );
  }
}

export default App;
