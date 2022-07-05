const { mock } = require('pactum');

// Simple Mock Example
mock.addInteraction({
  request: {
    method: 'GET',
    path: '/api/hello'
  },
  response: {
    status: 200,
    body: 'Hello'
  }
});

// Mock Example with 2 call with different answers
mock.addInteraction({
  request: {
    method: 'GET',
    path: '/api/health'
  },
  response: {
    onCall: {
      0: {
        status: 500
      },
      1: {
        status: 200,
        body: 'OK'
      }
    }
  }
});

// Mock Example with configurable delay
mock.addInteraction({
  request: {
    method: 'POST',
    path: '/api/users',
    body: {
      id: 3
    }
  },
  response: {
    status: 200,
    fixedDelay: 1000
  }
});

// Mock Example with stores (*Fix*)
mock.addInteraction({
  request: {
    method: 'GET',
    path: '/api/projects/{id}',
    pathParams: {
      id: regex()
    }
  },
  stores: {
    ProjectId: 'req.pathParams.id'
  },
  response: {
    status: 200,
    body: {
      id: '$S{ProjectId}'
    }
  }
});

mock.start(3000);
