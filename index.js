const express = require('express')
const fs = require('fs')
const app = express()
const port = 8080

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
            }
        })
    })
    // Add new koder
app.post('/koders', (req,res)=> {
    fs.readFile('koders.json', 'utf8',(err, data)=> {
        let json = JSON.parse(data)
        if(err){
            console.log('err', err);
        }else{
           json.koders.push(newKoder) 
           fs.writeFile('koders.json',JSON.stringify(json), err => {
            if(err){
                console.log(err);
            }else{
               console.log('ok');
            }   
        })
        }
    })
  
    res.end()
})
app.put('/koders', (req,res)=>{
    res.write('Aqui puedes sustituir un koder')
    res.end()
}) 

app.patch('/koders/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const name = req.body.name
    
    const content = fs.readFileSync('koders.json', 'utf8')
    const json = JSON.parse(content) 
    
    const updateKoder  = json.koders.reduce((acc, cur) =>  {
        if(id == cur.id){
            cur.name = name
        }
        return [...acc, cur]
    },[])
    json.koder = updateKoder;
    fs.writeFileSync('koders.json', JSON.stringify(json , null, 2), 'utf8')
        res.json({"succes" : "true"})
})

app.delete('/koders/:id', (req,res)=> {

    const content = fs.readFileSync('koders.json', 'utf8')
    const json = JSON.parse(content)
    const id = req.params.id
    
         json.koders.splice(id - 1, 1)
    

    fs.writeFileSync('koders.json', JSON.stringify( json , null, 2), 'utf8')
    res.json({"succes" : "true"})
})

app.get('/koders/:id', (req,res)=> {
    const id = req.params.id
    const content = fs.readFileSync('koders.json', 'utf8')
    const json = JSON.parse(content)

        const koder = json.koders.reduce((acc,cur)=>  {
            if(id == cur.id){
                return res.json(cur)
            }else{
                console.log('No se encontro ningun koder con ese id');
            }
        } ,{})
})

app.listen(port,() => {
    console.log('server listening');
})
