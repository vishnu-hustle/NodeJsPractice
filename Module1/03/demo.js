   var fs = require('fs');

   var y;

   function cb(x) {
       y = x;
   }
   fs.readFile('./data.json', 'utf-8', (error, data) => {
       var data = JSON.parse(data);
       fs.writeFile("data3.json", JSON.stringify(data), (err) => {
           console.log('write finished', err)
       });
       return cb(data);
   });
   var z = {
       firstName: "Jhon",
       lastName: "Doe"

   };
   fs.writeFile("data2.json", JSON.stringify(z), (err) => {
       console.log('write finished', err)
   });