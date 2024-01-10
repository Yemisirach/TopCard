"use client";

import { toast } from "sonner";
import { CheckIcon, Copy, Trash } from "lucide-react";
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

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();
  const [showChecklist, setShowChecklist] = useState(false);

//   const initialCheckedItems = Array.isArray(data.checklist)
//   ? new Set(data.checklist.map((item) => item.id))
//   : new Set();

// const [checkedItems, setCheckedItems] = useState<Set<string>>(initialCheckedItems);


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

  // const { execute: executeCheckList, isLoading: isLoadingChecklist } =
  //   useAction(executeCheckList, {
  //     onSuccess: (data) => {
  //       // Assuming the checklist action returns relevant success information
  //       toast.success(`Checklist for card "${data.title}" executed`);
  //       cardModal.onClose();
  //     },
  //     onError: (error) => {
  //       toast.error(error);
  //     },
  //   });

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
