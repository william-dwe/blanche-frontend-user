import { message } from 'antd';
import { RuleType } from 'rc-field-form/es/interface';
import React from 'react';
import { Form } from '../..';
import { useForgetPasswordSendCodeMutation } from '../../../app/features/auth/authApiSlice';
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../../helpers/types/response.interface';
import { Input, FormLabel, Button } from '../../atoms';
import style from './index.module.scss';

const ForgetPasswordPage: React.FC = () => {
  const [sendCode, { isLoading }] = useForgetPasswordSendCodeMutation();
  const handleSubmit = async (values: { email: string }) => {
    try {
      const body = {
        email: values.email.toLowerCase(),
      };
      const data = await sendCode(body).unwrap();
      if (!data.is_email_sent) {
        message.warning(
          `You just requested an email before. Please retry in ${data.retry_in} seconds before requesting again.`,
        );
        return;
      }
      message.success(
        'Reset password link is sent to your email. Please click the link to reset your password.',
      );
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  return (
    <div className={style.fpp}>
      <h1 className={style.fpp__title}>Forget Password</h1>
      <p className={style.fpp__info}>
        Please input your registered email to send a reset password link.
      </p>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <FormLabel
          name="email"
          rules={[
            { required: true, message: 'Please input your email.' },
            {
              type: 'email' as RuleType,
              message: 'Please input a valid email.',
            },
          ]}
          validateTrigger="onBlur"
          className={style.fpp__input}
        >
          <Input placeholder="Email" />
        </FormLabel>
        <Button
          type="primary"
          htmlType="submit"
          block
          className={style.fpp__button}
          loading={isLoading}
        >
          Send
        </Button>
      </Form>
    </div>
  );
};

export default ForgetPasswordPage;
