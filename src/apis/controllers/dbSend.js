// var jwt = require('jsonwebtoken');

// const token=jwt.sign({
//     data: '1'
//   }, 'secret', { expiresIn: '5s' });
// console.log(token)
// const myTimeout = setTimeout(myStopFunction, 5000);
// function myStopFunction() {
//   jwt.verify(token, 'secret',(err,decoded)=>{
//     if(err)
//     {
//       console.log(typeof err.name)
//     }
//     else{
//       console.log((decoded.exp-decoded.iat))
//     }
//   }); 
// }

// module.exports.dbSend=token