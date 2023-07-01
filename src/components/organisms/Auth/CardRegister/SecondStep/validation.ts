import { NamePath } from 'antd/es/form/interface';
import { Rule } from 'rc-field-form/lib/interface';

export const rules = {
  username: [
    { required: true, message: 'Please input your username.' },
    { min: 8, message: 'Username must be at least 8 characters long.' },
    { max: 16, message: 'Username must be at most 16 characters long.' },
    {
      validator: (_: Rule, value: string): Promise<void> => {
        if (!value || value.length < 8 || value.length > 16)
          return Promise.resolve();
        return new Promise((resolve, reject) => {
          if (value.trim() !== value) {
            reject(
              new Error('Username cannot contain leading and trailing spaces.'),
            );
          }
          if (value.split(' ').length > 1) {
            reject(new Error('Username cannot contain spaces.'));
          }
          if (!/^[a-z0-9]+$/i.test(value)) {
            reject(
              new Error('Username can only contain alphanumeric characters.'),
            );
          }
          resolve();
        });
      },
    },
  ],
  fullname: [
    { required: true, message: 'Please input your fullname.' },
    { min: 2, message: 'Fullname must be at least 2 characters long.' },
    { max: 32, message: 'Fullname must be at most 32 characters long.' },
    {
      validator: (_: Rule, value: string): Promise<void> => {
        if (!value || value.length < 2 || value.length > 32)
          return Promise.resolve();
        return new Promise((resolve, reject) => {
          if (value.trim() !== value) {
            reject(
              new Error('Fullname cannot contain leading and trailing spaces.'),
            );
          }
          const splitted = value.split(' ');
          if (splitted.includes('')) {
            reject(new Error('Fullname cannot contain consecutive spaces.'));
          }
          if (!/^[a-z0-9. ']+$/i.test(value)) {
            reject(
              new Error(
                'Fullname can only contain alphanumeric characters, single quote, and dot.',
              ),
            );
          }
          resolve();
        });
      },
    },
  ],
  password: [
    { required: true, message: 'Please input your password.' },
    { min: 8, message: 'Password must be at least 8 characters long.' },
    { max: 32, message: 'Password must be at most 32 characters long.' },
    ({
      getFieldValue,
    }: {
      getFieldValue: (name: NamePath) => string;
    }): any => ({
      validator(_: undefined, value: string) {
        const username = getFieldValue('username');
        const regex = new RegExp(username, 'i');
        if (value && value.match(regex)) {
          return Promise.reject(new Error('Password cannot contain username.'));
        }
        return Promise.resolve();
      },
    }),
    {
      validator: (_: Rule, value: string): Promise<void> => {
        if (!value || value.length < 8 || value.length > 32)
          return Promise.resolve();
        return new Promise((resolve, reject) => {
          if (value.trim() !== value) {
            reject(
              new Error('Password cannot contain leading and trailing spaces.'),
            );
          }
          resolve();
        });
      },
    },
  ],
  confirmPassword: [
    { required: true, message: 'Please confirm your password.' },
    ({
      getFieldValue,
    }: {
      getFieldValue: (name: NamePath) => string;
    }): any => ({
      validator(_: undefined, value: string) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Passwords are not the same.'));
      },
    }),
  ],
};

export const dependencies = {
  confirmPassword: ['password'],
};
