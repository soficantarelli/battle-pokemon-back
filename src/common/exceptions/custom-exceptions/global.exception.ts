import { HttpException } from "@nestjs/common";

export class GlobalHttpException extends HttpException {

    private code: string;
    
    constructor({ message, status, code }) {
        super(message, status);
        this.code = code;
    }

    getCode() {
        return this.code;
    }

}