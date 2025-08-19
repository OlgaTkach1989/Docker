const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hallo von der Node.js API!'));

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
