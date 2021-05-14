const express = require('express')
const fs = require('fs')
const { isRegExp } = require('util')
const router = express.Router()


function getKodersFile(){
    const content = fs.readFileSync('koders.json', 'utf8')
    return JSON.parse(content)
}

/*Practica:
  Crear un router para mentores
  GET /mentores
  GET /mentores/:id
  POST /mentores
  PATCH /mentores/:id
  DELETE /mentores/:id */ 


    router.get('/', (req,res)=>{
        const json = getKodersFile()
        const mentors = json.mentores
        res.json({mentors})
    })

    router.get('/:id',(req,res) => {
        const id = req.params.id
        const json = getKodersFile()
        res.json(json.mentores.find(mentor => id == mentor.id))

    })

    router.post('/', (req,res)=>{
        const id = parseInt(req.body.id)
        const name = req.body.name
        const module = req.body.module
        const newMentor = {id,name,module}
        
        const json = getKodersFile()
        
        json.mentores.push(newMentor)
        fs.writeFileSync('koders.json', JSON.stringify(json))
        res.json({
            "message" : "Ok"
        })
    })

    router.patch("/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const name = req.body.name;
      
        const json = getKodersFile()
      
        const updateKoder = json.mentores.reduce((acc, cur) => {
          if (id == cur.id) {
            cur.name = name;
          }
          return [...acc, cur];
        }, []);
        json.mentores = updateKoder;
        fs.writeFileSync("koders.json", JSON.stringify(json, null, 2), "utf8");
        res.json({ succes: "true" });
      });

      router.delete("/:id", (req, res) => {
        const json = getKodersFile()
        const id = req.params.id;
        const filterJson = json.mentores.filter((el) => id != el.id);
        json.mentores = filterJson;
        fs.writeFileSync("koders.json", JSON.stringify(json, null, 2), "utf8");
        res.json({ succes: "true" });
      

      });
module.exports = router