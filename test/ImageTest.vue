<template>
  <div class="row justify-content-center align-items-center" style="height: 100vh">
    <div class="col-md-6 col-lg-4">
      <b-select :options="[1,2,3,4,5]" label="email" value-prop="id" track-by="id" pre-load tags
                url="https://jsonplaceholder.typicode.com/users" v-model="sv" @change="something">
        <template #option="props">
          <div>{{ props.option }}</div>
        </template>
      </b-select>

      <div class="mt-3">
        <pre>{{ sv }}</pre>
      </div>
    </div>
    <!--    <tabs vertical rotate>
          <tab title="Tab 101">
            <comp-cycle>Am first Content</comp-cycle>
          </tab>
          <tab title="Tab Disabled" >
            <comp-cycle>Am first Content to be disabled</comp-cycle>
          </tab>
          <tab title="Tab 103"  lazy>
           <comp-cycle>Am another:Lazy</comp-cycle>
          </tab>
        </tabs>-->
    <!--    <data-load class="col-6" url="https://jsonplaceholder.typicode.com/users" @loaded="d=>{dt=d;}">
          <bounce-overlay :monitor="dt" @bounced="something" url="/user">
            <draggable v-model="dt" item-key="bouncer">
              <template #item="{element}">
                <div class="p-2 bg-light mb-2">{{ element.email }}</div>
              </template>
            </draggable>
          </bounce-overlay>
          {{ dt.length }} Records
        </data-load>-->
    <!--    <div>
          <imager src="https://picsum.photos/200/300?text=Small" medium circle alt="..."/>
          <imager src="https://picsum.photos/200/300?text=Small" medium square alt="..."/>
          <imager src="https://picsum.photos/200/300?text=Medium+Square" medium rectangle alt="..."/>
          <imager src="https://picsum.photos/200/300?text=Large" medium longRectangle alt="..."/>
          <imager src="https://picsum.photos/200/300?text=Medium+Square" medium  banner alt="..."/>
        </div>
        <hr/>
        <div>
          <imager src="https://picsum.photos/200/300?text=Small" extra-small alt="..."/>
          <imager src="https://picsum.photos/200/300?text=Small" small alt="..."/>
          <imager src="https://picsum.photos/200/300?text=Medium+Square" medium alt="..."/>
          <imager src="https://picsum.photos/200/300?text=Large" large alt="..."/>
          <imager src="https://picsum.photos/200/300?text=Medium+Square" extra-large circle alt="..."/>
          <imager src="https://picsum.photos/200/300?text=Medium+Circle" medium circle alt="..."/>
        </div>-->
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Tabs      from "@/components/Tabs/Tabs";
import Tab       from "@/components/Tabs/Tab";
import CompCycle from "./CompCycle";
import BSelect   from "@/components/BSelect/BSelect";

export default {
  name: "ImageTest",
  components: {BSelect,},
  data() {return {dt: [], sv: null}},
  methods: {
    something() {console.log('It bounced!!')}
  }
}
</script>

<style scoped>

</style>