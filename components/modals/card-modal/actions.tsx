"use client";

import { toast } from "sonner";
import {
  CheckIcon,
  CheckSquare,
  Clock,
  ContactIcon,
  Copy,
  FileAxis3D,
  Trash,
} from "lucide-react";
import { useParams } from "next/navigation";

import { CardWithList } from "@/types";
import { useAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { Button } from "@/components/ui/button";
import { deleteCard } from "@/actions/delete-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModal } from "@/hooks/use-card-modal";
import { executeCheckList } from "@/actions/check-list";
import { useState } from "react";
import DueDateModal from "./date";

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();
  const [showChecklist, setShowChecklist] = useState(false);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    const newCheckedItems = [...checkedItems];

    const checkboxElement = document.getElementById(id); // Assuming your checkboxes have ids corresponding to their ids

    if (newCheckedItems.includes(id)) {
      // Item is already checked, remove it
      const index = newCheckedItems.indexOf(id);
      newCheckedItems.splice(index, 1);

      // If you want to style the checkbox element when unchecked
      if (checkboxElement) {
        checkboxElement.style.borderBottom = "2px solid #000";
      }
    } else {
      // Item is not checked, add it
      newCheckedItems.push(id);

      // If you want to remove the style when checked
      if (checkboxElement) {
        checkboxElement.style.borderBottom = "none";
      }
    }

    setCheckedItems(newCheckedItems);
  };

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" copied`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({
      id: data.id,
      boardId,
    });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({
      id: data.id,
      boardId,
    });
  };
  const [isDueDateModalOpen, setDueDateModalOpen] = useState(false);

  const onDate = () => {
    setDueDateModalOpen(true);
  };
  const onCheckList = () => {
    const boardId = params.boardId as string;

    executeCheckList({
      id: data.id,
      boardId,
    });
  };

  const onToggleChecklist = () => {
    setShowChecklist(!showChecklist);
  };
  // const onCheckItem = (itemId) => {
  //   const updatedCheckedItems = new Set(checkedItems);
  //   if (checkedItems.has(itemId)) {
  //     updatedCheckedItems.delete(itemId);
  //   } else {
  //     updatedCheckedItems.add(itemId);
  //   }
  //   setCheckedItems(updatedCheckedItems);
  // };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Add to card</p>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <ContactIcon className="h-4 w-4 mr-2" /> Members
      </Button>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <CheckSquare className="h-4 w-4 mr-2" /> Checklist
      </Button>
      <Button
        onClick={onDate}
        disabled={isLoadingCopy}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <Clock className="h-4 w-4 mr-2" /> Dates
      </Button>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <FileAxis3D className="h-4 w-4 mr-2" /> Attachment
      </Button>
      <p className="text-xs font-semibold">Actions</p>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
      <Button
        onClick={onToggleChecklist}
        // disabled={isLoadingChecklist}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <CheckIcon className="h-4 w-4 mr-2" />
        {showChecklist ? "Hide Checklist" : "Show Checklist"}
      </Button>

      {showChecklist && (
        <div className="space-y-2 mt-2">
          <p className="text-xs font-semibold">Checklist</p>
          {/* {data.checklist.map((item) => (
            <div key={item.id} className="flex items-center">
              <input
                type="checkbox"
                id={item.id}
                checked={checkedItems.has(item.id)}
                onChange={() => onCheckItem(item.id)}
              />
              <label htmlFor={item.id} className="ml-2">
                {item.name}
              </label>
            </div>
          ))} */}
          <div className="flex flex-col">
            <div
              className={`flex items-center ${
                checkedItems.includes("checkbox1")
                  ? "line-through text-gray-500"
                  : ""
              }`}
            >
              <input
                className="mr-2"
                type="checkbox"
                id="checkbox1"
                checked={checkedItems.includes("checkbox1")}
                onChange={() => handleCheckboxChange("checkbox1")}
              />
              Import machine
            </div>
            <div
              className={`flex items-center ${
                checkedItems.includes("checkbox2")
                  ? "line-through text-gray-500"
                  : ""
              }`}
            >
              <input
                className="mr-2"
                type="checkbox"
                id="checkbox2"
                checked={checkedItems.includes("checkbox2")}
                onChange={() => handleCheckboxChange("checkbox2")}
              />
              top1 raw material
            </div>
            <div
              className={`flex items-center ${
                checkedItems.includes("checkbox3")
                  ? "line-through text-gray-500"
                  : ""
              }`}
            >
              <input
                className="mr-2"
                type="checkbox"
                id="checkbox3"
                checked={checkedItems.includes("checkbox3")}
                onChange={() => handleCheckboxChange("checkbox3")}
              />
              top2 raw material
            </div>
            <div
              className={`flex items-center ${
                checkedItems.includes("checkbox4")
                  ? "line-through text-gray-500"
                  : ""
              }`}
            >
              <input
                className="mr-2"
                type="checkbox"
                id="checkbox4"
                checked={checkedItems.includes("checkbox4")}
                onChange={() => handleCheckboxChange("checkbox4")}
              />
              Import machine
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
