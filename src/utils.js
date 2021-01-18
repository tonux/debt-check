const checkValidElement = (element) => {
    for (const [key, value] of Object.entries(element)) {

        if ((key === ("payer") && !value) || (key === ("creditor") && !value) || (key === "amount" && !isNumber(value))) {
            return true;
        }
    }
}

const showOutput = (results) => {
    var output = [];
    results.forEach((value, key) => {
        var payer = key.split('|')[0];
        var creditor = key.split('|')[1];
        var amount = parseFloat(value.amount).toFixed(2)
        output.push({ payer, creditor, amount })

    })
    console.table(output);
}

const isNumber = (n) => {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

exports.checkValidElement = checkValidElement;
exports.isNumber = isNumber;
exports.showOutput = showOutput;