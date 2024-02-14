import React from 'react'

import { Modal, ModalContent, ModalClose, Button } from '@janhq/joi'

import { atom, useAtom } from 'jotai'

export const showDestNotEmptyConfirmAtom = atom(false)

type Props = {
  onUserConfirmed: () => void
}

const ModalChangeDestNotEmpty: React.FC<Props> = ({ onUserConfirmed }) => {
  const [show, setShow] = useAtom(showDestNotEmptyConfirmAtom)

  return (
    <Modal open={show} onOpenChange={setShow}>
      <ModalContent>
        <h6 className="block pr-8 leading-relaxed">
          This folder is not empty. Are you sure you want to relocate Jan Data
          Folder here?
        </h6>
        <p className="text-muted-foreground">
          You may accidentally delete your other personal data when uninstalling
          the app in the future. Are you sure you want to proceed with this
          folder? Please review your selection carefully.
        </p>

        <div className="flex gap-x-2">
          <ModalClose asChild onClick={() => setShow(false)}>
            <Button theme="secondary">Cancel</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button onClick={onUserConfirmed} autoFocus theme="destructive">
              Yes, Proceed
            </Button>
          </ModalClose>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default ModalChangeDestNotEmpty
