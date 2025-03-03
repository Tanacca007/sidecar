import { motion } from 'framer-motion';

const FormatSelector = ({ formats, selected, onSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {Object.entries(formats).map(([key, format]) => (
        <motion.button
          key={key}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(key)}
          className={`p-4 rounded-lg border-2 ${
            selected === key ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
        >
          <i className={`icon-${format.icon} text-2xl mb-2`} />
          <h3 className="font-medium">{format.label}</h3>
          <span className="text-sm text-gray-500">{format.quality}</span>
        </motion.button>
      ))}
    </div>
  );
};