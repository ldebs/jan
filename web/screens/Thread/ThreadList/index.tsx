import { Fragment } from 'react'

import {
  ResizablePanel,
  ScrollArea,
  ScrollBar,
  useMediaQuery,
} from '@janhq/joi'

import { useAtomValue } from 'jotai'

import { twMerge } from 'tailwind-merge'

import BlankState from './BlankStateThread'

import CreateNewThread from './CreateNewThread'

import ThreadItem from './ThreadItem'
import styles from './threadList.module.scss'

import { threadsAtom } from '@/helpers/atoms/Thread.atom'

export default function ThreadList() {
  const threads = useAtomValue(threadsAtom)

  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <ResizablePanel
      minSize={16}
      maxSize={40}
      defaultSize={22}
      className={twMerge(isMobile && '!flex-auto', styles.threadList)}
    >
      <ScrollArea className={styles.listPanel}>
        <div className="p-4">
          {!threads.length ? (
            <Fragment>
              <CreateNewThread />
              <BlankState />
            </Fragment>
          ) : (
            <Fragment>
              <CreateNewThread />
              {threads.map((thread) => (
                <ThreadItem key={thread.id} thread={thread} />
              ))}
            </Fragment>
          )}
        </div>
        {isMobile && <ScrollBar orientation="horizontal" />}
      </ScrollArea>
    </ResizablePanel>
  )
}
