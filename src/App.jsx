import React, { Component } from 'react'
import { connect } from 'react-redux'
import Table from './components/Table'
import AppendForm from './components/AppendForm'
import Summary from './components/Summary'
import { getItems } from './store/actions'
import axios from 'axios'

class App extends Component {
  componentWillMount() {
    this.getData(this.props)
  }

  getData = props => {
    axios
      .get('/users')
      .then(function({ data }) {
        props.getItems(data)
      })
      .catch(function(error) {
        console.log(error)
      })
  }
  render() {
    return (
      <div>
        <Table />
        <Summary />
        <AppendForm />
      </div>
    )
  }
}

const mapStateToProps = state => ({ store: state })

const mapDispatchToProps = {
  getItems,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
