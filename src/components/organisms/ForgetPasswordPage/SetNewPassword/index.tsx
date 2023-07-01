import React, { useState } from 'react';
import style from './index.module.scss';
import VerifyCode from './VerifyCode';
import FormPassword from './FormPassword';

const SetNewPassword: React.FC = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevValue) => prevValue + 1);
  };

  const renderChild = () => {
    switch (step) {
      case 1:
        return <VerifyCode handleNext={handleNext} />;
      case 2:
        return <FormPassword />;
      default:
        return <VerifyCode handleNext={handleNext} />;
    }
  };

  return <div className={style.snp}>{renderChild()}</div>;
};

export default SetNewPassword;
