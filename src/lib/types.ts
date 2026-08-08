export type Tender = {
  id: string;
  title: string;
  notice_url: string;
  authority: string;
  state: string;
  submission_deadline: number;
  protest_deadline: number;
  requirement_ids: string[];
  submission_ids: string[];
  clarification_ids: string[];
  protest_ids: string[];
  event_ids: string[];
};

export type TenderBootstrap = {
  protocol: {
    owner: string;
    protocol_name: string;
    review_policy: string;
    configured: boolean;
  };
  counts: {
    tenders: number;
    requirements: number;
    submissions: number;
    documents: number;
    clarifications: number;
    matrices: number;
    protests: number;
    finalized_submissions: number;
  };
  recent_tenders: Tender[];
};

export type TxState = {
  stage: "idle" | "wallet" | "submitted" | "finalizing" | "finalized" | "failed";
  action: string;
  hash?: string;
  error?: string;
};
