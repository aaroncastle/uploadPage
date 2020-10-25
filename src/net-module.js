/**
 * Created by AaronCastle on 2020/10/19
 **/

const net = require('net');
const socket = net.createConnection({
    host: 'duyi.ke.qq.com',
    port: 80
},() => {
    console.log('connection')
})
socket.on('data',chuck => {
    console.log('info from server',chuck.toString())
    socket.end()
})

socket.write(`GET / HTTP/1.1
Host: duyi.ke.qq.com
Connection: keep-alive

`)
