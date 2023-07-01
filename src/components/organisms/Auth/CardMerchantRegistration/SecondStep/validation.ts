export const rules = {
  store: [
    {
      required: true,
      message: 'Please input your store name!',
    },
    {
      min: 8,
      message: 'Store name must be at least 8 characters!',
    },
    {
      max: 32,
      message: 'Store name must be at most 32 characters!',
    },
  ],
  domain: [
    {
      required: true,
      message: 'Please input your domain!',
    },
    {
      min: 8,
      message: 'Domain must be at least 8 characters!',
    },
    {
      max: 16,
      message: 'Domain must be at most 16 characters!',
    },
  ],
};
