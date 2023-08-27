import { useEffect, useState } from 'react'
import User from './User';

import Search from './Search';
import {getAll} from './utils';
import './App.css'

const usersUrl= "https://jsonplaceholder.typicode.com/users";

function App() {
  const [users, setUsers] = useState([]);
  const [index, setIndex] = useState(10);
  const [displayAddUser, setDisplayAddUser] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const [searchUsers, setSearchUsers] = useState();

  useEffect(() => {
    const getData = async() => {
      const {data: users} = await getAll(usersUrl);
      setUsers(users);
    }
    getData();
  },[])

  const searchData = (e) => {
    let newUsersList = [];
    users.forEach(u => {
      if(u.name.includes(e.target.value) || u.email.includes(e.target.value)){
        newUsersList.push(u);
      }
    })
    setSearchUsers(newUsersList);
  }

const deleteUser = (id) => {
  if(searchUsers) {
    setSearchUsers(searchUsers.filter((u) => u.id !== id));
    setUsers(users.filter((u) => u.id !== id));
  }
  else{
    setUsers(users.filter((u) => u.id !== id));
  }
}


const addButtonClicked = (addbutton) =>{
  if(addbutton===true){
    setDisplayAddUser(true);
  }
}

const addNewUser = () => {
  let updatedUsersList = users;
  setIndex(index+1)
  updatedUsersList.push(
    {
      id: index+1, 
      name: newName, 
      email: newEmail, 
      address:{street:'', suite:'', city:'',Zipcode:'', geo:{lat:'', lng:''}}}
    )

  setUsers(updatedUsersList)
  setDisplayAddUser(false)
}

const displaynewUserScreen = (displayAdd) => {
  setDisplayAddUser(displayAdd)
}


  return (
    <>
    <div className='container'>
      <Search searchCallback={searchData} newUserCallback={addButtonClicked}/><br />
    
      <div className='main'><br/>
        <div className='users'>
          {
          searchUsers? searchUsers.map((user) => {
            return (<User key={user.id} userData={user} delete={deleteUser} displayAddUser={displayAddUser} callback={displaynewUserScreen}/>)
          }) : users.map((user) => {
            return (<User key={user.id} userData={user} delete={deleteUser} displayAddUser={displayAddUser} callback={displaynewUserScreen}/>)
          })
          }
        </div>

      <div className={displayAddUser? 'showAddUser': 'hideAddUser'}>
        <span id='newUserHeader'>Add New User</span>
        <div><label>Name:</label><input type="text" onChange={(e)=>setNewName(e.target.value)}/></div> <br />
        <div><label>Email:</label><input type="email" onChange={(e)=>setNewEmail(e.target.value)}/></div> <br />

          <div className="newUsersButton">
            <button onClick={()=> setDisplayAddUser(false)}>Cancel</button>
            <button onClick={addNewUser}>Add</button>
          </div>
      </div>

      </div>

     </div>

    </>
  )
}

export default App
