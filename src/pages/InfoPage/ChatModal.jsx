import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion as m, AnimatePresence, useReducedMotion } from 'motion/react';
import { FiX, FiSend, FiPaperclip, FiSmile } from 'react-icons/fi';
import { RiCustomerService2Fill } from 'react-icons/ri';
import './ChatModal.css';

const CM_NS = 'infoPage.chat';

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

  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);

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

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setMessages([
      {
        id: `agent-greet-${Date.now()}`,
        role: 'agent',
        text: tr('greeting'),
        at: new Date(),
      },
    ]);
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 120);
    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimeout(focusTimer);
    };
  }, [open, tr]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        handleClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, handleClose]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
  }, [messages, typing, reduce]);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    setMessages((prev) => [
      ...prev,
      { id: `user-${now.getTime()}`, role: 'user', text, at: now },
    ]);
    setDraft('');
    setTyping(true);
    setTimeout(
      () => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `agent-${Date.now()}`,
            role: 'agent',
            text: tr('autoReply'),
            at: new Date(),
          },
        ]);
      },
      1400 + Math.random() * 600
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
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
                <span className="cm-header-status">
                  <span className="cm-header-dot" aria-hidden />
                  {tr('statusOnline')}
                </span>
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
                {messages.map((msg) => (
                  <m.div
                    key={msg.id}
                    className={`cm-msg cm-msg-${msg.role}`}
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
                      <p className="cm-msg-text">{msg.text}</p>
                      <span className="cm-msg-time">{formatTime(msg.at)}</span>
                    </div>
                  </m.div>
                ))}
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

            <footer className="cm-composer">
              <button
                type="button"
                className="cm-composer-icon"
                aria-label={tr('attachAria')}
                tabIndex={-1}
              >
                <FiPaperclip />
              </button>
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
                className="cm-composer-icon"
                aria-label={tr('emojiAria')}
                tabIndex={-1}
              >
                <FiSmile />
              </button>
              <button
                type="button"
                className="cm-composer-send"
                aria-label={tr('sendAria')}
                onClick={sendMessage}
                disabled={!draft.trim()}
              >
                <FiSend />
              </button>
            </footer>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default ChatModal;
