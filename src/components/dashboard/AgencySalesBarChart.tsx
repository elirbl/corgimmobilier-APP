import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export interface AgencySalesPoint {
  agencyName: string;
  revenue: number;
}

interface AgencySalesBarChartProps {
  data: AgencySalesPoint[];
}

export function AgencySalesBarChart({ data }: AgencySalesBarChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d4dceb" />
          <XAxis dataKey="agencyName" tick={{ fontSize: 12, fill: '#4d6aa0' }} />
          <YAxis
            tick={{ fontSize: 12, fill: '#4d6aa0' }}
            tickFormatter={(value: number) => currencyFormatter.format(value)}
            width={80}
          />
          <Tooltip formatter={(value) => currencyFormatter.format(Number(value))} labelStyle={{ color: '#101d38' }} />
          <Bar dataKey="revenue" name="Chiffre d'affaires" fill="#2c4a80" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
