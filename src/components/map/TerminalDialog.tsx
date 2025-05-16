
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import TypewriterText from '../common/TypewriterText';
import { X, ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TerminalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  width?: string;
  height?: string;
  dataGenerator: () => string[];
  updateInterval?: number;
}

const TerminalDialog: React.FC<TerminalDialogProps> = ({
  open,
  onOpenChange,
  title,
  position = { top: '20%', left: '20%' },
  width = '500px',
  height = '300px',
  dataGenerator,
  updateInterval = 5000
}) => {
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [currentData, setCurrentData] = useState<string[]>([]);
  const [dataHistory, setDataHistory] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize with some data
  useEffect(() => {
    if (open && currentData.length === 0) {
      const initialData = dataGenerator();
      setCurrentData([initialData[0]]);
    }
  }, [open, dataGenerator, currentData.length]);

  // Update terminal data at intervals
  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      if (!isTyping) {
        const newData = dataGenerator();
        setCurrentData([newData[0]]);
        setIsTyping(true);
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, [open, dataGenerator, isTyping, updateInterval]);

  const handleTypingComplete = () => {
    setDataHistory(prev => [...prev, currentData[0]]);
    setIsTyping(false);
  };

  const positionStyle = maximized ? 
    { top: '5%', left: '5%', right: '5%', bottom: '5%', width: 'auto', height: 'auto' } : 
    { ...position, width, height };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={cn(
          "bg-gray-900/95 border border-terminal-green/40 text-terminal-green shadow-lg shadow-terminal-green/20 p-0 m-0 max-w-none",
          minimized ? "h-12 overflow-hidden" : ""
        )}
        style={positionStyle}
        hideCloseButton={true}
      >
        <div className="flex justify-between items-center bg-gray-800/70 px-4 py-2 border-b border-terminal-green/30 cursor-move">
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-destructive mr-2"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
            <span className="h-3 w-3 rounded-full bg-positive mr-2"></span>
            <h3 className="text-sm font-mono text-terminal-green">TERMINAL:: {title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            {maximized ? (
              <Minimize2 
                size={14} 
                className="text-gray-400 hover:text-terminal-green cursor-pointer"
                onClick={() => setMaximized(false)} 
              />
            ) : (
              <Maximize2 
                size={14} 
                className="text-gray-400 hover:text-terminal-green cursor-pointer"
                onClick={() => { setMaximized(true); setMinimized(false); }} 
              />
            )}
            {minimized ? (
              <ChevronUp 
                size={14} 
                className="text-gray-400 hover:text-terminal-green cursor-pointer"
                onClick={() => setMinimized(false)} 
              />
            ) : (
              <ChevronDown 
                size={14} 
                className="text-gray-400 hover:text-terminal-green cursor-pointer"
                onClick={() => setMinimized(true)} 
              />
            )}
            <X 
              size={14} 
              className="text-gray-400 hover:text-destructive cursor-pointer"
              onClick={() => onOpenChange(false)} 
            />
          </div>
        </div>
        
        <div className="p-4 overflow-y-auto font-mono text-sm" style={{ height: minimized ? '0' : 'calc(100% - 40px)' }}>
          <div className="space-y-2">
            {dataHistory.map((text, i) => (
              <div key={i} className="text-terminal-green opacity-80">{text}</div>
            ))}
            {isTyping && currentData.length > 0 && (
              <TypewriterText text={currentData[0]} onComplete={handleTypingComplete} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TerminalDialog;
