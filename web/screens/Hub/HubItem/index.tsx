import { forwardRef, memo, useCallback, useState } from 'react'

import { Model } from '@janhq/core'

// import ModalHubItem from '../ModalHubItem'

import { Modal } from '@janhq/joi'

import HubHeaderItem from './HubHeaderItem'

import styles from './hubItem.module.scss'

type Props = {
  model: Model
}

const HubItem = forwardRef<HTMLDivElement, Props>(({ model }, ref) => {
  const [showModalDetailItem, setShowModalDetailItem] = useState('')
  const [test, setTest] = useState(false)

  const handelShowModalDetailItem = () => {
    if (showModalDetailItem === model.id) {
      setShowModalDetailItem('')
      setTest(false)
    } else {
      setShowModalDetailItem(model.id)
      setTest(true)
    }
  }

  return (
    <div
      ref={ref}
      className={styles.hubItem}
      onClick={handelShowModalDetailItem}
    >
      {model.metadata.cover && (
        <div className="relative h-full w-full ">
          <img
            src={model.metadata.cover}
            className="h-[240px] w-full object-cover"
            alt={`Cover - ${model.id}`}
          />
        </div>
      )}
      <div className="p-4 md:p-6">
        <HubHeaderItem model={model} />
        <p className={styles.description}>{model.description}</p>
      </div>

      {/* Showing detail model as a modal */}
      {/* <ModalHubItem model={model} open={test} /> */}
    </div>
  )
})

export default memo(HubItem)
