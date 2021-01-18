
const chalk = require("chalk");
const clear = require('clear');
const figlet = require('figlet');
const csv = require('csv-parser');
const fs = require('fs');
const results = [];


function parseArgumentsIntoOptions() {
    const yargs = require("yargs");

    clear();

    console.log(
        chalk.yellow(
            figlet.textSync('Debt-check', { horizontalLayout: 'full' })
        )
    );

    var options = yargs
        .usage("Usage: -p <name>")
        .option("p", { alias: "name", describe: "Your path file", type: "string", demandOption: true })
        .argv;

    return options;
}


function showOutput(results) {
    var output = [];
    results.forEach((value, key) => {
        var description = key.replace('|', ',')
        var amount = parseFloat(value.amount).toFixed(2)
        output.push({ description, amount })

    })
    console.table(output);
}

function treatment(treatmentCallback, failureCallback) {
    var data = treatmentCallback(results);
    if (data.size > 0) {
        showOutput(data);
    } else {
        failureCallback(data);
    }
}

function treatmentCallback() {
    var map = new Map();
    var lineError = 0;
    var indice = 1;

    results.forEach(element => {
        if (checkValidElement(element)) {
            map = new Map();
            lineError = indice;
        } else {
            var new_element = element.payer + '|' + element.creditor
            if (map.get(new_element) != undefined) {
                var elt = map.get(new_element);
                element.amount = parseFloat(elt.amount) + parseFloat(element.amount);
            }
            map.set(new_element, element)
        }
        indice++;

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

function checkValidElement(element) {
    for (const [key, value] of Object.entries(element)) {

        if ((key === "payer" && !value) || (key === "amount" && !isNumber(value))) {
            return true;
        }
    }
}

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }

function cli() {
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
module.exports = cli();
