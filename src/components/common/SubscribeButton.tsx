import { apiClient } from "../../core/apiClient";
import myStore from "../../core/cacheStore";
import { useQuery } from "../../libs/hooks/useQuery";
import { useStore } from "../../libs/hooks/useStore";
import { unsubscribeTarget } from "../../type/types";
import { CloseIcon, PlusIcon } from "./Icons";

type subscribeBtnParams = {
  id: number;
  name: string;
  onWhiteBg?: boolean;
};

export function SubscribeBtn({
  id,
  name,
  onWhiteBg = false,
}: subscribeBtnParams) {
  const { data: subscribedPressList, isLoading: loadingSubscribedPressList } =
    useQuery<number[]>("subscribedPressList");
  const [unsubscribeTarget, setUnsubscribeTarget] =
    useStore<unsubscribeTarget>("unsubscribeTarget");

  const onSubscribeClicked = async () => {
    if (isSubscribed) {
      setUnsubscribeTarget({ id: id, name: name, isSubscribed: isSubscribed });
    } else {
      const result = await apiClient(`toggleSubscribe/id=${id}`);
      myStore.set("subscribedPressList", result);
    }
  };

  const isSubscribed = subscribedPressList?.includes(id);
  const bgColorByParentBg =
    (!onWhiteBg && isSubscribed) || (onWhiteBg && !isSubscribed)
      ? "bg-surface-alt"
      : "bg-surface-default";

  return (
    <button
      className={`cursor-pointer border border-border-default h-6 flex-row flex items-center rounded-full
        available-medium12 text-text-weak hover:text-text-bold gap-0.5 px-1.5
        hover:border-border-bold  ${bgColorByParentBg}`}
      onClick={onSubscribeClicked}
    >
      <div>
        {isSubscribed ? (
          <CloseIcon className="w-4 h-4" />
        ) : (
          <PlusIcon className="w-4 h-4" />
        )}
      </div>
      <div className="pr-1 ">{isSubscribed ? "구독해제" : "구독하기"}</div>
    </button>
  );
}
