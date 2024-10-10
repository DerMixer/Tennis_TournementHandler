var InputGroup = 'Gruppe A'
var UsedPairs = [];
var UsedSingle = [];
var GroupA = ["Zargon", "Blix", "Klimbo", "Xylo"]; 
var GroupB = ["Glimmer", "Sprocket", "Rando", "Flint"]; 
var MaxRoundLength = Math.floor((GroupA.length + GroupB.length));
var FullPairs = {
    'Runde:1': [],
    'Runde:2': [],
    'Runde:3': [],
    'Runde:4': [],
    'Runde:5': [],
    'Runde:6': [],
    'Runde:7': [],
    'Runde:8': [],
};
var FullPairsCopy = {    
    'Runde:1': [],
    'Runde:2': [],
    'Runde:3': [],
    'Runde:4': [],
    'Runde:5': [],
    'Runde:6': [],
    'Runde:7': [],
    'Runde:8': [],
};
var TournamentPairs = {
    'Runde:1': [],
    'Runde:2': [],
    'Runde:3': [],
    'Runde:4': [],
    'Runde:5': [],
    'Runde:6': [],
    'Runde:7': [],
    'Runde:8': [],
}
var Tierlist = [];

const prompt = require("prompt-sync")({ sigint: true });

function Append (WonPoints,LostPoints,Ratio,First,Second) { //updates all Data in Player objects

    var ObjFirst = Tierlist.find(o => o.Name == First);
    var ObjSecond = Tierlist.find(o => o.Name == Second);

    
    ObjFirst.Punkteverhaeltnis += Ratio;
    ObjFirst.GewonnenePunkte += WonPoints;
    ObjFirst.VerlorenePunkte += LostPoints;
    ObjFirst.Punkte += 3;
    
    ObjSecond.Punkteverhaeltnis += Ratio;
    ObjSecond.GewonnenePunkte += WonPoints;
    ObjSecond.VerlorenePunkte += LostPoints;
    ObjSecond.Punkte += 3;

}
function HandlePoints(FullPoints,First,Second,GameResult) {
    var SetResults = FullPoints.split(' ')
    var SinglePoints = []
    SetResults.forEach( (item) => {
        SinglePoints.push(item.split(':'))
    })
    var WonPoints
    var LostPoints
    var Ratio
    if (GameResult === 1) {
        SinglePoints.forEach( (item) => {
            WonPoints = parseInt(item[0])
            LostPoints = parseInt(item[1])
            Ratio = WonPoints - LostPoints;
            Append(WonPoints,LostPoints,Ratio,First,Second)
        }
    )
    } else {
        SinglePoints.forEach( (item) => {
            WonPoints = parseInt(item[1])
            LostPoints = parseInt(item[0])
            Ratio = WonPoints - LostPoints;
            Append(WonPoints,LostPoints,Ratio,First,Second)
        })
    }
}

