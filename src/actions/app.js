import {
  GAME_PAUSED,
  GAME_OVER
} from '../status';
import {
  isNeighbours,
  isGameOver,
  getTile
} from '../utils/utils';

export const START_NEW_GAME = 'START_NEW_GAME';
export const RESET_GAME = 'RESET_GAME';
export const PAUSE_GAME = 'PAUSE_GAME';
export const FINISH_GAME = 'FINISH_GAME';
export const UNPAUSE_GAME = 'UNPAUSE_GAME';
export const TIMER_TICK = 'TIMER_TICK';
export const MOVES_TICK = 'MOVES_TICK';
export const TILE_SIZE = 'TILE_SIZE';
export const FLIP_TILES = 'FLIP_TILES';

let timer = null;

const tick = () => ({ type: TIMER_TICK });

export const pause = () => (dispatch, getState) => {
  const gameState = getState().app.gameState;

  if (gameState === GAME_PAUSED) {
    timer = setInterval(() => dispatch(tick()), 1000);
    dispatch({
      type: UNPAUSE_GAME
    })
  } else {
    clearInterval(timer);

    dispatch({
      type: PAUSE_GAME
    })
  }
}

export const start = () => (dispatch) => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(tick()), 1000);

  dispatch({
    type: START_NEW_GAME
  });
}

export const reset = () => (dispatch) => {
  clearInterval(timer);

  dispatch({
    type: RESET_GAME
  });
}

export const setTileSize = (tileSize) => (dispatch) => {
  dispatch({
    type: TILE_SIZE,
    payload: tileSize
  })
}

export const tileAction = (number) => (dispatch, getState) => {
  let state = getState();

  if (
     state.app.gameState === GAME_OVER || state.app.gameState === GAME_PAUSED
   ) {
     return;
   }

   const tiles = state.app.tiles;
   const currentTile = getTile(tiles, number);
   const zeroTile = getTile(tiles, 0);

   if(isNeighbours(currentTile.position, zeroTile.position, state.app.gridSize)) {
     dispatch({
       type: FLIP_TILES,
       payload: {
         tileA: currentTile.number,
         tileB: zeroTile.number
       }
     });

     dispatch({
       type: MOVES_TICK
     });

     state = getState();

     if (isGameOver(state.app.tiles)) {
       clearInterval(timer);
       dispatch({
         type: FINISH_GAME
       });
     }
   };
}
