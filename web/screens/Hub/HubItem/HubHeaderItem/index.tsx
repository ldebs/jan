/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useMemo } from 'react'

import { Model } from '@janhq/core'
import { Tooltip, Badge, Button } from '@janhq/joi'

import { atom, useAtomValue } from 'jotai'

import ModalCancelDownload from '@/containers/ModalCancelDownload'

import { MainViewState } from '@/constants/screens'

import { useCreateNewThread } from '@/hooks/useCreateNewThread'
import useDownloadModel from '@/hooks/useDownloadModel'

import { modelDownloadStateAtom } from '@/hooks/useDownloadState'

import { useMainViewState } from '@/hooks/useMainViewState'

import { toGibibytes } from '@/utils/converter'

import styles from '../hubItem.module.scss'

import { assistantsAtom } from '@/helpers/atoms/Assistant.atom'
import { serverEnabledAtom } from '@/helpers/atoms/LocalServer.atom'

import { downloadedModelsAtom } from '@/helpers/atoms/Model.atom'
import {
  nvidiaTotalVramAtom,
  totalRamAtom,
} from '@/helpers/atoms/SystemBar.atom'

type Props = {
  model: Model
  onClick: () => void
  open: string
}

const HubHeaderItem: React.FC<Props> = ({ model, onClick, open }) => {
  const { downloadModel } = useDownloadModel()
  const downloadedModels = useAtomValue(downloadedModelsAtom)
  const { requestCreateNewThread } = useCreateNewThread()
  const totalRam = useAtomValue(totalRamAtom)
  const nvidiaTotalVram = useAtomValue(nvidiaTotalVramAtom)
  // Default nvidia returns vram in MB, need to convert to bytes to match the unit of totalRamW
  let ram = nvidiaTotalVram * 1024 * 1024
  if (ram === 0) {
    ram = totalRam
  }
  const serverEnabled = useAtomValue(serverEnabledAtom)
  const assistants = useAtomValue(assistantsAtom)

  const downloadAtom = useMemo(
    () => atom((get) => get(modelDownloadStateAtom)[model.id]),
    [model.id]
  )
  const downloadState = useAtomValue(downloadAtom)
  const { setMainViewState } = useMainViewState()

  const onDownloadClick = useCallback(() => {
    downloadModel(model)
  }, [model])

  const isDownloaded = downloadedModels.find((md) => md.id === model.id) != null

  let downloadButton = (
    <Button
      onClick={(e) => {
        e.stopPropagation()
        onDownloadClick()
      }}
    >
      Download
    </Button>
  )

  const onUseModelClick = useCallback(async () => {
    if (assistants.length === 0) {
      alert('No assistant available')
      return
    }
    await requestCreateNewThread(assistants[0], model)
    setMainViewState(MainViewState.Thread)
  }, [])

  if (isDownloaded) {
    downloadButton = (
      <Tooltip
        asChild
        trigger={
          <Button
            variant="soft"
            className="min-w-[98px]"
            onClick={onUseModelClick}
            disabled={serverEnabled}
          >
            Use
          </Button>
        }
        hidden={!serverEnabled}
        content={<span>Threads are disabled while the server is running</span>}
      />
    )
  } else if (downloadState != null) {
    downloadButton = <ModalCancelDownload model={model} />
  }

  const getLabel = (size: number) => {
    if (!size) return
    if (size * 1.25 >= ram) {
      return (
        <Badge theme="destructive" variant="soft">
          Not enough RAM
        </Badge>
      )
    } else {
      return (
        <Badge theme="success" variant="soft">
          Recommended
        </Badge>
      )
    }
  }

  return (
    <div className="cursor-pointer" onClick={onClick}>
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <h6 className={styles.title}>{model.name}</h6>
        <div className="inline-flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {model.metadata.size && (
            <div className="space-x-4">
              <Badge theme="secondary">
                {toGibibytes(model.metadata.size)}
              </Badge>
              {getLabel(model.metadata.size)}
            </div>
          )}
          {downloadButton}
        </div>
      </div>
    </div>
  )
}

export default memo(HubHeaderItem)
