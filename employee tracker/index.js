const showBanner = require ('node-banner');
const mySql = require('mysql2');
const cTable = require('console.table');
import inquirer from 'inquirer';

(async ()=> {
    await showBanner('Employee/nManager, All your Mysql belongs to Us')
})();


inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });