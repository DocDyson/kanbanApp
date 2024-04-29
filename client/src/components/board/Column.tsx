import React from 'react'
import { ColumnModel } from '@models/Column'
import Task from './Task'
import { HiDotsVertical } from 'react-icons/hi'
import { useBoardActions } from '@stores/boardStore'
import { Card, Dropdown, Button } from 'flowbite-react'
import { ColumnService } from '@components/services/columnService'
import { ApiUrls } from '@components/consts/apiURLs'
import eventEmitter from '@components/services/eventEmitter';
import { Droppable } from 'react-beautiful-dnd';
import { FaPlus } from "react-icons/fa6";
import { useUserStore } from '@stores/userStore'

type Props = {
    column: ColumnModel,
}

function BoardColumn({ column }: Props) {
    const { user } = useUserStore();
    const { setTaskModal, setColumnModal } = useBoardActions();

    const columnService = new ColumnService(ApiUrls.column, user.key);

    const handleAddTaskClick = () => {
        setTaskModal(true, 'post', column.id);
    }

    const handleEditColumnClick = () => {
        setColumnModal(true, column);
    }

    const handleRemoveColumnClick = async () => {
        await columnService.delete(column.id);
        eventEmitter.emit('reload')
    }

    return (
        <Card className='min-w-72 max-w-72 mb-5'>
            <div className='divide-y divide-solid divide-gray-medium divide-w-2'>
                <div className='flex justify-between items-center pb-2'>
                    <h3>{column.title}</h3>
                    <Dropdown label="" placement="bottom-start" renderTrigger={() => <div className="relative cursor-pointer"><HiDotsVertical className="w-5 h-5" /></div>}>
                        <Dropdown.Item onClick={handleEditColumnClick}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={handleRemoveColumnClick} className='!text-red-500'>Remove</Dropdown.Item>
                    </Dropdown>
                </div>
                <Droppable droppableId={column.id.toString()} type="TASK">
                    {(provided) => (
                        <div className='pt-4 flex flex-col gap-4' {...provided.dragHandleProps} {...provided.droppableProps} ref={provided.innerRef}>
                            {column.tasks.sort((a, b) => a.order > b.order ? 1 : -1).map((task, taskIndex) => (
                                <Task key={task.id} task={task} index={taskIndex} />
                            ))}
                            {provided.placeholder}
                            <Button onClick={handleAddTaskClick} pill color="purple">
                                <FaPlus className="w-5 h-5 mr-2" /> Add new task
                            </Button>
                        </div>
                    )}
                </Droppable>
            </div>
        </Card>
    );
}

export default BoardColumn
