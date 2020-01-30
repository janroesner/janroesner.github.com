module.exports = {
  siteMetadata: {
    title: `Thoughts some might not like`,
    name: `Jan Roesner`,
    siteUrl: `https://janroesner.github.io`,
    description: `A collection of things that can not be unsaid…`,
    hero: {
      heading: `Critical Thinking`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/RoesnerJan`,
      },
      {
        name: `github`,
        url: `https://github.com/janroesner`,
      },
      {
        name: `instagram`,
        url: `https://instagram.com/janroesner`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/janroesner`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
  ],
};
