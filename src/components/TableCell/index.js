import React, { Component } from 'react'

class TableCell extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: props.value.title,
      meaning: props.value.meaning,
    }

    this.changeValue = this.changeValue.bind(this)
  }

  changeValue(e) {
    const { value } = e.target

    this.setState({ meaning: value }, () => {
      this.props.onValueChange(this.state)
    })
  }

  render() {
    const { editMode } = this.props
    const { meaning } = this.state

    return (
      <td className="text-center">
        <input
          value={meaning}
          disabled={!editMode}
          onChange={this.changeValue}
          className={'text-center form-control table-cell-input'}
        />
      </td>
    )
  }

  componentDidUpdate(prevProps) {
    const { meaning } = this.props.value
    if (prevProps.value.meaning !== meaning) {
      this.setState({ meaning })
    }
  }
}

export default TableCell
