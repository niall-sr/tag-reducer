
import fs from 'node:fs'
import { parse } from 'csv'

const path = './assets/recipe-tags-updated.csv'

// let recordsToUpdate = [];

// fs.createReadStream(path)
//   .pipe(parse({ delimiter: "\n", from_line: 1 }))
//   .on("data", function (row) {
//     // executed for each row of data

//     if(row[0].indexOf('UPDATE') > 0){
//         let str = row[0];
//         let arr = str.split(',').filter(el => el.length);


//         if(arr.length >= 3){
//             recordsToUpdate.push({
//                 old: arr[0],
//                 new: arr[2].replace("UPDATE TAG: Change to be", "")
//                            .replace("UPDATE TAG: Change to ", "")
//                            .replace("Change this to", "")
//                            .replace("UPDATE TAG: ", "")
//                            .replace("Change to be", "")
//                            .replace("Change to", "")
//                            .replace("Changing to", "")
//                            .replace("Relabel to", "")
//                            .replace("Relabel as", "")
//                            .replace("(deleting recipes)", "")
//                            .trim()
//             }) 
//         }

//         // console.log('arr[0]', arr[0]); 
//     }
    
//   })
//   .on("error", function (error) {
//     // Handle the errors
//     console.log(error.message);
//   })
//   .on("end", function () {

//     let obj = {
//       table: []
//     }
  
//     recordsToUpdate.forEach(el => {
//       obj.table.push(el)
//     })
    
    
//     const json = JSON.stringify(obj);
//     fs.writeFileSync('tags-to-update.json', json);
//   });


// get parent child relationships

// let rts = [];

// fs.createReadStream(path)
//   .pipe(parse({ delimiter: "//", from_line: 1 }))
//   .on("data", function (row) {
//     // executed for each row of data

//     if(row[0].indexOf('Child of') > 0){
//         let str = row[0];
//         let arr = str.split(',').filter(el => el.length);

//         console.log('row: ',arr);

//         let parent = arr[2].replace("Child of", "").trim();

//         if(parent.indexOf('Child of' > 0 ) && arr.length == 4){
//           parent = arr[3].replace("Child of", "").trim()
//         }else{
//           parent = ""
//         }

//         rts.push({
//             child: arr[0],
//             parent: arr[2].replace("Child of", "").trim() || arr[3].replace("Child of", "").trim()
//         }) 

//         // console.log('arr[0]', arr[0]); 
//     }
    
//   })
//   .on("error", function (error) {
//     // Handle the errors
//     console.log(error.message);
//   })
//   .on("end", function () {


//     let obj = {
//       table: []
//     }
  
//     rts.forEach(el => {
//       obj.table.push(el)
//     })
    
    
//     const json = JSON.stringify(obj);
//     fs.writeFileSync('tags-relations.json', json);
    
//   });


// Get a flat list of all target state tags

let alltags = [];
let i = 0;

fs.createReadStream(path)
  .pipe(parse({ delimiter: "\n", from_line: 1 }))
  .on("data", function (row) {
    // executed for each row of data

    let str = row[0];
    let arr = str.split(',').filter(el => el.length);;

    if(row[0].indexOf('UPDATE') > 0){
        if(arr.length == 3){
          let item = arr[2].replace("UPDATE TAG: Change to be", "")
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

          item = item.slice(0,1).toUpperCase() + item.slice(1).toLowerCase() 

          alltags.push(item) 
        }else if (arr.length == 4){
          let item = arr[3].replace("UPDATE TAG: Change to be", "")
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

          item = item.slice(0,1).toUpperCase() + item.slice(1).toLowerCase() 

          alltags.push(item) 
        }
    }else{
      if(arr[0] != null){
        let item = arr[0].replace("UPDATE TAG: Change to be", "")
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

          item = item.slice(0,1).toUpperCase() + item.slice(1).toLowerCase() 

          alltags.push(item) 
      }
      
    }

    i++;
  })
  .on("error", function (error) {
    // Handle the errors
    console.log(error.message);
  })
  .on("end", function () {

    let obj = {
      table: []
    }
  
    alltags.forEach(el => {
      obj.table.push(el)
    })
    
    
    const json = JSON.stringify(obj);
    fs.writeFileSync('all-target-state-tags.json', json);
    
  });