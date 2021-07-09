export default {
    isFunction(obj) {
        return obj && {}.toString.call(obj) === '[object Function]';
    },
    isVueComponent(obj) {
        let vKeys = ['name', 'render', '_compiled'];
        return obj && typeof obj === 'object' && vKeys.length === Object.keys(obj).filter(k => vKeys.includes(k)).length;
    },
    isObject(obj) {
        return obj && typeof obj === 'object';
    },
    isPlainObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    },
    objectGet(obj, path, def) {
        def = def || null;
        if (typeof path !== 'string') return path;
        let v = path.split('.').reduce((o, i) => o[i], obj);
        return typeof v === 'undefined' ? def : v;
    }
}