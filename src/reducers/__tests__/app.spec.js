import {
  START_NEW_GAME,
  PAUSE_GAME,
  RESET_GAME,
  UNPAUSE_GAME,
  MOVES_TICK,
  TIMER_TICK,
  FLIP_TILES,
  TILE_SIZE,
  FINISH_GAME
} from '../../actions/app';
import reducer from '../app';

let initialState;

beforeEach(() => {
  initialState = reducer(undefined, {});
});
test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    gameState: 'GAME_IDLE',
    gridSize: 4,
    moves: 0,
    seconds: 0,
    tileSize: 0,
    tiles: []
  });
});

test('should start game', () => {
  const state = reducer(initialState, {
    type: START_NEW_GAME
  });

  expect(state.gameState).toBe('GAME_STARTED');
  expect(state.gridSize).toBe(4);
  expect(state.moves).toBe(0);
  expect(state.seconds).toBe(0);
  expect(state.tileSize).toBe(0);
  expect(Array.isArray(state.tiles)).toBe(true);
  expect(state.tiles.length).toBe(16);
});

test('should pause the game', () => {
  const state = reducer(initialState, {
    type: PAUSE_GAME
  });

  expect(state.gameState).toBe('GAME_PAUSED');
});

test('should reset the game', () => {
  const state = reducer(initialState, {
    type: RESET_GAME
  });

  expect(state.gameState).toBe('GAME_IDLE');
  expect(state.gridSize).toBe(4);
  expect(state.moves).toBe(0);
  expect(state.seconds).toBe(0);
  expect(state.tileSize).toBe(0);
  expect(Array.isArray(state.tiles)).toBe(true);
  expect(state.tiles.length).toBe(0);
});

test('should unpause the game', () => {
  let state = reducer(initialState, {
    type: START_NEW_GAME
  });

  state = reducer(state, {
    type: PAUSE_GAME
  });

  state = reducer(state, {
    type: UNPAUSE_GAME
  });

  expect(state.gameState).toBe('GAME_STARTED');
});

test('should finish the game', () => {
  let state = reducer(initialState, {
    type: START_NEW_GAME
  });

  state = reducer(state, {
    type: FINISH_GAME
  });

  expect(state.gameState).toBe('GAME_OVER');
});

test('should should update moves', () => {
  let state = reducer(initialState, {
    type: START_NEW_GAME
  });

  state = reducer(state, {
    type: MOVES_TICK
  });

  expect(state.moves).toBe(1);
});

test('should should time', () => {
  let state = reducer(initialState, {
    type: START_NEW_GAME
  });

  state = reducer(state, {
    type: TIMER_TICK
  });

  expect(state.seconds).toBe(1);
});

test('should set tile size', () => {
  let state = reducer(initialState, {
    type: TILE_SIZE,
    payload: 10
  });

  expect(state.tileSize).toBe(10);
});

test('should flip tiles', () => {
  let state = reducer(initialState, {
    type: START_NEW_GAME
  });
  const positionA = state.tiles[0].position;
  const positionB = state.tiles[1].position;

  state = reducer(state, {
    type: FLIP_TILES,
    payload: {
      tileA: state.tiles[0].number,
      tileB: state.tiles[1].number
    }
  });

  expect(state.tiles[0].position).toBe(positionB);
  expect(state.tiles[1].position).toBe(positionA);
});
