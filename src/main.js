import * as components from "./components";
import mitt            from 'mitt';

const ComponentLibrary = {
    // eslint-disable-next-line no-unused-vars
    install(app, options = {}) {
        app.config.globalProperties.$mitt=mitt();
        // components
        for (const componentName in components) {
            const component = components[componentName];

            app.component(component.name, component);
        }
    },
};

export default ComponentLibrary;

if (typeof window !== "undefined" && window.Vue) {
    window.Vue.use(ComponentLibrary);
}
