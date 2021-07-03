import React, { useState } from 'react';


const IndexNav = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div className="navs">
      <div className="container-fluid navf">
            <div className="nav-brand">
                <div className="fml">
                      FML
                </div>
            </div>
            <div className="nav-brand">
                <div className="fml2">
                   <i className="fas fa-caret-up"></i>
                </div>
            </div>
            <div className="nav-chat">
                <i className="far fa-comment-dots chat"></i>
            </div>
      </div>
      
    </div>
  );
}

export default IndexNav;