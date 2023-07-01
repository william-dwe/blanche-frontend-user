import { useState } from 'react';
import { useUpdateMerchantProfileMutation } from '../../../../../app/features/merchant/merchantApiSlice';
import { FormReturnAuth } from '../../../../../helpers/types';
import { EditMerchantProfileProps } from '../../../../../helpers/types/merchant/profile.interface';

interface useFormProps {
  handleOk: () => void;
}

function useForm({
  handleOk,
}: useFormProps): FormReturnAuth<EditMerchantProfileProps> {
  const [error, setError] = useState<Error>();
  const [patch, { isError, isLoading }] = useUpdateMerchantProfileMutation();

  const handleSubmit = async (values: EditMerchantProfileProps) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      await patch(formData).unwrap();
      handleOk();
    } catch (error) {
      setError(error as Error);
    }
  };

  return { handleSubmit, error, isError, isLoading };
}

export default useForm;
