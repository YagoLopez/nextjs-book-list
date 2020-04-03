////////////////////////////////////
// WARNING:
// THIS IS AN INFINITE SCROLL PROOF OF CONCEPT
// CODE IS DRAFT STATUS
////////////////////////////////////

import React, { PureComponent } from "react";
import Router from 'next/router';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import BooksRepository from "../Repositories/booksRepository";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

export default class Scroller extends PureComponent {

  state = {isLoading: false};

  static getInitialProps = async ({query}) => {
    const skip = query.skip || 0;
    const items_per_page = 50;
    let result, totalCount;
    try {
      result = await BooksRepository.getBooks(skip, items_per_page);
      totalCount = result.data.count;
    } catch (e) {
      console.error(e);
    }
    const {data} = result;
    return {data, totalCount, items_per_page, skip: parseInt(skip, 10)};
  };

  routeChangeStart = async () => {
    await this.setState({isLoading: true});
  };

  routeChangeEnd = async () => {
    await this.setState({isLoading: false});
    window.scrollTo(0, 0);
  };

  componentDidMount() {
    Router.events.on('routeChangeStart', this.routeChangeStart);
    Router.events.on('routeChangeComplete', this.routeChangeEnd);
    Router.events.on('routeChangeError', this.routeChangeEnd);
  }

  onNextPage = () => {
    const {skip, items_per_page} = this.props;
    return skip + items_per_page;
  };

  onPreviousPage = () => {
    const {skip, items_per_page} = this.props;
    return skip - items_per_page;
  };

  isFirstPage = () => this.props.skip <= 0;

  isLastPage = () => {
    const {skip, totalCount, items_per_page} = this.props;
    return skip + items_per_page >= totalCount;
  };

  fetchMoreData = () => {
    if (!this.isLastPage()) {
      Router.push(`/infinite-scroll?skip=${this.onNextPage()}`);
    }
  };

  render = () => {
    const {skip, totalCount, items_per_page} = this.props;
    const {isLoading} = this.state;

    return (
      <div>
        <h4>This is an infinite scroll proof of concept</h4>
        <h4>Scroll to the bottom to load a new page</h4>
        <hr />

        <button
          onClick={() => Router.push(`/infinite-scroll?skip=${this.onPreviousPage()}`)}
            disabled={this.isFirstPage()}>
          PREV
        </button>
        <button
          onClick={() => Router.push(`/infinite-scroll?skip=${this.onNextPage()}`)}
          disabled={this.isLastPage()}>
            NEXT
        </button>
        <br/>
        <Link href="/infinite-scroll?skip=0">
          <a>Go to start of listing</a>
        </Link>
        <br/>
        <Link href="/">
          <a>Back to Start</a>
        </Link>

        <hr/>
        <div>Skip param: {skip}</div>
        <div>Items per page: {items_per_page}</div>
        <div>Total count: {totalCount}</div>
        <div>Is first page: {this.isFirstPage().toString()}</div>
        <div>Is last page: {this.isLastPage().toString()}</div>
        <hr/>

        {isLoading && "LOADING..."}

        <InfiniteScroll
          dataLength={this.props.data.books}
          next={this.fetchMoreData}
          hasMore={!this.isLastPage()}
          loader={<h4 style={{color: 'red'}}>Loading More Content...</h4>}
          endMessage={<h4>No More Records</h4>}
          scrollThreshold="100%"
        >
          {this.props.data.books.map(book =>
            (
              <div key={book._id}>
                {
                  <img
                    className="book_image"
                    width="50"
                    height="50"
                    src={book.image + '.webp'}
                    alt={book.name} />
                }
                <span className="book_text">{book.name} | {book.genre}</span>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    )
  }
}
