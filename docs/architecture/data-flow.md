# Symbiont — data flow and trust boundaries

```mermaid
sequenceDiagram
  actor User
  participant Browser as React browser (untrusted)
  participant Fn as Supabase Edge Function (privileged)
  participant AI as External Lovable AI gateway
  participant DB as Supabase PostgreSQL
  User->>Browser: Trigger sample analysis
  Browser->>Fn: invoke symbiont-brain
  Note over Browser,Fn: Trust boundary: caller to server; JWT verification disabled in repo config
  Fn->>Fn: Select hard-coded MOCK_POST
  Fn->>AI: Send post and classification instructions
  Note over Fn,AI: External processor boundary; post is untrusted model input
  AI-->>Fn: Generated JSON classification
  Fn->>Fn: Parse JSON; fallback on parse failure
  Fn->>DB: Service-role INSERT into agent_reports
  DB-->>Fn: Stored report
  Fn-->>Browser: Report and classification
  DB-->>Browser: Realtime INSERT event / SELECT
```

**Data provenance:** A sample post is not a verified social-platform observation. The UI must not imply otherwise. **Model output:** JSON syntax is not a validation of sentiment, county or risk values. **Authorization:** browser route protection is not a substitute for server-side verification. **Privacy:** future live ingestion requires data minimization, lawful basis, retention and access controls.
