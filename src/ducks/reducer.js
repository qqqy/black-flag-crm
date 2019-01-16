const initialState = {
  agent: {} ,
  display: [] ,
  targetCustomer: {} ,
  targetTicket: {} ,
  flags: [] ,
  tasks: [] ,
  interactions: [] ,
}
const LOGIN_AGENT = 'LOGIN_AGENT'

export function loginAgent(agentObject){
  return {
    type: LOGIN_AGENT ,
    payload: agentObject
  }
}

export default function reducer(state=initialState , action){
  switch(action.type){
    case LOGIN_AGENT :
      return {...state , agent: action.payload}
    default:
      return state
  }
}