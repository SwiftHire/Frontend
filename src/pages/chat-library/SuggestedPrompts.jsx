import { BsPatchQuestionFill } from 'react-icons/bs';

export default function SuggestedPrompts({ prompts, onPromptClick }) {
    return (
      <div className="mb-2 grid grid-cols-3 gap-5">
        {prompts.map((prompt, idx) => (
          <div
            key={idx}
            className="flex items-center gap-5 text-purple-700 bg-lavender px-4 py-2 mr-2 rounded-full shadow-lg cursor-pointer"
            onClick={() => onPromptClick(prompt)}
          >
            <span><BsPatchQuestionFill/></span> 
            <h3>{prompt}</h3>
          </div>
        ))}
      </div>
    );
  }