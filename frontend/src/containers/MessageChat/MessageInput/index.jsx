import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TextField,
  InputAdornment,
  IconButton,
  Popover,
} from '@material-ui/core';
import { AttachFile, EmojiEmotions, Send } from '@material-ui/icons';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

const MessageInput = ({ sendMessage }) => {
  const [text, setText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const { t } = useTranslation();

  const handleSendMessage = async () => {
    if (!text) return;
    sendMessage({ text });
    setText('');
  };

  const handleKeyPress = (e) => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const emojiMart = (
    <Picker
      title={t('pickEmoji')}
      emoji="point_up"
      color="#000034"
      onSelect={(emoji) => setText(text + emoji.native)}
    />
  );

  return (
    <>
      <TextField
        multiline
        rowsMax={3}
        variant="outlined"
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <AttachFile color="primary" />
              </IconButton>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <EmojiEmotions color="primary" />
              </IconButton>
              <IconButton onClick={handleSendMessage}>
                <Send color="primary" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {emojiMart}
      </Popover>
    </>
  );
};

export default MessageInput;
