import './style.css'

// Component = HTML + CSS + JS
const MyComponent = () =>{
  return (
    <>
        <div> My First Component Updated</div>
        <div className='child'
            style={{borderRadius: '10px'}}
        >Child</div>
    </>
  );
}

export default MyComponent;