/**
 * @param {number} index
 * @param {number} gridSize
 * @returns {number}
 */
export const getRow = (index, gridSize) => index / gridSize << 0;

/**
 * @param {number} index
 * @param {number} gridSize
 * @returns {number}
 */
export const getColumn = (index, gridSize) => index % gridSize;

/**
 * @param {number} length Array length
 * @returns {array} Array of numbers
 */
export const range = length => {
  return Array.from({ length }, (v, i) => Number.parseInt(i, 10));
};

/**
 * Get random slice from an array based on Fisher Yates shuffle.
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * @param {Array} arr Input Array
 * @param {Number} size Slice size
 * @returns {Array} Resulting slice
 */
export const randomSubarray = (arr, size) => {
  let shuffled = arr.slice(0);
  let i = arr.length;
  let temp;
  let index;

  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(0, size);
};

/**
 * @param {object} tileA
 * @param {object} tileB
 * @param {number} gridSize
 * @param {boolean}
 */
export const isNeighbours = (tileA, tileB, gridSize) => {
  const tileARow = getRow(tileA, gridSize);
  const tileAColumn = getColumn(tileA, gridSize);
  const tileBRow = getRow(tileB, gridSize);
  const tileBColumn = getColumn(tileB, gridSize);

  const sameRow = tileARow === tileBRow;
  const sameColumn = tileAColumn === tileBColumn;
  const columnDiff = tileAColumn - tileBColumn;
  const rowDiff = tileARow - tileBRow;
  const diffColumn = Math.abs(columnDiff) === 1;
  const diffRow = Math.abs(rowDiff) === 1;
  const sameRowDiffColumn = sameRow && diffColumn;
  const sameColumnDiffRow = sameColumn && diffRow;

  return sameRowDiffColumn || sameColumnDiffRow;
}

/**
 * @param {array} tiles
 * @returns {boolean}
 */
export const isGameOver = (tiles) => {
  let result = true;

  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].number !== tiles[i].position) {
      result = false;
      break;
    }
  }

  return result;
}

/**
 * @param {array} tiles
 * @param {number} tileId
 * @returns {array}
 */
export const getTile = (tiles, tileId) => {
  const filtered = tiles.filter(tile => tile.number === tileId);

  if (Array.isArray(filtered) && filtered.length === 1) {
    return filtered[0];
  }

  return null;
}

/**
 * @param {array} arr
 * @param {number} tileAId
 * @param {number} tileBId
 * @returns {array}
 */
export const flipTiles = (arr, tileAId, tileBId) => {
  const arrayCopy = arr.slice(0);
  const ids = arrayCopy.map(t => t.number);
  const indexA = ids.indexOf(tileAId);
  const indexB = ids.indexOf(tileBId);
  const pA = arrayCopy[indexA].position;

  arrayCopy[indexA].position = arrayCopy[indexB].position;
  arrayCopy[indexB].position = pA;

  return arrayCopy;
}
