import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    this.capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    document.title = `NewsMonkey - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b62d699ceb84e7e867a32a83a2d8555&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseddata = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
   this.setState(
    {page: this.state.page + 1}
   );
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b62d699ceb84e7e867a32a83a2d8555&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      totalResults: parseddata.totalResults,
      loading: false
    });
  };

  render() {
    return (
      <div>
        <div className="container my-3">
          <div className="row">
            <h1 className="mb-3 text-center">
              NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
              Headlines
            </h1>
            <div className="text-center">
              {this.state.loading && <Spinner/>}
            </div>
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length !== this.state.totalResults}
              loader={<Spinner/>}
            >
              <div className="container">
                <div className="row">
                  {this.state.articles.map((element, idx) => {
                    return (
                      <div key={idx} className="col-md-4 mb-4 pt-2">
                        {/* <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} 
                imageUrl={element.urlToImage} newsUrl={element.url} /> */}
                        <NewsItem
                          title={element.title ? element.title : ""}
                          description={
                            element.description ? element.description : ""
                          }
                          imageUrl={element.urlToImage}
                          newsUrl={element.url}
                          author={element.author}
                          publishedTime={element.publishedAt}
                          source={element.source.name}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </InfiniteScroll>
          </div>
          {/* <div className="row">
            <div className="col-12 d-flex justify-content-between">
              <button
                disabled={this.state.page <= 1}
                type="button"
                className="btn btn-dark"
                onClick={this.handlePrevClick}
              >
                &larr; Previous
              </button>
              <button
                disabled={this.state.page + 1 > Math.ceil(this.state.totalResults)}
                type="button"
                className="btn btn-dark"
                onClick={this.handleNextClick}
              >
                Next &rarr;
              </button>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default News;
