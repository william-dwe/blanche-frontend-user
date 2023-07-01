import { NamePath, Rule } from 'rc-field-form/lib/interface';

export const rules = {
  password: [
    { required: true, message: 'Please input your password.' },
    { min: 8, message: 'Password must be at least 8 characters long.' },
    { max: 32, message: 'Password must be at most 16 characters long.' },
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
