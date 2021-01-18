const fs = require('fs');
const chalk = require("chalk");

const checkValidElement = (element) => {
    for (const [key, value] of Object.entries(element)) {

        if ((key === ("payer") && !value) || (key === ("creditor") && !value) || (key === "amount" && !isNumber(value))) {
            return true;
        }
    }
}

const showOutput = (results) => {
    var output = [];
    results.forEach(function(value, key){ 
        var payer = key.split('|')[0];
        var creditor = key.split('|')[1];
        var amount = parseFloat(value.amount).toFixed(2)
        output.push({ payer, creditor, amount })
    });
    writeToCSVFile(output);

}

const isNumber = (n) => {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

function writeToCSVFile(output) {
    const filename = 'output.csv';
    fs.writeFile(filename, extractAsCSV(output), err => {
      if (err) {
        console.log('Error writing to csv file', err);
      } else {
        console.log(
            chalk.green(`====> Saved as ${filename}`)
        );
        console.table(output);
      }
    });
  }

function extractAsCSV(output) {
    const header = ["Payer, Creditor, Amount"];
    const rows = output.map(element =>
       `${element.payer}, ${element.creditor}, ${element.amount}`
    );
    return header.concat(rows).join("\n");
}

exports.checkValidElement = checkValidElement;
exports.isNumber = isNumber;
exports.showOutput = showOutput;