import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../../app/features/auth/authApiSlice';
import {
  setIsLoggedIn,
  setMerchant,
  setUser,
} from '../../../../app/features/auth/authSlice';
import { useLazyGetMerchantProfileQuery } from '../../../../app/features/merchant/merchantApiSlice';
import { useLazyGetProfileQuery } from '../../../../app/features/profile/profileApiSlice';
import { useAppDispatch } from '../../../../app/hooks';
import { FormReturnAuth, LoginProps } from '../../../../helpers/types';

function useForm(): FormReturnAuth<LoginProps> {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [getProfile] = useLazyGetProfileQuery();
  const [getMerchantProfile] = useLazyGetMerchantProfileQuery();
  const [login, { isError, isLoading }] = useLoginMutation();
  const [error, setError] = useState<Error>();

  const handleSubmit = async (values: LoginProps) => {
    try {
      const body = {
        email: values.email,
        password: values.password.trim(),
      };
      await login(body).unwrap();
      const profile = await getProfile().unwrap();

      if (profile.role == 'merchant') {
        const merchant = await getMerchantProfile().unwrap();
        dispatch(setMerchant(merchant));
      }

      dispatch(setUser(profile));
      dispatch(setIsLoggedIn(true));

      navigate(from, { replace: true });
    } catch (error) {
      setError(error as Error);
    }
  };

  return { handleSubmit, isError, isLoading, error };
}

export default useForm;
