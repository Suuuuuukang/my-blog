<template>
  <div class="mdui-drawer mdui-drawer-open" id="main-drawer">
    <div class="mdui-list">
<!--  此处先把class去掉，然后只留两个网页，一个触发更新，一个不触发    -->
<!--  mdui-collapse-item-open-->
      <div class="mdui-collapse-item mdui-collapse-item-open" id="platformList">
        <div class="mdui-collapse-item-header mdui-list-item mdui-ripple"
             @click="changeListItemStatus('platformList')"
        >
          <i class="
              mdui-list-item-icon
              mdui-icon
              material-icons
              mdui-text-color-blue">near_me</i>
          <div class="mdui-list-item-content" style="font-weight: bold">公共内容</div>
          <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
        </div>
        <div class="mdui-collapse-item-body mdui-list">
          <router-link to="/hotNews"
                       class="mdui-list-item"
                       :class="this.$route.meta.title === '时事热点' ? 'mdui-list-item-active' : ''">
            <i class="mdui-list-item-icon mdui-icon material-icons">
              &#xe855;
            </i>
            <div class="mdui-list-item-content">
              时事热点
            </div>
          </router-link>

          <router-link to="/articles"
                       class="mdui-list-item"
                       :class="this.$route.meta.title === '文说世界' ? 'mdui-list-item-active' : ''">
            <i class="mdui-list-item-icon mdui-icon material-icons">
              &#xe539;
            </i>
            <div class="mdui-list-item-content">
              文说世界
            </div>
          </router-link>

          <router-link to="/regionNews"
                       class="mdui-list-item"
                       :class="this.$route.meta.title === '地区新闻' ? 'mdui-list-item-active' : ''">
            <i class="mdui-list-item-icon mdui-icon material-icons">
              &#xe0b7;
            </i>
            <div class="mdui-list-item-content">
              地区新闻
            </div>
          </router-link>

          <router-link to="/cosPictures"
                       class="mdui-list-item"
                       :class="this.$route.meta.title === 'Cos套图' ? 'mdui-list-item-active' : ''">
            <i class="mdui-list-item-icon mdui-icon material-icons">
              &#xe3b0;
            </i>
            <div class="mdui-list-item-content">
              Cos套图
            </div>
          </router-link>
        </div>
      </div>

      <li class="mdui-list-item"
          @click="closeMenu"
      >
        <i class="mdui-list-item-icon mdui-icon material-icons">
          chevron_left
        </i>
        <div class="mdui-list-item-content">
          收起菜单
        </div>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftBar",
  data () {
    return {

    }
  },
  methods: {
    /**
     * 收起菜单按键的点击事件
     * @return null 无返回值
     */
    closeMenu: function () {
      let obj = document.getElementById("main-drawer")
      let cls = obj.getAttribute('class')
      let classes = cls.split(' ')
      let newClasses = []
      for (let i = 0; i < classes.length; i++) {
        if (classes[i] === 'mdui-drawer-open') {
          newClasses.push('mdui-drawer-close')
        } else {
          newClasses.push(classes[i])
        }
      }
      obj.setAttribute('class', newClasses.join(' '))
      // body
      cls = document.body.getAttribute('class');
      classes = cls.split(' ')
      newClasses = []
      for (let i = 0; i < classes.length; i++) {
        if (classes[i] !== 'mdui-drawer-body-left') {
          newClasses.push(classes[i])
        }
      }
      document.body.setAttribute('class', newClasses.join(' '))
    },
    /**
     * 修改listItem的开关状态
     */
    changeListItemStatus (id) {
      let obj = document.getElementById(id)
      let cls = obj.getAttribute("class")
      let list = cls.split(' ')
      if (list[list.length - 1] === "mdui-collapse-item-open") {
        list = list.slice(0, list.length - 1);
        cls = list.join(' ')
      } else {
        list.push("mdui-collapse-item-open")
        cls = list.join(' ')
      }
      obj.setAttribute("class", cls)
    }
  }
}
</script>

<style scoped>
.mdui-drawer {
  top: 64px;
  transition: all .3s cubic-bezier(0,0,.2,1);
  border-right: 1px solid gainsboro;
}

.mdui-list-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  min-height: 48px;
  padding: 0 16px;
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: background-color .3s cubic-bezier(.4,0,.2,1);
  transition: background-color .3s cubic-bezier(.4,0,.2,1);
}
.mdui-list-item-content {
  /*margin-left: 32px;*/
  text-align: left;
}
</style>
