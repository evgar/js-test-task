import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

class Summary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      kievResidentsCounter: 0,
      oldestUsersAgeSum: 0,
      longestNameUser: '',
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.store !== prevProps.store) {
      this.getKievResidents(this.props.store)
      this.getOldestUsersAgeSum(this.props.store)
      this.getOldestName(this.props.store)
    }
  }

  getKievResidents(props) {
    const kievResidentsCounter = props.filter(
      resident => resident.location === 'Kiev' || resident.location === 'kiev',
    ).length
    this.setState({ kievResidentsCounter })
  }

  getOldestUsersAgeSum(props) {
    const now = moment()
      .toArray()
      .splice(0, 1)

    const ages = props.map(item => {
      const dobFormatted = item.dob
        .split('.')
        .reverse()
        .splice(0, 1)
        .map(item => parseInt(item))
      return now - dobFormatted
    })

    const agesSumm = ages
      .sort((age1, age2) => age2 - age1)
      .splice(0, 3)
      .reduce((ages, age) => ages + age, 0)

    this.setState({ oldestUsersAgeSum: agesSumm })
  }

  getOldestName(props) {

    const longestNameUser = props
      .map(item => {
        return `${item.first_name} ${item.last_name}`
      })
      .sort((name1, name2) => name2.length - name1.length)
      .splice(0, 1)
    this.setState({ longestNameUser })
  }

  render() {
    return (
      <section>
        <h3>Summary</h3>
        <dl>
          <dt>Count of users from Kiev or kiev</dt>
          <dd>{this.state.kievResidentsCounter}</dd>
          <dt>Sum of three oldest user ages</dt>
          <dd>{this.state.oldestUsersAgeSum}</dd>
          <dt>Longest string of first name + last name</dt>
          <dd>{this.state.longestNameUser}</dd>
        </dl>
      </section>
    )
  }
}

const mapStateToProps = state => ({ store: state })

export default connect(mapStateToProps)(Summary)
