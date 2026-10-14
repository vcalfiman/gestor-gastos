import { formatCurrency } from '../utils/formatters';

function Summary({ expenses }) {

  const income = expenses
    .filter((item) => item.type === 'income')
    .reduce((acc, item) => acc + item.amount, 0);

  const expense = expenses
    .filter((item) => item.type === 'expense')
    .reduce((acc, item) => acc + item.amount, 0);

  const total = income - expense;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <span className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
            Balance Total
          </span>
          <strong className="text-xl font-bold text-slate-800">
            {formatCurrency(total)}
          </strong>
        </div>

        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
          <span className="block text-xs uppercase tracking-wider text-emerald-600 font-semibold mb-1">
            Ingresos
          </span>
          <strong className="text-xl font-bold text-emerald-600">
            {formatCurrency(income)}
          </strong>
        </div>

        <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
          <span className="block text-xs uppercase tracking-wider text-rose-600 font-semibold mb-1">
            Gastos
          </span>
          <strong className="text-xl font-bold text-rose-600">
            {formatCurrency(expense)}
          </strong>
        </div>
      </div>
    </div>
  );
}

export default Summary;