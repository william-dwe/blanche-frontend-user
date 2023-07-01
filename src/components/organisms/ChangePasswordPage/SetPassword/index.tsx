import { Alert, Button } from 'antd';
import React from 'react';
import { Form, FormLabel, InputPassword } from '../../..';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import style from './index.module.scss';
import useForm from './useForm';
import { dependencies, rules } from './validation';

const SetPassword: React.FC = () => {
  const { handleSubmit, isLoading, isError, error } = useForm();

  return (
    <div className={style.sp}>
      <h1 className={style.sp__title}>Set New Password</h1>
      <p className={style.sp__info}>
        Please set your new password to continue.
      </p>
      <Form
        className={style.sp__form}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
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
        {(error || isError) && (
          <Alert
            message={capitalizeFirstLetter(error?.message)}
            type="error"
            showIcon
            className={style.sp__alert}
          />
        )}
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Save
        </Button>
      </Form>
    </div>
  );
};

export default SetPassword;
