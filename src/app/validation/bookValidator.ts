import { Context, DefaultState } from "koa";
import genValidator from "./GeneralValidator";
import comValidator from "./BaseValidator ";

export class LoanValidator {
  /**
   * validate loan create data
   * @param  {Context}         ctx
   */
  async addBook(ctx: Context) {
    const valid = new comValidator.Validator(ctx.request.body, {
      name: "required|minLength:2|maxLength:255",
      author_name: "required|minLength:2|maxLength:255",
      category: "required|minLength:2|maxLength:255",
      price: "required|decimal|min:1|max:1000000",
      total_page: "required|integer|min:0|max:30",
    });
    const v = await valid.check();
    if (!v) {
      return genValidator.error(valid.errors);
    }
    return genValidator.success();
  }

  /**
   * validate book id
   * @param  {Context}         ctx
   * @return {Promise<GeneralValidator>}
   */
  async getBook(ctx: Context) {
    const valid = new comValidator.Validator(
      { id: ctx.params.id },
      {
        id: "required|integer|loanExists",
      }
    );
    const v = await valid.check();
    if (!v) {
      return genValidator.error(valid.errors);
    }
    return genValidator.success();
  }

  async getAllBooks(ctx: Context) {
    const request = {
      limit: ctx.request.query.limit,
      offset: ctx.request.query.offset,
    };
    const valid = new comValidator.Validator(request, {
      limit: "required|integer|min:10",
      offset: "required|integer|min:0",
    });
    const v = await valid.check();
    if (!v) {
      return genValidator.error(valid.errors);
    }
    return genValidator.success();
  }

  async updateBook(ctx: Context) {
    const body = {
      ...ctx.params,
      ...ctx.request.body,
    };

    const valid = new comValidator.Validator(body, {
      name: "required|minLength:2|maxLength:255",
      author_name: "required|minLength:2|maxLength:255",
      category: "required|minLength:2|maxLength:255",
      price: "required|decimal|min:1|max:1000000",
      total_page: "required|integer|min:0|max:30",
    });

    const v = await valid.check();
    if (!v) {
      return genValidator.error(valid.errors);
    }
    return genValidator.success();
  }
  async deleteBook(ctx: Context) {
    const valid = new comValidator.Validator(ctx.request.query, {
      id: `required`,
    });
    const v = await valid.check();
    if (!v) {
      return genValidator.error(valid.errors);
    }
    return genValidator.success();
  }
}

const loanValidator: LoanValidator = new LoanValidator();
export default loanValidator;
