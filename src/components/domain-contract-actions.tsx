"use client";

import { Eye, Landmark, LoaderCircle, RotateCcw, Send, X } from "lucide-react";
import {
  contractLabel,
  initialContractValue,
  longContractField,
  stringifyContractValue,
  useContractWorkflow,
} from "@/lib/contract-workflow";
import type { ContractParam } from "@/lib/contract-surface";

function FilingCell({
  param,
  value,
  onChange,
}: {
  param: ContractParam;
  value: string;
  onChange: (value: string) => void;
}) {
  if (param.type === "bool") {
    return (
      <label className="tt-check">
        <input
          type="checkbox"
          checked={value === "true"}
          onChange={(event) => onChange(String(event.target.checked))}
        />
        <span>{value === "true" ? "Included" : "Excluded"}</span>
      </label>
    );
  }
  if (longContractField(param)) {
    return <textarea value={value} onChange={(event) => onChange(event.target.value)} />;
  }
  return (
    <input
      type={param.type === "int" ? "number" : "text"}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export function DomainContractActions() {
  const flow = useContractWorkflow();
  return (
    <section className="tt-domain-actions" data-domain-control="procurement-docket">
      <header>
        <Landmark />
        <div>
          <span>PUBLIC DOCKET TOOL</span>
          <h3>Procedure filing</h3>
        </div>
        <select
          aria-label="Procurement filing"
          value={flow.selected.name}
          onChange={(event) => {
            const method = flow.methods.find(
              (item) => item.name === event.target.value,
            );
            if (method) flow.choose(method);
          }}
        >
          {flow.methods.map((method) => (
            <option key={method.name} value={method.name}>
              {contractLabel(method.name)}
            </option>
          ))}
        </select>
      </header>

      <ol className="tt-stamps" aria-label="Filing sequence">
        <li>Identify procedure</li>
        <li>Bind public source</li>
        <li>Commit ledger entry</li>
      </ol>

      <form onSubmit={flow.execute}>
        <table>
          <thead>
            <tr>
              <th>Ref.</th>
              <th>Required filing field</th>
              <th>Ledger value</th>
            </tr>
          </thead>
          <tbody>
            {flow.selected.params.map((param, index) => (
              <tr key={param.name}>
                <td>{String(index + 1).padStart(2, "0")}</td>
                <th>{contractLabel(param.name)}</th>
                <td>
                  <FilingCell
                    param={param}
                    value={flow.values[param.name] ?? initialContractValue(param)}
                    onChange={(value) =>
                      flow.setValues((current) => ({
                        ...current,
                        [param.name]: value,
                      }))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" disabled={flow.busy}>
          {flow.busy ? (
            <LoaderCircle className="spin" />
          ) : flow.selected.kind === "read" ? (
            <Eye />
          ) : (
            <Send />
          )}
          {flow.selected.kind === "read" ? "Retrieve public record" : "Stamp filing"}
        </button>
      </form>

      <dialog open={Boolean(flow.result || flow.error)} aria-live="polite">
        <button type="button" onClick={flow.reset} aria-label="Close filing receipt">
          {flow.error ? <X /> : <RotateCcw />}
        </button>
        <span>DOCKET RECEIPT</span>
        {flow.error ? <p>{flow.error}</p> : <pre>{stringifyContractValue(flow.result)}</pre>}
      </dialog>

      <style jsx>{`
        .tt-domain-actions{grid-column:1/-1;border:1px solid #aeb9b3;border-left:6px solid #e33d2e;background:#fff;padding:16px}
        header{display:grid;grid-template-columns:auto 1fr minmax(220px,340px);gap:12px;align-items:center}header div{display:grid}header span{font-size:9px;color:#e33d2e}h3{margin:2px 0}
        header select{min-height:40px;border:1px solid #17231d;background:#fff;padding:8px;font:inherit}
        .tt-stamps{display:grid;grid-template-columns:repeat(3,1fr);list-style-position:inside;margin:14px 0;padding:0;border-block:1px solid #aeb9b3}.tt-stamps li{padding:9px;border-right:1px solid #aeb9b3;font-size:9px;text-transform:uppercase}.tt-stamps li:last-child{border-right:0}
        table{width:100%;border-collapse:collapse}th,td{border:1px solid #aeb9b3;padding:7px;text-align:left}thead th{background:#f2f3ef;font-size:9px;text-transform:uppercase}tbody td:first-child{width:48px;color:#e33d2e}
        input:not([type="checkbox"]),textarea{width:100%;min-height:38px;border:0;background:#fff;padding:6px;font:inherit}textarea{min-height:68px}.tt-check{display:flex;align-items:center;gap:8px}.tt-check input{width:20px;height:20px;accent-color:#e33d2e}
        form>button{min-height:42px;margin-top:10px;border:0;background:#e33d2e;color:#fff;padding:0 18px;display:flex;align-items:center;gap:8px}
        dialog{position:relative;width:100%;margin:12px 0 0;border:2px solid #17231d;padding:14px;background:#f8f8f4;color:#17231d}dialog>button{position:absolute;right:8px;top:8px}dialog>span{font-size:9px;color:#e33d2e}pre{white-space:pre-wrap;overflow-wrap:anywhere}
        @media(max-width:760px){header,.tt-stamps{grid-template-columns:1fr}table,thead,tbody,tr,th,td{display:block}thead{display:none}tbody tr{margin-bottom:10px;border:1px solid #aeb9b3}tbody th,tbody td{border:0}}
      `}</style>
    </section>
  );
}
