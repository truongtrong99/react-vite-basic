

const TodoNew = (props) =>{
    console.log("Check props",props);
    const {addNewTodo} = props;
    // addNewTodo("Nguyen Van A 1");
    return (
        <>
        <div className='todo-new'>
          <input type="text" placeholder='Enter your task'/>
          <button>Add</button>
        </div>
        </>
    )
}

export default TodoNew;