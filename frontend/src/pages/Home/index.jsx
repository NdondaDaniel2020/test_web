import './style.css'
import { useEffect, useState, useRef } from 'react'
import api from '../../services/api'
import Lixira from '../../assets/lixeira.png'

function Home() {

  const [Users, setUsers] = useState([])
  const inputName = useRef()
  const inputEmail = useRef()

  async function getUsers() {
      const usersFromApi = await api.get('/users')
      setUsers(usersFromApi.data)
  }

  async function createUser() {
    const newUser = {
      name: inputName.current.value,
      email: inputEmail.current.value
    }
    await api.post('/user', newUser)
    getUsers()
  }

  async function deleteUser(email) {
    await api.delete('/user', { data: { email } })
    getUsers()
  }
  
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>cadastro de usuarios</h1>
        <input placeholder="Nome"  name="nome" type="nome" ref={inputName} />
        <input placeholder="Email" name="Email" type="email" ref={inputEmail} />
        <button type="button" onClick={createUser}>cadastrar</button>
      </form>

      {Users.map( user => (
        <div className="card" key={user.id}>
        <section>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
        </section>
        <button type="button" onClick={() => deleteUser(user.email)}>
          <img src={Lixira} />
        </button>
      </div>
      ) )}

    </div>
  )
}

export default Home
