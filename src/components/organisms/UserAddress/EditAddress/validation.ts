import { Rule } from 'antd/es/form';

export const rules = {
  name: [
    {
      required: true,
      message: 'Name is required',
    },
  ],
  phone: [
    {
      required: true,
      message: 'Phone is required',
    },

    {
      pattern: /^[0-9]*$/,
      message: 'Phone number must be a number',
    },
    {
      validator: (_: Rule, value: number): Promise<void> => {
        if (!value || !/^[0-9]*$/.test(value.toString())) {
          return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
          const str = value.toString();
          if (str.slice(0, 2) !== '62') {
            reject(new Error('Phone number must start with 62'));
          }
          if (str.length < 11 || str.length > 15) {
            reject(new Error('Phone number must be between 11 and 15 digits'));
          }
          resolve();
        });
      },
    },
  ],
  label: [
    {
      required: true,
      message: 'Label is required',
    },
  ],
  province: [
    {
      required: true,
      message: 'Province is required',
    },
  ],
  city: [
    {
      required: true,
      message: 'City is required',
    },
  ],
  district: [
    {
      required: true,
      message: 'District is required',
    },
  ],
  subDistrict: [
    {
      required: true,
      message: 'Sub District is required',
    },
  ],
  details: [
    {
      required: true,
      message: 'Details is required',
    },
  ],
};
