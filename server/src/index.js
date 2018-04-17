import express from 'express';
import path from 'path';
import router from './router';
const app = express();

app.use(express.static(path.resolve(__dirname, '../../assets')));

app.use('/api', router);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../assets/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening on port ${port}!`));