const fastify = require('fastify')({logger: true});
const path = require('path');

fastify.register(require('point-of-view'), {
    engine: {
        ejs: require('ejs')
    },
    root: path.join(__dirname, 'views')
});
fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public')
});
fastify.register(require('fastify-formbody'));

fastify.register(require('./routes/Ruser'));

fastify.listen(8080, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1)
    };
});