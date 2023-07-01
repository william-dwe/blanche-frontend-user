import { Rule } from 'antd/es/form';

export const rules = {
  fullname: [
    { required: true, message: 'Please input your fullname.' },
    { min: 2, message: 'Fullname must be at least 2 characters long.' },
    { max: 32, message: 'Fullname must be at most 32 characters long.' },
  ],
  birthdate: [
    {
      required: true,
      message: 'Birthdate is required',
    },
    {
      validator: (_: Rule, value: Date): Promise<void> => {
        return new Promise((resolve, reject) => {
          if (value >= new Date()) {
            reject(new Error('Birthdate must be in the past'));
          }
          resolve();
        });
      },
    },
  ],
  phone: [
    {
      required: true,
      message: 'Phone number is required',
    },
    {
      validator: (_: Rule, value: number): Promise<void> => {
        if (!value) {
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
  gender: [
    {
      required: true,
      message: 'Gender is required',
    },
  ],
};
