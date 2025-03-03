const SchedulingOptions = ({ options, onSchedule }) => {
  const [schedule, setSchedule] = useState({
    frequency: 'daily',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    retention: 30,
    nextRun: null
  });

  return (
    <div className="scheduling-options p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Schedule Exports</h3>
      
      <FrequencySelector
        options={options.recurring}
        value={schedule.frequency}
        onChange={(frequency) => setSchedule({ ...schedule, frequency })}
      />
      
      <TimeZoneSelector
        zones={options.timeZones}
        value={schedule.timeZone}
        onChange={(timeZone) => setSchedule({ ...schedule, timeZone })}
      />
      
      <RetentionSelector
        options={options.retention}
        value={schedule.retention}
        onChange={(retention) => setSchedule({ ...schedule, retention })}
      />
      
      <NextRunPreview schedule={schedule} />
    </div>
  );
};
