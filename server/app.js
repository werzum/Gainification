const express = require("express");
const path = require('path');
const app = express();
const jsdom = require("jsdom");
const axios = require("axios");
const domExtracter = require("./domExtracter")
const domExtract = domExtracter.domExtract;
const schedule = require("node-schedule");
const compression = require('compression');

app.use(compression());

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));


const mensaUrls = {
    "Mensa Academica" : "https://www.studierendenwerk-aachen.de/speiseplaene/academica-w.html",
    "Mensa Ahornstraße" : "https://www.studierendenwerk-aachen.de/speiseplaene/ahornstrasse-w.html",
    "Bistro Templergraben" : "",
    "Mensa Bayernalle" : "https://www.studierendenwerk-aachen.de/speiseplaene/bayernallee-w.html",
    "Mensa Goethestraße" : "",
    "Mensa Eupener Straße" : "https://www.studierendenwerk-aachen.de/speiseplaene/eupenerstrasse-w.html",
    "Mensa Südpark" : "https://www.studierendenwerk-aachen.de/speiseplaene/suedpark-w.html",
    "Mensa Vita" : "https://www.studierendenwerk-aachen.de/speiseplaene/vita-w.html",
    "Mensa Jülich" : "https://www.studierendenwerk-aachen.de/speiseplaene/juelich-w.html"
}

//fetch the mensaUrls and add them to the mensaData array.
async function getMensaData(mensaUrls){
    let mensaData = [];
    for(let entry in mensaUrls){
        let html;
        if(mensaUrls[entry].length>0){
            html = await axios.get(mensaUrls[entry]);
        } else {
            html = {};
        }
        mensaData.push(html);
    }
    return mensaData;
}

function parseData(mensaDOM){
    let weekDayList = [];
    const daysOfTheWeek=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"]
    const { JSDOM } = jsdom;
    const dom = new JSDOM(mensaDOM.data);
    //read the DOM and extract all the information
    domExtract(dom, weekDayList, daysOfTheWeek);
    return weekDayList;
};

let mensaJSON = [];
let mensaData = [];

async function updateData(mensaJSON,mensaData){
    //fetch the mensaData
    let newMensaData = await getMensaData(mensaUrls, mensaData)
    //and create a JSON for each Mensa location
    newMensaData.forEach(function(entry,index){
        //skip totally or partially empty meal plans
        if(entry.data === undefined || entry.data.length <4000){
            mensaJSON.push({"message":404})
            return;
        }
        mensaJSON[index] = parseData(entry);
    });
}

//set a scheduled job for 01.00 every day and do it once at startup
let scheduledJob = schedule.scheduleJob("0 1 * * *", updateData(mensaJSON, mensaData));
updateData(mensaJSON, mensaData);

//provide the locations via different routes
app.get("/mealplans/academica",(req,res) => {res.send(mensaJSON[0])});
app.get("/mealplans/ahornstrasse",(req,res) => res.send(mensaJSON[1]));
app.get("/mealplans/bistro",(req,res) => res.send(mensaJSON[2]));
app.get("/mealplans/bayernallee",(req,res) => res.send(mensaJSON[3]));
app.get("/mealplans/goethestrasse",(req,res) => res.send(mensaJSON[4]));
app.get("/mealplans/eupenerstrasse",(req,res) => res.send(mensaJSON[5]));
app.get("/mealplans/suedpark",(req,res) => res.send(mensaJSON[6]));
app.get("/mealplans/vita",(req,res) => res.send(mensaJSON[7]));
app.get("/mealplans/juelicherstrasse",(req,res) => res.send(mensaJSON[8]));
//to prevent doubled favicon requests
app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(process.env.PORT||5000,() => console.log(`running on ${process.env.port}`));
