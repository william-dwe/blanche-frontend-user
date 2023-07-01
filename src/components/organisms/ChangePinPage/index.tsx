import React, { useState } from 'react';
import ConfirmPassword from './ConfirmPassword';
import style from './index.module.scss';
import SetPin from './SetPin';

const ChangePasswordPage: React.FC = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevValue) => prevValue + 1);
  };

  const renderChild = () => {
    switch (step) {
      case 1:
        return <ConfirmPassword handleNext={handleNext} />;
      case 2:
        return <SetPin />;
      default:
        return <ConfirmPassword handleNext={handleNext} />;
    }
  };

  return <div className={style.cpp}>{renderChild()}</div>;
};

export default ChangePasswordPage;
