const ExportProgress = ({ job }) => {
  return (
    <div className="export-progress p-4 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium">Export Progress</h4>
        <StatusBadge status={job.status} />
      </div>
      
      <ProgressBar
        progress={job.progress}
        status={job.status}
      />
      
      <ExportDetails job={job} />
    </div>
  );
};
