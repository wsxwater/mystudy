<template>
  <div class="cartctrl">
    <transition name="fade">
      <div class="cart-decrease icon-remove_circle_outline"
      v-show="food.count>0"
      @click="decreaseCart"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>
<!--  type="text/ecmascript-6" -->
<script>
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return; // 防止多次被点击
        }
        if (!this.food.count) {
          // this.food.count = 1;// 这种方法不能让props监测到
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return; // 防止多次被点击
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  .cartctrl
    font-size 0
    .cart-decrease,.cart-add
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0,160,220)
    .cart-decrease
      opacity 1
      transform translate3d(0,0,0)
      transform rotate(0)
      &.fade-enter-active, &.fade-leave-active
        transition: all .4s linear
      &.fade-enter, &.fade-leave-active
        opacity: 0
        transform translate3d(25px,0,0)
        transform rotate(180deg)
    .cart-count
      display inline-block
      width 12px
      padding-top 6px
      color rgb(147,153,159)
      line-height 24px
      font-size 10px
      vertical-align top
      text-align center
</style>
