import classNames from 'classnames';
import React from 'react';
import style from './index.module.scss';

interface ModalHeaderProps {
  title: string;
  info?: string;
  className?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  info,
  className,
}) => {
  const classProps = classNames(style.modal__header, className);

  return (
    <div className={classProps}>
      <h5 className={style.modal__header__title}>{title}</h5>
      <p className={style.modal__header__info}>{info}</p>
    </div>
  );
};

export default ModalHeader;
