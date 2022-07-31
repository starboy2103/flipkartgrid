import React from 'react'
import {useState} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useLocation,Link} from 'react-router-dom'


export default function NFTtray() {
  const location = useLocation()
  const from = location.state
  var [Nft,setNft]=useState([]);
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
      <div className="container col col-md-4" style={{"width": "auto"}}>
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
          <Card style={{ width: '18rem' }} key={e.token_id}>
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
      </div>
  );
}
