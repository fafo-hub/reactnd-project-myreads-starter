import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import './assets/css/loader.css';
import * as BooksAPI from './components/BooksAPI';
import BookShelf from './components/BookShelf';
import BookSearch from './components/Search';

class App extends Component {

  state = {
		books: [],
		isLoaded: false
	};

	componentDidMount() {
		BooksAPI.getAll().then(res => {
			this.setState({
				books: res,
				isLoaded: true
			});
		});
  }
  
  changeShelf = (book, event) => {
		return new Promise(resolve => {
			BooksAPI.update(book, event.target.value).then(res => {
				BooksAPI.getAll().then(res => {
					this.setState(
						{
							books: res
						},
						resolve(res)
					);
				});
			});
		});
	};


  render() {

    const { isLoaded, books } = this.state;
    return (
      <div className="app">
        
        <Route
					exact
					path="/"
					render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    key="Currently Reading"
                    shelfName="Currently Reading"
                    appLoaded={isLoaded}
                    fBooks={books.filter(book => book.shelf === 'currentlyReading')}
                    onChangeShelf={this.changeShelf}
                  />
                  <BookShelf
                    key="Want to Read"
                    shelfName="Want to Read"
                    appLoaded={isLoaded}
                    fBooks={books.filter(book => book.shelf === 'wantToRead')}
                    onChangeShelf={this.changeShelf}
                  />
                  <BookShelf
                    key="Read"
                    shelfName="Read"
                    appLoaded={isLoaded}
                    fBooks={books.filter(book => book.shelf === 'read')}
                    onChangeShelf={this.changeShelf}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add Book</Link>
              </div>
            </div>
          )}/>

          <Route
            path="/search"
            render={() => <BookSearch shelvedBooks={books} onChangeShelf={this.changeShelf} />}
				  />

      </div>
    );
  }
}

export default App;
