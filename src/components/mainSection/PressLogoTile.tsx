import { useState } from "react";
import { SubscribeBtn } from "../common/SubscribeButton";

const PressLogoTile = ({ logo, index }: any) => {
  const [isHidden, setIsHidden] = useState(true);

  const handleMouseEnter = () => {
    if (logo.id === null) return;
    setIsHidden(false);
  };

  return (
    <div
      className="relative flex items-center justify-center border border-border-default -ml-px -mt-px"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHidden(true)}
    >
      <img className="h-5" src={logo.logo} id={logo.press} />
      <div
        className={`absolute inset-0 flex items-center justify-center bg-surface-alt ${
          isHidden && "hidden"
        }`}
      >
        <SubscribeBtn id={logo.id} name={logo.press} onWhiteBg={false} />
      </div>
    </div>
  );
};

export default PressLogoTile;
