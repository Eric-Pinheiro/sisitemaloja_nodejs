import express from "express"
const app = express();
import connection from "./config/sequelize-config.js";
import ClientesController from "./controllers/ClientesController.js";
import ProdutosController from "./controllers/ProdutosController.js"
import PedidosController from "./controllers/PedidosController.js";
app.use(express.urlencoded())

connection.authenticate().then(()=>{
  console.log("Conexao Realziada com sucesso");
}).catch((error)=>{
  console.log(error)
})

connection.query(`create database if not exists LojaExNode;`).then(()=>{
  console.log("O banco foi criado com sucesso")
}).catch((error)=>{
  console.log(error)
})

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/", ClientesController);
app.use("/", ProdutosController);
app.use("/", PedidosController);

app.get("/", (req, res) => {
  res.render("index");
});

//config da porta do sistema de loja
const port = 8080;
app.listen(8080, function (error) {
  if (error) {
    console.log(`O erro é: ${error}`);
  } else {
    console.log(`Loja conectada com sucesso. http://localhost:${port}`);
  }
});
