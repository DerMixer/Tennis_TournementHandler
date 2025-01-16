***WHAT IT IS***  
This is a terminal-based full tournament handler designed for Tennis. It includes the process of making pairs for a 2 vs. 2 Tennis game and allows you to input all single game results. These results are compiled into one big result table/tier list for the whole tournament.  

***REQUIREMENTS***  
- Node.js  

***HOW TO START IT***  
- Double-click the `.exe` file  
  or  
- If you want to start it for development reasons, you can also use `npm run start` in the terminal/console you are using.  

***HOW DOES IT WORK / WALK THROUGH***  

1.)  
First, it will ask you to input all the players' names for two different groups.  

1.1) *Tournament Tip / not necessary*  
For the tournament, it is ideal to place all obviously better players into one group and everybody else into the other group. This aligns with the general idea of this project. It doesn’t matter for the program, but the algorithm will always pair one person from group A with one from group B. This ensures that one strong player is matched with one weaker player to avoid creating a monopoly team that wins all games. Although I would have designed it differently, this is what my client wanted. However, you can use it however you like.  

2.)  
After you input all the names, the program will match one person from group A and another from group B into a pair. It will repeat this process to create a 2 vs. 2 game and list the pairs in your console.  

3.)  
Before entering the points scored, you must tell the program which team won. Simply type `1` if the first (left-side) team won or `2` if the other team won.  

4.)  
Next, you input the results for each game.  

4.1) ***IMPORTANT NOTE & Requirement***  
When entering the results, you must follow a specific format to avoid issues with the program processing your input.  

4.1.1) ***FORMATS FOR POSSIBLE CASES***  
- If the first team won, use this format: `pointsOfWinner:pointsOfLoser`  
- If the second team won, switch the values: `pointsOfLoser:pointsOfWinner`  
- If the result has more than one set, add a space after the last value and repeat the formats above, e.g., `pointsOfWinner:pointsOfLoser pointsOfWinner:pointsOfLoser`.  
  The space between each set result is ***NECESSARY***.  

5.)  
After all inputs, the program will generate a result tier list with a few stats: points, won points, lost points, and the difference between won and lost points. The list is sorted by the points each player achieved. Each player earns 3 points for a win and 0 for a loss. If players have the same number of points, the program ranks them based on points and the difference between won and lost points (ratio).  

***Future of the Program***  
I will update this repository and upgrade it from a console environment to a React Web App in the future. Although the console environment works, it’s not ideal. A web app would make it more readable and accessible. I may also include more scenarios, such as 1 vs. 1 games and similar functionalities.  

***Contact***  
If you have questions, want to help with the project, or just want to contact me, you can do so via this email: mickihde9@gmail.com  
