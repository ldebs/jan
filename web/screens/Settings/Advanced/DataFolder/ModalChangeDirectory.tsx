import React from 'react'

import { Modal, ModalContent, ModalClose, Button } from '@janhq/joi'

import { atom, useAtom } from 'jotai'

export const showDirectoryConfirmModalAtom = atom(false)

type Props = {
  destinationPath: string
  onUserConfirmed: () => void
}

const ModalChangeDirectory: React.FC<Props> = ({
  destinationPath,
  onUserConfirmed,
}) => {
  const [show, setShow] = useAtom(showDirectoryConfirmModalAtom)

  return (
    <Modal open={show} onOpenChange={setShow}>
      <ModalContent>
        <h6 className="text-base font-semibold">Relocate Jan Data Folder</h6>
        <p className="text-muted-foreground">
          Are you sure you want to relocate Jan data folder to{' '}
          <span className="text-foreground font-medium">{destinationPath}</span>
          ? A restart will be required afterward.
        </p>
        <div className="flex gap-x-2">
          <ModalClose asChild onClick={() => setShow(false)}>
            <Button theme="secondary">Cancel</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button onClick={onUserConfirmed} autoFocus>
              Yes, Proceed
            </Button>
          </ModalClose>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default ModalChangeDirectory
