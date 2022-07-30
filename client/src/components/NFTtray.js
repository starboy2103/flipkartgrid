import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useLocation} from 'react-router-dom'


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
        <Form onSubmit={handleSubmit}>
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
          <div className="card" key={e.token_id}>
            <img className="card-img-top" src={JSON.parse(e.metadata).image} alt="NFT"/>
            <div className="card-body">
                <h5 className="card-title">{JSON.parse(e.metadata).name}</h5>
                <p className="card-text">Number of NFTs: {e.amount}</p>
                <p className="card-text">{JSON.parse(e.metadata).description}</p>
                <Link className="btn btn-primary" to={{pathname:"/mint"}} state={{id:e.token_id,contract:contractAdd}}>Mint</Link>
                <Link className="btn btn-primary" to={{pathname:"/transfer"}} state={{id:e.token_id,contract:contractAdd,warranty:JSON.parse(e.metadata).attributes[0].value}}>Transfer</Link>
            </div>
          </div>
        ))}
      </div>
  );
}
