import { useEffect, useState } from "react";
import { setCommentRange } from "typescript";
import BookModel from "../../models/BookModel";
import { Pagination } from "../Utils/Pagination";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBooks";


export const SearchBooksPage = () => {
  // create three different pieces of state, which is going to be our books is loading and HTTP error
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [categorySelection, setCategorySelection] = useState("Book category"); //display user selection

  useEffect(() => { //useEffect可以觸發多次, 再第一次創建component時他就會被調用
    const fetchBooks = async () => {
      const baseUrl: string = `${process.env.REACT_APP_API}/books`;
      //only want to show nine books on our carousel
      let url: string = ""; //從第一頁, 共獲取5本書

      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
      } else {
        let searchWithPage = searchUrl.replace("<pageNumber>", `${currentPage - 1}`);
        url = baseUrl + searchWithPage;
      }

      //We then want to get our response by a waiting,
      // which is an asynchronous call.
      // fetch(): is a JavaScript method that is an easy way to fetch resources.(data) 
      // asynchronously across a network. In our case calling the SpringBoot API endpoint
      const response = await fetch(url);//fetch all of our data from our spring boot applicaiton

      //If we successfully got the data we're looking for
      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      // turn the response into a response JSON, and then we're going to go and grab the response data within the embedded books.
      const responseJson = await response.json(); //await 是asynchronous function
      const responseData = responseJson._embedded.books; //Grab the data out of the JSON within the embedded books area.
      //  set our total amount of books and our set total pages by looking at the page object that comes back from API response
      setTotalAmountOfBooks(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      //We then create a new variable of loaded books that we push a whole bunch of the new data in
      const loadedBooks: BookModel[] = [];

      //go through each book and for each book in response data. We want to pass that in as a loaded book so we can save for const key and response data.
      for (const key in responseData) {
        loadedBooks.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }

      setBooks(loadedBooks);
      setIsLoading(false);
    };
    fetchBooks().catch((error: any) => {
      // if we see an error, we then also turn off the loading and set an HTTP error.
      setIsLoading(false);
      setHttpError(error.message);
    })
    //  each time this useEffect gets kicked off, scroll the page to the top.
    window.scrollTo(0, 0);
    //search means that want to useEffect to get kicked off every time the current page changes due to pagination or if the search URL changes, we want the use effect to get kicked off again because we're going to have an additional query parameter..
  }, [currentPage, searchUrl]);//each time current page changes, we want to recall this hook

  if (isLoading) {
    return (
      <SpinnerLoading /> //call SpinnerLoading component
    )
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    )
  }

  const searchHandleChange = () => {
    // every time this search handle change is called, we're going to set the current page to one.
    setCurrentPage(1);
    // search is the state that gets changed on each click.
    if (search === "") {
      setSearchUrl("");
    } else {
      // set the new setSearchURL to the searched item with that search product.
      setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`)
    }
    setCategorySelection("Book category") //reset the category bar
  }

  const categoryField = (value: string) => {
    setCurrentPage(1);
    if (
      value.toLowerCase() === "fe" ||
      value.toLowerCase() === "be" ||
      value.toLowerCase() === "data" ||
      value.toLowerCase() === "devops"
    ) {
      setCategorySelection(value);
      // setSearchUrl is going to kick off our useEffect to recall an API.
      setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`)
    } else {
      setCategorySelection("All");
      setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`)
    }
  }

  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ?
    booksPerPage * currentPage : totalAmountOfBooks;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    // 87. React Project - Search Books Page - DOM
    // filling in all of the DOM that we're going to need to continue our search page.
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input className="form-control me-2" type="search"
                  placeholder="Search" aria-labelledby="Search"
                  // capture the event
                  onChange={e => setSearch(e.target.value)} />
                <button className="btn btn-outline-success"
                  // calling the searchHandleChange
                  onClick={() => searchHandleChange()}>
                  Search
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button"
                  id="dropdownMenuButton1" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  {categorySelection}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li onClick={() => categoryField("All")}>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li onClick={() => categoryField("FE")}>
                    <a className="dropdown-item" href="#">
                      Front End
                    </a>
                  </li>
                  <li onClick={() => categoryField("BE")}>
                    <a className="dropdown-item" href="#">
                      Back End
                    </a>
                  </li>
                  <li onClick={() => categoryField("Data")}>
                    <a className="dropdown-item" href="#">
                      Data
                    </a>
                  </li>
                  <li onClick={() => categoryField("Devops")}>
                    <a className="dropdown-item" href="#">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {totalAmountOfBooks > 0 ?
            <>

              <div className="mt-3">
                <h5>Number of results: ({totalAmountOfBooks})</h5>
              </div>
              <p>
                {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:
              </p>
              {/*  SearchBook that is rendering all of the books that we're going to be dynamically passing in from our search books page */}
              {books.map(book => (
                <SearchBook book={book} key={book.id} />
              ))}
            </>
            :
            <div className="m-5">
              <h3>
                Can't find what you are looking for?
              </h3>
              <a type="button" className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
                href="#">Library Services</a>
            </div>
          }
          {/* total pages is greater than one is checking to see if total pages is greater than one and(&&) then render this. */}
          {totalPages > 1 &&
            <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
          }
        </div>
      </div>
    </div>
  );
}