import express, {request, response} from "express";
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());

//POST criando usuarios
let usuarios = [];
let recados = [];

//POST - cadastro de usuário

app.post('/usuarios', async(request,response)=>{
    const { nome,email,senha} = request.body;    
    
    let usuarioFiltrado = usuarios.find(user=>user.email === email);

    if(usuarioFiltrado){
        return response.status(409).send("Usuário já existe.")
    }
    
    //Criptografar senha
    let senhaCriptografada = await bcrypt.hash(senha, 10)

    const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        email,
        senha:senhaCriptografada,
        recados: [],
    }

    usuarios.push(novoUsuario);
    console.log(novoUsuario);
    return response.status(201).send("Usuário criado com sucesso!"); 
});

// GET - ler usuário

app.get("/usuarios", (request, response)=>{
    return response.status(201).json(usuarios);
})
// POST - login

app.post('/usuarios/login', (request,response)=>{
    const filtroLogin = request.body;   

    const usuario = usuarios.find(usuario=>usuario.email===filtroLogin.email);

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

app.post('/usuarios/:id/recados', (request, response)=>{
    const { titulo,descricao } = request.body;
    const usuarioId = parseInt(request.params.id);

    const usuario = usuarios.find((user)=> user.id === usuarioId);

    if(!usuario){
        return response.status(404).json("Usuário não encontrado.")
    }

    const novoRecado = {
        id: recados.length + 1,
        titulo,
        descricao,
    };

    usuario.recados.push(novoRecado);
    recados.push(novoRecado);
    
    return response.status(201).send("Recado criado com sucesso!"); 
})

//GET - ler recado

app.get('/usuarios/:id/recados', (request, response)=>{

    const usuarioId = parseInt(request.params.id);

    const usuario = usuarios.find((user) => user.id === usuarioId);

    if(!usuario){
        return response.status(404).json("Usuário não encontrado.")
    }

    return response.status(201).json(usuario.recados);
});

// PUT - edição de recado

 app.put('/usuarios/:userId/recados/:recadoId', (request, response)=>{
    const usuarioId = parseInt(request.params.userId);
    const { titulo, descricao } = request.body;
    const recadoId = parseInt(request.params.recadoId)

    const usuario = usuarios.find((user) => user.id === usuarioId);

    if(!usuario){
        return response.status(404).json("Usuário não encontrado.");
    }

    const recado = usuario.recados.find((recado) => recado.id ===  recadoId);

    if (!recado) {
        return response.status(404).json("Recado não existe.");
    }

    recado.titulo = titulo;
    recado.descricao = descricao;

    return response.status(201).send("Recado atualizado com sucesso!");
 })


// DELETE - exclusão de recado

app.delete('/usuarios/:userId/recados/:recadoId', (request, response)=>{
    const usuarioId = parseInt(request.params.userId);
    const recadoId = parseInt(request.params.recadoId);

    const usuario = usuarios.find((user) => user.id === usuarioId);

    if(!usuario){
        return response.status(404).json("Usuário não encontrado.");
    }

    const recado = usuario.recados.find((recado) => recado.id ===  recadoId);

    if (!recado) {
        return response.status(404).json("Recado não existe.");
    }

    recados.splice(recadoId,0);

    return response.send("Recado excluído com sucesso!");
});


app.listen(5500, ()=>{
    console.log("Rodando")
})