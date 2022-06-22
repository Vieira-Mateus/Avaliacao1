var sequelize = require("sequelize")
var banco = require("../configs/banco-config")

var carro = banco.define("carro",{
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    marca: {
        type: sequelize.STRING(20),
        allowNull: false,
    },
    modelo: {
        type: sequelize.STRING(20),
        allowNull: false,
    },
    ano: {
        type: sequelize.INTEGER,
        allowNull: false,
    },
},{
    freezeTableName: true,
    timestamps: false
})

carro.sync()

module.exports = carro