const User = require('../config/database').user;
const Generateid = require('../service/customId');

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

    //todo: get view create user
    fastify.get('/adduser', async(request, reply) => {
        reply.view('user/adduser', {title: 'Employee'});
    });

    //todo: get all data in database
    fastify.get('/user', async (request, reply) => {
        User
            .findAll()
            .then((user) => {
                reply.send({users: user});
            });
    });

    //TODO: Activity CRUD

    //todo: create users
    fastify.post('/adduser', async(request, reply) => {
        let customId = new Generateid();

        const _id = await customId.generateId(request.body.birthdate);

        const createuser = await User.build({
            id: _id,
            name: request.body.name,
            email: request.body.email,
            mobile: request.body.mobile,
            birthdate: request.body.birthdate,
            address: request.body.address
        });

        await createuser.save();

        reply.redirect('/adduser');
    });
};

module.exports = routes;