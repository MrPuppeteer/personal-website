const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const axios = require('axios');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.engine('ejs', ejsMate);

//static assets
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/public/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/public/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/public/css', express.static(path.join(__dirname, '/node_modules/bootstrap-icons/font')));


app.get('/', (req, res) => {
	res.render('index');
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/contact', (req, res) => {
	res.render('contact');
});

app.get('/blog', async (req, res) => {
	try {
	const { data } = await axios.get('https://dev.to/api/articles?username=bagasn');
	res.render('blog', {data});
	} catch (e) {
	console.error(e);
	res.redirect('/');
	}
});

app.all('*', (req, res) => {
	res.send("404");
});

app.listen(8080, () => {
	console.log('Serving on port 8080')
});