
import React from 'react';

import CodeMirror from 'react-codemirror';
require('codemirror/mode/sql/sql');

// console.log('codemirror: x:', x);

class SQLEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sql: props.sql,
    }
  }

  updateCode = (newCode) => {
    console.log('newCode:', newCode);
  }

  render() {
    const { sql } = this.state;
    const options = {
      // lineNumbers: true,
      lineWrapping: true,
      mode: 'text/x-pgsql',
      inputStyle: 'contenteditable',
      // fixedGutter: false,
    };
    return (
      <div>
        <h4>SQL Editor</h4>
        <CodeMirror value={sql} onChange={this.updateCode} options={options} autoFocus={true} />
      </div>
    )
  }

}

export default SQLEditor;
