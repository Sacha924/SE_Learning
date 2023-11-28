const Main = () => {
    const callProtectedRoot = async()=>{

    } 
    
    return (
        <div>
            <h1>Welcome to the Main Page</h1>
            <p> if you are here than means you are connected, try to do a request on this protected root</p>
            <button onClick={callProtectedRoot}>click me</button>
        </div>
    );
};

export default Main;
