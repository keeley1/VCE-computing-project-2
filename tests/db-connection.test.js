const { retrieveMessages } = require('../index.js');

describe('retrieveMessages', () => {
  test('should retrieve messages from the database', (done) => {
    retrieveMessages((err, result) => {
      expect(err).toBeNull();
      expect(result).toBeDefined();
      done();
    });
  });
});
