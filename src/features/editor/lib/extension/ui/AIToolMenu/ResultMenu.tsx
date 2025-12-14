import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";

interface ResultMenuProps {
  onAccept: () => void;
  onDiscard: () => void;
}

export function ResultMenu({ onAccept, onDiscard }: ResultMenuProps) {
  return (
    <ButtonGroup>
      <Button onClick={onAccept}>Accept</Button>
      <Button onClick={onDiscard}>Discard</Button>
    </ButtonGroup>
  );
}
