var React = require('react'),
    Syntaxarea = require('react-syntaxarea');

var rules = {
  heading: /(#+)(.*)/,
  link: /\[([^\[]+)\]\(([^\)]+)\)/,
  bold: /(\*\*|__)(.*?)\1/,
  emphasis: /(\*|_)(.*?)\1/,
  list: /\n\*(.*)/,
  whitespace: /\s+/,
  other: /\S+/
}

var App = React.createClass({

  displayName: 'App',

  render: function() {
    return (
      <Syntaxarea rules={rules} />
    );
  }

});

React.render(<App />, document.getElementById('app'));
