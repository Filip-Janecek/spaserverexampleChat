const createSpaServer = require("spaserver").createSpaServer;

const PORT = 8080; //aplikace na Rosti.cz musi bezet na portu 8080

const API_HEAD = {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
};
const API_STATUS_OK = 0;
const API_STATUS_NOT_FOUND = -1;

const DNY_V_TYDNU = ["Neděle","Pondělí","Úterý","Středa","Čtvrtek","Pátek","Sobota"];

function processApi(req, res) {
    res.writeHead(200, API_HEAD);
    let obj = {};
    obj.status = API_STATUS_OK;
    if (req.pathname === "/denvtydnu") {
        let dt = new Date();
        if (req.parameters.d && req.parameters.m && req.parameters.r) {
            dt.setDate(req.parameters.d);
            dt.setMonth(req.parameters.m-1);
            dt.setFullYear(req.parameters.r);
        }
        let denVTydnu = DNY_V_TYDNU[dt.getDay()];
        obj.datum = `${dt.getDate()}.${dt.getMonth()+1}.${dt.getFullYear()}`;
        obj.den = denVTydnu;
    } else if (req.pathname === "/cas") {
        let dt = new Date();
        obj.cas = `${dt.getHours().toString().padStart(2,"0")}:${dt.getMinutes().toString().padStart(2,"0")}`;
    } else {
        obj.status = API_STATUS_NOT_FOUND;
        obj.error = "API not found";
    }
    res.end(JSON.stringify(obj));
}

createSpaServer(PORT, processApi);
