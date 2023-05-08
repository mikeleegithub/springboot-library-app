import { ReturnBook } from "./ReturnBook";
// useState is going to be our state so we can dynamically create state within our application
// useEffect is going to be our second hook where we're able to call some kind of function or API.
import { useEffect, useState } from "react"; //npm install react react-dom //npm install --save-dev @types/react @types/react-dom
import BookModel from "../../../../models/BookModel";
import { SpinnerLoading } from "../../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";

export const Carousel = () => {
    //  setting our books from API(共9本書)
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //將function都寫入
    useEffect(() => { //useEffect可以觸發多次, 再第一次創建component時他就會被調用
        const fetchBooks = async () => {
            const baseUrl: string = `${process.env.REACT_APP_API}/books`;
            //only want to show nine books on our carousel
            const url: string = `${baseUrl}?page=0&size=9`; //從第一頁, 共獲取九本書
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
            // Stop loading the app once call is complete
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);
    //將array保留為空，這意味著如果此應用程式中有任何更改或這個元件，這個使用效果不會再被調用，因為我們只需要九個static state from the API

    //然後每次這個陣列中的某些東西發生變化時, 在這個陣列中，我們可以輸入variables of state. 如果這個array的某些狀態或內部的某些東西發生變化，它將重新觸發useEffect.carousel對於useEffect來說是一個好例子
    //如果某種類型的state發生任何變化，我們現在可以重新調用 API 進行

    //82. React Project - Home Page - Loading and Error Renders
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

    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            {/* data-bs-interval="" 以更改自動循環至下一個項目的延遲時間 */}
            {/* className=d-none d-lg-block: hide on screens smaller than lg */}
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        {/* https://bootstrap5.hexschool.com/docs/5.0/utilities/flex/  輪播的圖片 書名 Reserve btn會在中間*/}
                        <div className='row d-flex justify-content-center align-items-center'>
                            {/* /* array to loop thro, .slice會grab最前面的3本書(總共9本) */}
                            {books.slice(0, 3).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))
                            }
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(3, 6).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))
                            }
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(6, 9).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))
                            }
                        </div>
                    </div>
                </div>
                <button className='carousel-control-prev' type='button'
                    data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                    <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Previous</span>
                </button>
                <button className='carousel-control-next' type='button'
                    data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                    <span className='carousel-control-next-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Next</span>
                </button>
            </div>

            {/* Mobile */}
            {/* d-lg-none hide on lg and wider screens */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <ReturnBook book={books[7]} key={books[7].id} />
                </div>
            </div>
            <div className='homepage-carousel-title' mt-3>
                <Link className='btn btn-outline-secondary btn-lg' to='/search'>View More</Link>
            </div>
        </div>


    );

}