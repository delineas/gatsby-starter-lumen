import React from 'react';
import Helmet from 'react-helmet';
import EpisodeTemplateDetails from '../components/EpisodeTemplateDetails';
import linkifyHtml from 'linkifyjs/html'


class EpisodeTemplate extends React.Component {
  render() {
    const { title, subtitle } = this.props.data.site.siteMetadata;
    const post = this.props.data.allPodcastFeedItem;
    const postTitle = post.edges[0].node.title;
    const description = post.edges[0].node.description;
    //const description = postDescription !== null ? postDescription : subtitle;

    return (
      <div>
        <Helmet>
          <title>{`${postTitle} - ${title}`}</title>
          <meta name="description" content={description} />
        </Helmet>
        <EpisodeTemplateDetails {...this.props} />
      </div>
    );
  }
}

export default EpisodeTemplate;

export const pageQuery = graphql`
  query currentPostQuery($guid: String!) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        author {
          name
          twitter
        }
      }
    }
    allPodcastFeedItem (limit: 1, filter: { guid: { eq: $guid } }){
      edges {
        node {
          guid,
          title,
          description,
          published,
          link,
          enclosure {
            url,
            filesize,
            type
          }
        }
      }
    }
  }
`;