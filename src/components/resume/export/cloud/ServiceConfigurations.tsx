const S3Configuration = ({ config, onConfigure }) => {
  const [s3Config, setS3Config] = useState({
    region: config.regions[0],
    bucketType: config.bucketTypes[0],
    permissions: config.permissions[0]
  });

  return (
    <div className="s3-config space-y-4">
      <h4 className="font-medium">S3 Configuration</h4>
      
      <RegionSelector
        regions={config.regions}
        selected={s3Config.region}
        onChange={(region) => setS3Config({ ...s3Config, region })}
      />
      
      <BucketTypeSelector
        types={config.bucketTypes}
        selected={s3Config.bucketType}
        onChange={(bucketType) => setS3Config({ ...s3Config, bucketType })}
      />
      
      <PermissionSelector
        permissions={config.permissions}
        selected={s3Config.permissions}
        onChange={(permissions) => setS3Config({ ...s3Config, permissions })}
      />
      
      <button
        onClick={() => onConfigure(s3Config)}
        className="w-full py-2 bg-blue-600 text-white rounded"
      >
        Configure S3
      </button>
    </div>
  );
};

const CloudFunctionsConfiguration = ({ config, onConfigure }) => {
  const [functionConfig, setFunctionConfig] = useState({
    runtime: config.runtime[0],
    memory: config.memory[0],
    trigger: config.triggers[0]
  });

  return (
    <div className="function-config space-y-4">
      <h4 className="font-medium">Cloud Functions Setup</h4>
      
      <RuntimeSelector
        runtimes={config.runtime}
        selected={functionConfig.runtime}
        onChange={(runtime) => setFunctionConfig({ ...functionConfig, runtime })}
      />
      
      <MemorySelector
        options={config.memory}
        selected={functionConfig.memory}
        onChange={(memory) => setFunctionConfig({ ...functionConfig, memory })}
      />
      
      <TriggerSelector
        triggers={config.triggers}
        selected={functionConfig.trigger}
        onChange={(trigger) => setFunctionConfig({ ...functionConfig, trigger })}
      />
      
      <button
        onClick={() => onConfigure(functionConfig)}
        className="w-full py-2 bg-blue-600 text-white rounded"
      >
        Configure Function
      </button>
    </div>
  );
};

export { S3Configuration, CloudFunctionsConfiguration };
