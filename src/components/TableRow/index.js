import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import TableCell from '../TableCell'
import { editItem, deleteItem } from '../../store/actions'

class TableRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editMode: false,
      user: this.props.user,
    }

    this.updateUserData = this.updateUserData.bind(this)
    this.onDeleteItem = this.onDeleteItem.bind(this)
    this.changeEditMode = this.changeEditMode.bind(this)
    this.onEditItem = this.onEditItem.bind(this)
  }

  changeEditMode() {
    this.setState(prevState => ({ editMode: !prevState.editMode }))
  }

  onEditItem() {
    this.changeEditMode()
    this.props.editItem(this.state.user, this.props.id)
  }

  onDeleteItem() {
    this.props.deleteItem(this.props.id)
  }

  updateUserData({ title, meaning }) {
    const preparedInfo = { [title]: meaning }

    this.setState({ user: { ...this.state.user, ...preparedInfo } })
  }

  render() {
    const { editMode, user } = this.state
    const { id } = this.props
    const rowValues = Object.entries(user).filter((item, i) => i !== 0)
    return (
      <tr>
        <td className="text-center">{id + 1}</td>
        {rowValues.map(user => {
          const characteristic = { title: user[0], meaning: user[1] }
          return (
            <TableCell
              key={characteristic.title}
              value={characteristic}
              editMode={editMode}
              onValueChange={this.updateUserData}
            />
          )
        })}

        <td className="text-center">
          {!editMode ? (
            <Fragment>
              <button
                className="btn btn-sm primary-color"
                onClick={this.changeEditMode}
              >
                Edit
              </button>
              <button
                className="btn btn-sm danger-color"
                onClick={this.onDeleteItem}
              >
                Delete
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <button
                onClick={this.onEditItem}
                className="btn btn-sm primary-color"
              >
                Save
              </button>
            </Fragment>
          )}
        </td>
      </tr>
    )
  }
}

const mapDispatchToProps = {
  editItem,
  deleteItem,
}

export default connect(
  undefined,
  mapDispatchToProps,
)(TableRow)
