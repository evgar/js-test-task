import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { addNewItem } from '../../store/actions'
import moment from 'moment'

class AppendForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      isDataValid: true,
      collectiveKeys: [],
    }
    this.updateItemData = this.updateItemData.bind(this)
    this.onAddNewItem = this.onAddNewItem.bind(this)
  }

  componentDidUpdate(prevProps) {
    const updatedCollectiveKeys = [
      ...new Set(
        this.props.store.reduce((items, item) => {
          return [...items, ...Object.keys(item)]
        }, Object.keys(this.props.store[0])),
      ),
    ].filter(prop => prop !== 'id')
    if (this.props.store !== prevProps.store) {
      this.setState({ collectiveKeys: updatedCollectiveKeys }, () => {
        this.setState({ user: this.generateItemObj() })
      })
    }
  }

  generateItemObj() {
    let initialObj = {}
    this.state.collectiveKeys.map(value => {
      initialObj[value] = ''
      return initialObj
    })
    return initialObj
  }

  updateItemData(title, e) {
    const { value } = e.target
    const preparedInfo = { [title]: value }
    this.setState({ user: { ...this.state.user, ...preparedInfo } })
  }

  onAddNewItem(e) {
    e.preventDefault()
    if (this.validateData()) {
      this.props.addNewItem(this.state.user)
    }
  }

  validateData() {
    const { user } = this.state
    const isDataValid = Object.values(user).every(item => item !== '')
    this.setState({ isDataValid })
    return isDataValid
  }

  render() {
    return (
      <form>
        {this.state.collectiveKeys.map(prop => {
          return (
            <div key={prop}>
              <label>{prop}</label>
              <input
                value={this.state.user[prop] || ''}
                onChange={e => this.updateItemData(prop, e)}
                type={prop === 'dob' ? 'date' : 'text'}
              />
            </div>
          )
        })}
        <button
          onClick={this.onAddNewItem}
          className="btn btn-sm success-color-dark"
        >
          ADD
        </button>
        {!this.state.isDataValid && (
          <div className="invalid-info">Fill in all the fields please</div>
        )}
      </form>
    )
  }
}

const mapStateToProps = state => ({ store: state })

const mapDispatchToProps = {
  addNewItem,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppendForm)
