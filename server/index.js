const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3001;
// const textData = fs.readFileSync(`${__dirname}/../dev-data/data/user.txt`, 'utf-8');

const app = express();
app.use(express.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api', (req, res) => {
  fs.readFile(`${__dirname}/../dev-data/data/user.txt`, 'utf-8', (error, data) => {
    if (error) {
      return res.status(500).json({
        status: 'fail',
        message: 'cannot read the file',
      });
    }
    res.status(200).json({
      status: 'success',
      text: data,
    });
  });
});

app.post('/api', (req, res) => {
  const data = req.body.text;

  fs.writeFile(`${__dirname}/../dev-data/data/user.txt`, data + '\n', 'utf-8', (err) => {
    if (err) {
      return res.status(501).json({
        status: 'fail',
        message: 'the file has not been save!',
      });
    }
    console.log('The file have been save');
    res.status(201).json({
      status: 'success',
      data: {
        text: data,
      },
    });
  });
});

app.all('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
