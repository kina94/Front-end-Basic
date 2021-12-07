'use strict';
import PopUp from "./popup.js";
import {GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
.gameDuration(5)
.carrotCount(3)
.bugCount(3)
.build();

game.setGameStopListener(reason => {
  let message;
  switch (reason) {
    case Reason.cancel:
      sound.playAlert();
      message = "Replay?"
      break;
    case Reason.win:
      sound.playWin();
      message = "YOU WON"
      break;
    case Reason.lose:
      sound.playBug();
      message = "YOU LOST";
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListenr(() => {
  game.start();
});