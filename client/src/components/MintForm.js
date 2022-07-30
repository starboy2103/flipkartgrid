import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useMoralis } from 'react-moralis';
import {useLocation,Link} from 'react-router-dom';
import {ethers} from 'ethers'
import contractAbi from '../contractAbi.json';
const axios = require('axios').default;

function MintForm() {
    const {
      authenticate,
      isAuthenticated,
      isAuthenticating,
      user,
      account,
      logout
    } = useMoralis();
    const location = useLocation()
    const from = location.state
    const [Amount,setAmount]=useState(0)
    const [Account,setAccount]=useState(account)
    const [Id,setId]=useState(from.id)
    const handleSubmit = async (e) => {
      e.preventDefault();
      const provider=new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts',[])
      const signer=provider.getSigner()
      const contract=new ethers.Contract("0xc642b1f83471690abfc6b12844cdd815e9b739eb",contractAbi,signer)
      await contract.mint(Account,Id,Amount)
      setAmount(0)
      alert('Minting Done!')
      };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Account Address</Form.Label>
        <Form.Control type="text" placeholder="Account Address" value={Account} onChange={(e)=>setAccount(e.target.value)}/>
        <Form.Text className="text-muted">
          The account id is filled by the system
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>NFT Id</Form.Label>
        <Form.Control type="text" placeholder="NFT Id" value={Id} onChange={(e)=>setId(e.target.value)}/>
        <Form.Text className="text-muted">
          The Id of NFT
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="text" placeholder="Amount" value={Amount} onChange={(e)=>setAmount(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Mint!
      </Button>
      <Link className="btn btn-primary" style={{"margin":"1vw"}} to={{pathname:"/"}}>Back</Link>
    </Form>
  );
}

export default MintForm;