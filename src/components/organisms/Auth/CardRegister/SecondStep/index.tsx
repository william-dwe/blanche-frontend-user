import React from 'react';
import { Button, FormLabel, Input, InputPassword } from '../../../../atoms';
import { Form } from '../../../../molecules';
import useForm from './useForm';
import { dependencies, rules } from './validation';
import { useCheckUsernameMutation } from '../../../../../app/features/auth/authApiSlice';
import { capitalizeFirstLetter } from '../../../../../helpers/capitalizeFirstLetter';
import { Alert } from 'antd';
import style from '../index.module.scss';
import { Rule } from 'rc-field-form/lib/interface';
import { IErrorResponse } from '../../../../../helpers/types/response.interface';
import debounce from 'debounce-promise';

interface SecondStepProps {
  email: string;
}

const SecondStep: React.FC<SecondStepProps> = ({ email }) => {
  const { handleSubmit, isError, error } = useForm({ email });
  const [checkUsername, { isLoading }] = useCheckUsernameMutation();

  const additionalRule = {
    validator: debounce((_: Rule, value: string): Promise<void> => {
      if (!value || value.length < 8 || value.length > 16) {
        return Promise.reject();
      }
      return new Promise(async (resolve, reject) => {
        const body = {
          username: value,
        };
        try {
          const data = await checkUsername(body).unwrap();

          if (!data.is_available) {
            reject(
              new Error('Username is already used. Please try another name.'),
            );
          }
          resolve();
        } catch (err) {
          const error = err as IErrorResponse;
          reject(new Error(capitalizeFirstLetter(error.message)));
        }
      });
    }, 500),
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <FormLabel
        label="Username"
        name="username"
        hasFeedback
        rules={[...rules.username, additionalRule]}
      >
        <Input placeholder="Username" />
      </FormLabel>
      <FormLabel label="Fullname" name="fullname" rules={rules.fullname}>
        <Input placeholder="Fullname" />
      </FormLabel>
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
          className={style.card__register__alert}
        />
      )}
      <Button
        type="primary"
        size="large"
        htmlType="submit"
        block
        loading={isLoading}
        disabled={isLoading}
        className={style.card__register__button}
      >
        Done
      </Button>
    </Form>
  );
};

export default SecondStep;
