const express = require('express');
const createError = require('http-errors');
const path = require('path');
const api = require('./api');
const indexRouter = require('./routes');
const { connectDb } = require('./model');

connectDb();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

app.use('/', indexRouter);
app.use('/api', api.character);
app.use('/api', api.characterShip);
app.use('/api', api.characterShipLink);
app.use('/api', api.camp);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log('error', err);
  // render the error page
  res.status(err.status || 500);
  res.render('err');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
