import './MenuButton.css';

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      className={`menuButton ${isOpen ? 'open' : ''}`}
      onClick={onClick}
      aria-label="Menu Button"
      aria-expanded={isOpen}
    >
      <div className="topLine" />
      <div className="middleLine" />
      <div className="bottomLine" />
    </button>
  );
};

export default MenuButton;
