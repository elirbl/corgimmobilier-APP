export type ViewMode = 'grid' | 'list' | 'map';

interface ViewToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const OPTIONS: { value: ViewMode; label: string }[] = [
  { value: 'grid', label: 'Grille' },
  { value: 'list', label: 'Liste' },
  { value: 'map', label: 'Carte' },
];

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div role="group" aria-label="Mode d'affichage" className="inline-flex rounded-md border border-navy-200 bg-white p-1">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={`rounded px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
            value === option.value
              ? 'bg-brand-600 text-white'
              : 'text-navy-600 hover:bg-navy-100'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
