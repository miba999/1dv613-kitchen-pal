interface RecipeImageProps {
  src?: string
  alt: string
}

const RecipeImage: React.FC<RecipeImageProps> = ({ src, alt }) => {
  const fallback = '/images/recipe-fallback.png'

  return (
    <div className="w-full md:w-64 flex-shrink-0">
      <img
        src={src || fallback}
        alt={alt}
        className="rounded-lg object-cover w-full aspect-[4/3]"
      />
    </div>
  )
}

export default RecipeImage
