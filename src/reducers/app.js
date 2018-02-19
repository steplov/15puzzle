import {
  START_NEW_GAME,
  PAUSE_GAME,
  RESET_GAME,
  UNPAUSE_GAME,
  TIMER_TICK,
  MOVES_TICK,
  FINISH_GAME,
  TILE_SIZE,
  FLIP_TILES
} from '../actions/app';
import {
  GAME_IDLE,
  GAME_PAUSED,
  GAME_STARTED,
  GAME_OVER
} from '../status';
import levelFactory from '../utils/levelFactory';
import { flipTiles } from '../utils/utils';

const GRID_SIZE = 4;
const initialState = {
  gridSize: GRID_SIZE,
  tileSize: 0,
  gameState: GAME_IDLE,
  moves: 0,
  seconds: 0,
  tiles: []
};

const actionsMap = {
  [START_NEW_GAME]: (state, action) => {
    return {
      ...state,
      tiles: levelFactory(GRID_SIZE),
      gameState: GAME_STARTED,
      moves: 0,
      seconds: 0
    }
  },
  [PAUSE_GAME]: (state, action) => {
    return {
      ...state,
      gameState: GAME_PAUSED
    }
  },
  [UNPAUSE_GAME]: (state, action) => {
    return {
      ...state,
      gameState: GAME_STARTED
    }
  },
  [RESET_GAME]: (state, action) => {
    debugger;
    return {
      ...state,
      tiles: [],
      moves: 0,
      seconds: 0,
      gameState: GAME_IDLE
    }
  },
  [TIMER_TICK]: (state, action) => {
    return {
      ...state,
      seconds: state.seconds + 1
    }
  },
  [MOVES_TICK]: (state, action) => {
    return {
      ...state,
      moves: state.moves + 1
    }
  },
  [TILE_SIZE]: (state, action) => {
    return {
      ...state,
      tileSize: action.payload
    }
  },
  [FLIP_TILES]: (state, action) => {
    return {
      ...state,
      tiles: flipTiles(state.tiles, action.payload.tileA, action.payload.tileB)
    }
  },
  [FINISH_GAME]: (state, action) => {
    return {
      ...state,
      gameState: GAME_OVER
    }
  }
};

export default function app(state = initialState, action = {}) {
  const fn = actionsMap[action.type];

  return fn ? fn(state, action) : state;
}