function ManegeTierlist(rounds,FullPoints,GameResult) { // filters results by winner and loser team
    if ( FullPairsCopy[`Runde:${rounds}`][0] == 'kein übriges Team') {
        return
    } else {
        var WinnerTeam = FullPairsCopy[`Runde:${rounds}`][0].split(' + ')
        var LoserTeam =  FullPairsCopy[`Runde:${rounds}`][1].split(' + ')
        console.log(`Loser team: ${LoserTeam}`)
        var Teams = [];
        WinnerTeam&&LoserTeam.forEach(item => {
            Teams.push(item)
        })
        var WFirst = WinnerTeam[0];
        var WSecond = WinnerTeam[1];
        var LFirst = LoserTeam[0];
        var LSecond = LoserTeam[1];

        HandlePoints(FullPoints,WFirst,WSecond,rounds,GameResult) 
        FullPairsCopy[`Runde:${rounds}`].shift()
        TournamentPairs[`Runde:${rounds}`].shift(TournamentPairs[`Runde:${rounds}`][0]);
    }
} 
function MenageGameResults() {//7
    console.log('Gibt an welches Team gewonnen hat (Für das erste Team "1" eingeben oder für das zweite Team "2" eigeben):')
    for (var rounds = 1 ; rounds < 9 ; rounds++) {
        console.log('Runde ',rounds,':')
        while (TournamentPairs[`Runde:${rounds}`].length) {
            console.log(`${TournamentPairs[`Runde:${rounds}`][0]}:`)
            var GameResult = prompt();
            console.log('Gib das Ergebnis des Spiels an:')
            var FullPoints = prompt();
            if(GameResult == 1) {
                ManegeTierlist(rounds,FullPoints,GameResult)
            } 
            if (GameResult == 2) {
                FullPairsCopy[`Runde:${rounds}`].shift()
                ManegeTierlist(rounds,FullPoints,GameResult)
            }
        }
    }
  var sorted = Tierlist.sort(({Punkte:a}, {Punkte:b}) => b-a)
  console.log(sorted,'sortedTierlist');
}
function MakeFullRounds() { //5
    for (let rounds = 1; rounds < 9; rounds++) {
        while (FullPairs[`Runde:${rounds}`].length > 0) {
            var First = FullPairs[`Runde:${rounds}`][0]
            FullPairs[`Runde:${rounds}`].shift()
            var Second = FullPairs[`Runde:${rounds}`][0]
            if (Second === undefined ) {
                Second =  'Keine weitere Paarungen möglich'
            }
            FullPairs[`Runde:${rounds}`].shift()
            TournamentPairs[`Runde:${rounds}`].push(`${First} gegen ${Second}`)
        }
    }
    console.log(TournamentPairs,'TournamentPairs')
}
function Retry(rounds) {
    if(UsedSingle.length == MaxRoundLength) {
        for(var AFinder2 = 0; AFinder2 < GroupA.length; AFinder2++) {
            var First = GroupA[AFinder2];
            for(var BFinder2 = 0; BFinder2 < GroupB.length; BFinder2++) {
                var Second = GroupB[BFinder2]
                if (UsedPairs.includes(`${First}${Second}`) === true || UsedPairs.includes(`${First}${Second}`) === true || UsedSingle.includes(First) === true || UsedSingle.includes(Second) === true) {
                }
                else {
                    UsedSingle.push(`${First}`)
                    UsedSingle.push(`${Second}`)
                    UsedPairs.push(`${First}${Second}`,`${Second}${First}`)
                    FullPairs[`Runde:${rounds}`].push(`${First} + ${Second}`);
                    FullPairsCopy[`Runde:${rounds}`].push(`${First} + ${Second}`)
                }
            }
        }   
    }
}
function MakePairs(rounds) {
    UsedSingle = [];
    for (var AFinder = 0; AFinder < GroupA.length; AFinder++) {
        var First = GroupA[AFinder];
        for (var BFinder = 0; BFinder < GroupB.length; BFinder++) {
            var Second = GroupB[BFinder];
            if (
                UsedPairs.includes(`${First}${Second}`) || 
                UsedPairs.includes(`${Second}${First}`) || 
                UsedSingle.includes(First) || 
                UsedSingle.includes(Second)
            ) {
                continue; 
            }
            UsedSingle.push(First);
            UsedSingle.push(Second);
            UsedPairs.push(`${First}${Second}`, `${Second}${First}`);
            FullPairs[`Runde:${rounds}`].push(`${First} + ${Second}`);
            FullPairsCopy[`Runde:${rounds}`].push(`${First} + ${Second}`);
        }
    }
    let remainingGroupA = GroupA.filter(participant => !UsedSingle.includes(participant));
    let remainingGroupB = GroupB.filter(participant => !UsedSingle.includes(participant));

    while (remainingGroupA.length > 0 || remainingGroupB.length > 0) {
        const First = remainingGroupA.length > 0 ? remainingGroupA.shift() : null;
        const Second = remainingGroupB.length > 0 ? remainingGroupB.shift() : null;

        if (First && Second) {
            FullPairs[`Runde:${rounds}`].push(`${First} + ${Second}`);
            FullPairsCopy[`Runde:${rounds}`].push(`${First} + ${Second}`);
            UsedPairs.push(`${First}${Second}`, `${Second}${First}`);
        } else if (First && !Second) {
            FullPairs[`Runde:${rounds}`].push(`${First} + Kein Spieler mehr übrig`);
            FullPairsCopy[`Runde:${rounds}`].push(`${First} + Kein Spieler mehr übrig`);
            UsedPairs.push(`${First}Kein Spieler mehr übrig`);
        } else if (Second && !First) {
            FullPairs[`Runde:${rounds}`].push(`${Second} + Kein Spieler mehr übrig`);
            FullPairsCopy[`Runde:${rounds}`].push(`${Second} + Kein Spieler mehr übrig`);
            UsedPairs.push(`Kein Spieler mehr übrig${Second}`);
        }
    }
    if (FullPairs[`Runde:${rounds}`].length < 10) {
        Retry(rounds);
    }
}
function HandleRounds() { //2
    GroupA.forEach((item) => {
        Tierlist.push( {
            "Name": item,
            "Punkte": 0,
            "Punkteverhaeltnis": 0,
            "GewonnenePunkte": 0,
            "VerlorenePunkte": 0,
        } )
    })
    GroupB.forEach( (item) => {
        Tierlist.push( {
            "Name": item,
            "Punkte": 0,
            "Punkteverhaeltnis": 0,
            "GewonnenePunkte": 0,
            "VerlorenePunkte": 0,
        } )
    })
    console.log(Tierlist,'Tierlist' ,Tierlist.length)
    for (let rounds = 1; rounds < 2; rounds++) {
        UsedSingle = [];//4
        MakePairs(rounds)
    }
    MakeFullRounds()//5
    MenageGameResults()
}
function GetInput() { //1
    var Input = prompt(`Gibt einen Teilnehmer für ${InputGroup} ein (Wenn du fertig sind geben sie "fertig" ein): `);
    if (Input == 'weiter') {
        InputGroup = 'Gruppe B'
        GetInput()
    }
    if (Input == 'fertig') {
        HandleRounds();
        return
    } else {
        if (InputGroup == 'GruppeA') {
            GroupA.push(Input)
            Tierlist[Input]
        }
        if (InputGroup == 'GruppeB') {
            GroupB.push(Input)
            Tierlist[Input]
        }
        GetInput()
    }
}

GetInput()

console.log("Drücken Sie die Eingabetaste, um das Fenster zu schließen...");
prompt()