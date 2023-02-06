# API Template
This is just an basic API template with route handler.

### How to create new routes
You need to create new files using the following format:
```javascript
module.exports = {
    path: '/name', // Don't forget the "/" thing.
    method: 'get | post | ...',
    code: async <whatever> => {
        // do something.
    }
}
```