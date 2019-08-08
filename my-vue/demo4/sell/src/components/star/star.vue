<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,i) in itemClasses" :key="i" :class="itemClass" class="star-item"></span>
  </div>
</template>
<!--  type="text/ecmascript-6" -->
<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + parseInt(this.size);
      },
      itemClasses () {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0; // 是否带半星
        let Integer = Math.floor(score); // 有多少全星

        for (let i = 0; i < Integer; i++) {
          result.push(CLS_ON);
        }

        if (hasDecimal) {
          result.push(CLS_HALF);
        }

        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }

        return result;
      }
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../common/stylus/mixin.styl";
  .star
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
      &:last-child
        margin-right 0
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px

        &.on
          bg-img('star48_on')
        &.half
          bg-img('star48_half')
        &.off
          bg-img('star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &.on
          bg-img('star36_on')
        &.half
          bg-img('star36_half')
        &.off
          bg-img('star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &.on
          bg-img('star24_on')
        &.half
          bg-img('star24_half')
        &.off
          bg-img('star24_off')

</style>
