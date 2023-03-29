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
        ],
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-catch-links`,
  ],
}

export default config
