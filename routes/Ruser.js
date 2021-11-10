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

    fastify.get('/user', async (request, reply) => {
        User
            .findAll()
            .then((user) => {
                reply.send({users: user});
            });
    });

    fastify.get('/adduser', async(request, reply) => {
        reply.view('user/adduser', {title: 'Employee'});
    });

    fastify.get('/edituser/:id', async(request, reply) => {
        let userId = request.params.id;

        reply.view('user/edituser', {userId, title: 'Employee'});
    });

    fastify.get('/deleteuser/:id', async(request, reply) => {
        User
            .findOne({ where: {id: request.params.id} })
            .then((user) => {
                let formatMonth = ['Januari', 'Februari', 'Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
                let brithdate = user.birthdate;

                let reqDate = brithdate.split('-').slice(2).toString();
                let reqMonth = brithdate.split('-').slice(1, -1);
                let reqYears = brithdate.split('-').slice(0, -2).toString();

                let month = formatMonth[Number(reqMonth)-1];

                let repBrithdate = reqDate.concat(' ', month, ' ', reqYears);

                reply.view('user/deleteuser', {users: user, repBrithdate, title: 'Employee'});
            });
    });


    //TODO: Activity CRUD

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

    fastify.post('/edituser/:id', async (request, reply) => {
        const _id = request.params.id;

        await User.update({
            name: request.body.name,
            email: request.body.email,
            mobile: request.body.mobile,
            birthdate: request.body.birthdate,
            address: request.body.address
        }, {
            where: {
                id: _id
            }
        });

        reply.redirect('/edituser/'+_id)
    });

    fastify.post('/deleteuser/:id', async (request, reply) => {
        const _id = request.params.id;

        await User.destroy({ where: {id: _id} })

        reply.redirect('/');
    });
};

module.exports = routes;