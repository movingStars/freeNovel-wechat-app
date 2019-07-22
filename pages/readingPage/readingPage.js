// pages/readingPage/readingPage.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    skin: app.globalData.skin,
    chapterContent: '第1卷 白色消逝，红色毁灭 001 读心/r/n入眼的是白色的墙壁，白色的床和被子，一切都是白色的，白的刺眼，白的可怕，白的冰冷，各种柜子上摆放的只有玻璃做的瓶瓶罐罐，高的，矮的，圆的，扁的，奇型怪状，里面装着各色东西，在灯光照射下晕出淡蓝的光/r/n说不出的诡异。/r/n这里不是医院，只是一座地下实验室，在没人知道的地方，进行着一系列不为人知的特殊实验。/r/n房间里只有一张床，从被子下的隆起可以看的出里面躺着一个人，白色的被子下，惨白的脸，白的无一丝血色，是一张女孩的脸，年纪不大，不超过20岁，非常细致的五官，眼睛紧闭着，看不出大小，只是睫毛很长，映在苍白的皮肤上，如同黑色墨水画上去的一般，纤长而又浓密，只是眉头紧紧皱在一起，微微抿起的嘴，也许是她整张脸上唯一拥有的色彩了，虽然只是很淡的红色，却给她增加了一点人气。/r/n不一会，传来零零散散的脚步声，几个全身白衣的人走了进了，这几个人全身包的都很严实，只留出一双眼睛，就如同他们衣服的颜色一般，冰冷无情，样子像医院里准备做手术的医生一般无二，其中一个人从被子拉出女孩的胳膊，动作十分粗鲁，没有半分温柔，白皙光洁的皮肤暴露在空气中，如玉一般细腻，她的胳膊十分纤细，只是胳膊上满是触目惊心的针孔，的确可以用触目惊心来形容，青青紫紫的，布满整个细白的胳膊，有深有浅，可以看的出，有些已经有些时日了。/r/n这时女孩睁开双眼，只是淡淡看了一眼面前的人，没有责备，没有恨，没有痛，甚至没有任何情绪，只有眼中闪过一丝嘲讽，然后就别过眼去。/r/n一根粗大的针管就这样插进女孩细细的血管，她只是紧皱一下眉头，手指紧紧抓住**的被子，不一会就抽出了一大管黑红的温热血液，完成了工作，这群人就像来时一般的无情，只等到脚步声远去，**的女孩才缓缓睁开眼睛看上天花板，嘴角扯开一抹惨淡的笑，一声几尽无声的呢喃，只有她自己可以听到。。这白色的世界，什么时候才是尽头啊！/r/n此时，她没有泪，也没有笑，没有快乐，也没有痛苦，早已经习惯了，因为她只是一个实验品，不记的在这里几年了，不记的被当成小白鼠那样做着多少次这样的实验，抽血，简直太平常了，太久了，久的她已经没有任何情绪了。只盼望早点死去，好结束这些非人的折磨，只是。。。。。/r/n“小若，小若！”身体被抱起来，耳边也传进很焦急的声音，小若，她的名子，在这里这样叫她的只有他，另一只小白鼠，待她如珍宝一般的雷哥哥/r/n“雷哥哥！”浑身无力的她靠在他身上，看着面带忧色的雷。叫着他的名子，声音极轻，极淡，却温暖异常，这冰冷的地方，只有他是她的温暖，而她是他的温情。/r/n叫雷的男人身形比一般男子高大许多，身上肌肉极为匀称，也极美，利落的短发，俊美的五官，比实下的电影明星毫不逊色，古铜色的皮肤，细长的眼睛，虽然不大，却十分有神，眼中满是精光，薄薄的嘴角紧抿，说不出的倔强。他掀开被子，轻轻的扶起躺在**的少女，她极瘦，长时间的折磨，只剩下了皮包骨头，心口一阵抽疼，他的小若，怎么可以受这么多苦，怎么可以，/r/n他把她背在背上，一双细白的手抓住他的手，手指纤长，手背上青紫色的血管清晰可见。/r/n“雷哥哥，不要管我，好吗？”握住他的手，使劲握着，但是在他的那里，却只感觉是轻抚一般，因为，她实在是没力气了，说话都似乎是在耗尽她的生命一般。/r/n“我不想连累你！”短短一句话，都似乎用尽她全身的力气，他们给她打针，给她吃药，就是让她没有反抗的力气，让她站不起来，坐不起来，根本不能做任何事情，甚至不能自杀。但是她的雷哥哥不同，他们要的是他强于常人的身体，高于常人十倍的力量。而她，他们要的是她的精神，是她读心术，是的，读心术，只要摸到别人的身体，她就可以知道别人在想什么？多么悲哀，就是因为这个，她就被他们抓来，受尽各种非人的折磨。当着一只受尽苦难的小白鼠/r/n所以就在刚刚轻轻的一握，她就知道雷哥哥要带她走的原因，他们等不及了，要对她进行开颅手术，/r/n呵！讽刺的一笑，眼里写满了不屑，打开她的脑子，就能解开她读心的秘密吗？真是做梦，如果找不到，下步是不是就要打开她胸膛损挖出她的心脏呢？不过，那也得等她能活过开颅后，突然有点期待起来，是不是快要结束了。她的生命，年仅18岁的生命啊！/r/n只是，看着眼前的男子，内心中涌起一抹心疼，如果她死了，她的雷哥哥要怎么办，/r/n如果她死了，他会不会孤单？会不会难过？/r/n'.split('/r/n'),
    chapterList: [{
      id: 1,
      name: '第一章 想钱想疯了'
    }, {
      id: 2,
      name: '第一章 想钱想疯了'
    }, {
      id: 3,
      name: '第一章 想钱想疯了'
    }, {
      id: 4,
      name: '第一章 想钱想疯了'
    }],
    currentChapter: {
      id: 2,
      name: "第一章 想钱想疯了"
    },
    skinList: [{
      name: 'dark-skin',
      color: '#1f222c'
    }, {
      name: 'yellow-skin',
      color: '#faf9de'
    }, {
      name: 'brown-skin',
      color: '#fff2f2'
    }, {
      name: 'red-skin',
      color: '#fde6e0'
    }, {
      name: 'green-skin',
      color: '#e3edcd'
    }, {
      name: 'blue-skin',
      color: '#dce2f1'
    }, {
      name: 'purple-skin',
      color: '#e9ebfe'
    }, {
      name: 'gray-skin',
      color: '#eaeaef'
    }, {
      name: 'white-skin',
      color: '#ffffff'
    }],
    settingAnimation: {},
    isSettingBoxShown: false,
    fontSize: 36,
    fontStyle: "",
    brightness: 0,
    chapterListAnimation: {},
    isChapterListShown: false
  },
  onLoad: function (options) {
    this.getDefaultBrightness()
  },
  previousChapter: function () {

  },
  nextChapter: function () {

  },
  changeFontSize: function (e) {
    let fontSize = e.target.dataset.val
    
    if (fontSize > 20 && fontSize < 100) {
      this.setData({
        fontStyle: `font-size: ${fontSize}rpx; line-height: ${fontSize * 2}rpx; text-indent: ${fontSize * 2 + 4}rpx; margin-bottom: ${fontSize}rpx;`,
        fontSize: fontSize
      })
    }
  },
  settingTrigger: function () {
    let animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
      delay: 0
    })

    if (this.data.isSettingBoxShown) {
      animation.bottom(-350).step()
    } else {
      animation.bottom(0).step()
    }
    this.setData({
      settingAnimation: animation.export(),
      isSettingBoxShown: !this.data.isSettingBoxShown
    })
  },
  contentTrigger: function (e) {
    if (this.data.isChapterListShown) {
      this.chapterListTrigger()
      return
    }
    if (this.data.isSettingBoxShown) {
      this.settingTrigger()
    } else {
      const touchY = e.touches[0].clientY,
            windowHeight = wx.getSystemInfoSync().windowHeight,
            allowTop = windowHeight / 5,
            allowBottom = windowHeight / 5 * 3

      if (touchY > allowTop && touchY < allowBottom) {
        this.settingTrigger()
      }
    }
  },
  getDefaultBrightness: function () {
    wx.getScreenBrightness({
      success: (res) => {
        this.setData({
          brightness: res.value * 100
        })
      }
    })
  },
  brightnessChange: function (e) {
    wx.setScreenBrightness({
      value: e.detail.value / 100
    })
  },
  chapterListTrigger: function () {
    let animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
      delay: 0
    })

    if (this.data.isChapterListShown) {
      animation.left(-350).step()
    } else {
      animation.left(0).step()
      this.settingTrigger()
    }
    this.setData({
      chapterListAnimation: animation.export(),
      isChapterListShown: !this.data.isChapterListShown
    })
  }
})