#!/usr/bin/env node

const chalk = require("chalk");
const clear = require('clear');
const figlet = require('figlet');
const csv = require('csv-parser');
const fs = require('fs');
const results = [];

clear();

console.log(
  chalk.yellow(
    figlet.textSync('Debt-check', { horizontalLayout: 'full' })
  )
);

const yargs = require("yargs");

const options = yargs
 .usage("Usage: -p <name>")
 .option("p", { alias: "name", describe: "Your path file", type: "string", demandOption: true })
 .argv;

const path = options.name;

const pathMessage = `-> The file , ${options.name}!`;

var file = fs.createReadStream(path).on('error', onError);
    
file.pipe(csv(['payer', 'creditor', 'amount']))
    .on('data', (row) => {
      
      results.push(row)
    })
    .on('end', () => {
      console.log(
        chalk.green('Process successfully completed')
      );
      // console.log(results[0].amount);
  
      // toFixed(2);
  
      var map = new Map();
      treatment(map);
      showOutput(map);
    });


function showOutput(results){
    var output = [];
    results.forEach((value, key) => {
  
          var description= key.replace('|', ',')
          var amount = parseFloat(value.amount).toFixed(2)
          output.push({ description, amount })
  
      })
  
      console.table(output);
}

function onError(err) {
    console.log(
        chalk.red('Error loading the file. Please check if you are in the right directory. ')
      );
}

function treatment(map){
    results.forEach(element => {
        var new_element= element.payer+'|'+element.creditor
        if (map.get(new_element) != undefined){
            var elt = map.get(new_element);
            element.amount = parseFloat(elt.amount) + parseFloat(element.amount) ;
        }
        map.set(new_element, element)
    })
}