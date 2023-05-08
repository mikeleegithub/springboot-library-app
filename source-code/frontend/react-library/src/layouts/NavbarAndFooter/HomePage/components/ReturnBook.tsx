import React from 'react'
import { Link } from 'react-router-dom';
import BookModel from '../../../../models/BookModel';

// the prop is book which is going to be our book model.
// the Prop for returnBook can have all of fields that define in BookModel.
export const ReturnBook: React.FC<{book: BookModel}> = (props) => {
    return (
        /* https://ithelp.ithome.com.tw/articles/10186518 xs(手機768px以下)>sm(平板768px以上)>md(電腦版992px以上)>lg(電視1200px以上)*/
        /* Grid System中分成12個區塊，也就是螢幕畫面一行加起來總數是12。 */
        /* mb-3 {property}{sides}-{size} m - 設定 margin 的類別, b - 設定 margin-bottom, 3 - (預設) 設定 margin */
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
            <div className='text-center'>
                {/* what this is checking is it is checking to make sure that props.book.image is valid. */}
                {props.book.img ? 
                    <img 
                        src={props.book.img}
                        width='151'
                        height='233'
                        alt="book"
                    />
                    :
                    // https://welly.tw/serp-rank-optimization/what-is-img-alt  alt 當圖片消失時的顯示文字,描述圖片內容 
                    <img 
                        src={require('./../../../../Images/BooksImages/book-luv2code-1000.png')}
                        width='151'
                        height='233'
                        alt="book"
                    />
                }
                
                <h6 className='mt-2'>{props.book.title}</h6>
                <p>{props.book.author}</p>
                <Link className='btn main-color text-white' to={`checkout/${props.book.id}`}>Reserve</Link>
            </div>
        </div>
    );
}