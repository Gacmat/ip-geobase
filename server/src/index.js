import dotenv from 'dotenv';
dotenv.config({path: '.env'});

import express from 'express';
import { join } from 'path';
import Geolocations from './routes/geolocations';
import auth from './routes/auth';
import config from './config/config';
import passport from './config/passport';
import { notFound, catchErrors, invalidRequestData } from './middlewares/errors';
import bodyParser from 'body-parser';
import cors from 'cors';


// Connect to database
import dbConfig from './config/database';
import mongoose from 'mongoose';

// Configure passport
passport();

mongoose.connect(dbConfig.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

const app = express();

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes config
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/geolocations', Geolocations());
app.use('/api/auth', auth());

// errors handling
app.use(notFound);
app.use(catchErrors);

// let's play!
app.listen(config.server.port, () => {
    console.log(`Server is up!\n`);
});