import { ImageItem } from "./ImageItem"



export const ImageList = ({ images }) => {
  return (
    <div className="flex flex-wrap gap-4">
        {
          images.map( image => (
            <ImageItem key={image._id} image={image}/>
          ))
        }
    </div>
  )
}
