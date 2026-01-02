
import React from 'react';

const BreakingNewsTicker: React.FC = () => {
  const updates = [
    'ಬ್ರೇಕಿಂಗ್ ನ್ಯೂಸ್: ಬೆಂಗಳೂರಿನಲ್ಲಿ ಭಾರಿ ಮಳೆ ಮುನ್ಸೂಚನೆ',
    'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ನೂತನ ಕೃಷಿ ಯೋಜನೆ ಜಾರಿ',
    'ರಾಜಧಾನಿಯಲ್ಲಿ ಚುನಾವಣಾ ಕಣ ಕಾವೇರಿದೆ',
    'ಕ್ರೀಡೆ: ರಾಜ್ಯ ಮಟ್ಟದ ಕಬಡ್ಡಿ ಪಂದ್ಯಾವಳಿ ಪ್ರಾರಂಭ'
  ];

  return (
    <div className="bg-black text-white py-2 flex items-center overflow-hidden h-10">
      <div className="bg-red-600 px-4 py-2 font-bold z-10 whitespace-nowrap flex items-center h-full text-xs uppercase italic tracking-tighter">
        BREAKING NEWS
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {updates.map((update, i) => (
            <span key={i} className="mx-8 font-medium kannada-font">
              {update}
            </span>
          ))}
          {/* Duplicate for seamless scroll */}
          {updates.map((update, i) => (
            <span key={`dup-${i}`} className="mx-8 font-medium kannada-font">
              {update}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BreakingNewsTicker;
