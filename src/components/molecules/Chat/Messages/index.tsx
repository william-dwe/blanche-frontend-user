import React from 'react';
import { IMessage } from '../../../../helpers/types';
import Bubble from './Bubble';
import style from './index.module.scss';

interface MessagesProps {
  messages: IMessage[];
  sender_id: number;
  innerRef: React.RefObject<HTMLDivElement>;
  isClosed: boolean;
}

const Messages: React.FC<MessagesProps> = ({
  messages,
  sender_id,
  innerRef: innerRef,
  isClosed,
}) => {
  return (
    <div
      className={`${style.messages} ${
        !isClosed ? '' : style.messages__no_action
      }`}
      ref={innerRef}
    >
      {messages.map((message, index) => {
        return <Bubble message={message} key={index} sender_id={sender_id} />;
      })}
      {isClosed && (
        <p className={style.messages__info}>
          This conversation has been closed.
        </p>
      )}
    </div>
  );
};

export default Messages;
