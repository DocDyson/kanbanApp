'use client'

import 'react-indiana-drag-scroll/dist/style.css'
import Column from './Column'
import { BoardModel } from '@models/Board'
import { Button } from 'flowbite-react'
import { useBoardActions } from '@stores/boardStore'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { TaskService } from '@components/services/taskService'
import { ApiUrls } from '@components/consts/apiURLs'
import eventEmitter from '@components/services/eventEmitter'
import { ColumnService } from '@components/services/columnService'
import { FaPlus } from "react-icons/fa6";
import { useUserStore } from '@stores/userStore'

type Props = {
    board?: BoardModel
}

function Board({ board }: Props) {
    const { user } = useUserStore();
    const { setColumnModal } = useBoardActions();

    const taskService = new TaskService(ApiUrls.task, user.key);
    const columnService = new ColumnService(ApiUrls.column, user.key);

    const handleAddColumnClick = (): void => {
        setColumnModal(true);
    }

    const onDragEnd = async (result): Promise<any> => {
        if (result.type === "TASK") {
            const data = {
                old_id: result.source.index,
                new_id: result.destination.index,
                column: result.destination.droppableId,
            }

            await taskService.post(data, result.draggableId as number, 'update_order');
            if (taskService.isSuccess) eventEmitter.emit('reload');

        } else if (result.type === "COLUMN") {
            const data = {
                old_id: result.source.index,
                new_id: result.destination.index,
                board: result.destination.droppableId,
            }

            await columnService.post(data, result.draggableId as number, 'update_order');
            if (columnService.isSuccess) eventEmitter.emit('reload');

        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='flex gap-3'>
                {board ? (
                    <Droppable droppableId={board.id.toString()} type="COLUMN" direction="horizontal">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className='flex gap-3'>
                                {board.columns.sort((a, b) => a.order > b.order ? 1 : -1).map((column, index) => (
                                    <Draggable key={column.id} draggableId={column.id.toString()} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <Column column={column} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                {board && (
                                    <Button className="h-fit w-max" color="purple" pill onClick={handleAddColumnClick}>
                                        <FaPlus className="w-5 h-5 mr-2" /> Add new column
                                    </Button>
                                )}
                            </div>
                        )}
                    </Droppable>
                ) : (
                    <span>No board selected.</span>
                )}
            </div>
        </DragDropContext>
    )
}

export default Board
