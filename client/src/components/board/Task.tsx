import { TaskModel } from '@models/Task'
import React, { useEffect, useState } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import { Dropdown, Avatar, Card } from 'flowbite-react';
import { useBoardActions, useBoardStore } from '@stores/boardStore';
import { TaskService } from '@components/services/taskService';
import { ApiUrls } from '@components/consts/apiURLs';
import eventEmitter from '@components/services/eventEmitter';
import { UserModel } from '@models/User';
import { FaRegCommentDots } from "react-icons/fa6";
import { Draggable } from 'react-beautiful-dnd';
import { useUserStore } from '@stores/userStore';


type Props = {
    task: TaskModel;
    index: number;
}

function Task({ task, index }: Props) {
    const { user } = useUserStore();
    const { users } = useBoardStore();
    const { setTaskModal, setCommentsModal } = useBoardActions();

    const [assignedUser, setAssignedUser] = useState(new UserModel());

    useEffect(() => {
        setAssignedUser(getUser());
    }, [users])

    const taskService = new TaskService(ApiUrls.task, user.key);

    const handleEditTaskClick = () => {
        setTaskModal(true, 'put', null, task);
    }

    const handleShowComments = () => {
        setCommentsModal(true, task.id, task.comments);
    }

    const handleRemoveTaskClick = async () => {
        await taskService.delete(task.id);
        eventEmitter.emit('reload');
    }

    const getUser = () => {
        return users.filter((user: UserModel) => user.id === task.user)?.[0] ?? new UserModel();
    }

    const getUserName = () => {
        if (!assignedUser) return 'No user assigned'
        return `${assignedUser.name} ${assignedUser.surname}`
    }

    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Card>
                        <div className='flex justify-between items-center relative'>
                            <span className='font-medium'>
                                {task.title}
                            </span>
                            <Dropdown label="" placement="bottom-start" renderTrigger={() => <div className="relative cursor-pointer"><HiDotsVertical className="w-5 h-5" /></div>}>
                                <Dropdown.Item onClick={handleEditTaskClick}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={handleRemoveTaskClick} className='!text-red-600'>Remove</Dropdown.Item>
                            </Dropdown>
                        </div>
                        {task.description && (
                            <div className='text-gray-medium text-sm mt-1'>
                                {task.description}
                            </div>
                        )}
                        <div className='flex items-center gap-2'>
                            <Avatar img={assignedUser.avatar} size="xs" bordered={!!assignedUser.avatar} color="purple" rounded />
                            <span className="text-gray-medium text-sm"> {getUserName()} </span>
                            <div className='ml-auto flex items-center gap-1 w-fit hover:text-purple-400 cursor-pointer' onClick={handleShowComments}>
                                <FaRegCommentDots />
                                {task.comments?.length > 0 && <span className='text-sm'>{task.comments?.length}</span>}
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </Draggable>
    );
}

export default Task;
