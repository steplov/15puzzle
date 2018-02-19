import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { tileAction } from '../actions/app';
import Tile from '../components/Tile';
import makeGetTilePosition from '../selectors/getTilePosition';

const makeMapStateToProps = () => {
  const getTilePosition = makeGetTilePosition();

  return (state, props) => {
    const position = getTilePosition(state, props);

    return {
      ...position,
      visible: props.number !== 0,
      skin: state.skin[props.number]
    }
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  onClick: tileAction
}, dispatch);

export default connect(makeMapStateToProps, mapDispatchToProps)(Tile);
