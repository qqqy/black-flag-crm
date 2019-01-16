const initialState = {
  agent: {} ,
  display: [] ,
  targetCustomer: {} ,
  targetTicket: {} ,
  flags: [] ,
  tasks: [] ,
  interactions: [] ,
  customers: [] ,
}
const LOGIN_AGENT = 'LOGIN_AGENT'
const LOAD_DISPLAY = 'LOAD_DISPLAY'
const LOAD_INTERACTIONS = 'LOAD_INTERACTIONS'
const LOAD_CUSTOMERS = 'LOAD_CUSTOMERS'
const LOAD_FLAGS = 'LOAD_FLAGS'
const LOAD_TASKS = 'LOAD_TASKS'

export function loginAgent(agentObject){
  return {
    type: LOGIN_AGENT ,
    payload: agentObject
  }
}

export function loadDisplay(displayArray){
  return {
    type: LOAD_DISPLAY ,
    payload: displayArray
  }
}

export function loadInteractions(interactionsArray){
  return {
    type: LOAD_INTERACTIONS ,
    payload: interactionsArray
  }
}

export function loadCustomers(customersArray){
  return {
    type: LOAD_CUSTOMERS ,
    payload: customersArray
  }
}

export function loadFlags(flagsArray){
  return {
    type: LOAD_FLAGS ,
    payload: flagsArray
  }
}

export function loadTasks(tasksArray){
  return {
    type: LOAD_TASKS ,
    payload: tasksArray
  }
}

export default function reducer(state=initialState , action){
  switch(action.type){
    case LOGIN_AGENT :
      return {...state , agent: action.payload}
    case LOAD_DISPLAY :
      return {...state , display: action.payload}
    case LOAD_INTERACTIONS :
      return {...state , interactions: action.payload}
    case LOAD_CUSTOMERS :
      return {...state , customers: action.payload}
    case LOAD_FLAGS :
      return {...state , flags: action.payload}
    case LOAD_TASKS :
      return {...state , tasks: action.payload}
    default:
      return state
  }
}