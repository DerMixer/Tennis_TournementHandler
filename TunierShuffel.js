var Player = ["player1", "player2", "player3", "player4", "player5", "player6", "player7", "player8", "player9", "player10", "player11", "player12", "player13", "player14", "player15", "player16", "player17", "player18", "player19", "player20"];
var PlayerCopy = [];
var UsedPairs = [];
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

for (var i = 0; i < Player.length; i++) {
    Tierlist[Player[i]] = 0
}

const prompt = require("prompt-sync")({ sigint: true });
var shuffle = require('shuffle-array')

function ManegeTierlist(rounds) {
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
            if (Second === undefined) {
                Second = 'kein übriges Team';
            }
            TournamentPairs[`Runde:${rounds}`].push(`${First} gegen ${Second}`)
        }
    }
    console.log(TournamentPairs)
}

function RefillCopy() {//3
    for (let i = 0; i < Player.length; i++) {
        PlayerCopy.push(Player[i])
        shuffle(PlayerCopy)
    }
}

function MakePairs(PlayerCopy,rounds) { //4
    while (PlayerCopy.length > 0) {
        var First = PlayerCopy[0];
        PlayerCopy.shift(First);
        shuffle(PlayerCopy)
        var Second = PlayerCopy[0];
        PlayerCopy.shift(Second);
        shuffle(PlayerCopy)
        if (UsedPairs.includes(`${First}${Second}`) === true || UsedPairs.includes(`${First}${Second}`) === true) {
            PlayerCopy.push(First,Second)
            shuffle(PlayerCopy)
            if (PlayerCopy.length === 2) {
                PlayerCopy.shift()
                PlayerCopy.shift()
            }
        } else {
            if( Second === undefined) {
                Second = 'Kein Spielpartner mehr übrig'
            }
            else {
                UsedPairs.push(`${First}${Second}`,`${Second}${First}`)
            }
            FullPairs[`Runde:${rounds}`].push(`${First} + ${Second}`);
            FullPairsCopy[`Runde:${rounds}`].push(`${First} + ${Second}`)
            shuffle(PlayerCopy)
        }
    }
}

function HandleRounds() { //2
    for (let rounds = 1; rounds < 9; rounds++) {
        RefillCopy()//3
        shuffle(PlayerCopy)
        MakePairs(PlayerCopy,rounds)//4
    }
    MakeFullRounds()//5
    MenageGameResults()
}

function GetInput() { //1
    var Input = prompt('Gibt einen Teilnehmer ein (Wenn sie fertig sind geben sie "fertig" ein): ');
    if (Input == 'fertig') {
        HandleRounds();
        return
    }
    else {
        Player.push(Input)
        PlayerCopy.push(Input)
        Tierlist[Input]
        GetInput()
    }
}

GetInput()


console.log("Drücken Sie die Eingabetaste, um das Fenster zu schließen...");
prompt()