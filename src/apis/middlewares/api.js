const app=require('express')
const NFTs=require('../controllers/Metadata')
var jwt = require('jsonwebtoken');
const decayModel=require('../models/decayDb')

const router=app.Router();

router.post('/',async (req,res)=>{
    const val=await NFTs.disp(req.body.contract)
    res.json({"result": val.result})
})

// router.post('/transfer',(req,res)=>{
//     Transferer.Transferer(req.body.account,req.body.amount,req.body.Id)
//     res.json(Transferer.reciept)
// })
router.post('/transfer',async (req,res)=>{
    decayModel.find({"serial": req.body.serial},async (err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else if(!result.length)
        {
            console.log(result)
            const token=jwt.sign({
                serial: req.body.serial
              }, 'secret', { expiresIn: req.body.time });
            const decay = new decayModel({
                userId: req.body.account,
                serial: req.body.serial,
                NftId: req.body.id,
                token: token
            });
            decay.save((err,resu)=>{
                if(err){
                    console.log(err)
                    res.json({isExpired:false,cancelTrans:true})
                }
                else{
                    res.json({isExpired:false,cancelTrans:false})
                }
            })
        }
        else
        {
            const checkToken=result[0].token
            jwt.verify(checkToken, 'secret',(err,decoded)=>{
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