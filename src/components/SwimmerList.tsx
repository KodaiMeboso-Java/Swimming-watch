import React, { useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useSwimmerStore } from '../store/useSwimmerStore';
import { SwimmerCard } from './SwimmerCard';

export const SwimmerList = () => {
  const { swimmers, reorderSwimmers } = useSwimmerStore();

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    reorderSwimmers(result.source.index, result.destination.index);
  }, [reorderSwimmers]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="swimmers" type="SWIMMER">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {swimmers.map((swimmer, index) => (
              <Draggable
                key={swimmer.id}
                draggableId={swimmer.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? 0.8 : 1,
                    }}
                  >
                    <SwimmerCard swimmer={swimmer} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};