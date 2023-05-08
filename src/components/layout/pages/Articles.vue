<template>
  <div class="mdui-container">
    <div class="mdui-row">
      <quote></quote>
    </div>
    <div class="mdui-divider" style="margin-top: 10px;margin-bottom: 10px"></div>
    <div class="mdui-row">
      <DayHistory></DayHistory>
    </div>
    <div class="mdui-divider" style="margin-top: 10px;margin-bottom: 10px"></div>
  </div>
</template>

<script>
import Quote from "../article/quote";
import DayHistory from "../article/DayHistory";
export default {
name: "Articles",
  components: {DayHistory, Quote}
}
</script>

<style scoped>

</style>
