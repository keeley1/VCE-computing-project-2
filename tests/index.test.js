const { createServer } = require("http");

const { Server } = require("socket.io");
const Client = require("../node_modules/socket.io/client-dist/socket.io.js");
const connection = require("../utils/db-connection");
const { retrieveMessages } = require('../index.js');

describe("my awesome project", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const server = require('http').createServer();
    io = new Server(server);
    io.listen(8000, () => {
      const port = io.httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("should work", (done) => {
    clientSocket.on("hello", (arg) => {
      expect(arg).toBe("world");
      done();
    });
    serverSocket.emit("hello", "world");
  });

  test("should work (with ack)", (done) => {
    serverSocket.on("hi", (cb) => {
      cb("hola");
    });
    clientSocket.emit("hi", (arg) => {
      expect(arg).toBe("hola");
      done();
    });
  });

  test("should retrieve messages from the database", (done) => {
    const message = "Hello World!";
    const username = "testuser";

    connection.query(`INSERT INTO messages (username, message) VALUES (?, ?)`, [username, message], (err) => {
      if (err) throw err;

      clientSocket.emit("retrieveMessages", (messages) => {
        expect(messages).toContain(`${username}: ${message}`);
        done();
      });
    });
  });
});
