# Symbiont — threat modeling diagrams index

The following documentation reflects a source-level review of the prototype, not a verified production deployment or penetration test.

1. [System architecture](../architecture/system-architecture.md) — component architecture, browser, Supabase, Edge Function and AI gateway.
2. [Data flow and trust boundaries](../architecture/data-flow.md) — sequence diagram and trust-boundary crossings.
3. [STRIDE security threat model](stride-threat-model.md) — technical threats, AI-specific risks, evidence and consistent risk scoring.
4. [AI security boundaries](ai-threat-boundaries.md) — prompt injection, untrusted model output and proposed validation gates.
5. [Remediation register](remediation-register.md) — owners, acceptance criteria, status and residual-risk targets.

**Notation:** Diagrams distinguish current architecture from recommended controls. In the AI security diagram, dashed proposed controls are not implemented. Risk matrix is tabulated in the STRIDE model; risk and remediation details are in the register.

**Attribution:** Symbiont was developed by Joshua Karisa. The external threat model in [Tessa Angelika Mmaitsi's repository](https://github.com/Tessangelika/threat-aware-learner/blob/main/ai-system-analyses/symbiont-threat-model.md) was independently prepared by Tessa. No co-authorship of that document is claimed.

**Security note:** This repo tracks a `.env` file. Never publish its values in security reports. Privileged credentials, if present or previously exposed, require rotation and Git history review.
