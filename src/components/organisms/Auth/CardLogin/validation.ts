import { RuleType } from 'rc-field-form/lib/interface';

export const rules = {
  email: [
    { required: true, message: 'Please input your email.' },
    { type: 'email' as RuleType, message: 'Please input a valid email.' },
  ],
  password: [{ required: true, message: 'Please input your password.' }],
};
