<template lang="html">
  <div class="cover" ref="cover" :class="coverRatio">
    <img src="~static/img/enter-btn.png" class="enter-btn" :class="dependsOn" @click="startQuestion"></img>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coverRatio: '',
      dependsOn: ''
    };
  },
  methods: {
    adaptBackground() {
      // 这个函数做的事情其实和 background-size: contain 起到的效果差不多，但是更灵活一些
      var cover = this.$refs.cover;
      var width = cover.offsetWidth;
      var height = cover.offsetHeight;
      var ratio = width / height;
      var standardRatio = 2 / 3;

      // 判断屏幕的宽高比，决定背景图是保证纵向全部显示，还是横向全部显示
      // 如果宽高比小于标准宽高比，那么说明屏幕比较窄，则保证背景图的横向铺满窗口，纵向上下留白，反之亦然
      if (ratio < standardRatio) {
        this.coverRatio = 'horizontal-first';
        this.dependsOn = 'depend-on-horizontal';
      } else {
        this.coverRatio = 'vertical-first';
        this.dependsOn = 'depend-on-vertical';
      }
    },
    startQuestion() {
      this.$router.push('question/1');
    }
  },
  mounted() {
    this.adaptBackground();
    window.onresize = this.adaptBackground;
  }
};
</script>

<style lang="less" scoped>
.cover {
  width: 100%;
  height: 100%;
  background: url("~static/img/cover.jpg") no-repeat fixed center;
  &.horizontal-first {
    background-size: 100% auto;
  }
  &.vertical-first {
    background-size: auto 100%;
  }
  .enter-btn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, 150%, 0);
    cursor: pointer;
    filter:saturate(1.0);
    opacity: 0.9;
    &.depend-on-horizontal {
      width: 90%;
    }
    &.depend-on-vertical {
      height: 13%;
    }
    &:hover {
      filter:saturate(1.5) brightness(1.2);
      opacity: 1;
    }
    &:active {
      filter:saturate(1.2) brightness(1.1);
      opacity: 0.96;
    }
  }
}
</style>
