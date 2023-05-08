<template>
  <div class="mdui-appbar">
    <header class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-indigo-800">
        <button @click="changeMenu"
                class="mdui-btn mdui-btn-icon"
                mdui-tooltip="{content:'菜单'}">
          <i class="mdui-icon material-icons">menu</i>
        </button>
        <router-link to="/"
           class="mdui-typo-headline mdui-hidden-xs">
          SukangLee的温馨小站
<!--          <span style="font-size: 26px;"></span>-->
        </router-link>
        <router-link to="/"
           class="mdui-typo-title mdui-hidden-xs">
          {{ this.$route.meta.title }}
        </router-link>

        <div class="mdui-toolbar-spacer"></div>

<!--        <div class="mdui-toolbar-spacer"></div>-->
        <span class="mdui-btn mdui-btn-icon"
              @click="changeTheme"
              mdui-tooltip="{content:'rtx on/off'}">
          <i class="mdui-icon material-icons">
            brightness_4
          </i>
        </span>
      </div>
    </header>

  </div>
</template>

<script>
import http from "../../../api/http";

export default {
  name: "PageHeader",
  data () {
    return {
      isDark: false,
      baseUrl: http.baseUrl,
      netconfUrl: http.netconfUrl
    }
  },
  methods: {
    /**
     * 更换主题的事件函数
     * @return null 无返回值
     */
    changeTheme: function () {
      if (!this.isDark) {
        this.isDark = true
        let cls = document.body.getAttribute('class');
        let list = cls.split(' ')
        list.push('mdui-theme-layout-dark')
        document.getElementsByTagName('body')[0].className = list.join(' ')
      } else {
        this.isDark = false
        let cls = document.body.getAttribute('class');
        let list = cls.split(' ')
        let newClasses = []
        for (let i = 0; i <list.length; i++) {
          if (list[i] !== 'mdui-theme-layout-dark') {
            newClasses.push(list[i])
          }
        }
        document.getElementsByTagName('body')[0].className = newClasses.join(' ')
      }
    },
    /**
     * 点击菜单按键的事件函数
     * @return null 无返回值
     */
    changeMenu: function () {
      let obj = document.getElementById("main-drawer")
      let cls = obj.getAttribute('class')
      let classes = cls.split(' ')
      let newClasses = []
      // 将要进行的操作，true表示需要打开，false表示将要关闭
      let toOpen = null
      for (let i = 0; i < classes.length; i++) {
        if (classes[i] === 'mdui-drawer-open') {
          newClasses.push('mdui-drawer-close')
          toOpen = false
        } else if (classes[i] === 'mdui-drawer-close') {
          newClasses.push('mdui-drawer-open')
          toOpen = true
        } else {
          newClasses.push(classes[i])
        }
      }
      obj.setAttribute('class', newClasses.join(' '))
      // body
      cls = document.body.getAttribute('class');
      classes = cls.split(' ')
      newClasses = []
      if (!toOpen) {
        for (let i = 0; i < classes.length; i++) {
          if (classes[i] !== 'mdui-drawer-body-left') {
            newClasses.push(classes[i])
          }
        }
      } else {
        classes.push('mdui-drawer-body-left')
        newClasses = classes
      }

      document.body.setAttribute('class', newClasses.join(' '))
    }
  }
}
</script>

<style scoped>

</style>
