import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useMoralis,useWeb3Transfer } from 'react-moralis';
import { ethers } from 'ethers';
import {useLocation,Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

function MintForm() {
    const {
      authenticate,
      isAuthenticated,
      account
    } = useMoralis();
    const navigate=useNavigate()
    const location = useLocation()
    const from = location.state
    const [Account,setAccount]=useState(account)
    const [Serial,setSerial]=useState("")
    const [Expiry,setExpiry]=useState(from.warranty)
    const [Contract,setContract]=useState(from.contract)
    const [Id,setId]=useState(from.id)
    const { fetch, error, isFetching } = useWeb3Transfer({
        type: "erc1155",
        receiver: Account,
        contractAddress: Contract,
        tokenId: Id,
        amount: 1,
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('/api/transfer', {
          serial: Serial,
          account: Account,
          time: parseInt(Expiry)*60,
          id: Id,
          contract: Contract
        })
        .then(async (res)=> {
          if(res.data.isExpired===false && res.data.cancelTrans===false)
          {
            if (isAuthenticated) {
              await authenticate({ signingMessage: "Transfered By Me" })
                  .then(function (user) {
                  console.log("logged in user:", user);
                  console.log(user.get("ethAddress"));
                  const provider=new ethers.providers.Web3Provider(window.ethereum)
                  await fetch()
                  !error && alert("Done Transfer")
                  })
                  .catch(function (error) {
                  console.log(error);
                  });
                  setAccount("")
                  setExpiry("")
                  setSerial("")
              }
          }
          else if(res.data.isExpired===true && res.data.cancelTrans===true)
          {
            alert("The NFT is Decayed...")
            navigate('/decay',{replace: true,state:{id:Id,contract:Contract,warranty:Expiry}})
          }
          else if(res.data.isExpired===false && res.data.cancelTrans===true)
          {
            alert("There was an error during the transaction")
            navigate('/transfer',{replace: true,state:{id:Id,contract:Contract,warranty:Expiry}})
          }
        })
        .catch(function (err) {
          console.log(err);
        });
      };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Serial Number</Form.Label>
        <Form.Control type="text" placeholder="Serial Number" value={Serial} onChange={(e)=>setSerial(e.target.value)} required/>
        <Form.Text className="text-muted">
          The Serial Number of the product
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Account Address</Form.Label>
        <Form.Control type="text" placeholder="Account Address" value={Account} onChange={(e)=>setAccount(e.target.value)} required/>
        <Form.Text className="text-muted">
          The account id is filled by the system
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>NFT Id</Form.Label>
        <Form.Control type="text" placeholder="NFT Id" value={Id} onChange={(e)=>setId(e.target.value)} required/>
        <Form.Text className="text-muted">
          The Id of NFT
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Transfer!
      </Button>
      <Link className="btn btn-primary" style={{"margin":"1vw"}} to={{pathname:"/"}} state={{contract:Contract}}>Back</Link>
    </Form>
  );
}

export default MintForm;