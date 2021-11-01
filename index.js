const fastify = require('fastify')({logger: true});
const path = require('path');

fastify.register(require('point-of-view'), {
    engine: {
        ejs: require('ejs')
    },
    root: path.join(__dirname, 'views')
});
fastify.register(require('./config/database'));
fastify.register(require('./routes/user'));

fastify.listen(8080, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1)
    };
});