export function fieldRequiredRule(item, message) {
    return [{
        validator:  (rule, _, callback) => {
            if (!item) {
                callback(new Error(message));
            } else {
                return callback();
            }
        }
    }]
}