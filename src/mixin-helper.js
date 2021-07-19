import _ from './helpers';

export default {
    catchAxiosError(error) {
        if (!error || !_.isPlainObject(error)) return error;
        if (error.response) {
            if (error.response.data) {
                if (_.isString(error.response.data)) return error.response.data;
                if (error.response.data.message) {
                    // We are in a validation error
                    if (_.has(error.response.data, 'errors') && _.isPlainObject(error.response.data.errors)) {
                        for (let [field, msg] of Object.entries(error.response.data.errors)) {
                            if (_.isArray(msg) && msg.length > 0) return msg[0];
                        }
                    }
                    return error.response.data.message;
                }
                if (error.response.statusText) return error.response.statusText;
                return error.response.data;
            }
            if (error.response.statusText) return error.response.statusText;
            return error.response;
        }
        if (error.request) return error.request;
        if (error.message) {
            if (_.has(error, 'errors') && _.isPlainObject(error.errors)) {
                for (let [field, msg] of Object.entries(error.errors)) {
                    if (_.isArray(msg) && msg.length > 0) return msg[0];
                }
            }
            return error.message;
        }
        return error;
    },
    logError(error) {
        console.error(this.catchAxiosError(error));
    },
    alertError(error) {
        if (_.isFunction(this.$error)) this.$error(this.logGetError(error));
    },
    alertSuccess(msg) {
        if (_.isFunction(this.$success)) this.$success(msg);
    },
    alertInfo(msg) {
        if (_.isFunction(this.$info)) this.$info(msg);
    },
    logGetError(error) {
        let strErr = this.catchAxiosError(error);
        console.error(strErr);
        return strErr;
    },
}