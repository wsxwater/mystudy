<template>
  <div class="container">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <!-- <div class="header">I am header</div> -->
    <v-header :wsx_seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="tab-content">
      <router-view></router-view>
    </div>

  </div>
</template>
<!--  -->
<script type="text/ecmascript-6">
// export default {
//   name: 'App'
// }
  import header from './components/header/header.vue';
  const ERR_OK = 0;
  export default {
    data () {
      return {
        seller: {}
      };
    },
    created () {
      this.$http.get('/api/seller').then((response) => {
        // console.log(response.body);
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = JSON.parse(JSON.stringify(response.data));
          console.log(this.seller);
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import './common/stylus/mixin.styl';

  .container
    .tab
      display: flex
      width: 100%
      line-height: 40px
      height: 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex: 1
        text-align:center
        & > a
          text-decoration: none
          display: block
          font-size: 14px
          color: rgb(77, 85 ,93)
          &.active
            color rgb(240 ,20 ,20)
</style>
