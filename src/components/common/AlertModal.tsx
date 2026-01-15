import { apiClient } from "../../core/apiClient";
import myStore from "../../core/cacheStore";
import { useStore } from "../../libs/hooks/useStore";
import { unsubscribeTarget } from "../../type/types";

const AlertModal = () => {
  const [data, setData] = useStore<unsubscribeTarget>("unsubscribeTarget");

  const onYes = async () => {
    const result = await apiClient(`toggleSubscribe/id=${data.id}`);
    myStore.set("subscribedPressList", result);
    setData({ id: null, name: "", isSubscribed: false });
  };
  const onNo = () => {
    setData({ id: null, name: "", isSubscribed: false });
  };

  return (
    <div
      className="absolute z-10 w-80 h-35 bg-surface-default
        left-1/2 top-1/2 -translate-1/2
         flex flex-col items-center justify-center
         border border-border-default
         shadow-shadow-popup;
"
    >
      <div className="h-23 flex flex-col items-center justify-center">
        <div
          className="text-4 font-medium
         text-text-default"
        >
          <strong className="text-text-strong">{data.name}</strong>을(를)
        </div>
        <div>구독{data.isSubscribed ? "해지" : ""} 하시겠습까?</div>
      </div>
      <div className="flex flex-row">
        <button
          onClick={onYes}
          className="w-40 h-12
         bg-surface-alt
         border-t
         border-x border-border-default
         available-medium14
         text-text-default
         hover:underline
         cursor-pointer"
        >
          예, {data.isSubscribed ? "해지" : "구독"} 합니다.
        </button>
        <button
          onClick={onNo}
          className="w-40 h-12
         bg-surface-alt
         border-t
         border-r border-border-default
         available-medium14
         text-text-strong
         hover:underline
         cursor-pointer"
        >
          아니오
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
