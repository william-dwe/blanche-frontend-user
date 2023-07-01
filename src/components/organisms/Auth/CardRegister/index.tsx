import React, { useEffect, useState } from 'react';
import style from './index.module.scss';
import { Card } from '../../../atoms';
import { Link, useSearchParams } from 'react-router-dom';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import {
  deleteAllSearchParams,
  parseQueryString,
} from '../../../../helpers/parseSearchParams';

const CardRegister: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const qs = parseQueryString(searchParams);

  const handleNext = (newEmail: string) => {
    setStep(2);
    setEmail(newEmail);
  };

  useEffect(() => {
    if (qs.email && qs.name) {
      handleNext(qs.email);
      setSearchParams(deleteAllSearchParams(searchParams));
    }
  }, [qs]);

  const renderForm = () => {
    switch (step) {
      case 1:
        return <FirstStep onNext={handleNext} />;
      case 2:
        return <SecondStep email={email} />;
      default:
        return <FirstStep onNext={handleNext} />;
    }
  };

  return (
    <Card className={style.card__register}>
      <div className={style.card__register__title}>
        <h6>Register</h6>
        {step === 1 && <Link to="/login">Login</Link>}
      </div>
      {step === 2 && (
        <p className={style.card__register__email}>
          You are registering using <span>{email.toLowerCase()}</span>
        </p>
      )}
      {renderForm()}
    </Card>
  );
};

export default CardRegister;
