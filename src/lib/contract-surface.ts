export type ContractParam = {
  name: string;
  type: "string" | "int" | "bool" | "address";
};

export type ContractMethod = {
  name: string;
  kind: "read" | "write";
  params: readonly ContractParam[];
  returns: string;
};

export const contractSurfaceIdentity = {
  "layout": "docket",
  "kicker": "TenderTrace / public write office",
  "title": "Procurement ledger docket",
  "description": "File, review and inspect every tender, submission, requirement and protest method in the current protocol.",
  "readLabel": "Public records",
  "writeLabel": "Docket filings",
  "searchPlaceholder": "Search the procurement docket",
  "readAction": "Retrieve public record",
  "writeAction": "Commit public filing",
  "resultLabel": "Ledger response",
  "emptyResult": "A public record or finalized filing receipt will be typeset here.",
  "colors": {
    "background": "#f8f8f4",
    "panel": "#ffffff",
    "ink": "#17231d",
    "muted": "#6a756f",
    "accent": "#e33d2e",
    "border": "#aeb9b3"
  }
} as const;

export const contractMethods = [
  {
    "name": "get_authority_config",
    "kind": "read",
    "params": [],
    "returns": "dict"
  },
  {
    "name": "get_bidder_submissions",
    "kind": "read",
    "params": [
      {
        "name": "bidder",
        "type": "string"
      },
      {
        "name": "limit",
        "type": "int"
      }
    ],
    "returns": "array"
  },
  {
    "name": "get_compliance_matrix",
    "kind": "read",
    "params": [
      {
        "name": "matrix_id",
        "type": "string"
      }
    ],
    "returns": "dict"
  },
  {
    "name": "get_frontend_bootstrap",
    "kind": "read",
    "params": [],
    "returns": "dict"
  },
  {
    "name": "get_protest",
    "kind": "read",
    "params": [
      {
        "name": "protest_id",
        "type": "string"
      }
    ],
    "returns": "dict"
  },
  {
    "name": "get_requirement_matrix",
    "kind": "read",
    "params": [
      {
        "name": "tender_id",
        "type": "string"
      }
    ],
    "returns": "dict"
  },
  {
    "name": "get_submission",
    "kind": "read",
    "params": [
      {
        "name": "submission_id",
        "type": "string"
      }
    ],
    "returns": "dict"
  },
  {
    "name": "get_submission_documents",
    "kind": "read",
    "params": [
      {
        "name": "submission_id",
        "type": "string"
      }
    ],
    "returns": "array"
  },
  {
    "name": "get_submission_timeline",
    "kind": "read",
    "params": [
      {
        "name": "submission_id",
        "type": "string"
      }
    ],
    "returns": "array"
  },
  {
    "name": "get_tender",
    "kind": "read",
    "params": [
      {
        "name": "tender_id",
        "type": "string"
      }
    ],
    "returns": "dict"
  },
  {
    "name": "get_tender_board",
    "kind": "read",
    "params": [
      {
        "name": "state",
        "type": "string"
      },
      {
        "name": "limit",
        "type": "int"
      }
    ],
    "returns": "array"
  },
  {
    "name": "get_tender_requirements",
    "kind": "read",
    "params": [
      {
        "name": "tender_id",
        "type": "string"
      }
    ],
    "returns": "array"
  },
  {
    "name": "add_requirement",
    "kind": "write",
    "params": [
      {
        "name": "requirement_id",
        "type": "string"
      },
      {
        "name": "tender_id",
        "type": "string"
      },
      {
        "name": "code",
        "type": "string"
      },
      {
        "name": "mandatory",
        "type": "bool"
      },
      {
        "name": "source_url",
        "type": "string"
      },
      {
        "name": "rule_text",
        "type": "string"
      }
    ],
    "returns": "null"
  },
  {
    "name": "archive_tender",
    "kind": "write",
    "params": [
      {
        "name": "tender_id",
        "type": "string"
      }
    ],
    "returns": "null"
  },
  {
    "name": "attach_bid_document",
    "kind": "write",
    "params": [
      {
        "name": "document_id",
        "type": "string"
      },
      {
        "name": "submission_id",
        "type": "string"
      },
      {
        "name": "document_class",
        "type": "string"
      },
      {
        "name": "source_url",
        "type": "string"
      },
      {
        "name": "declared_purpose",
        "type": "string"
      }
    ],
    "returns": "null"
  },
  {
    "name": "close_protest_window",
    "kind": "write",
    "params": [
      {
        "name": "tender_id",
        "type": "string"
      }
    ],
    "returns": "null"
  },
  {
    "name": "close_submissions",
    "kind": "write",
    "params": [
      {
        "name": "tender_id",
        "type": "string"
      }
    ],
    "returns": "null"
  },
  {
    "name": "configure_authority",
    "kind": "write",
    "params": [
      {
        "name": "protocol_name",
        "type": "string"
      },
      {
        "name": "review_policy",
        "type": "string"
      }
    ],
    "returns": "null"
  },
  {
    "name": "draft_tender",
    "kind": "write",
    "params": [
      {
        "name": "tender_id",
        "type": "string"
      },
      {
        "name": "title",
        "type": "string"
      },
      {
        "name": "notice_url",
        "type": "string"
      },
      {
        "name": "submission_deadline",
        "type": "int"
      },
      {
        "name": "protest_deadline",
        "type": "int"
      }
    ],
    "returns": "null"
  },
  {
    "name": "file_requirement_protest",
    "kind": "write",
    "params": [
      {
        "name": "protest_id",
        "type": "string"
      },
      {
        "name": "submission_id",
        "type": "string"
      },
      {
        "name": "requirement_codes_json",
        "type": "string"
      },
      {
        "name": "grounds_url",
        "type": "string"
      },
      {
        "name": "grounds",
        "type": "string"
      }
    ],
    "returns": "null"
  },
  {
    "name": "finalize_eligibility",
    "kind": "write",
    "params": [
      {
        "name": "submission_id",
        "type": "string"
      }
    ],
    "returns": "null"
  },
  {
    "name": "issue_clarification",
    "kind": "write",
    "params": [
      {
        "name": "clarification_id",
        "type": "string"
      },
      {
        "name": "tender_id",
        "type": "string"
      },
      {
        "name": "requirement_id",
        "type": "string"
      },
      {
        "name": "question",
        "type": "string"
      },
      {
        "name": "answer_url",
        "type": "string"
      }
    ],
    "returns": "null"
  },
  {
    "name": "open_protest_window",
    "kind": "write",
    "params": [
      {
        "name": "tender_id",
        "type": "string"
      }
    ],
    "returns": "null"
  },
  {
    "name": "publish_tender",
    "kind": "write",
    "params": [
      {
        "name": "tender_id",
        "type": "string"
      }
    ],
    "returns": "null"
  },
  {
    "name": "resolve_requirement_protest",
    "kind": "write",
    "params": [
      {
        "name": "protest_id",
        "type": "string"
      }
    ],
    "returns": "null"
  },
  {
    "name": "run_compliance_matrix",
    "kind": "write",
    "params": [
      {
        "name": "submission_id",
        "type": "string"
      }
    ],
    "returns": "null"
  },
  {
    "name": "seal_submission",
    "kind": "write",
    "params": [
      {
        "name": "submission_id",
        "type": "string"
      }
    ],
    "returns": "null"
  },
  {
    "name": "set_compliance_reviewer",
    "kind": "write",
    "params": [
      {
        "name": "account",
        "type": "address"
      },
      {
        "name": "allowed",
        "type": "bool"
      }
    ],
    "returns": "null"
  },
  {
    "name": "start_submission",
    "kind": "write",
    "params": [
      {
        "name": "submission_id",
        "type": "string"
      },
      {
        "name": "tender_id",
        "type": "string"
      },
      {
        "name": "bid_title",
        "type": "string"
      }
    ],
    "returns": "null"
  }
] as const satisfies readonly ContractMethod[];
