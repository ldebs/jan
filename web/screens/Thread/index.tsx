/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect, useState } from 'react'

import { useDropzone } from 'react-dropzone'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  ScrollBar,
  useMediaQuery,
} from '@janhq/joi'
import { m } from 'framer-motion'
import { useAtomValue, useSetAtom } from 'jotai'

import { UploadCloudIcon } from 'lucide-react'

import { twMerge } from 'tailwind-merge'

import GenerateResponse from '@/containers/Loader/GenerateResponse'
import ModelReload from '@/containers/Loader/ModelReload'
import ModelStart from '@/containers/Loader/ModelStart'

import { fileUploadAtom } from '@/containers/Providers/Jotai'
import { showLeftSideBarAtom } from '@/containers/Providers/KeyListener'

import { snackbar } from '@/containers/Toast'

import { FeatureToggleContext } from '@/context/FeatureToggle'

import { activeModelAtom } from '@/hooks/useActiveModel'
import { queuedMessageAtom, reloadModelAtom } from '@/hooks/useSendChatMessage'

import ChatBody from '@/screens/Thread/ChatBody'

import ThreadList from '@/screens/Thread/ThreadList'

import ChatInput from './ChatInput'
import RequestDownloadModel from './RequestDownloadModel'
import ThreadSettings from './ThreadSettings'

import {
  activeThreadAtom,
  engineParamsUpdateAtom,
  isGeneratingResponseAtom,
} from '@/helpers/atoms/Thread.atom'

const renderError = (code: string) => {
  switch (code) {
    case 'multiple-upload':
      return 'Currently, we only support 1 attachment at the same time'

    case 'retrieval-off':
      return 'Turn on Retrieval in Assistant Settings to use this feature'

    case 'file-invalid-type':
      return 'We do not support this file type'

    default:
      return 'Oops, something error, please try again.'
  }
}

const ThreadScreen = () => {
  const activeThread = useAtomValue(activeThreadAtom)
  const showLeftSideBar = useAtomValue(showLeftSideBarAtom)
  const engineParamsUpdate = useAtomValue(engineParamsUpdateAtom)
  const [dragOver, setDragOver] = useState(false)

  const queuedMessage = useAtomValue(queuedMessageAtom)
  const reloadModel = useAtomValue(reloadModelAtom)
  const [dragRejected, setDragRejected] = useState({ code: '' })
  const setFileUpload = useSetAtom(fileUploadAtom)
  const { experimentalFeature } = useContext(FeatureToggleContext)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const activeModel = useAtomValue(activeModelAtom)

  const isGeneratingResponse = useAtomValue(isGeneratingResponseAtom)

  const { getRootProps, isDragReject } = useDropzone({
    noClick: true,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
    },

    onDragOver: (e) => {
      // Retrieval file drag and drop is experimental feature
      if (!experimentalFeature) return
      if (
        e.dataTransfer.items.length === 1 &&
        activeThread?.assistants[0].tools &&
        activeThread?.assistants[0].tools[0]?.enabled
      ) {
        setDragOver(true)
      } else if (
        activeThread?.assistants[0].tools &&
        !activeThread?.assistants[0].tools[0]?.enabled
      ) {
        setDragRejected({ code: 'retrieval-off' })
      } else {
        setDragRejected({ code: 'multiple-upload' })
      }
    },
    onDragLeave: () => setDragOver(false),
    onDrop: (files, rejectFiles) => {
      // Retrieval file drag and drop is experimental feature
      if (!experimentalFeature) return
      if (
        !files ||
        files.length !== 1 ||
        rejectFiles.length !== 0 ||
        (activeThread?.assistants[0].tools &&
          !activeThread?.assistants[0].tools[0]?.enabled)
      )
        return
      const imageType = files[0]?.type.includes('image')
      setFileUpload([{ file: files[0], type: imageType ? 'image' : 'pdf' }])
      setDragOver(false)
    },
    onDropRejected: (e) => {
      if (
        activeThread?.assistants[0].tools &&
        !activeThread?.assistants[0].tools[0]?.enabled
      ) {
        setDragRejected({ code: 'retrieval-off' })
      } else {
        setDragRejected({ code: e[0].errors[0].code })
      }
      setDragOver(false)
    },
  })

  useEffect(() => {
    if (dragRejected.code) {
      snackbar({
        description: renderError(dragRejected.code),
        type: 'error',
      })
    }
    setTimeout(() => {
      if (dragRejected.code) {
        setDragRejected({ code: '' })
      }
    }, 2000)
  }, [dragRejected.code])

  return (
    <div className="flex h-full w-full">
      <ResizablePanelGroup direction={isMobile ? 'vertical' : 'horizontal'}>
        {/* TODO Faisal check back showLeftSideBar */}
        {/* Left sidebar */}
        <ThreadList />

        <ResizableHandle disabled={isMobile} />

        <ResizablePanel minSize={40}>
          <ScrollArea className="h-full w-full">
            <div className="px-4 pb-4 pt-2 md:px-6 md:pt-4">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nostrum, optio eaque quos facilis quod et sapiente iste suscipit
                ipsum ducimus provident minus nisi tempore rem reprehenderit,
                distinctio cupiditate iure. Placeat.
              </p>
            </div>
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle disabled={isMobile} />

        {/* Right side bar */}
        {/* TODO Faisal check back showRightSideBar */}
        {/* Right / Setting sidebar */}
        {activeThread && <ThreadSettings />}
      </ResizablePanelGroup>

      {/* <div
        className="bg-background relative flex h-full w-full flex-col overflow-auto outline-none"
        {...getRootProps()}
      >
        {dragOver && (
          <div className="bg-background/50 absolute z-50 mx-auto h-full w-full p-8 backdrop-blur-lg">
            <div
              className={twMerge(
                'flex h-full w-full items-center justify-center rounded-lg border border-dashed border-blue-500',
                isDragReject && 'border-red-500'
              )}
            >
              <div className="mx-auto w-1/2 text-center">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-200">
                  <UploadCloudIcon size={24} className="text-blue-600" />
                </div>
                <div className="mt-4 text-blue-600">
                  <h6 className="font-bold">
                    {isDragReject
                      ? 'Currently, we only support 1 attachment at the same time with PDF format'
                      : 'Drop file here'}
                  </h6>
                  {!isDragReject && <p className="mt-2">(PDF)</p>}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex h-full w-full flex-col justify-between">
          {activeThread ? (
            <div className="flex h-full w-full overflow-y-auto overflow-x-hidden">
              <ChatBody />
            </div>
          ) : (
            <RequestDownloadModel />
          )}

          {!engineParamsUpdate && <ModelStart />}

          {reloadModel && (
            <>
              <ModelReload />
              <div className="mb-2 text-center">
                <span className="text-muted-foreground">
                  Model is reloading to apply new changes.
                </span>
              </div>
            </>
          )}

          {queuedMessage && !reloadModel && (
            <div className="mb-2 text-center">
              <span className="text-muted-foreground">
                Message queued. It can be sent once the model has started
              </span>
            </div>
          )}

          {activeModel && isGeneratingResponse && <GenerateResponse />}
          <ChatInput />
        </div>
      </div> */}
    </div>
  )
}

export default ThreadScreen
