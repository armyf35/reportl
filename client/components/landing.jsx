import React from 'react';

const Landing = () => {
  const text = 'test';

  return (
    <div className="mdc-typography">
      <link
        rel="stylesheet"
        href="node_modules/material-components-web/dist/material-components-web.css"
      />
      <h1 className="mdc-typography--display1">{text}</h1>
      <button type="button" className="mdc-button mdc-button--raised mdc-button--primary">
        Press Me
      </button>
      <script src="node_modules/material-components-web/dist/material-components-web.js" />
      <script>mdc.autoInit()</script>
    </div>
  );
};

export default Landing;
