import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import style from './index.module.scss';

interface CountdownProps {
  duration: number;
  className?: string;
  callback?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({
  duration,
  className,
  callback,
}) => {
  const [seconds, setSeconds] = useState(duration % 60);
  const [minutes, setMinutes] = useState(Math.floor(duration / 60));

  const classProps = classNames(style.countdown, className);
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
      if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        callback && callback();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <div className={classProps}>
      <p className={style.countdown__time}>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </p>
    </div>
  );
};

export default Countdown;
