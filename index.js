import express from 'express';
import router from './routes/routes.js';
import connect from './DBConfig/DbConfig.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', router);

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is up and running"
    })
})

connect();

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})