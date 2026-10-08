# Symbiont — AI trust and attack boundaries

```mermaid
flowchart LR
  U["Sample posts (future: external untrusted posts)"] --> P["Prompt assembly"]
  P --> M["External AI model"]
  M --> O["Generated JSON / untrusted output"]
  O --> V{"Strict schema + allowlists?"}
  V -->|"Valid"| DB[("agent_reports")]
  V -->|"Invalid"| Q["Reject / log / review"]
  P -.-> PI["Prompt injection threat"]
  U -.-> DP["Data poisoning threat"]
  M -.-> BI["Bias and classification error"]
  DB --> UI["Dashboard with source labels"]
  classDef proposed stroke-dasharray:5 4
  class V,Q proposed
```

**Important:** The strict validator and rejection path are **recommended controls**, not currently verified as implemented. Current code parses JSON and inserts values, or writes Neutral/Nairobi/Low on parse failure.

Recommended validation: explicit allowed sentiment and risk enumerations, known county list, length bounds, request timeout, reject-on-failure, classification provenance and model-version metadata. Treat every social post as data, never as instructions. Evaluate adversarial posts and Swahili/Sheng/code-switched samples before making accuracy claims.
