import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom'
import { useMoralis,useWeb3Transfer } from 'react-moralis';
import { useLocation,useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useState } from 'react';

export default function Decay() {
    const navigate=useNavigate()
    const location = useLocation()
    const from = location.state
    const [Contract,setContract]=useState(from.contract)
    const [Expiry,setExpiry]=useState(from.warranty)
    const {
        authenticate,
        isAuthenticated,
      } = useMoralis();
      const { fetch, error, isFetching } = useWeb3Transfer({
        type: "erc1155",
        receiver: "0x0000000000000000000000000000000000000000",
        contractAddress: Contract,
        tokenId: from.id,
        amount: 1,
    })
    const handleSubmit= async ()=>{
        if (isAuthenticated) {
            await authenticate({ signingMessage: "Transfered By Me" })
                .then(function (user) {
                console.log("logged in user:", user);
                console.log(user.get("ethAddress"));
                const provider=new ethers.providers.Web3Provider(window.ethereum)
                fetch()
                !error && alert("Done Transfer");navigate('/transfer',{replace: true,state:{id:from.id,ontract:Contract,warranty:Expiry}});
                })
                .catch(function (error) {
                console.log(error);
                });
            }
    }
  return (
    <div>
        <Link className="btn btn-primary" style={{"margin":"1vw"}} to={{pathname:"/"}}>Back</Link>
        <Form onSubmit={handleSubmit}>
            <Button variant="primary" type="submit">
                Transfer!
            </Button>
        </Form>
    </div>
  )
}
