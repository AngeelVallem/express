const express = require('express')
const fs = require('fs')
const router = express.Router()

const newKoder = {
    name: "angel",
    gende: "m",
  };

function getKodersFile(){
    const content = fs.readFileSync('koders.json', 'utf8')
    return JSON.parse(content)
}


// get query paramas
router.get("/", (req, res) => {
    const genderFilter = req.query.gender  
    const count = parseInt(req.query.count)
    const name = req.query.name
    const json = getKodersFile();
    let kodersData = null  
  
  if(genderFilter){
      kodersData  = json.koders.filter(koder => koder.gender == genderFilter)
  }
  
  if(name){
      const koder = kodersData || json.koders
      kodersData = koder.filter(koder => koder.name == name)
  }
  
  if(count){
      const datafilteredbyCount = kodersData || json.koders 
      kodersData = datafilteredbyCount.splice(0,count)
  }
  
  
  json.koders = kodersData || json.koders
  
  console.log(req.query);
  
  
  res.json(json.koders)
  });
  
  // Add new koder
  router.post("/", (req, res) => {
    fs.readFile("koders.json", "utf8", (err, data) => {
      let json = JSON.parse(data);
      if (err) {
        console.log("err", err);
      } else {
        json.koders.push(newKoder);
        fs.writeFile("koders.json", JSON.stringify(json), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("ok");
          }
        });
      }
    });
    res.end();
  });
  router.put("/", (req, res) => {
    res.write("Aqui puedes sustituir un koder");
    res.end();
  });
  router.patch("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const name = req.body.name;
  
    const content = fs.readFileSync("koders.json", "utf8");
    const json = JSON.parse(content);
  
    const updateKoder = json.koders.reduce((acc, cur) => {
      if (id == cur.id) {
        cur.name = name;
      }
      return [...acc, cur];
    }, []);
    json.koder = updateKoder;
    fs.writeFileSync("koders.json", JSON.stringify(json, null, 2), "utf8");
    res.json({ succes: "true" });
  });
  router.delete("/:id", (req, res) => {
    const content = fs.readFileSync("koders.json", "utf8");
    const json = JSON.parse(content);
    const id = req.params.id;
    const filterJson = json.koders.filter((el) => id != el.id);
    json.koders = filterJson;
    fs.writeFileSync("koders.json", JSON.stringify(json, null, 2), "utf8");
    res.json({ succes: "true" });
  
    //    fs.writeFileSync('koders.json', JSON.stringify( json , null, 2), 'utf8')
    res.json({ succes: "true" });
  });
  
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    const content = fs.readFileSync("koders.json", "utf8");
    const json = JSON.parse(content);
    json.koders.reduce((acc, cur) => {
      if (id == cur.id) {
        return res.json(cur);
      }
    }, {});
  });


  module.exports = router