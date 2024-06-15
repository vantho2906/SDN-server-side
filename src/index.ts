import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { engine } from 'express-handlebars';
import moment from 'moment';
import errorHandler from './middlewares/errorHandler';
import AppConfig from './config/appConfig';
import connectDB from './config/connectDB';
import router from './routes/index.route';

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname + '/public')));

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);

app.use(cookieParser());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/views'));
app.engine(
  'hbs',
  engine({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
      inc: function (value: any, options: any) {
        return parseInt(value) + 1;
      },
      prettifyDate: function (timestamp: any) {
        return moment(timestamp, 'YYYY-MM-DDTHH:mm:ss.SSS').format(
          'YYYY-MM-DD HH:mm'
        );
      },
      commentDate: function (timestamp: any) {
        console.log(timestamp, moment(timestamp).format('MMM. Do YYYY HH:MM'));
        return moment(timestamp, 'YYYY-MM-DDTHH:mm:ss.SSS').format(
          'MMM. Do YYYY HH:mm'
        );
      },
      ifEquals: function (arg1: any, arg2: any, options: any) {
        return arg1 == arg2 ? options.fn(this) : options.inverse(this);
      },
    },
  })
);

app.use('/', router);
app.use(errorHandler);

app.listen(AppConfig.PORT, async () => {
  console.log(`Server listening on http://localhost:${AppConfig.PORT}`);
  await connectDB();
});