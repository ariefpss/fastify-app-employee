const fastifyPlugin = require('fastify-plugin');
const fsequelize = require('sequelize-fastify');

async function dbConnection (fastify, options) {
    fastify.register(fsequelize, {
                instance: 'sequelize',
                autoConnect: true,
                sequelizeOptions:{
                    dialect: 'postgres',
                    database: 'appemployee',
                    username: 'postgres',
                    password: '',
                    options: {
                        host: 'localhost',
                        port: '5432'
                    }
                }
    }).ready(async () => {
        try {
            console.log('Database is successfully connected.');
        } catch (error) {
            console.log('Database could not connected: '+error);
        }
    });
}

module.exports = fastifyPlugin(dbConnection);