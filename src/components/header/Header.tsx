import { Logo } from "../common/Icons";
import { formattedDate } from "../../utils/uitls";

const Header = () => {
  const handleLogoClick = (e: React.MouseEvent) => {
    // refresh logic
    e.preventDefault();
    window.location.reload();
  };
  return (
    <header className="flex flex-row items-center justify-between">
      <div
        className="flex flex-row items-center gap-2 cursor-pointer"
        onClick={handleLogoClick}
      >
        <Logo className="text-blue-500" />
        <div className="display-bold24 text-text-strong">뉴스스탠드</div>
      </div>
      <div className="display-medium16 text-text-default">
        {formattedDate()}
      </div>
    </header>
  );
};

export default Header;
