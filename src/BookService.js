import request from "./request";

export default class BookService {
  static getBooks(tags = []) {
    console.log(`/api/books?tags=${tags.join(',')}`)
    return request({
      url: `/api/books?tags=${tags.join(',')}`,
      method: "GET",
    });
  }
}