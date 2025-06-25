import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useAuth } from '../../context/Authcontext.jsx';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeFromString(message = '') {
  return message.includes('```') ? message.split('```') : null;
}
function isCodeBlock(str = '') {
  return /[=[\]{};#]|\/\/|\/*/.test(str);
}

const ChatItem = ({ content, role }) => {
  const auth = useAuth();
  const messageBlocks = extractCodeFromString(content);
  const isAssistant = role === 'model';

  const initials = React.useMemo(() => {
    const name = auth?.user?.name || '?';
    const parts = name.trim().split(' ');
    const first = parts[0]?.[0] || '?';
    const second = parts[1]?.[0] || '';
    return (first + second).toUpperCase();
  }, [auth?.user?.name]);

  return (
    <div
      className={`flex items-start gap-4 p-4 my-2 rounded-xl sm:flex-col sm:items-start sm:gap-2 ${
        isAssistant ? 'bg-teal-50 bg-opacity-20' : 'bg-[#d5d1e9]'
      }`}
    >
      {/* Avatar */}
      {isAssistant ? (
        <div className="w-11 h-11 sm:w-9 sm:h-9 bg-teal-200 rounded-full flex items-center justify-center shadow-md">
          <img
            src="https://brandlogos.net/wp-content/uploads/2025/03/gemini_icon-logo_brandlogos.net_bqzeu-300x300.png"
            alt="model"
            className="w-7 h-7 sm:w-5 sm:h-5"
          />
        </div>
      ) : (
        <div className="w-11 h-11 sm:w-9 sm:h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold shadow-md text-base sm:text-sm">
          {initials}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto sm:w-full">
        {!messageBlocks ? (
          <p
            className={`whitespace-pre-wrap break-words text-base sm:text-sm overflow-auto ${
              isAssistant ? 'text-black' : 'text-black'
            }`}
          >
            {content}
          </p>
        ) : (
          messageBlocks.map((block, idx) =>
            isCodeBlock(block) ? (
              <div
                key={idx}
                className="overflow-hidden break-words my-4 rounded bg-[#1e1e1e] sm:text-sm"
                style={{
                  maxWidth: '100%',
                  width: '100%',
                }}
              >
                <SyntaxHighlighter
                  language="javascript"
                  style={coy}
                  wrapLongLines={true}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    maxWidth: '100%',
                    width: '100%',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                    overflow: 'auto',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    boxSizing: 'border-box',
                  }}
                  codeTagProps={{
                    style: {
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-wrap',
                      overflowWrap: 'break-word',
                      maxWidth: '100%',
                    }
                  }}
                  PreTag={({ children, ...props }) => (
                    <pre
                      {...props}
                      style={{
                        ...props.style,
                        margin: 0,
                        padding: 0,
                        overflow: 'auto',
                        maxWidth: '100%',
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {children}
                    </pre>
                  )}
                >
                  {block.trim()}
                </SyntaxHighlighter>
              </div>
            ) : (
              <div
                key={idx}
                className="break-words whitespace-pre-wrap"
                style={{
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  maxWidth: '100%',
                  hyphens: 'auto',
                }}
              >
                {block.trim()}
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default ChatItem;