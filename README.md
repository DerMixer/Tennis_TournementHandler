***WHAT IT IS***
This is a yet terminal based full tournement handler designed for Tennis which includes the process of making pairs for a 2 vs. 2 Tennis game and it will let you input all of 
the single game results and but them into one big result table / tierlist for the whole tournement.

***REQUIREMENTS***
- Node.js

***HOW TO START IT***
- double click the .exe file
  or
- if you want to start it for dev resons you can also use 'npm run start' int the terminal / console you are useing 

***HOW DOES IT WORK / WALK THROUGH***
1.)
It first of all will ask you to  input all of the players Names for two diffrent groups. 

1.1) *Tournement Tipp / not nesessary* 
Ideal for the tournement would be that you put all of the obviously better playing people
into the one group and everbody else into the other group because this is the general idea of this project. It doesnt matter for the programm but the algorithm will always pair 
one person from group A with one from group B so one good player will match one bad player so there wont be a monopoly team which wins all games. I would have done it otherwise 
but this is what my client wanted but you can use it how you like it.

2.)
After you put all the names in the programm will match one person from group A and antoher from group B into one pair and does the same for another pair to create a game of 2 vs. 2
and will list them in the console your in.

3.) 
Before you enter the points which have been scored. Beforehand you need to tell the programm which team actualy won. Simply type '1' if the first (left side) team and '2' if
the other team won.

4.) 
Now you get to input the results for each game

4.1) ***IMPORTANT NOTE & requirement***
if you input type in the results there are a few things you have to consider while typing. There is a certin format that you **HAVE TO USE** otherwise there will be problems with 
the getting of the points which you enterd. The following format has to be used (exchange the words used in the format with the points each team scored): 

4.1.1) ***FORMATS FOR POSSIBLE CASES***
If you said that the first team won use this format: 'poinsofwinner:pointsofloser'
If the second team won just switch both values like this: 'pointsofloser:pointsofwinner'
If the result has more than one set simply add a whitespace / space after the last value and then repeat the formats from above like this: 
'pointsofwinner:pointsofloser pointsofwinner:pointsofloser'
the whitespace between each set result is ***NESSEARY***

5.) 
After all these inputs you get a result tierlist whith a few stats these are points, won points, lost points and a difference between won & lost points. The list is sorted via 
the points each player achived. Each player will earn 3 points for a win and 0 for a loose. If players have the same amout of points the programm will rank them based on the points AND the difference between won & lost points / ratio.

***Future of the programm***
I will update this repo and upgrade from the console enivrement to an React Webapp in the future because a console enviremnt works but it sucks. it would make it more readable and accesable. Maybe i will include more scenarios like 1 vs. 1s a similar. Just more functionality.

***Contact***
If you either have questions, want to help working with the project or just contact me you can to that via this email: mickihde9@gmail.com
