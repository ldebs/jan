import { Fragment } from 'react'

import { InferenceEngine } from '@janhq/core'
import { Input, useDebouncedState } from '@janhq/joi'

import { useAtomValue } from 'jotai'
import { SearchIcon } from 'lucide-react'

import MyModelsItem from './MyModelsItem'

import { downloadedModelsAtom } from '@/helpers/atoms/Model.atom'

export default function MyModels() {
  const downloadedModels = useAtomValue(downloadedModelsAtom)
  const [searchValue, setsearchValue] = useDebouncedState('', 400)

  const nitoModels = downloadedModels.filter((m) => {
    return m.engine === InferenceEngine.nitro
  })

  const openAiModels = downloadedModels.filter((m) => {
    return m.engine === InferenceEngine.openai
  })

  const sortedNitoModels = nitoModels.filter((model) => {
    return model.name?.toLowerCase().includes(searchValue.toLowerCase())
  })

  const sortedOpenAiModels = openAiModels.filter((model) => {
    return model.name?.toLowerCase().includes(searchValue.toLowerCase())
  })

  return (
    <Fragment>
      <div className="w-full md:w-1/2 mb-6">
        <Input
          prefixIcon={<SearchIcon size={16} />}
          placeholder="Search models"
          onChange={(e) => {
            setsearchValue(e.target.value)
          }}
        />
      </div>
      <div>
        {sortedNitoModels.map((model) => {
          return <MyModelsItem key={model.id} model={model} />
        })}

        {/* <div>
          {Boolean(sortedOpenAiModels.length) && (
            <h6 className="text-base font-semibold mb-4">Open AI</h6>
          )}
          {sortedOpenAiModels.map((model) => {
            return <MyModelsItem key={model.id} model={model} />
          })}
        </div> */}
      </div>
    </Fragment>
  )
}
