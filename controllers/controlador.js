var carro = require('../models/carro');
var axios = require("axios")
var qs = require("querystring")


const carroControlador = {};

//CREATE
carroControlador.inserirCarroBanco = function (req, res) {
    carro.create({
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano: req.body.ano
    }).then(
        function(){
            res.status(200).redirect("/");
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao criar carro: " + error);
        }
    )
}


//READ
carroControlador.buscarCarrosBanco = function(req,res){
    carro.findAll({
        raw: true
    }).then(
        function(dados){
            res.render("inicio",{carros: dados})
        }
    ).catch(
        function(erro){
            res.status(500).send(`Erro ao buscar os carros: ${erro}`)
        }
    )
}

//UPDATE
carroControlador.atualizarCarroBanco = function (req, res) {
    carro.update({
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano: req.body.ano
    },{
        where: {
            id: req.params.id
        }
    }).then(
        function(){
            res.sendStatus(200)
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao atualizar a carro: " + error)
        }
    )
}

//DELETE
carroControlador.removerCarroBanco = function (req, res) {
    carro.destroy(
        {
        where: {
            id: req.params.id
        }
    }).then(
        function(){
            res.sendStatus(200)
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao remover a carro: " + error)
        }
    )
}

//métodos do handlebars
carroControlador.cadastro = function (req, res) {
    try {
        res.render("cadastro")
    } catch (error) {
        res.status(500).send("Erro ao acessar página de cadastro: " + error);
    }
};

//solicitarEditarFormulario
carroControlador.editarFormulario = function(req,res){
    carro.findOne({
        raw: true,
        where: {
            id: req.params.id
        }
    }).then(
        function(car){
            res.render("editarForm",{
                idCarro: req.params.id,
                marca: car.marca,
                modelo: car.modelo,
                ano: car.ano
            })
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao acessar página de edição: " + error)
        }
    )
}

//montarRequisiçãoEditar
carroControlador.montarReqEdicao = function (req, res) {
    axios.put("/" + req.params.id,
        qs.stringify({
            marca: req.body.marca,
            modelo: req.body.modelo,
            ano: req.body.ano,
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            proxy:{
                host: "52.90.108.9",
                port: 3000
            }
        }
    ).then(function () {
            res.status(200).redirect("/")
        })
    .catch(function (err) {
        res.status(500).send("Erro ao editar o carro: " + err);
    })
}

//montarRequisiçãoRemover
carroControlador.montarReqDelete = function (req, res) {
    axios.delete('/' + req.params.id,{
        proxy:{
            host: "52.90.108.9",
            port: 3000
        }
        
    }).then(function () {
            res.status(200).redirect("/")
        })
        .catch(function (err) {
            res.status(500).send("Erro ao apagar um carro: " + err);
        })
}






module.exports = carroControlador;