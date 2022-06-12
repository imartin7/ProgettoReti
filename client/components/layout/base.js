import _get         from 'lodash/get'
import styles       from "../../styles/layout/Base.module.css";
import React        from "react";

export class Base extends React.Component{

  render(){
    const { children, className } = this.props;
    return (
      <div className={`${styles.baseLayout} ${className}`}>
        {children}
      </div>
    );
  }
}

export default Base;
