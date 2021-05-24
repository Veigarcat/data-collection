/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Tooltip,
  InputBase,
  Typography,
  Button,
} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import sanitizeHtml from 'sanitize-html';
import { useTranslation } from 'react-i18next';
import { changeAlias } from '../../../utils/string';
import messageTypes from '../../../enums/messageTypes';
import MessageContentStyle from './messageContent.style';
import {
  handleConfirmMessage,
  handleCommentMessage,
  handleIsShowComment,
} from '../../../redux/message/actions';

export default function MessageContent({
  presentUserAvatar,
  today,
  scrollMessage,
  handleSendMessage,
  endScroll,
  isTopScroll,
  scrollBottom,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.arrMessage);
  const [standardMessages, setStandardMessages] = useState([]);
  const [comment, setComment] = useState('');
  const [isShown, setIsShown] = useState([]);

  useEffect(() => {
    if (messages.length) {
      setStandardMessages(
        messages.map((message) => {
          if (
            message.content &&
            message.content.attachment &&
            !message.content.attachment.payload
          )
            return {
              ...message,
              content: {
                ...message.content,
                attachment: { ...message.content.attachment, payload: {} },
              },
            };
          return message;
        }),
      );
      const newArr = [];
      for (let i = 0; i < messages.length; i += 1) {
        newArr.push(false);
      }
      setIsShown(newArr);
    }
  }, [messages]);

  useEffect(() => {
    const objDiv = document.getElementById('messageList');

    if (endScroll <= 0) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
    if (isTopScroll) {
      objDiv.scrollTop = objDiv.scrollHeight - scrollBottom;
    }
  });
  const handleShowBonusMessage = (index, option) => {
    const newArr = [...isShown];
    newArr[index] = option;
    setIsShown(newArr);
  };
  const handleKeyUp = (event, message) => {
    if (event.key === 'Enter') {
      dispatch(handleCommentMessage({ id: message.id, textComment: comment }));
    }
  };
  const handleChangeConfirm = (message) => {
    dispatch(
      handleConfirmMessage({
        id: message.id,
        isConfirm: !message.isConfirm,
      }),
    );
  };
  const IsShowComment = (message) => {
    dispatch(handleIsShowComment({ id: message.id }));
  };

  const handleOption = (label) => {
    handleSendMessage({ text: label });
  };

  const convertMessage = (value) => ({
    __html: sanitizeHtml(
      value.replace(
        /(\b(https?|):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi,
        "<a href='$1' style='color: #0000FF' target='_blank'>$1</a>",
      ),
    ),
  });
  const getMessageItem = ({ message, type, url, text, elements }) => {
    switch (type) {
      case messageTypes.TEXT:
        return (
          <div>
            {message.sender.user ? (
              <div
                className="message-client"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={convertMessage(text)}
              />
            ) : (
              <div
                className="message-server"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={convertMessage(text)}
              />
            )}
          </div>
        );
      case messageTypes.IMAGE:
        return (
          <Tooltip
            title={
              today(message.updatedAt).time || today(message.updatedAt).day
            }
            placement={message.sender.user ? 'right' : 'left'}
          >
            {message.sender.user ? (
              <div className="message-client">
                {url ? (
                  <img className="media" src={url} alt={text} />
                ) : (
                  `[${t('image')}]`
                )}
              </div>
            ) : (
              <div className="message-server">
                {url ? (
                  <img className="media" src={url} alt={text} />
                ) : (
                  `[${t('image')}]`
                )}
              </div>
            )}
          </Tooltip>
        );
      case messageTypes.AUDIO:
        return (
          <Tooltip
            title={
              today(message.updatedAt).time || today(message.updatedAt).day
            }
            placement={message.sender.user ? 'right' : 'left'}
          >
            {message.sender.user ? (
              <div className="message-client">
                {url ? (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <audio className="media" controls>
                    <source src={url} />
                  </audio>
                ) : (
                  `[${t('audio')}]`
                )}
              </div>
            ) : (
              <div className="message-server">
                {url ? (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <audio className="media" controls>
                    <source src={url} />
                  </audio>
                ) : (
                  `[${t('audio')}]`
                )}
              </div>
            )}
          </Tooltip>
        );
      case messageTypes.VIDEO:
        return (
          <Tooltip
            title={
              today(message.updatedAt).time || today(message.updatedAt).day
            }
            placement={message.sender.user ? 'right' : 'left'}
          >
            {message.sender.user ? (
              <div className="message-client">
                {url ? (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video className="media" controls>
                    <source src={url} />
                  </video>
                ) : (
                  `[${t('video')}]`
                )}
              </div>
            ) : (
              <div className="message-server">
                {url ? (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video className="media" controls>
                    <source src={url} />
                  </video>
                ) : (
                  `[${t('video')}]`
                )}
              </div>
            )}
          </Tooltip>
        );
      case messageTypes.OPTION:
        return (
          <div className="message-server">
            {elements.map((item) => (
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={convertMessage(
                  `${item.label}. ${item.value}`,
                )}
              />
            ))}
            <div className="button-container">
              {elements.map((item) => (
                <Button
                  key={item.label}
                  className="select-button"
                  onClick={() => handleOption(item.label)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
            {/* {elements.map((option) => (
              <div className="option">{option.value}</div>
            ))} */}
          </div>
        );
      case messageTypes.END_CALL:
        return (
          <Tooltip
            title={
              today(message.updatedAt).time || today(message.updatedAt).day
            }
            placement={message.sender.user ? 'right' : 'left'}
          >
            {message.sender.user ? (
              <div
                className="message-client"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={convertMessage(messageTypes.END_CALL)}
              />
            ) : (
              <div
                className="message-server"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={convertMessage(messageTypes.END_CALL)}
              />
            )}
          </Tooltip>
        );

      default:
        return '';
    }
  };
  const avatar = (message) =>
    presentUserAvatar.length === 2 ? (
      <Avatar
        className={clsx('avatar-message', {
          avatarClient: message.sender.user,
          avatarBot: !message.sender.user,
        })}
      >
        {changeAlias(presentUserAvatar)}
      </Avatar>
    ) : (
      <Avatar
        className={clsx('avatar-message', {
          avatarClient: message.sender.user,
          avatarBot: !message.sender.user,
        })}
        src={presentUserAvatar}
      />
    );
  const getMessageText = (message, index) => (
    <ListItem
      className={clsx('message', {
        client: message.sender.user,
        bot: !message.sender.user,
      })}
      key={index}
    >
      {message.sender.user ? (
        <ListItemAvatar className={`avatar-wrapper ${message.id}`}>
          <ListItemText
            primary={getMessageItem({
              message,
              type: messageTypes.TEXT,
              text: message.content.text,
            })}
          />
          {avatar(message)}
        </ListItemAvatar>
      ) : (
        <>
          <ListItemAvatar
            className={`avatar-wrapper ${message.id}`}
            onMouseEnter={() => handleShowBonusMessage(index, true)}
            onMouseLeave={() => handleShowBonusMessage(index, false)}
          >
            {avatar(message)}
            <div className="list-item-text">
              <ListItemText
                primary={getMessageItem({
                  message,
                  type: messageTypes.TEXT,
                  text: message.content.text,
                })}
              />
            </div>
            <div className="response-right">
              {isShown[index] && (
                <>
                  <div
                    role="button"
                    tabIndex={0}
                    className="heart-comment-icon"
                    onClick={() => handleChangeConfirm(message)}
                  >
                    {message.isConfirm ? (
                      <FavoriteIcon className="icon icon-favorite" />
                    ) : (
                      <FavoriteBorderIcon className="icon" />
                    )}
                  </div>
                  <CommentIcon
                    className="icon comment-icon"
                    onClick={() => IsShowComment(message)}
                  />
                </>
              )}
            </div>
          </ListItemAvatar>
          {message.textComment && !message.isShowComment && (
            <div className="comment">
              <Typography
                className="text-comment"
                variant="caption"
                display="block"
                gutterBottom
              >
                {message.textComment}
              </Typography>
            </div>
          )}
          {message.isShowComment && (
            <div className="comment">
              <InputBase
                className="input-comment"
                placeholder="đóng góp ..."
                value={comment}
                onKeyDown={(e) => handleKeyUp(e, message)}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          )}
        </>
      )}
    </ListItem>
  );
  const getMessageAttachmentByType = ({ attachment, message, index }) => {
    const {
      type,
      payload: { url, elements },
    } = attachment;
    switch (type) {
      case messageTypes.OPTION:
        return (
          <ListItem
            className={clsx('message', {
              client: message.sender.user,
              bot: !message.sender.user,
            })}
            key={message.id}
          >
            {message.sender.user ? (
              <ListItemAvatar className="avatar-wrapper">
                <ListItemText
                  primary={getMessageItem({
                    message,
                    type: messageTypes.OPTION,
                    url,
                  })}
                />
                {avatar(message)}
              </ListItemAvatar>
            ) : (
              <>
                <ListItemAvatar
                  className="avatar-wrapper"
                  onMouseEnter={() => handleShowBonusMessage(index, true)}
                  onMouseLeave={() => handleShowBonusMessage(index, false)}
                >
                  {avatar(message)}
                  <div className="list-item-text">
                    <ListItemText
                      primary={getMessageItem({
                        message,
                        type: messageTypes.OPTION,
                        elements,
                      })}
                    />
                  </div>
                  <div className="response-right">
                    {isShown[index] && (
                      <>
                        <div
                          role="button"
                          tabIndex={0}
                          className="heart-comment-icon"
                          onClick={() => handleChangeConfirm(message)}
                        >
                          {message.isConfirm ? (
                            <FavoriteIcon className="icon icon-favorite" />
                          ) : (
                            <FavoriteBorderIcon className="icon-unlike" />
                          )}
                        </div>
                        <CommentIcon
                          className="icon comment-icon"
                          onClick={() => IsShowComment(message)}
                        />
                      </>
                    )}
                  </div>
                </ListItemAvatar>
                {message.textComment && !message.isShowComment && (
                  <div className="comment">
                    <Typography
                      className="text-comment"
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      {message.textComment}
                    </Typography>
                  </div>
                )}
                {message.isShowComment && (
                  <div className="comment">
                    <InputBase
                      className="input-comment"
                      placeholder="đóng góp ..."
                      value={comment}
                      onKeyDown={(e) => handleKeyUp(e, message)}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                )}
              </>
            )}
          </ListItem>
        );
      case messageTypes.END_CALL:
        return (
          <ListItem
            className={clsx('message', {
              server: !message.sender.user,
            })}
            key={message.id}
          >
            {message.sender.user ? (
              <ListItemAvatar className="avatar-wrapper">
                {avatar()}
                <ListItemText
                  primary={getMessageItem({
                    message,
                    type: messageTypes.END_CALL,
                  })}
                />
              </ListItemAvatar>
            ) : (
              getMessageItem({
                message,
                type: messageTypes.END_CALL,
              })
            )}
          </ListItem>
        );
      default:
    }
    return '';
  };
  const getMessage = (message, index) => {
    if (message.content) {
      const { text, attachment, attachments } = message.content;

      if (text && !attachment && !attachments) {
        return getMessageText(message, index);
      }

      if (attachment) {
        return getMessageAttachmentByType({ attachment, message, text, index });
      }

      if (attachments) {
        // eslint-disable-next-line no-restricted-syntax
        for (const attach of attachments) {
          return getMessageAttachmentByType({
            attachment: attach,
            message,
            text,
            index,
          });
        }
      }
    }
    return '';
  };
  return (
    <MessageContentStyle>
      <div
        className="wrapper"
        id="messageList"
        onScroll={(e) => scrollMessage(e.target)}
      >
        <List className="list">
          {standardMessages.map((message, index) => getMessage(message, index))}
        </List>
      </div>
    </MessageContentStyle>
  );
}
