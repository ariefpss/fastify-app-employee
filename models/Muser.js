module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('users', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        mobile: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        birthdate: {
            allowNull: false,
            type: DataTypes.DATEONLY
        },
        address: {
            allowNull: false,
            type: DataTypes.STRING
        },
    },{
        createdAt: false,
        updatedAt: false
    });

    return user;
};