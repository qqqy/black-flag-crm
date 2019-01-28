import axios from 'axios'

export default async function isLoggedIn(props){
  console.log("Checking Authorization...")
  try {
    let res = await axios.get('/test/session')
    // console.log(res.data)
    if(!res.data.agent){
      alert('Please Log In...')
      props.history.push('/login')
    }
  } catch (error) {
    alert('An error occurred during login:' , error.message)
    props.history.push('/login')
  }
}