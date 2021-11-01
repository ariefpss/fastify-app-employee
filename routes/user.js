const fastify = require('fastify');

async function routes (fastify, options) {
    fastify.get('/', (request, reply) => {
        reply.view('home', {title: 'Employee'});
    });
};

module.exports = routes;