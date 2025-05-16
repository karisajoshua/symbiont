
import React, { useState, useEffect } from 'react';

interface DataRibbonProps {
  position?: 'top' | 'bottom';
}

const DataRibbon: React.FC<DataRibbonProps> = ({ position = 'top' }) => {
  const [dataStream, setDataStream] = useState<string[]>([]);
  
  const generateRandomHex = (length: number) => {
    let result = '';
    const characters = '0123456789ABCDEF';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  useEffect(() => {
    // Generate initial data stream
    const initialStream = Array(20).fill('').map(() => generateRandomHex(32));
    setDataStream(initialStream);
    
    // Update entire data stream every 5 seconds
    const interval = setInterval(() => {
      const newStream = Array(20).fill('').map(() => generateRandomHex(32));
      setDataStream(newStream);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`overflow-hidden h-6 bg-black bg-opacity-40 text-xs ${position === 'top' ? 'border-b' : 'border-t'} border-gray-700`}>
      <div className="flex justify-between">
        {dataStream.map((data, index) => (
          <div 
            key={index} 
            className="text-terminal-green opacity-70 px-2"
          >
            {data}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataRibbon;
