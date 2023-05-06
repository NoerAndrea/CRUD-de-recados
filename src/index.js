import express, {request, response} from "express";

const app = express();

app.use(express.json());


//Criando POST usuarios
let usuarios = [];

app.post('/usuarios', (request,response)=>{
    const usuario = request.body;
    usuarios.push(usuario);
    console.log(usuario);

    return response.status(204).json(usuarios[usuarios.length -1]);
});

app.get("/usuarios", (request, response)=>{
    return response.status(201).json(usuarios);
})

app.listen(5500, ()=>{
    console.log("Rodando")
})