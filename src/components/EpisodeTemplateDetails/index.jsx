import React from 'react';
import Link from 'gatsby-link';
import moment from 'moment';
import Disqus from '../Disqus/Disqus';
import slugify from 'slugify';
import linkifyHtml from 'linkifyjs/html'
import ReactAudioPlayer from 'react-audio-player';
import './style.scss';


class EpisodeTemplateDetails extends React.Component {
  render() {
    const { subtitle, author } = this.props.data.site.siteMetadata;
    const post = this.props.data.allPodcastFeedItem.edges[0].node;
    post.fields = {};
    post.fields.slug = slugify('/'+post.title, {lower: true, remove: /[$*_+~.()'"!\-:@]/g});

    const playlist = [{src: post.enclosure.url}];

    const homeBlock = (
      <div>
        <Link className="post-single__home-button" to="/">All Articles</Link>
      </div>
    );

    const commentsBlock = (
      <div>
        <Disqus postNode={post} />
      </div>
    );

    return (
      <div>
        {homeBlock}
        <div className="post-single">
          <div className="post-single__inner">
            <h1 className="post-single__title">{post.title}</h1>
            <div className="post-single__body">
              <div className="audio-container">
              <ReactAudioPlayer
                src={post.enclosure.url}
                autoPlay={false}
                controls
              />
              </div>
              <p dangerouslySetInnerHTML={{ __html: linkifyHtml(post.description).replace(/(?:\r\n|\r|\n)/g, '<br />') }} />
            </div>
            <div className="post-single__date">
              <em>Published {moment(post.published).format('DD/MM/YYYY')}</em>
            </div>
          </div>
          <div className="post-single__footer">
            <p className="post-single__footer-text">
              {subtitle}
              <a href={author.twitter} target="_blank" rel="noopener noreferrer">
                <br /> <strong>{author.name}</strong> on Twitter
              </a>
            </p>
            {commentsBlock}
          </div>
        </div>
      </div>
    );
  }
}

export default EpisodeTemplateDetails;
