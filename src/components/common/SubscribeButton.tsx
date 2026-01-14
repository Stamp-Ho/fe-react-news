import { useContext } from "react";
import { MainSectionContext } from "../mainSection/mainSectionContext";
import { CloseIcon, PlusIcon } from "./Icons";

type subscribeBtnParams = {
  id: number;
};

export function SubscribeBtn({ id }: subscribeBtnParams) {
  const context = useContext(MainSectionContext);
  if (!context) return null;
  const { subscribedPressList, setSubscribedPressList } = context;

  const onSubscribeClicked = () => {
    if (!subscribedPressList || !setSubscribedPressList) return;

    setSubscribedPressList((prevSet) => {
      // 1. 기존 Set을 복사하여 새로운 Set 생성 (불변성 유지)
      const newSet = new Set(prevSet);

      // 2. 존재 여부에 따라 추가 또는 삭제 (Toggle)
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      // 3. 새로운 참조를 반환하여 리렌더링 트리거
      return newSet;
    });
  };
  return (
    <button className="cursor-pointer" onClick={onSubscribeClicked}>
      <div>{subscribedPressList.has(id) ? <CloseIcon /> : <PlusIcon />}</div>
      <div>{subscribedPressList.has(id) ? "구독해제" : "구독하기"}</div>
    </button>
  );
}
