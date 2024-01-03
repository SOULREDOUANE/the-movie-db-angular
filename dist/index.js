const express = require('express');

const path = require('path');
const port = process.env.PORT || 80;
const POST = process.env.HOST;

const app = express();

app.use('/', express.static(path.join(__dirname, 'angular')));
app.get('', (req, res) => {
  res.sendFile(path.join(__dirname, 'angular', 'browser', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
