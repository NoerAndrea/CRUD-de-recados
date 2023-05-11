import express, {request, response} from "express";
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());

//POST criando usuarios
let usuarios = []

//POST - cadastro de usuário
app.post('/usuarios', async(request,response)=>{
    const usuario = request.body;    
    
    let usuarioFiltrado = usuarios.find(user=>user.email === usuario.email);

    if(usuarioFiltrado){
        return response.status(409).send("Usuário já existe.")
    }
    
    //Criptografar senha
    let senhaCriptografada = await bcrypt.hash(usuario.senha, 10)

    const novoUsuario = {
        id: usuarios.length + 1,
        nome: usuario.nome,
        email: usuario.email,
        senha:senhaCriptografada
    }

    usuarios.push(novoUsuario);
    console.log(usuario)
    return response.status(201).send("Usuário criado com sucesso!"); 
});

// GET - traz detalhes (lista ou um item por vez
app.get("/usuarios", (request, response)=>{
    return response.status(201).json(usuarios);
})
// POST - Ususario já existente find nome e senha já estão criados no array bycript.comper

app.post('/usuarios/login', (request,response)=>{
    const filtroLogin = request.body;   

    const usuario = usuarios.find(usuario=>usuario.nome===filtroLogin.nome);

    if(!usuario){
        return response.status(402).json("Por favor, digite um usuário já cadastrado.")
    }  

    bcrypt.compare(filtroLogin.senha, usuario.senha, function(err, result){
        if(result){
            return response.status(200).json("Usuário logado.");
        }else{
            return response.status(402).json("Usuário inválido.")
        }
    });
})

//POST - recado

// PUT - edição de 1 usuário

// DELETE - exclusão de um usuário

app.listen(5500, ()=>{
    console.log("Rodando")
})