//const fs =require("fs")

/* fs.writeFile("message.txt", "Hello from NodeJS",  (err) => {
    if (err) throw err;
    console.log('The File has been saved');
  }); */

/* fs.readFile("message.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});  */
import generateName from "sillyname";
import {randomSuperhero} from 'superheroes';
import qr from 'qr-image';
import fs from 'fs'

/* var sillyName = generateName()
var nameSuper = randomSuperhero()
console.log(`I am ${nameSuper}`) */

import inquirer from 'inquirer';

var webSite= await inquirer
  .prompt([{
    type:'input',
    name: 'URL',
    message: 'Enter a Website:'
  }])
  .then((answers) => {
    const urlVar = answers.URL;
    var qr_svg = qr.image(urlVar)
    qr_svg.pipe(fs.createWriteStream('qr_url.png'));
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

  