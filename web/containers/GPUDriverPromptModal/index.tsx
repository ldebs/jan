import React from 'react'

import { openExternalUrl } from '@janhq/core'

import { ModalClose, ModalContent, Modal, Button } from '@janhq/joi'

import { useAtom } from 'jotai'

import { isShowNotificationAtom, useSettings } from '@/hooks/useSettings'

const GPUDriverPrompt: React.FC = () => {
  const [showNotification, setShowNotification] = useAtom(
    isShowNotificationAtom
  )

  const { saveSettings } = useSettings()
  const onDoNotShowAgainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = !e.target.checked
    saveSettings({ notify: isChecked })
  }

  const openChanged = () => {
    setShowNotification(false)
  }

  return (
    <div>
      <Modal open={showNotification} onOpenChange={openChanged}>
        <ModalContent>
          <h6 className="text-base font-semibold">
            Checking for machine that does not meet the requirements.
          </h6>
          <p>
            It appears that you are missing some dependencies required to run in
            GPU mode. Please follow the instructions below for more details{' '}
            <span
              className="cursor-pointer text-blue-600"
              onClick={() =>
                openExternalUrl(
                  'https://jan.ai/guides/troubleshooting/gpu-not-used/'
                )
              }
            >
              Jan is Not Using GPU
            </span>{' '}
            .
          </p>
          <div className="flex items-center space-x-2">
            <input
              id="default-checkbox"
              type="checkbox"
              onChange={onDoNotShowAgainChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <span>Don&apos;t show again</span>
          </div>
          <ModalClose asChild>
            <Button theme="secondary">OK</Button>
          </ModalClose>
        </ModalContent>
      </Modal>
    </div>
  )
}
export default GPUDriverPrompt
