function Logout(){
    const [show, setShow]     = React.useState(true);
    const [status, setStatus] = React.useState('');   
    const [loggedIn, setLoggedIn] = React.useState(true);

    return (
        <Card
          bgcolor="secondary"
          header="Logout"
          status={status}
          body={show ? 
            <LogoutForm setShow={setShow} setStatus={setStatus} setLoggedIn={setLoggedIn}/> :
            <LogoutMsg setShow={setShow} setStatus={setStatus}/>}
        />
      ) 
}

function LogoutMsg(props){
    function goHome() {
        props.setShow(true); 
        window.location.replace("./#")
    }

    return(<>
        <h5>You have been logged out.</h5>
        <button type="submit" 
        className="btn btn-light" 
        onClick={goHome}>
            Return to Home Page
        </button>
    </>);
}

function LogoutForm(props){ 
    function handle(){
        fetch(`account/logout/${props.loggedIn}`)
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                props.setStatus('');
                props.setLoggedIn(false);
                props.setShow(false);
                console.log('JSON:', data);
            } catch(err) {
                props.setStatus(text);
                console.log('LoggedIn user not found');
            }
        });
    }
   
    return (<>
    
        <button type="submit" className="btn btn-light" onClick={handle}>Logout</button>
       
      </>);
}

