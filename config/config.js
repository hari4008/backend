const {Sequelize,DataTypes} = require('sequelize');
const mysql2 = require("mysql2");

// const sequelize = new Sequelize(
//     'e_com_watchs',
//     'root',
//     '',
//     {
//         host:'localhost',
//         logging: false, //false if you want to disable printing log
//         dialect: "mysql",  //use mysql for production
//         // port:5001
//     });
// --------------------------------------------------------
const sequelize = new Sequelize(
    'e_com_watchs',
    'avnadmin',
    'AVNS_T0_A2Ji8ioHMPSn2lNN',
    {
        host:'mysql-36958a68-regishub-78bc.e.aivencloud.com',
        logging: true, //false if you want to disable printing log
        dialect: "mysql",  //use mysql for production
        dialectModule: mysql2,
        port:22443
    });

try {
    sequelize.authenticate({alter:true});
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

//Model
db.user = require('../Model/signup')(sequelize,DataTypes);
db.staffMember = require('../Model/staffMember')(sequelize,DataTypes);
db.category = require('../Model/category')(sequelize,DataTypes);
db.customerOrder = require('../Model/customerOrder')(sequelize, DataTypes);
db.customerAddress = require('../Model/customerAddress')(sequelize, DataTypes);
db.product = require('../Model/product')(sequelize, DataTypes);
db.faq = require('../Model/faq')(sequelize, DataTypes); 
db.contact = require('../Model/contact')(sequelize, DataTypes);
db.subcategory = require('../Model/subCategory')(sequelize, DataTypes);


db.sequelize.sync(
    {alter:true}
).then(() =>{
    console.log("Table created");
});
db.category.hasMany(db.subcategory,{
    foreignKey:'category_id',
});
db.subcategory.belongsTo(db.category,{
    foreignKey:'category_id',
});
module.exports =db;