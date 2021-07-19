<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
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
import 'bootstrap-icons/font/bootstrap-icons.css';
import ModalButton from "@/components/ModalButton/ModalButton";
import DataLoad    from "@/components/DataLoad/DataLoad";

export default {
  name: "App",
  components: {DataLoad, ModalButton}
}
</script>

<style scoped>
</style>