const io = require('socket.io-client/dist/socket.io.js');
const serverUrl = 'http://localhost:8000';

console.log('test');

describe('Socket.IO Server', () => {
  let clientSocket;

  beforeAll((done) => {
    // connect to server before each test
    clientSocket = io(serverUrl);

    // log events emitted by the client socket
    clientSocket.onAny((event, ...args) => {
      console.log(`Client socket event: ${event}`, ...args);
    });

    // log connection errors
    clientSocket.on('connect_error', (error) => {
      console.log('Client socket connection error:', error);
      done.fail(error);
    });

    // wait for connection to be established before running tests
    clientSocket.on('connect', () => {
      console.log('Client socket connected to server');
      done();
    });
  }, 10000);

  afterAll(() => {
    // disconnect from server after each test
    clientSocket.disconnect();
  });

  it('should emit "message" event with correct message', (done) => {
    const message = 'Hello World!';

    // emit the message to the server
    clientSocket.emit('message', message, false, false);

    // listen for the same message from the server
    clientSocket.on('message', (msg, playSound, joinLeave) => {
      // assert that the message received from the server matches the sent message
      expect(msg).toBe(message);

      // end the test
      done();
    });
  }, 10000); // set timeout to 10000 milliseconds
});





