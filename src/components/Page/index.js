import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

export default function Page(props) {
  const {
    title, subTitle, spacing, className, children, footer
  } = props;
  return (
    <section className={`page ${className}`}>
      <div className="page__hd">
        <h1 className="page__title">{title}</h1>
        <p className="page__desc">{subTitle}</p>
      </div>
      <div className={`page__bd ${spacing ? 'page__bd_spacing' : ''}`}>{children}</div>
      {footer ? <div className="page__ft">{footer}</div> : false}
    </section>
  );
}
Page.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  spacing: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any,
  footer: PropTypes.object
};
