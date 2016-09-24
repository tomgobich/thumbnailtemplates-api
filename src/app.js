import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// debug 
// error

// for security
app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.send(`hello world!`);
});

let server = app.listen(process.env.PORT || '3000', () => {
    console.log('server running http://localhost:3000');
});
