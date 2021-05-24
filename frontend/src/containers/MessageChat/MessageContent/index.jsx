/* eslint-disable jsx-a11y/no-static-element-interactions */
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
  Icon,
} from '@material-ui/core';
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
  getInfoConfirmMsg,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.arrMessage);
  const [standardMessages, setStandardMessages] = useState([]);
  const [comment, setComment] = useState('');
  const [isShown, setIsShown] = useState([]);

  useEffect(() => {
    if (messages.length === 0) {
      setStandardMessages([]);
    }
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
      dispatch(
        handleCommentMessage({
          messageId: message.messageId,
          textComment: comment,
        }),
      );
    }
  };
  const handleChangeConfirm = (message) => {
    dispatch(
      handleConfirmMessage({
        messageId: message.messageId,
        isConfirm: !message.isConfirm,
      }),
    );
    if (message.nlu && message.nlu.intentId) {
      getInfoConfirmMsg(message.nlu.intentId);
    }
  };
  const onIsShowComment = (message) => {
    dispatch(handleIsShowComment({ messageId: message.messageId }));
    if (message.textComment) {
      setComment(message.textComment);
    } else {
      setComment('');
    }
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
      case messageTypes.VOICE:
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
                  <voice className="media" controls>
                    <source src={url} />
                  </voice>
                ) : (
                  `[${t('voice')}]`
                )}
              </div>
            ) : (
              <div className="message-server">
                {url ? (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <voice className="media" controls>
                    <source src={url} />
                  </voice>
                ) : (
                  `[${t('voice')}]`
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
            // onMouseEnter={() => handleShowBonusMessage(index, true)}
            // onMouseLeave={() => handleShowBonusMessage(index, false)}
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
              <div className="response-right">
                {/* {isShown[index] && (
                  <> */}
                <Tooltip
                  title={t('Câu trả lời bot đoán đúng ')}
                  placement="top"
                >
                  <Icon className="parameter__icon success">check_circle</Icon>
                </Tooltip>
                <div
                  className="heart-comment-icon"
                  onClick={() => handleChangeConfirm(message)}
                >
                  {message.isConfirm ? (
                    <Tooltip
                      title={t('Câu trả lời đã được xác nhận')}
                      placement="top"
                    >
                      <Icon className="parameter__icon heart">favorite</Icon>
                    </Tooltip>
                  ) : (
                    <Tooltip title={t('Thả tim để xác nhận')} placement="top">
                      <Icon className="parameter__icon ">favorite_border</Icon>
                    </Tooltip>
                  )}
                </div>
                <Tooltip title={t('Đóng góp ý kiến')} placement="top">
                  <Icon
                    className="parameter__icon review"
                    onClick={() => onIsShowComment(message)}
                  >
                    rate_review
                  </Icon>
                </Tooltip>
                {/* </>
                )} */}
              </div>
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
                    <div className="response-right">
                      <Tooltip
                        title={t('Câu trả lời bot đoán đúng ')}
                        placement="top"
                      >
                        <Icon className="parameter__icon success">
                          check_circle
                        </Icon>
                      </Tooltip>
                      <div
                        className="heart-comment-icon"
                        onClick={() => handleChangeConfirm(message)}
                      >
                        {message.isConfirm ? (
                          <Tooltip
                            title={t('Câu trả lời đã được xác nhận')}
                            placement="top"
                          >
                            <Icon className="parameter__icon heart">
                              favorite
                            </Icon>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            title={t('Thả tim để xác nhận')}
                            placement="top"
                          >
                            <Icon className="parameter__icon ">
                              favorite_border
                            </Icon>
                          </Tooltip>
                        )}
                      </div>
                      <Tooltip title={t('Đóng góp ý kiến')} placement="top">
                        <Icon
                          className="parameter__icon review"
                          onClick={() => onIsShowComment(message)}
                        >
                          rate_review
                        </Icon>
                      </Tooltip>
                      {/* </>
                )} */}
                    </div>
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
