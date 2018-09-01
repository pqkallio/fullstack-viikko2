import React from 'react'
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
    axios
      .get(this.restEndpoint)
      .then(response => {
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

  handleClickOnCountryData = (country) => {
    this.setState({ filteredCountries: [country] })
  }

  render() {
    return (
      <div>
        find countries: <input value={this.state.filterValue} onChange={this.handleFiltering} />
        <Results results={this.state.filteredCountries} handleClick={this.handleClickOnCountryData} />
      </div>
    );
  }
}

export default App;
