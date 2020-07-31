import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import backImg from './images/back.png';

export default function Header(props) {
  const { title, backHandle } = props;
  return (
    <header>
      <img id="back" src={backImg} alt={title} onClick={() => backHandle()} />
      <div className="tit">{title}</div>
    </header>
  );
}
Header.propTypes = {
  title: PropTypes.string,
  backHandle: PropTypes.func
};
