import { useEffect, useState } from 'react';
import { Modal, TextInput, Label, Button, Textarea, Select } from 'flowbite-react'
import { useBoardActions, useBoardStore } from '@stores/boardStore';
import { TaskService } from '@components/services/taskService';
import { ApiUrls } from '@components/consts/apiURLs';
import eventEmitter from '@components/services/eventEmitter';
import { UserModel } from '@models/User';
import { useUserStore } from '@stores/userStore';

export function TaskModal() {
    const { user } = useUserStore()
    const { modals, users } = useBoardStore()
    const { setTaskModal } = useBoardActions()

    const taskService = new TaskService(ApiUrls.task, user.key);

    const [taskTitle, setTaskTitle] = useState(modals.task.task?.title);
    const [taskDescription, setTaskDescription] = useState(modals.task.task?.description);
    const [taskUser, setTaskUser] = useState(modals.task.task?.user);

    useEffect(() => {
        setTaskTitle(modals.task.task?.title);
        setTaskDescription(modals.task.task?.description);
        setTaskUser(modals.task.task?.user);
    }, [modals.task.show])

    const handleTitleChanged = (e) => {
        setTaskTitle(e.target.value);
    }

    const handleDescriptionChanged = (e) => {
        setTaskDescription(e.target.value);
    }

    const handleUserChanged = (e) => {
        setTaskUser(e.target.value);
    }

    const handleTaskSubmit = async (e) => {
        const data = {
            title: taskTitle,
            description: taskDescription,
            user: taskUser,
            column: modals.task.task?.column ?? modals.task.columnId,
        }

        if (modals.task.actionType === 'post') {
            await taskService.post(data);
        } else if (modals.task.actionType === 'put') {
            await taskService.put(data, modals.task.task?.id as number);
        }

        if (taskService.isSuccess) {
            setTaskModal(false);
            eventEmitter.emit('reload');
        }
    }

    return (
        <Modal show={modals.task.show} size="lg" onClose={() => setTaskModal(false)} dismissible className='bg-gray-dark'>
            <Modal.Header>
                {modals.task.task ? 'Edit task' : 'Add task'}
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleTaskSubmit}>
                    <div className="mb-2">
                        <Label htmlFor="taskName" value="Title" />
                    </div>
                    <TextInput value={taskTitle} onChange={handleTitleChanged} id="taskName" type="text" placeholder="Some exciting feature" required />
                    <div className="my-2">
                        <Label htmlFor="taskDescription" value="Description" />
                    </div>
                    <Textarea value={taskDescription} onChange={handleDescriptionChanged} id="taskDescription" placeholder="In this task we have to..." rows={4} />
                    <div className="my-2">
                        <Label htmlFor="taskUser" value="User" />
                    </div>
                    <Select value={taskUser} onChange={handleUserChanged} id="taskUser">
                        <option value="" selected disabled hidden>Choose a hero</option>
                        {
                            users.map((user: UserModel) => {
                                const userString = `${user.name} ${user.surname} (${user.email})`
                                return <option value={user.id} key={user.id}>{userString.trim()}</option>
                            })
                        }
                    </Select>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button color="success" onClick={handleTaskSubmit}>Save</Button>
                <Button color="gray" onClick={() => setTaskModal(false)}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
