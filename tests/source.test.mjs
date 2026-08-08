import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = path.resolve(".");
const contract = fs.readFileSync(path.join(root, "contracts", "TenderTrace.py"), "utf8");
const shell = fs.readFileSync(path.join(root, "src", "components", "app-shell.tsx"), "utf8");
const styles = fs.readFileSync(path.join(root, "src", "app", "globals.css"), "utf8");
const deployment = JSON.parse(fs.readFileSync(path.join(root, "deployment.json"), "utf8"));

test("TenderTrace pins the runner and uses independent consensus validation", () => {
  assert.match(contract, /py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6/);
  assert.match(contract, /run_nondet_unsafe/);
  assert.match(contract, /validator_fn/);
  assert.match(contract, /untrusted evidence/);
});

test("procurement ABI contains real procedure, bid, clarification, matrix and protest operations", () => {
  for (const method of ["draft_tender", "add_requirement", "start_submission", "attach_bid_document", "issue_clarification", "run_compliance_matrix", "file_requirement_protest", "finalize_eligibility"]) {
    assert.match(contract, new RegExp(`def ${method}\\(`));
  }
  assert.doesNotMatch(contract, /def get_record\(|def submit_bid\(/);
});

test("frontend is a dedicated civic procurement service", () => {
  for (const marker of [
    "TenderRegister",
    "ProcedureIntake",
    "DecisionConsole",
    "Requirement dossier",
    "Eligibility chamber",
    "tt-global-search",
    "tt-flowline",
    "PUBLIC WRITE",
  ]) {
    assert.match(shell, new RegExp(marker));
  }
  assert.match(styles, /--teal:\s*#e33d2e/);
  assert.doesNotMatch(shell, /CreateRecordForm|DomainVisual|skeleton-civic/);
});

test("wallet writes check finality and execution result without embedded secrets", () => {
  const client = fs.readFileSync(path.join(root, "src", "lib", "genlayer.ts"), "utf8");
  assert.match(client, /TransactionStatus\.FINALIZED/);
  assert.match(client, /MAJORITY_AGREE/);
  assert.equal(deployment.chainId, 61999);
  assert.doesNotMatch([contract, shell, client, JSON.stringify(deployment)].join("\n"), new RegExp(["private" + "Key", "mne" + "monic", "seed" + "Phrase"].join("|")));
});
