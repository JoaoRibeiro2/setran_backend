class AppError{
    message: String;
    statusCode: number

    constructor(
        message: String,
        statusCode: number = 400
    ){
        this.message = message
        this.statusCode = statusCode 
    }
}

export {AppError}