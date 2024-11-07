module.exports = (sequelize,DataTypes) => {
    const Product = sequelize.define('products', {
        subcateId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull:false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        categ:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        image:{
            type:DataTypes.JSON,
            allowNull:false
        },
        place:{
            type:DataTypes.ENUM("Regular", "Hot deal","Main carousel","Week deal","About Product"),
            allowNull:false,
            defaultValue:'Regular'
            // type: DataTypes.ENUM,
            // values:["Regular", "Hot deal","Main carousel","Week deal","About Product"],
            // defaultValue: 'Regular'
        },
        uploadby:{
            type: DataTypes.STRING,
        }
    },{
        tableName:'products'
    })
    return Product;
}