const Main = () => {
    const callProtectedRoot = async () => {
        const res = await fetch('http://localhost:4000/user/protected', {
            method: 'GET',
            credentials: 'include', // Important: include credentials for cookies
        });
        const jsonres = await res.json();
        console.log(jsonres);
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
