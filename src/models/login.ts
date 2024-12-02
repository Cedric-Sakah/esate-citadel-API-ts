import Joi from 'joi';

function validate(req: any): Joi.ValidationResult {
  const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
    password: Joi.string().min(6).max(250).required(),
  });
  return schema.validate(req);
}

export default validate;