const express = require('express')
var path = require('path');
var exphbs = require('express-handlebars');

const app = express()

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({

}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index'))

var port = process.env.PORT || 3000;
app.listen(port, () => console.log('Example app listening on port 3000!'))