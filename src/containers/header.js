import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  pause,
  reset,
  start
} from '../actions/app';
import Header from '../components/Header';

const mapStateToProps = state => {
  return {
    gameState: state.app.gameState,
    seconds: state.app.seconds,
    moves: state.app.moves
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  pause,
  reset,
  start
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Header);
