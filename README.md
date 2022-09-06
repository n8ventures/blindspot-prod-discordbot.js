# BlindSpot Productions Discord Bot ***(version 2.1.0)***

This bot uses [Discord.js](https://discord.js.org) ([Discord v14](https://discord.com/developers/docs/intro))

Current features:
 - Use the Apex Legends Tournament API and grab match data.  Supports:
   - Full Results (all data displayed)
   - Essential Results (all data but team number displayed)
   - Quick Results (Team Name and Total Points only displayed)
   - *__(EXPERIMENTAL)__* Calculates all matches in one token. Read [2.1.0 Patch Notes](https://github.com/n8ventures/blindspot-prod-discordbot.js/blob/main/README.md#210-patch-notes) for more information.
   
 - [Apex Legends Status API](https://apexlegendsapi.com/)
    - Map Rotation.
    
## Requirements
[NodeJS](https://nodejs.org/en/)
## Recommended
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

## 2.1.0 Patch Notes
***NEW*** Calculate all Apex matches under that one Apex token.

**this is currently experimental due to user input error.*

if there are more than one matches in the single token, you will then be prompted to choose if you'd like to calculate all those matches.
you can index it via:
- Team name.
- Team number.

to use this feature, you need to have multiple matches in that one token. Use `/apexprivateresults` command. After the response, you'll be prompted by a set of buttons, select the green `gimme dat data!` button to activate it.

Improved optimization
- Cleaned and tidied up code (less duplicates, more smart coding)
        
## 2.0.0b2 Patch Notes
apex-private-results command
- Full Apex Results - WORKING ✅
- Quick Apex Results - WORKING ✅

## 2.0.0b1 Patch Notes
apex-private-results command
- Full Apex Results - WORKING (needs tests) ⚠️
- Quick Apex Results - WORKING (needs tests) ⚠️

## 2.0.0a Patch Notes 
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
