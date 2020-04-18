import React from 'react';
import {useRouteData} from 'react-static';
import {Link} from '@reach/router';
import {Post} from 'types';
import Site from '../components/Site';

export default () => {
  const {posts}: {posts: Post[]} = useRouteData();

  return (
    <Site>
      <h1>It's blog time.</h1>
      <br />
      All Posts:
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/blog/post/${post.id}/`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </Site>
  );
};
