import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { createClient } from 'contentful';
import Card from '../components/Card';

class Home extends Component {
  state = {
    posts: null
  };

  componentWillMount() {
    const client = createClient({
      space: process.env.REACT_APP_SPACE_ID,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN
    });

    client
      .getContentTypes()
      .then(response => {
        const postType = response.items.find(item => item.name === 'Article');
        return postType.sys.id;
      })
      .then(id => {
        client
          .getEntries({
            content_type: id
          })
          .then(response => {
            this.setState({
              posts: response.items
            });
          })
          .catch(console.error);
      })
      .catch(console.error);
  }

  render() {
    let imgSrc = null;
    return (
      <div className="cards">
        <Helmet title="Contentful Static React" />
        {this.state.posts &&
          this.state.posts.map(post => {
            if (post.fields.articleImage) {
              imgSrc = post.fields.articleImage.fields.file.url;
            }
            return (
              <div className="container">
                <div className="row">
                  <div className="col l4 s12">
                  <Card
                    key={post.sys.id}
                    to={post.sys.id}
                    src={imgSrc}
                    title={post.fields.title}
                  />
                </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default Home;
