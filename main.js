(()=>{"use strict";class t{constructor(t,e=""){this.length=t,this.hits=[],this.vertical=!1,this.row=null,this.column=null,this.name=e}hit(t){this.hits.push(t)}isSunk(){return this.hits.length===this.length}}const s=10;class i{constructor(){this.board=[];for(let t=0;t<s;t++){this.board[t]=[];for(let e=0;e<s;e++)this.board[t][e]=null}this.size=s}clear(){this.board=[];for(let t=0;t<s;t++){this.board[t]=[];for(let e=0;e<s;e++)this.board[t][e]=null}}placeShip(t,e,s,i){if(!this.placementPossible(t,e,s,i))return!1;if(i){for(let i=0;i<t.length;i++)this.board[e+i][s]=t;t.vertical=!0}else{for(let i=0;i<t.length;i++)this.board[e][s+i]=t;t.vertical=!1}return t.row=e,t.column=s,!0}deleteShip(t){if(t.vertical)for(let e=0;e<t.length;e++)this.board[t.row+e][t.column]=null;else for(let e=0;e<t.length;e++)this.board[t.row][t.column+e]=null}rotateShip(t){if(t.vertical){for(let e=0;e<t.length;e++)this.board[t.row+e][t.column]=null;if(!this.placementPossible(t,t.row,t.column,!1)){for(let e=0;e<t.length;e++)this.board[t.row+e][t.column]=t;return!1}this.placeShip(t,t.row,t.column,!1)}else{for(let e=0;e<t.length;e++)this.board[t.row][t.column+e]=null;if(!this.placementPossible(t,t.row,t.column,!0)){for(let e=0;e<t.length;e++)this.board[t.row][t.column+e]=t;return!1}this.placeShip(t,t.row,t.column,!0)}return!0}receiveAttack(t,e){if(t<0||t>9||e<0||e>9)return!1;const i=this.board[t][e];if(i){if("miss"===i)return!1;if(i.hits.includes(`${t}, ${e}`))return!1;if(i.hit(`${t}, ${e}`),i.isSunk())if(i.vertical){let t=0,e=i.length;0!==i.row&&(t=-1,this.board[i.row-1][i.column]="miss"),i.row+i.length!==s&&(e=i.length+1,this.board[i.row+i.length][i.column]="miss");for(let s=t;s<e;s++)0!==i.column&&(this.board[i.row+s][i.column-1]="miss"),9!==i.column&&(this.board[i.row+s][i.column+1]="miss")}else{let t=0,e=i.length;0!==i.column&&(t=-1,this.board[i.row][i.column-1]="miss"),i.column+i.length!==s&&(e=i.length+1,this.board[i.row][i.column+i.length]="miss");for(let s=t;s<e;s++)0!==i.row&&(this.board[i.row-1][i.column+s]="miss"),9!==i.row&&(this.board[i.row+1][i.column+s]="miss")}}else this.board[t][e]="miss";return!0}placementPossible(t,e,i,r){if(e<0||e>9||i<0||i>9)return!1;if(r){if(e+t.length>s)return!1;for(let s=0;s<t.length;s++)if(this.board[e+s][i]&&this.board[e+s][i]!==t)return!1;let r=-1,n=t.length+1;0===e?r=0:e+t.length===s&&(n=t.length);for(let s=r;s<n;s++)if(0===i){if(this.board[e+s][i+1]&&this.board[e+s][i+1]!==t||this.board[e+s][i]&&this.board[e+s][i]!==t)return!1}else if(9===i){if(this.board[e+s][i-1]&&this.board[e+s][i-1]!==t||this.board[e+s][i]&&this.board[e+s][i]!==t)return!1}else if(this.board[e+s][i+1]&&this.board[e+s][i+1]!==t||this.board[e+s][i-1]&&this.board[e+s][i-1]!==t||this.board[e+s][i]&&this.board[e+s][i]!==t)return!1}else{if(i+t.length>s)return!1;for(let s=0;s<t.length;s++)if(this.board[e][i+s]&&this.board[e][i+s]!==t)return!1;let r=-1,n=t.length+1;0===i?r=0:i+t.length===s&&(n=t.length);for(let s=r;s<n;s++)if(0===e){if(this.board[e+1][i+s]&&this.board[e+1][i+s]!==t||this.board[e][i+s]&&this.board[e][i+s]!==t)return!1}else if(9===e){if(this.board[e-1][i+s]&&this.board[e-1][i+s]!==t||this.board[e][i+s]&&this.board[e][i+s]!==t)return!1}else if(this.board[e+1][i+s]&&this.board[e+1][i+s]!==t||this.board[e-1][i+s]&&this.board[e-1][i+s]!==t||this.board[e][i+s]&&this.board[e][i+s]!==t)return!1}return!0}isGameOver(){for(let t=0;t<s;t++)for(let e=0;e<s;e++)if(this.board[t][e]&&"miss"!==this.board[t][e]&&!this.board[t][e].isSunk())return!1;return!0}placeShipsRandomly(){const e=[],s=new t(5),i=new t(4),r=new t(3),n=new t(3),o=new t(2);e.push(s,i,r,n,o);let a=0;for(;a<5;){const t=Math.floor(10*Math.random()),s=Math.floor(10*Math.random()),i=1===Math.floor(2*Math.random());this.placeShip(e[a],t,s,i)&&a++}return e}}class r{constructor(t){this.name=t,this.lastHit={row:null,column:null,ship:null},this.lastMove={row:null,column:null,miss:null},this.hits=[],this.directions=["up","down","left","right"]}isHit(t,e,s){return!("miss"===s.board[t][e]||!s.board[t][e]||!s.board[t][e].hits.includes(`${t}, ${e}`))}attack(t,e,s){return!!s.receiveAttack(t,e)&&(this.isHit(t,e,s)?(this.lastHit={row:t,column:e,ship:s.board[t][e]},this.lastMove={row:t,column:e,miss:!1},this.hits.push(this.lastHit)):this.lastMove={row:t,column:e,miss:!0},!0)}attackCPU(t){if(t.isGameOver())return!1;if(!this.lastHit.ship)return this.randomAttack(t),!0;if(this.lastHit.ship.isSunk())return this.hits=[],this.directions=["up","down","left","right"],this.randomAttack(t),!0;if(1===this.hits.length){if(0===this.directions.length)return this.randomAttack(t),this.hits=[],this.directions=["up","down","left","right"],!0;let e=this.directions[Math.floor(Math.random()*this.directions.length)];return this.attackLine(this.lastHit.row,this.lastHit.column,e,t)||(this.directions.splice(this.directions.indexOf(e),1),this.attackCPU(t)),this.directions=["up","down","left","right"],!0}if(this.hits[0].row===this.hits[this.hits.length-1].row)for(let e=0;e<this.hits.length;e++){if(this.attack(this.hits[e].row,this.hits[e].column-1,t))return!0;if(this.attack(this.hits[e].row,this.hits[e].column+1,t))return!0}else if(this.hits[0].column===this.hits[this.hits.length-1].column)for(let e=0;e<this.hits.length;e++){if(this.attack(this.hits[e].row-1,this.hits[e].column,t))return!0;if(this.attack(this.hits[e].row+1,this.hits[e].column,t))return!0}}attackLine(t,e,s,i){return"up"===s?this.attack(t-1,e,i):"down"===s?this.attack(t+1,e,i):"left"===s?this.attack(t,e-1,i):"right"===s?this.attack(t,e+1,i):void 0}randomAttack(t){let e=Math.floor(10*Math.random()),s=Math.floor(10*Math.random());for(;!this.attack(e,s,t)&&!t.isGameOver();)e=Math.floor(10*Math.random()),s=Math.floor(10*Math.random());return!0}}const n=function(){const t=document.querySelector(".ships-select");function s(t,s,i,r,n){const a=document.createElement("div"),l=t.board[i][r];if(a.classList.add("cell"),a.dataset.row=i,a.dataset.column=r,l){if("miss"===l)a.classList.add("miss");else if(s&&a.classList.add("ship"),l.hits.includes(`${i}, ${r}`)&&a.classList.add("hit"),l.isSunk()&&a.classList.add("sunk"),s&&!n)if(l.row===i&&l.column===r){function h(t){const e=parseInt(t.target.dataset.row),s=parseInt(t.target.dataset.column);o.moveship(e,s,l)}a.classList.add("draggable"),a.draggable=!0,a.onclick=()=>o.rotateShip(l),a.ondragstart=()=>{document.querySelector(".board-player").addEventListener("drop",h)},a.ondragend=()=>{document.querySelector(".board-player").removeEventListener("drop",h)}}else a.style.pointerEvents="none"}else a.ondragstart=function(){return e.preventDefault(),!1};return s&&!n&&(l||(a.ondragenter=t=>{t.preventDefault(),a.style.backgroundColor="grey"},a.ondragleave=t=>{t.preventDefault(),a.style.background="none"},a.ondragover=t=>{t.preventDefault()}),a.ondrop=t=>{t.preventDefault(),a.style.background="none";const e=t.dataTransfer.getData("id");e&&o.placeShips(parseInt(t.target.dataset.row),parseInt(t.target.dataset.column),e),t.dataTransfer.setData("id",null)}),!s&&n&&(a.onclick=()=>o.takeTurn(i,r)),a}return{gameboard:function(e,i,r){const n=i?document.querySelector(".board-player"):document.querySelector(".board-computer");n.innerHTML="",r?(t.style.display="none",i||(n.style.display="grid")):(t.style.display="flex",i||(n.style.display="none"));const o=document.createElement("div");n.append(o);for(let t=0;t<e.size;t++){const e=document.createElement("div");e.classList.add("columns"),e.textContent=String.fromCharCode(65+t),n.append(e)}let a=0;for(let t=0;t<e.size;t++)for(let o=0;o<e.size;o++){if(a%e.size==0){const t=document.createElement("div");t.classList.add("rows"),t.textContent=Math.ceil((a+1)/10),n.append(t)}n.append(s(e,i,t,o,r)),a++}},message:function(t){document.querySelector(".message").innerText=t},shipsSelection:function(e){t.innerHTML="";for(let s=0;s<e.length;s++){const i=document.createElement("div"),r=document.createElement("div"),n=document.createElement("div");i.classList.add("ship-item"),r.classList.add("ship-body"),n.classList.add("ship-name"),r.draggable=!0;for(let t=0;t<e[s].length;t++){const t=document.createElement("div");t.classList.add("ship"),t.classList.add("cell"),r.append(t)}n.textContent=e[s].name,i.append(n,r),t.append(i),r.ondragstart=t=>{t.dataTransfer.setData("id",s),t.dataTransfer.setData("length",e[s].length)}}},buttons:function(t){const e=document.getElementById("button-start"),s=document.getElementById("button-reset"),i=document.getElementById("button-random");e.disabled=!0,s.disabled=!0,i.disabled=!0,e.style.display="inline",i.style.display="inline",s.textContent="Reset","placing"!==t&&"ready"!==t||(s.disabled=!1,s.onclick=()=>o.resetBoard(),i.disabled=!1,i.onclick=()=>o.placeRandom()),"ready"===t&&(e.disabled=!1,e.onclick=()=>o.startGame()),"game"===t&&(e.style.display="none",i.style.display="none",s.textContent="New game",s.disabled=!1,s.onclick=()=>o.resetGame())},enableBoard:function(t){document.querySelector(".board-computer").style.pointerEvents=t}}}(),o=function(){let e,s,o,a,l,h=!0;const d=[];let c,u,m,f,b;function p(){e=new r("player"),s=new r("CPU"),o=new i,a=new i,l=!1,h=!0,c=new t(5,"Carrier"),u=new t(4,"Battleship"),m=new t(3,"Destroyer"),f=new t(3,"Submarine"),b=new t(2,"Patrol boat"),d.length=0,d.push(c,u,m,f,b),n.shipsSelection(d),n.buttons("placing"),n.gameboard(o,!0),a.placeShipsRandomly(),n.message("Drag a ship to the board \n Then click the ship to rotate it")}return p(),{takeTurn:async function(t,i){l||h||e.attack(t,i,a)&&(n.enableBoard("none"),n.gameboard(a,!1,!0),n.message("Computer makes a move..."),await new Promise((t=>setTimeout(t,750))),s.attackCPU(o),n.gameboard(o,!0,!0),n.message("Your move"),n.enableBoard("all"),console.log(`${s.name} attacks: ${String.fromCharCode(65+s.lastMove.column)}${s.lastMove.row+1}`),a.isGameOver()&&(l=!0,n.message("VICTORY!")),o.isGameOver()&&(l=!0,n.message("DEFEAT")))},placeShips:function(t,e,s){0!==d.length&&o.placementPossible(d[s],t,e,!1)&&(o.placeShip(d[s],t,e,!1),d.splice(s,1),n.gameboard(o,!0),0===d.length&&n.buttons("ready"),n.shipsSelection(d))},startGame:function(){h=!1,n.gameboard(o,!0,!0),n.gameboard(a,!1,!0),n.buttons("game"),n.message("Make a move")},resetBoard:function(){o.clear(),d.length=0,d.push(c,u,m,f,b),n.buttons("placing"),n.gameboard(o,!0),n.shipsSelection(d)},placeRandom:function(){o.clear(),d.length=0,o.placeShipsRandomly(),n.buttons("ready"),n.gameboard(o,!0),n.shipsSelection(d)},resetGame:function(){p(),n.gameboard(a,!1)},rotateShip:function(t){h&&(o.rotateShip(t),n.gameboard(o,!0))},deleteShip:function(t){if(!h)return!1;o.deleteShip(t)},moveship:function(t,e,s){return!!h&&!!o.placementPossible(s,t,e,s.vertical)&&(o.deleteShip(s),o.placeShip(s,t,e,s.vertical),n.gameboard(o,!0),!0)}}}()})();