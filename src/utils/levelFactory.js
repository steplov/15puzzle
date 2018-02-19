import { range, randomSubarray } from './utils';
import { createTile } from './tile';

/**
 * Creates a new random level
 * @returns {object}
 */
export default function levelFactory(gridSize) {
  const arraySize = gridSize ** 2;

  return randomSubarray(range(arraySize), arraySize).map((tile, position) => createTile(tile, position));
}
