import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React, { useRef } from 'react';
import Arrow from '../Arrow';
import style from './index.module.scss';

type CarouselProps = {
  className?: string;
  distance?: number;
} & React.HTMLAttributes<HTMLDivElement>;

const Carousel: React.FC<CarouselProps> = ({
  className,
  distance = 400,
  children,
  ...props
}) => {
  const classProps = classNames(style.carousel, className);
  const ref = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (!ref.current) return;
    const scrollDistance = ref.current.scrollLeft + ref.current.clientWidth;
    if (scrollDistance + 1 >= ref.current.scrollWidth) {
      ref.current.scrollTo(0, 0);
      return;
    }
    ref.current.scrollLeft += distance;
  };

  const handlePrev = () => {
    if (!ref.current) return;
    if (ref.current.scrollLeft == 0) {
      ref.current.scrollTo(ref.current.scrollWidth, 0);
      return;
    }
    ref.current.scrollLeft -= distance;
  };

  return (
    <div className={style.wrapper} {...props}>
      <Arrow
        className={`${style.carousel__left} ${style.carousel__arrow}`}
        onClick={handlePrev}
      >
        <LeftOutlined />
      </Arrow>
      <div className={classProps} ref={ref}>
        <div className={style.carousel__items}>{children}</div>
      </div>
      <Arrow
        className={`${style.carousel__right} ${style.carousel__arrow}`}
        onClick={handleNext}
      >
        <RightOutlined />
      </Arrow>
    </div>
  );
};

export default Carousel;
