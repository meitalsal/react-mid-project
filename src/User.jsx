import {useState, useEffect} from 'react'
import {getUserTodos, getUserPosts} from './utils';
import './User.css'
import {v4 as uuidv4 } from 'uuid'

function User(props) {
  

    const [todos, setTodos] = useState([]);
    const [posts, setPosts] = useState([]);
    const [todosId, setTodosId] = useState('');
    const [addTodo, setAddTodo] = useState(false);
    const [addPost, setAddPost] = useState(false);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostBody, setNewPostBody] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [displayTasks, setDisplayTasks] = useState(false);
    const [displayAddress, setDisplayAddress] = useState(false);
    const [idClick, setIdClick] = useState(false);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");

    useEffect(() => {
      const hideTasks = () => {
        if(props.displayAddUser===true){
          setDisplayTasks(false)
        }

      }
      hideTasks();
    },[props.displayAddUser])


    const updateUser = () => {
      props.userData.name = name? name : props.userData.name;
      props.userData.email = email? email : props.userData.email;
      props.userData.address.street = street? street : props.userData.address.street;
      props.userData.address.city = city? city : props.userData.address.city;
      props.userData.address.zipcode = zipcode? zipcode : props.userData.address.zipcode;
    }

    const deleteUser = (e) => {
      e.preventDefault();
      props.delete(props.userData.id); 
    }
 
    const getOtherData = () => {
      setDisplayAddress(true)
    }
    const hideOtherData = () => {
      setDisplayAddress(false)
    }

    const handleIdClick = async() => {
      if(props.displayAddUser===false){
        const userTodos = await getUserTodos(props.userData.id);
        const userPosts = await getUserPosts(props.userData.id);
        setTodos(userTodos);
        setPosts(userPosts);

        setIdClick(!idClick);
        setDisplayTasks(!displayTasks)
      }
      else{
        props.callback(false);
        const userTodos = await getUserTodos(props.userData.id);
        const userPosts = await getUserPosts(props.userData.id);
        setTodos(userTodos);
        setPosts(userPosts);
        setIdClick(!idClick);
        setDisplayTasks(!displayTasks)
      }
    }

const handleCompletedClick = () =>{
  const index = todos.findIndex(todo => todo.id === todosId)
  todos[index].completed=true;

  const unCompletedTasks = todos.filter(todo => todo.completed===false)
  if(unCompletedTasks.length===0){
    setIsCompleted(true)
  }
  setTodosId('')
}

const addNewTodo = () => {
  let updateTodosList = todos;
  const index = todos.length;
  updateTodosList.push({userId: props.userData.id, id: uuidv4(), title: newTodoTitle, completed: false})
  setTodos(updateTodosList)
  setAddTodo(false)
  if(isCompleted==true){
    setIsCompleted(!isCompleted);
  }
}

const addNewPost = () => {
  let updatePostsList = posts;
  updatePostsList.push({userId: props.userData.id, id: uuidv4(), title: newPostTitle, body: newPostBody})
  setPosts(updatePostsList)
  setAddPost(false)
}



  return (
    <>
    <div className='userContainer'>
      <div className= {isCompleted? "userContainer-green": "userContainer-red"} style={{backgroundColor:idClick? "rgb(252, 209, 130)": "white"}}>
        <div className="userDetails">
          <div>
            <div><label onClick={handleIdClick}>ID :{props.userData.id} </label>  </div><br />
            <div><label> Name : </label><input type="text" defaultValue={props.userData.name} onChange={(e) => setName(e.target.value)} /></div> <br />
            <div><label>Email : </label><input type="text" defaultValue={props.userData.email} onChange={e => setEmail(e.target.value)}/></div><br />
          </div>
        </div> <br />

        <div className={displayAddress? 'otherData-column' : 'otherData-row'} >
            <button className='otherDataBtn' onClick={hideOtherData} onMouseOver={(getOtherData)} >Other Data</button>
            <div className={displayAddress? 'showAddressData': 'hideAddressData'} >
              <div className='addressData'>
                <div><label>Street:</label> <input type="text" defaultValue={props.userData.address.street} onChange={e => setStreet(e.target.value)} /></div> <br />
                <div><label>City:</label> <input type="text" defaultValue={props.userData.address.city} onChange={e => setCity(e.target.value)} /> </div><br />
                <div><label>Zip Code:</label><input type="text" defaultValue={props.userData.address.zipcode} onChange={e => setZipcode(e.target.value)} /></div> <br />
              </div>
            </div>
        
          <div style={{marginLeft: displayAddress? "10em" : "0px"}}>
            <button onClick={updateUser}>Update</button>
            <button onClick={deleteUser}>Delete</button>
          </div>
        </div>
      </div>


      <div className={displayTasks? 'showTasks': 'hideTasks'}>
        <div className='tasksHeaders'>{addTodo? "New Todo - User": "Todos - User"}  {props.userData.id} <button onClick={()=>setAddTodo(true)}>Add</button></div>
        
        <div className={addTodo?'hide-todo-container' : 'show-todo-container'}>
          <ul>
          {todos.map((todo,index) => {
                return (
                <li key={index}>
                  <u>Title</u> : {todo.title} <br /><br />
                  <u>Completed</u> : {JSON.stringify(todo.completed)}
                    <button onMouseOver={()=>setTodosId(todo.id)} onClick={handleCompletedClick} className={todo.completed? 'hideBtn' : 'showBtn'} >Mark Completed</button>
                </li>
                )
            })} 
          </ul>
        </div>
        <div className={addTodo?'show-todo-container' : 'hide-todo-container'}>
          <div><label>Title:</label><input type="text" onChange={(e)=>setNewTodoTitle(e.target.value)}/></div> <br />
          <div style={{float: 'right'}}>
            <button onClick={()=> setAddTodo(false)}>Cancel</button>
            <button onClick={addNewTodo}>Add</button>
          </div>
        </div>

        <div className='tasksHeaders'>{addPost? "New Post - User": "Posts - User"} {props.userData.id} <button onClick={()=>setAddPost(true)}>Add</button></div>
        <div className={addPost? 'hide-post-container' : 'show-post-container'}>
          <ul>
               {posts.map((post,index) => {
                    return (
                    <li key={index}>
                        <u>Title</u> : {post.title} <br /><br />
                        <u>Body</u> : {post.body}
                    </li>
                    )
                })} 
            </ul>
        </div>
        <div className={addPost?'show-post-container' : 'hide-post-container'}>
          <div><label>Title:</label><input type="text" onChange={(e)=>setNewPostTitle(e.target.value)}/></div> <br />
          <div><label>Body:</label><input type="text" onChange={(e)=>setNewPostBody(e.target.value)}/></div> <br />

          <div style={{float: 'right'}}>
            <button onClick={()=> setAddPost(false)}>Cancel</button>
            <button onClick={addNewPost}>Add</button>
          </div>
        </div>
      </div>

    </div>
    </>
  )
}

export default User
