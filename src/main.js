import {createApp}   from 'vue';
import App           from './../test/App.vue'
import DataTableTest from "../test/DataTableTest";
import lib           from './index';
import ImageTest     from "../test/ImageTest";

const v = createApp(ImageTest);
v.use(lib);
v.mount('#app')
