import React from 'react'
import './Finalize.css'
import { connect } from 'react-redux'

function Finalize(props) {
  const flagOptions = props.flags.map((flag , i) => {return (
    <option key={`F_${i}`} value={flag.flag_id} onChange={(e) => props.update('inte_flag' , e.target.value)}>{flag.flag_name}</option>
  )})
  return(
    <>
    <textarea onChange={(e) => props.update('inte_body' , e.target.value)}/>
    <select>
      {flagOptions}
    </select>
    <button onClick={props.new}>Save Interaction</button>
    </>
  )
}

function mapStateToProps(state){
  const { flags } = state 
  return {
    flags
  }
}

export default connect(mapStateToProps)(Finalize)