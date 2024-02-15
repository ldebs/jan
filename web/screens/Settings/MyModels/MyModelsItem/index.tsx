import { memo } from 'react'

import { InferenceEngine, Model } from '@janhq/core'

import styles from './myModelsItem.module.scss'

type Props = {
  model: Model
}

const ModelsItem = ({ model }: Props) => {
  return (
    <div className={styles.myModelsItem}>
      <div className="flex justify-between items-center">
        <h6 className="text-base font-semibold">{model.name}</h6>
      </div>
    </div>
  )
}

export default memo(ModelsItem)
