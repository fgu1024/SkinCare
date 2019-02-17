var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

var port = process.env.PORT || 3000;
var app = express();

app.locals.moment = require('moment');

var indexRoute = require('./routes/indexRoute');
var usersRoute = require('./routes/usersRoute');
var catelogRoute = require('./routes/catalogRoute');

//Connect DB
mongoose.connect('mongodb://localhost/Product', function (err, db) {
    if (err){
        console.log(err);
    } else{
        console.log('DB Connected!');
        // db.close();
    }
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

//Set page dir
app.set('views',  './views/pages');
app.set('view engine', 'pug');

//表单数据格式化
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//加了之后网页无响应，进不了app.get('/') - why??
// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'application/json ')
// });


//set for file uploading module: express-fileupload
app.use(fileUpload());

//获取静态文件的目录，即head中css和js的路径，__dirname是当前文件目录
app.use(express.static(path.join(__dirname, 'public')));

//set for routes
app.use('/', indexRoute);
app.use('/admin', usersRoute);
app.use('/product', catelogRoute);

app.listen(port);

console.log('website started on port ' +  port);
