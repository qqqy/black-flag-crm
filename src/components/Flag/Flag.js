import React from 'react'
import { connect } from 'react-redux'

function Flag (props) {
  return (
    <svg>
    <circle cx={50} cy={50} r={10} fill={`#${props.flags[props.id].flag_color}`} />
  </svg>
  )
}

function mapStateToProps(state){
  const { flags } = state
  return {
    flags ,
  }
}

export default connect(mapStateToProps)(Flag)