<template>
  <div class="shopcar-container">

    <div class="goods-list">

      <div class="mui-card" v-for="(item, index) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div
            class="mui-card-content-inner"
          >
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">${{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <a href="#" @click="remove(item.id, index)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner total_area">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品<span class="red">&nbsp;{{$store.getters.getAllSelected}}&nbsp;</span>件，
            合计：<span class="red">${{$store.getters.getTotalPrice}}</span></p>
          </div>
          <mt-button type="danger">结算</mt-button>
        </div>
      </div>

      <p>{{$store.getters.getGoodsSelected}}</p>
    </div>

  </div>
</template>

<script>
import numbox from './shopcar_numbox.vue';
export default {
  data() {
    return {
      goodslist:[],
    }
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList(){
      let idArr=[];
      this.$store.state.car.forEach(item=>{
        idArr.push(item.id);
      });
      if(idArr.length<=0){return;}
      this.$http.get("api/goods/getshopcarlist/"+idArr.join(',')).then(result=>{
        if(result.body.status===0){
          this.goodslist=result.body.message;
        }
      })
    },
    remove(id, index){
      this.goodslist.splice(index, 1);
      this.$store.commit('removeFromCar', id);
    },
    selectedChanged(id, selected){
      this.$store.commit('updateSelected', {'id':id, 'selected':selected});
    }
  },
  components:{
    numbox
  }
};
</script>

<style lang="scss" scoped>
  .shopcar-container{
    background-color: whitesmoke;
    overflow: hidden;
    .goods-list{
      img{
        width: 60px;
        height: 60px;
      }
      h1{
        font-size: 13px;
      }
      .info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p{
          margin-bottom: 0;
        }
        .price{
          color: red;
          font-weight: bold;
        }
      }
      .mui-card-content-inner{
        display: flex;
        align-items: center;
      }
    }
    .total_area{
      display: flex;
      justify-content: space-around;
      align-items: center;
      .red{
        color: red;
        font-weight: bold;
        font-size: 15px;
      }
    }
  }
</style>