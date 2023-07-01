import React, { useEffect, useState } from 'react';
import { Countdown } from '../../..';
import { Button } from '../../../atoms';
import style from './index.module.scss';
import { PinInput } from 'react-input-pin-code';
import {
  useRequestResetPasswordMutation,
  useVerifyResetPasswordMutation,
} from '../../../../app/features/auth/authApiSlice';
import { message } from 'antd';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';

interface ConfirmVerificationProps {
  handleNext: () => void;
  retryIn: number;
  changeRetryIn: (retryIn: number) => void;
}

const initialPin = ['', '', '', '', '', ''];

const ConfirmVerification: React.FC<ConfirmVerificationProps> = ({
  handleNext,
  retryIn,
  changeRetryIn,
}) => {
  const [value, setValue] = useState(initialPin);
  const [verifyResetPassword] = useVerifyResetPasswordMutation();
  const [sendVerification, { isLoading: isLoadingRequest }] =
    useRequestResetPasswordMutation();
  const [isCountdown, setIsCountdown] = useState(true);

  useEffect(() => {
    if (value.join('').length === 6) {
      handleComplete();
    }
  }, [value]);

  const handleCountdown = () => {
    setIsCountdown(false);
  };

  const handleComplete = async () => {
    try {
      const body = {
        verification_code: value.join(''),
      };
      await verifyResetPassword(body).unwrap();
      handleNext();
      message.success(
        'Verification code is correct. Please set your new password.',
      );
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  const handleRetry = async () => {
    try {
      const data = await sendVerification().unwrap();
      changeRetryIn(data.retry_in);
      message.success('Verification code has been sent to your email.');
      setIsCountdown(true);
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  return (
    <div className={style.cv}>
      <h1 className={style.cv__title}>Confirm Verification Code</h1>
      <p className={style.cv__info}>
        Please confirm your verification code to change password.
      </p>
      <PinInput
        values={value}
        onChange={(value, index, values) => setValue(values)}
        inputClassName={style.cv__code}
        containerClassName={style.cv__container}
        showState={false}
        placeholder=""
        type="text"
      />
      {isCountdown ? (
        <div className={style.cv__cd}>
          <span>You can request to resend new code in</span>
          <Countdown
            duration={retryIn}
            callback={handleCountdown}
            className={style.cv__cd__countdown}
          />
        </div>
      ) : (
        <div className={style.cv__resend}>
          <p className={style.cv__resend__info}>
            Didn&apos;t receive any code?
          </p>
          <Button
            type="link"
            loading={isLoadingRequest}
            className={style.cv__resend__button}
            onClick={handleRetry}
          >
            Resend Code
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConfirmVerification;
