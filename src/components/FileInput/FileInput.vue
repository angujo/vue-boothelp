<template>
  <div class="position-relative">
    <div ref="dropjs" class="p-3 bg-info">
    </div>
  </div>
</template>

<script>
import Dropzone from 'dropzone';
import _        from '../../helpers';
import loggers  from '../../mixin-helper';

import 'dropzone/dist/dropzone.css';

export default {
  name: "FileInput",
  props: {
    url: {type: String, default: null},
    name: {type: String, default: 'file'},
    method: {type: String, default: 'post'},
    max: {type: Number, default: 2},
    multiple: {type: Boolean, default: true},
    process: {type: Boolean, default: true},
    accept: {type: [String, Array, Function], default: '*'},
  },
  data() {
    return {dropzone: null}
  },
  methods: {
    ...loggers,
    fileAdded(file) {
      file.previewElement = '<h3>This is a preview</h3>';
    },
    extIcon(ext) {
      if (['rar', 'zip'].includes(ext)) return 'bi-file-earmark-zip';
      if (['doc', 'docx'].includes(ext)) return 'bi-file-earmark-word';
      if (['mp3', 'mp4'].includes(ext)) return 'bi-file-music';
      if (['xls', 'xlsx'].includes(ext)) return 'bi-file-spreadsheet';
      switch (ext) {
        case 'pdf':
          return 'bi-file-pdf';
        default:
          return 'bi-file-x';
      }
    }
  },
  computed: {
    postUrl() {
      return this.url && _.isString(this.url) ? this.url : window.location.toString();
    }
  },
  mounted() {
    this.dropzone = new Dropzone(this.$refs.dropjs,
        {
          url: this.postUrl,
          addedfile: f => {
            f.previewElement='<div class="dz-preview">Here</div>';
            console.log(f)
          }
        });
  }
};
</script>

<style scoped></style>
