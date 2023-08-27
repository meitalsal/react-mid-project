import {useState} from 'react'

function Search(props) {
    const [addNewUser, setAddNewUser] = useState(false)
    const handleChange = (e) => {
        props.searchCallback(e);
    }
    const handleClick = () => {
      props.newUserCallback(true);
  }


  return (
    <>
        <div className='search'>
            Search <input type="text" onChange={handleChange}/> <button onClick={handleClick}>Add</button>
      </div>
    </>
  )
}

export default Search