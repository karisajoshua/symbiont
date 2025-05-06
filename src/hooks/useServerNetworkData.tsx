
import { useState, useEffect } from 'react';

// Server node types
type ServerType = 'secure' | 'standard' | 'honeypot' | 'compromised';

// Connection types
type ConnectionType = 'normal' | 'warning' | 'critical';

// Server node interface
interface ServerNode {
  id: string;
  name: string;
  type: ServerType;
  lat: number;
  lng: number;
  status: string;
}

// Connection interface
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
  type: ConnectionType;
  strength: number;
}

// Major cities for server locations
const serverLocations = [
  { name: "NYC-01", lat: 40.7128, lng: -74.0060 },
  { name: "LON-02", lat: 51.5074, lng: -0.1278 },
  { name: "TKY-03", lat: 35.6762, lng: 139.6503 },
  { name: "SYD-04", lat: -33.8688, lng: 151.2093 },
  { name: "PAR-05", lat: 48.8566, lng: 2.3522 },
  { name: "MOW-06", lat: 55.7558, lng: 37.6173 },
  { name: "AUH-07", lat: 24.4539, lng: 54.3773 },
  { name: "DXB-08", lat: 25.2048, lng: 55.2708 },
  { name: "SHJ-09", lat: 25.3463, lng: 55.4209 },
  { name: "SFO-10", lat: 37.7749, lng: -122.4194 },
  { name: "SIN-11", lat: 1.3521, lng: 103.8198 },
  { name: "HKG-12", lat: 22.3193, lng: 114.1694 },
  { name: "CAI-13", lat: 30.0444, lng: 31.2357 },
  { name: "JNB-14", lat: -26.2041, lng: 28.0473 },
  { name: "RIO-15", lat: -22.9068, lng: -43.1729 },
  { name: "MEX-16", lat: 19.4326, lng: -99.1332 },
  { name: "DEL-17", lat: 28.6139, lng: 77.2090 },
  { name: "IST-18", lat: 41.0082, lng: 28.9784 },
  { name: "BER-19", lat: 52.5200, lng: 13.4050 },
  { name: "TOR-20", lat: 43.6532, lng: -79.3832 },
  { name: "KUL-21", lat: 3.1390, lng: 101.6869 },
  { name: "BKK-22", lat: 13.7563, lng: 100.5018 },
  { name: "CPT-23", lat: -33.9249, lng: 18.4241 },
  { name: "SEA-24", lat: 47.6062, lng: -122.3321 },
  { name: "MIA-25", lat: 25.7617, lng: -80.1918 },
];

// Generate a random server type
const getRandomServerType = (): ServerType => {
  const types: ServerType[] = ['secure', 'standard', 'honeypot', 'compromised'];
  const weights = [0.4, 0.4, 0.1, 0.1]; // 40% secure, 40% standard, 10% honeypot, 10% compromised
  
  const randomValue = Math.random();
  let weightSum = 0;
  
  for (let i = 0; i < types.length; i++) {
    weightSum += weights[i];
    if (randomValue < weightSum) return types[i];
  }
  
  return 'standard';
};

// Generate random server status
const getRandomServerStatus = (): string => {
  const statuses = ['ONLINE', 'ACTIVE', 'STANDBY', 'PROCESSING', 'MONITORING'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Generate initial server nodes
const generateInitialServerNodes = (): ServerNode[] => {
  return serverLocations.map((location, index) => ({
    id: `server-${index + 1}`,
    name: location.name,
    type: getRandomServerType(),
    lat: location.lat,
    lng: location.lng,
    status: getRandomServerStatus(),
  }));
};

// Generate connections between server nodes
const generateConnections = (nodes: ServerNode[]): Connection[] => {
  const connections: Connection[] = [];
  
  // Each server connects to 1-3 other servers
  nodes.forEach(fromNode => {
    const connectionCount = 1 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < connectionCount; i++) {
      // Pick a random target server that isn't the source
      const availableTargets = nodes.filter(n => n.id !== fromNode.id);
      const toNode = availableTargets[Math.floor(Math.random() * availableTargets.length)];
      
      // Determine connection type based on server types
      let connectionType: ConnectionType = 'normal';
      
      if (fromNode.type === 'compromised' || toNode.type === 'compromised') {
        connectionType = 'critical';
      } else if (fromNode.type === 'honeypot' || toNode.type === 'honeypot') {
        connectionType = 'warning';
      }
      
      // Add connection
      connections.push({
        id: `conn-${fromNode.id}-${toNode.id}`,
        from: {
          lat: fromNode.lat,
          lng: fromNode.lng,
          name: fromNode.name,
        },
        to: {
          lat: toNode.lat,
          lng: toNode.lng,
          name: toNode.name,
        },
        type: connectionType,
        strength: 20 + Math.floor(Math.random() * 80), // 20-100
      });
    }
  });
  
  return connections;
};

export const useServerNetworkData = () => {
  const [serverNodes, setServerNodes] = useState<ServerNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  
  // Initialize data
  useEffect(() => {
    const nodes = generateInitialServerNodes();
    setServerNodes(nodes);
    
    const initialConnections = generateConnections(nodes);
    setConnections(initialConnections);
  }, []);
  
  // Periodically update some connections and server statuses
  useEffect(() => {
    const interval = setInterval(() => {
      // Update some server statuses
      setServerNodes(prev => 
        prev.map(node => 
          Math.random() > 0.8 
            ? { ...node, status: getRandomServerStatus() } 
            : node
        )
      );
      
      // Update some connection strengths
      setConnections(prev => 
        prev.map(conn => 
          Math.random() > 0.7 
            ? { ...conn, strength: 20 + Math.floor(Math.random() * 80) } 
            : conn
        )
      );
      
      // Occasionally add or remove a connection
      if (Math.random() > 0.8) {
        setConnections(prev => {
          if (Math.random() > 0.5 && prev.length > 10) {
            // Remove a random connection
            const indexToRemove = Math.floor(Math.random() * prev.length);
            return [...prev.slice(0, indexToRemove), ...prev.slice(indexToRemove + 1)];
          } else {
            // Add a new random connection
            const fromNode = serverNodes[Math.floor(Math.random() * serverNodes.length)];
            const availableTargets = serverNodes.filter(n => n.id !== fromNode.id);
            const toNode = availableTargets[Math.floor(Math.random() * availableTargets.length)];
            
            let connectionType: ConnectionType = 'normal';
            if (fromNode.type === 'compromised' || toNode.type === 'compromised') {
              connectionType = 'critical';
            } else if (fromNode.type === 'honeypot' || toNode.type === 'honeypot') {
              connectionType = 'warning';
            }
            
            const newConnection: Connection = {
              id: `conn-${fromNode.id}-${toNode.id}-${Date.now()}`,
              from: {
                lat: fromNode.lat,
                lng: fromNode.lng,
                name: fromNode.name,
              },
              to: {
                lat: toNode.lat,
                lng: toNode.lng,
                name: toNode.name,
              },
              type: connectionType,
              strength: 20 + Math.floor(Math.random() * 80),
            };
            
            return [...prev, newConnection];
          }
        });
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [serverNodes]);
  
  return { serverNodes, connections };
};
