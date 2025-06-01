import { forwardRef, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepCardProps {
  index: number
  value: string
  onChange: (value: string) => void
  onRemove?: () => void
  onFocus?: () => void
  onBlur?: () => void
  isActive?: boolean
  showRemove?: boolean
}

const StepCard = forwardRef<HTMLTextAreaElement, StepCardProps>(
  (
    { index, value, onChange, onRemove, onFocus, onBlur, isActive = false, showRemove = true },
    ref
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.style.height = 'auto'
        internalRef.current.style.height = internalRef.current.scrollHeight + 'px'
      }
    }, [value])

    return (
      <div
        className={cn(
          'group relative border rounded-md p-3 transition space-y-2',
          isActive ? 'bg-muted ring ring-ring shadow-sm' : 'bg-muted/20 hover:bg-muted/30'
        )}
      >
        <div className="flex items-center justify-between border-b border-muted pb-0.5 mb-1">
          <h3 className="text-base font-medium text-foreground">Steg {index + 1}</h3>

          {showRemove && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onRemove}
              aria-label={`Ta bort steg ${index + 1}`}
              className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          )}
        </div>

        <textarea
          ref={(el) => {
            internalRef.current = el

            if (typeof ref === 'function') ref(el)
            else if (ref) ref.current = el
          }}
          value={value}
          placeholder="Beskriv vad som ska göras i detta steg"
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full text-sm bg-transparent border-none outline-none p-0 leading-snug resize-none"
          rows={1}
        />
      </div>
    )
  }
)

StepCard.displayName = 'StepCard'
export default StepCard
