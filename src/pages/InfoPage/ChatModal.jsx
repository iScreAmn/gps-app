import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion as m, AnimatePresence, useReducedMotion } from 'motion/react';
import { FiX, FiSend, FiPaperclip, FiSmile, FiAlertCircle } from 'react-icons/fi';
import { RiCustomerService2Fill } from 'react-icons/ri';
import './ChatModal.css';

const CM_NS = 'infoPage.chat';
const STORAGE_KEY = 'gps:chat:messages:v1';
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

const readImageAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const loadStoredMessages = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.map((m) => ({ ...m, at: new Date(m.at) }));
  } catch {
    return null;
  }
};

const persistMessages = (msgs) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        msgs.map((m) => ({
          ...m,
          at: m.at instanceof Date ? m.at.toISOString() : m.at,
        }))
      )
    );
  } catch {
    /* quota exceeded — keep in-memory state, skip persistence */
  }
};

const ChatModal = ({ open, onClose }) => {
  const { t, i18n } = useTranslation();
  const lang =
    String(i18n.resolvedLanguage || i18n.language || 'ka').split('-')[0] === 'ka'
      ? 'ka'
      : 'en';
  const reduce = useReducedMotion();
  const tr = useCallback((key) => t(`${CM_NS}.${key}`), [t]);

  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  const [messages, setMessages] = useState(() => loadStoredMessages() || []);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState('');
  const [viewerImage, setViewerImage] = useState(null);
  const [pendingImage, setPendingImage] = useState(null);

  const formatTime = useCallback(
    (date) =>
      new Intl.DateTimeFormat(lang === 'ka' ? 'ka-GE' : 'en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      }).format(date),
    [lang]
  );

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  /* Seed greeting on first open if history is empty */
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setMessages((prev) => {
      if (prev.length > 0) return prev;
      return [
        {
          id: `agent-greet-${Date.now()}`,
          role: 'agent',
          kind: 'text',
          text: tr('greeting'),
          at: new Date(),
        },
      ];
    });
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 120);
    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimeout(focusTimer);
    };
  }, [open, tr]);

  /* Persist on every change */
  useEffect(() => {
    persistMessages(messages);
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        if (viewerImage) setViewerImage(null);
        else handleClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, handleClose, viewerImage]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
  }, [messages, typing, reduce]);

  /* Auto-clear error after a few seconds */
  useEffect(() => {
    if (!error) return;
    const id = setTimeout(() => setError(''), 4000);
    return () => clearTimeout(id);
  }, [error]);

  const scheduleAgentReply = (replyKey = 'autoReply') => {
    setTyping(true);
    setTimeout(
      () => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `agent-${Date.now()}`,
            role: 'agent',
            kind: 'text',
            text: tr(replyKey),
            at: new Date(),
          },
        ]);
      },
      1400 + Math.random() * 600
    );
  };

  const sendMessage = () => {
    const text = draft.trim();
    if (!text && !pendingImage) return;
    const now = new Date();
    const message = {
      id: `user-${now.getTime()}`,
      role: 'user',
      at: now,
    };
    if (pendingImage) {
      message.imageUrl = pendingImage.dataUrl;
      message.imageName = pendingImage.name;
    }
    if (text) message.text = text;

    const hadUserText = messages.some(
      (m) => m.role === 'user' && Boolean(m.text)
    );
    const hadUserImage = messages.some(
      (m) => m.role === 'user' && Boolean(m.imageUrl)
    );
    let replyKey = null;
    if (pendingImage && !hadUserImage) replyKey = 'autoReplyImage';
    else if (text && !hadUserText) replyKey = 'autoReply';

    setMessages((prev) => [...prev, message]);
    setDraft('');
    setPendingImage(null);
    if (replyKey) scheduleAgentReply(replyKey);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleAttachClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError(tr('errImageType'));
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError(tr('errImageSize'));
      return;
    }
    try {
      const dataUrl = await readImageAsDataUrl(file);
      setPendingImage({ dataUrl, name: file.name, size: file.size });
      inputRef.current?.focus();
    } catch {
      setError(tr('errImageRead'));
    }
  };

  const handleEmojiClick = () => {
    /* Focus textarea so the device's native emoji keyboard/picker can be invoked
       (mobile keyboards expose an emoji key; macOS users press Cmd+Ctrl+Space). */
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    const end = el.value.length;
    try {
      el.setSelectionRange(end, end);
    } catch {
      /* some textarea types throw on setSelectionRange */
    }
  };

  const backdropAnim = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
      };
  const panelAnim = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.96, y: 18 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.97, y: 10 },
        transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="cm-backdrop"
          {...backdropAnim}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
          aria-hidden={!open}
        >
          <m.div
            className="cm-panel"
            data-cm-lang={lang}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cm-title"
            ref={dialogRef}
            {...panelAnim}
          >
            <header className="cm-header">
              <div className="cm-header-avatar">
                <RiCustomerService2Fill />
                <span className="cm-header-presence" aria-hidden />
              </div>
              <div className="cm-header-meta">
                <h2 id="cm-title" className="cm-header-name">
                  {tr('title')}
                </h2>
              </div>
              <button
                type="button"
                className="cm-header-close"
                aria-label={tr('closeAria')}
                onClick={handleClose}
              >
                <FiX />
              </button>
            </header>

            <div className="cm-body" ref={scrollRef}>
              <div className="cm-day-sep">
                <span>{tr('today')}</span>
              </div>

              <AnimatePresence initial={false}>
                {messages.map((msg) => {
                  const hasImage = Boolean(msg.imageUrl);
                  const hasText = Boolean(msg.text);
                  return (
                    <m.div
                      key={msg.id}
                      className={`cm-msg cm-msg-${msg.role} ${
                        hasImage ? 'cm-msg-has-image' : ''
                      }`}
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {msg.role === 'agent' && (
                        <span className="cm-msg-avatar" aria-hidden>
                          <RiCustomerService2Fill />
                        </span>
                      )}
                      <div className="cm-msg-bubble">
                        {hasImage && (
                          <button
                            type="button"
                            className="cm-msg-image-btn"
                            onClick={() =>
                              setViewerImage({
                                url: msg.imageUrl,
                                name: msg.imageName,
                              })
                            }
                            aria-label={tr('openImageAria')}
                          >
                            <img
                              src={msg.imageUrl}
                              alt={msg.imageName || tr('imageAlt')}
                            />
                          </button>
                        )}
                        {hasText && <p className="cm-msg-text">{msg.text}</p>}
                        <span className="cm-msg-time">{formatTime(msg.at)}</span>
                      </div>
                    </m.div>
                  );
                })}
              </AnimatePresence>

              <AnimatePresence>
                {typing && (
                  <m.div
                    key="typing"
                    className="cm-msg cm-msg-agent cm-msg-typing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18 }}
                  >
                    <span className="cm-msg-avatar" aria-hidden>
                      <RiCustomerService2Fill />
                    </span>
                    <div className="cm-msg-bubble cm-typing-bubble" aria-label={tr('typingAria')}>
                      <span className="cm-typing-dot" />
                      <span className="cm-typing-dot" />
                      <span className="cm-typing-dot" />
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {error && (
                <m.div
                  className="cm-error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  role="alert"
                >
                  <FiAlertCircle /> {error}
                </m.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {pendingImage && (
                <m.div
                  className="cm-pending"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={pendingImage.dataUrl}
                    alt={pendingImage.name}
                    className="cm-pending-thumb"
                  />
                  <div className="cm-pending-meta">
                    <span className="cm-pending-name">{pendingImage.name}</span>
                    <span className="cm-pending-hint">{tr('pendingHint')}</span>
                  </div>
                  <button
                    type="button"
                    className="cm-pending-remove"
                    aria-label={tr('removePendingAria')}
                    onClick={() => setPendingImage(null)}
                  >
                    <FiX />
                  </button>
                </m.div>
              )}
            </AnimatePresence>

            <footer className="cm-composer">
              <button
                type="button"
                className="cm-composer-icon cm-composer-attach"
                aria-label={tr('attachAria')}
                onClick={handleAttachClick}
                disabled={Boolean(pendingImage)}
              >
                <FiPaperclip />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
              <textarea
                ref={inputRef}
                className="cm-composer-input"
                placeholder={tr('inputPlaceholder')}
                value={draft}
                rows={1}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className="cm-composer-icon cm-composer-emoji"
                aria-label={tr('emojiAria')}
                onClick={handleEmojiClick}
              >
                <FiSmile />
              </button>
              <button
                type="button"
                className="cm-composer-send"
                aria-label={tr('sendAria')}
                onClick={sendMessage}
                disabled={!draft.trim() && !pendingImage}
              >
                <FiSend />
              </button>
            </footer>
          </m.div>

          <AnimatePresence>
            {viewerImage && (
              <m.div
                className="cm-viewer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) setViewerImage(null);
                }}
                role="dialog"
                aria-modal="true"
                aria-label={tr('viewerAria')}
              >
                <button
                  type="button"
                  className="cm-viewer-close"
                  aria-label={tr('closeAria')}
                  onClick={() => setViewerImage(null)}
                >
                  <FiX />
                </button>
                <m.img
                  src={viewerImage.url}
                  alt={viewerImage.name || tr('imageAlt')}
                  className="cm-viewer-img"
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              </m.div>
            )}
          </AnimatePresence>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default ChatModal;
