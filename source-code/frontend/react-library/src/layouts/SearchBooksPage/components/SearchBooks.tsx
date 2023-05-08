// each book individually that gets returned back to search books
// and is going to have all of the books because it's going to map through and call search book multiple different times
import { Link } from "react-router-dom"
import BookModel from "../../../models/BookModel"
// when we create the search books page, we are getting the book model that's going to appear on each search book component.
export const SearchBook: React.FC<{book: BookModel}> = (props) => {
    return (
      <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
        <div className="row g-0">
          <div className="col-md-2">
            <div className="d-none d-lg-block">
              {props.book.img ?
                <img src={props.book.img}
                  width="123"
                  height="196"
                  alt="Book"
                />
                :
                <img src={require("../../../Images/BooksImages/book-luv2code-1000.png")}
                  width="123"
                  height="196"
                  alt="Book"
                /> 
            }
            </div>
            {/* The img wiil display in Mobile mode  */}
            <div className="d-lg-none d-flex justify-content-center
            align-items-center">
            {props.book.img ?
                <img src={props.book.img}
                  width="123"
                  height="196"
                  alt="Book"
                />
                :
                <img src={require("../../../Images/BooksImages/book-luv2code-1000.png")}
                  width="123"
                  height="196"
                  alt="Book"
                /> 
            }
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">
                  {props.book.author}
              </h5>
              <h4>
                  {props.book.title}
              </h4>
              <p className="card-text">
                  {props.book.description}
              </p>
            </div>
          </div>
          <div className="col-m-4 d-flex justify-content-center align-items-center">
            {/* we use ``, Because we're going to be passing in the proper book ID which is the primary key within the database. 
            We are also sending that over through the API. 
            We are attaching that ID of the primary key from the database to this slash checkout as the path parameter */}
            <Link className="btn btn-md main-color text-white" to={`/checkout/${props.book.id}`}>
                View Details
            </Link>
          </div>
        </div>
      </div>
    )
}