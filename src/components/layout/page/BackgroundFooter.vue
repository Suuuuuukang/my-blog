<template>
  <div class="bg-ctn"
       v-bind:style="{
          width: fullWidth + 'px',
          height: this.ctnHeight,
          top: fullHeight / 10 * 9 + 'px'
         }">
    <div class="img-box" v-show="this.showBottom">
      <p>
        这是一个Logo页面，轻按左下角按钮关闭
      </p>
    </div>
    <el-button
      @click="changeStatus"
      class="button"
      :style="{
          width: fullWidth * 0.05 + 'px',
          height: fullWidth * 0.01 + 'px',
          bottom: '0px',
          right: '0px'
         }"
    >
      <div
        class="button-msg"
      >
        {{this.buttonMsg}}
      </div>
    </el-button>
  </div>
</template>

<script>
export default {
  name: "BackgroundFooter",
  data () {
    return {
      //保存数据，实现动态渲染
      //注意：这里没有带‘px’单位，在上面添加动态样式时，需要加上px单位
      fullWidth: document.documentElement.clientWidth,
      fullHeight: document.documentElement.clientHeight,
      buttonMsg: '折叠',
      showBottom: true,
      defaultCtnHeight: this.fullHeight / 10 + 'px',
      defaultButtonHeight: this.fullWidth * 0.01 + 'px',
      ctnHeight: this.fullHeight / 10 + 'px'
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    /**
     * 定义数据获取方法
     * @return null 无返回值
     */
    handleResize () {
      this.fullWidth = document.documentElement.clientWidth
      this.fullHeight = document.documentElement.clientHeight
    },
    /**
     * 点击按钮修改状态
     * @return null 无返回值
     */
    changeStatus : function () {
      if (this.showBottom) {
        this.buttonMsg = '展开'
        this.ctnHeight = this.defaultButtonHeight
      } else {
        this.buttonMsg = '折叠'
        this.ctnHeight = this.defaultCtnHeight
      }
      this.showBottom = !this.showBottom
    }
  }
}
</script>

<style scoped>
.bg-ctn {
  position: fixed;
  display: block;
  /*z-index: -1;*/
}

.img-box {
  width: 100%;
  height: 100%;

  background-image: url('../../../../static/pictures/background.png');
  /*background: gold;*/
  position: fixed;
  background-size: cover;
  background-repeat:  no-repeat;
}

.button {
  display: flex;
  justify-content: center;
  justify-self: center;
  position: fixed;
  background: gold;
  /*z-index: 1;*/
}

.button-msg {
  /*position: fixed;*/
  justify-self: center;
  text-align: center;
  justify-content: center;
  /*bottom: 1%;*/
}
</style>
