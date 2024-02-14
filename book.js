
import plugin from '../../../lib/plugins/plugin.js'
import fetch from "node-fetch";

let list = []
let k = ""
let name = ""
let msg2 = []
let res = {}
let data1 = {}
let data = ""
let zzss = 0
let url = ""
let response = ""

export class book extends plugin {
  constructor () {
    super({
      name: 'book',
      dsc: '搜书',
      event: 'message',
      priority: 500,
      rule: [
        {
            reg: "^#搜书(.*)$|#下载(.*)|#取消小说搜索$",
            fnc: 'book'
        }
    ]
    });
  }


async book(e) {
    k = ""
    if (e.msg.includes("#取消小说搜索") & zzss == 1) {

        zzss = 0
        e.reply('已取消当前' + name + '搜索')
    }
    if (zzss == 1) {
        e.reply('当前正在搜索中...请勿重复搜索')
        return
    }
    if (e.msg.includes("#搜书") & zzss == 0) {
        zzss = 1
        msg2 = []
        list = []
        k = e.msg.replace(/#搜书/g, "").trim()
        if (k = ""){
            res.reply('请输入书籍')
            return true
        }
        name = k
        e.reply('正在搜索中...请稍后')
        console.log(k)
        try {
            url = 'http://220.167.101.235:5000/list?s=' + k
            response = await fetch(url);
            data = await response.json()
            let res = data.books.map(book => book.replace("list/", ""));
            console.log(data.books[0].videoId)
            res = data.books


            if (res != undefined) {
                data1 = {
                    bookList: res.map((book, index) => `${index + 1}. ${book}`).join('\n')
                }
                console.log(data1)

                e.reply(data1)
                zzss = 0


            }
        } catch (err) {
            e.reply('未能搜索到 ' + name + '，抱歉')
            zzss = 0
            return
        }
    }
    if (e.msg.includes("#下载")) {
        k = e.msg.replace(/#下载/g, "").trim()
        console.log(list[Number(k) - 1])
        let url2 = 'https://Alist.h22.ca/NovelList/' + list[Number(k) - 1]
        e.reply(url2)
    }
    return true;
}

}
