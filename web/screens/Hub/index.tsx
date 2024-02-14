import { useState } from 'react'

import { Input, Button, useDebouncedState, ScrollArea } from '@janhq/joi'

import { useAtomValue } from 'jotai'
import { SearchIcon, Settings2Icon } from 'lucide-react'

import { twMerge } from 'tailwind-merge'

import HubList from './HubList'
import styles from './hub.module.scss'

import {
  configuredModelsAtom,
  downloadedModelsAtom,
} from '@/helpers/atoms/Model.atom'

export default function HubScreen() {
  const [searchValue, setsearchValue] = useDebouncedState('', 400)
  const configuredModels = useAtomValue(configuredModelsAtom)
  const downloadedModels = useAtomValue(downloadedModelsAtom)
  // const [showFilter, setShowFilter] = useState(false)
  const sortMenu = ['All Models', 'Recommended', 'Downloaded']
  const [sortSelected, setSortSelected] = useState('All Models')

  const filteredModels = configuredModels.filter((x) => {
    if (sortSelected === 'Downloaded') {
      return (
        x.name.toLowerCase().includes(searchValue.toLowerCase()) &&
        downloadedModels.some((y) => y.id === x.id)
      )
    } else if (sortSelected === 'Recommended') {
      return (
        x.name.toLowerCase().includes(searchValue.toLowerCase()) &&
        x.metadata.tags.includes('Featured')
      )
    } else {
      return x.name.toLowerCase().includes(searchValue.toLowerCase())
    }
  })

  return (
    <div className={styles.hub}>
      <div className={styles.hubContent}>
        <div className={styles.hubHeader}>
          <div
            className={twMerge(
              'mx-auto flex h-full flex-col items-center justify-center px-4 md:w-1/2'
              // showFilter && 'md:w-full lg:w-1/2'
            )}
          >
            <h1 className="mb-4 text-2xl font-bold">Discover models</h1>
            <div className="flex w-full flex-col items-center justify-center">
              <div className="flex w-full gap-x-2">
                <Input
                  prefixIcon={<SearchIcon size={16} />}
                  placeholder="Search models"
                  onChange={(e) => {
                    setsearchValue(e.target.value)
                  }}
                />
                {/* Temporary disable hub filter sidebar, will implement next feature revamp */}
                {/* <Button
                  theme="secondary"
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <Settings2Icon size={16} />
                </Button> */}
              </div>
              <div className="mt-4">
                <Button size="small" variant="outline" asChild>
                  <a
                    href="https://jan.ai/guides/using-models/import-manually/"
                    target="_blank"
                  >
                    How to manually import models
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[calc(100%-200px)]">
          <ScrollArea className="h-full">
            <HubList models={filteredModels} />
          </ScrollArea>
        </div>
      </div>

      {/* TODO Faisal do when hub revamp */}
      {/* Filter sidebar will be here */}
      {/* <div
        className={twMerge(
          styles.hubFilter
          showFilter && styles.isShow
        )}
      ></div> */}
    </div>
  )
}
