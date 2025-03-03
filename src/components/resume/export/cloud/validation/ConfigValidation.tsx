const ConfigValidation = {
  validateS3Config(config) {
    return {
      region: validateRegion(config.region),
      bucketType: validateBucketType(config.bucketType),
      permissions: validatePermissions(config.permissions),
      isValid: true
    };
  },

  validateFunctionConfig(config) {
    return {
      runtime: validateRuntime(config.runtime),
      memory: validateMemory(config.memory),
      trigger: validateTrigger(config.trigger),
      isValid: true
    };
  }
};

const ValidationRules = {
  region: {
    required: true,
    pattern: /^[a-z]{2}-[a-z]+-\d{1}$/,
    message: 'Invalid region format'
  },
  memory: {
    min: 128,
    max: 1024,
    step: 128,
    message: 'Memory must be between 128MB and 1024MB'
  },
  runtime: {
    supported: ['nodejs', 'python', 'java'],
    message: 'Unsupported runtime environment'
  }
};

export { ConfigValidation, ValidationRules };
