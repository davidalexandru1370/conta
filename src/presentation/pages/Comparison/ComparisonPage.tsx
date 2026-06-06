import { type FC, useMemo, useState } from "react";
import { Link } from "react-router";
import { EmployeeService } from "../../../features/tax-calculator/api/EmployeeService";
import { MicroSrlService } from "../../../features/tax-calculator/api/MicroSrlService";
import { SelfEmployedService } from "../../../features/tax-calculator/api/SelfEmployedService";
import { SrlService } from "../../../features/tax-calculator/api/SrlService";

const EMPLOYEE_CAS_RATE = 0.25;
const EMPLOYEE_CASS_RATE = 0.1;
const EMPLOYEE_INCOME_TAX_RATE = 0.1;
const MIN_WAGE = 4050;

const fmt = (v: number) => v.toFixed(2);

const employeeService = new EmployeeService();
const microSrlService = new MicroSrlService();
const srlService = new SrlService();
const selfEmployedService = new SelfEmployedService();

const ComparisonPage: FC = () => {
  const [gross, setGross] = useState<number>(10000);

  const comparison = useMemo(() => {
    const taxableGross = Math.max(0, gross);
    const employee = employeeService.computeNetSalaryFromGross(
      {
        gross: taxableGross,
        casRate: EMPLOYEE_CAS_RATE,
        cassRate: EMPLOYEE_CASS_RATE,
        taxRate: EMPLOYEE_INCOME_TAX_RATE,
      },
      MIN_WAGE,
    );

    const microSrlNet = microSrlService.computeTaxingFromGross(taxableGross);
    const srlNet = srlService.computeTaxingFromGross(taxableGross);
    const selfEmployedNet =
      selfEmployedService.computeTaxingFromGross(taxableGross);

    return [
      { type: "Employee", net: employee.net },
      { type: "Micro SRL", net: microSrlNet },
      { type: "SRL", net: srlNet },
      { type: "Self-employed", net: selfEmployedNet },
    ];
  }, [gross]);

  return (
    <div>
      <h1>Income Comparison</h1>
      <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <Link to="/employee">Employee</Link>
        <Link to="/micro-srl">Micro SRL</Link>
        <Link to="/srl">SRL</Link>
        <Link to="/self-employed">Self-employed</Link>
        <Link to="/comparison">Comparison</Link>
      </nav>

      <section style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Same gross for all income types (RON):
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
                Income type
              </th>
              <th
                style={{
                  textAlign: "right",
                  borderBottom: "1px solid #ddd",
                  padding: 8,
                }}
              >
                Net after taxes (RON)
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.type}>
                <td style={{ padding: 8 }}>{row.type}</td>
                <td style={{ padding: 8, textAlign: "right" }}>
                  {fmt(row.net)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ComparisonPage;
