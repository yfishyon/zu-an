import fetch from "node-fetch";

let list = [];
let k = "";
let name = "";
let books1 = [];
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
            //response = await fetch(url);
            let response = '{"books":["人刚到原神，就已双目失明 作者：时雨雨时.txt","人在原神，开局拯救五夜叉 作者：(´∇ﾉ｀_)ノ服了.txt","原神中的黑暗之神 作者：狂魔mhqs.txt","原神降临：开局狂囤千万原石 作者：来自何方.txt","原神，恭喜八重宫司大人，是喜脉 作者：一念成神精病.txt","原神：人在提瓦特，垂钓成神 作者：大就是美.txt","原神：从摸鱼开始 作者：赔钱货.txt","原神：在蒙德开网吧，七神玩疯了.txt","原神：地狱开局的我连夜叛逃至冬.txt","原神：建宗蜀山，提瓦特聚众修仙1-151.txt","原神：开局忽悠纳西妲直播玩原神 作者：我有七个肝.txt","原神：开局纯度直接拉满 作者：猫了个大咪.txt","原神：我卖个教材，你七神都来？ 作者：辜蓦.txt","原神：我在蒙德召唤禁忌之物1-332 作者：.txt","原神：我，荒泷派顾问、开局捞人1-329 作者：.txt","原神：提瓦特升维计划 作者：黄某不知道哦.txt","原神：曝光聊天群，全员社死126-210.txt","原神：来自璃月的外来者 作者：大熊猫爱看书.txt","原神：直播问答，我普及黑历史！1-208.txt","原神：神代模拟，女儿竟是纳西妲1-243.txt","原神：邀请纳西妲，MC造净善宫（1~1042） 作者：地下道大主管(1).txt","原神：钟离是我爹，天理得敬烟 作者：木子岢佳.txt","原神：雷神别拔刀了，营养跟不上 作者：蓬莱山辉夜姬(完本).txt","我在原神开后宫 作者：冷冷滴枫 .txt"]}'
            res = response.json()
            let b1 = ''
            b1 = res.books[0]
            console.log(b1)
            books1 = res.books
            let booklist = '';
            for (var i = 0; i<books1.length; i++) {
                let book1 = '';
                var book = books1[i];
                books1 = book.replace("list/", "");
                booklist += `${i + 1}.${book1}\n`;
            }
            console.log(booklist);
            if (booklist != undefined) {
                e.reply(booklist);
                zzss = 0;
            }
            } catch (err) {
          e.reply('未能搜索到 ' + name + '，抱歉');
          e.reply(booklist)
          e.reply(b1)
          zzss = 0;
          return;
        }
    }
    if (e.msg.includes("#下载")) {
        k = e.msg.replace(/#下载/g, "").trim();
        console.log(booklist[Number(k) - 1]);
        let url2 = 'https://Alist.h22.ca/NovelList/' + booklist[Number(k) - 1];
        e.reply(url2);
    }
    return true;
  }
}
