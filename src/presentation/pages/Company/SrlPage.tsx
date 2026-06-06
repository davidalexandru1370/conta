import { type FC, useMemo, useState } from "react";
import { Link } from "react-router";
import { SrlService } from "../../../features/tax-calculator/api/SrlService";

const PROFIT_TAX_RATE = 0.16;
const DIVIDEND_TAX_RATE = 0.1;

const fmt = (v: number) => v.toFixed(2);
const service = new SrlService();

const SrlPage: FC = () => {
  const [gross, setGross] = useState<number>(10000);

  const { profitTax, distributableProfit, dividendTax, net } = useMemo(() => {
    const taxableProfit = Math.max(0, gross);
    const profitTaxValue = taxableProfit * PROFIT_TAX_RATE;
    const distributableProfitValue = taxableProfit - profitTaxValue;
    const dividendTaxValue = distributableProfitValue * DIVIDEND_TAX_RATE;

    return {
      profitTax: profitTaxValue,
      distributableProfit: distributableProfitValue,
      dividendTax: dividendTaxValue,
      net: service.computeTaxingFromGross(gross),
    };
  }, [gross]);

  return (
    <div>
      <h1>SRL Calculator</h1>
      <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <Link to="/employee">Employee</Link>
        <Link to="/micro-srl">Micro SRL</Link>
        <Link to="/srl">SRL</Link>
        <Link to="/self-employed">Self-employed</Link>
        <Link to="/comparison">Comparison</Link>
      </nav>

      <section style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Gross taxable profit (RON):
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
                Profit tax ({(PROFIT_TAX_RATE * 100).toFixed(1)}%)
              </td>
              <td style={{ padding: 8, textAlign: "right" }}>
                {fmt(profitTax)}
              </td>
            </tr>
            <tr>
              <td style={{ padding: 8 }}>Distributable profit</td>
              <td style={{ padding: 8, textAlign: "right" }}>
                {fmt(distributableProfit)}
              </td>
            </tr>
            <tr>
              <td style={{ padding: 8 }}>
                Dividend tax ({(DIVIDEND_TAX_RATE * 100).toFixed(1)}%)
              </td>
              <td style={{ padding: 8, textAlign: "right" }}>
                {fmt(dividendTax)}
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

export default SrlPage;
