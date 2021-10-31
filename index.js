const fastify = require('fastify')({logger: true});

fastify.register(require('./routes/user'));

fastify.listen(8080, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1)
    };
});