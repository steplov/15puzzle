import { createSelectorCreator, defaultMemoize } from 'reselect';
import isEqual from 'lodash.isequal';
import { getTileCoords } from '../utils/tile';
import { getTile } from '../utils/utils';

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
)

const selectTile = (state, props) => getTile(state.app.tiles, props.number).position;
const selectGridSize = (state, props) => state.app.gridSize;
const selectTileSize = (state, props) => state.app.tileSize;

const getTilePosition = () => {
  return createDeepEqualSelector(
    [ selectTile, selectGridSize, selectTileSize ],
    (position, gridSize, tileSize) => {
      return getTileCoords(position, gridSize, tileSize, tileSize)
    }
  )
}

export default getTilePosition;
