import React from 'react'
import { connect } from 'react-redux'

function Flag(props) {
  if(!props.id || props.flags.length === 0){return (<div>Loading...</div>)}
  let target = props.flags.filter(val => val.flag_id == props.id)
  let color = "#" + target[0].flag_staff
  // console.log(color)
  return (
    <div className="flag" style={{backgroundColor: color}}>
      <svg>
        <circle cx={50} cy={50} r={10} fill={`#${target[0].flag_color}`} />
      </svg>
    </div>
  )
}

function mapStateToProps(state) {
  const { flags } = state
  return {
    flags,
  }
}

export default connect(mapStateToProps)(Flag)