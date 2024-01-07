function Spa() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  // check in there is a user loggedin 
  function checkLogin() {
    fetch('account/findLoggedIn')
      .then(response => response.json())
      .then(data => {
        if (data && data.loggedIn !== undefined) {
          setLoggedIn(data.loggedIn || false);
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

    return (
      <HashRouter>
        <div>
          {loggedIn ? (
            <LoggedInNavBar/>
          ) : (
            <LoggedOutNavBar/>
          )}       
          <UserContext.Provider value={{users:[{name:'',email:'',password:'',balance:0, loggedIn:false}]}}>
            <div className="container" style={{padding: "20px"}}>
              <Route path="/" exact component={Home} />
              <Route path="/CreateAccount/" component={CreateAccount} />
              <Route path="/login/" component={Login} />
              <Route path="/logout/" component={Logout} />
              <Route path="/deposit/" component={Deposit} />
              <Route path="/withdraw/" component={Withdraw} />
              <Route path="/balance/" component={Balance} />
              <Route path="/alldata/" component={AllData} />
            </div>
          </UserContext.Provider>
        </div>
      </HashRouter>
    );
  }

const LoggedInNavBar = () => {
  // LoggedIn NavBar option
  return(

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">BadBank</a>
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
    </nav>
)};

const LoggedOutNavBar = () => {
  // LoggedOut/default Navbar Option
  return(

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">BadBank</a>
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
