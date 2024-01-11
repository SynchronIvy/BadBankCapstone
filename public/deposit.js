function Deposit(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  const userName = props.userName;
  const email = props.email;


  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm userName={userName} email={email} setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [amount, setAmount] = React.useState('');

  function handle(){
    fetch(`/account/update/${props.email}/${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            //props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
    });
  }

  return(<>

    <h5>Please enter deposit amount, {props.userName}</h5>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}