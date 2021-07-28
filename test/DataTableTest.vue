<template>
  <data-table ref="dtmine" nonce-url="https://jsonplaceholder.typicode.com/comments" :columns="columns">
    <template #slotter="props">
      <div>Am testing Slot Column</div>
      <div>{{props}}</div>
    </template>
  </data-table>
</template>

<script>

export default {
  name: "DataTableTest",
  components: {},
  computed: {
    columns() {
      let compn = this;
      return [
        //  { special: 'rowNumber'},
        {special: 'dataRowNumber'},
        {title: 'Id', func(dt) {return `<i>${dt.id}</i>`;}},
       /* {
          title: 'SpCheckbox', special: 'checkbox',
          checked(dt, v, r_id) {
            if (null !== v) compn.rowClicked(dt, v, r_id)
            return false;
          }
        },*/
        // {title: 'Component', searchable: true, sortable: true, component: ColumnCellComp,varName:'id'},
        // {title: 'Title 3', searchable: true, sortable: true},
        {title: 'Key Based', key: 'postId'},
        {title: 'Slot', slot: 'slotter'},
        {
          title: 'Func()', func(dt) {
            return `<strong>${dt.email}</strong>`;
          }
        },
        {
          title: 'Empty Key', key: 'id', dataClass: 'text-end', headClass: 'text-end',
          formatter(x) {
            x = x * Math.floor(Math.random() * 10000);
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>