import { Button, ButtonGroup } from "@chakra-ui/react";
import { ActionButtonsProps } from "@/lib/types";

export default function ActionButtons({
  id,
  onEdit,
  onDelete,
  modifiedRow,
  setModifiedRow,
  onSave,
}: ActionButtonsProps) {
  if (modifiedRow && modifiedRow.name === id) {
    return (
      <ButtonGroup>
        <Button
          variant="solid"
          colorScheme={"green"}
          onClick={onSave}
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
        data-testid={"deletebtn-" + { id }}
        variant="outline"
        className={"deletebtn"}
        onClick={() => onDelete(id)}
      >
        Delete
      </Button>
    </ButtonGroup>
  );
}
