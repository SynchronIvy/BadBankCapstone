function Login(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');     
  const [loggedIn, setLoggedIn] = React.useState(props.loggedIn);


  // callback function to Spa() about login status change
  function changeStatus(newLoggedInState) {
    setLoggedIn(newLoggedInState);
    props.handleLoggedInChange(newLoggedInState);
  };

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? (
        <LoginForm 
        setShow={setShow} 
        setStatus={setStatus} 
        changeStatus={changeStatus}/>
        ) : (
          <LoginMsg setShow={setShow} setStatus={setStatus}/>
        )
      }
    />
  ); 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    {(<img src="./images/loggedin.png" className="img-fluid" alt="Responsive image"/>)}
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
    props.changeStatus(true);

    fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
            console.log('JSON:', data);
            console.log('login successful');
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
  }


  return (<>
    {(<img src="./images/loggedout.png" className="img-fluid" alt="Responsive image"/>)}
    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)
      }/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
}