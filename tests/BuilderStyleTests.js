// test.js
const { spec } = require('pactum');

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
        .expectStatus(200);
});


// End To End Testing Example
