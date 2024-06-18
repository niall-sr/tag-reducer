
import fs from 'node:fs'
import { parse } from 'csv'

const path = './assets/recipe-tags.csv'

let recordsToUpdate = [];


fs.createReadStream(path)
  .pipe(parse({ delimiter: "\n", from_line: 1 }))
  .on("data", function (row) {
    // executed for each row of data

    if(row[0].indexOf('UPDATE') > 0){
        let str = row[0];
        let arr = str.split(',');
        
        console.log('arr.length:', arr.length);

        if(arr.length == 3){
            recordsToUpdate.push({
                old: arr[0],
                new: arr[2].replace("UPDATE TAG: Change to be", "")
                           .replace("UPDATE TAG: Change to ", "")
                           .replace("Change this to", "")
                           .replace("UPDATE TAG: ", "")
                           .replace("Change to be", "")
                           .replace("Change to", "")
                           .replace("Changing to", "")
                           .replace("Relabel to", "")
                           .replace("Relabel as", "")
                           .replace("(deleting recipes)", "")
                           .trim()
            }) 
        }

        // console.log('arr[0]', arr[0]); 
    }
    
  })
  .on("error", function (error) {
    // Handle the errors
    console.log(error.message);
  })
  .on("end", function () {

    let obj = {
      table: []
    }
  
    recordsToUpdate.forEach(el => {
      obj.table.push(el)
    })
    
    
    const json = JSON.stringify(obj);
    fs.writeFileSync('clean-tags.json', json);
    
  });
