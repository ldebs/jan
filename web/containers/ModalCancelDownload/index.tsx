import { useMemo } from 'react'

import { Model } from '@janhq/core'

import { Button } from '@janhq/joi'

import {
  Modal,
  ModalTrigger,
  ModalClose,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalTitle,
  Progress,
} from '@janhq/uikit'

import { atom, useAtomValue } from 'jotai'

import useDownloadModel from '@/hooks/useDownloadModel'

import { modelDownloadStateAtom } from '@/hooks/useDownloadState'

import { formatDownloadPercentage } from '@/utils/converter'

import { getDownloadingModelAtom } from '@/helpers/atoms/Model.atom'

type Props = {
  model: Model
  isFromList?: boolean
}

const ModalCancelDownload: React.FC<Props> = ({ model, isFromList }) => {
  const downloadingModels = useAtomValue(getDownloadingModelAtom)
  const downloadAtom = useMemo(
    () => atom((get) => get(modelDownloadStateAtom)[model.id]),
    [model.id]
  )
  const downloadState = useAtomValue(downloadAtom)
  const cancelText = `Cancel ${formatDownloadPercentage(downloadState.percent)}`
  const { abortModelDownload } = useDownloadModel()

  return (
    <Modal>
      <ModalTrigger asChild>
        {isFromList ? (
          <Button size="small">{cancelText}</Button>
        ) : (
          <Button>
            <div className="flex items-center space-x-2">
              <span className="inline-block">Cancel</span>
              <Progress
                className="inline-block h-2 w-[80px] bg-blue-100"
                value={
                  formatDownloadPercentage(downloadState?.percent, {
                    hidePercentage: true,
                  }) as number
                }
              />
              <span>{formatDownloadPercentage(downloadState.percent)}</span>
            </div>
          </Button>
        )}
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Cancel Download</ModalTitle>
        </ModalHeader>
        <p>
          Are you sure you want to cancel the download of&nbsp;
          {downloadState?.modelId}?
        </p>
        <ModalFooter>
          <div className="flex gap-x-2">
            <ModalClose asChild>
              <Button>No</Button>
            </ModalClose>
            <ModalClose asChild>
              <Button
                onClick={() => {
                  if (downloadState?.modelId) {
                    const model = downloadingModels.find(
                      (model) => model.id === downloadState.modelId
                    )
                    if (model) abortModelDownload(model)
                  }
                }}
              >
                Yes
              </Button>
            </ModalClose>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalCancelDownload
