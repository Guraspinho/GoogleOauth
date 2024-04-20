const express = require('express');
require('dotenv').config();


const requestRouter = require('./routes/request');
const responseRouter = require('./routes/response');
const app = express();

// app.options('*',function(req,res,next){
//     res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Headers", ['X-Requested-With','content-type','credentials']);
//     res.header('Access-Control-Allow-Methods', 'GET,POST');
//     res.status(200);
//     next()
//   })
  


app.use(express.json());    


app.use('/', requestRouter);    
app.use('/response', responseRouter);


const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server is running on port ${PORT}`);
});