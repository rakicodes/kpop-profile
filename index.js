const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

const profiles = [
    {
        "id": 1,
        "stage name": "rm",
        "birth name": "kim nam joon",
        "position": ["leader", "mainrapper", "rapper"],
        "birth day": new Date("September 12, 1994"),
        "height": 181,
        "mbti": "enfp", 
        "group": "bts",
        "zodiac": "virgo",
    },
    {
        "id": 2,
        "stage name": "jin",
        "birth name": "kim seok jin",
        "position": ["subvocalist", "visual", "vocalisr"],
        "birth day": new Date("December 4, 1992"),
        "height": 179,
        "mbti": "intp", 
        "group": "bts",
        "zodiac": "sagittarius",
    },
    {
        "id": 3,
        "stage name": "suga",
        "birth name": "min yoon gi",
        "position": ["leadrapper", "rapper"],
        "birth day": new Date("March 9, 1993"),
        "height": 174,
        "mbti": "istp", 
        "group": "bts",
        "zodiac": "pisces",
    },
    {
        "id": 4,
        "stage name": "jhope",
        "birth name": "jung ho seok",
        "position": ["maindancer", "subrapper", "subvocalist", "dancer", "vocalist", "rapper"],
        "birth day": new Date("February 18, 1994"),
        "height": 177,
        "mbti": "infj", 
        "group": "bts",
        "zodiac": "aquarius",
    },
    {
        "id": 5,
        "stage name": "jimin",
        "birth name": "park ji min",
        "position": ["maindancer", "leadvocalist", "dancer", "vocalist"],
        "birth day": new Date("October 13, 1995"),
        "height": 174,
        "mbti": "estp", 
        "group": "bts",
        "zodiac": "libra",
    },
    {
        "id": 6,
        "stage name": "v",
        "birth name": "kim tae hyung",
        "position": ["leaddancer", "subvocalist", "visual", "dancer", "vocalist"],
        "birth day": new Date("December 30, 1995"),
        "height": 179,
        "mbti": "infp", 
        "group": "bts",
        "zodiac": "capricorn",
    },
    {
        "id": 7,
        "stage name": "jungkook",
        "birth name": "jeon jung kook",
        "position": ["mainvocalist", "leaddancer", "subrapper", "center", "maknae", "vocalist, dancer", "rapper"],
        "birth day": new Date("September 1, 1997"),
        "height": 179,
        "mbti": "intp", 
        "group": "bts",
        "zodiac": "virgo",
    }
];

app.get("/", (request, response) => {
    response.send("<h1>Kpop Profile API</h1>")
})

app.get("/api/all", (request, response) => {
    response.json(profiles);
})

app.get("/api/name/:name", (request, response) => {
    const name  = request.params.name.toLowerCase().split(" ").filter(char => char.charCodeAt(0) > 96 && char.charCodeAt(0) < 123).join("");
    const result = profiles.filter(person => person["stage name"].split(" ").join("") === name || person["birth name"].split(" ").join("") === name );
    response.json(result)
})

app.get("/api/position/:position", (request, response) => {
    const position = request.params.position.toLowerCase().split(" ").filter(char => char.charCodeAt(0) > 96 && char.charCodeAt(0) < 123).join("");
    const result = profiles.filter(person => person["position"].includes(position));
    response.json(result);
})

app.get("/api/mbti/:mbti", (request, response) => {
    const mbti = request.params.mbti.toLowerCase();
    const result = profiles.filter(person => person["mbti"]===mbti);
    response.json(result);
})

app.get("/api/zodiac/:zodiac", (request, response) => {
    const zodiac = request.params.zodiac.toLowerCase();
    const result = profiles.filter(person => person["zodiac"]===zodiac);
    response.json(result);
})

app.get('/api/group/:group', (request, response) => {
    const group = request.params.group.toLowerCase();
    const result = profiles.filter(person => person["group"]===group);
    response.json(result);
})

app.get("/api/year/:start", (request, response) => {
    const start = Number(request.params.start);
    const result = profiles.filter(person => person["birth day"].getFullYear()>=start);
    response.send(result);
})

app.get("/api/years/:start-:end", (request, response) => {
    const start = Number(request.params.start);
    const end = Number(request.params.end);
    const result = profiles.filter(person => person["birth day"].getFullYear()>=start && person["birth day"].getFullYear()<=end);
    response.send(result);
})

app.get("/api/height/:start", (request, response) => {
    const start = Number(request.params.start);
    const result = profiles.filter(person => person["height"]>=start);
    response.send(result);
})

app.get("/api/heights/:start-:end", (request, response) => {
    const start = Number(request.params.start);
    const end = Number(request.params.end);
    const result = profiles.filter(person => person["height"]>=start && person["height"]<=end);
    response.send(result);
})


const PORT = 3000;
app.listen(process.env.PORT || PORT, () => {
    console.log(`listening on port ${PORT}`);
})