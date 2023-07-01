import { useState } from 'react';
import { useSetNewPasswordMutation } from '../../../../app/features/auth/authApiSlice';
import { logout } from '../../../../app/features/auth/authSlice';
import { useAppDispatch } from '../../../../app/hooks';
import {
  FormReturnPassword,
  ISetNewPasswordRequest,
} from '../../../../helpers/types';
import { IErrorResponse } from '../../../../helpers/types/response.interface';

const useForm = (): FormReturnPassword => {
  const [setPassword, { isLoading, isError }] = useSetNewPasswordMutation();
  const [error, setError] = useState<IErrorResponse>();
  const dispatch = useAppDispatch();
  const handleSubmit = async (values: ISetNewPasswordRequest) => {
    try {
      const { password } = values;
      const body = {
        password: password.trim(),
      };
      await setPassword(body).unwrap();
      dispatch(logout());
    } catch (error) {
      setError(error as IErrorResponse);
    }
  };

  return { handleSubmit, isError, isLoading, error };
};

export default useForm;
