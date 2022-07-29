const app=require('express')
const NFTs=require('../controllers/Metadata')

const router=app.Router();

router.get('/',(req,res)=>{
    res.json({"result": NFTs.NFTs.result})
})

// router.post('/transfer',(req,res)=>{
//     Transferer.Transferer(req.body.account,req.body.amount,req.body.Id)
//     res.json(Transferer.reciept)
// })

module.exports=router