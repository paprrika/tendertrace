# TenderTrace

## Procurement Docket

**Matter:** Evidence-based review of sealed tender submissions  
**Forum:** GenLayer Studionet  
**Decision limit:** Compliance with public requirements, never price or award selection  
**Neutral finding:** `needs_clarification`

TenderTrace is a civic procurement workspace for checking whether a submission satisfies the requirements published by an authority. It preserves requirements, bidder evidence, clarifications, objections, reconsideration, and the resulting public record in one docket.

## Jurisdiction

TenderTrace may evaluate whether cited material supports a mandatory requirement and whether a clarification changes that conclusion. It must not:

- rank bids by commercial preference;
- choose a winning supplier;
- treat inaccessible evidence as proof;
- convert ambiguity into automatic rejection;
- hide an objection or reconsideration from the audit trail.

## The Single-Docket Model

The application intentionally uses one working route:

| URL | Purpose |
| --- | --- |
| `/` | Public product overview |
| `/docket` | Intake, requirements, clarifications, decisions, and contract operations |

Inside `/docket`, the operator moves through procedure stages without opening filler pages or changing query-string modes. The selected procurement record remains the context for every action.

## Filing Sequence

1. Open a tender with its public notice and authority.
2. Register mandatory requirements and their source references.
3. File a sealed submission with attributable bidder evidence.
4. Request or attach clarifications when the record is incomplete.
5. Ask validators for a structured compliance assessment.
6. Record an objection and reconsideration where counter-evidence exists.
7. Publish the final docket outcome and retain the neutral path.

## Public Record

The active intelligent contract is:

```text
Protocol   TenderTrace Procurement Protocol
Network    Studionet (chain 61999)
Address    0x85fbDb155a6baaF0Dd8dF4d73048A75c24F85c0C
Methods    29
Status     configured_verified
```

[Inspect the contract in GenLayer Explorer](https://explorer-studio.genlayer.com/address/0x85fbDb155a6baaF0Dd8dF4d73048A75c24F85c0C).
Live app: https://paprrika.github.io/tendertrace/

## Working On The Project

The contract lives in `contracts/TenderTrace.py`. Product composition is in `src/components`, typed GenLayer access is in `src/lib`, and deployment metadata is held in `deployment.json`.

Run the application:

```powershell
npm run dev
```

Required checks before a change is accepted:

```powershell
npm run typecheck
npm test
npm run test:studionet
npm run build
```
