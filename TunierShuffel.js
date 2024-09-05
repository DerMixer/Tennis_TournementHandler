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
var Tierlist = {};

const prompt = require("prompt-sync")({ sigint: true });

function HandlePoints(FullPoints,First,Second,rounds,GameResult) {
    var SetResults = FullPoints.split(' ')
    console.log(SetResults,'SetResults')
    var SinglePoints = []
    SetResults.forEach( (item) => {
        SinglePoints.push(item.split(':'))
    })
    console.log(SinglePoints,'SinglePoints')
    var WonPoints
    var LostPoints
    var Ratio
    if (GameResult == 1) {
        SinglePoints.forEach( (item) => {
            WonPoints = parseInt(item[0])
            LostPoints = parseInt(item[1])
            Ratio = WonPoints - LostPoints
            Tierlist[First]['Punkteverhältnis'] += Ratio
            Tierlist[Second]['Punkteverhältnis'] += Ratio

            Tierlist[First]['Gewonnene Punkte:'] += WonPoints
            Tierlist[Second]['Gewonnene Punkte:'] += WonPoints

            Tierlist[First]['Verlorene Punkte:'] += LostPoints
            Tierlist[Second]['Verlorene Punkte:'] += LostPoints
        },
        Tierlist[First]['Punkte:'] += 3,
        Tierlist[Second]['Punkte:'] += 3
    )
    } else {
        SetResults.forEach( (item) => {
            WonPoints = parseInt(item[1])
            LostPoints = parseInt(item[0])
            Ratio = WonPoints - LostPoints
            Tierlist[First]['Punkteverhältnis'] += Ratio
            Tierlist[Second]['Punkteverhältnis'] += Ratio

            Tierlist[First]['Gewonnene Punkte:'] += WonPoints
            Tierlist[Second]['Gewonnene Punkte:'] += WonPoints

            Tierlist[First]['Verlorene Punkte:'] += LostPoints
            Tierlist[Second]['Verlorene Punkte:'] += LostPoints
        },
        Tierlist[First]['Punkte:'] += 3,
        Tierlist[Second]['Punkte:'] += 3
        }
    }
}

function ManegeTierlist(rounds,FullPoints,GameResult) {
    if ( FullPairsCopy[`Runde:${rounds}`][0] == 'kein übriges Team') {
        return
    } else {
        var WinnerTeam = FullPairsCopy[`Runde:${rounds}`][0].split(' + ')
        var First = WinnerTeam[0];
        WinnerTeam.shift();
        var Second = WinnerTeam[0];
        HandlePoints(FullPoints,First,Second,rounds,GameResult)
        WinnerTeam.shift();
        FullPairsCopy[`Runde:${rounds}`].shift()
        console.log(Tierlist, 'Tierlist')
        TournamentPairs[`Runde:${rounds}`].shift(TournamentPairs[`Runde:${rounds}`][0]);
    }
} 
function MenageGameResults() {//7
    for (var i = 0; i < GroupA.length; i++) {
        Tierlist[GroupA[i]] = {}
        Tierlist[GroupB[i]] = {}
        Tierlist[GroupA[i]]['Punkte:'] = 0 ;
        Tierlist[GroupB[i]]['Punkte:'] = 0 ;
        Tierlist[GroupA[i]]['Punkteverhältnis'] = 0
        Tierlist[GroupB[i]]['Punkteverhältnis'] = 0
        Tierlist[GroupA[i]]['Gewonnene Punkte:'] = 0
        Tierlist[GroupB[i]]['Gewonnene Punkte:'] = 0
        Tierlist[GroupA[i]]['Verlorene Punkte:'] = 0
        Tierlist[GroupB[i]]['Verlorene Punkte:'] = 0
    }
    console.log(Tierlist);
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
    let sortable = [];
    for (var Person in Tierlist) {
    sortable.push([Person, Tierlist[Person]]);
    }
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    let objSorted = {}
    sortable.forEach(function(item){
        objSorted[item[0]] = item[1]
    })
    console.log('Ergebnis aller Runden:', objSorted)
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
    console.log(TournamentPairs)
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
    for (let rounds = 1; rounds < 9; rounds++) {
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