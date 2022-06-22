var usuario = require('../models/usuario');
var cripto = require ("bcryptjs")
const usuarioControlador = {};

usuarioControlador.mostrarFormLogin = function(req,res){
    try {
        res.render("login")
    } catch (error) {
        res.status(500).send("Erro ao acessar a página de login!")
    }
}

usuarioControlador.inserirUsuarioBanco = async function (req, res) {
    var erros = []

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email inválido"})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválida"})
    }

    if(req.body.senha.length < 6){
        erros.push({texto: "Senha muito pequena!"})
    }

    if(erros.length > 0){//se existe algum erro
        res.render("cadastroUsuario",{errosNaPagina: erros})
    }else{
        var senha = await cripto.hash(req.body.senha,8)
        
        usuario.create({
            nome: req.body.nome,
            email: req.body.email,
            senha: senha,
            eAdmin: req.body.eAdmin
        }).then(
            function(){
                req.flash("success_msg","Usuário cadastrado com sucesso!")
                res.status(200).redirect("/login");
            }
        ).catch(
            function(error){
                req.flash("error_msg","Erro ao cadastrar usuário!")
                //res.status(500).send("Erro ao criar usuário: " + error);
                res.redirect("/cadastro/usuario")
            }
        )
    }
}

usuarioControlador.buscarUsuario = function(req,res){
    usuario.findOne({
        raw: true,
        where: {
            email: req.body.email
        }
    }).then(
        function(user){
            cripto.compare(req.body.senha,user.senha).then(
                function(result){
                    console.log(result)
                    if(result){
                        req.flash("success_msg","Login efetuado com sucesso!")
                        res.status(200).redirect("/");
                    }else{
                        req.flash("error_msg","Erro nas credencias! Tente novamente!")
                        //res.status(500).send("Erro nas credenciais ao logar")
                        res.redirect("/login")
                    }
                }
            ).catch(
                function(error){
                    req.flash("error_msg","Erro ao logar! Contate o administrador.")
                    //res.status(500).send("Erro nas credenciais ao logar")
                    res.redirect("/")
                }
            )
        }
    ).catch(
        function(error){
            req.flash("error_msg","Conta não existe! Faça o cadastro abaixo.")
            //res.status(500).send("Erro nas credenciais ao logar")
            res.redirect("/cadastro/usuario")
        }
    )
}

usuarioControlador.cadastro = function (req, res) {
    try {
        res.render("cadastroUsuario")
    } catch (error) {
        res.status(500).send("Erro ao acessar página de cadastro: " + error);
    }
};

module.exports = usuarioControlador