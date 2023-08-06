import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  pathPrefix: process.env.GATSBY_PATH_PREFIX || `/`,
  siteMetadata: {
    title: `cat logic`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-local-search`,
      options: {
        name: `pages`,
        engine: `flexsearch`,
        query: `
          query LocalSearch {
            allFile {
              edges {
                node {
                  name
                  childMarkdownRemark {
                    rawMarkdownBody
                  }
                }
              }
            }
          }
        `,
        ref: `name`,
        normalizer: ({ data }) =>
          data.allFile.edges.map(({ node }) => ({
            name: node.name,
            rawMarkdownBody: node.childMarkdownRemark?.rawMarkdownBody,
          })),
      },
    }
  ],
}

export default config
