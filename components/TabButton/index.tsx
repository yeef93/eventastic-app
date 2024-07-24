interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 font-semibold ${
        isActive ? "border-b-2 border-purple-500 text-purple-500" : "text-gray-600"
      }`}
    >
      {label}
    </button>
  );
}

export default TabButton;