const User = require('../config/database').user;
const {Op} = require('sequelize');

class customId {
    async generateId (birthdate) {
        const YY = birthdate.slice(2,4);
        const MM = birthdate.slice(5,7);
        const yymmIp = YY.concat(MM);
        const yymmDt = await User.findAll({attributes: ['id']});

        if (!yymmDt.length){
            let xxxx = '0000';
            let id = yymmIp.concat(xxxx)

            return id;
        }
        else {
            for (let i = 0; i <= yymmDt.length; i++) {
                let checkYyMm = yymmDt[i].id.toString().slice(0,4)

                if (checkYyMm == yymmIp){
                    let lastDt = await User.findOne({ attributes: ['id'],
                        order: [ ['id','DESC'] ],
                        where: {
                            id : {
                                [Op.startsWith]: yymmIp
                            }
                        }
                    });
                    let sub = parseInt(lastDt.id) + 1;
                    let xxxx = sub.toString().slice(4,8);
                    let id = yymmIp.concat(xxxx);

                    return id;

                } else if (checkYyMm != yymmIp){
                    let xxxx = '0000';
                    let id = yymmIp.concat(xxxx);

                    return id;

                };
            };

        };
    }
};

module.exports = customId;