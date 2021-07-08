<template>
  <table class="table table-bordered">
    <table-head></table-head>
    <table-body></table-body>
    <table-foot></table-foot>
  </table>
</template>

<script>
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableFoot from "./TableFoot";

export default {
  name: "HtmlTable",
  components: { TableFoot, TableBody, TableHead },
};
</script>

<style scoped></style>
