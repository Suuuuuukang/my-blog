<template>
  <div id="app">
    <page-header></page-header>
    <left-bar></left-bar>

    <router-view/>

    <!--    <background-footer></background-footer>-->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import PageHeader from "./components/layout/page/PageHeader";
import LeftBar from "./components/layout/page/LeftBar";
export default {
  name: 'App',
  components: {LeftBar, PageHeader},
  mounted() {
    document.getElementsByTagName('body')[0].className =
      'mdui-drawer-body-left mdui-appbar-with-toolbar mdui-theme-primary-indigo mdui-theme-accent-blue mdui-loaded'
  },
  destroyed() {
    document.body.removeAttribute('class')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
