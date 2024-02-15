import { memo } from 'react'

import { Model } from '@janhq/core'

import HubItem from '../HubItem'

type Props = {
  models: Model[]
}

const HubList = ({ models }: Props) => {
  const takenModelIds: string[] = []
  const featuredModels = models
    .filter((m) => {
      if (m.metadata?.tags?.includes('Featured')) {
        takenModelIds.push(m.id)
        return m
      }
    })
    .sort((m1, m2) => m1.metadata.size - m2.metadata.size)

  const recommendedModels = models
    .filter((m) => {
      if (m.metadata?.tags?.includes('Recommended')) {
        takenModelIds.push(m.id)
        return m
      }
    })
    .sort((m1, m2) => m1.metadata.size - m2.metadata.size)

  const openAiModels = models
    .filter((m) => {
      if (m.engine === 'openai') {
        takenModelIds.push(m.id)
        return m
      }
    })
    .sort((m1: Model, m2: Model) => m1.name.localeCompare(m2.name))

  const remainingModels = models
    .filter((m) => !takenModelIds.includes(m.id))
    .sort((m1, m2) => m1.metadata.size - m2.metadata.size)

  const sortedModels: Model[] = [
    ...featuredModels,
    ...recommendedModels,
    ...openAiModels,
    ...remainingModels,
  ]

  return (
    <div className="relative mx-auto h-full w-full px-4 md:w-4/5">
      <div className="my-8">
        <h1 className="text-lg font-semibold">All Model</h1>
      </div>
      {sortedModels?.map((model) => <HubItem key={model.id} model={model} />)}
    </div>
  )
}

export default memo(HubList)
