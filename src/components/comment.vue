<template>
  <div class="cmt-container">
    <h3>----------------发表评论----------------</h3>
    <hr>
    <textarea placeholder="输入评论内容" maxlength="120" v-model="msg"></textarea>
    <mt-button type='primary' size='large' @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, index) in comments" :key=item.add_time>
        <div class="cmt-title">
          第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;
          发表时间：{{item.add_time | dateFormat}}
        </div>
        <div class="cmt-body">
          {{item.content==='undefined'?'此用户很懒，什么都没评论。':item.content}}
        </div>
      </div>

    </div>

    <mt-button type='danger' size='large' plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
      data() {
        return {
          pageIndex:1,
          comments:[],
          msg:''
        }
      },
      created() {
        this.getComments();
      },
      methods: {
        getComments(){
          this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(result => {
            if(result.body.status===0){
              this.comments=this.comments.concat(result.body.message);
            }else{
              Toast('获取评论失败！');
            }
          })
        },
        getMore(){
          this.pageIndex++;
          this.getComments();
        },
        postComment(){
          if(this.msg.trim().length===0){
            return Toast('评论内容不能为空！');
          }
          this.$http.post('api/postcomment/'+this.id,{content:this.msg.trim()}).then(result => {
            if(result.body.status===0){
              let cmt={
                user_name:'匿名用户',
                add_time:Date.now(),
                content:this.msg.trim()
              };
              this.comments.unshift(cmt);
              this.msg='';
            }
          });
        }
      },
      props:['id']
    };
</script>

<style lang="scss" scoped>
  .cmt-container{
    margin-top: 25px;
    h3{
      font-size: 18px;
      text-align: center;
    }
    textarea{
      font-size: 14px;
      height: 85px;
      margin: 0;
    }
    .cmt-list{
      margin: 10px 0;
      .cmt-item{
        .cmt-title{
          background-color: rgba(199, 205, 235, 0.238);
          font-size: 12px;
          border-radius: 5px;
          line-height: 30px;
        }
        .cmt-body{
          background-color: white;
          font-size: 14px;
          border-radius: 5px;
          line-height: 30px;
          text-indent: 2em;
        }
      }
    }
  }
</style>