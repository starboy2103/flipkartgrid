import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'
import { useMoralis } from 'react-moralis';
import {useLocation,Link} from 'react-router-dom';
import {ethers} from 'ethers'
import contractAbi from '../contractAbi.json';

function MintForm() {
    const {
      account
    } = useMoralis();
    const location = useLocation()
    const from = location.state
    const [Amount,setAmount]=useState(0)
    const [Account,setAccount]=useState(account)
    const [Contract,setContract]=useState(from.contract)
    const [Id,setId]=useState(from.id)
    const handleSubmit = async (e) => {
      e.preventDefault();
      const provider=new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts',[])
      const signer=provider.getSigner()
      const contract=new ethers.Contract(Contract,contractAbi,signer)
      await contract.mint(Account,Id,Amount)
      setAmount(0)
      alert('Minting Done!')
      };
  return (
    <div style={{"width": "50%","margin-left":"25%"}}>
      <h2 style={{"margin-top":"5%"}}>Mint Form</h2>
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
        <Link className="btn btn-primary" style={{"margin":"1vw"}} to={{pathname:"/"}} state={{contract:Contract}}>Back</Link>
      </Form>
      <h2 style={{"margin-top":"5%"}}>Availabe NFTs</h2>
      <Table striped bordered hover style={{"margin-bottom":"5%"}}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Laptop</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Washing Machine</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Iphone</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Guitar</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Rado Watch</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Honor Phone</td>
            </tr>
            <tr>
              <td>7</td>
              <td>Rolex</td>
            </tr>
            <tr>
              <td>8</td>
              <td>Rog Zypherus</td>
            </tr>
            <tr>
              <td>9</td>
              <td>Nike</td>
            </tr>
          </tbody>
        </Table>
    </div>
  );
}

export default MintForm;