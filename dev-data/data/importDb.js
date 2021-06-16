const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const fs = require('fs');
const mongoose = require('mongoose');
const Comment = require('../../server/model/commentModel');
const commentsLocation = `${__dirname}/comments.json`;

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('DB connection successful'));

// READ JSON FILE
const comments = JSON.parse(fs.readFileSync(commentsLocation));

const importData = async () => {
  try {
    await Comment.create(comments);
    console.log('Data seccessfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Comment.deleteMany();
    console.log('Data successfully delete');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
