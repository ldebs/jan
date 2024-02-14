import React from 'react'

import { Button } from '@janhq/joi'

import { CopyIcon, CheckIcon } from 'lucide-react'

import { useClipboard } from '@/hooks/useClipboard'

// TODO @Louis help add missing information device specs
const DeviceSpecs = () => {
  const userAgent = window.navigator.userAgent
  const clipboard = useClipboard({ timeout: 1000 })

  return (
    <>
      <div className="absolute -top-11 right-2">
        <Button
          themes="outline"
          className="dark:bg-secondary/50 bg-white"
          onClick={() => {
            clipboard.copy(userAgent ?? '')
          }}
        >
          <div className="flex items-center space-x-2">
            {clipboard.copied ? (
              <>
                <CheckIcon size={14} className="text-green-600" />
                <span>Copying...</span>
              </>
            ) : (
              <>
                <CopyIcon size={14} />
                <span>Copy All</span>
              </>
            )}
          </div>
        </Button>
      </div>
      <div>
        <p className="leading-relaxed">{userAgent}</p>
      </div>
    </>
  )
}

export default DeviceSpecs
