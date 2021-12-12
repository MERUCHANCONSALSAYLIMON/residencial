const express = require("express"); //LLamar la libreria
const BodyParser = require("body-parser");

/*                             Servidor                         */
const App = express(); //Instancia de la funcion Express
const port = 3000;

/*                             Conexion SQL                         */
const mysql = require('mysql');
const credential =
{
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fraccionamiento'
}

const connection = mysql.createConnection(credential);
App.use(BodyParser.json({ limit: "10mb", extended: true }))

var datos_personal = [];

App.get('/IDGS-103/Visitante', (req, res) => {
    // res.send("Pruebas de Verbos HTTP")
    connection.connect();
    connection.query('SELECT * FROM Visitante', function (error, results, fields) {
        if (error) throw error;
        let salida = {
            mesagge: "",
            StatusCode: 200,
            results
        }
        res.send(salida);
    });
    connection.end();
})

App.post('/IDGS-103/Visitante', (req, res) => {

    const body_data = req.body;
    let usuariodata = {
        Nombre_Vist: body_data.Nombre_Vist,
        Numero_Ine: body_data.Numero_Ine,
        Placas_Vist: body_data.Placas_Vist,
        Persona_quevisita: body_data.Persona_quevisita,
    };
    connection.connect();
    connection.query("INSERT INTO Visitante SET ?", usuariodata, function (error, results) {
        if (error) throw error;
        let salida = {
            mesagge: "Completado",
            StatusCode: 201,
            usuariodata
        }
        res.send(salida);

    });
    connection.end();
})
App.put('/IDGS-103/Visitante/:id', (req, res) => {
    const Id_usuario = req.body.Idvist;
   const body_data = req.body;
    connection.connect();
    connection.query("UPDATE Visitante SET Nombre_Vist = ?, Numero_Ine = ?, Placas_Vist = ?, Persona_quevisita = ? WHERE Idvist = ?",
        [body_data.Nombre_Vist, body_data.Numero_Ine, body_data.Placas_Vist, body_data.Persona_quevisita, Id_usuario],
        function (error, results) {
            if (error) throw error;
            let salida = {
                mesagge: "Modificacion Exitosa",
                StatusCode: 201,
                
            }
            res.send(salida);
        });

    connection.end();

})

App.delete('/IDGS-103/Visitante/:id', (req, res) => {
    const Id_usuario = req.body.Idvist;
    connection.connect();
    connection.query("DELETE FROM Visitante WHERE Idvist = ?", Id_usuario, function (error, results) {
        if (error) throw error;
        let salida = {
            mesagge: "Eliminacion Exitosa",
            StatusCode: 200,
        }
        res.send(salida);
    });
    connection.end();
})

//Decir que habra el puerto y escuchar
App.listen(port, () => {
    console.log("El servidor incio en el puerto " + port)
})