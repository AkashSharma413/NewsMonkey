import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title, description, imageUrl, newsUrl, author, publishedTime, source} = this.props
    return (
      <div>
        <div className="card">
        <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-primary">{source}</span>
          <img src={imageUrl ? imageUrl : "https://images.hindustantimes.com/img/2022/08/10/1600x900/Untitled_design_(27)_1660138974963_1660138996490_1660138996490.jpg"} 
          className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} Last updated {new Date(publishedTime).toGMTString()} ago</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More &raquo;</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
