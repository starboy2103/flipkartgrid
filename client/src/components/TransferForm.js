import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useMoralis,useWeb3Transfer } from 'react-moralis';
import { ethers } from 'ethers';
import {useLocation,Link} from 'react-router-dom';
const contractAddress="0x08283e0ea6bd697e66ec043e91ea1217f165e86a"

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
    const { fetch, error, isFetching } = useWeb3Transfer({
        type: "erc1155",
        receiver: Account,
        contractAddress: contractAddress,
        tokenId: Id,
        amount: Amount,
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isAuthenticated) {
        await authenticate({ signingMessage: "Transfered By Me" })
            .then(function (user) {
            console.log("logged in user:", user);
            console.log(user.get("ethAddress"));
            const provider=new ethers.providers.Web3Provider(window.ethereum)
            setAmount(0)
            fetch()
            !error && alert("Done Transfer")
            })
            .catch(function (error) {
            console.log(error);
            });
        }
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
        Transfer!
      </Button>
      <Link className="btn btn-primary" style={{"margin":"1vw"}} to={{pathname:"/"}}>Back</Link>
    </Form>
  );
}

export default MintForm;