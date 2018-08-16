import React from 'react'

const TableHeader = ({ headers }) => {
  return (
    <thead className="elegant-color-dark">
      <tr>
        {headers.map(header => (
          <th key={header} scope="row">
            {header}
          </th>
        ))}
        <th scope="row">Action</th>
      </tr>
    </thead>
  )
}

export default TableHeader
