var InputGroup = 'Gruppe A'
var UsedPairs = [];
var UsedSingle = [];
var GroupA = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
var GroupB = ["14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27"];
var MaxRoundLength = Math.floor((GroupA.length + GroupB.length) / 2  );
var SearchCount = 0;
var ACopy = [];
var BCopy = [];
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
var PlacementHolder = [];

const prompt = require("prompt-sync")({ sigint: true });
var shuffle = require('shuffle-array')

function shuffleGroups() {
    shuffle(ACopy)
    shuffle(BCopy)
}

function ManegeTierlist(rounds) {
    for (var i = 0; i < GroupA.length; i++) {
        Tierlist[GroupA[i]] = 0 ;
        Tierlist[GroupB[i]] = 0 ;
    }
    if ( FullPairsCopy[`Runde:${rounds}`][0] == 'kein übriges Team') {
        return
    } else {
        var WinnerTeam = FullPairsCopy[`Runde:${rounds}`][0].split(' + ')
        var First = WinnerTeam[0];
        WinnerTeam.shift();
        var Second = WinnerTeam[0];
        WinnerTeam.shift();
        FullPairsCopy[`Runde:${rounds}`].shift()
        Tierlist[First] +=1
        Tierlist[Second] +=1
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
            if(GameResult == 1) {
                ManegeTierlist(rounds)
            } 
            if (GameResult == 2) {
                FullPairsCopy[`Runde:${rounds}`].shift()
                ManegeTierlist(rounds)
            }
        }
    }
    var sortedTierlist = Object.fromEntries( // Sorts the list from higest to lowest
        Object.entries(Tierlist).sort(([, a], [, b]) => b - a)
    );
    for (var key in sortedTierlist) { // Loop through sortedTierlsit
        if (sortedTierlist.hasOwnProperty(key)) { // check if obj contains certain Key with a certain value
            if (!PlacementHolder.includes(sortedTierlist[key])) {
                PlacementHolder.push(sortedTierlist[key])
            }
        }
    }
    for (var Index = 0 ; Index < PlacementHolder ; Index++) {
        var WinCounter = PlacementHolder[Index]
        var IndexWinCounterObj = Object.values(sortedTierlist).indexOf(WinCounter) // find the index of the Win counter ( Number ) inside sortedTierlist
        var Key = Object.keys(sortedTierlist).find(key => sortedTierlist[key] === IndexWinCounterObj); // Find Key by value inside sortedTierlist
    }
    console.log('Ergebnis aller Runden:',sortedTierlist);//Ende
}

function MakeFullRounds() { //5
    for (let rounds = 1; rounds < 9; rounds++) {
        while (FullPairs[`Runde:${rounds}`].length > 0) {
            var First = FullPairs[`Runde:${rounds}`][0]
            FullPairs[`Runde:${rounds}`].shift()
            var Second = FullPairs[`Runde:${rounds}`][0]
            FullPairs[`Runde:${rounds}`].shift()
            TournamentPairs[`Runde:${rounds}`].push(`${First} gegen ${Second}`)
        }
    }
    console.log(TournamentPairs)
    console.log(MaxRoundLength, 'MaxRoundLength')
}

function RefillCopys() {//3
    for (var i = 0; i < GroupA.length; i++) {
        if (!ACopy.includes(GroupA[i])) {
            ACopy.push(GroupA[i]);
        }
    }
    for (var i2 = 0; i2 < GroupB.length; i2++) {
        if (!BCopy.includes(GroupB[i2])) {
            BCopy.push(GroupB[i2]);
        }
    }
}

function MakePairs(rounds) { //4
    while (ACopy.length > 0 && BCopy.length > 0) {
        var First = ACopy[0];
        ACopy.shift();
        var Second = BCopy[0];
        BCopy.shift();
        console.log(ACopy,'Acopy')
        console.log(BCopy,'BCopy')
        console.log(First, Second,'First Second')
        if (UsedPairs.includes(`${First}${Second}`) === true || UsedPairs.includes(`${First}${Second}`) === true || UsedSingle.includes(First) === true || UsedSingle.includes(Second) === true) {
            ACopy.push(First);
            BCopy.push(Second);
            shuffleGroups()
            SearchCount += 1; 
        } 
        else {
            if (Second === undefined) {
                Second = 'Kein Spielpartner mehr übrig'
            }
            UsedSingle.push(`${First}`)
            UsedSingle.push(`${Second}`)
            UsedPairs.push(`${First}${Second}`,`${Second}${First}`)
            FullPairs[`Runde:${rounds}`].push(`${First} + ${Second}`);
            FullPairsCopy[`Runde:${rounds}`].push(`${First} + ${Second}`)
            SearchCount = 0;
        }
        if ( FullPairs[`Runde:${rounds}`].length === MaxRoundLength ) {
            return
        }
        if (SearchCount > 10000) {
            return
        }
        RefillCopys()
    }
}

function HandleRounds() { //2
    for (let rounds = 1; rounds < 9; rounds++) {
        RefillCopys()//3
        console.log('start')
        MakePairs(rounds)//4
        UsedSingle = [];
        console.log('end')
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