import * as components from "./components";
import mitt            from 'mitt';

const ComponentLibrary = {
    // eslint-disable-next-line no-unused-vars
    install(Vue, options = {}) {
        Vue.prototype.$mitt=mitt();
        // components
        for (const componentName in components) {
            const component = components[componentName];

            Vue.component(component.name, component);
        }
    },
};

export default ComponentLibrary;

if (typeof window !== "undefined" && window.Vue) {
    window.Vue.use(ComponentLibrary);
}
