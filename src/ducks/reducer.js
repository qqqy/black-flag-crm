const initialState = {
  agent: {} ,
  display: [] ,
  targetCustomerInfo: {} ,
  targetTicketInfo: {} ,
  targetInteractionInfo: {} ,
  flags: [] ,
  tasks: [] ,
  tickets: [] ,
  interactions: [] ,
  customers: [] ,
  pictureUrl: 'https://s3.us-east-2.amazonaws.com/black-flag-project/' ,
  editTarget: {} ,
}
const LOGIN_AGENT = 'LOGIN_AGENT'
const LOAD_DISPLAY = 'LOAD_DISPLAY'
const LOAD_INTERACTIONS = 'LOAD_INTERACTIONS'
const LOAD_CUSTOMERS = 'LOAD_CUSTOMERS'
const LOAD_FLAGS = 'LOAD_FLAGS'
const LOAD_TASKS = 'LOAD_TASKS'
const LOAD_TICKETS = 'LOAD_TICKETS'
const LOAD_EDIT_TARGET = 'LOAD_EDIT_TARGET'
const TARGET_CUSTOMER = 'TARGET_CUSTOMER'
const TARGET_TICKET = 'TARGET_TICKET'
const TARGET_INTERACTION = 'TARGET_INTERACTION'

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

export function loadTickets(ticketsArray){
  return {
    type: LOAD_TICKETS ,
    payload: ticketsArray
  }
}

export function targetCustomer(customerObject){
  return {
    type: TARGET_CUSTOMER ,
    payload: customerObject
  }
}

export function targetTicket(ticketObject){
  return {
    type: TARGET_TICKET ,
    payload: ticketObject
  }
}

export function targetInteraction(interactionObject){
  return {
    type: TARGET_INTERACTION ,
    payload: interactionObject
  }
}

export function loadEditTarget(targetObject){
  return {
    type: LOAD_EDIT_TARGET ,
    payload: targetObject ,
  }
}

export default function reducer(state=initialState , action){
  // console.log(action.type, action.payload)
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
    case LOAD_TICKETS :
      return {...state , tickets: action.payload}
    case TARGET_CUSTOMER :
      return {...state , targetCustomerInfo: action.payload}
    case TARGET_TICKET :
      return {...state , targetTicketInfo: action.payload}
    case TARGET_INTERACTION :
      return {...state , targetInteractionInfo: action.payload}
    case LOAD_EDIT_TARGET :
      return {...state , editTarget: action.payload}
    default:
      return state
  }
}