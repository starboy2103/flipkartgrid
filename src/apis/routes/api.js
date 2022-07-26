const app=require('express')
const NFTs=require('../controllers/Metadata')

const router=app.Router();

router.get('/',(req,res)=>{
    res.json({"result": NFTs.NFTs.result})
})

module.exports=router