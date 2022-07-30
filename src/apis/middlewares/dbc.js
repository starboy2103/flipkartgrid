const app=require('express')
const decayModel=require('../models/decayDb')
const dbSend=require('../controllers/dbSend')
var jwt = require('jsonwebtoken');

const router=app.Router();

// router.get('/transfer',(req,res)=>{
//     res.json({"Hello":dbSend.dbSend})
// })

router.post('/transfer',async (req,res)=>{
    console.log("reached")
    decayModel.find({"serial": req.body.serial},async (err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else if(!result.length)
        {
            console.log("First transfer")
            const token=jwt.sign({
                serial: req.body.serial
              }, 'secret', { expiresIn: req.body.time });
            console.log(token,req.body.account,req.body.serial,req.body.id,req.body.id)
            const decay = new decayModel({
                userId: req.body.account,
                serial: req.body.serial,
                NftId: req.body.id,
                token: token
            });
            decay.save((err,result)=>{
                if(err){
                    console.log('error in addition')
                    res.json({isExpired:false,cancelTrans:true})
                }
                else{
                    res.json({isExpired:false,cancelTrans:false})
                }
            })
        }
        else
        {
            console.log('Not First transfer.. Check JWT')
            jwt.verify(result.token, 'secret',(err,decoded)=>{
                if(err && err.name!=="TokenExpiredError")
                {
                  console.log(err)
                }
                else if(err && err.name==="TokenExpiredError")
                {
                    res.json({isExpired:true,cancelTrans:true})
                }
                else{
                    decayModel.updateOne({serial:req.body.serial},{$set:{userId:req.body.account}})
                    res.json({isExpired:false,cancelTrans:false})
                }
            }); 
        }
    })
})

module.exports=router