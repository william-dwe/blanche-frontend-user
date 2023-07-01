import { message } from 'antd';
import React from 'react';
import { useRequestResetPasswordMutation } from '../../../../app/features/auth/authApiSlice';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import { Button } from '../../../atoms';
import style from './index.module.scss';

interface SendVerificationProps {
  handleNext: () => void;
  changeRetryIn: (retryIn: number) => void;
}

const SendVerification: React.FC<SendVerificationProps> = ({
  handleNext,
  changeRetryIn,
}) => {
  const [sendVerification, { isLoading }] = useRequestResetPasswordMutation();

  const handleSend = async () => {
    try {
      const data = await sendVerification().unwrap();
      changeRetryIn(data.retry_in);
      handleNext();
      if (data.is_email_sent) {
        message.success('Verification code has been sent to your email.');
      } else {
        message.warning(
          'Verification code has already been sent to your email before. Please check carefully.',
        );
      }
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };
  return (
    <div className={style.sv}>
      <h1 className={style.sv__title}>Change Password</h1>
      <p className={style.sv__info}>
        Are you sure you want to change your password? A verification code will
        be sent to your email.
      </p>
      <Button
        className={style.sv__button}
        onClick={handleSend}
        loading={isLoading}
        type="primary"
        block
      >
        Send
      </Button>
    </div>
  );
};

export default SendVerification;
