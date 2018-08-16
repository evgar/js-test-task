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
    this.props.editItem(this.state.user, this.state.user.id)
  }

  onDeleteItem() {
    this.props.deleteItem(this.state.user.id)
  }

  updateUserData({ title, meaning }) {
    const preparedInfo = { [title]: meaning }

    this.setState({ user: { ...this.state.user, ...preparedInfo } })
  }

  render() {
    const { editMode, user } = this.state
    const rowValues = Object.entries(user).filter((item, i) => item[0] !== 'id')
    return (
      <tr>
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

        <td>
          {!editMode ? (
            <Fragment>
              <button
                onClick={this.changeEditMode}
              >
                Edit
              </button>
              <button
                onClick={this.onDeleteItem}
              >
                Delete
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <button
                onClick={this.onEditItem}
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
