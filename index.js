
const express = require('express');
const db = require('../advproj/database');

const app = express();
app.listen(3000, () => {
  console.log('welcome');
})

app.get('/test', async (req, res) => {
  try {
    db.query(`SELECT * FROM Employers`,(error,result)=>{
      res.json(result);
    })
  } catch (error) {
    
  }
});




