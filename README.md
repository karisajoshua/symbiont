# Symbiont

A social sentiment and geographic reporting **prototype** built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

## What the repository contains

- Dashboard views for sentiment metrics, timelines, feeds, filters, and regional maps.
- A Supabase-backed `agent_reports` feed with a subscription for new report records.
- A `symbiont-brain` Edge Function that selects a sample post, asks an AI model to classify sentiment, county, and risk, then stores a report.
- Separate simulated data providers and dashboard examples for interface exploration.

**Implementation status:** The social posts processed by the Edge Function are hard-coded samples. Several dashboard views generate simulated activity locally. This repository does not demonstrate live ingestion from social platform APIs, verified production analytics, or a deployed multi-platform monitoring service. Some UI copy uses terms such as “live”; read that as a demo interface unless it is connected to the Supabase reports path.

## Independent AI safety assessment

[Tessa Angelika Mmaitsi's independent AI safety threat model of Symbiont](https://github.com/Tessangelika/threat-aware-learner/blob/main/ai-system-analyses/symbiont-threat-model.md) examines potential classification failures, geographic misattribution, surveillance misuse, privacy, and risks of moving a prototype into production. The assessment was authored independently by Tessa as an AI safety portfolio case study; it is not a certification, penetration test, or joint authorship claim.

For the developer's source-grounded architecture diagrams, trust boundaries, STRIDE analysis and remediation plan, see [security documentation](docs/security/README.md).

## Run locally

Install dependencies with `npm install`, then run `npm run dev`. See `package.json` for the available scripts. Supabase-dependent features need a configured Supabase project and the Edge Function's required server-side environment variables. Keep service-role and AI gateway keys out of client environment files.

## Architecture notes

The UI is in `src/pages` and `src/components`. `src/hooks/useAgentReports.tsx` reads and subscribes to the `agent_reports` table. `supabase/functions/symbiont-brain/index.ts` contains the sample-post analysis flow; the schema is under `supabase/migrations`. `src/hooks/useRealTimeData.tsx` and `src/components/common/SimulatedDataProvider.tsx` provide generated demo feeds.

## Next steps

Replace sample posts with authorized data ingestion, connect dashboard views consistently to stored reports, implement and verify server-enforced access controls, add tests for the analysis and reporting flow, and document deployment and data handling before production use.
