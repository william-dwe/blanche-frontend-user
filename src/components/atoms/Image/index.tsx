/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import style from './index.module.scss';
import classNames from 'classnames';

type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const Image: React.FC<ImageProps> = ({
  className,
  imageClassName,
  src,
  onClick,
  alt,
  ...props
}) => {
  const classProps = classNames(className, style.image);
  const classImageProps = classNames(imageClassName, style.image__img);

  return (
    <div className={classProps} onClick={onClick} {...props}>
      <img className={classImageProps} src={src} alt={alt} />
    </div>
  );
};

export default Image;
