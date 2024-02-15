import { useState } from 'react'

import { InferenceEngine, Model } from '@janhq/core'

import { Badge, Tooltip } from '@janhq/joi'

import { useAtom } from 'jotai'
import {
  MoreVerticalIcon,
  Trash2Icon,
  PlayIcon,
  StopCircleIcon,
} from 'lucide-react'

import { twMerge } from 'tailwind-merge'

import { useActiveModel } from '@/hooks/useActiveModel'
import { useClickOutside } from '@/hooks/useClickOutside'

import useDeleteModel from '@/hooks/useDeleteModel'

import { toGibibytes } from '@/utils/converter'

import { serverEnabledAtom } from '@/helpers/atoms/LocalServer.atom'

type RowModelProps = {
  data: Model
}

export default function RowModel(props: RowModelProps) {
  const [more, setMore] = useState(false)

  const [menu, setMenu] = useState<HTMLDivElement | null>(null)
  const [toggle, setToggle] = useState<HTMLDivElement | null>(null)
  useClickOutside(() => setMore(false), null, [menu, toggle])

  const { activeModel, startModel, stopModel, stateModel } = useActiveModel()
  const { deleteModel } = useDeleteModel()

  const isActiveModel = stateModel.model === props.data.id

  const [serverEnabled, setServerEnabled] = useAtom(serverEnabledAtom)

  const isRemoteModel =
    props.data.engine === InferenceEngine.openai ||
    props.data.engine === InferenceEngine.triton_trtllm

  const onModelActionClick = (modelId: string) => {
    if (activeModel && activeModel.id === modelId) {
      stopModel()
      window.core?.api?.stopServer()
      setServerEnabled(false)
    } else if (!serverEnabled) {
      startModel(modelId)
    }
  }

  return (
    <tr className="border-border relative border-b last:border-none">
      <td className="px-6 py-4 font-bold">{props.data.name}</td>
      <td className="px-6 py-4 font-bold">{props.data.id}</td>
      <td className="px-6 py-4">
        <Badge theme="secondary">
          {props.data.metadata.size
            ? toGibibytes(props.data.metadata.size)
            : '-'}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <Badge theme="secondary">v{props.data.version}</Badge>
      </td>
      <td className="px-6 py-4">
        {isRemoteModel ? (
          <Badge theme="success" className="inline-flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span>Active</span>
          </Badge>
        ) : stateModel.loading && stateModel.model === props.data.id ? (
          <Badge
            className="inline-flex items-center space-x-2"
            theme="secondary"
          >
            <span className="h-2 w-2 rounded-full bg-gray-500" />
            <span className="capitalize">
              {stateModel.state === 'start' ? 'Starting...' : 'Stopping...'}
            </span>
          </Badge>
        ) : activeModel && activeModel.id === props.data.id ? (
          <Badge theme="success" className="inline-flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span>Active</span>
          </Badge>
        ) : (
          <Badge
            theme="secondary"
            className="inline-flex items-center space-x-2"
          >
            <span className="h-2 w-2 rounded-full bg-gray-500" />
            <span>Inactive</span>
          </Badge>
        )}
      </td>
      <td className="px-6 py-4 text-center">
        {!isRemoteModel && (
          <div
            className="cursor-pointer"
            ref={setToggle}
            onClick={() => {
              setMore(!more)
            }}
          >
            <MoreVerticalIcon className="h-5 w-5" />
          </div>
        )}
        {more && (
          <div
            className="border-border bg-background absolute right-4 top-10 z-20 w-52 overflow-hidden rounded-lg border py-2 shadow-lg"
            ref={setMenu}
          >
            <Tooltip
              trigger={
                <div
                  className={twMerge(
                    'hover:bg-secondary flex items-center space-x-2 px-4 py-2',
                    serverEnabled &&
                      activeModel &&
                      activeModel.id !== props.data.id &&
                      'pointer-events-none cursor-not-allowed opacity-40'
                  )}
                  onClick={() => {
                    onModelActionClick(props.data.id)
                    setMore(false)
                  }}
                >
                  {activeModel && activeModel.id === props.data.id ? (
                    <StopCircleIcon
                      size={16}
                      className="text-muted-foreground"
                    />
                  ) : (
                    <PlayIcon size={16} className="text-muted-foreground" />
                  )}
                  <span className="text-bold dark:text-muted-foreground capitalize text-black">
                    {isActiveModel ? stateModel.state : 'Start'}
                    &nbsp;Model
                  </span>
                </div>
              }
              content={
                serverEnabled && (
                  <span>
                    {activeModel && activeModel.id === props.data.id
                      ? 'The API server is running, change model will stop the server'
                      : 'Threads are disabled while the server is running'}
                  </span>
                )
              }
            />

            <div
              className={twMerge(
                'hover:bg-secondary flex cursor-pointer items-center space-x-2 px-4 py-2',
                serverEnabled &&
                  'pointer-events-none cursor-not-allowed opacity-40'
              )}
              onClick={() => {
                setTimeout(async () => {
                  if (!serverEnabled) {
                    await stopModel()
                    deleteModel(props.data)
                  }
                }, 500)
                setMore(false)
              }}
            >
              <Trash2Icon size={16} className="text-muted-foreground" />
              <span className="text-bold dark:text-muted-foreground text-black">
                Delete Model
              </span>
            </div>
          </div>
        )}
      </td>
    </tr>
  )
}
