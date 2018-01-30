module.exports = {
  siteMetadata: {
    url: 'https://webreactiva.com/',
    title: 'Web Reactiva',
    subtitle: 'Demostración de la creación de un site estático con Gatsby y un Feed de Podcast',
    copyright: '',
    disqusShortname: 'delineas-github-io',
    menu: [
      {
        label: 'Home',
        path: '/'
      },
      {
        label: 'Acerca de',
        path: '/about/'
      },
      {
        label: 'Contacto',
        path: '/contact/'
      }
    ],
    author: {
      name: 'Web Reactiva',
      email: '#',
      telegram: 'https://t.me/webreactiva',
      twitter: 'https://twitter.com/webreactiva',
      github: 'https://github.com/delineas',
      rss: 'https://www.danielprimo.io/podcast/feed.xml',
      ivoox: 'http://www.ivoox.com/podcast-web-reactiva_sq_f1454279_1.html',
      itunes: 'https://itunes.apple.com/es/podcast/web-reactiva/id1285264897?mt=2',
    }
  },
  pathPrefix: '/gatsby-starter-lumen-podcast',
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-feed',
      options: {
        feedURL: 'https://www.danielprimo.io/podcast/feed.xml'
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: { trackingId: '' }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                url
                title
                subtitle
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => (
              allMarkdownRemark.edges.map(edge =>
                Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.url + edge.node.fields.slug,
                  guid: site.siteMetadata.url + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }]
                }))
            ),
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
                ) {
                  edges {
                    node {
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        layout
                        draft
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`roboto\:400,400i,500,700`]
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
            {
              site {
                siteMetadata {
                  url
                }
              }
              allSitePage(
                filter: {
                  path: { regex: "/^(?!/404/|/404.html|/dev-404-page/)/" }
                }
              ) {
                edges {
                  node {
                    path
                  }
                }
              }
          }`,
        output: '/sitemap.xml',
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map((edge) => {
            return {
              url: site.siteMetadata.url + edge.node.path,
              changefreq: 'daily',
              priority: 0.7
            };
          })
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss-sass'
  ]
};
