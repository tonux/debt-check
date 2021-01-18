const chalk = require("chalk");
const clear = require('clear');
const figlet = require('figlet');
const csv = require('csv-parser');
const fs = require('fs');
const results = [];

const utils = require('./utils');

function parseArgumentsIntoOptions() {
    const yargs = require("yargs");

    clear();

    console.log(
        chalk.yellow(
            figlet.textSync('Debt-check', { horizontalLayout: 'full' })
        )
    );

    var options = yargs
        .usage("Usage: -f <name>")
        .option("f", { alias: "name", describe: "Your path file", type: "string", demandOption: true })
        .argv;

    return options;
}

function treatment(treatmentCallback, failureCallback) {
    var data = treatmentCallback(results);
    if (data.size > 0) {
        utils.showOutput(data);
    } else {
        failureCallback(data);
    }
}

function treatmentCallback() {
    var map = new Map();
    var lineError = 0;
    var index = 1;

    results.forEach(element => {
        if (utils.checkValidElement(element)) {
            map = new Map();
            lineError = index;
        } else {
            var new_element = element.payer + '|' + element.creditor
            if (map.get(new_element) != undefined) {
                var elt = map.get(new_element);
                element.amount = parseFloat(elt.amount) + parseFloat(element.amount);
            }
            map.set(new_element, element)
        }
        index++;

    })
    if (lineError > 0) {
        return lineError;
    }
    return map;

}

function failureCallback(lineError) {
    console.error("The operation failed check the file at line : " + lineError);
}

function onError(err) {
    console.log(
        chalk.red('Error loading the file. Please check if you are in the right directory. ')
    );
}


const cli = () => {    
      
    let options = parseArgumentsIntoOptions();

    const path = options.name;

    var file = fs.createReadStream(path).on('error', onError);

    file.pipe(csv(['payer', 'creditor', 'amount']))
        .on('data', (row) => {

            results.push(row)
        })
        .on('end', () => {
            console.log(
                chalk.green('Process successfully completed')
            );
            treatment(treatmentCallback, failureCallback);
        });

}

exports.cli = cli;