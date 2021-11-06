const User = require('../config/database').user;

async function routes (fastify, options) {

    //TODO: Activity GET

    //todo: get view home
    fastify.get('/', async (request, reply) => {
        User
            .findAll({limit: 5, offset: 0})
            .then((user) => {
                reply.view('home', {title: 'Employee', users: user});
            });
    });

    //todo: get all data in database
    fastify.get('/user', async (request, reply) => {
        User
            .findAll()
            .then((user) => {
                reply.send({users: user});
            });
    });
};

module.exports = routes;