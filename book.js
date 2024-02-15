import fetch from "node-fetch";

let list = [];
let k = "";
let name = "";
let books = []
let zzss = 0;
let url = "";
let response = "";

export class book extends plugin {
  constructor () {
    super({
      name: 'book',
      dsc: '搜书',
      event: 'message',
      priority: 500,
      rule: [
        {
            reg: /^#搜书(.*)$|^#下载(.*)$|^#取消小说搜索$/,
            fnc: 'book'
        }
      ]
    });
  }
  
  async book(e) {
    k = "";
    if (e.msg.includes("#取消小说搜索") && zzss == 1) {

        zzss = 0;
        e.reply('已取消当前' + name + '搜索');
    }
    if (zzss == 1) {
        e.reply('当前正在搜索中...请勿重复搜索');
        return;
    }
    if (e.msg == '#搜书') {
        e.reply('请输入#搜书+书名');
        return;
    }
    if (e.msg.includes("#搜书") && zzss == 0) {
        zzss = 1;
        list = [];
        k = e.msg.replace(/#搜书/g, "").trim();
        name = k;
        e.reply('正在搜索中...请稍后');
        console.log(k);
        try {
            url = 'http://220.167.101.235:5000/list?s=' + k;
            console.log(url);
            response = await fetch(url);
            res = response.json()
            console.log(res.books[0])
            books = res.books
            let booklist = '';
            for (let i = 0; i < books.length; i++) {
                let book = books[i];
                book = book.replace("list/", "");
                booklist += `${i + 1}.${book}\n`;
            }

            console.log(booklist);
            if (booklist != undefined) {
                e.reply(booklist);
                zzss = 0;
            }
        } catch (err) {
            e.reply('未能搜索到 ' + name + '，抱歉');
            zzss = 0;
            return;
        }
    }
    if (e.msg.includes("#下载")) {
        k = e.msg.replace(/#下载/g, "").trim();
        console.log(list[Number(k) - 1]);
        let url2 = 'https://Alist.h22.ca/NovelList/' + list[Number(k) - 1];
        e.reply(url2);
    }
    return true;
  }
}
