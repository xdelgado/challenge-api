let fs = require('fs');

module.exports = {
    getChallenges:getChallenges,
    addChallenge:addChallenge
}

function getChallenges(){
    return new Promise( (resolve,reject) => {
        fs.readdir('./db', (err,files) => {
            let challenges = files.map((file) => {
                let challenge = JSON.parse(fs.readFileSync(`./db/${file}`));
                challenge.id=file.replace(/.json/,'');
                return challenge;
            });
            console.log(JSON.stringify(challenges));
            resolve(challenges);
        });
    });
}

function addChallenge(challenge){
    const id = formatDate(new Date());
    fs.writeFileSync(`./db/${id}.json`,JSON.stringify(challenge));
    return id;
}

function formatDate(date) {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;

    return [year, month, day, hours, minutes, seconds].join('');
}