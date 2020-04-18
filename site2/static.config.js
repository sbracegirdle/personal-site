import axios from 'axios';
import path from 'path';
// import { Post } from './types'
import React from 'react';

// Typescript support in static.config.js is not yet supported, but is coming in a future update!

export default {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  Document: ({Html, Head, Body, children, state: {siteData, renderMeta}}) => (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="./fa/css/all.css" />
        <title>Simon Bracegirdle</title>
      </Head>
      <Body>{children}</Body>
    </Html>
  ),
  getRoutes: async () => {
    // const {data: posts} /* :{ data: Post[] } */ = await axios.get('https://jsonplaceholder.typicode.com/posts');
    // return [
    //   {
    //     path: '/blog',
    //     getData: () => ({
    //       posts
    //     }),
    //     children: posts.map((post /* : Post */) => ({
    //       path: `/post/${post.id}`,
    //       template: 'src/containers/Post',
    //       getData: () => ({
    //         post
    //       })
    //     }))
    //   }
    // ];
    return [];
  },
  plugins: [
    'react-static-plugin-typescript',
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages')
      }
    ],
    require.resolve('react-static-plugin-reach-router')
    // require.resolve('react-static-plugin-sitemap')
  ]
};
