import { Divider, message } from 'antd';
import React from 'react';
import { useRequestLoginGoogleMutation } from '../../../../app/features/auth/authApiSlice';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import { Button } from '../../../atoms';
import style from './index.module.scss';

const CardLoginBottom: React.FC = () => {
  const [requestLogin, { isLoading }] = useRequestLoginGoogleMutation();

  const handleLoginGoogle = async () => {
    try {
      const res = await requestLogin().unwrap();
      window.open(res.url, '_self');
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  return (
    <>
      <div className={style.card__login__bottom}>
        <Divider className={style.divider}>Or Login with</Divider>
        <Button
          className={style.card__login__google}
          block
          onClick={handleLoginGoogle}
          loading={isLoading}
          size="large"
        >
          <div className={style.card__login__google}>
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="google"
              className={style.card__login__google__icon}
            />
            <span>Google</span>
          </div>
        </Button>
      </div>
    </>
  );
};

export default CardLoginBottom;
