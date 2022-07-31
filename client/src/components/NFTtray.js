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
            <Form.Label>NFT Contract Address</Form.Label>
            <Form.Control type="text" placeholder="Contract address" value={contractAdd} onChange={(e)=>{setcontractAdd(e.target.value)}} required/>
            <Form.Text className="text-muted">
              Refer to the contract adderss mentioned in the table
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
        <h2>Contract Addresses</h2>
        <Table striped bordered hover style={{"margin-bottom":"5%"}}>
          <thead>
            <tr>
              <th>#</th>
              <th>Contract Address</th>
              <th>Private Key</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>0x8b17507912be185326c411060d1df02756dadfb6</td>
              <td>ff7e4d44fdb62da57856cdcd41372535c8129842c6359e2f297623ceccb217a2</td>
            </tr>
            <tr>
              <td>2</td>
              <td>0x21d06f5f2d1f7fefdfadff287a7c3ee8ebc2b41a</td>
              <td>f0fced86c731059a6101685570ba4ec6391fc68ca7b56c447da4f2df11a05f3c</td>
            </tr>
          </tbody>
        </Table>
      </div>
  );
}
