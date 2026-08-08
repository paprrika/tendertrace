"use client";

import Link from "next/link";
import { ArrowUpRight, FileCheck2, Search, Stamp } from "lucide-react";
import { contractAddress, contractExplorerUrl } from "@/lib/deployment";

export function ProductLanding() {
  const short = contractAddress
    ? `${contractAddress.slice(0, 10)}...${contractAddress.slice(-6)}`
    : "Pending";

  return (
    <main className="tender-entry" data-landing="civic-docket">
      <header>
        <Link href="./" className="seal"><Stamp size={25} /> TENDERTRACE</Link>
        <nav><Link href="./docket/">Tenders</Link><Link href="./docket/">Requirements</Link><Link href="./docket/">Ledger</Link></nav>
        <span className="jurisdiction">PUBLIC PROCUREMENT / 61999</span>
      </header>

      <section className="notice">
        <div className="notice-number"><span>NOTICE</span><strong>03</strong><small>Open procedure</small></div>
        <div className="notice-copy">
          <p className="kicker">ELIGIBILITY BEFORE AWARD</p>
          <h1>Make every bid answer to the public notice.</h1>
          <p className="lead">
            TenderTrace turns requirements, submissions and clarifications into
            an attributable review record on GenLayer.
          </p>
          <div className="searchline"><Search size={19} /><span>Search a tender, requirement or decision</span><kbd>⌘ K</kbd></div>
          <Link href="./docket/" className="open">Open intake docket <ArrowUpRight size={18} /></Link>
        </div>
      </section>

      <section className="public-record">
        <div><span>A</span><h2>File</h2><p>Register the submission and its notice source.</p></div>
        <div><span>B</span><h2>Compare</h2><p>Test each mandatory requirement against cited material.</p></div>
        <div><span>C</span><h2>Publish</h2><p>Issue an attributable eligibility record.</p></div>
        <aside><FileCheck2 size={25} /><small>ACTIVE LEDGER</small><strong>{short}</strong><a href={contractExplorerUrl} target="_blank" rel="noreferrer">Verify contract</a></aside>
      </section>

      <style jsx global>{`
        .tender-entry{min-height:100vh;background:#f8f8f4;color:#17231d;font-family:Archivo,sans-serif;border-top:8px solid #e33d2e}
        header{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:24px clamp(20px,5vw,72px);border-bottom:1px solid #17231d}
        header a{color:inherit;text-decoration:none}.seal{font-size:18px;font-weight:800;display:flex;gap:10px;align-items:center}.jurisdiction{text-align:right;font-size:11px;font-weight:700}nav{display:flex;gap:25px;font-size:13px}
        .notice{display:grid;grid-template-columns:190px 1fr;max-width:1260px;margin:0 auto;min-height:610px;border-left:1px solid #17231d;border-right:1px solid #17231d}
        .notice-number{padding:42px 28px;border-right:1px solid #17231d;display:flex;flex-direction:column}.notice-number span,.notice-number small{font-size:11px}.notice-number strong{font-size:104px;line-height:1;margin:30px 0}.notice-number small{margin-top:auto}
        .notice-copy{padding:clamp(48px,7vw,100px)}.kicker{color:#d82f23;font-size:12px;font-weight:800;margin:0 0 18px}h1{font-size:clamp(48px,7vw,94px);line-height:.95;max-width:920px;margin:0;font-weight:800}.lead{font-size:20px;line-height:1.5;max-width:700px;margin:30px 0}
        .searchline{height:56px;border:2px solid #17231d;display:flex;align-items:center;gap:12px;padding:0 14px;max-width:700px;background:#fff}.searchline span{color:#66706b;flex:1}.searchline kbd{border:1px solid #b6bcb9;padding:3px 7px}
        .open{display:inline-flex;gap:10px;align-items:center;background:#e33d2e;color:#fff;text-decoration:none;padding:16px 18px;margin-top:18px;font-weight:700}
        .public-record{border-top:1px solid #17231d;display:grid;grid-template-columns:repeat(3,1fr) 1.25fr}.public-record>div,.public-record>aside{min-height:210px;padding:28px;border-right:1px solid #17231d}.public-record>*:last-child{border-right:0}.public-record span{font-size:12px;color:#d82f23;font-weight:800}.public-record h2{font-size:24px;margin:32px 0 6px}.public-record p{line-height:1.45;margin:0}.public-record aside{background:#17231d;color:#fff;display:flex;flex-direction:column;gap:9px;justify-content:center}.public-record aside strong{font-family:ui-monospace,monospace;font-size:13px}.public-record aside a{color:#fff}
        @media(max-width:760px){header{grid-template-columns:1fr auto}.jurisdiction{display:none}nav a:not(:last-child){display:none}.notice{grid-template-columns:1fr;border:0}.notice-number{border-right:0;border-bottom:1px solid #17231d;display:grid;grid-template-columns:1fr auto;align-items:center;padding:18px 22px}.notice-number strong{font-size:42px;margin:0}.notice-number small{display:none}.notice-copy{padding:42px 22px}h1{font-size:47px}.searchline{font-size:12px}.public-record{grid-template-columns:1fr}.public-record>div,.public-record>aside{border-right:0;border-bottom:1px solid #17231d;min-height:160px}}
      `}</style>
    </main>
  );
}
