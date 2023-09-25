class BadRequestException extends Error {
    constructor({message = "Bad Request", statusCode = 400, additionalInfo = null} = {}) {
        super(additionalInfo ? `${message} => ${JSON.stringify(additionalInfo)}` : message);
        this.statusCode = statusCode;
    }
}

class UnauthorizedException extends Error {
    constructor({message = "Unauthorized", statusCode = 401, additionalInfo = null} = {}) {
        super(additionalInfo ? `${message} => ${JSON.stringify(additionalInfo)}` : message);
        this.statusCode = statusCode;
    }
}

class NotFoundException extends Error {
    constructor({message = "Not Found", statusCode = 404, additionalInfo = null} = {}) {
        console.log("jvhdbvjcbk", additionalInfo)
        super(additionalInfo ? `${message} => ${JSON.stringify(additionalInfo)}` : message);
        this.statusCode = statusCode;
    }
}

class ConflictException extends Error {
    constructor({message = "Conflict", statusCode = 409, additionalInfo = null} = {}) {
        super(additionalInfo ? `${message} => ${JSON.stringify(additionalInfo)}` : message);
        this.statusCode = statusCode;
    }
}

class UnprocessableContentException extends Error {
    constructor({message = "Unprocessable Content", statusCode = 422, additionalInfo = null} = {}) {
        super(additionalInfo ? `${message} => ${JSON.stringify(additionalInfo)}` : message);
        this.statusCode = statusCode
    }
}

class InternalServerErrorException extends Error {
    constructor({message = "Internal Server Error", statusCode = 500, additionalInfo = null} = {}) {
        super(additionalInfo ? `${message} => ${JSON.stringify(additionalInfo)}` : message);
        this.statusCode = statusCode;
    }
}

function httpStatusCodeToException(statusCode, additionalInfo) {
    const statusCode_to_exception_map = {
        400: BadRequestException,
        401: UnauthorizedException,
        404: NotFoundException,
        409: ConflictException,
        422: UnprocessableContentException,
        500: InternalServerErrorException,
    };

    const exception = statusCode_to_exception_map[statusCode];
    if (exception === undefined) {
        throw new Error(`${statusCode.toString()} => ${additionalInfo}`);
    } else {
        throw new exception({additionalInfo: additionalInfo});
    }
}

module.exports = { BadRequestException, UnauthorizedException, NotFoundException, ConflictException,
    InternalServerErrorException, httpStatusCodeToException };