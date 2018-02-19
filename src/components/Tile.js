import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';

class Tile extends Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    visible: PropTypes.bool
  }

  static defaultProps = {
    number: 0,
    visible: true
  }

  onClick = () => {
    this.props.onClick(this.props.number);
  }

  render() {
    const {
      className,
      number,
      visible,
      skin
    } = this.props;
    const classes = classnames({
      [className]: true,
      'tile-invisible': !visible
    });

    return (
      <div className={classes} onClick={this.onClick}>
        <div className="tile-wrapper">
          <img className="tile-image" src={skin} alt=""/>
          <span className="tile-number">{number}</span>
        </div>
      </div>
    );
  }
}

export default styled(Tile)`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition-property: top, left;
  transition-duration: .300s;
  transition-timing-function: ease-in;

  .tile-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .tile-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .tile-number {
    position: absolute;
    bottom: 0;
    right: 0;
    color: #fff;
    font-weight: 400;
    font-size: 1em;
    user-select: none;
  }
  &.tile-invisible {
    display: none;
  }
`;
