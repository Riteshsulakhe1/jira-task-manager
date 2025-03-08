import React from "react";
import { useDraggable, useDroppable, UseDraggableArguments, UseDroppableArguments, DropAnimation, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { TaskType } from '../Types/taskStaticProperties';

interface DroppableProps extends UseDroppableArguments {
    children: any;
}
const defaultColStyle = {
    height: '100%',
    width: '100%'
};

export const Droppable = (props: DroppableProps) => {
    const { setNodeRef, isOver, over } = useDroppable({
        id: props.id,
        data: {
            ...props.data,
            accepts: props?.data?.accepts,
        },
    });

    const style = {
        color: isOver ? 'green' : undefined,
        ...defaultColStyle
    };

    return (
        <div ref={setNodeRef} id={props.id as string} style={style}>
            {props.children}
        </div>
    )
}


interface DraggableProps extends UseDraggableArguments {
    children: any;

}

export const Draggable = (props: DraggableProps) => {
    const { attributes, listeners, setNodeRef, transform, over } = useSortable({
        id: props.id,
        data: {
            ...props?.data,
            type: props?.data?.type
        }
    });
    let style: any = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        cursor: 'grab',
    } : undefined;
    const isColumn = props.data?.type === 'column';
    // Column should have full available height
    if (isColumn) {
        style = style ? { ...style, ...defaultColStyle } : { ...defaultColStyle };
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            {props.children}
        </div>
    );
}

export const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: "0.5"
            }
        }
    })
};