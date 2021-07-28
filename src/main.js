import {createApp}   from 'vue';
import App           from './../test/App.vue'
import DataTableTest from "../test/DataTableTest";
import lib           from './index';

const v = createApp(DataTableTest);
v.use(lib);
v.mount('#app')
