import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../service/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../Loading";
import { ScreenshotButton } from "./ScreenshotButton";

interface FeedbackContentProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentSteps({ feedbackType, onFeedbackRestartRequested, onFeedbackSent }: FeedbackContentProps) {
    const feedbackTypeInfo = feedbackTypes[feedbackType]
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState('')
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)

   async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault()
        setIsSendingFeedback(true)

        await api.post('/feedbacks', {
           type: feedbackType,
           comment,
           screenshot
        })
        
        setIsSendingFeedback(false)
        onFeedbackSent()
    }

    return(
        <>
          <header>
                <button className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100" onClick={onFeedbackRestartRequested}>
                    <ArrowLeft weight="bold" className="w-4 h-4"/>
                </button>
                <span className="text-xl leading-6 flex gap-2 items-center">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6"/>
                    {feedbackTypeInfo.title}
                </span>      
                <CloseButton />
          </header>
          <div className="flex py-8 gap-2 w-full">
            <form onSubmit={handleSubmitFeedback}>
                <textarea 
                className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-6 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-zinc-700 scrollbar-track-transparent scrollbar-thin"
                placeholder="Conte com detalhes o que está acontecendo.."
                onChange={event => setComment(event.target.value)}
                />
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton 
                    screenshot={screenshot}
                    onScreenshotTook={setScreenshot}/>
                    <button type="submit" disabled={comment.length === 0 || isSendingFeedback}
                    className="p-2 bg-brand-500 rounded-md border-transparent 
                    flex-1 flex justify-center items-start text-sm hover:bg-brand-300 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 
                    focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500">
                        { isSendingFeedback ? <Loading /> : 'Enviar feedback' }
                    </button>
                </footer>
            </form>
          </div>
       </>
      )
}