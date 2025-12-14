import { ButtonGroup } from "@/shared/ui/button-group";
import { Button } from "@/shared/ui/button";

export function IdleMenu({ onImprove }: { onImprove: () => void }) {
  return (
    <ButtonGroup>
      <Button variant="outline" onClick={onImprove}>
        표현 다듬기
      </Button>
      <Button variant="outline">AI에게 질문하기</Button>
    </ButtonGroup>
  );
}
