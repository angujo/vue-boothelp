<template>
    <li :class="['paginate_button','page-item',isActive?'active':'']">
        <a href="Javascript:void(0);" @click="$emit('paged',page)" aria-controls="datatable-buttons" data-dt-idx="0" tabindex="0" class="page-link" v-html="txt"/>
    </li>
</template>

<script>
    export default {
        name: "PaginationButton",
        props: {
            txt: {type: [String, Number], required: true},
            url: {type: String, required: false},
            isActive: Boolean,
            page: {type: Number, required: true},
        }
    }
</script>

<style scoped>
.page-item.active .page-link{
  z-index: unset !important;
}
</style>
