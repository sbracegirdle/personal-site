import path from 'path';
// import { Post } from './types'
import React from 'react';
import fs from 'fs';
import {loadFront} from 'yaml-front-matter';

const {promisify} = require('util');
const readdirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);

// Typescript support in static.config.js is not yet supported, but is coming in a future update!

const POSTS_DIR = './src/posts';

export default {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  Document: ({Html, Head, Body, children, state: {siteData, renderMeta}}) => (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/fa/css/all.css" />
        <title>Simon Bracegirdle</title>
      </Head>
      <Body>{children}</Body>
    </Html>
  ),
  getRoutes: async () => {
    const posts /*: Post[] */ = await (await readdirAsync('./src/posts', 'utf-8'))
      .filter(f => f.endsWith('md'))
      .reduce(async (p, f) => {
        const results = await p;

        return results.concat([loadFront(await readFileAsync(path.join(POSTS_DIR, f), 'utf8'))]);
      }, Promise.resolve([]));

    return [
      {
        path: '/blog',
        getData: () => ({
          posts
        }),
        children: posts.map((post /* : Post */) => ({
          path: post.path,
          template: 'src/containers/Post',
          getData: () => ({
            post
          })
        }))
      }
    ];
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
  ]
};
