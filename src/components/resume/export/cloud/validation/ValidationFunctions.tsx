const ValidationFunctions = {
  validateRegion(region) {
    const result = {
      isValid: false,
      errors: []
    };

    if (!region) {
      result.errors.push('Region is required');
      return result;
    }

    if (!ValidationRules.region.pattern.test(region)) {
      result.errors.push(ValidationRules.region.message);
      return result;
    }

    result.isValid = true;
    return result;
  },

  validateMemory(memory) {
    const result = {
      isValid: false,
      errors: []
    };

    const memoryValue = Number(memory);
    if (isNaN(memoryValue)) {
      result.errors.push('Memory must be a number');
      return result;
    }

    if (memoryValue < ValidationRules.memory.min || 
        memoryValue > ValidationRules.memory.max) {
      result.errors.push(ValidationRules.memory.message);
      return result;
    }

    if (memoryValue % ValidationRules.memory.step !== 0) {
      result.errors.push(`Memory must be a multiple of ${ValidationRules.memory.step}MB`);
      return result;
    }

    result.isValid = true;
    return result;
  }
};
