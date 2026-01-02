
import React from 'react';

interface AdSlotProps {
  type: 'banner' | 'sidebar' | 'feed';
  label?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ type, label = 'Advertisement' }) => {
  const styles = {
    banner: 'w-full h-24 bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center mb-6',
    sidebar: 'w-full h-64 bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center mb-6',
    feed: 'w-full h-32 bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center my-8'
  };

  return (
    <div className={styles[type]}>
      <div className="text-center">
        <span className="text-xs uppercase font-bold text-gray-400 block mb-1">{label}</span>
        <span className="text-sm text-gray-500">Ad Placement Ready</span>
      </div>
    </div>
  );
};

export default AdSlot;
