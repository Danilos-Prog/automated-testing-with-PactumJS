// test.js
const { spec } = require('pactum');
const { e2e } = require('pactum');

// Simple test Example
it('Simple Test. Should get a response with status code 200', async () => {
    await spec()
        .get('http://httpbin.org/status/200')
        .expectStatus(200);
});

// API Testing Example
it('API Testing. Should get random male users', async () => {
    results = { "results": [{ "gender": "male" }] }

    await spec()
        .get('https://randomuser.me/api')
        .withQueryParams('gender', 'male')
        .expectStatus(200)
        .expectJsonLike(results);
});

// Integration Testing Example
it('Integration Testing. Should return all posts and first post should have comments', async () => {

    // Method 1. Default
    const response = await spec()
        .get('http://jsonplaceholder.typicode.com/posts')
        .expectStatus(200);

    const postID = response.json[0].id;


    // Method 2. Using returns
    /*
    const postID = await spec()
        .get('http://jsonplaceholder.typicode.com/posts')
        .expectStatus(200)
        .returns('[0].id'); 
    */

    // Method 3. Using stores
    /*
    await spec()
        .get('http://jsonplaceholder.typicode.com/posts')
        .expectStatus(200)
        .stores('FirstPostId', '[0].id');
    */

    await spec()
        .get(`http://jsonplaceholder.typicode.com/posts/${postID}/comments`)
        .expectStatus(200)
        .retry(2, 2000);
});


// End To End Testing Example
// *Add Retry Mechanism in demonstration
// *Add Working API URL
describe('End To End Testing Example. Creating User, Getting User and then cleanup', () => {

    let test_case = e2e('Add User');

    it('create user', async () => {
        await test_case.step('Post User')
            .spec()
            .post('/api/users')
            .withJson({
                "name": "snow"
            })
            .expectStatus(200)
            .clean()
            .delete('/api/users/snow')
            .expectStatus(200);
    });

    it('get user', async () => {
        await test_case.step('Get User')
            .spec()
            .get('/api/users/snow')
            .expectStatus(200)
            .expectJson({
                "name": "snow"
            });
    });

    it('clean up', async () => {
        // runs all registered cleanup methods in LIFO order
        await test_case.cleanup();
    });

});