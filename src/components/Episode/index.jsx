import React from 'react';
import Link from 'gatsby-link';
import moment from 'moment';
import slugify from 'slugify';
import './style.scss';

class Episode extends React.Component {
  render() {
    
    const { guid, title, description, published, link } = this.props.data.episode.node;
    const slug = slugify('/'+title, {lower: true, remove: /[$*_+~.()'"!\-:@]/g});

    return (
      <div className="post">
        <div className="post__meta">
          <time className="post__meta-time" dateTime={moment(published).format('MMMM D, YYYY')}>
            {moment(published).format('DD/MM/YYYY')}
          </time>
          <span className="post__meta-divider" />
        </div>
        <h2 className="post__title">
          <Link className="post__title-link" to={slug}>{title}</Link>
        </h2>
        
        <Link className="post__readmore" to={slug}>Read</Link>
      </div>
    );
  }
}
// <p className="post__description">{description}</p>

export default Episode;
