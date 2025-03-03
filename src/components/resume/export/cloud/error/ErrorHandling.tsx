const ErrorHandling = {
  handleConfigError(error, config) {
    const errorResponse = {
      type: error.type || 'CONFIG_ERROR',
      message: error.message || 'Configuration error occurred',
      timestamp: new Date().toISOString(),
      config: config,
      suggestions: []
    };

    switch (error.type) {
      case 'REGION_ERROR':
        errorResponse.suggestions = [
          'Check if the selected region is available',
          'Verify region access permissions',
          'Consider using a different region'
        ];
        break;

      case 'MEMORY_ERROR':
        errorResponse.suggestions = [
          'Select a memory value within the allowed range',
          'Adjust memory in increments of 128MB',
          'Consider performance requirements'
        ];
        break;

      case 'RUNTIME_ERROR':
        errorResponse.suggestions = [
          'Verify runtime compatibility',
          'Check supported runtime versions',
          'Update runtime configuration'
        ];
        break;

      default:
        errorResponse.suggestions = [
          'Verify all configuration parameters',
          'Check service availability',
          'Contact support for assistance'
        ];
    }

    return errorResponse;
  }
};

export { ValidationFunctions, ErrorHandling };
