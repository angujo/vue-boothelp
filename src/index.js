import DataLoad        from "./components/DataLoad/DataLoad";
import DataTable       from "./components/DataTable/DataTable";
import FormElement     from "./components/FormElement/FormElement";
import ModalButton     from "./components/ModalButton/ModalButton";
import ConfirmButton   from "./components/ConfirmButton/ConfirmButton";
import ProgressOverlay from "./components/ProgressOverlay/ProgressOverlay";
import Modal           from "./components/Modal/Modal";
import Accordion       from "./components/Accordion/Accordion";
import AccordionItem   from "./components/Accordion/AccordionItem";

let components = require("./components");
import mitt            from 'mitt';

export default {
    // eslint-disable-next-line no-unused-vars
    install(app, options = {}) {
        app.config.globalProperties.$mitt = mitt();
        // components
        app.component('data-load', DataLoad);
        app.component('data-table', DataTable);
        app.component('form-element', FormElement);
        app.component('modal-button', ModalButton);
        app.component('confirm-button', ConfirmButton);
        app.component('progress-overlay', ProgressOverlay);
        app.component('modal', Modal);
        app.component('accordion', Accordion);
        app.component('accordion-item', AccordionItem);
        /*for (const componentName in components) {
            const component = components[componentName];
            console.log('Component::', componentName, component.name);
            app.component(component.name, component);
        }*/
    },
};


export {DataTable, DataLoad, FormElement, ModalButton, ProgressOverlay, ConfirmButton, Modal, Accordion, AccordionItem};