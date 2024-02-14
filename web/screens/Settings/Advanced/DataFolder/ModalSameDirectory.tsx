import React from 'react'

import { Modal, ModalContent, ModalClose, Button } from '@janhq/joi'

import { atom, useAtom } from 'jotai'

export const showSamePathModalAtom = atom(false)

type Props = {
  onChangeFolderClick: () => void
}

const ModalSameDirectory = ({ onChangeFolderClick }: Props) => {
  const [show, setShow] = useAtom(showSamePathModalAtom)

  return (
    <Modal open={show} onOpenChange={setShow}>
      <ModalContent>
        <h6 className="text-base font-semibold">Unable to move files</h6>
        <p className="text-muted-foreground">
          {`It seems like the folder you've chosen same with current directory`}
        </p>

        <div className="flex gap-x-2">
          <ModalClose asChild onClick={() => setShow(false)}>
            <Button theme="secondary">Cancel</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button
              theme="destructive"
              onClick={() => {
                setShow(false)
                onChangeFolderClick()
              }}
              autoFocus
            >
              Choose a different folder
            </Button>
          </ModalClose>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default ModalSameDirectory
