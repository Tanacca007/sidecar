const ErrorTracking = {
  trackError(error) {
    return {
      id: generateUniqueId(),
      timestamp: new Date().toISOString(),
      type: error.type,
      message: error.message,
      stack: error.stack,
      metadata: {
        browser: navigator.userAgent,
        platform: navigator.platform
      }
    };
  },

  async logError(error) {
    const trackedError = this.trackError(error);
    await ErrorLogger.log(trackedError);
    return trackedError;
  }
};
