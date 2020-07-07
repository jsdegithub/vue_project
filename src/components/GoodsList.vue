<template>
  <div class="goods-list">
    <router-link :to="'/home/goodsinfo/'+item.id" tag="div" class="goods-item" v-for="item in goodslist" :key="item.id">
      <img :src="item.img_url" alt />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">${{item.sell_price}}</span>
          <span class="old">${{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link>
    <mt-button type='danger' size='large' @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageindex: 1,
      goodslist: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.$http
        .get("api/getgoods?pageindex=" + this.pageindex)
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = this.goodslist.concat(result.body.message);
          } else {
            Toast("获取商品列表失败！");
          }
        });
    },
    getMore(){
        this.pageindex++;
        this.getGoodsList();
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px;
  .goods-item {
    min-height: 293px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px;
    margin-bottom: 20px;
    background-color: whitesmoke;
    width: 43%;
    box-shadow: 0 0 8px rgb(232, 240, 243);
    border-radius: 5px;
    img {
      width: 100%;
      border-radius: 5px;
    }
    h1 {
      margin-top: 20px;
      margin-bottom: 10px;
      margin-left: 5px;
      font-weight: 300;
      font-size: 13px;
      //   font-family: serif;
    }
    .price {
      padding: 5px;
      // background-color: rgba(128, 128, 128, 0.279);
      .now {
        color: red;
        font-weight: bold;
        font-size: 18px;
      }
      .old {
        margin-left: 5px;
        font-size: 13px;
        text-decoration: line-through;
      }
    }
    .sell {
      display: flex;
      justify-content: space-between;
      padding: 5px;
    }
  }
}
</style>