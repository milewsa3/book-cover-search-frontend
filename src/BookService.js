import request from "./request";

export default class BookService {
  static getBooks(tags = []) {
    return request({
      url: `/api/books?tags=${tags.join(',')}`,
      method: "GET",
    });
  }

  static createBook(formData) {
    return request({
      url: `/api/createBook`,
      method: "POST",
      data: formData
    });
  }
}