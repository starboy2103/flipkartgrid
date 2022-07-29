import React from 'react'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'


export default function NFTtray() {
  
  var [Nft,setNft]=useState([]);
  useEffect(()=>{
  const fetchVal=async()=>{
  await fetch('/api/').then((res)=>{
    return res.json()
  }).then(jsonRes=>{
    if(jsonRes!==undefined){setNft(jsonRes)}
  })}
  fetchVal()
  },[])

  return (
      <div className="container col col-md-4" style={{"width": "auto"}}>
        {Nft.result!==undefined && Nft.result.map((e)=>(
          <div className="card" >
            <img className="card-img-top" src={JSON.parse(e.metadata).image} alt="NFT"/>
            <div className="card-body">
                <h5 className="card-title">{JSON.parse(e.metadata).name}</h5>
                <p className="card-text">{JSON.parse(e.metadata).description}</p>
                <Link className="btn btn-primary" to={{pathname:"/mint"}} state={{id:e.token_id}}>Mint</Link>
                <Link className="btn btn-primary" to={{pathname:"/transfer"}} state={{id:e.token_id}}>Transfer</Link>
            </div>
          </div>
        ))}
      </div>
  );
}
