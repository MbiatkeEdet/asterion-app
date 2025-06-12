// app/dashboard/study-tools/page.jsx
"use client";

import { useState, useEffect } from 'react';
import ChatInterface from '@/components/ui/ChatInterface';
import FlashcardDisplay from '@/components/ui/FlashcardDisplay';

const studyTools = [
  {
    id: 'flashcards',
    name: 'Flashcard Generator',
    description: 'Create study flashcards from your content',
    icon: '📇',
    systemContext: `You are a flashcard creation assistant. Help the user create effective study flashcards from their content.
    
IMPORTANT FORMAT INSTRUCTIONS:
1. Format each flashcard using this exact structure:
   ### **Flashcard X**
   **Front:** [Question text here]
   **Back:** [Answer text here]

2. Separate each flashcard with a line: ---

3. Create 5-10 comprehensive but concise flashcards that focus on key concepts.

4. Include images, bullet points, and formatting in the answers where helpful.

5. Keep questions clear and straightforward.`
  },
  {
    id: 'notes',
    name: 'Note Organizer',
    description: 'Organize and structure your study notes',
    icon: '📝',
    systemContext: 'You are a note organization assistant. Help the user structure and organize their study notes effectively. Use clear headings, bullet points, and hierarchical organization to make the information accessible and organized for study purposes.'
  },
  {
    id: 'summarizer',
    name: 'Content Summarizer',
    description: 'Summarize complex content for easier study',
    icon: '📋',
    systemContext: 'You are a content summarization assistant. Help the user summarize complex information into clear, concise summaries that maintain the key points and concepts. Create summaries at different levels of detail as needed.'
  },
  {
    id: 'mindmap',
    name: 'Mind Map Creator',
    description: 'Create mind maps from your study material',
    icon: '🔄',
    systemContext: 'You are a mind map creation assistant. Help the user create effective mind maps from their study material. Present the information in a hierarchical structure with a central concept branching out to related ideas and subconcepts. Format the mind map clearly using indentation or similar text-based structure.'
  },
  {
    id: 'explain',
    name: 'Concept Explainer',
    description: 'Get clear explanations of difficult concepts',
    icon: '💡',
    systemContext: 'You are a concept explanation assistant. Help the user understand difficult concepts by providing clear, intuitive explanations at their level of understanding. Use analogies, examples, and break down complex ideas into simpler components.'
  }
];

export default function StudyToolsPage() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [studyContent, setStudyContent] = useState('');
  const [initialMessage, setInitialMessage] = useState('');
  const [systemContext, setSystemContext] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    setSystemContext(tool.systemContext);
    setInitialMessage(''); // Reset initial message when tool changes
    setAiResponse(null); // Reset any previous responses
  };
  
  const handleStudyContentSubmit = (e) => {
    e.preventDefault();
    if (!studyContent.trim()) return;
    
    let message = '';
    setIsProcessing(true);
    
    switch (selectedTool.id) {
      case 'flashcards':
        message = `Please create study flashcards from this content. Format them exactly as specified in your instructions:\n\n${studyContent}`;
        break;
      case 'notes':
        message = `Please help me organize these notes into a well-structured study guide:\n\n${studyContent}`;
        break;
      case 'summarizer':
        message = `Please summarize this content for study purposes:\n\n${studyContent}`;
        break;
      case 'mindmap':
        message = `Please create a mind map based on this content:\n\n${studyContent}`;
        break;
      case 'explain':
        message = `Please explain these concepts in a simple, clear way:\n\n${studyContent}`;
        break;
      default:
        message = studyContent;
    }
    
    // Set the message to be sent
    setInitialMessage(message);
  };
  
  // Handler for AI responses
  const handleAiResponse = (response) => {
    setAiResponse(response);
    setIsProcessing(false);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white shadow-sm border-b p-4">
        <h1 className="text-2xl font-bold text-gray-800">Study Tools</h1>
        <p className="text-gray-600">Tools to enhance your learning and study efficiency</p>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Tools grid */}
        <div className="w-64 bg-gray-50 border-r overflow-y-auto p-4">
          <h2 className="font-medium text-gray-700 mb-3">Study Tools</h2>
          <div className="space-y-2">
            {studyTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolSelect(tool)}
                className={`w-full text-left p-3 rounded-lg transition ${
                  selectedTool?.id === tool.id 
                    ? 'bg-indigo-100 border border-indigo-200' 
                    : 'hover:bg-gray-100 border border-transparent'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3" aria-hidden="true">{tool.icon}</span>
                  <div>
                    <div className="font-medium">{tool.name}</div>
                    <div className="text-sm text-gray-600">{tool.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      
        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedTool ? (
            <>
              <div className="bg-white p-4 border-b">
                <h2 className="font-medium flex items-center">
                  <span className="text-2xl mr-2">{selectedTool.icon}</span>
                  {selectedTool.name}
                </h2>
                <p className="text-gray-600 mt-1">{selectedTool.description}</p>
                
                {!initialMessage && (
                  <form onSubmit={handleStudyContentSubmit} className="mt-4">
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Paste your study content below
                      </label>
                      <textarea
                        value={studyContent}
                        onChange={(e) => setStudyContent(e.target.value)}
                        placeholder={`Enter content for ${selectedTool.name.toLowerCase()}...`}
                        rows={6}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={`${isProcessing ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-4 py-2 rounded-lg flex items-center`}
                    >
                      {isProcessing && (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      {isProcessing ? 'Processing...' : 'Process Content'}
                    </button>
                  </form>
                )}
              </div>
              
              <div className="flex-1 overflow-hidden">
                {selectedTool.id === 'flashcards' && aiResponse ? (
                  <FlashcardDisplay flashcards={aiResponse.content} />
                ) : (
                  <ChatInterface 
                    initialMessage={initialMessage}
                    aiProvider="deepseek" 
                    model="deepseek-chat"
                    placeholder="Ask follow-up questions about your study material..."
                    systemContext={systemContext}
                    onAiResponse={handleAiResponse}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center p-8 max-w-md">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Select a Study Tool</h3>
                <p className="text-gray-600">
                  Choose one of the study tools from the sidebar to enhance your learning experience.
                  Each tool is designed to help you study more effectively.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}