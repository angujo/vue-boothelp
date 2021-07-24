import {createToast} from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default {
    methods: {
        notifyError(msg, title, close) {
            msg = msg || 'Error was encountered';
            close = close && {}.toString.call(close) === '[object Function]' ? close : function () {};
            title = title || null;
            createToast({title: title, description: msg}, {type: 'danger', showIcon: true, onClose: close});
        },
        notifySuccess(msg, title, close) {
            msg = msg || 'Successfully implemented!';
            close = close && {}.toString.call(close) === '[object Function]' ? close : function () {};
            title = title || null;
            createToast({title: title, description: msg}, {type: 'success', showIcon: true, onClose: close});
        },
        notifyInfo(msg, title, close) {
            msg = msg || 'Information: Be updated!';
            close = close && {}.toString.call(close) === '[object Function]' ? close : function () {};
            title = title || null;
            createToast({title: title, description: msg}, {type: 'info', showIcon: true, onClose: close});
        },
        notifyWarning(msg, title) {
            msg = msg || 'This is a warning alert to be on lookout!';
            title = title || null;
            createToast({title: title, description: msg}, {type: 'warning', showIcon: true});
        },
        notifyDefault(msg, title, close) {
            msg = msg || 'This is a warning alert to be on lookout!';
            close = close && {}.toString.call(close) === '[object Function]' ? close : function () {};
            title = title || null;
            createToast({title: title, description: msg}, {type: 'default', showIcon: true, onClose: close});
        },
    },
}