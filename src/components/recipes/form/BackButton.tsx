import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface BackButtonProps {
  to?: string // Where to go (optional)
  label?: string // Optional label for tooltip
  className?: string // Optional style override
}

const BackButton: React.FC<BackButtonProps> = ({
  to,
  label = 'Gå tillbaka',
  className = 'absolute top-4 left-4',
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (to) {
      navigate(to)
    } else {
      navigate(-1) // Go back to the previous page
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleClick}
            variant="ghost"
            size="icon"
            className={className}
            aria-label={label}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default BackButton
