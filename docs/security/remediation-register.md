# Symbiont — remediation register and verification plan

**Status date:** October 2026. All controls below are **proposed / not verified implemented** unless specifically noted. Owners are suggested roles, not assignments.

| ID | Recommended control | Suggested owner | Status | Acceptance / verification | Residual risk target |
|---|---|---|---|---|---|
| R01 | Require authenticated and authorized Edge Function callers; verify JWT and role on server | Backend maintainer | Open | Anonymous call denied; authorized call succeeds; deployment config inspected | Moderate |
| R02 | Rate-limit and budget-limit AI invocations | Backend maintainer | Open | Automated burst test returns 429 or quota error; AI budget alert configured | Low |
| R03 | Strictly validate AI response schema; reject invalid classifications, remove silent Nairobi/Low fallback | AI engineer | Open | Malformed, unexpected and adversarial outputs never become valid reports | Moderate |
| R04 | Audit Supabase RLS and privileges for `agent_reports`; least-privilege database writes | Database owner | Open | Anonymous, ordinary user and admin access tests across SELECT/INSERT/UPDATE/DELETE | Moderate |
| R05 | Audit tracked `.env` without publishing values; rotate any real secrets and remove them from history as necessary | Security owner | Open | Secret scan and key-rotation evidence; no privileged key in public history | Low |
| R06 | Label simulated vs stored reports across all dashboards | Frontend maintainer | Open | UI tests verify persistent demo labels and provenance fields | Low |
| R07 | Add prompt-injection and language-variation evaluation suite | AI engineer | Open | Reproducible adversarial, Swahili, Sheng and code-switching test results | Moderate |
| R08 | Establish data retention, legal basis, acceptable use and audit logs before live ingestion | Product/security owner | Open | Approved policies and documented deletion/access tests | Moderate |
| R09 | Add incident response and model-provider failure handling | Operations | Open | Failure-injection test demonstrates safe errors and no false reports | Low |

## Validation methodology

1. Pin the reviewed commit SHA; compare deployed Edge Function and database migrations to source.
2. Inspect JWT verification and perform authenticated/anonymous invocation tests in a staging project.
3. Test database RLS using least-privilege user identities; never run destructive tests against production.
4. Scan Git history for secrets using an approved secret scanner; rotate confirmed leaked credentials.
5. Supply malformed JSON, unexpected enumerations, prompt-injection payloads and county ambiguity to the model-output boundary.
6. Run repeatable multilingual classification evaluations with labelled ground truth; report sample sizes and uncertainty.
7. Confirm all dashboard demo data is labelled, and stored records carry provenance.
8. Re-score residual risks after controls pass tests; record owner approval and evidence links.

## Review scope and attribution

Architecture and code observations are based on `karisajoshua/symbiont` source files inspected in October 2026. Tessa Angelika Mmaitsi independently authored a separate threat-model document in `Tessangelika/threat-aware-learner`. This repository does not imply that she approved, co-authored or verified these additions.
