export default class createError {
    static generateError(status, message) {
        const error = new Error(message);
        error.status = status || 500; 
        return error;
    }
}