import React, {Component} from 'react';
import anime from 'animejs';
import IconButton from 'material-ui/IconButton';
import Background from '../Background';
import * as styles from './styles.css';

class App extends Component {
  componentDidMount() {
    anime({
      targets: '#text',
      translateY: ['12rem', '0rem'],
      delay: 500,
      easing: 'easeInOutExpo',
      duration: 2400,
      opacity: [0, 1],
    });

    anime({
      targets: '#icon-github',
      translateY: ['10rem', '0rem'],
      delay: 520,
      easing: 'easeInOutExpo',
      duration: 2600,
      opacity: [0, 1],
    });

    anime({
      targets: '#icon-twitter',
      translateY: ['10rem', '0rem'],
      delay: 520,
      easing: 'easeInOutExpo',
      duration: 2600,
      opacity: [0, 1],
    });
  }

  render() {
    return (
      <div>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div id="text" className={styles.text}>Prevl IO</div>
            <div className={styles.iconContainer}>
              <a id="icon-github" href="https://github.com/preco21">
                <IconButton
                  iconClassName="fa fa-github"
                  style={{width: '6rem', height: '6rem'}}
                  iconStyle={{fontSize: '4rem', color: 'white'}}
                />
              </a>
              <a id="icon-twitter" href="https://twitter.com/preco21_">
                <IconButton
                  iconClassName="fa fa-twitter"
                  style={{width: '6rem', height: '6rem'}}
                  iconStyle={{fontSize: '4rem', color: 'white'}}
                />
              </a>
            </div>
          </div>
        </div>
        <Background />
      </div>
    );
  }
}

export {
  App as default,
};
