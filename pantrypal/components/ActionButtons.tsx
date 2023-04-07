import { Button, ButtonGroup } from "@chakra-ui/react";
import { ActionButtonsProps } from "@/lib/types";

export default function ActionButtons({
  id,
  onEdit,
  onDelete,
  modifiedRow,
  setModifiedRow,
}: ActionButtonsProps) {
  if (modifiedRow && modifiedRow.name === id) {
    return (
      <ButtonGroup>
        <Button
          variant="solid"
          colorScheme={"green"}
          onClick={() => onEdit(id)}
        >
          Save
        </Button>
        <Button
          variant="outline"
          onClick={() => setModifiedRow(undefined)}
        >
          Cancel
        </Button>
      </ButtonGroup>
    );
  }

  return (
    <ButtonGroup>
      <Button
        variant="solid"
        onClick={() => onEdit(id)}
      >
        Edit
      </Button>
      <Button
        variant="outline"
        onClick={() => onDelete(id)}
      >
        Delete
      </Button>
    </ButtonGroup>
  );
}
