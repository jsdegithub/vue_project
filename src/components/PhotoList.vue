<template>
  <div>
    <div
      class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
    >
      <div class="mui-scroll">
        <a
          :class="['mui-control-item', item.id===0?'mui-active':'']"
          v-for="item in cates"
          :key="item.id"
          @click="getPhotoListByCateId(item.id)"
        >{{item.title}}</a>
      </div>
    </div>

    <ul class="photo-list">
      <router-link :to="'/home/photoinfo/'+item.id" tag='li' v-for="item in list" :key="item.id">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "../mui/js/mui.min.js";
export default {
  data() {
    return {
      cates: [],
      list: []
    };
  },
  created() {
    this.getAllCategory();
    this.getPhotoListByCateId(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005,
      scrollX: true
      // bounce:true
    });
  },
  methods: {
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        }
      });
    },
    getPhotoListByCateId(cateId) {
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-x pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    position: relative;
    background-color: rgb(225, 223, 223);
    text-align: center;
    margin-bottom: 10px;
    img{
      width: 100%;
      vertical-align: middle;
      box-shadow: 0 0 6px #999;
      border-radius: 5px;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info{
      position: absolute;
      bottom: 0;
      text-align: left;
      background-color: rgba(0, 0, 0, 0.4);
      color: white;
      max-height: 80px;
      .info-title{
        font-size: 12px;
      }
      .info-body{
        font-size: 10px;
      }
    }
  }
}
</style>