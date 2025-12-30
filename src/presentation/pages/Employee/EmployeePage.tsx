import { type FC, useMemo, useState } from "react";

const fmt = (v: number) => v.toFixed(2);

const EmployeePage: FC = () => {
  const [gross, setGross] = useState<number>(3500);
  const [casRate, setCasRate] = useState<number>(0.25); // pension (CAS)
  const [cassRate, setCassRate] = useState<number>(0.1); // health (CASS)
  const [taxRate, setTaxRate] = useState<number>(0.1); // income tax

  const { cas, cass, taxable, incomeTax, net } = useMemo(() => {
    const cas = gross * casRate;
    const cass = gross * cassRate;
    const taxable = Math.max(0, gross - cas - cass);
    const incomeTax = taxable * taxRate;
    const net = gross - cas - cass - incomeTax;
    return { cas, cass, taxable, incomeTax, net };
  }, [gross, casRate, cassRate, taxRate]);

  return (
    <div>
      <h1>Employee Page</h1>

      <section style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Gross salary (RON):
          <input
            type="number"
            value={gross}
            min={0}
            onChange={(e) => setGross(Number(e.target.value))}
            style={{ marginLeft: 8, width: 140 }}
          />
        </label>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <label>
            CAS (%):
            <input
              type="number"
              step="0.1"
              value={casRate * 100}
              onChange={(e) => setCasRate(Number(e.target.value) / 100)}
              style={{ marginLeft: 6, width: 80 }}
            />
          </label>

          <label>
            CASS (%):
            <input
              type="number"
              step="0.1"
              value={cassRate * 100}
              onChange={(e) => setCassRate(Number(e.target.value) / 100)}
              style={{ marginLeft: 6, width: 80 }}
            />
          </label>

          <label>
            Income tax (%):
            <input
              type="number"
              step="0.1"
              value={taxRate * 100}
              onChange={(e) => setTaxRate(Number(e.target.value) / 100)}
              style={{ marginLeft: 6, width: 80 }}
            />
          </label>
        </div>
      </section>

      <section>
        <table style={{ borderCollapse: "collapse", width: 480 }}>
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
              <td style={{ padding: 8 }}>Gross salary</td>
              <td style={{ padding: 8, textAlign: "right" }}>{fmt(gross)}</td>
            </tr>
            <tr>
              <td style={{ padding: 8 }}>
                CAS ({(casRate * 100).toFixed(1)}%)
              </td>
              <td style={{ padding: 8, textAlign: "right" }}>{fmt(cas)}</td>
            </tr>
            <tr>
              <td style={{ padding: 8 }}>
                CASS ({(cassRate * 100).toFixed(1)}%)
              </td>
              <td style={{ padding: 8, textAlign: "right" }}>{fmt(cass)}</td>
            </tr>
            <tr>
              <td style={{ padding: 8 }}>Taxable base</td>
              <td style={{ padding: 8, textAlign: "right" }}>{fmt(taxable)}</td>
            </tr>
            <tr>
              <td style={{ padding: 8 }}>
                Income tax ({(taxRate * 100).toFixed(1)}%)
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
                Net salary
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

export default EmployeePage;
