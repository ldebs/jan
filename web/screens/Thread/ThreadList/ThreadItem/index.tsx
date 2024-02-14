import { memo, useCallback } from 'react'

import { Thread } from '@janhq/core'
import { m } from 'framer-motion'
import { useAtomValue } from 'jotai'
import { MoreVerticalIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import useSetActiveThread from '@/hooks/useSetActiveThread'

import { displayDate } from '@/utils/datetime'

import CleanThreadModal from '../CleanThread'
import DeleteThreadModal from '../DeleteThread'

import styles from './threadItem.module.scss'

import {
  getActiveThreadIdAtom,
  threadStatesAtom,
} from '@/helpers/atoms/Thread.atom'

type Props = {
  thread: Thread
}

const ThreadItem = ({ thread }: Props) => {
  const threadStates = useAtomValue(threadStatesAtom)
  const activeThreadId = useAtomValue(getActiveThreadIdAtom)
  const { setActiveThread } = useSetActiveThread()
  const onThreadClick = useCallback(
    (thread: Thread) => {
      setActiveThread(thread)
    },
    [setActiveThread]
  )

  return (
    <div
      key={thread.id}
      className={twMerge(
        `group/message relative mb-1 flex cursor-pointer flex-col rounded-lg transition-all`,
        styles.threadItem
      )}
      onClick={() => {
        onThreadClick(thread)
      }}
    >
      <div className="relative z-10 p-4 py-4">
        <p className="line-clamp-1 text-xs leading-5">
          {thread.updated && displayDate(thread.updated)}
        </p>
        <h2 className="line-clamp-1 font-bold">{thread.title}</h2>
        <p className="mt-1 line-clamp-1 text-xs group-hover/message:max-w-[160px] ">
          {threadStates[thread.id]?.lastMessage
            ? threadStates[thread.id]?.lastMessage
            : 'No new message'}
        </p>
      </div>
      {/* <div
        className={twMerge(
          `group/icon invisible absolute bottom-2 right-2 z-20 rounded-lg p-1  group-hover/message:visible`
        )}
      >
        <MoreVerticalIcon />
        <div className="border-border  invisible absolute right-0 z-20 w-40 overflow-hidden rounded-lg border shadow-lg group-hover/icon:visible">
          <CleanThreadModal threadId={thread.id} />
          <DeleteThreadModal threadId={thread.id} />
        </div>
      </div> */}
      {activeThreadId === thread.id && (
        <m.div
          className="dark:bg-secondary/50 absolute inset-0 left-0 h-full w-full rounded-lg p-4"
          layoutId="active-thread"
        />
      )}
    </div>
  )
}

export default memo(ThreadItem)
