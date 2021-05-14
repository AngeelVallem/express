const express = require("express");
const app = express();
const kodersRouter = require('./routers/koders')
const mentorsRouter = require('./routers/mentors')

const port = 8080;




//middleware
app.use(express.json());
app.use('/koders', kodersRouter)
app.use('/mentors', mentorsRouter)



app.listen(port, () => {
  console.log("server listening");
});
