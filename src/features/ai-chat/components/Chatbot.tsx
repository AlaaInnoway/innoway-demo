import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { SetStateAction, useEffect, useState } from 'react';
import SidePanel from '../../../components/ui/SidePanel';
import Avatar from '../../../components/ui/Avatar';

const Chatbot = (props: any) => {
    const [showPanel, setShowPanel] = useState(false);

    return (
        <>
            {showPanel && (
                <SidePanel
                    title=""
                    open={!showPanel}
                    handleClick={() => setShowPanel(!showPanel)}
                >
                    <ChatbotPanel />
                </SidePanel>
            )}
            <button
                className="inline-flex items-center justify-center text-sm font-medium m-0 cursor-pointer text-gray-600"
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                data-state="closed"
                onClick={() => setShowPanel(!showPanel)}
                title='Chat with AI'
            >
                <ChatBubbleOvalLeftEllipsisIcon width={24} height={24} />
            </button>
            
        </>
    );
};

export default Chatbot;


const ChatbotPanel = () => {
    const [messages, setMessages] = useState([
        { type: 'AI', text: 'Hi, how can I save your time today?' },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [currentModule, setCurrentModule] = useState(localStorage.getItem('module'));
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        // Fetch module from localStorage
        const module = localStorage.getItem('module');
        if (module) {
            setCurrentModule(module);
        }

        // Fetch data based on module
        if (module === 'crsdsdsm') {
            setData([
                // CRM question & reply data
                
                // Add more CRM questions and replies as needed
            ]);
        }
        else if (module === 'sdsd') {
            setData([]);
        }
        else {
            setData([
                {
                    question: 'What should I work on next ?',
                    reply: 'Review your current tasks and prioritize them based on their importance and deadlines. Focus on tasks that will have the greatest impact on your sales goals.'
                },
                {
                    question: 'What are my overdue tasks ?',
                    reply: 'Check your task list for any tasks that are past their due dates. Prioritize these tasks to ensure they are completed promptly.'
                },
                {
                    question: 'What tasks am I working on ?',
                    reply: 'Review your current task list to see what tasks you are currently working on. This will help you stay organized and focused.'
                },
                {
                    question: 'How can I prioritize my leads ?',
                    reply: 'You can prioritize your leads based on their engagement level, budget, and timeline. Focus on leads that are more likely to convert.'
                },
                {
                    question: 'What is the best way to follow up with a prospect ?',
                    reply: 'Follow up with prospects in a timely manner, personalize your communication, and provide value in each interaction to keep them engaged.'
                },
                {
                    question: 'How can I improve my sales pitch ?',
                    reply: 'Tailor your sales pitch to address the specific needs and pain points of each prospect. Focus on highlighting the unique value proposition of your product or service.'
                },
                {
                    question: 'What tools can help me track my sales performance ?',
                    reply: 'Use CRM tools to track your sales pipeline, monitor key metrics such as conversion rates and deal sizes, and identify areas for improvement.'
                },
                {
                    question: 'How can I handle objections from prospects ?',
                    reply: 'Anticipate common objections and prepare responses that address the prospect\'s concerns while highlighting the benefits of your offering.'
                },
                {
                    question: 'What strategies can I use to upsell to existing customers ?',
                    reply: 'Identify opportunities to upsell based on the customer\'s past purchases and offer relevant products or services that add value to their business.'
                },
                {
                    question: 'How can I use social media to generate leads ?',
                    reply: 'Engage with your target audience on social media, share valuable content, and participate in relevant conversations to attract potential leads.'
                },
                {
                    question: 'How can I improve my time management as a salesperson ?',
                    reply: 'Prioritize your tasks based on their importance and urgency, use time management tools to stay organized, and delegate tasks when necessary.'
                },
                {
                    question: 'What are the status of my leave requests ?',
                    reply: 'You have 2 leave requests: 1 approved and 1 rejected.'
                },
                {
                    question: 'Write me an email to send my manager investigating about the rejected leave request',
                    reply: 'Done, you can go to the email section to check and send it.'
                },
                {
                    question: 'What are my overdue tasks ?',
                    reply: 'You have 1 overdue task: Send an email to Anna\'s Holding representative it to sending him an adjusted quote.'
                },
                {
                    question: 'Can you please complete my tasks',
                    reply: 'Done, the email has already sent to Paul Johnson the Anna\'s Holding representative'
                },
                {
                    question: 'Now have I overdue tasks',
                    reply: 'No all have been take care off.'
                },
                {
                    question : 'Quels sont mes tâches en retard ?',
                    reply : 'Vous avez 1 tâche en retard : Envoyer un e-mail au représentant de Anna\'s Holding pour lui envoyer un devis ajusté.'
                },
                {
                    question : 'Pouvez-vous s\'il vous plaît compléter mes tâches',
                    reply : 'C\'est fait, l\'e-mail a déjà été envoyé à Paul Johnson, le représentant de Anna\'s Holding.'
                },
                {
                    question : 'Maintenant, ai-je des tâches en retard',
                    reply : 'Non, tout a été pris en charge.'
                },
                { question: 'Hello', reply: 'Hi there!' },
                { question: 'How are you?', reply: 'I am good, thank you!' },
                { question: 'Thank you!', reply: 'You\'re most welcome!' },
            ]);
        }
        // Add other modules' data fetch logic here
    }, []);
    

    const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setInputValue(e.target.value);
    };

    const handleFormSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const inputQuestion = inputValue.trim().toLowerCase();
        if (inputQuestion === '') return;
    
        let reply = 'Sorry, I do not have an answer to that.';
        let bestMatch = { similarity: 0, question: '', reply: '' };
        for (const item of data) {
            const wordsInQuestion = item.question.toLowerCase().split(' ');
            const wordsInInput = inputQuestion.split(' ');
            const commonWords = wordsInQuestion.filter((word: string) => wordsInInput.includes(word));
            const similarity = commonWords.length / Math.max(wordsInQuestion.length, wordsInInput.length);
            if (similarity > bestMatch.similarity) {
                bestMatch = { similarity, question: item.question, reply: item.reply };
            }
        }
    
        if (bestMatch.similarity > 0.5) {
            reply = bestMatch.reply;
        }
    
        setMessages([...messages, { type: 'You', text: inputValue }]);
        setTimeout(() => {
            setMessages([...messages, { type: 'You', text: inputValue }, { type: 'AI', text: reply }]);
        }, 1000);
    
        setInputValue('');
    };
         

    return (
        <div className="px-4 h-full relative">
            <div className="flex flex-col space-y-1.5 pb-6">
                <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
                <p className="text-sm text-[#6b7280] leading-3">Powered by Innoway Solutions</p>
            </div>

            <div className="pr-4 table min-w-full">
                {messages.map((message, index) => (
                    <div key={index} className={`flex gap-3 my-4 text-gray-600 text-sm flex-1 ${message.type === 'AI' ? 'flex-row' : 'flex-row-reverse'}`}>
                        {message.type === 'AI' ? (
                            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                                <div className="rounded-full bg-gray-100 border p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" stroke="none" fill="black" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" height="20" width="20">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path>
                                    </svg>
                                </div>
                            </span>
                        ) : (
                            <Avatar 
                                src="https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg" 
                                title="Alaa Maaoui"
                                rounded
                            />
                        )}
                        <p className="leading-relaxed"><span className="block font-bold text-gray-700">{message.type}</span>{message.text}</p>
                    </div>
                ))}
            </div>

            <div className="pr-8 absolute bottom-32 z-50 w-full">
                <form onSubmit={handleFormSubmit} className="flex items-center justify-center w-full space-x-2">
                    <input
                        value={inputValue}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-transparent disabled:cursor-not-allowed  text-[#030712]"
                        placeholder="Type your message"
                    />
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium text-gray-50 bg-serene-500 h-10 px-4 py-2"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};



