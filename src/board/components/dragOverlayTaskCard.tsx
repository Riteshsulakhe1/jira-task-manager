import React from 'react';
import { DragOverlay } from "@dnd-kit/core";
import { createPortal } from 'react-dom';
import { Task } from "../../Types/common";
import { dropAnimation } from "../../common/dragDropHelper";
import ColumnTaskCard from "./columnTaskCard";

interface DragOverlayTaskCardProps {
    activeDraggingTask: Task | null;
    sprintId: string;
}
const DragOverlayTaskCard = React.memo((props: DragOverlayTaskCardProps) => {
    const { activeDraggingTask, sprintId } = props;
    return (
        activeDraggingTask?._id && sprintId ?
            createPortal(
                <DragOverlay adjustScale={false} dropAnimation={dropAnimation} >
                    <ColumnTaskCard task={activeDraggingTask} sprintId={sprintId} />
                </DragOverlay >,
                document.body
            ) : null
    )
});

export default DragOverlayTaskCard;
