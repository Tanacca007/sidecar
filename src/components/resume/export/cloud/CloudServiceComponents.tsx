const AWSServices = ({ services }) => {
  return (
    <div className="aws-services p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">AWS Services</h3>
      
      <S3Configuration
        config={services.s3}
        onConfigure={handleS3Config}
      />
      
      <SESConfiguration
        config={services.ses}
        onConfigure={handleSESConfig}
      />
      
      <LambdaConfiguration
        config={services.lambda}
        onConfigure={handleLambdaConfig}
      />
    </div>
  );
};

const GCPServices = ({ services }) => {
  return (
    <div className="gcp-services p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Google Cloud Platform</h3>
      
      <StorageConfiguration
        config={services.storage}
        onConfigure={handleGCPStorageConfig}
      />
      
      <CloudFunctionsConfiguration
        config={services.functions}
        onConfigure={handleCloudFunctionsConfig}
      />
    </div>
  );
};

const AzureServices = ({ services }) => {
  return (
    <div className="azure-services p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Azure Services</h3>
      
      <BlobStorageConfiguration
        config={services.blob}
        onConfigure={handleBlobConfig}
      />
      
      <AzureFunctionsConfiguration
        config={services.functions}
        onConfigure={handleAzureFunctionsConfig}
      />
    </div>
  );
};

export { AWSServices, GCPServices, AzureServices };
