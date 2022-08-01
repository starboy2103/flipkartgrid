import React from 'react'
import {useState} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import {useLocation,Link} from 'react-router-dom'


export default function NFTtray() {
  const location = useLocation()
  const from = location.state
  var [Nft,setNft]=useState([]);
  const [show, setShow] = useState(true);
  var [contractAdd,setcontractAdd]=useState((!from)?"":from.contract);
  const handleSubmit=async (e)=>{
    e.preventDefault();
    await fetch('/api/',{
      method: 'POST',
      body: JSON.stringify({
        contract: contractAdd 
      }),
      headers: {'Content-Type': 'application/json'},
    }).then((res)=>{
      return res.json()
    }).then(jsonRes=>{
      if(jsonRes!==undefined){setNft(jsonRes)}
    })
  }
  return (
      <div style={{"width": "80%","margin-left":"10%","margin-top":"2%"}}>
        <Alert show={show} variant="success">
          <Alert.Heading>Welcome to our Dapp</Alert.Heading>
          <p>
            This is our prototype for the topic "Blockcahin Based e-Warranty System using NFTs"
          </p>
          <p><b><u>Bug fix</u>: You can now use your metamask account Id to fetch the NFTs</b><br/><i>Please refer to the table for metamask accounts that we have created for testing</i></p>
          <p>By:-<br/>1) Kowshal<br/>2) Utkarsh</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => {setShow(false)}} variant="outline-success">
              Let's Go!
            </Button>
          </div>
        </Alert>
        {!show && <Button onClick={() => setShow(true)} style={{"right":"1rem","bottom":"1rem","position":"fixed"}}>Show Developers</Button>}
        <Form onSubmit={handleSubmit} style={{"margin-bottom":"2rem"}}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Account Address</Form.Label>
            <Form.Control type="text" placeholder="Contract address" value={contractAdd} onChange={(e)=>{setcontractAdd(e.target.value)}} required/>
            <Form.Text className="text-muted">
              Refer to the metamask account adderss mentioned in the table or any account containing NFTs
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {Nft.result!==undefined && Nft.result.map((e)=>(
          <Card style={{"width": "40%","margin-bottom":"2%","margin-left":"30%"}} key={e.token_id}>
            <Card.Img variant="top" src={JSON.parse(e.metadata).image} alt="NFT" />
            <Card.Body>
              <Card.Title>{JSON.parse(e.metadata).name}</Card.Title>
              <Card.Text>
              Number of NFTs: {e.amount}
              </Card.Text>
              <Card.Text>
              {JSON.parse(e.metadata).description}
              </Card.Text>
              <Link className="btn btn-primary" style={{"margin-left": "0.1rem","margin-right":"0.5rem"}} to={{pathname:"/mint"}} state={{id:e.token_id,contract:contractAdd}}>Mint</Link>
              <Link className="btn btn-primary"  style={{"margin-left": "0.1rem","margin-right":"0.5rem"}} to={{pathname:"/transfer"}} state={{id:e.token_id,contract:contractAdd,warranty:JSON.parse(e.metadata).attributes[0].value}}>Transfer</Link>
              <Link className="btn btn-primary"  to={{pathname:"/users"}} state={{id:e.token_id,contract:contractAdd}}>Owners</Link>
            </Card.Body>
          </Card>
        ))}
        <h2>Metamask Accounts</h2>
        <Table striped bordered hover style={{"margin-bottom":"5%"}}>
          <thead>
            <tr>
              <th>#</th>
              <th>Account Address</th>
              <th>Private Key</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>0xBa1384860A2E9DbbE0A878ee5b2dd38e4a1C14b5</td>
              <td>ff7e4d44fdb62da57856cdcd41372535c8129842c6359e2f297623ceccb217a2</td>
            </tr>
            <tr>
              <td>2</td>
              <td>0x172aB9fb21e46474B434F0799Ab7A406B8997b1c</td>
              <td>f0fced86c731059a6101685570ba4ec6391fc68ca7b56c447da4f2df11a05f3c</td>
            </tr>
          </tbody>
        </Table>
      </div>
  );
}
