const express = require('express')
const fs = require('fs')
const app = express()
const port = 8080
let k;

const newKoder = {
    "name" : "angel", 
    "gende" : "m"
}

//middleware
app.use(express.json())  

// Get koders json
    app.get('/koders', (req,res)=>{

        fs.readFile('koders.json', 'utf8',(err, data)=> {
            if(err){
                console.log(err)
            }else{
               res.json(JSON.parse(data))
               k = (JSON.parse(data))
            }
        })
    })

    // Add new koder
app.post('/koders', (req,res)=> {
    k.koders.push(newKoder)
    fs.writeFile('koders.json', JSON.stringify(k), (err)=> {
        if(err){
            console.log(err);
        }else{
            console.log('ok');
        }
    })
    res.end()
})

app.put('/koders', (req,res)=>{
    res.write('Aqui puedes sustituir un koder')
    res.end()
})

app.listen(port,() => {
    console.log('server listening');
})


