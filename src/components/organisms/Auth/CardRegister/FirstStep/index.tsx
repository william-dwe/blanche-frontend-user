import { Alert } from 'antd';
import React from 'react';
import { capitalizeFirstLetter } from '../../../../../helpers/capitalizeFirstLetter';
import { Button, FormLabel, Input } from '../../../../atoms';
import { Form } from '../../../../molecules';
import useForm from './useForm';
import { rules } from './validation';
import style from '../index.module.scss';

interface FirstStepProps {
  onNext: (newEmail: string) => void;
}

const FirstStep: React.FC<FirstStepProps> = ({ onNext }) => {
  const { handleSubmit, error, isLoading } = useForm({ onNext });
  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <FormLabel label="Email" name="email" rules={rules.email}>
        <Input placeholder="Email" />
      </FormLabel>
      {error && (
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
      >
        Register
      </Button>
    </Form>
  );
};

export default FirstStep;
