const IntegrationHandlers = () => {
  const [connections, setConnections] = useState({});
  
  const handleCloudConnection = async (provider, service) => {
    const connection = await CloudConnector.connect(provider, service);
    setConnections(prev => ({
      ...prev,
      [provider]: { ...prev[provider], [service]: connection }
    }));
    return connection;
  };

  const handleMessagingConnection = async (platform) => {
    const connection = await MessagingConnector.connect(platform);
    setConnections(prev => ({
      ...prev,
      messaging: { ...prev.messaging, [platform]: connection }
    }));
    return connection;
  };

  const handleStorageConnection = async (provider) => {
    const connection = await StorageConnector.connect(provider);
    setConnections(prev => ({
      ...prev,
      storage: { ...prev.storage, [provider]: connection }
    }));
    return connection;
  };

  return { handleCloudConnection, handleMessagingConnection, handleStorageConnection };
};
