import { useState } from 'react';
import { Modal, TextInput, Button, Card, Avatar } from 'flowbite-react'
import { useBoardActions, useBoardStore } from '@stores/boardStore';
import { CommentsService } from '@components/services/commentsService';
import { ApiUrls } from '@components/consts/apiURLs';
import eventEmitter from '@components/services/eventEmitter';
import { FaPaperPlane } from "react-icons/fa";
import { useUserStore } from '@stores/userStore';
import { FaRegTrashAlt } from "react-icons/fa";
import { CommentModel } from '@models/Comment';

export function CommentModal() {
    const { modals } = useBoardStore()
    const { user } = useUserStore()
    const { setCommentsModal } = useBoardActions()

    const commentsService = new CommentsService(ApiUrls.comments, user.key);

    const [comment, setComment] = useState('')

    const handleCommentChanged = (e) => {
        setComment(e.target.value);
    }

    const handleCommentSubmit = async () => {
        const data = {
            text: comment,
            task: modals.comments.taskId,
        }

        await commentsService.post(data,);

        if (commentsService.isSuccess) {
            setComment('');
            eventEmitter.emit('reload');
            const comments = modals.comments.comments
            comments?.push(commentsService.parsedData)
            setCommentsModal(true, modals.comments.taskId, comments)
        }
    }

    const handleCommentDelete = async (id: number): Promise<any> => {
        await commentsService.delete(id);
        const comments = modals.comments.comments;
        const deletedComment = comments.filter((comment: CommentModel) => comment.id === id)[0];
        comments.splice(comments.indexOf(deletedComment), 1);
        setCommentsModal(true, modals.comments.taskId, comments);
        eventEmitter.emit('reload');
    }

    return (
        <Modal show={modals.comments.show} size="2xl" onClose={() => setCommentsModal(false)} dismissible className='bg-gray-dark'>
            <Modal.Header>
                Comments on task #{modals.comments.taskId}
            </Modal.Header>
            <Modal.Body>
                {modals.comments.comments?.length === 0 && (
                    <p className='text-gray-medium text-center text-sm'>No comments yet</p>
                )}
                {modals.comments.comments?.map((comment) =>
                    <Card key={comment.id}>
                        <div className='flex'>
                            <span className='flex-1'>{comment.text}</span>
                            { comment.author.id === user.id &&
                                <Button size='xs' className='flex-none w-fit h-fit' onClick={() => handleCommentDelete(comment.id)}>
                                    <FaRegTrashAlt className='w-4 h-4 text-red-500 cursor-pointer items-start' />
                                </Button>
                            }
                        </div>
                        <div className='flex justify-between'>
                            <span className='flex gap-2'>
                                <Avatar img={comment.author.avatar} bordered={!!comment.author.avatar} color="purple" size="xs" rounded />
                                <span className="text-gray-medium text-sm"> {comment.author.name} {comment.author.surname} </span>
                            </span>
                        </div>
                    </Card>
                )}
            </Modal.Body>
            <Modal.Footer className='flex items-center'>
                <form className='flex gap-2 flex-1'>
                    <TextInput value={comment} onChange={handleCommentChanged} color="gray" className='flex-1' placeholder='I think we should...' required />
                    <Button color='purple' onClick={handleCommentSubmit}><FaPaperPlane /></Button>
                </form>
            </Modal.Footer>
        </Modal>
    )
}
