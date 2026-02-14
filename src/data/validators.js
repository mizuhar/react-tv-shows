export const required = (value) => {
   return value ? null : 'All fields are required!';
};

export const emailValidator = (value) => {
   const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return pattern.test(value) ? null : 'Invalid email';
};
