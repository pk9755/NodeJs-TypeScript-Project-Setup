import { Context } from "koa";
import requestValidator from "../core/middleware/RequestValidator";
import httpConstants from "../constant/httpConstants";
const niv = require("node-input-validator");

export interface ResponseInterface {
  isValid: Boolean;
  status: number;
  data: object;
}

export class GeneralValidator {
  // isValid: Boolean
  // status: number
  // data : object
  emailRegex: RegExp;
  constructor() {
    this.emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    // this.response = {
    //     isValid: true,
    //     status: httpConstants.HTTP_SUCCESS_OK,
    //     data: {}
    // }
  }

  isEmailValid(email: string): boolean {
    if (!email) {
      return false;
    }

    if (email.length > 254) {
      return false;
    }

    var valid = this.emailRegex.test(email);
    if (!valid) {
      return false;
    }

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if (parts[0].length > 64) {
      return false;
    }

    var domainParts = parts[1].split(".");
    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    ) {
      return false;
    }

    return true;
  }

  isString(str: any): boolean {
    return typeof str === "string";
  }

  minLength(value: string, length = 1): boolean {
    return value.trim().length !== 0 && value.trim().length > length;
  }

  password(value: string): boolean {
    return value.trim().length !== 0 && value.trim().length < 8;
  }

  isNumber(value: any): boolean {
    return !isNaN(value);
  }

  isGreaterThan(value: any, greater: number): boolean {
    return value > greater;
  }

  /**
   * general function to return api error response
   * @return {ResponseInterface}
   */
  public error(
    message: string,
    errorCode = httpConstants.HTTP_UNPROCESSABLE_ENTITY
  ): ResponseInterface {
    const resp: ResponseInterface = {
      isValid: false,
      status: errorCode,
      data: { error: message },
    };
    return resp;
  }

  /**
   * general function to return api success response
   * @return {ResponseInterface}
   */
  public success(): ResponseInterface {
    // const resp: ResponseInterface = {isValid: false, status : errorCode, data.push({'error' : message})}
    const resp: ResponseInterface = {
      isValid: true,
      status: httpConstants.HTTP_SUCCESS_OK,
      data: {},
    };
    return resp;
  }
}

const generalValidator: GeneralValidator = new GeneralValidator();
export default generalValidator;
