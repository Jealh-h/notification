const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql', 'root', 'hhd1620175472', {
    host: "47.99.199.187",
    port: "3306",
    dialect: "mysql"
})

try {
    new Promise((res, rej) => {
        sequelize.authenticate();
    }).then(fulfilled => {
        console.log('connection has been established successfully');
    }, eject => {
        console.log(eject);
    })
} catch (error) {
    console.error("unable to connet to the database", error);
}