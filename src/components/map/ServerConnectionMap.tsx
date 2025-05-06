
import React, { useEffect, useRef, useState } from 'react';
import { useServerNetworkData } from '@/hooks/useServerNetworkData';

interface Connection {
  id: string;
  from: {
    lat: number;
    lng: number;
    name: string;
  };
  to: {
    lat: number;
    lng: number;
    name: string;
  };
  type: 'normal' | 'warning' | 'critical';
  strength: number;
}

const ServerConnectionMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { connections, serverNodes } = useServerNetworkData();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoverInfo, setHoverInfo] = useState<{ x: number; y: number; text: string } | null>(null);
  
  // Set up canvas size
  useEffect(() => {
    const updateDimensions = () => {
      if (mapRef.current) {
        const { width, height } = mapRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Draw map
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    
    // Draw world grid
    drawWorldGrid(ctx, dimensions.width, dimensions.height);
    
    // Draw server nodes
    serverNodes.forEach(node => {
      const x = longitudeToX(node.lng, dimensions.width);
      const y = latitudeToY(node.lat, dimensions.height);
      drawServerNode(ctx, x, y, node.type, node.name);
    });
    
    // Draw connections
    connections.forEach(connection => {
      const fromX = longitudeToX(connection.from.lng, dimensions.width);
      const fromY = latitudeToY(connection.from.lat, dimensions.height);
      const toX = longitudeToX(connection.to.lng, dimensions.width);
      const toY = latitudeToY(connection.to.lat, dimensions.height);
      
      drawConnection(ctx, fromX, fromY, toX, toY, connection.type, connection.strength);
    });
    
    // Draw hover information
    if (hoverInfo) {
      drawHoverInfo(ctx, hoverInfo.x, hoverInfo.y, hoverInfo.text);
    }
    
  }, [dimensions, connections, serverNodes, hoverInfo]);
  
  // Convert longitude to X coordinate
  const longitudeToX = (lng: number, width: number): number => {
    return ((lng + 180) / 360) * width;
  };
  
  // Convert latitude to Y coordinate
  const latitudeToY = (lat: number, height: number): number => {
    return ((90 - lat) / 180) * height;
  };
  
  // Draw world grid
  const drawWorldGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(51, 255, 0, 0.2)';
    ctx.lineWidth = 0.5;
    
    // Draw meridians
    for (let lng = -180; lng <= 180; lng += 15) {
      const x = longitudeToX(lng, width);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Draw parallels
    for (let lat = -90; lat <= 90; lat += 15) {
      const y = latitudeToY(lat, height);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw equator and prime meridian with different color
    ctx.strokeStyle = 'rgba(51, 255, 0, 0.4)';
    ctx.lineWidth = 1;
    
    const equatorY = latitudeToY(0, height);
    ctx.beginPath();
    ctx.moveTo(0, equatorY);
    ctx.lineTo(width, equatorY);
    ctx.stroke();
    
    const primeMeridianX = longitudeToX(0, width);
    ctx.beginPath();
    ctx.moveTo(primeMeridianX, 0);
    ctx.lineTo(primeMeridianX, height);
    ctx.stroke();
  };
  
  // Draw server node
  const drawServerNode = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    type: 'secure' | 'standard' | 'honeypot' | 'compromised',
    name: string
  ) => {
    // Different styles based on node type
    let color = 'rgba(51, 255, 0, 0.8)'; // Default green for secure
    let size = 4;
    
    if (type === 'standard') {
      color = 'rgba(0, 170, 255, 0.8)';
      size = 3;
    } else if (type === 'honeypot') {
      color = 'rgba(255, 165, 0, 0.8)';
      size = 5;
    } else if (type === 'compromised') {
      color = 'rgba(255, 0, 0, 0.8)';
      size = 4;
    }
    
    // Draw outer glow
    ctx.beginPath();
    ctx.arc(x, y, size + 3, 0, Math.PI * 2);
    ctx.fillStyle = color.replace('0.8', '0.2');
    ctx.fill();
    
    // Draw node
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    
    // Draw ring
    ctx.beginPath();
    ctx.arc(x, y, size + 1, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.5;
    ctx.stroke();
    
    // Draw small label
    ctx.font = '8px monospace';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(name, x, y + size + 10);
  };
  
  // Draw connection
  const drawConnection = (
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    type: 'normal' | 'warning' | 'critical',
    strength: number
  ) => {
    let color = 'rgba(51, 255, 0, 0.6)'; // Normal
    let dashPattern: number[] = [];
    
    if (type === 'warning') {
      color = 'rgba(255, 165, 0, 0.6)';
      dashPattern = [5, 5];
    } else if (type === 'critical') {
      color = 'rgba(255, 0, 0, 0.6)';
      dashPattern = [2, 2];
    }
    
    // Line width based on connection strength
    const lineWidth = Math.max(0.5, Math.min(3, strength / 33));
    
    // Calculate distance for arc
    const dx = toX - fromX;
    const dy = toY - fromY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Draw arc connection
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    
    if (dashPattern.length) {
      ctx.setLineDash(dashPattern);
    } else {
      ctx.setLineDash([]);
    }
    
    // Draw curved line
    const curveHeight = Math.min(50, distance / 4);
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2 - curveHeight;
    
    ctx.moveTo(fromX, fromY);
    ctx.quadraticCurveTo(midX, midY, toX, toY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Add direction arrow
    const arrowSize = Math.max(2, lineWidth * 3);
    const angle = Math.atan2(toY - midY, toX - midX);
    
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.translate(toX, toY);
    ctx.rotate(angle);
    ctx.moveTo(-arrowSize * 2, -arrowSize);
    ctx.lineTo(0, 0);
    ctx.lineTo(-arrowSize * 2, arrowSize);
    ctx.closePath();
    ctx.fill();
    
    // Reset transformations
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    
    // Animate data packet along the connection line
    const timestamp = Date.now() / 1000;
    const speed = 0.2 + (strength / 100) * 0.5; // Faster for stronger connections
    const t = ((timestamp * speed) % 1);
    
    const packetX = fromX + (toX - fromX) * t;
    const packetY = fromY + (toY - fromY) * t - Math.sin(t * Math.PI) * curveHeight;
    
    ctx.beginPath();
    ctx.arc(packetX, packetY, lineWidth + 1, 0, Math.PI * 2);
    ctx.fillStyle = color.replace('0.6', '1.0');
    ctx.fill();
  };
  
  // Draw hover information
  const drawHoverInfo = (ctx: CanvasRenderingContext2D, x: number, y: number, text: string) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.strokeStyle = 'rgba(51, 255, 0, 0.5)';
    ctx.lineWidth = 1;
    
    const padding = 5;
    const width = 150;
    const height = 60;
    
    // Ensure tooltip stays within canvas bounds
    const boxX = Math.min(x + 10, dimensions.width - width - padding);
    const boxY = Math.min(y + 10, dimensions.height - height - padding);
    
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, width, height, 3);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#33ff00';
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';
    
    const lines = text.split('\n');
    lines.forEach((line, i) => {
      ctx.fillText(line, boxX + padding, boxY + padding + 12 * (i + 1));
    });
  };
  
  // Handle mouse move for hover information
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mapRef.current || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if mouse is over a server node
    for (const node of serverNodes) {
      const nodeX = longitudeToX(node.lng, dimensions.width);
      const nodeY = latitudeToY(node.lat, dimensions.height);
      
      const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);
      
      if (distance < 10) {
        const connectionCount = connections.filter(
          conn => 
            (conn.from.lat === node.lat && conn.from.lng === node.lng) || 
            (conn.to.lat === node.lat && conn.to.lng === node.lng)
        ).length;
        
        setHoverInfo({
          x, 
          y, 
          text: `SERVER: ${node.name}\nTYPE: ${node.type.toUpperCase()}\nCONNECTIONS: ${connectionCount}\nSTATUS: ${node.status}`
        });
        return;
      }
    }
    
    setHoverInfo(null);
  };
  
  return (
    <div 
      ref={mapRef} 
      className="relative w-full h-full overflow-hidden rounded-md border border-gray-700 bg-gray-900"
      onMouseMove={handleMouseMove}
    >
      <canvas 
        ref={canvasRef} 
        width={dimensions.width} 
        height={dimensions.height}
        className="w-full h-full"
      />
      
      <div className="absolute bottom-2 left-2 text-xs text-gray-400 bg-black bg-opacity-50 p-1 rounded">
        <div>ACTIVE CONNECTIONS: {connections.length}</div>
        <div>SECURE NODES: {serverNodes.filter(n => n.type === 'secure').length}</div>
        <div>COMPROMISED: {serverNodes.filter(n => n.type === 'compromised').length}</div>
      </div>
      
      <div className="absolute top-2 right-2 flex items-center gap-4 bg-black bg-opacity-50 p-2 rounded text-xs">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-[rgba(51,255,0,0.8)] mr-1"></span>
          <span className="text-gray-300">SECURE</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-[rgba(0,170,255,0.8)] mr-1"></span>
          <span className="text-gray-300">STANDARD</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-[rgba(255,165,0,0.8)] mr-1"></span>
          <span className="text-gray-300">HONEYPOT</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-[rgba(255,0,0,0.8)] mr-1"></span>
          <span className="text-gray-300">COMPROMISED</span>
        </div>
      </div>
    </div>
  );
};

export default ServerConnectionMap;
