import express from 'express';
import router from './routes/routes.js';
import connect from './DBConfig/DbConfig.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', router);

connect();

app.listen(port, () => {
    console.log("Server started")
})