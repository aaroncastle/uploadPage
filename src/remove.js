/**
 * Created by AaronCastle on 2020/10/21
 **/
const fs = require('fs');
const path = require('path');
fs.unlink(path.resolve(__dirname,'./sub/aco'),() => {
    console.log('remove file success')
});
