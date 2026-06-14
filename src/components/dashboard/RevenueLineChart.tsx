import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const monthFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'short', year: '2-digit' });

export interface RevenuePoint {
  month: string;
  revenue: number;
}

interface RevenueLineChartProps {
  data: RevenuePoint[];
}

export function RevenueLineChart({ data }: RevenueLineChartProps) {
  const points = data.map((d) => ({
    ...d,
    label: monthFormatter.format(new Date(d.month)),
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points} margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d4dceb" />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#4d6aa0' }} />
          <YAxis
            tick={{ fontSize: 12, fill: '#4d6aa0' }}
            tickFormatter={(value: number) => currencyFormatter.format(value)}
            width={80}
          />
          <Tooltip formatter={(value) => currencyFormatter.format(Number(value))} labelStyle={{ color: '#101d38' }} />
          <Line type="monotone" dataKey="revenue" name="Chiffre d'affaires" stroke="#1fb482" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
