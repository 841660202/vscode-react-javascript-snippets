import { connect } from 'react-redux'
import React, { Component } from 'react'

type Props = {}

type State = {}

export class tsrcredux extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>tsrcredux</div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(tsrcredux)