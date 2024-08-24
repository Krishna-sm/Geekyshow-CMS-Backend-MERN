class ApiError extends Error{
    constructor(statusCode,msg,stack=''){
            super(msg);

            this.message = msg;
            this.statusCode = statusCode;
            Error.captureStackTrace(this,this.constructor)

    }
}

module.exports = {
    ApiError
}