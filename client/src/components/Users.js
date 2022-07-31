import React from "react";
import { useMoralisWeb3Api } from "react-moralis";
import { useLocation,Link } from 'react-router-dom';
import { useState,useEffect } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
const axios = require('axios').default;

export default function Users() {
    const Web3Api = useMoralisWeb3Api();
    const location=useLocation()
    const from=location.state
    const [users,setUsers]=useState([])
    const [Serial,setSerial]=useState("")
    const [Contract,setContract]=useState(from.contract)
    const fetchNFTTrades = async () => {
    const options = {
        address: Contract,
        chain: "rinkeby",
    };
        const NFTTrades = await Web3Api.token.getNFTOwners(options);
        setUsers(NFTTrades)
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const res=await axios.post('/api/users',{serial:Serial})
        setUsers(res.data.result)
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Serial Number</Form.Label>
                    <Form.Control type="text" placeholder="Serial Number" value={Serial} onChange={(e)=>setSerial(e.target.value)} required/>
                    <Form.Text className="text-muted">
                    The Serial Number of the product
                    </Form.Text>
                    <Button variant="primary" type="submit">
                        Transfer!
                    </Button>
                </Form.Group>
            </Form>
            {users!==undefined && users.map((e)=>(
                <Card style={{ width: '18rem' }} key={e._id}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>{e.sender}</ListGroup.Item>
                        <ListGroup.Item>{e.reciever}</ListGroup.Item>
                        <ListGroup.Item>{e.createdAt}</ListGroup.Item>
                    </ListGroup>
                </Card>
            ))}
            <Link className="btn btn-primary" style={{"margin":"1vw"}} to={{pathname:"/"}} state={{contract:Contract}}>Back</Link>
        </div>
    )
}
