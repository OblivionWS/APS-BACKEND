const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mercadinho"
});

conexao.connect((erro) => {
    if (erro) {
        console.error("Erro ao conectar:", erro);
        return;
    }

    console.log("Conectado ao MySQL!");
});

module.exports = conexao;