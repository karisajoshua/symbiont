# Symbiont — STRIDE and AI-specific threat model

**Assessment type:** Source-code review, not penetration test. **System developer:** Joshua Karisa. **Independent external analysis referenced:** Tessa Angelika Mmaitsi. No joint analysis or authorization to publish on her behalf is asserted.

## Evidence and classifications

- **Confirmed implementation condition:** directly visible in inspected source.
- **Potential threat:** plausible abuse path; exploitability or impact not demonstrated.
- **Recommendation:** proposed control, not evidence of implementation.

## STRIDE

| ID | STRIDE | Finding / scenario | Evidence | Status |
|---|---|---|---|---|
| S1 | Spoofing | Edge Function invocation lacks platform JWT verification | `supabase/config.toml`: `verify_jwt = false` | Confirmed configuration; exposure requires runtime validation |
| T1 | Tampering | Invalid or manipulated model output may be persisted without schema validation | `symbiont-brain/index.ts`: `JSON.parse` followed by INSERT | Confirmed missing validation in inspected path |
| R1 | Repudiation | Per-caller audit trail and durable invocation identity not demonstrated | Edge Function logs do not establish authenticated caller identity | Potential threat |
| I1 | Information disclosure | Public repository tracks `.env`; check for sensitive material and rotate any exposed secrets | Tracked file exists; values intentionally not reproduced | Confirmed file tracking; exposure of actual secrets unverified |
| D1 | Denial of service | Repeated invocation may consume paid AI requests and database resources | Function calls external AI and inserts report | Potential threat; rate limits not established |
| E1 | Elevation of privilege | Publicly invokable server function uses service-role database client | `verify_jwt = false`; service-role initialization | Confirmed design condition; exploitation not tested |

## AI-specific threats

| ID | Threat | Evidence / qualification |
|---|---|---|
| A1 | Prompt injection | Post content is embedded in model user prompt; model is instructed via system prompt; injection resistance untested |
| A2 | Data poisoning | Sample corpus is hard-coded; future external ingestion would introduce adversarial content |
| A3 | Classification integrity | Parse failure silently assigns Neutral / Nairobi / Low, producing potentially false geographic and risk records |
| A4 | Model output validity | Parsed JSON fields are not checked against allowlisted values before persistence |
| A5 | Provenance confusion | UI includes simulated feeds alongside a Supabase report path; provenance must be clearly labelled |
| A6 | Bias and language performance | Swahili, Sheng and code-switching performance are not measured; do not assert error rates without an evaluation dataset |
| A7 | Surveillance misuse | Aggregated geographic sentiment may enable harmful targeting; a misuse scenario, not evidence of current misuse |

## Risk scoring

Likelihood (L) and impact (I) use 1–5 scales; score = L × I. **Low:** 1–4, **Moderate:** 5–9, **High:** 10–16, **Critical:** 17–25. Scores are provisional analyst estimates, not empirical probabilities.

| ID | L | I | Score | Priority |
|---|---:|---:|---:|---|
| S1 / E1 | 4 | 4 | 16 | High |
| T1 / A4 | 4 | 3 | 12 | High |
| I1 | 3 | 5 | 15 | High |
| D1 | 3 | 3 | 9 | Moderate |
| A1 | 3 | 4 | 12 | High |
| A3 | 4 | 4 | 16 | High |
| A5 | 4 | 3 | 12 | High |
| A6 | 3 | 3 | 9 | Moderate |
| A7 | 2 | 5 | 10 | High |

No finding here constitutes proof of a live exploit, compromised credential, or measured language-model bias.
