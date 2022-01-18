var express = require('express');

var app = express();
var routes = require('./routes/index.js')(app);
app.listen(3003, () => {
    console.log("server is listening on port 3003");
});
