/**
 * Created by AaronCastle on 2020/10/19
 **/
const path  =  require('path')
const fs = require('src/index')
class GetFile {
    constructor(filepath,name,ext,isFile,size,createTime,updateTime){
        this.filepath = filepath;
        this.name = name;
        this.ext = ext;
        this.isFile = isFile;
        this.size = size;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
    static async fileInfo(filepath){
      const name = path.basename(filepath);
      const ext = path.extname(filepath);
      const stats = await fs.promises.stat(filepath);
      const isFile = stats.isFile();
      const createTime = stats.birthtime;
      const updateTime = stats.mtime;
      const size = stats.size;
        return new GetFile(filepath,name,ext,isFile,size,createTime,updateTime)
    }
    async getContent(buffer = false){
        if(this.isFile){
            if(buffer){
                return await fs.promises.readFile(this.filepath);
            }else {
                return await fs.promises.readFile(this.filepath,'utf-8');
            }
        }
        return null;
    }
}
async function test(){
    const filePth = path.resolve('./solo/a.txt')
    const file = await GetFile.fileInfo(filePth);
    console.log(file)
    console.log(await file.getContent())
    await fs.promises.rmdir('./solo/coup')
}
test()
