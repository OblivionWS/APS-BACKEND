const express = require("express");
const conexao = require("./db");

const app = express();

app.use(express.json());

const PORT = 3000;


// CREATE


app.post("/produtos", (req, res) => {

    const { nome, descricao, preco, quantidade } = req.body;

    const sql = `
        INSERT INTO produtos
        (nome, descricao, preco, quantidade)
        VALUES (?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [nome, descricao, preco, quantidade],
        (erro, resultado) => {

            if (erro) {
                return res.status(500).json(erro);
            }

            res.status(201).json({
                mensagem: "Produto cadastrado!",
                id: resultado.insertId
            });
        }
    );
});



// READ TODOS


app.get("/produtos", (req, res) => {

    conexao.query(
        "SELECT * FROM produtos",
        (erro, resultado) => {

            if (erro) {
                return res.status(500).json(erro);
            }

            res.json(resultado);
        }
    );
});



// READ POR ID


app.get("/produtos/:id", (req, res) => {

    const id = req.params.id;

    conexao.query(
        "SELECT * FROM produtos WHERE id = ?",
        [id],
        (erro, resultado) => {

            if (erro) {
                return res.status(500).json(erro);
            }

            if (resultado.length === 0) {
                return res.status(404).json({
                    mensagem: "Produto não encontrado"
                });
            }

            res.json(resultado[0]);
        }
    );
});



// UPDATE


app.put("/produtos/:id", (req, res) => {

    const id = req.params.id;

    const {
        nome,
        descricao,
        preco,
        quantidade
    } = req.body;

    const sql = `
        UPDATE produtos
        SET nome = ?,
            descricao = ?,
            preco = ?,
            quantidade = ?
        WHERE id = ?
    `;

    conexao.query(
        sql,
        [nome, descricao, preco, quantidade, id],
        (erro) => {

            if (erro) {
                return res.status(500).json(erro);
            }

            res.json({
                mensagem: "Produto atualizado!"
            });
        }
    );
});




app.delete("/produtos/:id", (req, res) => {

    const id = req.params.id;

    conexao.query(
        "DELETE FROM produtos WHERE id = ?",
        [id],
        (erro) => {

            if (erro) {
                return res.status(500).json(erro);
            }

            res.json({
                mensagem: "Produto removido!"
            });
        }
    );
});



// SERVIDOR


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});