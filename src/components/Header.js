import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import Alarm from 'material-ui/svg-icons/action/alarm';
import Moves from 'material-ui/svg-icons/action/compare-arrows';
import Replay from 'material-ui/svg-icons/av/replay';
import Pause from 'material-ui/svg-icons/av/pause';
import Play from 'material-ui/svg-icons/av/play-arrow';
import New from 'material-ui/svg-icons/action/power-settings-new';
import {
  GAME_STARTED,
  GAME_PAUSED,
  GAME_OVER
} from '../status';

const StyledToolbar = styled(Toolbar)`
@media (max-width: 1190px) {
  & {
    justify-content: center !important;
  }
  .toolbarTitle {
    display: none;
  }
}
.menuItem {
  margin: 10px 5px !important;
  min-width: 36px !important;
}
.menuIcon {
  margin-left: 0px !important;
}
.menuIcon+span {
  display: none !important;
}
`;

export default class Header extends Component {
  static propTypes = {
    seconds: PropTypes.number,
    moves: PropTypes.number,
    reset: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired,
    gameState: PropTypes.string
  }

  render() {
    const {
      seconds,
      moves,
      reset,
      pause,
      start,
      gameState,
    } = this.props;

    return (
      <StyledToolbar className="toolbar">
        <ToolbarTitle
          className="toolbarTitle"
          text="15 Puzzle"
        />
        <ToolbarGroup>
          <RaisedButton
            className="menuItem"
            onTouchTap={
              gameState === GAME_STARTED ?
              reset :
              start
            }
            title="Start a new game"
            icon={
              gameState === GAME_STARTED ?
              <Replay className="menuIcon" /> :
              <New className="menuIcon" />
            }
          />
          <RaisedButton
            className="menuItem"
            onTouchTap={pause}
            icon={
              gameState === GAME_PAUSED
                ? <Play className="menuIcon" />
                : <Pause className="menuIcon" />
            }
            title="Pause/Continue current game."
            disabled={gameState !== GAME_STARTED && gameState !== GAME_PAUSED}
          />
          <Chip className="menuItem">
            <Avatar icon={<Alarm />} />
            {
              seconds ?
              `${seconds}s` :
              '--'
            }
          </Chip>
          <Chip className="menuItem">
            <Avatar icon={<Moves />} />
            {
              moves ? moves : '--'
            }
          </Chip>
        </ToolbarGroup>

        <Dialog
          title="The game is over!"
          modal={false}
          open={gameState === GAME_OVER}
          onRequestClose={reset}
        >
          You have solved the pazzle in {moves} moves in {seconds} seconds
        </Dialog>

      </StyledToolbar>
    );
  }
}
