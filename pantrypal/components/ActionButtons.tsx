import { Button, ButtonGroup } from "@chakra-ui/react";
import { ActionButtonsProps } from "@/lib/types";

export default function ActionButtons({ id, onEdit, onDelete }: ActionButtonsProps) {
  return (
    <ButtonGroup>
      <Button
        variant="solid"
        onClick={() => onEdit(String(id))}
      >
        Edit
      </Button>
      <Button
        variant="outline"
        onClick={() => onDelete(String(id))}
      >
        Delete
      </Button>
    </ButtonGroup>
  );
}
