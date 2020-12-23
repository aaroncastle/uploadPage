/**
 * Created by AaronCastle on 2020/10/19
 **/

const express = require('express')
const app = express();
const path = require('path');
app.use(express.static(path.resolve(__dirname,'../client')))
app.use('/api/upload',require('./upload'))
app.listen(80);
