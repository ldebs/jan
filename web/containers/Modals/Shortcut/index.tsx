import React from 'react'

import { Button, Modal, ModalTrigger, ModalContent } from '@janhq/joi'

const availableShortcuts = [
  {
    combination: 'E',
    modifierKeys: [isMac ? '⌘' : 'Ctrl'],
    description: 'Show list your models',
  },
  {
    combination: 'K',
    modifierKeys: [isMac ? '⌘' : 'Ctrl'],
    description: 'Show list navigation pages',
  },
  {
    combination: 'B',
    modifierKeys: [isMac ? '⌘' : 'Ctrl'],
    description: 'Toggle collapsible left panel',
  },
  {
    combination: ',',
    modifierKeys: [isMac ? '⌘' : 'Ctrl'],
    description: 'Navigate to setting page',
  },
  {
    combination: 'Enter',
    description: 'Send a message',
  },
  {
    combination: 'Shift + Enter',
    description: 'Insert new line in input box',
  },
  {
    combination: 'Arrow Up',
    description: 'Navigate to previous option (within search dialog)',
  },
  {
    combination: 'Arrow Down',
    description: 'Navigate to next option (within search dialog)',
  },
]

const ShortcutModal: React.FC = () => (
  <Modal>
    <ModalTrigger>
      <Button size="small" theme="primary" variant="soft" asChild>
        <div>Show</div>
      </Button>
    </ModalTrigger>
    <ModalContent className="max-w-2xl">
      <h6 className="text-base font-semibold">Keyboard Shortcuts</h6>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex w-full gap-4">
          <div className="w-1/2 py-2">
            <h6 className="font-semibold">Combination</h6>
          </div>
          <div className="w-full py-2">
            <h6 className="font-semibold">Description</h6>
          </div>
        </div>
        {availableShortcuts.map((shortcut) => {
          return (
            <div key={shortcut.combination} className="flex w-full gap-4 pb-2">
              <div className="w-1/2 py-2">
                <div className="font-bold">
                  <p>{`${shortcut.modifierKeys?.[0] ?? ''} ${
                    shortcut.combination
                  }`}</p>
                </div>
              </div>
              <div className="w-full py-2">
                <p>{shortcut.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </ModalContent>
  </Modal>
)

export default ShortcutModal
