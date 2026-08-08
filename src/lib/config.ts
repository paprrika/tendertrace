export const appConfig = {
  "projectId": "03-tendertrace",
  "name": "TenderTrace",
  "theme": "wise",
  "layout": "civic",
  "resource": "motion",
  "primary": "Bid",
  "primaryPlural": "Tenders",
  "action": "Compare mandatory requirements",
  "summary": "Check tender submissions against public requirements without deciding price or award.",
  "neutral": "needs_clarification",
  "routes": [
    [
      "/docket",
      "Intake"
    ],
    [
      "/docket",
      "Tenders"
    ],
    [
      "/docket",
      "Requirements"
    ],
    [
      "/docket",
      "Clarifications"
    ],
    [
      "/docket",
      "Decisions"
    ]
  ],
  "children": [
    [
      "add_requirement",
      "Requirement"
    ],
    [
      "add_bid_document",
      "Bid document"
    ],
    [
      "add_clarification",
      "Clarification"
    ],
    [
      "add_compliance_finding",
      "Compliance finding"
    ],
    [
      "add_protest_note",
      "Protest note"
    ]
  ],
  "copy": {
    "network": "Procurement ledger 61999",
    "loading": "Indexing tender submissions",
    "readError": "Procurement feed unavailable",
    "metrics": ["Tenders", "Requirements", "Reviews", "Protests", "Decisions"],
    "emptyTitle": "No bids filed",
    "emptyBody": "This procedure has no submissions yet. Connect the procurement wallet to file the first bid.",
    "childUnit": "tender materials",
    "transaction": "Ledger receipt",
    "createSubtitle": "File a sealed submission on the procurement ledger",
    "idLabel": "Submission ID",
    "titleLabel": "Bid title",
    "sourceLabel": "Notice URL",
    "summaryLabel": "Compliance synopsis",
    "createButton": "Submit bid",
    "evidenceTitle": "Add tender material",
    "evidenceSubtitle": "Bind each requirement to its attributable source",
    "selectLabel": "Bid",
    "selectPlaceholder": "Choose submission",
    "evidenceTypeLabel": "Procurement material",
    "evidenceIdLabel": "Material ID",
    "evidenceNameLabel": "Requirement label",
    "evidenceNoteLabel": "Compliance note",
    "evidenceButton": "Bind material",
    "commands": ["Seal bid pack", "Run compliance check", "Issue eligibility", "Close procedure"],
    "filingIdLabel": "Protest ID",
    "rationaleLabel": "Procurement grounds",
    "fileButton": "File protest",
    "waiveButton": "Close protest window",
    "routeKickers": ["Open procedure", "Filed submissions", "Requirement dossier", "Clarification cycle", "Eligibility decision"],
    "visibleUnit": "bids filed",
    "safetyTitle": "Clarification rule",
    "safetyBody": "Missing or conflicting procurement material keeps the bid in clarification and never grants eligibility."
  },
  "methods": {
    "create": "submit_bid",
    "seal": "seal_bid_pack",
    "review": "run_compliance_review",
    "finalize": "finalize_bid_eligibility",
    "archive": "archive_bid",
    "openDispute": "open_bid_protest",
    "resolveDispute": "resolve_bid_protest",
    "waiveDispute": "waive_protest_window",
    "openCorrection": "request_bid_reassessment",
    "resolveCorrection": "resolve_bid_reassessment",
    "waiveCorrection": "waive_reassessment_window"
  },
  "lifecycle": {
    "dispute": "Bid protest",
    "correction": "Bid reassessment"
  }
} as const;
