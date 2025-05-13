import './style.css'

// Component = HTML + CSS + JS
const MyComponent = () =>{
    // const value = "My First Component 1"; // String
    // const value = 25; // Number
    // const value = true; // Boolean
    // const value = undefined; // Undefined
    // const value = null; // Null
    const value = [1, 2, 3]; // Array
    // const value = {name: "John", age: 25}; // Object
  return (
    <>
        <div> {JSON.stringify(value)} Updated</div>
        <div>{console.log("TT")}</div>
        <div className='child'
            style={{borderRadius: '10px'}}
        >Child</div>
    </>
  );
}

export default MyComponent;