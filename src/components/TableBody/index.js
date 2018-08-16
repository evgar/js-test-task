import React from 'react'
import TableRow from '../TableRow'

const TableBody = ({ data }) => {
  return (
    <tbody>
      {data.map((user, i) => {
        return <TableRow key={i} user={user} />
      })}
    </tbody>
  )
}

export default TableBody
