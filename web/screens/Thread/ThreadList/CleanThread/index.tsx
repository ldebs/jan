import React, { useCallback } from 'react'

import {
  Button,
  Modal,
  ModalClose,
  ModalContent,
  ModalTrigger,
} from '@janhq/joi'
import { Paintbrush } from 'lucide-react'

import useDeleteThread from '@/hooks/useDeleteThread'

type Props = {
  threadId: string
}

const CleanThreadModal: React.FC<Props> = ({ threadId }) => {
  const { cleanThread } = useDeleteThread()
  const onCleanThreadClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation()
      cleanThread(threadId)
    },
    [cleanThread, threadId]
  )

  return (
    <Modal>
      <ModalTrigger asChild onClick={(e) => e.stopPropagation()}>
        <div className="hover:bg-secondary flex cursor-pointer items-center space-x-2 px-4 py-2">
          <Paintbrush size={16} className="text-muted-foreground" />
          <span className="text-bold dark:text-muted-foreground text-black">
            Clean thread
          </span>
        </div>
      </ModalTrigger>
      <ModalContent>
        <h6 className="text-base font-bold">Clean Thread</h6>
        <p>Are you sure you want to clean this thread?</p>
        <div className="flex gap-x-2">
          <ModalClose asChild onClick={(e) => e.stopPropagation()}>
            <Button theme="secondary">No</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button theme="destructive" onClick={onCleanThreadClick} autoFocus>
              Yes
            </Button>
          </ModalClose>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default React.memo(CleanThreadModal)
