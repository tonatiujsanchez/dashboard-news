import { ImageItem } from "./ImageItem"



export const ImageList = ({ images }) => {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-8">
        {
          images.map( image => (
            <ImageItem key={image._id} image={image}/>
          ))
        }
    </div>
  )
}
