
// Generate random text for terminal outputs
const generateRandomHex = (length: number) => {
  let result = '';
  const characters = '0123456789ABCDEF';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// List of typical server commands and responses
const serverCommands = [
  "ssh connection established to",
  "executing remote command:",
  "initializing secure connection to",
  "scanning ports on",
  "analyzing network traffic from",
  "downloading data from",
  "encrypting transmission to",
  "authentication successful on",
  "accessing database on",
  "deploying countermeasures at",
];

// List of server actions
const serverActions = [
  "packets transmitted",
  "handshake complete",
  "security protocols enabled",
  "firewall updated",
  "permission granted",
  "access denied - retrying...",
  "vulnerability detected",
  "traffic analysis complete",
  "data encrypted using AES-256",
  "infiltration attempt blocked",
];

// List of security status messages
const securityStatuses = [
  "THREAT LEVEL: LOW",
  "THREAT LEVEL: MODERATE",
  "THREAT LEVEL: HIGH",
  "WARNING: Unusual traffic pattern detected",
  "ALERT: Multiple login attempts from unauthorized IP",
  "NOTICE: System scan complete - no vulnerabilities found",
  "CAUTION: Outdated security certificate",
  "WARNING: Potential DDoS attack in progress",
  "ALERT: Suspicious file quarantined",
  "SYSTEM: Security patch applied successfully",
];

// List of agent activity messages
const agentActivities = [
  "Agent deployed to monitor social media channels",
  "Web crawler extracting sentiment data from news outlets",
  "Natural language processing of trending topics",
  "Analyzing engagement metrics across platforms",
  "Detecting disinformation campaigns on social networks",
  "Tracking narrative shifts in target demographics",
  "Monitoring influential accounts for activity patterns",
  "Cross-referencing data points with historical trends",
  "Generating predictive models based on engagement",
  "Isolating key opinion leaders within network clusters",
];

// Server node data generator
export const generateServerNodeData = () => {
  const serverIndex = Math.floor(Math.random() * 25) + 1;
  const serverName = `SVR-${serverIndex.toString().padStart(2, '0')}`;
  const ipAddress = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  const command = serverCommands[Math.floor(Math.random() * serverCommands.length)];
  const action = serverActions[Math.floor(Math.random() * serverActions.length)];
  const timestamp = new Date().toISOString().replace('T', ' ').substr(0, 19);
  const sessionId = generateRandomHex(8).toUpperCase();
  
  return [
    `[${timestamp}] SESSION ${sessionId}: ${command} ${serverName} (${ipAddress}) ... ${action}`
  ];
};

// Network traffic data generator
export const generateNetworkTrafficData = () => {
  const sourceIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  const destIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  const protocol = Math.random() > 0.5 ? 'TCP' : 'UDP';
  const port = Math.floor(Math.random() * 65535);
  const dataSize = `${(Math.random() * 1000).toFixed(2)} KB`;
  const timestamp = new Date().toISOString().replace('T', ' ').substr(0, 19);
  const packetId = generateRandomHex(12).toUpperCase();
  
  return [
    `[${timestamp}] PACKET ${packetId}: ${sourceIP} → ${destIP} | ${protocol}:${port} | ${dataSize} | ROUTE: ${Math.floor(Math.random() * 12) + 1} HOPS`
  ];
};

// Security alert data generator
export const generateSecurityAlertData = () => {
  const status = securityStatuses[Math.floor(Math.random() * securityStatuses.length)];
  const location = `REG-${Math.floor(Math.random() * 10)}`;
  const timestamp = new Date().toISOString().replace('T', ' ').substr(0, 19);
  const alertId = generateRandomHex(6).toUpperCase();
  
  return [
    `[${timestamp}] ALERT ${alertId}: ${status} | LOCATION: ${location} | SIGNATURE: 0x${generateRandomHex(8)}`
  ];
};

// Web agent activity data generator
export const generateAgentActivityData = () => {
  const activity = agentActivities[Math.floor(Math.random() * agentActivities.length)];
  const platform = ['Twitter', 'Facebook', 'Instagram', 'TikTok', 'News Outlets', 'Forums'][Math.floor(Math.random() * 6)];
  const confidence = `${(Math.random() * 40 + 60).toFixed(2)}%`;
  const agentId = `AGT-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 100)}`;
  const timestamp = new Date().toISOString().replace('T', ' ').substr(0, 19);
  
  return [
    `[${timestamp}] ${agentId}: ${activity} | PLATFORM: ${platform} | CONFIDENCE: ${confidence}`
  ];
};

// Terminal command output generator
export const generateSystemCommandData = () => {
  const commands = [
    "SYSTEM: Running diagnostics...",
    "SYSTEM: Verifying network integrity...",
    "SYSTEM: Updating encryption keys...",
    "SYSTEM: Checking server status...",
    "SYSTEM: Analyzing threat intelligence...",
    "SYSTEM: Scanning for vulnerabilities...",
    "SYSTEM: Optimizing connection routes...",
    "SYSTEM: Validating security protocols...",
    "SYSTEM: Monitoring system resources...",
    "SYSTEM: Synchronizing with remote nodes..."
  ];
  
  const command = commands[Math.floor(Math.random() * commands.length)];
  const timestamp = new Date().toISOString().replace('T', ' ').substr(0, 19);
  
  return [
    `[${timestamp}] ${command} COMPLETE | STATUS: OPERATIONAL | HASH: ${generateRandomHex(16)}`
  ];
};
