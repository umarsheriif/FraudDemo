const express = require('express');
const chalk = require('chalk');
// const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;
const config = {
  user: 'umarsheriif',
  password: 'seekegyptUu123456..',
  server: 'paymentemdt.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
  database: 'demo',

  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};

const formRouter = express.Router();
const nav = [{ link: '/data', title: 'Data' }];
const dataRouter = require('./src/routes/dataRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);

// app.get('/data', (req, res) => {
//   res.render('data');
// });

sql.connect(config).catch(err => console.log(err));
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

formRouter.route('/forms')
  .get((req, res) => {
    res.render(
      'default-forms'
    );
  });
app.use('/data', dataRouter);
app.use('/', formRouter);
app.use('/admin', adminRouter);
app.get('/', (req, res) => {
  res.render(
    'index',
    {
      title: 'Demo'
    }
  );
});

// app.get('/forms', (req, res) => {
//   res.render('default-forms');
// });
app.listen(port, () => {
  console.log(`listening on port + ${chalk.green(port)}`);
});
