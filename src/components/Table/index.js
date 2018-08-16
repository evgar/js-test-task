import React, { Component } from 'react'
import { connect } from 'react-redux'
import TableHeader from '../TableHeader'
import TableBody from '../TableBody'

class Table extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { store } = this.props
    const headers = Object.keys(Object.assign({}, ...store)).filter(
      header => header !== 'id',
    )

    return (
      <table className="table table-striped table-hover">
        <TableHeader headers={headers} />
        <TableBody data={store} />
      </table>
    )
  }
}

const mapStateToProps = state => ({ store: state })

export default connect(mapStateToProps)(Table)
