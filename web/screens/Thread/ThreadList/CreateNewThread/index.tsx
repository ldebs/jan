import { Button } from '@janhq/joi'
import { useAtomValue } from 'jotai'
import { PlusIcon } from 'lucide-react'

import { useCreateNewThread } from '@/hooks/useCreateNewThread'

import styles from './createNewThread.module.scss'

import { assistantsAtom } from '@/helpers/atoms/Assistant.atom'

const CreateNew = () => {
  const assistants = useAtomValue(assistantsAtom)
  const { requestCreateNewThread } = useCreateNewThread()
  const onCreateConversationClick = async () => {
    if (assistants.length === 0) {
      alert('No assistant available')
    } else {
      requestCreateNewThread(assistants[0])
    }
  }
  return (
    <div className={styles.createNewThread}>
      <Button
        size="small"
        variant="soft"
        onClick={onCreateConversationClick}
        block
      >
        <span className="mr-2">New Thread </span>
        <PlusIcon size={16} />
      </Button>
    </div>
  )
}

export default CreateNew
