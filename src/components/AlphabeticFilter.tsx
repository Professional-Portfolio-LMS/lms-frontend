import type React from "react";

interface Props {
  title: string;
  selectedLetter: string;
  onSelect: (letter: string) => void;
}

const AlphabetFilter: React.FC<Props> = ({ title, selectedLetter, onSelect }) => {
  const letters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

  return (
    <div className="my-1">
      <div className="font-semibold">{title}</div>
      <div className="flex flex-wrap gap-1 mt-2">
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          onClick={() => onSelect('')}
          className={`px-2 py-1 rounded ${
            selectedLetter === ''
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          All
        </button>
        {letters.map((letter) => (
          // biome-ignore lint/a11y/useButtonType: <explanation>
          <button
            key={letter}
            onClick={() => onSelect(letter)}
            className={`px-2 py-1 rounded ${
              selectedLetter === letter
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlphabetFilter;
