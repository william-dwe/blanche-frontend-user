import React, { useEffect, useRef, useState } from 'react';
import { IMessage, IRefundMessageResponse } from '../../../helpers/types';
import Action from './Action';
import Header from './Header';
import style from './index.module.scss';
import Messages from './Messages';
import Typing from './Typing';

interface ChatProps {
  sender_id: number;
  data: IRefundMessageResponse;
  isAction: boolean;
}

const reverseArray = (arr: IMessage[]): IMessage[] => {
  const reversedArray: IMessage[] = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversedArray.push(arr[i]);
  }
  return reversedArray;
};

const Chat: React.FC<ChatProps> = ({ sender_id, data, isAction }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data) return;
    setMessages(reverseArray(data.messages));
  }, [data]);

  useEffect(() => {
    if (!ref || !ref.current) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);

  const isClosed = Boolean(data?.details.closed_at);

  return (
    <div className={style.chat}>
      {data && <Header details={data.details} sender_id={sender_id} />}
      {!isClosed && isAction && <Action sender_id={sender_id} />}
      <Typing sender_id={sender_id} isClosed={isClosed} />
      {data && messages && (
        <Messages
          messages={messages}
          sender_id={sender_id}
          innerRef={ref}
          isClosed={isClosed}
        />
      )}
    </div>
  );
};

export default Chat;
