var React = require('react'),
    CodeMirror = require('react-code-mirror');

require('codemirror/mode/markdown/markdown');

var App = React.createClass({

  displayName: 'App',

  render: function() {
    return (
      <CodeMirror className='editor'
                  mode='markdown'
                  theme='hazza'
                  autoFocus={true}
                  lineWrapping={true}
                  lineNumbers={false} />
    );
  }

});

React.render(<App />, document.getElementById('app'));
