import express from "express";
import "dotenv/config";
import itemsPool from "./DBConfig.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Alô Mundo !!");
});

app.get("/api/items", async (req, res) => {
    //res.send("Listando os items do banco de dados");

    try {
        const { rows: allItems } = await itemsPool.query("select * from items");
        //console.log(rows);
        //res.json(rows);
        res.json({
            allItems
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

app.post("/api/items", async (req, res) => {
   // res.send("Criando um item novo no banco de dados");
   const { description } = req.body;

   try {
    const newItem = await itemsPool.query("insert into items (description) values ($1) returning *", [description]);

    res.json({
        message: "Item adicionado com sucesso!!",
        item: newItem.rows
    });

} catch (error) {
    console.log(error);
    res.status(500).send(error.message);
}

});

app.listen(3333, () => {
    console.log('Servidor rondando na porta 3333');
});


