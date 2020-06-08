"use strict";

// Imports
require('./core/initializer.js');

// Show name in window. <= J'ai pas compris 🤔
process.stdout.setEncoding('utf8');
process.title = "EmuTarkov MODS Server";

const db = new sqlite3.Database('database.sqlite'); //can't put db somewhere else ... 

// Allow CORS FROM frontend.
app.use(cors({
    origin: 'http://localhost:4200'
}));

// Fetch all validated mods.
app.get('/', (req, res) => {
    const query = "SELECT * FROM mods WHERE isValid = 1";
    db.all(query, (err, rows) => res.json(rows));
});

// Fetch mod categories.
app.get('/categories', (req, res) => {
    const query = "SELECT categoryName, categories.categoryID, categories_childs.categoryID AS parentCategory FROM categories LEFT JOIN categories_childs ON categories.categoryID = categories_childs.childCategory"
    db.all(query, (err, rows) => res.json(rows));
})

// Fetch validated mods with name like <name>.
app.get('/search/:name', (req, res) => {
    const query = `SELECT * FROM mods WHERE mods.name LIKE '%${req.params.name}%' AND isValid = 1`;
    db.all(query, (err, rows) => res.json(rows));
});

// Fetch mod with <id>
app.get('/mod/:id', (req, res) => {
    const query = `SELECT * FROM mods WHERE mods.modID = '${req.params.id}'`;
    db.get(query, (err, row) => res.json(row));
});

// Idk what the fuck this is doing...
app.get('/listMods', (req, res) => {
    const query = "SELECT * FROM categories_childs INNER JOIN mods ON categories_childs.childCategory = mods.categoryID WHERE isValid = 1";
    db.all(query, (err, rows) => res.json(rows));
})

// ...
app.get('/mods/:cat/:type/:id', (req, res) => {
    const query = "SELECT vers FROM verre WHERE vert = ver"; // wat.jpg 👀
    db.all(query, (err, rows) => res.json(rows));
})

/**********************	ADMIN-PANEL ********************/

// Upload a mod.
app.get('/upload', (req, res) => {
    const query = "INSERT INTO mods VALUES ( req.body... );";
    db.run(query, err => {
        if (err != null) {
            res.send('ok');
        } else {
            res.send('false');
        }
    });
})

// Access admin-panel.
app.get('/admin', (req, res) => {
    // "SELECT categories_childs.categoryID as parentCategory, childCategory,modID,name FROM categories_childs INNER JOIN mods ON categories_childs.childCategory = mods.categoryID LEFT JOIN categories ON categories_childs.childCategory = categories.categoryID"
    const query = "SELECT * FROM mods WHERE isValid = 0";
    db.all(query, (err, rows) => res.json(rows));

})

// Delete a mod with <id>.
app.get('/admin/delete/:id', (req, res) => {
    const query = `DELETE FROM mods WHERE modID = '${req.params.id}'`;
    db.run(query, err => res.send('ok'));
});

// Validate a mod with <id>.
app.get('/admin/validate/:id', (req, res) => {
    const query = `UPDATE mods SET isValid = 1 WHERE modID = '${req.params.id}'`
    db.run(query, err => res.send('ok'))
});

// Unvalidate a mod with <id>.
app.get('/admin/unvalidate/:id', (req, res) => {
    const query = `UPDATE mods SET isValid = 0 WHERE modID = '${req.params.id}'`;
    db.run(query, err => res.send('ok'));
});

// 404.
app.get('*', (req, res) => res.status(404).send('what???'));


console.log('server started');

// Starts the server and listen on port 3000.
app.listen(3000);