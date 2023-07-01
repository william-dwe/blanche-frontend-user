export const rules = {
  name: [
    { required: true, message: 'Name must be at least 2 characters long.' },
    { min: 2, message: 'Name must be at least 2 characters long.' },
    { max: 16, message: 'Name must be at most 32 characters long.' },
  ],
};
