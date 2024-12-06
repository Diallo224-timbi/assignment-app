// installer express js
const express = require("express"); // importer le module express
const path = require("path"); // importe le module path pour gerer les chemin

const app = express(); // créer une instance pour configurer le serveur

// se servir uniquement des fichier static du dossier dist
app.use(express.static(path.join(__dirname +"/dist/assignment-app/browser")));

app.get("/*", function (req,res) {
    res.sendFile(path.join(__dirname + "/dist/assignment-app/browser/index.html"));
})

// demarer l'application en ecoutant sur le port render
app.listen(process.env.PORT || 8081, () => {
    console.log("Server is running on port", process.env.PORT || 8081);
});
