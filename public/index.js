function Spa() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [email, setEmail]       = React.useState('');

  // check in there is a user loggedin 
  function checkLogin() {
    fetch('account/findLoggedIn')
      .then(response => response.json())
      .then(data => {
        if (data && data.loggedIn !== undefined) {
          setLoggedIn(data.loggedIn || false);
          setUserName(data.name);
          setEmail(data.email);
      } else {
        console.log('Invalid response format:', data);
      }
      })
      .catch(error => {
        console.log('Error fetching logged in status:', error);
    });
  }

  React.useEffect(() => {
    checkLogin();
  }, [loggedIn]); //  variable independency array means it runs if loggedIn changes

  // Callback function passed to children to track login status
  function handleLoggedInChange(newLoggedInState) {
    setLoggedIn(newLoggedInState);
  };

    return (
      <HashRouter>
        <div>
          {loggedIn ? (
            <LoggedInNavBar userName={userName}/>
          ) : (
            <LoggedOutNavBar/>
          )}       
          <UserContext.Provider value={{users:[{name:'',email:'',password:'',balance:0, loggedIn:false}]}}>
            <div className="container" style={{padding: "20px"}}>
              <Route path="/" exact component={Home} />
              <Route path="/CreateAccount/" component={CreateAccount} />
              <Route
                path="/login/"
                render={(props) => <Login {...props} loggedIn={loggedIn} handleLoggedInChange={handleLoggedInChange} checkLogin={checkLogin}/>}
              />
              <Route 
                path="/logout/" 
                render={(props) => <Logout {...props} loggedIn={loggedIn} handleLoggedInChange={handleLoggedInChange} checkLogin={checkLogin}/>}
              />
              <Route 
                path="/deposit/" 
                render={(props) => <Deposit {...props} userName={userName} email={email}/>}
              />
              <Route 
                path="/withdraw/"
                render={(props) => <Withdraw {...props} userName={userName} email={email}/>} 
                />
              <Route 
                path="/balance/"
                render={(props) => <Balance {...props} userName={userName} email={email}/>}
              />
              <Route 
                path="/alldata/" 
                render={(props) => <AllData {...props} userName={userName} email={email}/>}
              />
            </div>
          </UserContext.Provider>
        </div>
      </HashRouter>
    );
  }

const LoggedInNavBar = ({userName}) => {
  // LoggedIn NavBar option
  return(

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
      <img src="./images/logoLI.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
        BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/balance/">Balance</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/">AllData</a>
          </li>       
          <li className="nav-item">
            <a className="btn btn-dark" href="#/logout/">Log Out</a>
          </li>   
        </ul>
      </div>
      <div className="collapse navbar-collapse justify-content-end">
          <li className="navbar-text justify-content-end">
            <a className="navbar-text justify-content-end">Welcome, {userName}</a>
          </li>
          </div>  
    </nav>
)};

const LoggedOutNavBar = () => {
  // LoggedOut/default Navbar Option
  return(

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
      <img src="./images/logoLO.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
        BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/login/">Login</a>
          </li>
        </ul>
      </div>
    </nav>

  )
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
