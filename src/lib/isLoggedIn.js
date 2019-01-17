export default function isLoggedIn(props){
  if (!props.agent.agent_id){return props.history.push('/login')}
}