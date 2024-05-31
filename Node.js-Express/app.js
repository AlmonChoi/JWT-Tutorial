const express = require('express');
const logger  = require('morgan');
const cookieParser = require("cookie-parser");
const path = require('path')
const app = express();
const colors = require('colors');
const authRoutes = require('./routes/auth');
const secure = require('./routes/secure');

app.set('port', process.env.PORT || 1111);
app.use(logger('dev'));
app.use(cookieParser());

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.use('/auth', authRoutes);
app.use('/secure', secure);

// The 404 Route (ALWAYS Keep this as the last route)
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'public', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

// Nodejs version check
const nodeVersionMajor = parseInt(process.version.split('.')[0].replace('v', ''));
if(nodeVersionMajor < 7){
    console.log(colors.red(`Please use Node.js version 7.x or above. Current version: ${nodeVersionMajor}`));
    process.exit(2);
}
try{
    app.listen(app.get('port'));
    app.emit('appStarted');
    if(process.env.NODE_ENV !== 'test'){
        console.log(colors.green(`JWT running on host: http://localhost:${app.get('port')}`));
    }
}catch(ex){
    console.error(colors.red(`Error starting JWT app:${ex.message}`));
    process.exit(2);
}
