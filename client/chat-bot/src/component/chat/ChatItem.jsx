import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {useAuth} from '../../context/Authcontext.jsx'

/* --------------------------------------------------------------
   Helper functions
----------------------------------------------------------------*/
const extractCodeFromString = (message = '') =>
  message.includes('```') ? message.split('```') : null;

const isCodeBlock = (str = '') =>
  /[=[\]{};#]|\/\/|\/\*/.test(str); // quick‑n‑dirty heuristic

/* --------------------------------------------------------------
   Component
----------------------------------------------------------------*/
const ChatItem = ({ content, role }) => {
  const auth = useAuth();
  const messageBlocks = extractCodeFromString(content);

  /* Decide which avatar / background to show */
  const isAssistant = role === 'assistant';
  const bgColor = isAssistant ? '#004d5612' : '#004d56';

  const userInitials = React.useMemo(() => {
    if (!auth?.user?.name) return '?';
    const [first, second = ''] = auth.user.name.split(' ');
    return `${first[0] ?? ''}${second[0] ?? ''}`.toUpperCase();
  }, [auth?.user?.name]);

  return (
    <Box
      sx={{
        display: 'flex',
        p: 2,
        bgcolor: bgColor,
        gap: 2,
        borderRadius: 2,
        my: isAssistant ? 1 : 0, // assistant messages get extra vertical spacing
      }}
    >
      {/* Avatar */}
      {isAssistant ? (
        <Avatar sx={{ ml: 0 }}>
          <img src="openai.png" alt="openai" width={30} />
        </Avatar>
      ) : (
        <Avatar sx={{ ml: 0, bgcolor: 'black', color: 'white' }}>
          {userInitials}
        </Avatar>
      )}

      {/* Message / code blocks */}
      <Box>
        {/* If there are no ``` blocks, show plain text */}
        {!messageBlocks && (
          <Typography sx={{ fontSize: 20 }}>{content}</Typography>
        )}

        {/* If there ARE ``` blocks, render them one by one */}
        {messageBlocks &&
          messageBlocks.map((block, idx) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={idx}
                style={coldarkDark}
                language="javascript"
              >
                {block.trim()}
              </SyntaxHighlighter>
            ) : (
              <Typography key={idx} sx={{ fontSize: 20 }}>
                {block.trim()}
              </Typography>
            )
          )}
      </Box>
    </Box>
  );
};

/* --------------------------------------------------------------
   Optional runtime type checking
----------------------------------------------------------------*/
import PropTypes from 'prop-types';

ChatItem.propTypes = {
  content: PropTypes.string.isRequired,
  role: PropTypes.oneOf(['user', 'assistant']).isRequired,
};

export default ChatItem;
