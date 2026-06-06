import { type FC, useMemo, useState } from "react";
import { Link } from "react-router";
import { SelfEmployedService } from "../../../features/tax-calculator/api/SelfEmployedService";

const CAS_RATE = 0.25;
const CASS_RATE = 0.1;
const INCOME_TAX_RATE = 0.1;

const fmt = (v: number) => v.toFixed(2);
const service = new SelfEmployedService();

const SelfEmployedPage: FC = () => {
  const [gross, setGross] = useState<number>(10000);

  const { cas, cass, incomeTaxBase, incomeTax, net } = useMemo(() => {
    const taxableIncome = Math.max(0, gross);
    const casValue = taxableIncome * CAS_RATE;
    const cassValue = taxableIncome * CASS_RATE;
    const incomeTaxBaseValue = Math.max(
      0,
      taxableIncome - casValue - cassValue,
    );
    const incomeTaxValue = incomeTaxBaseValue * INCOME_TAX_RATE;

    return {
      cas: casValue,
      cass: cassValue,
      incomeTaxBase: incomeTaxBaseValue,
      incomeTax: incomeTaxValue,
      net: service.computeTaxingFromGross(gross),
    };
  }, [gross]);

  return (
    <div>
      <h1>Self-employed (PFA) Calculator</h1>
      <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <Link to="/employee">Employee</Link>
        <Link to="/micro-srl">Micro SRL</Link>
        <Link to="/srl">SRL</Link>
        <Link to="/self-employed">Self-employed</Link>
        <Link to="/comparison">Comparison</Link>
      </nav>

      <section style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Gross income (RON):
          <input
            type="number"
            value={gross}
            min={0}
            onChange={(e) => setGross(Number(e.target.value))}
            style={{ marginLeft: 8, width: 180 }}
          />
        </label>
      </section>

      <section>
        <table style={{ borderCollapse: "collapse", width: 560 }}>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                  padding: 8,
                }}
              >
                Concept
              </th>
              <th
                style={{
                  textAlign: "right",
                  borderBottom: "1px solid #ddd",
                  padding: 8,
                }}
              >
                Amount (RON)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: 8 }}>Gross amount</td>
              <td style={{ padding: 8, textAlign: "right" }}>{fmt(gross)}</td>
            </tr>
            <tr>
              <td style={{ padding: 8 }}>
                CAS ({(CAS_RATE * 100).toFixed(1)}%)
              </td>
              <td style={{ padding: 8, textAlign: "right" }}>{fmt(cas)}</td>
            </tr>
            <tr>
              <td style={{ padding: 8 }}>
                CASS ({(CASS_RATE * 100).toFixed(1)}%)
              </td>
              <td style={{ padding: 8, textAlign: "right" }}>{fmt(cass)}</td>
            </tr>
            <tr>
              <td style={{ padding: 8 }}>Income tax base</td>
              <td style={{ padding: 8, textAlign: "right" }}>
                {fmt(incomeTaxBase)}
              </td>
            </tr>
            <tr>
              <td style={{ padding: 8 }}>
                Income tax ({(INCOME_TAX_RATE * 100).toFixed(1)}%)
              </td>
              <td style={{ padding: 8, textAlign: "right" }}>
                {fmt(incomeTax)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: 8,
                  fontWeight: 600,
                  borderTop: "1px solid #ddd",
                }}
              >
                Net after taxes
              </td>
              <td
                style={{
                  padding: 8,
                  textAlign: "right",
                  fontWeight: 600,
                  borderTop: "1px solid #ddd",
                }}
              >
                {fmt(net)}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default SelfEmployedPage;
