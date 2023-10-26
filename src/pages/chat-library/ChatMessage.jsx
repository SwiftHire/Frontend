import { BsPatchQuestionFill } from 'react-icons/bs';
import { Loader } from '../../components/shared/loader/Loader';
export default function ChatMessage({ message, isUser, isLoading, onThumbsUp, onThumbsDown }) {
  
  function splitApiMessage(str) {
    const splitValue = str.split(/\s(?=\d+\.)/);
    return splitValue.map((item)=>(
      <p>{item}</p>
    ))
    }
    return (
      <div className={`flex items-center p-2 ${isUser ? 'justify-end' : ''}`}>
        <div
          className={`max-w-3/4 p-2 ${
            isUser ? 'bg-primary/80 text-body shadow-primary flex items-center gap-4 px-5 rounded-full' 
            : 'bg-[#F4F4F4] text-black rounded-tr-[5rem] px-10 py-5 shadow-lg'
          }`}
        >
            {!isUser && !isLoading && (
          <div className="ml-2 flex my-4">
            <button onClick={onThumbsUp} className="text-primary/90 font-medium shadow-lg 
            bg-lavender rounded-full px-5 py-1 hover:bg-black/30 hover:text-body">
              <em>This was helpful</em> <span className="animate-ping">👍</span>
            </button>
            <button onClick={onThumbsDown} className="ml-5 text-primary/90 font-medium shadow-lg 
            bg-lavender rounded-full px-5 py-1 hover:bg-black/30 hover:text-body">
              <em>Not helpful</em> <span className="animate-ping">👎</span>
            </button>
          </div>
        )}
          {/* {isUser && <BsPatchQuestionFill/>} {isLoading ? '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏' : message} */}
          {isUser && <BsPatchQuestionFill/>} {isLoading ? <Loader/> : <p>{splitApiMessage(message)}</p> }
        </div>
      </div>
    );
  }