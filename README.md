# BlindSpot Productions Discord Bot ***(version 2.1.0)***

This bot uses [Discord.js](https://discord.js.org) (Discord v14)

## Requirements
[NodeJS](https://nodejs.org/en/)
## Recommended (although not required)
[git](https://git-scm.com)

[Visual Studio Code](https://code.visualstudio.com/)

VS Code Plugins (I use)
 - [Discord Rich Presence](https://marketplace.visualstudio.com/items?itemName=LeonardSSH.vscord)
 - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
 - [indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)
 - [json](https://marketplace.visualstudio.com/items?itemName=ZainChen.json)
 - [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
   
## How to install
Install packages via packages.json:
```
npm install
```
then set up the bot's configs (i.e. config.json)

*if you seem confused, you can use [Discord.js's guide](https://discordjs.guide/#before-you-begin)!*

to start the bot:
```
node .
```

## Patch Notes (2.1.0) 
***NEW*** Calculate all Apex matches under that one Apex token.

**this is currently experimental due to user input error.*

if there are more than one matches in the single token, you will then be prompted to choose if you'd like to calculate all those matches.
you can index it via:
- Team name.
- Team number.

to use this feature, you need to have multiple matches in that one token. Use `/apexprivateresults` command. After the response, you'll be prompted by a set of buttons, select the green `gimme dat data!` button to activate it.

Improved optimization
- Cleaned and tidied up code (less duplicates, more smart coding)
        
## Patch Notes (2.0.0b2)
apex-private-results command
- Full Apex Results - WORKING ✅
- Quick Apex Results - WORKING ✅

## Patch Notes (2.0.0b1)
apex-private-results command
- Full Apex Results - WORKING (needs tests) ⚠️
- Quick Apex Results - WORKING (needs tests) ⚠️

## Patch Notes (2.0.0a) 
Updated code to Discord v14!
- Supports slash commands.
- DM-commands supported.

Optimized apex-private-results command feature
- Apex Results - WORKING ✅
- Full Apex Results - WIP 🚧
- Quick Apex Results - WIP 🚧

Current features:
- Display Apex Ranked Map Rotation
- Display Apex Legends Custom Lobby Results
- the usual bot ping
- more commands soon (I hope)
