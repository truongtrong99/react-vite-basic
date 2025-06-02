import { useState } from "react";


const TodoNew = (props) =>{

    //useState Hook
    const [valueInput, setValueInput] = useState("Nguyen Van A");
    const {addNewTodo} = props;

    const handleClick = () =>{
        addNewTodo(valueInput);
        setValueInput("");
    }

    const handleOnchange = (name) =>{
        setValueInput(name);
    }

    return (
        <>
        <div className='todo-new'>
          <input 
            type="text" placeholder='Enter your task'
            onChange={(event) => handleOnchange(event.target.value)} 
            value={valueInput}
          />
          <button 
            style={{cursor:"pointer"}}
            onClick={handleClick}
          >
            Add
          </button>
          <div className="">
            My text Input is = {valueInput}
          </div>
        </div>
        </>
    )
}

export default TodoNew;