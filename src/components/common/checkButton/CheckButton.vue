<template>
    <div class="contents" :class="{ check : isChecked }">
      <img  src="~assets/img/cart/selected.svg" alt="" />
    </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.contents {
  width: 16px;
  height: 16px;
  border:1px solid #000;
  border-radius: 50%;

}
.contents img {
  width: 18px;
  height: 18px;
  border-color: #fff;
}
.check {
  background-color: var(--color-text);
  border-color: #fff;
}
</style>