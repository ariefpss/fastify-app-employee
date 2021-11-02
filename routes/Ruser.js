const User = require('../config/database').user;

async function routes (fastify, options) {
    fastify.get('/', async (request, reply) => {
        reply.view('home', {title: 'Employee'});
        const getUser = await User.findAll();

        console.log(getUser);
    });
};

module.exports = routes;