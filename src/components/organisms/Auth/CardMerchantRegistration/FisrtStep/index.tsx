import { ValidateStatus } from 'antd/es/form/FormItem';
import { debounce } from 'lodash';
import React, { useState } from 'react';
import {
  useCheckDomainMutation,
  useCheckStoreNameMutation,
} from '../../../../../app/features/merchant/merchantApiSlice';
import {
  ICheckDomainRequest,
  ICheckStoreNameRequest,
} from '../../../../../helpers/types';
import { Button, FormLabel, Input } from '../../../../atoms';
import { Form } from '../../../../molecules';
import style from './index.module.scss';

interface FirstStepProps {
  step: number;
  handleNext: (store: string, domain: string) => void;
}

const FirstStep: React.FC<FirstStepProps> = ({ step, handleNext }) => {
  const [checkName] = useCheckStoreNameMutation();
  const [checkDomain] = useCheckDomainMutation();

  const [name, setName] = useState<{
    value: string;
    validateStatus?: ValidateStatus;
    errorMsg?: string | null;
  }>({ value: '' });

  const [domain, setDomain] = useState<{
    value: string;
    validateStatus?: ValidateStatus;
    errorMsg?: string | null;
  }>({ value: '' });

  const validateName = async (
    name: string,
  ): Promise<{
    validateStatus?: ValidateStatus;
    errorMsg?: string | null;
  }> => {
    if (!name) {
      return {
        validateStatus: 'error',
        errorMsg: 'Please enter your name!',
      };
    }

    if (name.length < 8) {
      return {
        validateStatus: 'error',
        errorMsg: 'name must be at least 8 characters long.',
      };
    }

    if (name.length > 32) {
      return {
        validateStatus: 'error',
        errorMsg: 'name must be at most 32 characters long.',
      };
    }

    const body: ICheckStoreNameRequest = {
      name,
    };
    const data = await checkName(body).unwrap();
    if (!data.is_available) {
      return {
        validateStatus: 'error',
        errorMsg: 'name is already taken.',
      };
    }
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  };

  const validateDomain = async (
    domain: string,
  ): Promise<{
    validateStatus?: ValidateStatus;
    errorMsg?: string | null;
  }> => {
    if (!domain) {
      return {
        validateStatus: 'error',
        errorMsg: 'Please enter your domain!',
      };
    }

    if (domain.length < 8) {
      return {
        validateStatus: 'error',
        errorMsg: 'domain must be at least 8 characters long.',
      };
    }

    if (domain.length > 16) {
      return {
        validateStatus: 'error',
        errorMsg: 'domain must be at most 16 characters long.',
      };
    }

    const body: ICheckDomainRequest = {
      domain,
    };
    const data = await checkDomain(body).unwrap();
    if (!data.is_available) {
      return {
        validateStatus: 'error',
        errorMsg: 'doamin is already taken.',
      };
    }
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  };

  const handleChangeName = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName({
      validateStatus: 'validating',
      errorMsg: null,
      value,
    });
    const result = await validateName(value);
    setName({
      ...result,
      value,
    });
  };

  const handleChangeDomain = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDomain({
      validateStatus: 'validating',
      errorMsg: null,
      value,
    });
    const result = await validateDomain(value);
    setDomain({
      ...result,
      value,
    });
  };

  const handleSubmit = () => {
    if (
      name.validateStatus === 'success' &&
      domain.validateStatus === 'success'
    ) {
      handleNext(name.value, domain.value);
    }
  };

  return (
    <div className={style.card__first__step}>
      {step === 0 ? (
        <Form
          name="basic"
          layout="vertical"
          autoComplete="off"
          onFinish={handleSubmit}
        >
          <FormLabel
            label="Store Name"
            name="name"
            initialValue={name.value}
            validateStatus={name.validateStatus}
            help={name.errorMsg || ''}
            hasFeedback
            required
          >
            <Input
              placeholder="store name"
              onChange={debounce(handleChangeName, 500)}
            />
          </FormLabel>
          <FormLabel
            label="Domain Name"
            name="domain"
            initialValue={domain.value}
            validateStatus={domain.validateStatus}
            help={domain.errorMsg || ''}
            hasFeedback
            required
          >
            <Input
              placeholder="blanche.com/domain"
              onChange={debounce(handleChangeDomain, 500)}
            />
          </FormLabel>

          <div className="card__first__step__button">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              block
              disabled={
                !(
                  name.validateStatus === 'success' &&
                  domain.validateStatus === 'success'
                )
              }
            >
              Next
            </Button>
          </div>
        </Form>
      ) : (
        <ul>
          <li>Store : {name.value}</li>
          <li>Domain : {domain.value}</li>
        </ul>
      )}
    </div>
  );
};

export default FirstStep;
