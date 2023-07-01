export const rules = {
  title: [
    {
      required: true,
      message: 'Please input promotion title',
    },
    {
      max: 32,
      message: 'Promotion title must be less than 50 characters',
    },
    {
      min: 3,
      message: 'Promotion title must be more than 5 characters',
    },
  ],
  max_discounted_quantity: [
    {
      required: true,
      message: 'Please input max discount quantity',
    },
  ],
  promotion_type_id: [
    {
      required: true,
      message: 'Please select promotion type',
    },
  ],
  nominal: [
    {
      required: true,
      message: 'Please input nominal',
    },
  ],
  quota: [
    {
      required: true,
      message: 'Please input quota',
    },
  ],
  period: [
    {
      required: true,
      message: 'Please input period',
    },
  ],
};
