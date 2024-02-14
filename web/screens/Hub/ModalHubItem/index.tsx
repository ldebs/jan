import { Model } from '@janhq/core'
import { Modal } from '@janhq/joi'

type Props = {
  model: Model
  open?: boolean
}

const ModalHubItem = ({ model, open }: Props) => {
  console.log(open)
  return (
    <Modal open={open} onOpenChange={(value) => console.log(value)}>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
        doloribus aliquam eveniet, modi enim est non inventore voluptates,
        facilis consequatur doloremque dolor, ad similique voluptatem. Rem ad
        ratione tempora sed!
      </p>
      <p>{model.id}</p>
    </Modal>
  )
}

export default ModalHubItem
