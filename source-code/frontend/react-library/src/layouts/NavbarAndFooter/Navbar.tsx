import { Link, NavLink } from "react-router-dom";
import { useOktaAuth } from '@okta/okta-react';
import { SpinnerLoading } from "../Utils/SpinnerLoading";

//create a new function to this Nav Bar component
export const Navbar = () => {

    const { oktaAuth, authState } = useOktaAuth();

    if (!authState) {
        return <SpinnerLoading />
    }

    const handleLogout = async () => oktaAuth.signOut();

    console.log(authState);

    return (
        /* .navbar-expand-{sm|md|lg|xl}決定在哪個斷點以上就出現漢堡式選單
            navbar-dark(白色) 文字顏色 .bg-dark 背景顏色 main-color(藍色) 欄位高*/
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-4'>
            {/* container-fluid, 所有斷點都是 width: 100%  */}
            <div className='container-fluid'>
                {/* navbar-brand 左上LOGO位置 */}
                <NavLink className='nav-link' to='/home'><span className='navbar-brand' title='Home'>Love to Read</span></NavLink>
                {/* navbar-toggler 漢堡式選單按鈕 */}
                <button className='navbar-toggler' type='button'
                    data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
                    aria-controls='navbarNavDropdown' aria-expanded='false'
                    aria-label='Toggle Navigation'
                >
                    {/* navbar-toggler-icon 漢堡式選單Icon  */}
                    <span className='navbar-toggler-icon'></span>
                </button>
                {/* collapse.navbar-collapse 用於外層中斷點群組和隱藏導覽列內容
                選單項目&漢堡式折疊選單 */}
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            {/* 滑鼠移過去變灰 */}
                            <NavLink className='nav-link' to='/home'>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/search'>Search Books</NavLink>
                        </li>
                        {authState.isAuthenticated &&
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/shelf'>Shelf</NavLink>
                            </li>
                        }
                        {authState.isAuthenticated &&
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/fees'>Pay fees</NavLink>
                            </li>
                        }
                        {authState.isAuthenticated && authState.accessToken?.claims?.userType === 'admin' &&
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/admin'>Admin</NavLink>
                            </li>
                        }
                    </ul>
                    {/* ms-auto class adds space from the left side of the div and ms stands for margin-start. */}
                    <ul className='navbar-nav ms-auto'>
                        {!authState.isAuthenticated ?
                            <li className='nav-item m-1'>
                                {/* btn btn-outline-light sign btn的顏色 */}
                                <Link type='button' className='btn btn-outline-light' to='/login'>Sign in</Link>
                            </li>
                            :
                            <li>
                                <button className='btn btn-outline-light' onClick={handleLogout}>Logout</button>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}