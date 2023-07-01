import { message } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import { useForgetPasswordVerifyCodeMutation } from '../../../../app/features/auth/authApiSlice';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import { Button } from '../../../atoms';
import style from './index.module.scss';

interface VerifyCodeProps {
  handleNext: () => void;
}

const VerifyCode: React.FC<VerifyCodeProps> = ({ handleNext }) => {
  const [verifyCode, { isLoading }] = useForgetPasswordVerifyCodeMutation();
  const params = useParams();

  const handleVerifyCode = async () => {
    try {
      const body = {
        verification_code: params.code || '',
      };
      await verifyCode(body).unwrap();
      handleNext();
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  return (
    <div className={style.snp}>
      <h1 className={style.snp__title}>Forget Password</h1>
      <p className={style.snp__info}>
        Please click the button below if you want to set a new password. Ignore
        this if you didn&apos;t request a new password.
      </p>
      <Button
        type="primary"
        className={style.snp__verify}
        onClick={handleVerifyCode}
        loading={isLoading}
        block
      >
        Verify
      </Button>
    </div>
  );
};

export default VerifyCode;
