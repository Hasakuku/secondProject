var createError = require('http-errors');
var express = require('express');
var path = require('path');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");


dotenv.config();

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MongoDB connect Success!");
}).catch((err) => console.log(err));

var app = express();
app.use(
  cors({
    origin: "*", // 출처 허용 옵션
    credentials: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
}));
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.static("views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 스웨거
const { swaggerUi, specs } = require('./modules/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api', indexRouter);

// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, console.log('Server is start'))