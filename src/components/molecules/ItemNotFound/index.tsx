import classNames from 'classnames';
import React from 'react';
import { Card, Image } from '../../atoms';
import style from './index.module.scss';

interface ItemNotFoundProps {
  className?: string;
  imageClassName?: string;
  title: string;
  body?: string;
  src?: string;
}

const ItemNotFound: React.FC<ItemNotFoundProps> = ({
  className,
  imageClassName,
  title,
  body = '',
  src = '/assets/svg/item-not-found.svg',
}) => {
  const classProps = classNames(style.inf, className);
  const imageClassProps = classNames(style.inf__image, imageClassName);
  return (
    <Card className={classProps}>
      <Image src={src} alt="not found" className={imageClassProps} />
      <div className={style.inf__content}>
        <p className={style.inf__content__title}>{title}</p>
        <p className={style.inf__content__body}>{body}</p>
      </div>
    </Card>
  );
};

export default ItemNotFound;
