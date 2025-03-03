const DeliveryOptions = ({ options, onDeliver }) => {
  const [deliveryConfig, setDeliveryConfig] = useState({
    email: {
      enabled: false,
      recipients: [],
      subject: 'Export Report'
    },
    slack: {
      enabled: false,
      channels: [],
      webhook: ''
    },
    storage: {
      provider: 'local',
      path: '',
      credentials: null
    }
  });

  return (
    <div className="delivery-options p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Delivery Settings</h3>
      
      <EmailDelivery
        config={deliveryConfig.email}
        onChange={(email) => setDeliveryConfig({ ...deliveryConfig, email })}
      />
      
      <SlackDelivery
        config={deliveryConfig.slack}
        onChange={(slack) => setDeliveryConfig({ ...deliveryConfig, slack })}
      />
      
      <StorageDelivery
        config={deliveryConfig.storage}
        providers={options.storage}
        onChange={(storage) => setDeliveryConfig({ ...deliveryConfig, storage })}
      />
      
      <DeliveryPreview config={deliveryConfig} />
    </div>
  );
};

export { SchedulingOptions, DeliveryOptions };
