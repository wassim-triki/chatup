const validate = (inputs, data) => {
  const errors = {};
  inputs.forEach((input) => {
    if (input.isRequired && data[input.name].length === 0) {
      errors[input.name] = `${input.label} is required.`;
    } else {
      if (input.format.regex && !input.format.regex.test(data[input.name])) {
        errors[input.name] = input.format.message;
      }
    }
  });
  return errors;
};

export default validate;
