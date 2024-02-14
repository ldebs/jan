import { Tooltip } from '@janhq/joi'
import { Textarea } from '@janhq/joi'

import { InfoIcon } from 'lucide-react'

type Props = {
  title: string
  enabled?: boolean
  name: string
  description: string
  placeholder: string
  value: string
  onValueChanged?: (e: string | number | boolean) => void
}

const ModelConfigInput: React.FC<Props> = ({
  title,
  enabled = true,
  value,
  description,
  placeholder,
  onValueChanged,
}) => {
  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center gap-x-2">
        <p className="text-sm font-semibold text-zinc-500 dark:text-gray-300">
          {title}
        </p>
        <Tooltip
          trigger={
            <InfoIcon size={16} className="flex-shrink-0 dark:text-gray-500" />
          }
          content={description}
        />
      </div>
      <Textarea
        placeholder={placeholder}
        onChange={(e) => onValueChanged?.(e.target.value)}
        value={value}
        disabled={!enabled}
      />
    </div>
  )
}

export default ModelConfigInput
