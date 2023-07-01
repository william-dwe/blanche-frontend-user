import { Steps } from 'antd';
import React, { useState } from 'react';
import { Card } from '../../../atoms';
import FirstStep from './FisrtStep';
import style from './index.module.scss';
import SecondStep from './SecondStep';

const CardMerchantRegistration: React.FC = () => {
  const [step, setStep] = useState(0);
  const [store, setStore] = useState('');
  const [domain, setDomain] = useState('');

  const handleNext = (store: string, domain: string) => {
    setStep((prevStep) => (prevStep === 0 ? prevStep + 1 : prevStep));
    setStore(store);
    setDomain(domain);
  };

  const handleBack = () => {
    setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  return (
    <Card className={style.card__merchant__registration}>
      <h6>Merchant Register</h6>
      <Steps
        direction="vertical"
        size="default"
        current={step}
        items={[
          {
            title: 'Input Store Name and Domain',
            description: <FirstStep step={step} handleNext={handleNext} />,
          },
          {
            title: 'Set Store Address',
            description: (
              <SecondStep
                step={step}
                store={store}
                domain={domain}
                handleBack={handleBack}
              />
            ),
          },
        ]}
      />
    </Card>
  );
};

export default CardMerchantRegistration;
