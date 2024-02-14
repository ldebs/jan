import { Fragment } from 'react'

import { Progress, Modal, ModalContent, Button, ModalTrigger } from '@janhq/joi'

import { useAtomValue } from 'jotai'

import useDownloadModel from '@/hooks/useDownloadModel'
import { modelDownloadStateAtom } from '@/hooks/useDownloadState'

import { formatDownloadPercentage } from '@/utils/converter'

import { getDownloadingModelAtom } from '@/helpers/atoms/Model.atom'

export default function DownloadingState() {
  const downloadStates = useAtomValue(modelDownloadStateAtom)
  const downloadingModels = useAtomValue(getDownloadingModelAtom)
  const { abortModelDownload } = useDownloadModel()

  const totalCurrentProgress = Object.values(downloadStates)
    .map((a) => a.size.transferred + a.size.transferred)
    .reduce((partialSum, a) => partialSum + a, 0)

  const totalSize = Object.values(downloadStates)
    .map((a) => a.size.total + a.size.total)
    .reduce((partialSum, a) => partialSum + a, 0)

  const totalPercentage = ((totalCurrentProgress / totalSize) * 100).toFixed(2)

  return (
    <Fragment>
      {Object.values(downloadStates)?.length > 0 && (
        <Modal>
          <ModalTrigger asChild>
            <div className="relative block">
              <Button size="small" variant="outline" theme="primary">
                <span>
                  {Object.values(downloadStates).length} Downloading model
                </span>
              </Button>
              <span
                className="bg-primary/20 absolute left-0 h-full rounded-md rounded-l-md"
                style={{
                  width: `${totalPercentage}%`,
                }}
              />
            </div>
          </ModalTrigger>
          <ModalContent>
            <h6 className="text-base font-semibold">Downloading model</h6>
            {Object.values(downloadStates).map((item, i) => (
              <div className="pt-2" key={i}>
                <Progress
                  className="mb-2 h-2"
                  value={
                    formatDownloadPercentage(item?.percent, {
                      hidePercentage: true,
                    }) as number
                  }
                />
                <div className="flex items-center justify-between gap-x-2">
                  <div className="flex gap-x-2">
                    <p className="line-clamp-1">{item?.modelId}</p>
                    <span>{formatDownloadPercentage(item?.percent)}</span>
                  </div>
                  <Button
                    theme="primary"
                    variant="outline"
                    size="small"
                    onClick={() => {
                      if (item?.modelId) {
                        const model = downloadingModels.find(
                          (model) => model.id === item.modelId
                        )
                        if (model) abortModelDownload(model)
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </ModalContent>
        </Modal>
      )}
    </Fragment>
  )
}
