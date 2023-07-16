const personalDetailsSchema = {
  name: {
    required: true,
    type: 'string',
  },
  phoneNumber: {
    required: true,
    type: 'string',
  },
  age: {
    required: true,
    type: 'number',
  },
  jobPosition: {
    required: false, 
    type: 'string',
  },
};

module.exports = personalDetailsSchema;
