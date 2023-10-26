import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SuggestedPrompts, ChatMessage } from './';
import { HiOutlineArrowRightCircle } from 'react-icons/hi2';
import { useUserPlanContext } from '../../contexts/UserPlansContext';
import { callChatbotAPI } from './../../hooks/useChatBot';

import PlanStatusModal from '../../components/modals/PlanStatusModal';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { updateUserPlans, userPlans } = useUserPlanContext();
  const [openStatusModal, setOpenStatusModal] = useState(false);


  function setActivePlan(userPlans) {
    let hasProPlan = false;
    let hasBasicPlan = false;
  
    for (const plan of userPlans) {
      if (plan.planName === 'Basic On Demand') {
        hasProPlan = true;
        break;
      } else if (plan.planName === 'Basic') {
        hasBasicPlan = true;
      }
    }
  
    if (hasProPlan) {
      return 'Basic On Demand';
    } else if (hasBasicPlan) {
      return 'Basic';
    } else {
      return 'Free';
    }
  }
  
  const activePlan = setActivePlan(userPlans); // Output: Basic On Demand, Basic, or Free based on the conditions

  const navigateTo = useNavigate();

  function toggleStatusModal(){
    setOpenStatusModal(!openStatusModal);
  }

  useEffect(()=>{
    updateUserPlans()
  },[userPlans]);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      setMessages([...messages, { message: userMessage, isUser: true }]);
      setUserMessage('');
  
      setIsLoading(true);
      try {
        const chatbotResponse = await callChatbotAPI({ question: userMessage });
        setIsLoading(false);
        setMessages([
          ...messages,
          { message: userMessage, isUser: true },
          { message: chatbotResponse, isUser: false },
        ]);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching chatbot response:', error);
        setMessages([
          ...messages,
          { message: userMessage, isUser: true },
          { message: 'An error occurred while fetching the chatbot response.', isUser: false },
        ]);
      }
    }
  };
  

  const handleThumbsUp = async (messageIdx) => {
    console.log(`Thumbs up for message #${messageIdx}`);
    const userMessage = messages[messageIdx - 1];
    const chatbotResponse = messages[messageIdx];
    await callChatbotAPI({ rating: 10, userMessage, chatbotResponse, messageIdx });
  };
  
  const handleThumbsDown = async (messageIdx) => {
    console.log(`Thumbs down for message #${messageIdx}`);
    const userMessage = messages[messageIdx - 1];
    const chatbotResponse = messages[messageIdx];
    await callChatbotAPI({ rating: 1, userMessage, chatbotResponse, messageIdx });
  };
  
  
  
  
  const suggestedPrompts = [
    'What should be included in a resume?',
    'How to make a resume stand out?',
    'What are common resume mistakes?',
    'How long should a resume be?',
    'How to tailor a resume for a specific job?',
  ];
  

  const handleSuggestedPromptClick = async (prompt) => {
    setUserMessage(prompt);
    await handleSendMessage(prompt);
  };

  const handleStatusCheck = () => {
    if (activePlan.toLowerCase() === 'basic' || activePlan.toLowerCase() === 'pro') {
      handleSendMessage();
    } else {
      setOpenStatusModal(true);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="w-4/12 bg-primary/80 text-white text-[2rem] p-4 font-bold rounded-r-full shadow-lg">ResumeGenie          ✨</div>
      <div className="flex-1 overflow-y-auto p-4">
        <SuggestedPrompts prompts={suggestedPrompts} onPromptClick={handleSuggestedPromptClick} />
        {messages.map((msg, idx) => (
          <ChatMessage
            key={idx}
            message={msg.message}
            isUser={msg.isUser}
            isLoading={isLoading && !msg.isUser}
            onThumbsUp={() => handleThumbsUp(idx)}
            onThumbsDown={() => handleThumbsDown(idx)}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="w-11/12 bg-primary/90 p-4 flex items-center rounded-full">
        <input
          className="w-full flex-1 mr-4 p-2 text-gray-600 text-sm border border-primary rounded-full outline-0 outline-primary px-5"
          placeholder="Type your message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleStatusCheck()}
        />
        <button
          className="flex items-center gap-2 bg-body text-primary py-2 px-4 rounded-full"
          onClick={handleStatusCheck}
          disabled={isLoading}
        >
          Send <span><HiOutlineArrowRightCircle/></span>
        </button>
      </div>
      {openStatusModal && <PlanStatusModal navigateTo={navigateTo} toggleStatusModal={toggleStatusModal}/>}
    </div>
  );
}
            
            