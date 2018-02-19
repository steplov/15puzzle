import { getColumn, getRow } from './utils';

/**
 * Creates tile object
 * @param {number} number
 * @param {number} position
 * @returns {object}
 */
export const createTile = (number, position) => {
  return {
    number,
    position
  }
}

/**
 * @param {number} position
 * @param {number} gridSize
 * @param {number} width tileWidth
 * @param {number} height tileHeight
 * @returs {object}
 */
export const getTileCoords = (position, gridSize, width, height) => {
  const column = getColumn(position, gridSize);
  const row = getRow(position, gridSize);

  return {
    column,
    row,
    left: column * width,
    top: row * height,
    width,
    height
  };
};
