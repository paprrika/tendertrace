"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { animate, stagger } from "motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  AlertTriangle,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FileKey2,
  Gavel,
  Landmark,
  LoaderCircle,
  MessageSquareText,
  Plus,
  Search,
  Scale,
  Send,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { appConfig } from "@/lib/config";
import { DomainContractActions } from "@/components/domain-contract-actions";
import {
  contractAddress,
  contractExplorerUrl,
  explorerBaseUrl,
} from "@/lib/deployment";
import { useProtocol } from "@/hooks/use-protocol";
import { useProtocolTransaction } from "@/lib/genlayer";
import type { Tender, TenderBootstrap, TxState } from "@/lib/types";

type Props = { routeIndex: number };
type Fields = Record<string, string | boolean>;

const routeMeta = [
  ["Procedure intake", "Open and schedule a public procurement procedure."],
  [
    "Submission register",
    "Create a bidder workspace and seal attributable documents.",
  ],
  ["Requirement dossier", "Build the ordered mandatory compliance checklist."],
  [
    "Clarification room",
    "Publish reviewer questions and authoritative answers.",
  ],
  [
    "Eligibility chamber",
    "Run matrices, open protests and finalize eligibility.",
  ],
] as const;

function short(value: string) {
  return value ? `${value.slice(0, 6)}...${value.slice(-4)}` : "not deployed";
}

function TxReceipt({ state, reset }: { state: TxState; reset: () => void }) {
  if (state.stage === "idle") return null;
  const busy = ["wallet", "submitted", "finalizing"].includes(state.stage);
  return (
    <div className={`tt-receipt ${state.stage}`}>
      {busy ? (
        <LoaderCircle className="spin" size={16} />
      ) : state.stage === "finalized" ? (
        <Check size={16} />
      ) : (
        <AlertTriangle size={16} />
      )}
      <div>
        <strong>{state.action}</strong>
        <span>{state.error || state.stage}</span>
      </div>
      {state.hash && (
        <a
          href={`${explorerBaseUrl}/tx/${state.hash}`}
          target="_blank"
          rel="noreferrer"
        >
          Receipt <ArrowUpRight size={12} />
        </a>
      )}
      {!busy && (
        <button type="button" onClick={reset} aria-label="Dismiss receipt">
          <X size={14} />
        </button>
      )}
    </div>
  );
}

const englishMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const englishWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

