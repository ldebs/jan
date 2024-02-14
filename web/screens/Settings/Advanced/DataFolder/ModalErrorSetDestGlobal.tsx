import React from 'react'

import { Modal, ModalContent, ModalClose, Button } from '@janhq/joi'
import { atom, useAtom } from 'jotai'

export const showChangeFolderErrorAtom = atom(false)

const ModalErrorSetDestGlobal = () => {
  const [show, setShow] = useAtom(showChangeFolderErrorAtom)
  return (
    <Modal open={show} onOpenChange={setShow}>
      <ModalContent>
        <h6 className="text-base font-semibold">Error Occurred</h6>
        <p className="text-muted-foreground">
          Oops! Something went wrong. Jan data folder remains the same. Please
          try again.
        </p>
        <div className="flex gap-x-2">
          <ModalClose asChild onClick={() => setShow(false)}>
            <Button theme="destructive">Got it</Button>
          </ModalClose>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default ModalErrorSetDestGlobal
