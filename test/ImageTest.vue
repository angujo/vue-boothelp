<template>
  <div class="row justify-content-center align-items-center" style="height: 100vh">
    <div class="col-md-6 col-lg-4">
      <form-element url="/" :fields="dt" :remove="['cat.addr.cntxx']">
        <div class="row">
          <div class="col-md-3">
            <file-input drop-class="col" external-preview @addedfile="addImage" :auto-process-queue="false" url="/" multiple
                        accepted-files="image/*"/>
          </div>
          <div class="col">
            <template v-for="(im,i) in images" :key="i">
              <div class="d-inline-block">
                <imager :src="im.file" medium square/>
              </div>
            </template>
          </div>
        </div>
        <!--        <div class="mb-3">
                  <label class="form-label">Date Time Range</label>
                  <datetime-input range/>
                </div>
                <div class="mb-3">
                  <label class="form-label">Date Range</label>
                  <datetime-input v-model="dt.drange" range date rows/>
                </div>
                <div class="mb-3">
                  <label class="form-label">Date</label>
                  <datetime-input v-model="dt.jdate" date/>
                </div>
                <div class="mb-3">
                  <label class="form-label">DateTime</label>
                  <datetime-input datetime/>
                </div>
                <div class="mb-3">
                  <label class="form-label">Time</label>
                  <datetime-input class="w-100" time/>
                </div>
                <div class="mb-3">
                  <label class="form-label">Select</label>
                  <VueMultiselect :options="[1,2,3,4,5]" multiple v-model="dt.cnt"/>
                </div>
                <div class="mb-3">
                  <label class="form-label">Select</label>
                  <b-select :options="[1,2,3,4,5]" multiple v-model:content="cnt" value-prop="id" searchablex track-by="id"
                            :show-labels="true" :close-on-select="false"
                            urlxx="https://jsonplaceholder.typicode.com/users" v-model="sv">
                  </b-select>
                </div>-->
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" v-model="dt.email" placeholder="name@example.com">
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <template #buttons>
          <query-button :params="dt" class="btn btn-outline-info" url="/">Query Submission</query-button>
        </template>
      </form-element>
      <!--
       <b-select :options="[1,2,3,4,5]" multiple v-model:content="cnt" value-prop="id" searchable track-by="id"
                 url="https://jsonplaceholder.typicode.com/users" v-model="sv" @change="something">
       </b-select>

       <div class="mt-3">
         <pre>{{ sv }}</pre>
       </div>
     </div>
      vertical rotate>
           <tab title="Tab 101">
             <comp-cycle>Am first Content</comp-cycle>
           </tab>
           <tab title="Tab Disabled" >
             <comp-cycle>Am first Content to be disabled</comp-cycle>
           </tab>
           <tab title="Tab 103"  lazy>
            <comp-cycle>Am another:Lazy</comp-cycle>
           </tab>
         </tabs>
         <data-load class="col-6" url="https://jsonplaceholder.typicode.com/users" @loaded="d=>{dt=d;}">
            <bounce-overlay :monitor="dt" @bounced="something" url="/user">
              <draggable v-model="dt" item-key="bouncer">
                <template #item="{element}">
                  <div class="p-2 bg-light mb-2">{{ element.email }}</div>
                </template>
              </draggable>
            </bounce-overlay>
            {{ dt.length }} Records
          </data-load>
          <div>
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
  </div>
</template>

<script>
import draggable      from "vuedraggable";
import Tabs           from "@/components/Tabs/Tabs";
import Tab            from "@/components/Tabs/Tab";
import CompCycle      from "./CompCycle";
import QueryButton    from "@/components/QueryButton/QueryButton";
import BSelect        from "@/components/BSelect/BSelect";
import FormElement    from "@/components/FormElement/FormElement";
import DatetimeInput  from "@/components/DatetimeInput/DatetimeInput";
import VueMultiselect from "vue-multiselect";

import "@/css/data-table.scss";
import FileInput      from "@/components/FileInput/FileInput";
import Imager         from "@/components/Imager/Imager";

export default {
  name: "ImageTest",
  components: {Imager, FileInput, FormElement, QueryButton},
  data() {
    return {
      images: [],
      dt: {
        cat: {name: 'Cat 1', age: 34, addr: {phone: '0828383', street: 'Rd101', cnt: {p: 2323, k: 'fdshgdhfgdf'}}},
        fname: null,
        address: null
      }, sv: null, cnt: null
    }
  },
  methods: {
    addImage(file, url) {
      this.images.push({url, file});
    },
    something() {console.log('It bounced!!')}
  }
}
</script>

<style scoped>

</style>