<script setup lang="ts">
</script>

<template>
  <div class="circle-animation">
  <div class="base">
      <img src="./assets/1.jpeg" />
    </div>
    <div class="item">
      <img src="./assets/2.jpeg" />
    </div>
    <div class="item">
      <img src="./assets/3.jpeg" />
    </div>
    <div class="item">
      <img src="./assets/4.jpeg" />
    </div>
    <div class="item">
      <img src="./assets/5.jpeg" />
    </div>
    <div class="item">
      <img src="./assets/6.jpeg" />
    </div>
    <div class="item">
      <img src="./assets/7.jpeg" />
    </div>
  </div>
</template>

<style lang="scss">
  $size: 300px;
  $imgSize: 80px;

  .circle-animation {
    width: $size;
    height: $size;
    margin: 0 auto;
    border-radius: 50%;
    border: 1px solid #007BFF;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: start;
    .item, .base {
      width: $imgSize;
      height: $imgSize;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      margin-top: -$imgSize / 2;
      img {
        width: $imgSize;
        height: $imgSize;
      }
    }

    .base {
      left: 50%;
      top: 50%;
      margin-top: 0;
      transform: translate(-50%, -50%);
    }
  }

  .circle-animation {
    animation: rotation infinite linear 20s;

    $n: 6;
    $deg: 360deg / $n;
    .item {
      transform-origin: center $size / 2 + $imgSize / 2;
      @for $i from 1 through $n {
        &:nth-child(#{$i}) {
          $rotate: $deg * ($i - 1);
          transform: rotate($rotate);
          img {
            --initDeg: #{$rotate};
            transform: rotate(-$rotate);
            animation: rotation infinite linear 20s reverse;
          }
        }
      }
    }
    .base {
      transform-origin: center center;
      img {
        animation: rotation infinite linear 20s reverse;
      }
    }
  }

  @keyframes rotation {
    to {
      transform: rotate(calc(360deg - var(--initDeg, 0deg)));
    }
  }
</style>
