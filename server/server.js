const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const port = process.env.PORT || 3001;
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const app = require('./app');
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('DB connection successful'));

const server = app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

if (process.env.NODE_ENV === 'production') {
  process.on('unhandledRejection', (err) => {
    console.log('UNHANDLE REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message, err.stack);
    server.close(() => process.exit(1));
  });
}
