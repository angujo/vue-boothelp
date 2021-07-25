<template>
  <div class="row">
    <div ref="dropjs"
         :class="['p-3 drop-bg d-flex border border-1 justify-content-center align-items-center border-secondary border-a',dropClass]">
      <div class="dz-message" data-dz-message>
        <div v-if="sFile">
          <img :src="imageUrl" v-if="isImage" class="img-fluid" alt="...">
          <i :class="extIcon(sFile.name.split('.').pop())+' icon-drop'" v-else/>
        </div>
        <template v-else>
          <slot>Click or Drop File</slot>
        </template>
      </div>
    </div>
    <div ref="prevs" class="dropzone-previews col list-group list-group-flush" v-if="internalPreview"></div>
    <div ref="previewTemplate" class="position-absolute" style="visibility: hidden">
      <div class="dz-preview dz-file-preview ">
        <div v-if="multiple" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <div class="dz-details">
              <div class="dz-filename"><span data-dz-name></span></div>
            </div>
            <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
          </div>
          <div>
            <div class="btn-group" v-if="!autoProcessQueue">
              <template>
                <button type="button" class="btn"><i class="bi-upload text-success"></i></button>
              </template>
              <button type="button" class="btn"><i class="bi-trash text-danger"></i></button>
            </div>
          </div>
        </div>
        <span v-else></span>
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone          from 'dropzone';
import _                 from '../../helpers';
import loggers           from '../../mixin-helper';
import NotificationMixin from "./../Notification/NotificationMixin";


