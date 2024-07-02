var Player = ["player1", "player2", "player3", "player4", "player5", "player6", "player7", "player8", "player9", "player10", "player11", "player12", "player13", "player14", "player15", "player16", "player17", "player18", "player19", "player20", "player21"];
var PlayerCopy = [];
var UsedPairs = [];
var TournamentPairs = {
    'Runde:1': [],
    'Runde:2': [],
    'Runde:3': [],
    'Runde:4': [],
    'Runde:5': [],
    'Runde:6': [],
    'Runde:7': [],
    'Runde:8': [],
};

const prompt = require("prompt-sync")({ sigint: true });
var shuffle = require('shuffle-array')

function RefillCopy() {
    for (let i = 0; i < Player.length; i++) {
        PlayerCopy.push(Player[i])
        shuffle(PlayerCopy)
    }
}

function MakePairs(PlayerCopy,rounds) {
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
            TournamentPairs[`Runde:${rounds}`].push(`${First} + ${Second}`);
            shuffle(PlayerCopy)
        }
    }
}

function HandleRounds() {
    for (let rounds = 1; rounds < 9; rounds++) {
        RefillCopy()
        shuffle(PlayerCopy)
        MakePairs(PlayerCopy,rounds)
    }
    console.log(TournamentPairs)
}

function GetInput() {
    var Input = prompt('Gibt einen Teilnehmer ein (Wenn sie fertig sind geben sie "fertig" ein): ');
    if (Input == 'fertig') {
        HandleRounds();
        return
    }
    else {
        Player.push(Input)
        PlayerCopy.push(Input)
        GetInput()
    }
}

GetInput()