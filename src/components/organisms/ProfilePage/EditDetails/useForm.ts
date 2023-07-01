import dayjs from 'dayjs';
import { useState } from 'react';
import { usePatchProfileDetailsMutation } from '../../../../app/features/profile/profileApiSlice';
import { EditDetailsProps, FormReturnAuth } from '../../../../helpers/types';

function useForm(): FormReturnAuth<EditDetailsProps> {
  const [error, setError] = useState<Error>();
  const [patch, { isError, isLoading }] = usePatchProfileDetailsMutation();

  const handleSubmit = async (values: EditDetailsProps) => {
    try {
      const formData = new FormData();
      formData.append('fullname', values.fullname);
      formData.append('phone', values.phone);
      formData.append('gender', values.gender);
      formData.append(
        'birth_date',
        dayjs(values.birth_date, 'YYYY-MM-DD').toISOString(),
      );
      await patch(formData).unwrap();
    } catch (error) {
      setError(error as Error);
    }
  };

  return { handleSubmit, error, isError, isLoading };
}

export default useForm;
