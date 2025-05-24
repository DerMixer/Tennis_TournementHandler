var InputGroup = 'Gruppe A'
var UsedPairs = []
var UsedSingle = []
var PlayerRelations = {};
var GroupA = []; 
var GroupB = []; 
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

function Append (WonPoints,LostPoints,Teams,GameResult) { //updates all Data in Player objects
    Teams.forEach( item => {
        item.forEach( Player => {
            var
             Obj = Tierlist.find(o => o.Name == Player);
            if (Obj === undefined) {return}
            if(Teams.indexOf(item) === 0) {
                Obj.Punkte += 3;
                Obj.PunkteDifferenz += (WonPoints - LostPoints);
                Obj.GewonnenePunkte += WonPoints;
                Obj.VerlorenePunkte += LostPoints;
            } else {
                Obj.PunkteDifferenz += (LostPoints - WonPoints);
                Obj.GewonnenePunkte += LostPoints;
                Obj.VerlorenePunkte += WonPoints;
            }
        });
    });
};
function HandlePoints(FullPoints,Teams,GameResult) {
    var SetResults = FullPoints.split(' ')
    var SinglePoints = []
    SetResults.forEach( (item) => {
        SinglePoints.push(item.split(':'))
    })
    var WonPoints
    var LostPoints
    if (GameResult === 1) {
        SinglePoints.forEach( (item) => {
            WonPoints = parseInt(item[0])
            LostPoints = parseInt(item[1])
            Append(WonPoints,LostPoints,Teams,GameResult);
        }
    )
    } else {
        SinglePoints.forEach( (item) => {
            WonPoints = parseInt(item[1])
            LostPoints = parseInt(item[0])
            Append(WonPoints,LostPoints,Teams,GameResult)
        })
    }
}

function ManegeTierlist(rounds,FullPoints,GameResult) { // filters results by winner and loser team
    if ( FullPairsCopy[`Runde:${rounds}`][0] == 'kein übriges Team') {
        return;
    } else {
        var FirstCounter = 0;
        var SecondCounter = 1;
        
        if(GameResult === 2) {
            FirstCounter += 1;
            SecondCounter -= 1;
        }
        var Pair1 = TournamentPairs[`Runde:${rounds}`][0].split(' gegen ');
        var WinnerTeam = Pair1[FirstCounter].split(' + ');
        var LoserTeam = Pair1[SecondCounter].split(' + ');

        var WFirst  = WinnerTeam[FirstCounter];
        var WSecond = WinnerTeam[SecondCounter];
        var LFirst  = LoserTeam[FirstCounter];
        var LSecond = LoserTeam[SecondCounter];
        var Teams   = [[WFirst,WSecond],[LFirst,LSecond]];
        HandlePoints(FullPoints,Teams,GameResult);
        TournamentPairs[`Runde:${rounds}`].shift();
    }
} 
function MenageGameResults() {//7
    console.log('Gibt an welches Team gewonnen hat (Für das erste Team "1" eingeben oder für das zweite Team "2" eigeben):')
    for (var rounds = 1 ; rounds < 9 ; rounds++) {
        console.log('Runde ',rounds,':')
        while (TournamentPairs[`Runde:${rounds}`].length) {
            console.log(`${TournamentPairs[`Runde:${rounds}`][0]}:`)
            var GameResult = parseInt( prompt() );
            console.log('Gib das Ergebnis des Spiels an:')
            var FullPoints = prompt();
            ManegeTierlist(rounds,FullPoints,GameResult)
        }
    }
    var sorted = Tierlist.sort(function (a, b) {
    return b.Punkte - a.Punkte || b.PunkteDifferenz - a.PunkteDifferenz || b.Name - a.Name;
});
    console.log('Ergebnis aller Runden:', sorted);
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
    let maxTries = 1000;
    let tries = 0;
    let success = false;

    // Initialize PlayerRelations if not already done
    GroupA.concat(GroupB).forEach(name => {
        if (!PlayerRelations[name]) PlayerRelations[name] = new Set();
    });

    while (!success ) {
        tries++;
        UsedSingle = [];
        let pairsThisRound = [];
        let shuffledA = [...GroupA].sort(() => 0.5 - Math.random());
        let shuffledB = [...GroupB].sort(() => 0.5 - Math.random());

        for (let i = 0; i < shuffledA.length; i++) {
            let First = shuffledA[i];
            if (UsedSingle.includes(First)) continue;
            for (let j = 0; j < shuffledB.length; j++) {
                let Second = shuffledB[j];
                if (UsedSingle.includes(Second)) continue;
                let matchupKey = [First, Second].sort().join('|');

                // Check if this pair has already played in any previous round
                if (UsedPairs.includes(matchupKey)) continue;

                // Check if either player has played with or against the other
                if (
                    PlayerRelations[First].has(Second) ||
                    PlayerRelations[Second].has(First)
                ) continue;

                // Accept this pair
                pairsThisRound.push([First, Second]);
                UsedSingle.push(First, Second);
                break;
            }
            if (pairsThisRound.length === 12) break; // 6 games per round
        }

        if (pairsThisRound.length === 12) {
            for (let [First, Second] of pairsThisRound) {
                let matchupKey = [First, Second].sort().join('|');
                FullPairs[`Runde:${rounds}`].push(`${First} + ${Second}`);
                FullPairsCopy[`Runde:${rounds}`].push(`${First} + ${Second}`);
                UsedPairs.push(matchupKey);

                // Update relations: both are now teammates and opponents
                PlayerRelations[First].add(Second);
                PlayerRelations[Second].add(First);
            }
            success = true;
        } else {
            FullPairs[`Runde:${rounds}`] = [];
            FullPairsCopy[`Runde:${rounds}`] = [];
        }
    }

    if (!success) {
        console.log(`Konnte keine 6 vollständigen Spiele für Runde ${rounds} finden.`);
    }
}
function HandleRounds() { //2
    GroupA.forEach((item) => {
        Tierlist.push( {
            "Name": item,
            "Punkte": 0,
            "PunkteDifferenz": 0,
            "GewonnenePunkte": 0,
            "VerlorenePunkte": 0,
        } )
    })
    GroupB.forEach( (item) => {
        Tierlist.push( {
            "Name": item,
            "Punkte": 0,
            "PunkteDifferenz": 0,
            "GewonnenePunkte": 0,
            "VerlorenePunkte": 0,
        } )
    })
    for (let rounds = 1; rounds < 9; rounds++) {
        UsedSingle = [];//4
        MakePairs(rounds)
    }//5
    MakeFullRounds();
    //MenageGameResults() 
}
function GetInput() { //1
    console.log(`Teilnehmer für ${InputGroup} (Wenn fertig "fertig" eingeben / Für Teilnehmer der Gruppe B "weiter" eigeben): `)
    var Input = prompt();
    if (Input == 'weiter') {
        InputGroup = 'Gruppe B'
        GetInput()
    }
    if (Input == 'fertig') {
        HandleRounds();
        return
    } else {
        if (InputGroup == 'Gruppe A') {
            GroupA.push(Input)
        }
        if (InputGroup == 'Gruppe B') {
            GroupB.push(Input)
        }
        GetInput()
    }
}

GetInput()

console.log("Drücken Sie die Eingabetaste, um das Fenster zu schließen...");
prompt()