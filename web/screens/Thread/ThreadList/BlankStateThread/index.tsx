import { GalleryHorizontalEndIcon } from 'lucide-react'

const BlankState = () => {
  return (
    <div className="px-3 py-4">
      <div className="px-4 py-8 text-center">
        <GalleryHorizontalEndIcon size={26} className="mx-auto mb-3" />
        <h2 className="font-semibold">No Thread History</h2>
      </div>
    </div>
  )
}

export default BlankState
