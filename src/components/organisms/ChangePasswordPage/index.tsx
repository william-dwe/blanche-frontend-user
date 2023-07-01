import React, { useState } from 'react';
import ConfirmVerification from './ConfirmVerification';
import style from './index.module.scss';
import SendVerification from './SendVerification';
import SetPassword from './SetPassword';

const ChangePasswordPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [retryIn, setRetryIn] = useState(0);

  const handleNext = () => {
    setStep((prevValue) => prevValue + 1);
  };

  const changeRetryIn = (retryIn: number) => {
    setRetryIn(retryIn);
  };

  const renderChild = () => {
    switch (step) {
      case 1:
        return (
          <SendVerification
            handleNext={handleNext}
            changeRetryIn={changeRetryIn}
          />
        );
      case 2:
        return (
          <ConfirmVerification
            handleNext={handleNext}
            retryIn={retryIn}
            changeRetryIn={changeRetryIn}
          />
        );
      case 3:
        return <SetPassword />;
      default:
        return (
          <SendVerification
            handleNext={handleNext}
            changeRetryIn={changeRetryIn}
          />
        );
    }
  };

  return <div className={style.cpp}>{renderChild()}</div>;
};

export default ChangePasswordPage;
