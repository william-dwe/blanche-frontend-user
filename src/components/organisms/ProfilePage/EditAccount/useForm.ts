import { message } from 'antd';
import { useState } from 'react';
import { usePatchProfileMutation } from '../../../../app/features/profile/profileApiSlice';
import { EditAccountProps, FormReturnAuth } from '../../../../helpers/types';

interface useFormProps {
  handleOk: () => void;
}

function useForm({ handleOk }: useFormProps): FormReturnAuth<EditAccountProps> {
  const [error, setError] = useState<Error>();
  const [patch, { isError, isLoading }] = usePatchProfileMutation();

  const handleSubmit = async (values: EditAccountProps) => {
    try {
      await patch(values).unwrap();
      handleOk();
      message.success('Account updated');
    } catch (error) {
      setError(error as Error);
    }
  };

  return { handleSubmit, error, isError, isLoading };
}

export default useForm;
