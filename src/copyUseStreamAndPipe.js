/**
 * Created by AaronCastle on 2020/10/19
 **/

const path = require('path');
const fs = require('fs');
const filepath = path.resolve(__dirname, './sub/b');
// const ws = fs.createWriteStream(filepath,{
//     encoding: 'utf-8',
//     highWaterMark: 16,
//     autoClose: true
// });
const os = require('os')


function write1() {
    const from = path.resolve(__dirname, './sub/a');
    const to = path.resolve(__dirname, './sub/a.txt');
    const rs = fs.createReadStream(from);
    const ws = fs.createWriteStream(to);
    console.time('method1')
    rs.pipe(ws)
    console.timeEnd('method1')
    console.log('copy finished')
    console.log(os.freemem()/2**30)
}

async function write2() {
    const from = path.resolve(__dirname, './sub/a');
    const to = path.resolve(__dirname, './sub/aco2');
    console.time('method1')
    const content = await fs.promises.readFile(from)
    await fs.promises.writeFile(to, content);
    console.timeEnd('method1')
    console.log('over')
}

// console.log(os.freemem()/1024**3)
write1()
// write2()
