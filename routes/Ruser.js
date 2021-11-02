const User = require('../config/database').user;

async function routes (fastify, options) {

    //TODO: Get view home
    fastify.get('/', async (request, reply) => {
        User
            .findAll({limit: 5, offset: 0})
            .then((user) => {
                reply.view('home', {title: 'Employee', users: user});
            });
    });
};

module.exports = routes;