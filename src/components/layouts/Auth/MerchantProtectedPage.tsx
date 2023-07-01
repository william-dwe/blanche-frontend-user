import { message } from 'antd';
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { setMerchant } from '../../../app/features/auth/authSlice';
import { useLazyGetMerchantProfileQuery } from '../../../app/features/merchant/merchantApiSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../../helpers/types/response.interface';

const MerchantProtectedPage = (): JSX.Element => {
  const location = useLocation();
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  if (!user && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const [getMerchantProfile] = useLazyGetMerchantProfileQuery();
  const { merchant, isLoggedIn: isLoggedInMerchant } = useAppSelector(
    (state) => state.auth,
  );

  const fetchProfile = async () => {
    try {
      const result = await getMerchantProfile().unwrap();

      if (result) {
        dispatch(setMerchant(result));
      }
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  useEffect(() => {
    if (!isLoggedInMerchant || merchant) {
      return;
    }

    fetchProfile();
  }, [merchant]);

  if (!merchant && !isLoggedIn) {
    // TODO: redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default MerchantProtectedPage;
