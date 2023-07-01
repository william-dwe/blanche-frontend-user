import { NamePath } from 'antd/es/form/interface';

export const rules = {
  name: [
    {
      required: true,
      message: 'Please input product name!',
    },
    { min: 3, message: 'Product name must be at least 3 characters long.' },
  ],
  category: [
    {
      required: true,
      message: 'Please select product category!',
    },
  ],
  description: [
    {
      required: false,
    },
  ],
  condition: [
    {
      required: true,
      message: 'Please select product condition!',
    },
  ],
  images: [
    {
      required: true,
      message: 'Please upload product images!',
    },
  ],
  firstVariant: [
    { min: 3, message: 'Variant group must be at least 3 characters long.' },
    { max: 16, message: 'Variant group must be at most 16 characters long.' },
    { required: true, message: 'Please input first variant!' },
  ],
  secondVariant: [
    { min: 3, message: 'Variant group must be at least 3 characters long.' },
    { max: 16, message: 'Variant group must be at most 16 characters long.' },
    { required: true, message: 'Please input first variant!' },
    ({
      getFieldValue,
    }: {
      getFieldValue: (name: NamePath) => string;
    }): any => ({
      validator(_: undefined, value: string) {
        const firstVariant = getFieldValue('firstVariant');
        if (value === firstVariant) {
          return Promise.reject(
            new Error('Second variant cannot be the same as first variant!'),
          );
        }
        return Promise.resolve();
      },
    }),
  ],
  variantType: [
    {
      required: true,
      message: 'Please create variant type!',
    },
  ],
  price: [
    {
      required: true,
      message: 'Please input price!',
    },
  ],
  stock: [
    {
      required: true,
      message: 'Please input stock!',
    },
  ],
  weight: [
    {
      required: true,
      message: 'Please input weight!',
    },
  ],
  length: [
    {
      required: true,
      message: 'Please input length!',
    },
  ],
  width: [
    {
      required: true,
      message: 'Please input width!',
    },
  ],
  height: [
    {
      required: true,
      message: 'Please input height!',
    },
  ],
  status: [
    {
      required: false,
    },
  ],
};