function localDateTimeValue(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function readLocalDateTime(value: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function englishDateTimeLabel(value: string) {
  const date = readLocalDateTime(value);
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function EnglishDateTimeInput({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const selected = readLocalDateTime(value);
  const initial = selected ?? new Date();
  const [open, setOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(initial.getFullYear(), initial.getMonth(), 1),
  );
  const days = useMemo(() => {
    const first = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth(),
      1,
    );
    const start = new Date(first);
    start.setDate(first.getDate() - first.getDay());
    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return date;
    });
  }, [visibleMonth]);

  function openCalendar() {
    const active = readLocalDateTime(value) ?? new Date();
    setVisibleMonth(new Date(active.getFullYear(), active.getMonth(), 1));
    setOpen(true);
  }

  function chooseDate(day: Date) {
    const active = readLocalDateTime(value) ?? new Date();
    const next = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      active.getHours(),
      active.getMinutes(),
    );
    onChange(localDateTimeValue(next));
  }

  function setTime(part: "hour" | "minute", nextValue: string) {
    const active = readLocalDateTime(value) ?? new Date();
    if (part === "hour") active.setHours(Number(nextValue));
    else active.setMinutes(Number(nextValue));
    onChange(localDateTimeValue(active));
  }

  const activeDate = selected ?? new Date();
  return (
    <div className="tt-english-date">
      <input
        id={id}
        required
        readOnly
        lang="en-US"
        value={englishDateTimeLabel(value)}
        placeholder="Select date and time"
        onClick={openCalendar}
      />
      <button
        className="tt-date-trigger"
        type="button"
        aria-label="Open English calendar"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openCalendar())}
      >
        <CalendarDays size={16} />
      </button>
      {open && (
        <div className="tt-date-popover" role="dialog" aria-label="Choose date and time">
          <header>
            <button
              type="button"
              aria-label="Previous month"
              onClick={() =>
                setVisibleMonth(
                  new Date(
                    visibleMonth.getFullYear(),
                    visibleMonth.getMonth() - 1,
                    1,
                  ),
                )
              }
            >
              <ChevronLeft size={16} />
            </button>
            <strong>
              {englishMonths[visibleMonth.getMonth()]} {visibleMonth.getFullYear()}
            </strong>
            <button
              type="button"
              aria-label="Next month"
              onClick={() =>
                setVisibleMonth(
                  new Date(
                    visibleMonth.getFullYear(),
                    visibleMonth.getMonth() + 1,
                    1,
                  ),
                )
              }
            >
              <ChevronRight size={16} />
            </button>
          </header>
          <div className="tt-date-weekdays">
            {englishWeekdays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="tt-date-days">
            {days.map((day) => {
              const isCurrentMonth =
                day.getMonth() === visibleMonth.getMonth();
              const isSelected =
                selected &&
                day.getFullYear() === selected.getFullYear() &&
                day.getMonth() === selected.getMonth() &&
                day.getDate() === selected.getDate();
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  className={`${isCurrentMonth ? "" : "outside"} ${isSelected ? "selected" : ""}`}
                  aria-pressed={Boolean(isSelected)}
                  onClick={() => chooseDate(day)}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
          <div className="tt-date-time">
            <span>Time</span>
            <select
              aria-label="Hour"
              value={String(activeDate.getHours()).padStart(2, "0")}
              onChange={(event) => setTime("hour", event.target.value)}
            >
              {Array.from({ length: 24 }, (_, hour) => (
                <option key={hour} value={String(hour).padStart(2, "0")}>
                  {String(hour).padStart(2, "0")}
                </option>
              ))}
            </select>
            <b>:</b>
            <select
              aria-label="Minute"
              value={String(activeDate.getMinutes()).padStart(2, "0")}
              onChange={(event) => setTime("minute", event.target.value)}
            >
              {Array.from({ length: 60 }, (_, minute) => (
                <option key={minute} value={String(minute).padStart(2, "0")}>
                  {String(minute).padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
          <footer>
            <button type="button" onClick={() => onChange("")}>
              Clear
            </button>
            <button type="button" onClick={() => chooseDate(new Date())}>
              Today
            </button>
            <button type="button" onClick={() => setOpen(false)}>
              Done
            </button>
          </footer>
        </div>
      )}
    </div>
  );
}

function ActionPanel({
  icon: Icon,
  title,
  note,
  fields,
  submitLabel,
  method,
  args,
}: {
  icon: typeof Plus;
  title: string;
  note: string;
  fields: { key: string; label: string; type?: string; placeholder?: string }[];
  submitLabel: string;
  method: string;
  args: (values: Fields) => unknown[];
}) {
  const tx = useProtocolTransaction();
  const [values, setValues] = useState<Fields>(() =>
    Object.fromEntries(
      fields.map((field) => [
        field.key,
        field.type === "checkbox" ? false : "",
      ]),
    ),
  );
  useEffect(() => {
    setValues(
      Object.fromEntries(
        fields.map((field) => [
          field.key,
          field.type === "checkbox" ? false : "",
        ]),
      ),
    );
  }, [method]);
  async function submit(event: FormEvent) {
    event.preventDefault();
    await tx.write(submitLabel, method, args(values));
  }
  return (
    <form className="tt-action" onSubmit={submit}>
      <header className="tt-action-intro">
        <span>
          <Icon size={16} />
          PUBLIC WRITE
        </span>
        <div>
          <h2>{title}</h2>
          <p>{note}</p>
        </div>
      </header>
      <div className="tt-fields">
        {fields.map((field, index) => (
          <label key={field.key}>
            <b>{String(index + 1).padStart(2, "0")}</b>
            <span>
              {field.label}
              {field.type !== "checkbox" && <small>required</small>}
            </span>
            {field.type === "checkbox" ? (
              <input
                type="checkbox"
                checked={Boolean(values[field.key])}
                onChange={(event) =>
                  setValues({ ...values, [field.key]: event.target.checked })
                }
              />
            ) : field.type === "textarea" ? (
              <textarea
                required
                value={String(values[field.key] ?? "")}
                placeholder={field.placeholder}
                onChange={(event) =>
                  setValues({ ...values, [field.key]: event.target.value })
                }
              />
            ) : field.type === "datetime-local" ? (
              <EnglishDateTimeInput
                id={`tt-${method}-${field.key}`}
                value={String(values[field.key] ?? "")}
                onChange={(value) =>
                  setValues({ ...values, [field.key]: value })
                }
              />
            ) : (
              <input
                id={`tt-${method}-${field.key}`}
                required
                type={field.type || "text"}
                value={String(values[field.key] ?? "")}
                placeholder={field.placeholder}
                onChange={(event) =>
                  setValues({ ...values, [field.key]: event.target.value })
                }
              />
            )}
          </label>
        ))}
      </div>
      <footer className="tt-action-commit">
        <span>Writes an attributable record to Studionet.</span>
        <button className="tt-submit" type="submit">
          <Send size={15} />
          {submitLabel}
        </button>
      </footer>
      <TxReceipt state={tx.state} reset={tx.reset} />
    </form>
  );
}

function ProcedureIntake({ configured }: { configured: boolean }) {
  if (!configured) {
    return (
      <ActionPanel
        icon={Landmark}
        title="Configure procurement authority"
        note="One-time owner action before procedures can be drafted."
        submitLabel="Configure authority"
        method="configure_authority"
        fields={[
          { key: "name", label: "Protocol name" },
          { key: "policy", label: "Compliance policy", type: "textarea" },
        ]}
        args={(v) => [v.name, v.policy]}
      />
    );
  }
  return (
    <ActionPanel
      icon={Plus}
      title="Draft a procedure"
      note="Create the notice envelope. Requirements are attached separately."
      submitLabel="Create procedure"
      method="draft_tender"
      fields={[
        { key: "id", label: "Procedure ID", placeholder: "metro-works-2026" },
        { key: "title", label: "Public title" },
        { key: "url", label: "Notice URL", type: "url" },
        {
          key: "submission",
          label: "Submission deadline",
          type: "datetime-local",
        },
        { key: "protest", label: "Protest deadline", type: "datetime-local" },
      ]}
      args={(v) => [
        v.id,
        v.title,
        v.url,
        Math.floor(new Date(String(v.submission)).getTime() / 1000),
        Math.floor(new Date(String(v.protest)).getTime() / 1000),
      ]}
    />
  );
}

function RouteAction({
  routeIndex,
  configured,
}: {
  routeIndex: number;
  configured: boolean;
}) {
  if (routeIndex === 0) return <ProcedureIntake configured={configured} />;
  if (routeIndex === 1)
    return (
      <ActionPanel
        icon={FileKey2}
        title="Start bidder submission"
        note="Creates a private preparation lane before sealing."
        submitLabel="Start submission"
        method="start_submission"
        fields={[
          { key: "id", label: "Submission ID" },
          { key: "tender", label: "Procedure ID" },
          { key: "title", label: "Bid title" },
        ]}
        args={(v) => [v.id, v.tender, v.title]}
      />
    );
  if (routeIndex === 2)
    return (
      <ActionPanel
        icon={ClipboardCheck}
        title="Add compliance requirement"
        note="Each rule keeps its own public source and mandatory flag."
        submitLabel="Add requirement"
        method="add_requirement"
        fields={[
          { key: "id", label: "Requirement ID" },
          { key: "tender", label: "Procedure ID" },
          { key: "code", label: "Public code" },
          { key: "mandatory", label: "Mandatory", type: "checkbox" },
          { key: "url", label: "Rule source URL", type: "url" },
          { key: "rule", label: "Requirement text", type: "textarea" },
        ]}
        args={(v) => [v.id, v.tender, v.code, v.mandatory, v.url, v.rule]}
      />
    );
  if (routeIndex === 3)
    return (
      <ActionPanel
        icon={MessageSquareText}
        title="Issue clarification"
        note="Bind the question to one requirement and a public answer."
        submitLabel="Publish clarification"
        method="issue_clarification"
        fields={[
          { key: "id", label: "Clarification ID" },
          { key: "tender", label: "Procedure ID" },
          { key: "requirement", label: "Requirement ID" },
          { key: "question", label: "Question", type: "textarea" },
          { key: "url", label: "Answer URL", type: "url" },
        ]}
        args={(v) => [v.id, v.tender, v.requirement, v.question, v.url]}
      />
    );
  return <DecisionConsole />;
}

function DecisionConsole() {
  const tx = useProtocolTransaction();
  const [submission, setSubmission] = useState("");
  const [tender, setTender] = useState("");
  return (
    <section className="tt-decision">
      <header>
        <Scale size={20} />
        <div>
          <strong>Eligibility controls</strong>
          <p>
            Reasoning evaluates compliance only. It never ranks price or awards
            the tender.
          </p>
        </div>
      </header>
      <label>
        <span>Submission ID</span>
        <input
          value={submission}
          onChange={(e) => setSubmission(e.target.value)}
        />
      </label>
      <button
        onClick={() =>
          tx.write("Run compliance matrix", "run_compliance_matrix", [
            submission,
          ])
        }
      >
        Run matrix
      </button>
      <button
        onClick={() =>
          tx.write("Finalize eligibility", "finalize_eligibility", [submission])
        }
      >
        Finalize submission
      </button>
      <label>
        <span>Procedure ID</span>
        <input value={tender} onChange={(e) => setTender(e.target.value)} />
      </label>
      <button
        onClick={() =>
          tx.write("Open protest window", "open_protest_window", [tender])
        }
      >
        Open protest window
      </button>
      <TxReceipt state={tx.state} reset={tx.reset} />
    </section>
  );
}

function TenderRegister({
  tenders,
  query,
}: {
  tenders: Tender[];
  query: string;
}) {
  const normalized = query.trim().toLowerCase();
  const visible = normalized
    ? tenders.filter((tender) =>
        [tender.id, tender.title, tender.state].some((value) =>
          value.toLowerCase().includes(normalized),
        ),
      )
    : tenders;
  if (!tenders.length)
    return (
      <div className="tt-empty">
        <Gavel size={25} />
        <strong>No procedure on the ledger</strong>
        <span>The first authority draft will appear here.</span>
      </div>
    );
  if (!visible.length)
    return (
      <div className="tt-empty">
        <Search size={25} />
        <strong>No matching procedure</strong>
        <span>Try another title, identifier, or procedure state.</span>
      </div>
    );
  return (
    <div className="tt-register">
      <div className="tt-register-head">
        <span>Procedure</span>
        <span>Stage</span>
        <span>Requirements</span>
        <span>Submissions</span>
      </div>
      {visible.map((tender) => (
        <article key={tender.id}>
          <div>
            <code>{tender.id}</code>
            <strong>{tender.title}</strong>
          </div>
          <span className={`tt-state ${tender.state.toLowerCase()}`}>
            {tender.state.replaceAll("_", " ")}
          </span>
          <b>{tender.requirement_ids.length}</b>
          <b>{tender.submission_ids.length}</b>
        </article>
      ))}
    </div>
  );
}

export function AppShell({ routeIndex: initialRouteIndex }: Props) {
  const [routeIndex, setRouteIndex] = useState(initialRouteIndex);
  const protocol = useProtocol();
  const data = protocol.data as TenderBootstrap | undefined;
  const counts = data?.counts;
  const [query, setQuery] = useState("");
  useEffect(() => {
    document.documentElement.dataset.appHydrated = appConfig.projectId;
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(
      ".tt-metrics > div, .tt-workspace > *",
      { opacity: [0, 1], transform: ["translateY(10px)", "translateY(0)"] },
      { delay: stagger(0.045), duration: 0.32 },
    );
    return () => controls.stop();
  }, [routeIndex]);
  return (
    <main className="tendertrace" data-resource="motion">
      <header className="tt-top">
        <Link href="../" className="tt-brand">
          <span>TT</span>
          <div>
            <strong>TenderTrace</strong>
            <small>Public eligibility ledger</small>
          </div>
        </Link>
        <label className="tt-global-search">
          <Search size={16} />
          <input
            type="search"
            value={query}
            placeholder="Find a procedure, requirement, or submission"
            onChange={(event) => setQuery(event.target.value)}
          />
          <kbd>/</kbd>
        </label>
        <a
          className="tt-network"
          href={contractExplorerUrl}
          target="_blank"
          rel="noreferrer"
        >
          <i />
          61999
          <b>{short(contractAddress)}</b>
          <ArrowUpRight size={13} />
        </a>
        <ConnectButton showBalance={false} chainStatus="icon" />
      </header>
      <section className="tt-title">
        <div>
          <span>PROCUREMENT / {String(routeIndex + 1).padStart(2, "0")}</span>
          <h1>{routeMeta[routeIndex][0]}</h1>
          <p>{routeMeta[routeIndex][1]}</p>
        </div>
        <div className="tt-title-note">
          <ClipboardCheck size={18} />
          <span>
            <b>Evidence boundary</b>
            Eligibility only. Price and award remain outside this protocol.
          </span>
        </div>
      </section>
      <section className="tt-metrics">
        {[
          ["Procedures", counts?.tenders],
          ["Requirements", counts?.requirements],
          ["Submissions", counts?.submissions],
          ["Documents", counts?.documents],
          ["Protests", counts?.protests],
        ].map(([label, value]) => (
          <div key={String(label)}>
            <span>{label}</span>
            <strong>{value ?? 0}</strong>
          </div>
        ))}
      </section>
      <nav className="tt-flowline" aria-label="Procedure stages">
        {[
            "Notice envelope",
            "Requirement dossier",
            "Sealed submissions",
            "Clarification cycle",
            "Eligibility and protest",
          ].map((label, index) => {
            const [href] = appConfig.routes[index];
            return (
              <a
                className={index === routeIndex ? "active" : ""}
                href={href}
                key={label}
                onClick={(event) => {
                  event.preventDefault();
                  setRouteIndex(index);
                }}
              >
                <b>{String(index + 1).padStart(2, "0")}</b>
                <span>{label}</span>
                <i />
              </a>
            );
          })}
      </nav>
      <div className="tt-workspace">
        <section className="tt-docket">
          <header className="tt-docket-head">
            <div>
              <span>PUBLIC REGISTER</span>
              <strong>{routeMeta[routeIndex][0]}</strong>
            </div>
            <button
              type="button"
              aria-label="Filter register"
              title="Filter register"
            >
              <SlidersHorizontal size={16} />
            </button>
          </header>
          {protocol.isLoading ? (
            <div className="tt-loading">
              <LoaderCircle className="spin" />
              Reading procurement ledger
            </div>
          ) : protocol.isError ? (
            <div className="tt-error">
              <AlertTriangle />
              {protocol.error.message}
              <button onClick={() => protocol.refetch()}>Retry</button>
            </div>
          ) : (
            <TenderRegister
              tenders={data?.recent_tenders ?? []}
              query={query}
            />
          )}
        </section>
        <RouteAction
          routeIndex={routeIndex}
          configured={Boolean(data?.protocol?.configured)}
        />
        <DomainContractActions />
      </div>
      <footer>
        <span>
          Contract evidence is public. Bid price and award ranking stay outside
          this protocol.
        </span>
        <a href={contractExplorerUrl} target="_blank" rel="noreferrer">
          Open contract <ArrowUpRight size={12} />
        </a>
      </footer>
    </main>
  );
}
