module.exports = (sequelize, DataTypes) =>{
    const customerAddress= sequelize.define('customerAddress', {
        address:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        city:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        dist:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        state:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        pincode:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
    },{
        tableName:'customerAddress'
    })
    return  customerAddress;
}