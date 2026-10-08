# Symbiont — verified system architecture

**Source:** `main` inspected October 2026. **Status:** code-level assessment, not a deployment audit.

```mermaid
flowchart TD
  subgraph B["Browser / untrusted client"]
    UI["React + TypeScript dashboard"]
    SB["Supabase JS client"]
    UI --> SB
  end
  subgraph S["Supabase project / server boundary"]
    EF["symbiont-brain Edge Function"]
    DB[("agent_reports / PostgreSQL")]
    EF -->|"service-role INSERT + SELECT"| DB
    SB -->|"SELECT + realtime subscription"| DB
    SB -->|"functions.invoke"| EF
  end
  subgraph X["External AI provider boundary"]
    AI["Lovable AI gateway / Gemini model"]
  end
  EF -->|"hard-coded sample post + instructions"| AI
  AI -->|"untrusted model-generated JSON"| EF
  DB -->|"reports / events"| SB
```

## Verified components

- `src/hooks/useAgentReports.tsx`: SELECT (100 most recent), realtime INSERT subscription, and Edge Function invocation.
- `supabase/functions/symbiont-brain/index.ts`: hard-coded `MOCK_POSTS`, Lovable AI gateway request, JSON parsing and fallback, service-role database insertion.
- `supabase/config.toml`: `verify_jwt = false` for the function.
- `src/components/common/SimulatedDataProvider.tsx`: client-side simulated feeds.
- `src/components/common/ProtectedRoute.tsx`: browser-side navigation guard; not evidence of server-side authorization.

## Not established by this review

Runtime network exposure, deployed configuration, actual database RLS policy effectiveness, key compromise, AI classification accuracy, and production traffic. Verify independently before describing these as tested.
