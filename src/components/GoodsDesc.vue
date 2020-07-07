<template>
    <div class="goodsdesc-container">
        <h3>{{info.title}}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info:{}
        }
    },
    created() {
        this.getGoodsDesc();
    },
    methods: {
        getGoodsDesc(){
            this.$http.get("api/goods/getdesc/"+this.$route.params.id).then(result=>{
                if(result.body.status===0){
                    this.info=result.body.message[0];
                }
            })
        }
    },
}
</script>

<style lang="scss">
    .goodsdesc-container{
        background-color: whitesmoke;
        overflow: hidden;
        h3{
            font-size: 18px;
            font-family: serif;
            text-align: center;
            margin: 20px 0;
        }
        .content{
            margin: 20px;
            img{
                width: 100%;
            }
        }
    }
</style>