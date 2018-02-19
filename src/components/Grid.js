import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import Tile from '../containers/tile';

class Grid extends Component {
  static propTypes = {
    tiles: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number.isRequired,
      position: PropTypes.number.isRequired
    }))
  };

  componentWillMount() {
    this.props.loadImage(this.props.tileSize);
    this.props.setTileSize(this.props.tileSize);
  }

  render() {
    const {
      className,
      tiles
    } = this.props;

    return (
      <div className={className}>
        {
          tiles &&
            <Paper className="tiles">
              {tiles.map((tile, i) => {
                return (
                  <Tile
                    {...tile}
                    key={`tile-${i}`}
                  />
                );
              })}
            </Paper>
        }
      </div>
    );
  }
}

export default styled(Grid)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);
  & .tiles {
    width: ${props => props.tileSize * props.gridSize}px;
    height: ${props => props.tileSize * props.gridSize}px;
    position: relative;
    text-align: center;
  }
`;
