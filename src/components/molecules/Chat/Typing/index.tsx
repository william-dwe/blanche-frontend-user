import { SendOutlined } from '@ant-design/icons';
import { message } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useLazyGetMessageRefundRequestQuery,
  usePostMessageRefundRequestMutation,
} from '../../../../app/features/refund/refundApiSlice';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import { Button, Input } from '../../../atoms';
import style from './index.module.scss';
import { MdRefresh } from 'react-icons/md';
import {
  useLazyMerchantGetMessageRefundRequestQuery,
  useMerchantPostMessageRefundRequestMutation,
} from '../../../../app/features/merchant/refundApiSlice';

interface TypingProps {
  isClosed: boolean;
  sender_id: number;
}

const Typing: React.FC<TypingProps> = ({ isClosed, sender_id }) => {
  const [sendMessage, { isLoading }] = usePostMessageRefundRequestMutation();
  const [merchantSendMessage, { isLoading: isLoadingMerchant }] =
    useMerchantPostMessageRefundRequestMutation();
  const [newMessage, setNewMessage] = useState('');
  const [getMessages, { isFetching }] = useLazyGetMessageRefundRequestQuery();
  const [merchantGetMessages, { isFetching: isFetchingMerchant }] =
    useLazyMerchantGetMessageRefundRequestQuery();
  const params = useParams();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!newMessage) return;
    try {
      setNewMessage('');
      const body = {
        id: Number(params.id) || 0,
        message: newMessage,
      };
      switch (sender_id) {
        case 2:
          await merchantSendMessage(body).unwrap();
          break;
        case 3:
          await sendMessage(body).unwrap();
          break;
      }
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
      setNewMessage('');
    }
  };

  const handleGetMessages = async () => {
    try {
      switch (sender_id) {
        case 2:
          await merchantGetMessages(Number(params.id) || 0).unwrap();
          break;
        case 3:
          await getMessages(Number(params.id) || 0).unwrap();
          break;
      }
      message.success('Messages refreshed');
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  return (
    <div className={style.typing}>
      <Button
        icon={<MdRefresh size={32} />}
        className={style.typing__refresh}
        onClick={handleGetMessages}
        loading={isFetching || isFetchingMerchant}
        disabled={isClosed}
      />
      <Input
        className={style.typing__input}
        placeholder="Type your response here"
        onChange={onChange}
        value={newMessage}
        onPressEnter={handleSendMessage}
        disabled={isClosed}
      />
      <Button
        onClick={handleSendMessage}
        className={style.typing__btn}
        type="primary"
        shape="circle"
        loading={isLoading || isLoadingMerchant}
        disabled={isClosed || isLoading || isLoadingMerchant || !newMessage}
      >
        Send
        <SendOutlined />
      </Button>
    </div>
  );
};

export default Typing;
