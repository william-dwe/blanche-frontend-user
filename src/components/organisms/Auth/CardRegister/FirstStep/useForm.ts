import { useState } from 'react';
import { useCheckEmailMutation } from '../../../../../app/features/auth/authApiSlice';
import {
  FormReturnAuth,
  RegisterFirstStepProps,
} from '../../../../../helpers/types';

interface useFormProps {
  onNext: (newEmail: string) => void;
}

const useForm = ({
  onNext,
}: useFormProps): FormReturnAuth<RegisterFirstStepProps> => {
  const [error, setError] = useState<Error>();
  const [checkEmail, { isLoading }] = useCheckEmailMutation();

  const handleSubmit = async (values: RegisterFirstStepProps) => {
    try {
      const { email } = values;
      const body = {
        email,
      };
      const data = await checkEmail(body).unwrap();
      if (!data.is_available) {
        throw new Error('Email is already used.');
      }
      onNext(data.email);
    } catch (error) {
      setError(error as Error);
    }
  };

  return { handleSubmit, error, isLoading };
};

export default useForm;
