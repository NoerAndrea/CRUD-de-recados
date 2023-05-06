import express, {request, response} from "express";

const app = express();

app.use(express.json());


//Criando POST usuarios
let usuarios = [];

app.post('/usuarios', (request,response)=>{
    const usuario = request.body
    usuarios.push({
        nome:usuario.nome, email:usuario.email, senha:usuario.senha
    })
    console.log(usuarios);
    response.status(204).json();
});

app.listen(5500, ()=>{
    console.log("Rodando")
})