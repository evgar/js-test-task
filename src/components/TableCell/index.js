import React, { Component } from 'react'

class TableCell extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: props.value.title,
      meaning: props.value.meaning,
    }
  }

  changeValue = e => {
    const { value } = e.target

    this.setState({ meaning: value }, () => {
      this.props.onValueChange(this.state)
    })
  }

  render() {
    const { editMode } = this.props
    const { meaning } = this.state

    return (
      <td>
        <input
          value={meaning}
          disabled={!editMode}
          onChange={this.changeValue}
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
