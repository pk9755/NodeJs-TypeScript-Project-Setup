import { Context } from "koa";
import genValidator from "./GeneralValidator";
import comValidator from "./BaseValidator ";
import config from "../../resources/config";
// import apiCallLogConstants from '../constant/apiCallLogConstants'
import ErrorMiddleware from "../core/middleware/ErrorMiddleware";
// import Helper from '../utils/Helper'

export class CommonValidator {
  async getAddressByPincode(ctx: Context) {
    const data = {
      postcode: ctx.query.postcode,
      type: ctx.query.type,
    };
    const valid = new comValidator.Validator(data, {
      postcode: "required|string|minLength:6",
      type: "required|in:new,change",
    });
    const v = await valid.check();
    if (!v) {
      return genValidator.error(valid.errors);
    }
    return genValidator.success();
  }

  // async updateCreditApiCount(ctx: Context) {
  //      const data = {
  //           header: ErrorMiddleware.getToken(ctx),
  //           type: ctx.request.body.type
  //      }
  //      // console.log('here',data,ctx.request.headers)
  //      const valid = new comValidator.Validator(data, {
  //           header: `required|string|in:${config.credworthy_access_key}`,
  //           type: `required|in:${apiCallLogConstants.TYPE_CREDIT},${apiCallLogConstants.TYPE_ID},${apiCallLogConstants.TYPE_AML}`
  //      })
  //      const v = await valid.check()
  //      if (!v) {
  //           return genValidator.error(valid.errors)
  //      }
  //      return genValidator.success()
  // }

  async createTicket(ctx: Context) {
    const valid = new comValidator.Validator(ctx.request.body, {
      heading: `required|string`,
      priority: `required|string|in:urgent,normal`,
      body: `required|string`,
      email: `required|email`,
      username: "required",
    });
    const v = await valid.check();
    if (!v) {
      return genValidator.error(valid.errors);
    }
    return genValidator.success();
  }

  async createTicketForContactUs(ctx: Context) {
    const valid = new comValidator.Validator(ctx.request.body, {
      loanId: `required|loanExists`,
      subject: `required|string`,
      message: `required|string`,
      urls: `array`,
    });
    const v = await valid.check();
    if (!v) {
      return genValidator.error(valid.errors);
    }
    return genValidator.success();
  }

  // async upload(ctx: Context) {
  //      ctx.request.body.mime = Helper.base64MimeType(ctx.request.body.file)
  //      ctx.request.body.file = ctx.request.body.file.split(',')[1]
  //      let valid = new comValidator.Validator(ctx.request.body, {
  //           file: `required|base64`,
  //           fileName: 'required|string'
  //      })
  //      const v = await valid.check()
  //      if (!v) {
  //           return genValidator.error(valid.errors)
  //      }
  //      return genValidator.success()
  // }

  async changeSystemDate(ctx: Context) {
    const daysDiff = ctx.request.body.daysDiff;
    let valid = new comValidator.Validator(ctx.request.body, {
      daysDiff: `required|integer`,
    });
    const v = await valid.check();
    if (!v) {
      return genValidator.error(valid.errors);
    }
    return genValidator.success();
  }
}

const commonValidator: CommonValidator = new CommonValidator();
export default commonValidator;
