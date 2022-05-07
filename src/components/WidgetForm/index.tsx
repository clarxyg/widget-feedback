import { CloseButton } from "../CloseButton";

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import ThoughtImageUrl from '../../assets/Thought.svg'
import { useState } from "react";
import { FeedbackTypeSteps } from "./Steps/FeedbackTypeSteps";
import { FeedbackContentSteps } from "./Steps/FeedbackContentSteps";
import { FeedbackSucessSteps } from "./Steps/FeedbackSucessSteps";

export const feedbackTypes = {
    BUG: {
      title: 'Problema',
      image: {
          source: bugImageUrl,
          alt: 'Imagem de um inseto'
      }
    },
    IDEA: {
      title: 'Ideia',
      image: {
          source: ideaImageUrl,
          alt: 'Imagem de uma lâmpada'
      }
    },
    OTHER: {
      title: 'Outro',
      image: {
          source: ThoughtImageUrl,
          alt: 'Imagem de um balão'
      }
    }
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestartFeedback() {
       setFeedbackSent(false)
       setFeedbackType(null)
    }

    return(
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {
                feedbackSent ? 
            (  
              <FeedbackSucessSteps onFeedbackRestartRequested={handleRestartFeedback}/>
            ) : 
            <>
                {
                !feedbackType ? 
                (  
                  <FeedbackTypeSteps onFeedbackTypeChanged={setFeedbackType}/>
                ) : <FeedbackContentSteps 
                feedbackType={feedbackType}
                onFeedbackRestartRequested={handleRestartFeedback}
                onFeedbackSent={() => setFeedbackSent(true)}
                />
                }
            </>
            }
            <footer className="text-xs text-neutral-400">
              Feito com ♥ pela <a className="underline underline-offset-2">Rocketseat</a>
            </footer>
        </div>
    )
}