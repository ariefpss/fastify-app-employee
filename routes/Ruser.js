const {Op} = require('sequelize');

const User = require('../config/database').user;
const Generateid = require('../service/customId');

async function routes (fastify, options) {

    //TODO: Activity GET

    fastify.get('/', async (request, reply) => {
        User
            .findAll({limit: 5, offset: 0})
            .then((user) => {
                reply.view('home', {title: 'Employee', users: user});
            });
    });

    fastify.get('/adduser', async(request, reply) => {
        reply.view('user/adduser', {title: 'Employee'});
    });

    fastify.get('/edituser/:id', async(request, reply) => {
        let userId = request.params.id;

        reply.view('user/edituser', {userId, title: 'Employee'});
    });

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

    //todo: find data through search input
    fastify.post('/user/search', (request, reply) => {
        let search = request.body.search;

        let convert = parseInt(search);
        let searchMobile = isNaN(convert) ? 0 : convert;

        User.
            findAll({
                attributes: ['id', 'name', 'email', 'mobile'],
                where: {
                    [Op.or] : {
                        id: {[Op.substring] : search},
                        name: {[Op.substring] : search},
                        email: {[Op.substring] : search},
                        mobile: {[Op.eq] : searchMobile}
                    }
                }
            })
            .then((user) => {
                reply.send({users: user});
            });
    });
};

module.exports = routes;