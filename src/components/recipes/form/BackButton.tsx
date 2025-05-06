import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface BackButtonProps {
  to?: string
}

const BackButton: React.FC<BackButtonProps> = ({ to = '/recipes' }) => {
  const navigate = useNavigate()

  const handleClick = () => navigate(to)

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleClick}
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4"
            aria-label="Tillbaka till recepten"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Gå tillbaka till recepten</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default BackButton
