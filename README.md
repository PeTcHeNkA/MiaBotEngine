# MiaBotEngine v1.0
## The screen of the demo launch of the bot
![Mia](https://sun9-60.userapi.com/impg/tkb5kP-h-3d24gi2rzp2Ie2mgENT81afbx0uyQ/oSplhzBQwwE.jpg?size=670x290&quality=96&sign=d66d2e17e8541fc8081a23b5c8fc56b7&type=album)
## Installing
1. Copy this repository to yourself.
2. Install the dependencies.
```
npm i
```
3. Edit the config in data/config.json
```
"prefix": "Prefix for commands",
"token": "Your bot token"
```
4. Launch the engine.
```js
npm start
```
## Directory architecture
* data - config for bot
* src - source code of bot
## Associations with MessageContext (ctx)
* Link to Mia
```js
const mia = ctx.mia;
```
* Link to dsLogic
```js
const mia = ctx.ds;
```
* Link to dbLogic
```js
const mia = ctx.db;
```