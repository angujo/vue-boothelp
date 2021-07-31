<template>
  <div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "CompCycle",
  mounted() {
    console.log('This has been mounted!')
  }
}
</script>

<style scoped>

</style>