import React, { useCallback, useState } from 'react'

import {
  Modal,
  ModalContent,
  ModalClose,
  Button,
  Checkbox,
  Input,
} from '@janhq/joi'
import { atom, useAtom } from 'jotai'

import useFactoryReset from '@/hooks/useFactoryReset'

export const modalValidationAtom = atom(false)

const ModalConfirmReset = () => {
  const [modalValidation, setModalValidation] = useAtom(modalValidationAtom)
  const { resetAll, defaultJanDataFolder } = useFactoryReset()
  const [inputValue, setInputValue] = useState('')
  const [currentDirectoryChecked, setCurrentDirectoryChecked] = useState(true)
  const onFactoryResetClick = useCallback(
    () => resetAll(currentDirectoryChecked),
    [currentDirectoryChecked, resetAll]
  )

  return (
    <Modal
      open={modalValidation}
      onOpenChange={() => setModalValidation(false)}
    >
      <ModalContent>
        <h6 className="text-base font-semibold">
          Are you sure you want to reset to default settings?
        </h6>
        <p className="text-muted-foreground">
          It will reset the application to its original state, deleting all your
          usage data, including model customizations and conversation history.
          This action is irreversible.
        </p>
        <div>
          <p className="text-muted-foreground mb-2 mt-1">{`To confirm, please enter the word "RESET" below:`}</p>
          <Input
            placeholder='Enter "RESET"'
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="flex flex-shrink-0 items-start space-x-2">
          <Checkbox
            id="currentDirectory"
            checked={currentDirectoryChecked}
            onChange={(e) => setCurrentDirectoryChecked(e.target.checked)}
          />
          <div className="mt-0.5 flex flex-col">
            <label
              htmlFor="currentDirectory"
              className="cursor-pointer text-sm font-medium leading-none"
            >
              Keep the current app data location
            </label>
            <p className="mt-2 leading-relaxed">
              Otherwise it will reset back to its original location at:{' '}
              {/* TODO should be from system */}
              <span className="font-medium">{defaultJanDataFolder}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-x-2">
          <ModalClose asChild onClick={() => setModalValidation(false)}>
            <Button variant="outline">Cancel</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button
              autoFocus
              theme="destructive"
              disabled={inputValue !== 'RESET'}
              onClick={onFactoryResetClick}
            >
              Reset Now
            </Button>
          </ModalClose>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default ModalConfirmReset
