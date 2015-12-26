import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container.jsx!';
import Nav from './Nav.jsx!';
import Lead from './Lead.jsx!';
import Row from './Row.jsx!';
import Feature from './Feature.jsx!';
import Footer from './Footer.jsx!';

class Site extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      page: 0,
      pages: [
        {
        'title': 'Home',
        'features': [{
          title: 'Home feature',
          active: false
        }, {
          title: 'Something else',
          active: false
        }, {
          title: 'Home Things!',
          active: false
        }]
      },
      {
        'title': 'About',
        'features': [{
          title: 'About feature',
          active: false
        }, {
          title: 'This is about!',
          active: false
        }, {
          title: 'About Stuff',
          active: false
        }]
      },
      {
        'title': 'Contact',
        'features': [{
          title: 'By Email',
          active: false
        }, {
          title: 'By Phone',
          active: false
        }, {
          title: 'By Telepathy',
          active: false
        }]
      }
    ]
  };
  this.pageUpdate = (index) => {
    this.setState({page: index})
  };
  this.featureUpdate = (index, e) => {
    e.preventDefault();
    var pages = this.state.pages;
    pages[this.state.page].features[index].active = !pages[this.state.page].features[index].active;
    this.setState({pages:pages});
  };
  }
  render () {
    var title = this.state.pages[this.state.page].title
    return (
      <Container>
        <Nav
          pages={this.state.pages.map((i)=>{return i.title})}
          update={this.pageUpdate}
          page={title}
          />
        <Lead title={title.toUpperCase()} />
        <Row>
          {this.state.pages[this.state.page].features.map(function(f, i){
            var featureUpdate = this.featureUpdate.bind(null,i)
            return (
              <Feature
                key={i}
                title={f.title}
                active={f.active}
                update={featureUpdate}
                />)
              }.bind(this))}
            </Row>
            <Footer />
          </Container>
        )
      }
    }
    export  default Site;

    ReactDOM.render(
      <Site />,
      document.getElementById('app'))
