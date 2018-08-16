import React from 'react'
import { connect } from 'react-redux'
import TableHeader from '../TableHeader'
import TableBody from '../TableBody'

const Table = (props) => {
  const { store } = props
  const headers = Object.keys(Object.assign({}, ...store)).filter(
    header => header !== 'id',
  )

  return (
    <table>
      <TableHeader headers={headers} />
      <TableBody data={store} />
    </table>
  )
}

const mapStateToProps = state => ({ store: state })

export default connect(mapStateToProps)(Table)
