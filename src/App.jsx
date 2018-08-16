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
    // this.props.addNewItem(this.state.user)
  }

  getData = props => {
    axios
      .get('/users')
      .then(function({ data }) {
        props.getItems(data)
      })
      .catch(function(error) {
        // handle error
        console.log(error)
      })
      .then(function() {
        // always executed
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
  getItems
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
