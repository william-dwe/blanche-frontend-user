import React from 'react';
import { formatToHourMinute } from '../../../../../helpers/formatToDate';
import { IMessage } from '../../../../../helpers/types';
import style from './index.module.scss';

interface BubbleProps {
  message: IMessage;
  sender_id: number;
}

const Bubble: React.FC<BubbleProps> = ({ message, sender_id }) => {
  const isSender = sender_id === message.role.id;
  return (
    <div
      className={`style.bubble ${
        isSender ? style.bubble__right : style.bubble__left
      }`}
    >
      <p className={style.bubble__name}>
        {!isSender ? `${message.sender_name} (${message.role.name})` : 'Me'}
      </p>
      <p className={style.bubble__message}>{message.message}</p>
      <p className={style.bubble__time}>
        {formatToHourMinute(message.created_at.toString())}
      </p>
    </div>
  );
};

export default Bubble;
