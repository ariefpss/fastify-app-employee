const fastify = require('fastify');

async function routes (fastify, options) {
    fastify.get('/', (request, reply) => {
        reply.send('Hello world');
    });
};

module.exports = routes;