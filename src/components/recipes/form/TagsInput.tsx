import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface TagsInputProps {
  tags: string[]
  setTags: (tags: string[]) => void
  label?: string
  placeholder?: string
}

const TagsInput: React.FC<TagsInputProps> = ({ tags, setTags, label = 'Taggar', placeholder }) => {
  const [input, setInput] = useState('')

  const addTag = () => {
    const newTag = input.trim()

    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
    }

    setInput('')
  }

  const removeTag = (index: number) => {
    const updated = [...tags]
    updated.splice(index, 1)
    setTags(updated)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <div className="space-y-3">
      {label && <label className="text-base font-semibold mb-1 block">{label}</label>}
      <div className="flex gap-2">
        <Input
          className="bg-muted"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || 'Skriv en tagg och tryck enter'}
        />
        <Button type="button" variant="outline" onClick={addTag}>
          Lägg till
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="flex items-center bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm border"
          >
            {tag}
            <button
              type="button"
              className="ml-2 text-muted-foreground hover:text-destructive"
              onClick={() => removeTag(idx)}
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}

export default TagsInput
