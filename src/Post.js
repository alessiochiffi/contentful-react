import React, { Component } from 'react';
import { createClient } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Helmet from 'react-helmet';
import parse from 'html-react-parser';

import './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentWillMount() {
    const client = createClient({
      space: process.env.REACT_APP_SPACE_ID,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN
    });

    client
      // use getEntries because it does link resolution
      .getEntries({
        'sys.id[in]': this.props.match.params.id
      })
      .then(response => {
        console.log(response);
        // extract the data from the response array
        return response.items[0].fields;
      })
      .then(fields => {
        this.setState({
          data: fields
        });
      })
      .catch(console.error);
  }

  render() {
    let title;
    let content;
    let parsedContent;

    if (this.state.data) {
      title = this.state.data.title;
      console.log(this.state.data.articleText.content);
      content = documentToHtmlString(this.state.data.articleText.content[0]);
      parsedContent = parse(content);
    }

    return (
      <div className="post">
        <Helmet title={title} />
        <h1>{title}</h1>
        {parsedContent}
      </div>
    );
  }
}

export default Post;
