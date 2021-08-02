import DataLoad          from "./components/DataLoad/DataLoad";
import DataTable         from "./components/DataTable/DataTable";
import FormElement       from "./components/FormElement/FormElement";
import ModalButton       from "./components/ModalButton/ModalButton";
import ConfirmButton     from "./components/ConfirmButton/ConfirmButton";
import ProgressOverlay   from "./components/ProgressOverlay/ProgressOverlay";
import Modal             from "./components/Modal/Modal";
import Accordion         from "./components/Accordion/Accordion";
import AccordionItem     from "./components/Accordion/AccordionItem";
import FileInput         from "./components/FileInput/FileInput";
import Tabs              from "./components/Tabs/Tabs";
import Tab               from "./components/Tabs/Tab";
import Imager            from "./components/Imager/Imager";
import BounceOverlay     from "./components/BounceOverlay/BounceOverlay";
import NotificationMixin from "./components/Notification/NotificationMixin";
import BSelect           from "./components/BSelect/BSelect";

import mitt from 'mitt';
import _    from './helpers';

const defaults = {headers: {'X-Requested-With': 'XMLHttpRequest'}};

export default {
    // eslint-disable-next-line no-unused-vars
    install(app, options = {}) {
        app.config.globalProperties.$http = require('axios');
        let opts = {};
        if (options.headers) {
            _.mergeDeep(opts, defaults.headers, options.headers)
        }
        _.mergeDeep(app.config.globalProperties.$http.defaults.headers.common, opts);

        app.config.globalProperties.$mitt = mitt();
        // components
        app.component('file-input', FileInput);
        app.component('data-load', DataLoad);
        app.component('data-table', DataTable);
        app.component('form-element', FormElement);
        app.component('modal-button', ModalButton);
        app.component('confirm-button', ConfirmButton);
        app.component('progress-overlay', ProgressOverlay);
        app.component('modal', Modal);
        app.component('accordion', Accordion);
        app.component('accordion-item', AccordionItem);
        app.component('tabs', Tabs);
        app.component('tab', Tab);
        app.component('imager', Imager);
        app.component('bounce-overlay', BounceOverlay);
        app.component('b-select', BSelect);
    },
};


export {
    DataTable,
    DataLoad,
    FormElement,
    ModalButton,
    ProgressOverlay,
    ConfirmButton,
    Modal,
    Accordion,
    AccordionItem,
    FileInput,
    Tab,
    Tabs,
    Imager,
    BounceOverlay,
    BSelect,
    NotificationMixin
};