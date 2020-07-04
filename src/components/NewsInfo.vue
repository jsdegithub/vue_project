<template>
  <div class="infoContainer">
    <h3 class="title">{{newsinfo.title}}</h3>
    <p class="stampContainer">
      <span>发表时间：{{newsinfo.add_time | dateFormat}}</span>
      <span>阅读量：{{newsinfo.click}}</span>
    </p>
    <hr />
    <div class="content" v-html="newsinfo.content"></div>
    <comment-box :id='this.id'></comment-box>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from './comment.vue';
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.newsinfo = result.body.message[0];
        } else {
          Toast("获取新闻失败！");
        }
      });
    }
  },
  components:{
    'comment-box':comment
  }
};
</script>

<style lang="scss">
.infoContainer {
  padding: 15px 25px;
  .title {
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 15px;
  }
  .stampContainer {
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>