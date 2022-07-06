const { spec } = require('pactum');

describe('Posts', () => {

  const _spec = spec();

  it('should make a request to json-placeholder', async () => {
    _spec.get('http://jsonplaceholder.typicode.com/posts/{id}');
  });

  it('should get first post', async () => {
    _spec.withPathParams('id', '1');
  });

  it('should receive a response', async () => {
    await _spec.toss();
  });

  it('should have a status code of 200', async () => {
    _spec.response().to.have.status(200);
  });

  it('should have a user id of 1', async () => {
    _spec.response().to.have.json('userId', 1);
  });

});
