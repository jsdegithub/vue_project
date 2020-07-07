<template>
  <div class="mui-numbox" data-numbox-min="0">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox">
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../mui/js/mui.min.js';
export default {
    mounted() {
        mui(".mui-numbox").numbox();
    },
    methods: {
      countChanged(){
        this.$emit("getcount", parseInt(this.$refs.numbox.value||0));
      }
    },
    props:["max"],
    watch:{
      'max':function(newVal, oldVal){
        mui(".mui-numbox").numbox().setOption('max', newVal);
      }
    }
};
</script>

<style lang="scss" scoped>
</style>