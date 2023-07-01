import { message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Form, FormLabel, InputPassword } from '../../..';
import { useResetForgetPasswordMutation } from '../../../../app/features/auth/authApiSlice';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { IResetForgetPasswordRequest } from '../../../../helpers/types';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import style from './index.module.scss';
import { dependencies, rules } from './validation';

const FormPassword: React.FC = () => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetForgetPasswordMutation();
  const handleSubmit = async (values: IResetForgetPasswordRequest) => {
    try {
      const body = {
        password: values.password,
      };
      await resetPassword(body).unwrap();
      navigate('/login');
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };
  return (
    <div className={style.snp}>
      <div className={style.snp__pass}>
        <h1 className={style.snp__title}>Set New Password</h1>
        <p className={style.snp__info}>
          Please enter your new password and confirm it.
        </p>
      </div>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <FormLabel
          label="Password"
          name="password"
          rules={rules.password}
          hasFeedback
        >
          <InputPassword placeholder="Password" />
        </FormLabel>
        <FormLabel
          label="Confirm Password"
          name="confirmPassword"
          rules={rules.confirmPassword}
          dependencies={dependencies.confirmPassword}
          hasFeedback
        >
          <InputPassword placeholder="Confirm Password" />
        </FormLabel>
        <Button
          type="primary"
          htmlType="submit"
          className={style.snp__btn}
          loading={isLoading}
          block
        >
          Confirm
        </Button>
      </Form>
    </div>
  );
};

export default FormPassword;
