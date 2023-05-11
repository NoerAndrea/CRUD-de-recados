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

// GET - ler usuário

app.get("/usuarios", (request, response)=>{
    return response.status(201).json(usuarios);
})
// POST - login

app.post('/usuarios/login', (request,response)=>{
    const filtroLogin = request.body;   

    const usuario = usuarios.find(usuario=>usuario.em,email===filtroLogin.email);

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

//POST - criar recado

let recados = [];

app.post('/login/recado', (request, response)=>{
    const {titulo,descricao} = request.body;

    const recado = {
        id: recados.length + 1,
        titulo,
        descricao
    }

    recados.push(recado);
    
    return response.status(201).send("Recado criado com sucesso!"); 

})

//GET - ler recado

app.get('/login/recado', (request, response)=>{

    return response.status(201).json(recados);
})

// PUT - edição de recado

app.put('/login/recado/editar', (request, response)=>{
    const index = request.params;
    const id = request.body;

    recados[index] = id;

    return response.json(recados);
})

// DELETE - exclusão de recado

app.delete('/login/recado/excluir', (request, response)=>{
    const index = request.params;

    recados.splice(index,1);

    return response.send("Recado excluído com sucesso!");
})

//GET - ler recado

app.get('/login/recado', (request, response)=>{

    return response.status(201).json(recados);
})

app.listen(5500, ()=>{
    console.log("Rodando")
})