const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const fs = require('fs')
const crypto = require('crypto');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({
	type: ['application/json', 'application/csp-report', 'application/reports+json']
}))
app.use(express.static(path.join(__dirname)));
app.use((req, res, next) => {
	res.setHeader('Cache-Control', 'no-store');
	next();
});


app.set('view engine', 'ejs');
let nonce = crypto.randomBytes(16).toString('base64');


// Example: Whitelist based CSPs
//-------------------------------
// app.use((req, res, next) => {
// 	res.setHeader(
// 		'Content-Security-Policy',
// 		" \
// 		 script-src 'self' https://ajax.googleapis.com/ ; \
// 		 base-uri 'none'; \
// 		 object-src 'none'; \
// 		"
// 	)
// 	next();
// });


// Example: Nonce based CSPs 
//---------------------------
// app.use((req, res, next) => {
// 	res.setHeader(
// 		'Content-Security-Policy',
// 		`script-src 'nonce-${nonce}'; base-uri 'none'; object-src 'none';`
// 	)
// 	next();
// });


//Example: Nonce + Hashes Dynamics based CSPs
//--------------------------------------------
//app.use((req, res, next) => {
//	res.setHeader(
// 		'Content-Security-Policy',
// 		`script-src 'nonce-${nonce}' 'unsafe-hashes' 'sha256-zEpJladX5m+s8O6RXyBKKbGEEqf1yi6z2U24vZYNVqE='; base-uri 'none'; object-src 'none';`
// 	)
//	next();
//});


//Example: Nonce + Strict Dynamics based CSPs
//--------------------------------------------
//app.use((req, res, next) => {
//	res.setHeader(
// 		'Content-Security-Policy',
// 		`script-src 'nonce-${nonce}' 'strict-dynamic'; base-uri 'none'; object-src 'none';`
// 	)
//	next();
//});


// Example: Two CSP Policies 
//--------------------------
// app.use((req, res, next) => {
// 	res.setHeader(
// 		'Content-Security-Policy',
// 		[
// 			`script-src https:; base-uri 'none'; object-src 'none';`,
// 			`script-src 'self'`
// 		]
// 	)
// 	next();
// });


// Example: Two CSP Directives semi colon separated
//--------------------------------------------------
// app.use((req, res, next) => {
// 	res.setHeader(
// 		'Content-Security-Policy',
// 		`script-src https:; script-src 'self'; base-uri 'none'; object-src 'none';`
// 	)
// 	next();
// });


// Example: Comma separated 
//--------------------------
// app.use((req, res, next) => {
// 	res.setHeader(
// 		'Content-Security-Policy',
// 		`script-src 'self', script-src https:; base-uri 'none'; object-src 'none';`
// 	)
// 	next();
// });


// Example: Nonce based CSPs enforcement with report-uri
//-------------------------------------------------------
// app.use((req, res, next) => {
// 	res.setHeader(
// 		'Content-Security-Policy',
// 		`script-src 'nonce-${nonce}'; base-uri 'none'; report-uri /__csp_report; object-src 'none'`
// 	)
// 	next();
// });


// Example: Nonce based CSPs enforcement with report-sample and report-uri
//-------------------------------------------------------------------------
// app.use((req, res, next) => {
// 	res.setHeader(
// 		'Content-Security-Policy',
// 		`script-src 'nonce-${nonce}' 'report-sample'; base-uri 'none'; report-uri /__csp_report; object-src 'none'`
// 	)
// 	next();
// });

app.get('/', (req, res) => {
    const name = decodeURIComponent(req.query.name);
    console.log(name)
	res.render('index.ejs', {nonce: nonce, name: name});
});


app.post('/__csp_report', (req, res) => {
	console.log(req.body);
})

const server = app.listen(process.env.PORT || 9000, () => {
	const {port} = server.address();
	console.log(`The server is running on port: ${port} :)`);
});
