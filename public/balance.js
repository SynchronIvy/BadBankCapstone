function Balance(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [balance, setBalance] = React.useState(0);

  const userName = props.userName;
  const email = props.email;

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setBalance={setBalance} userName={userName} email={email} setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg balance={balance} userName={userName} email={email} setShow={setShow} setStatus={setStatus}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>{props.userName}, your current balance is: ${props.balance}</h5>
    {(<img src="./images/balance.png" className="img-fluid" alt="Responsive image"/>)}
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){ 

  function handle(){
    fetch(`/account/findOne/${props.email}`)
    .then(response => response.json())
    .then((data) => {
        if (data && data.balance !== undefined) {
            props.setStatus('');
            props.setShow(false);
            props.setBalance(data.balance);
            console.log('JSON:', data);
        } else {
          console.log('Invalid response format:' + data);
        }
      })
      .catch((error) => {
            props.setStatus('Error fetching data')
            console.log('error:', error);
        });
  }

  return (<>

    <h5>Click the button to check your balance, {props.userName}</h5>
    {(<img src="./images/balance.png" className="img-fluid" alt="Responsive image"/>)}
    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}