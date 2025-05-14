

const TodoData = (props) =>{
    const {todoList} = props;
    return (
        <>
         <div className="todo-data">
            {todoList.map((item,index) =>{
                return (

                <div className="todo-item" >
                    <div>{item.name}</div>
                    <button>Delete</button>
                </div>
            )
            })}
          <div >{JSON.stringify(props.todoList)}</div>
        </div>
        </>
    )
}

export default TodoData;