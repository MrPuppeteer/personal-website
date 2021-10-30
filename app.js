const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//static assets
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/public/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/public/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));


app.get('/', (req, res) => {
	res.render('index')
});

app.listen(8080, () => {
	console.log('Serving on port 8080')
});