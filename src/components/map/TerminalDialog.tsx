import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import TypewriterText from '../common/TypewriterText';
import { X, ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Draggable from 'react-draggable';

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
  position = { top: '20%', left: '0%' },
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
  const nodeRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  // Initialize with initial data
  useEffect(() => {
    if (open) {
      const initialData = dataGenerator();
      setDataHistory([]); // Clear history when reopened
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
        // Keep only the last 30 items to prevent too many items
        const newHistory = [...prev, currentData[0]];
        if (newHistory.length > 30) {
          return newHistory.slice(newHistory.length - 30);
        }
        return newHistory;
      });
      setIsTyping(false);
    }
  };

  // Don't use Dialog component, directly render the draggable component
  if (!open) return null;

  const positionStyle = maximized ? 
    { width: '90%', height: '90%' } : 
    { width, height };

  return (
    <Draggable 
      nodeRef={nodeRef}
      handle=".drag-handle"
      defaultPosition={{x: parseInt(position.left || '0'), y: parseInt(position.top || '0')}}
      onStart={() => setDragging(true)}
      onStop={() => setDragging(false)}
      bounds="parent"
    >
      <div 
        ref={nodeRef}
        className={cn(
          "fixed z-50 shadow-lg",
          minimized ? "h-12 overflow-hidden" : "",
          newData ? "border-terminal-green shadow-lg shadow-terminal-green/40" : "",
          dragging ? "cursor-grabbing" : "cursor-auto"
        )}
        style={positionStyle}
      >
        <div 
          className={cn(
            "bg-black/95 border border-terminal-green/60 text-terminal-green rounded-sm",
            "flex flex-col w-full h-full overflow-hidden",
            newData && "shadow-[0_0_15px_rgba(51,255,0,0.5)]"
          )}
        >
          {/* Terminal Header */}
          <div className="drag-handle flex justify-between items-center bg-black px-4 py-2 border-b border-terminal-green/60 cursor-grab">
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-destructive mr-2"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
              <span className="h-3 w-3 rounded-full bg-positive mr-2"></span>
              <h3 className="text-sm font-mono text-terminal-green tracking-wider">TERMINAL:: {title}</h3>
            </div>
            <div className="flex items-center space-x-2">
              {maximized ? (
                <Minimize2 
                  size={14} 
                  className="text-terminal-green/70 hover:text-terminal-green cursor-pointer"
                  onClick={() => setMaximized(false)} 
                />
              ) : (
                <Maximize2 
                  size={14} 
                  className="text-terminal-green/70 hover:text-terminal-green cursor-pointer"
                  onClick={() => { setMaximized(true); setMinimized(false); }} 
                />
              )}
              {minimized ? (
                <ChevronUp 
                  size={14} 
                  className="text-terminal-green/70 hover:text-terminal-green cursor-pointer"
                  onClick={() => setMinimized(false)} 
                />
              ) : (
                <ChevronDown 
                  size={14} 
                  className="text-terminal-green/70 hover:text-terminal-green cursor-pointer"
                  onClick={() => setMinimized(true)} 
                />
              )}
              <X 
                size={14} 
                className="text-terminal-green/70 hover:text-destructive cursor-pointer"
                onClick={() => onOpenChange(false)} 
              />
            </div>
          </div>
          
          {/* Terminal Content */}
          <div 
            ref={terminalContentRef}
            className="p-4 overflow-y-auto font-mono text-sm bg-black/95 flex-grow" 
            style={{ height: minimized ? '0' : 'auto' }}
          >
            <div className="space-y-2">
              {dataHistory.map((text, i) => (
                <div key={i} className="text-terminal-green">{text}</div>
              ))}
              {isTyping && currentData.length > 0 && (
                <TypewriterText 
                  text={currentData[0]} 
                  onComplete={handleTypingComplete}
                  speed={10}
                  className="text-terminal-green"
                />
              )}
              <span className="inline-block h-4 w-2 bg-terminal-green ml-1 blink"></span>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default TerminalDialog;
