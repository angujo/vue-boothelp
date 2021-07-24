<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h3 class="border-bottom border-secondary">Uploads</h3>
        <div class="">
          <file-input :auto-process-queue="true">
            <template #previewTemplate>
              <div class="w-25">
                <div class="dz-preview dz-file-preview">
                  <div class="dz-details">
                    <div class="dz-filename"><span data-dz-name></span></div>
                    <div class="dz-size" data-dz-size></div>
                    <img data-dz-thumbnail/>
                  </div>
                  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                  <div class="dz-success-mark"><span>✔</span></div>
                  <div class="dz-error-mark"><span>✘</span></div>
                </div>
              </div>
            </template>
          </file-input>
        </div>
        <h3 class="border-bottom border-secondary">Accordions</h3>
        <div class="mb-4">
          <div class="row">
            <div class="col-3">
              <accordion>
                <accordion-item title="Accordion 101">
                  Some ocntent!
                </accordion-item>
                <accordion-item title="Accordion 938">
                  Here Lies the content!
                </accordion-item>
              </accordion>
            </div>
            <div class="col-3">
              <accordion open>
                <accordion-item title="Accordion 101">
                  Some ocntent!
                </accordion-item>
                <accordion-item title="Accordion 938">
                  Here Lies the content!
                </accordion-item>
              </accordion>
            </div>
            <div class="col-3">
              <accordion flush>
                <accordion-item title="Accordion 101">
                  Some ocntent!
                </accordion-item>
                <accordion-item title="Accordion 938">
                  Here Lies the content!
                </accordion-item>
              </accordion>
            </div>
            <div class="col-3">
              <accordion url="https://jsonplaceholder.typicode.com/users">
                <template #default="{data}">
                  <accordion-item :title="data.email">
                    {{ data }}
                  </accordion-item>
                </template>
              </accordion>
            </div>
          </div>
        </div>
        <h3 class="border-bottom border-secondary">Tabs</h3>
        <div>
          <tabs v-model="tabIndex">
            <tab title="Tab 101">
              Some COntent Here
            </tab>
            <tab title="Tab 102">
              Some COntent Here #2
            </tab>
          </tabs>
        </div>
        <h3 class="border-bottom border-secondary">Confirm Buttons</h3>
        <div class="btn-group">
          <confirm-button class="btn-outline-success">Confirm Quick</confirm-button>
          <confirm-button no-header class="btn-outline-success">No Header</confirm-button>
          <confirm-button no-header class="btn-outline-success" url="https://jsonplaceholder.typicode.com/posts/1">URL Run</confirm-button>
        </div>
        <h3 class="border-bottom border-secondary">Data Load</h3>
        <data-load url="https://jsonplaceholder.typicode.com/users">
          <template v-slot="{content}">{{ content }}</template>
        </data-load>
        <h3 class="border-bottom border-secondary">Modal Buttons</h3>
        <div class="btn-group">
          <modal-button class="btn btn-outline-info" key="btn11" frameless>Frameless
            <template #body>Am a model template #0</template>
          </modal-button>
          <modal-button class="btn btn-outline-info" key="btn11">Clicker
            <template #body>Am a model template #1</template>
          </modal-button>
          <modal-button class="btn btn-outline-info" key="btn133">Another
            <template #body>Am a model template #2</template>
          </modal-button>
          <modal-button class="btn btn-outline-info" key="btn133" iframe-url="https://kemri-wellcome.org" large>
            Iframe Url
          </modal-button>
          <modal-button class="btn btn-outline-info" key="btn133" url="https://jsonplaceholder.typicode.com/posts/1" large>
            Url Link
          </modal-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalButton   from "@/components/ModalButton/ModalButton";
import DataLoad      from "@/components/DataLoad/DataLoad";
import ConfirmButton from "@/components/ConfirmButton/ConfirmButton";
import Tabs          from "@/components/Tabs/Tabs";
import Tab           from "@/components/Tabs/Tab";
import {ref}         from "vue";
import Accordion     from "@/components/Accordion/Accordion";
import AccordionItem from "@/components/Accordion/AccordionItem";
import FileInput     from "@/components/FileInput/FileInput";

import 'bootstrap-icons/font/bootstrap-icons.css';
export default {
  name: "App",
  components: {FileInput, AccordionItem, Accordion, Tab, Tabs, DataLoad, ModalButton, ConfirmButton},
  setup() {
    const tabIndex = ref(0);

    return {tabIndex};
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
</style>