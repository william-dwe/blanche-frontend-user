export const rules = {
  reason: [
    {
      required: true,
      message: 'Please input why you want to refund',
    },
    {
      min: 10,
      message: 'Minimum 10 characters',
    },
    {
      max: 300,
      message: 'Maximum 300 characters',
    },
  ],
  image: [
    {
      required: true,
      message: 'Please upload an image',
    },
  ],
};
