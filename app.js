const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req,res)=>{
        res.json({
            'message':'welcome to api'
        });
});

app.post('/api/posts',verifyToken,(req,res)=>{
    jwt.verify(req.token,'scretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                'message':'Post Created',
                 authData:authData.user
            });
        }
    });
    
});

app.post('/api/login',(req,res)=>{
    // Mock User
    const user = {
        id:1,
        username:'nishit',
        email:'nishit.shah44@gmail.com'
    }
    jwt.sign({user:user},'scretkey',(err,token)=>{
        res.json({
            token
        })
    });
});

// FORMAT OF TOKEN 
// Authorization: Bearer <access_token>

//verify token
function verifyToken(req,res,next) {
    // Get Auth header value
    const bearerHeader = req.headers['authorization'];        
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        req.token = bearerHeader;
        next();
    }else{
        // Forbidden
        res.sendStatus(403);
    }
}

app.listen(3000,()=>{
    console.log('Server started on port 3000.');
});
