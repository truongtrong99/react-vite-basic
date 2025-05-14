

const TodoNew = (props) =>{
    console.log("Check props",props);
    const {addNewTodo} = props;
    // addNewTodo("Nguyen Van A 1");

    const handleClick = () =>{
        alert("Click me");
    }

    const handleOnchange = (name) =>{
        console.log("Change", name);
    }

    return (
        <>
        <div className='todo-new'>
          <input type="text" placeholder='Enter your task'
            onChange={(event) => handleOnchange(event.target.value)} />
          <button 
            style={{cursor:"pointer"}}
            onClick={handleClick}
          >
            Add
          </button>
        </div>
        </>
    )
}

export default TodoNew;