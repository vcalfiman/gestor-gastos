import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

function PeriodSelector({ selectedPeriod, onPeriodChange }) {
  // selectedPeriod viene en formato "YYYY-MM" (ej: "2026-10")
  const [year, month] = selectedPeriod.split('-').map(Number);

  const monthsList = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const handlePrevMonth = () => {
    let newMonth = month - 1;
    let newYear = year;
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    const formattedMonth = String(newMonth).padStart(2, '0');
    onPeriodChange(`${newYear}-${formattedMonth}`);
  };

  const handleNextMonth = () => {
    let newMonth = month + 1;
    let newYear = year;
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    const formattedMonth = String(newMonth).padStart(2, '0');
    onPeriodChange(`${newYear}-${formattedMonth}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 flex items-center justify-between">
      <button
        onClick={handlePrevMonth}
        className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-semibold"
      >
        <ChevronLeft className="w-5 h-5 text-slate-500" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-600" />
        <span className="text-base font-bold text-slate-800">
          {monthsList[month - 1]} {year}
        </span>
      </div>

      <button
        onClick={handleNextMonth}
        className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-semibold"
      >
        <span className="hidden sm:inline">Siguiente</span>
        <ChevronRight className="w-5 h-5 text-slate-500" />
      </button>
    </div>
  );
}

export default PeriodSelector;