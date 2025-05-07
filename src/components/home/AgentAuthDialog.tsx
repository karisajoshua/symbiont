
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Lock, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

type AuthStage = 'form' | 'verifying-agent' | 'securing-connection' | 'connecting-tor' | 'complete';

interface AgentAuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const AgentAuthDialog = ({ open, onOpenChange, onSuccess }: AgentAuthDialogProps) => {
  const { toast } = useToast();
  const [agentId, setAgentId] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [errors, setErrors] = useState({ agentId: '', accessCode: '' });
  const [authStage, setAuthStage] = useState<AuthStage>('form');
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate agent ID (8 characters, uppercase letters and numbers)
  const validateAgentId = (id: string) => {
    const regex = /^[A-Z0-9]{8}$/;
    return regex.test(id);
  };

  // Validate mission access code (country initials-3 numbers)
  const validateAccessCode = (code: string) => {
    const regex = /^[A-Z]{2,3}-[0-9]{3}$/;
    return regex.test(code);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors = {
      agentId: validateAgentId(agentId) ? '' : 'Agent ID must be 8 characters (uppercase letters and numbers only)',
      accessCode: validateAccessCode(accessCode) ? '' : 'Format: XX-000 (country initials followed by 3 numbers)'
    };
    
    setErrors(newErrors);
    
    // If no errors, proceed with authentication simulation
    if (!newErrors.agentId && !newErrors.accessCode) {
      setIsSubmitting(true);
      setAuthStage('verifying-agent');
      setProgress(0);
    }
  };

  // Handle the progress animation for each authentication stage
  useEffect(() => {
    if (authStage === 'form' || authStage === 'complete') return;

    let progressInterval: NodeJS.Timeout;
    
    progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        
        // When progress hits 100%, move to next stage
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          
          // Determine next stage
          switch (authStage) {
            case 'verifying-agent':
              setTimeout(() => {
                setAuthStage('securing-connection');
                setProgress(0);
              }, 500);
              break;
            case 'securing-connection':
              setTimeout(() => {
                setAuthStage('connecting-tor');
                setProgress(0);
              }, 500);
              break;
            case 'connecting-tor':
              setTimeout(() => {
                setAuthStage('complete');
                setIsSubmitting(false);
                toast({
                  title: "Authentication Complete",
                  description: `Welcome Agent ${agentId}. Access granted.`,
                });
                // Close dialog after a delay and trigger success callback
                setTimeout(() => {
                  onOpenChange(false);
                  if (onSuccess) {
                    onSuccess();
                  }
                }, 1500);
              }, 500);
              break;
          }
        }
        
        return newProgress;
      });
    }, 30);

    return () => clearInterval(progressInterval);
  }, [authStage, toast, agentId, onOpenChange, onSuccess]);

  // Reset form when dialog is opened
  useEffect(() => {
    if (open) {
      setAgentId('');
      setAccessCode('');
      setErrors({ agentId: '', accessCode: '' });
      setAuthStage('form');
      setProgress(0);
      setIsSubmitting(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-secondary border border-gray-700 text-foreground max-w-md p-0 overflow-hidden">
        <div className="absolute inset-0 grid-overlay z-0 opacity-20"></div>
        
        <div className="relative z-10 p-6">
          <DialogHeader className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Shield className="text-primary mr-2" size={18} />
                <span className="text-xs text-primary tracking-wider">RESTRICTED ACCESS</span>
              </div>
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            <DialogTitle className="text-xl font-mono text-white">
              AGENT VERIFICATION SYSTEM
              <span className="blink ml-1">_</span>
            </DialogTitle>
          </DialogHeader>

          {authStage === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="agentId" className="block text-sm text-gray-300 font-mono">
                  AGENT ID
                </label>
                <Input
                  id="agentId"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value.toUpperCase())}
                  placeholder="ENTER 8-CHAR ID"
                  maxLength={8}
                  className="bg-gray-900 border-gray-700 text-white font-mono placeholder:text-gray-500 focus:border-primary"
                />
                {errors.agentId && (
                  <p className="text-xs text-red-400">{errors.agentId}</p>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="accessCode" className="block text-sm text-gray-300 font-mono">
                  MISSION ACCESS CODE
                </label>
                <Input
                  id="accessCode"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  placeholder="XX-000"
                  className="bg-gray-900 border-gray-700 text-white font-mono placeholder:text-gray-500 focus:border-primary"
                />
                {errors.accessCode && (
                  <p className="text-xs text-red-400">{errors.accessCode}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gray-800 border border-primary text-primary hover:bg-primary hover:text-black transition-colors font-mono mt-4"
                disabled={isSubmitting}
              >
                <Lock className="mr-2" size={16} />
                AUTHENTICATE
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </form>
          )}

          {authStage !== 'form' && authStage !== 'complete' && (
            <div className="space-y-6 py-4">
              <div className="flex flex-col items-center justify-center">
                <div className="h-16 w-16 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                
                <div className="text-center space-y-1">
                  <p className="text-lg font-mono text-primary">
                    {authStage === 'verifying-agent' && 'VERIFYING AGENT'}
                    {authStage === 'securing-connection' && 'SECURING CONNECTION PORTAL'}
                    {authStage === 'connecting-tor' && 'CONNECTING TO TOR SERVER'}
                  </p>
                  <p className="text-xs text-gray-400 font-mono">
                    {authStage === 'verifying-agent' && 'VALIDATING CREDENTIALS...'}
                    {authStage === 'securing-connection' && 'ESTABLISHING ENCRYPTED TUNNEL...'}
                    {authStage === 'connecting-tor' && 'ROUTING THROUGH SECURE NODES...'}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400 font-mono">PROGRESS</span>
                  <span className="text-primary font-mono">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-gray-800">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </Progress>
              </div>

              <div className="grid grid-cols-3 gap-1 mt-4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div 
                    key={i}
                    className="h-1 bg-gray-700 rounded-full overflow-hidden"
                    style={{
                      animation: `scanning ${1 + Math.random() * 2}s infinite`,
                      animationDelay: `${Math.random() * 0.5}s`
                    }}
                  >
                    <div 
                      className="h-full bg-primary" 
                      style={{ 
                        width: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.7 + 0.3
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {authStage === 'complete' && (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-900 bg-opacity-20 border border-green-500 mb-4">
                <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-black" />
                </div>
              </div>
              <h3 className="text-lg font-mono text-green-400 mb-1">ACCESS GRANTED</h3>
              <p className="text-sm text-gray-300">Authentication successful</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentAuthDialog;
