import React, {Component} from 'react';
import granim from '../../utils/granim';
import * as styles from './styles.css';

class Background extends Component {
  state = {
    granim: null,
    width: 0,
    height: 0,
  };

  componentWillMount() {
    this.handleResize();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.state.granim.clear();
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  render() {
    return (
      <canvas
        className={styles.content}
        width={this.state.width}
        height={this.state.height}
        ref={(el) => {
          if (!el) {
            return;
          }

          const granimEl = granim({
            element: el,
            direction: 'bottom-right',
            opacity: [1, 1],
            isPausedWhenNotInView: true,
            states: {
              'default-state': {
                gradients: [
                  ['#47d2ff', '#1bc6ff'],
                  ['#3fc0ff', '#11b3ff'],
                  ['#0f5f66', '#045366'],
                ],
              },
            },
          });

          this.setState({granim: granimEl});
        }}
      />
    );
  }
}

export {
  Background as default,
};
