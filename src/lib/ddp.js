
import {createClass} from 'asteroid';

const Asteroid = createClass();

class DDP {
  constructor() {
    this.asteroid = new Asteroid({
      endpoint: 'ws://localhost:4700/websocket',
    });

    const { asteroid } = this;
    
    asteroid.on('connected', () => console.log('connected') );
    asteroid.on('disconnected', () => console.log('disconnected'));
    asteroid.on('loggedIn', () => {
      console.log('logged in');
    });
    
    asteroid.ddp.on('added', (details) => {
      // console.log('added:', details);
    });
    asteroid.ddp.on('changed', (details) => {
      // console.log('changed:', details);
    });
    asteroid.ddp.on('removed', (details) => {
      // console.log('removed:', details);
    });

    asteroid.subscribe('adminUsers');
    asteroid.subscribe('user.messages');
    
    asteroid.loginWithPassword({
      username: 'it_admin@raisemetrex.com.au',
      // email: 'it_admin@raisemetrex.com.au',
      password: 'P4ssw0rd!2018',
    });

  }
  
  subscribe(collection, handlers) {
  }
  
  test1() {
    const { asteroid } = this;

    asteroid.call('user.message', `Just a message: ${new Date()}`)
      .then(result => {
        console.log('user.message: result:', result);
      })
      .catch(error => {
        console.log('user.message: error:', error);
      })
    
  }
  
}

const ddp = new DDP();

export default ddp;
