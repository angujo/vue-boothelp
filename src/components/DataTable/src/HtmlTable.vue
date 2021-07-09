<template>
  <table class="table table-bordered">
    <table-head></table-head>
    <table-body :url="url" :data="data" :nonce="nonce"></table-body>
    <table-foot></table-foot>
  </table>
</template>

<script>
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableFoot from "./TableFoot";

export default {
  name: "HtmlTable",
  components: {TableFoot, TableBody, TableHead},
  props: {url: String, data: Array, nonce: Boolean}
};
</script>

<style scoped></style>
