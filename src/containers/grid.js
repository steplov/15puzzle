import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setTileSize } from '../actions/app';
import { loadImage } from '../actions/skins';
import Grid from '../components/Grid';

const mapStateToProps = state => {
  return {
    gridSize: state.app.gridSize,
    tiles: state.app.tiles
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loadImage,
  setTileSize
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Grid);
