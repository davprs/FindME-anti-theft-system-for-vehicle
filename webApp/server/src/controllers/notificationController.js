const axios = require("axios");
const path = require('path');
const pug = require('pug');


module.exports.sendNotificationEmail = (user, plate) => {
    const email = user.email;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const plateNumber = plate.plate;
    const carBrand = plate.brand;
    const subject = "Allarme FindME!🚀";
    const sender = "info@findme.it";
    const replacer = str => ({
        '\t': '',
        '\n': '',
        '\b': '',
        '\r': '',
        '\f': '',
        '\\': '',
        '\"' : '\''
    }[str]);
    const compiledFunction = pug.compileFile(path.resolve(appRoot, './src/Templates/theftAlarmEmail.pug'), []);

    const templateBody = compiledFunction({
        name: firstName + ' ' + lastName,
        brand: carBrand,
        plate: plateNumber
    });
    const regEx = new RegExp('\\\\|\t|\n|\b|\r|\f|\"', 'g');

    const body = templateBody.replace(regEx, replacer);

    const options = {
        method: 'POST',
        url: 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '444863cbb7msh59479e5345b943ap1f5823jsn63db3afc116d',
            'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com'
        },
        data: '{"personalizations":[{"to":[{"email":"' + email + '"}],"subject":"' + subject + '"}],' +
            '"from":{"email":"' + sender + '"},"content":[{"type":"text/HTML","value":"' + body + '"}]}'
    };


    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}