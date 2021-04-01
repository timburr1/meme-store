var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "sqluser",
  password: "sqluserpw",
  database: "lol"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var createTable = "CREATE TABLE IF NOT EXISTS lol.memeStore (filename VARCHAR(256));";
  con.query(createTable, function (err, result) {
    if (err) throw err;
    console.log("Meme table created");
  });
});

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

 async function getMeme() {  
   return new Promise( resolve => {
  con.query("SELECT filename FROM lol.memeStore;", 
  function (err, result, fields) {
      if (err) throw err;

      var i = getRandomIndex(result.length);
     resolve(result[i].filename);        
  })
  });  
}

function insertMeme(filename) {
  con.query("INSERT INTO lol.memeStore VALUES ( ? )", [[filename]], 
  function (err, result) {
      if (err) throw err;
      console.log("Inserted filename: " + filename);
  });    
}

module.exports = {
  insertMeme: insertMeme,  
  getMeme: getMeme
};
