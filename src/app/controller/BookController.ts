import { Context } from "koa";
import logger from "../../logger";
import httpConstants from "../constant/httpConstants";
import bookService from "../service/BookService";
import { Book } from "../model/Book";
import apiErrorHandler from "../utils/ApiErrorHandler";
import BookValidator from "../validation/bookValidator";

// noinspection DuplicatedCode
class BookController {
  constructor() {}

  async getBook(ctx: Context) {
    try {
      let validation = await BookValidator.getBook(ctx);
      if (!validation.isValid) {
        ctx.status = validation.status;
        ctx.body = validation.data;
        return;
      }

      logger.info(
        `Controller : getBook, Request-Body : ${JSON.stringify(ctx.params)}`
      );

      // getting the book
      let book: Book = await bookService.getBook(ctx);
      ctx.status = httpConstants.HTTP_SUCCESS_OK;
      ctx.body = book;
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);

      logger.error(`Controller : getBook, Error : ${JSON.stringify(error)}`);
    }
  }

  async getAllBooks(ctx: Context) {
    try {
      let validation = await BookValidator.getAllBooks(ctx);
      if (!validation.isValid) {
        ctx.status = validation.status;
        ctx.body = validation.data;
        return;
      }
      logger.info(
        `Controller : getAllBooks, Request-Body : ${JSON.stringify(ctx.params)}`
      );

      let books: Array<Book> = await bookService.getAllBooks(ctx);
      ctx.status = httpConstants.HTTP_SUCCESS_OK;
      ctx.body = books;
      logger.info(
        `Controller : getAllBooks, Response-Body : ${JSON.stringify(ctx.body)}`
      );
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);

      logger.error(
        `Controller : getAllBooks, Error : ${JSON.stringify(error)}`
      );
    }
  }

  /**
   * validate and store book and book details
   * @param {Context} ctx
   */
  async addBook(ctx: Context) {
    try {
      const validation = await BookValidator.addBook(ctx);
      if (!validation.isValid) {
        ctx.status = validation.status;
        ctx.body = validation.data;
        return;
      }
      logger.info(
        `Controller : addBook, Request-Body : ${JSON.stringify(
          ctx.request.body
        )}`
      );

      // adding the book
      await bookService.addBook(ctx);

      ctx.status = httpConstants.HTTP_CREATED;
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);
      logger.error(`Controller : addBook, Error : ${JSON.stringify(error)}`);
    }
  }
  async updateBook(ctx: Context) {
    try {
      let validation = await BookValidator.updateBook(ctx);
      if (!validation.isValid) {
        ctx.status = validation.status;
        ctx.body = validation.data;
        return;
      }

      logger.info(
        `Controller : updateBook, Request-Body : ${JSON.stringify(
          ctx.request.body
        )}`
      );
      // logger.info(`Request-Params : ${JSON.stringify(ctx.params)}`);

      // adding the book
      let updatedCount = await bookService.updateBook(ctx);

      if (!updatedCount) {
        ctx.status = httpConstants.HTTP_CONFLICT;
        ctx.body = { error: "book does not exist." };
      } else {
        ctx.status = httpConstants.HTTP_SUCCESS_OK;
      }
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);

      logger.error(`Controller : updateBook, Error : ${JSON.stringify(error)}`);
    }
  }

  async deleteBook(ctx: Context) {
    try {
      let validation = await BookValidator.deleteBook(ctx);
      if (!validation.isValid) {
        ctx.status = validation.status;
        ctx.body = validation.data;
        return;
      }

      logger.info(
        `Controller : deleteBook, Request-Body : ${JSON.stringify(
          ctx.request.body
        )}`
      );
      logger.info(`Request-Params : ${JSON.stringify(ctx.params)}`);

      // adding the book
      await bookService.deleteBook(ctx);

      ctx.status = httpConstants.HTTP_NO_CONTENT;
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);

      logger.error(`Controller : deleteBook, Error : ${JSON.stringify(error)}`);
    }
  }
}

const bookController: BookController = new BookController();
export default bookController;
