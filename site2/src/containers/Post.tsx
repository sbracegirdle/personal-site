import React from 'react';
import {useRouteData} from 'react-static';
import {Post} from '../types';
import Site from '../components/Site';
import {
  ContentBlock,
  JumboHeading,
  Paragraph,
  H1,
  H2,
  H3,
  H4,
  ExternalLink,
  Link,
  ListItem,
  InlineCode,
  Code
} from '../components/primitives';
import ReactMarkdown from 'react-markdown';

const renderers = {
  paragraph: Paragraph,
  heading: (props: any) => {
    if (props.level === 1) {
      return <H1>{props.children}</H1>;
    } else if (props.level === 2) {
      return <H2>{props.children}</H2>;
    } else if (props.level === 3) {
      return <H3>{props.children}</H3>;
    } else {
      return <H4>{props.children}</H4>;
    }
  },
  link: ExternalLink,
  listItem: ListItem,
  inlineCode: InlineCode,
  code: Code
};

export default () => {
  const {post}: {post: Post} = useRouteData();

  return (
    <Site>
      <ContentBlock className="bg-purple-700 " border>
        <JumboHeading className="yo" text="white">
          {post.title}
        </JumboHeading>
        <h3 className="text-white text-center font-bold my-2 text-xl">{post.subtitle}</h3>
        <p className="text-white text-center my-2">
          {new Intl.DateTimeFormat('en-AU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }).format(new Date(post.date))}
        </p>
      </ContentBlock>
      <ContentBlock className="flex-1 py-6">
        <ReactMarkdown source={post.__content} renderers={renderers} />
        <div className="my-4">
          <Link to="/blog/">
            <i className="fas fa-angle-left mr-2"></i>
            <span>Back to Blogs</span>
          </Link>
        </div>
      </ContentBlock>
    </Site>
  );
};
