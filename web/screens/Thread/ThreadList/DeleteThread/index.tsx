import { memo, useCallback, MouseEvent } from 'react'

import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalClose,
  Button,
} from '@janhq/joi'
import { Trash2Icon } from 'lucide-react'

import useDeleteThread from '@/hooks/useDeleteThread'

type Props = {
  threadId: string
}

const DeleteThread = ({ threadId }: Props) => {
  const { deleteThread } = useDeleteThread()
  const onDeleteThreadClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      deleteThread(threadId)
    },
    [deleteThread, threadId]
  )

  return (
    <Modal>
      <ModalTrigger asChild onClick={(e) => e.stopPropagation()}>
        <div className="hover:bg-secondary flex cursor-pointer items-center space-x-2 px-4 py-2">
          <Trash2Icon size={16} className="text-red-600 dark:text-red-300" />
          <span className="text-bold text-red-600 dark:text-red-300">
            Delete thread
          </span>
        </div>
      </ModalTrigger>
      <ModalContent>
        <h6 className="text-base font-semibold">Delete Thread</h6>
        <p>
          Are you sure you want to delete this thread? This action cannot be
          undone.
        </p>
        <div className="flex gap-x-2">
          <ModalClose asChild onClick={(e) => e.stopPropagation()}>
            <Button theme="secondary">No</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button autoFocus theme="destructive" onClick={onDeleteThreadClick}>
              Yes
            </Button>
          </ModalClose>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default memo(DeleteThread)
