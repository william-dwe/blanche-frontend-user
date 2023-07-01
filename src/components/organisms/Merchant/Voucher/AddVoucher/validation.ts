export const rules = {
  code: [
    {
      required: true,
      message: 'Please input voucher name',
    },
    {
      min: 3,
      message: 'Voucher name must be at least 3 characters',
    },
    {
      max: 5,
      message: 'Voucher name must be at most 5 characters',
    },
  ],
  period: [
    {
      required: true,
      message: 'Please input voucher period',
    },
  ],
  discount_nominal: [
    {
      required: true,
      message: 'Please input voucher amount',
    },
  ],
  min_order_nominal: [
    {
      required: true,
      message: 'Please input voucher minimum',
    },
  ],
  quota: [
    {
      required: true,
      message: 'Please input voucher quota',
    },
  ],
};
