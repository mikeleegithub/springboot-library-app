import React from 'react';
// npm install react-router-dom@5
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/NavbarAndFooter/HomePage/HomePage';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ReviewListPage } from './layouts/BookCheckoutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './layouts/ShelfPage/ShelfPage';
import { MessagesPage } from './layouts/MessagesPage/MessagesPage';
import { ManageLibraryPage } from './layouts/ManageLibraryPage/ManageLibraryPage';
import { PaymentPage } from './layouts/PaymentPage/PaymentPage';

const oktaAuth = new OktaAuth(oktaConfig);

//all of our components are going to live, where we're going to be handling all of the routes
export const App = () => {

  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <Navbar />
        <div className='flex-grow-1'>
          <Switch>
            {/* load home page */}
            <Route path='/' exact>
              {/* if only input '/,' the url will dispaly /home */}
              <Redirect to='/home' />
              {/* call HomPage.tsx Instead of calling each component specifically by itself.  */}
              <HomePage />
            </Route>

            <Route path='/home'>
              <HomePage />
            </Route>

            <Route path='/search'>
              <SearchBooksPage />
            </Route>
            
            <Route path='/reviewlist/:bookId'>
              <ReviewListPage/>
            </Route>

            <Route path='/checkout/:bookId'>
              <BookCheckoutPage />
            </Route>

            <Route path='/login' render={
              () => <LoginWidget config={oktaConfig} />
            }
            />
            <Route path='/login/callback' component={LoginCallback} />
            <SecureRoute path='/shelf'> <ShelfPage/> </SecureRoute>
            <SecureRoute path='/messages'><MessagesPage/></SecureRoute>
            <SecureRoute path='/admin'><ManageLibraryPage/></SecureRoute>
            <SecureRoute path='/fees'><PaymentPage/></SecureRoute>
            
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
}

// export default App;
