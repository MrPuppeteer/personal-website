const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const axios = require('axios');
const ExpressError = require('./utils/ExpressError');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.engine('ejs', ejsMate);

//static assets
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(
	'/public/css',
	express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css'))
);
app.use(
	'/public/js',
	express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js'))
);
app.use(
	'/public/css',
	express.static(path.join(__dirname, '/node_modules/bootstrap-icons/font'))
);

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/contact', (req, res) => {
	res.render('contact');
});

app.get('/blog', async (req, res, next) => {
	try {
		const { data } = await axios.get(
			'https://dev.to/api/articles?username=bagasn'
		);
		res.render('blog', { data });
	} catch (e) {
		// console.error(e);
		next(new ExpressError('Internal Server Error', 500));
	}
});

app.all('*', (req, res, next) => {
	next(new ExpressError('Page not Found', 404));
});

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = 'Something went wrong';
	res.status(statusCode).render('error', { err });
});

app.listen(process.env.PORT || 8080, () => {
	console.log('Serving on port 8080');
});
