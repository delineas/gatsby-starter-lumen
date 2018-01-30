import React from 'react';
import Helmet from 'react-helmet';
import Post from '../components/Post';
import Episode from '../components/Episode';
import Sidebar from '../components/Sidebar';

class IndexRoute extends React.Component {
  render() {
    const items = [];
    const { title, subtitle } = this.props.data.site.siteMetadata;
    const pathPrefix = this.props.data.site.pathPrefix;
    const posts = this.props.data.allMarkdownRemark.edges;
    const episodes = this.props.data.allPodcastFeedItem.edges;
    // posts.forEach((post) => {
    //   items.push(<Post data={post} key={post.node.fields.slug} />);
    // });
    episodes.forEach((episode) => {
      items.push(<Episode data={ {episode, pathPrefix} } key={episode.node.guid} />) 
    }); 

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={subtitle} />
        </Helmet>
        <Sidebar {...this.props} />
        <div className="content">
          <div className="content__inner">
            {items}
          </div>
        </div>
      </div>
    );
  }
}

export default IndexRoute;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      pathPrefix,
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          email
          telegram
          twitter
          github
          rss
          ivoox
          itunes
        }
      }
    }
    allMarkdownRemark(
        limit: 1000,
        filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } },
        sort: { order: DESC, fields: [frontmatter___date] }
      ){
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
    allPodcastFeedItem (limit: 1000) {
      edges {
        node {
          guid,
          title,
          description,
          published,
          link
        }
      }
    }
  }
`;
