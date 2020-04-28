import React from 'react';
import Site from '../components/Site';
import {ContentBlock, JumboHeading, Paragraph, H3} from '../components/primitives';
import {useRouteData} from 'react-static';
import {Post} from 'src/types';
import {Link} from '@reach/router';

export default () => {
  const {posts}: {posts: Post[]} = useRouteData();

  return (
    <Site>
      <ContentBlock className="bg-purple-700 " border>
        <JumboHeading className="yo" text="white">
          Blog Posts
        </JumboHeading>
      </ContentBlock>
      <ContentBlock className="flex-1">
        <br />
        <Paragraph>
          I post on an irregular basis with a focus on educational content in the space of; Cloud, DevOps, Web Apps,
          Product Creation and General Development.
        </Paragraph>
        <H3>Latest posts</H3>
        <ul className="flex flex-col items-stretch">
          {posts.map(post => (
            <li
              key={post.path}
              className="rounded mr-3 mb-3 border border-orange-700 bg-orange-100 hover:bg-orange-200 w-full">
              <Link to={`/blog/${post.path}/`}>
                <div className="py-3 px-4">
                  <div className="text-xl font-bold mb-1">{post.title}</div>
                  <div className="mb-1 opacity-75">
                    {new Intl.DateTimeFormat('en-AU', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    }).format(new Date(post.date))}
                  </div>
                  <div>{post.subtitle}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </ContentBlock>
    </Site>
  );
};
