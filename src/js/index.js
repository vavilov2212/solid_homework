import { Move, IMovable } from './Uobject.js';

let gameObject;
let gameField;
let move;
let movable;

document.addEventListener('readystatechange', function() {
  gameObject = document.getElementById('spaceship');
  gameField = document.getElementsByClassName('gameField')?.[0];
  movable = new IMovable();
  move = new Move(movable);

  const move_button = document.getElementsByClassName('gameControls__move')?.[0]
  const reset_button = document.getElementsByClassName('gameControls__reset')?.[0]
  move_button.addEventListener('click', moveForeward);
  reset_button.addEventListener('click', resetMove);
});

function resetMove() {
  window.location.href = '/';
};

function moveForeward() {
  const gameFieldWidth = gameField?.clientWidth;
  const gameObjectWidth = gameObject?.clientWidth;

  movable.setMaxDistance(gameFieldWidth - gameObjectWidth);
  move.execute();
  gameObject.style.left = `${movable.getDistance()}px`;
};