export default {
  name: "FileInput",
  mixins: [NotificationMixin],
  props: {
    nFile: {type: Object,},
    multiple: {
      type: Boolean,
      default: false,
    },
    dropClass: {
      type: String,
      default: 'col-sm-6 col-md-4 col-lg-3',
    },
    dropzoneClass: {
      type: String,
      default: ''
    },
    dropzoneStyle: {
      type: String,
      default: ''
    },
    disableDefaultClass: {
      type: Boolean,
      default: false,
    },
    defaultTheme: {
      type: Boolean,
      default: false,
    },
    // Dropzone option props see http://www.dropzonejs.com/#config-url
    url: {
      type: String,
    },
    method: {
      type: String,
      default: 'post',
    },
    timeout: {
      type: Number,
      default: 3000,
    },
    parallelUploads: {
      type: Number,
      default: 2,
    },
    uploadMultiple: {
      type: Boolean,
      default: false,
    },
    maxFilesize: {
      type: Number,
      default: 256,
    },
    paramName: {
      type: String,
      default: 'file'
    },
    createImageThumbnails: {
      type: Boolean,
      default: true,
    },
    maxThumbnailFilesize: {
      type: Number,
      default: 10,
    },
    thumbnailWidth: {
      type: Number,
      default: 120,
    },
    thumbnailHeight: {
      type: Number,
      default: 120,
    },
    thumbnailMethod: {
      type: String,
      default: 'crop',
    },
    resizeWidth: {
      type: Number,
      default: null,
    },
    resizeHeight: {
      type: Number,
      default: null,
    },
    resizeMimeType: {
      type: String,
      default: null,
    },
    resizeQuality: {
      type: Number,
      default: 0.8,
    },
    resizeMethod: {
      type: String,
      default: 'contain',
    },
    filesizeBase: {
      type: Number,
      default: 1000,
    },
    maxFiles: {
      type: Number,
      default: null,
    },
    params: {
      type: Object,
      default() {
      }
    },
    headers: {
      type: Object,
      default() {
      }
    },
    clickable: {
      type: [Boolean, String],
      default: true,
    },
    ignoreHiddenFiles: {
      type: Boolean,
      default: true,
    },
    acceptedFiles: {
      type: String,
      default: null,
    },
    autoProcessQueue: {
      type: Boolean,
      default: true,
    },
    autoQueue: {
      type: Boolean,
      default: true,
    },
    addRemoveLinks: {
      type: Boolean,
      default: false,
    },
    previewsContainer: {
      type: [Object, String],
      default: null,
    },
    hiddenInputContainer: {
      type: String,
      default: 'body',
    },
    capture: {
      type: String,
      default: null,
    },
    renameFile: {
      type: String,
      default: null,
    },
    forceFallback: {
      type: Boolean,
      default: false,
    },
    languages: {
      type: Object,
      default() {
      }
    },
    // override option props
    options: {
      type: Object,
      default() {
      }
    }
  },
  data() {
    return {
      dropzone: null,
      isOverrideOptions: false,
      sFile: null,
      imageUrl: null
    }
  },
  methods: {
    reload(fnc) {
      if (!this.dropzone) return;
      this.dropzone.disable();
      setTimeout(() => {
        this.dropzone.enable();
        if (_.isFunction(fnc)) fnc.call();
      }, 500);
    },
    process() {
      if (!this.autoProcessQueue && this.dropzone && this.dropzone.getQueuedFiles().length > 0) this.dropzone.processQueue();
    },
    initDropzone() {
      Dropzone.autoDiscover = false;
      let options = this.parseOptions();
      this.dropzone = new Dropzone(this.$refs.dropjs, options);
      this.emitDropzoneInstance(this.dropzone);
    },
    parseOptions() {
      // get options from pors
      let options = {
        url: this.postUrl,
        method: this.method,
        timeout: this.timeout,
        parallelUploads: this.parallelUploads,
        uploadMultiple: this.uploadMultiple,
        maxFilesize: this.maxFilesize,
        paramName: this.paramName,
        createImageThumbnails: this.createImageThumbnails,
        maxThumbnailFilesize: this.maxThumbnailFilesize,
        thumbnailWidth: this.thumbnailWidth,
        thumbnailHeight: this.thumbnailHeight,
        thumbnailMethod: this.thumbnailMethod,
        resizeWidth: this.resizeWidth,
        resizeHeight: this.resizeHeight,
        resizeMimeType: this.resizeMimeType,
        resizeQuality: this.resizeQuality,
        resizeMethod: this.resizeMethod,
        filesizeBase: this.filesizeBase,
        maxFiles: this.multiple ? (this.maxFiles && _.isInt(this.maxFiles) && parseInt(this.maxFiles) > 1 ? parseInt(this.maxFiles) : null) : 1,
        params: this.params,
        headers: this.headers,
        clickable: this.clickable,
        ignoreHiddenFiles: this.ignoreHiddenFiles,
        acceptedFiles: this.acceptedFiles,
        autoProcessQueue: this.autoProcessQueue,
        autoQueue: this.autoQueue,
        addRemoveLinks: this.addRemoveLinks,
        previewsContainer: this.prevCont,
        hiddenInputContainer: this.hiddenInputContainer,
        capture: this.capture,
        renameFile: this.renameFile,
        forceFallback: this.forceFallback,
      };
      // merge slot preview template
      if (this.$refs.previewTemplate.innerHTML) {
        options = Object.assign({}, options, {previewTemplate: this.$refs.previewTemplate.innerHTML});
      }
      // merge language option from computed
      options = Object.assign({}, options, this.mergeLanguages);
      // merge override options from props
      if (this.isOverrideOptions) {
        options = Object.assign({}, options, this.options);
      }
      return options;
    },
    emitDropzoneInstance(dropzone) {
      this.$emit('init', dropzone);
    },
    registerEvents() {
      var vm = this;
      this.dropzone.on('success', function (file, response) {
        vm.$emit('success', file, response);
      });
      this.dropzone.on('complete', function () {
        vm.$emit('complete');
      });
      this.dropzone.on('error', function (file, error, xhr) {
        vm.$emit('error', file, error, xhr);
        vm.notifyError(`Error: ${_.stripTags(error)}`, file.name, () => { /*vm.dropzone.removeFile(file);*/});

      });
      this.dropzone.on('queuecomplete', function () {
        vm.$emit('queuecomplete', vm.dropzone.files);
      });
      this.dropzone.on('addedfile', function (file) {
        if (!vm.multiple) {
          if (vm.sFile) this.removeFile(vm.sFile);
          vm.sFile = file;
        }
        if (vm.isImage) {
          let FR = new FileReader();
          FR.onload = function (e) {
            //if you want to display it somewhere in your previewTemplate
            vm.imageUrl = e.target.result
            // temp.find('.my-preview').attr('src',); //setting as src of some img tag with class 'my-preview'
          };
          FR.readAsDataURL(vm.sFile);
        }
        vm.$emit('addedfile', file);
      });
      this.dropzone.on('maxfilesexceeded', function (file) {
        console.error('ERROR :', 'Max number of files exceeded!')
        vm.$emit('maxfilesexceeded', file);
      });
      // Drag Dom Events
      this.dropzone.on('drop', function (event) { vm.$emit('drop', event); });
      this.dropzone.on('dragstart', function (event) {
        vm.$emit('dragstart', event);
      });
      this.dropzone.on('dragend', function (event) {
        vm.$emit('dragend', event);
      });
      this.dropzone.on('dragenter', function (event) {
        vm.$emit('dragenter', event);
      });
      this.dropzone.on('dragover', function (event) {
        vm.$emit('dragover', event);
      });
      this.dropzone.on('dragleave', function (event) {
        vm.$emit('dragleave', event);
      });
    },
    checkOverrideOptions() {
      if (this.options && Object.keys(this.options) > 0) {
        return this.isOverrideOptions = true;
      }
      return this.isOverrideOptions = false;
    },
    ...loggers,
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
    isImage() {
      return this.sFile && ['png', 'jpeg', 'jpg', 'gif'].includes(this.sFile.name.toString().toLowerCase().split('.').pop());
    },
    internalPreview() {
      return this.multiple && !this.previewsContainer;
    },
    prevCont() {
      return this.multiple && !this.previewsContainer ? this.$refs.prevs : this.previewsContainer;
    },
    id() {
      return _.mathRand('dz');
    },
    postUrl() {
      return this.url && _.isString(this.url) ? this.url : window.location.toString();
    },
    mergeLanguages() {
      let defaultLang = {
        dictDefaultMessage: 'Drop files here to upload',
        dictFallbackMessage: 'Your browser does not support drag and drop file uploads.',
        dictFallbackText: 'Please use the fallback form below to upload your files like in the olden days.',
        dictFileTooBig: 'File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.',
        dictInvalidFileType: "You can't upload files of this type.",
        dictResponseError: 'Server responded with {{statusCode}} code.',
        dictCancelUpload: 'Cancel upload',
        dictCancelUploadConfirmation: 'Are you sure you want to cancel this upload?',
        dictRemoveFile: 'Remove',
        dictRemoveFileConfirmation: null,
        dictMaxFilesExceeded: 'You can not upload any more files. (max: {{maxFiles}})',
        dictFileSizeUnits: '{ tb: "TB", gb: "GB", mb: "MB", kb: "KB", b: "b" }',
      };
      return Object.assign({}, defaultLang, this.languages);
    },
    parseDropzoneClass() {
      let defaultClass = 'dropzone';
      if (this.disableDefaultClass) {
        defaultClass = '';
      }
      if (this.defaultTheme) {
        return 'dash-dropzone ' + this.dropzoneClass + ' ' + defaultClass;
      }
      return this.dropzoneClass + ' ' + defaultClass;
    }
  },
  watch: {
    nFile(v) {
      if (this.multiple) return;
      this.sFile = v;
      if (!v) return;
      this.imageUrl = v.url;
    }
  },
  mounted() {
    this.checkOverrideOptions();
    this.initDropzone();
    this.registerEvents();
  },
  beforeDestroy() {
    this.dropzone.disable();
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import url('~dropzone/dist/dropzone.css');

.dash-dropzone {
  border: 2px dashed #0087F7;
  border-radius: 5px;
  background: white;
}

.icon-drop {
  font-size: 7rem;
  line-height: 1;
}

.drop-bg {
  background-color: #f4efef !important;
  border-style: dashed !important;
}
</style>
