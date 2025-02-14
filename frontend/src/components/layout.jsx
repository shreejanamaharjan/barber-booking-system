import React, { Children } from 'react';

const layout = () => {
  return (
    <div className="main">
        <div className="layout">
            <div className="sidebar">
                <div className="logo">Logo</div>
                <div className="menu">Menu</div>
            </div>
            <div className="content">
            <div className="header">Header</div>
            <div className="body">{Children}</div>
        </div>
    </div>
    </div>
  );
};

export default layout;
