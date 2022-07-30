import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useMoralis,useWeb3Transfer } from 'react-moralis';
import { ethers } from 'ethers';
import {useLocation,Link,useNavigate} from 'react-router-dom';
import {Navigate} from 'react-router'
import axios from 'axios';
const contractAddress="0xc642b1f83471690abfc6b12844cdd815e9b739eb"

function MintForm() {
    const {
      authenticate,
      isAuthenticated,
      isAuthenticating,
      user,
      account,
      logout
    } = useMoralis();
    const navigate=useNavigate()
    const location = useLocation()
    const from = location.state
    const [Account,setAccount]=useState(account)
    const [Serial,setSerial]=useState("")
    const [Expiry,setExpiry]=useState("")
    const [Id,setId]=useState(from.id)
    const { fetch, error, isFetching } = useWeb3Transfer({
        type: "erc1155",
        receiver: Account,
        contractAddress: contractAddress,
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
                  fetch()
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
            navigate('/decay',{replace: true,state:{id:Id}})
          }
          else if(res.data.isExpired===false && res.data.cancelTrans===true)
          {
            alert("There was an error during the transaction")
            navigate('/transfer',{replace: true})
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
      </Form.Group><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Expiry Time in minutes</Form.Label>
        <Form.Control type="text" placeholder="Expiry Time" value={Expiry} onChange={(e)=>setExpiry(e.target.value)} required/>
        <Form.Text className="text-muted">
          The Expiry date of the product
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
      <Link className="btn btn-primary" style={{"margin":"1vw"}} to={{pathname:"/"}}>Back</Link>
    </Form>
  );
}

export default MintForm;