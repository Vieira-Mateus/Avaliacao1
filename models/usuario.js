var sequelize = require("sequelize")
var banco = require("../configs/banco-config")

var usuario = banco.define("usuario",{
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: sequelize.STRING(30),
        allowNull: false,
        
    },
    email: {
        type: sequelize.STRING(50),
        allowNull: false,
        
    },
    senha: {
        type: sequelize.STRING,
        allowNull: false,
    },
    eAdmin: {
        type: sequelize.INTEGER,
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false
})

usuario.sync() //cria a tabela

module.exports = usuario