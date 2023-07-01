import { message } from 'antd';
import React, { useState } from 'react';
import { Form } from '../../..';
import { useConfirmChangePinMutation } from '../../../../app/features/wallet/walletApiSlice';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import { Button, FormLabel, InputPassword } from '../../../atoms';
import style from './index.module.scss';

interface ConfirmPasswordProps {
  handleNext: () => void;
}

const ConfirmPassword: React.FC<ConfirmPasswordProps> = ({ handleNext }) => {
  const [confirm, { isLoading }] = useConfirmChangePinMutation();

  const handleSubmit = async (values: { password: string }) => {
    try {
      const body = {
        password: values.password.trim(),
      };
      await confirm(body).unwrap();
      message.success('Success confirm password. Please input your new PIN.');
      handleNext();
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  return (
    <div className={style.cp}>
      <h1 className={style.cp__title}>Change PIN</h1>
      <p className={style.cp__info}>
        Please confirm your password to continue to change pin.
      </p>
      <Form
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
      >
        <FormLabel
          name="password"
          rules={[
            { required: true, message: 'Please input your password.' },
            { min: 8, message: 'Password must be at least 8 characters long.' },
            {
              max: 32,
              message: 'Password must be at most 16 characters long.',
            },
          ]}
          className={style.cp__input}
        >
          <InputPassword
            placeholder="Please input your password"
            className={style.cp__input}
          />
        </FormLabel>
        <Button
          htmlType="submit"
          type="primary"
          block
          className={style.cp__button}
          loading={isLoading}
        >
          Confirm
        </Button>
      </Form>
    </div>
  );
};

export default ConfirmPassword;
