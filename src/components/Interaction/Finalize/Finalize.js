import React from 'react'
import './Finalize.scss'
import { connect } from 'react-redux'

function Finalize(props) {
  const flagOptions = props.flags.map((flag , i) => {return (
    <option key={`F_${i}`} value={flag.flag_id} >{flag.flag_name}</option>
  )})
  return(
    <>
    <textarea id="new-int-body" onChange={(e) => props.update('inte_body' , e.target.value)}/>
    <select onChange={(e) => props.update('inte_flag' , e.target.value)} >
      {flagOptions}
    </select>
    <button onClick={props.new}>Save Interaction</button>
    <button onClick={props.discard}>Discard and Return</button>
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