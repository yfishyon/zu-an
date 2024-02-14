import { segment } from "oicq";
import fetch from "node-fetch";

const _path = process.cwd();

export class books extends plugin {
  constructor () {
    super({
      name: 'books',
      dsc: '搜书',
      event: 'message',
      priority: 500,
      rule: [
        {
          reg: '^#下载[1-9][0-9]|#下载[0-9]*$',
          fnc: 'downloadbook'
        },
        {
          reg: '^#搜书*$',
          fnc: 'books'
        },
      ]
    });
  }

  async books(e) {
    const input = e.msg.replace(/#|＃|搜书| /g, "").trim();
    if (!input) return e.reply("请输入#搜书 关键词", true);

    let res = await fetch("http://220.167.101.235:5000/list?s=" + input).catch((err) => logger.error(err));
    if (!res) return e.reply('书籍搜索接口请求失败');

    const bookData = await res.json();
    if (!bookData.books || bookData.books.length === 0) {
        return e.reply('未找到相关书籍');
    }

    let booklist = bookData.books.map(book => book.replace("list/", ""));
    
    for (let i = 0; i < booklist.length; i++) {
        e.reply(`${i + 1}. ${booklist[i]}`);
    }
    
    return true;
  }

  async downloadbook(e) {
    const input = e.msg.replace("#下载", "").trim();
    if (!input) return e.reply("请输入#下载第n本，例:#下载1", true);
    const index = parseInt(input) - 1;

    if (isNaN(index) || index < 0 || index >= booklist.length) {
      return e.reply('指定的书本不存在');
    }

    const fileName = booklist[index];
    const url = `https://Alist.h22.ca/NovelList/${fileName}`;
    e.reply(url);

    return true;
  }
      }
