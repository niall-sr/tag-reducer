import * as sanityURLS from './assets/sanityURLS.json' assert {type: 'json'}
import * as joURLS from './assets/joURLS.json' assert {type: 'json'}
import fs from 'node:fs'

let sanityurls = sanityURLS.default;
let jourls = joURLS.default;

const unmatched = Array.from(jourls);


const matches = [];

// because jo and our website construct urls differently we want to get the last unique uri and match based on that
// it assumes uri's are unique (which they may not be)

// let jourls = [
//     "https://www.jamieoliver.com/features/category/mothers-day/", 
//     "https://www.jamieoliver.com/recipes/category/occasion/mothers-day/"
// ]
// let sanityurls = [
//     "inspiration/mothers-day", 
//     "recipes/occasion/mothers-day"
// ]


sanityurls = sanityurls.map(el =>{
    return {
        fullURL: el,
        regex: () => {     
            if (el.match(`(inspiration)`)){
                // Map "/inspirations/" to "/features/categories/"
                return `(features|features\/categories)?\/${el.split('/').pop()}\/`
            } else if (el.match(`(recipes/occasion)`)){
                // Map "/recipes/occasion/" to "/recipes/category/occasion/"
                return `recipes\/category\/occasion\/${el.split('/').pop()}\/`
            } else {
                // finally just try to map the last part of the uri to a url that ends with the same
                return `\/${el.split('/').pop()}\/$`
            }
        }
    }
})
console.log('Total number of jamie oliver urls to migrate:', jourls.length);

// Iterated through both sets of urls and try to find matches
sanityurls.forEach((sanity) => {
    jourls.forEach((jo, joIndex, joArray) => {
        if(!(jo.match('videos') || (jo.match('playlist')))){
            // Exclude stuff we haven't done yet like video pages since they can't match yet
            if(jo.match(sanity.regex())){
                matches.push({jo:jo,sanity: "https://dev.jamieoliver.com/" + sanity.fullURL})
                joArray.splice(joIndex,1)
            }
        }
    })
})


// JO urls that we found a match for and the sanity urls they correspond to
matches.forEach(el =>{
    fs.writeFile('matched-urls.csv', el.jo + "," + el.sanity + ",\n", { flag: 'a+' }, err => {});
})

// JO urls that we have no match for
jourls.forEach(el =>{
    fs.writeFile('not-yet-matched-urls.csv', el + ",\n", { flag: 'a+' }, err => {});
})

console.log('Already migrated:', matches.length)
console.log('Yet to be migrated:', jourls.length);

// console.log('all matches:', matches)


