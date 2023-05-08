//我們需要添加後端 Spring 啟動應用程式正在尋找的變數和屬性對於一本書以及資料庫正在尋找一本書的內容。
//因此，當我們從 spring 啟動應用程式調用 API 時，我們可以輕鬆地將其轉換為TypeScript object
class BookModel {
    id: number;
    title: string;
    author?: string;//optional variable, this could be null
    description?: string;
    copies?: number;
    copiesAvailable?: number;
    category?: string;
    img?: string;

    constructor (id: number, title: string, author: string, description: string,
      copies: number, copiesAvailable: number, category: string, img: string) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.copiesAvailable = copiesAvailable;
        this.category = category;
        this.img = img;
      }


}

export default BookModel;

