
import React, { useState, useEffect, useRef } from 'react';
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
  const [newData, setNewData] = useState(false);
  const terminalContentRef = useRef<HTMLDivElement>(null);

  // Initialize with initial data
  useEffect(() => {
    if (open) {
      const initialData = dataGenerator();
      if (initialData.length > 0 && !isTyping) {
        setCurrentData([initialData[0]]);
        setIsTyping(true);
      }
    }
  }, [open, dataGenerator]);

  // Update terminal data at intervals
  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      if (!isTyping) {
        const newData = dataGenerator();
        if (newData.length > 0) {
          setCurrentData([newData[0]]);
          setIsTyping(true);
          setNewData(true); // Indicate new data is available
          
          // Reset the new data notification after 2 seconds
          setTimeout(() => setNewData(false), 2000);
        }
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, [open, dataGenerator, isTyping, updateInterval]);

  // Scroll to bottom when new content is added
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [dataHistory]);

  const handleTypingComplete = () => {
    if (currentData.length > 0) {
      // Add the completed text to history
      setDataHistory(prev => {
        // Keep only the last 15 items to prevent too many items
        const newHistory = [...prev, currentData[0]];
        if (newHistory.length > 25) {
          return newHistory.slice(newHistory.length - 25);
        }
        return newHistory;
      });
      setIsTyping(false);
    }
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
          minimized ? "h-12 overflow-hidden" : "",
          newData ? "border-terminal-green border-2 shadow-terminal-green/50" : ""
        )}
        style={positionStyle}
        hideCloseButton={true}
      >
        <div className="flex justify-between items-center bg-gray-800/90 px-4 py-2 border-b border-terminal-green/30 cursor-move">
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
        
        <div 
          ref={terminalContentRef}
          className="p-4 overflow-y-auto font-mono text-sm bg-black/90" 
          style={{ height: minimized ? '0' : 'calc(100% - 40px)' }}
        >
          <div className="space-y-2">
            {dataHistory.map((text, i) => (
              <div key={i} className="text-terminal-green">{text}</div>
            ))}
            {isTyping && currentData.length > 0 && (
              <TypewriterText 
                text={currentData[0]} 
                onComplete={handleTypingComplete}
                speed={20}
                className="text-terminal-green"
              />
            )}
            <span className="inline-block h-4 w-2 bg-terminal-green ml-1 blink"></span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TerminalDialog;
