import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion as m, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  FiPrinter,
  FiX,
  FiChevronDown,
  FiAlertCircle,
  FiAlertTriangle,
  FiCheck,
  FiUploadCloud,
  FiHash,
  FiImage,
  FiLoader,
  FiZap,
  FiActivity,
} from 'react-icons/fi';
import './ProblemReportModal.css';

const PROBLEM_OPTIONS = [
  { value: 'stripes', label: 'Принтер печатает с полосками' },
  { value: 'adf', label: 'Проблема с ADF / копированием / сканером' },
  { value: 'jam', label: 'Заедает бумага' },
];

const URGENCY_OPTIONS = [
  {
    value: 'critical',
    title: 'Принтер полностью остановлен',
    desc: 'Печать и сканирование недоступны',
    icon: <FiAlertTriangle />,
  },
  {
    value: 'partial',
    title: 'Печать возможна, но с дефектом',
    desc: 'Устройство работает частично',
    icon: <FiActivity />,
  },
];

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const ProblemReportModal = ({ open, onClose }) => {
  const reduce = useReducedMotion();
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const selectRef = useRef(null);
  const fileInputRef = useRef(null);

  const [model, setModel] = useState('');
  const [problem, setProblem] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [urgency, setUrgency] = useState('');
  const [files, setFiles] = useState([]);
  const [selectOpen, setSelectOpen] = useState(false);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [dragOver, setDragOver] = useState(false);

  const previews = useMemo(
    () =>
      files.map((f) => ({
        id: f.id,
        name: f.file.name,
        size: f.file.size,
        url: URL.createObjectURL(f.file),
      })),
    [files]
  );

  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
  }, [previews]);

  const resetForm = useCallback(() => {
    setModel('');
    setProblem('');
    setErrorCode('');
    setUrgency('');
    setFiles([]);
    setTouched({});
    setStatus('idle');
    setSelectOpen(false);
  }, []);

  const handleClose = useCallback(() => {
    if (status === 'loading') return;
    onClose?.();
  }, [onClose, status]);

  /* Lock scroll + focus management */
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
  }, [open]);

  /* Reset on close */
  useEffect(() => {
    if (!open) {
      const t = setTimeout(resetForm, 350);
      return () => clearTimeout(t);
    }
  }, [open, resetForm]);

  /* Keyboard: ESC + focus trap */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        handleClose();
      } else if (e.key === 'Tab' && dialogRef.current) {
        const nodes = dialogRef.current.querySelectorAll(focusableSelector);
        if (!nodes.length) return;
        const list = Array.from(nodes).filter((n) => !n.hasAttribute('disabled'));
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, handleClose]);

  /* Click-outside on select */
  useEffect(() => {
    if (!selectOpen) return;
    const onDown = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setSelectOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [selectOpen]);

  const isModelValid = model.trim().length > 0;
  const isProblemValid = problem !== '';
  const canSubmit = isModelValid && isProblemValid && status !== 'loading';

  const addFiles = (incoming) => {
    const list = Array.from(incoming || [])
      .filter((f) => f.type.startsWith('image/'))
      .map((file) => ({ id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`, file }));
    if (list.length) setFiles((prev) => [...prev, ...list]);
  };

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ model: true, problem: true });
    if (!canSubmit) return;
    setStatus('loading');
    try {
      // Simulated submission – wire to real API later.
      await new Promise((res) => setTimeout(res, 1400));
      setStatus('success');
      setTimeout(() => {
        handleClose();
      }, 1800);
    } catch {
      setStatus('error');
    }
  };

  const selectedProblem = PROBLEM_OPTIONS.find((p) => p.value === problem);

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
        initial: { opacity: 0, scale: 0.96, y: 14 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.97, y: 8 },
        transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="prm-backdrop"
          {...backdropAnim}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
          aria-hidden={!open}
        >
          <m.div
            className="prm-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="prm-title"
            aria-describedby="prm-subtitle"
            ref={dialogRef}
            {...panelAnim}
          >
            {/* Success overlay */}
            <AnimatePresence>
              {status === 'success' && (
                <m.div
                  className="prm-success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <m.div
                    className="prm-success-circle"
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <FiCheck />
                  </m.div>
                  <h3>Заявка отправлена</h3>
                  <p>Мы свяжемся с вами в ближайшее время</p>
                </m.div>
              )}
            </AnimatePresence>

            <header className="prm-header">
              <div className="prm-header-text">
                <span className="prm-eyebrow">
                  <FiZap /> Сервисная заявка
                </span>
                <h2 id="prm-title">Опишите проблему</h2>
                <p id="prm-subtitle">
                  Заполните информацию о неисправности принтера для быстрой диагностики
                </p>
              </div>
              <button
                type="button"
                className="prm-close"
                onClick={handleClose}
                aria-label="Закрыть"
                disabled={status === 'loading'}
              >
                <FiX />
              </button>
            </header>

            <form className="prm-form" onSubmit={handleSubmit} noValidate>
              {/* 1. Printer model */}
              <div className="prm-field">
                <label htmlFor="prm-model" className="prm-label">
                  Модель принтера <span className="prm-req">*</span>
                </label>
                <div
                  className={`prm-input-wrap ${
                    touched.model && !isModelValid ? 'is-invalid' : ''
                  }`}
                >
                  <FiPrinter className="prm-input-icon" />
                  <input
                    ref={firstFieldRef}
                    id="prm-model"
                    type="text"
                    className="prm-input"
                    placeholder="Например: Konica Minolta C250i"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, model: true }))}
                    autoComplete="off"
                  />
                </div>
                {touched.model && !isModelValid && (
                  <span className="prm-error">
                    <FiAlertCircle /> Укажите модель принтера
                  </span>
                )}
              </div>

              {/* 2. Problem select */}
              <div className="prm-field">
                <label className="prm-label">
                  Тип проблемы <span className="prm-req">*</span>
                </label>
                <div
                  ref={selectRef}
                  className={`prm-select ${selectOpen ? 'is-open' : ''} ${
                    touched.problem && !isProblemValid ? 'is-invalid' : ''
                  }`}
                >
                  <button
                    type="button"
                    className="prm-select-trigger"
                    aria-haspopup="listbox"
                    aria-expanded={selectOpen}
                    onClick={() => setSelectOpen((v) => !v)}
                    onBlur={() => setTouched((t) => ({ ...t, problem: true }))}
                  >
                    <span
                      className={`prm-select-value ${
                        selectedProblem ? 'has-value' : ''
                      }`}
                    >
                      {selectedProblem ? selectedProblem.label : 'Выберите тип проблемы'}
                    </span>
                    <FiChevronDown className="prm-select-caret" />
                  </button>
                  <AnimatePresence>
                    {selectOpen && (
                      <m.ul
                        className="prm-select-list"
                        role="listbox"
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {PROBLEM_OPTIONS.map((opt) => (
                          <li
                            key={opt.value}
                            role="option"
                            aria-selected={problem === opt.value}
                            className={`prm-select-option ${
                              problem === opt.value ? 'is-selected' : ''
                            }`}
                            onClick={() => {
                              setProblem(opt.value);
                              setSelectOpen(false);
                              setTouched((t) => ({ ...t, problem: true }));
                            }}
                          >
                            <span>{opt.label}</span>
                            {problem === opt.value && <FiCheck />}
                          </li>
                        ))}
                      </m.ul>
                    )}
                  </AnimatePresence>
                </div>
                {touched.problem && !isProblemValid && (
                  <span className="prm-error">
                    <FiAlertCircle /> Выберите тип проблемы
                  </span>
                )}
              </div>

              {/* 3. Error code */}
              <div className="prm-field">
                <label htmlFor="prm-code" className="prm-label">
                  Код ошибки <span className="prm-optional">необязательно</span>
                </label>
                <div className="prm-input-wrap">
                  <FiHash className="prm-input-icon" />
                  <input
                    id="prm-code"
                    type="text"
                    className="prm-input"
                    placeholder="Например: C-2557"
                    value={errorCode}
                    onChange={(e) => setErrorCode(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <span className="prm-hint">
                  Если на экране отображается код ошибки — укажите его
                </span>
              </div>

              {/* 4. Urgency */}
              <div className="prm-field">
                <span className="prm-label">Срочность</span>
                <div className="prm-urgency-grid">
                  {URGENCY_OPTIONS.map((opt) => {
                    const active = urgency === opt.value;
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        className={`prm-urgency-card ${active ? 'is-active' : ''}`}
                        onClick={() => setUrgency(opt.value)}
                      >
                        <span className="prm-urgency-icon">{opt.icon}</span>
                        <span className="prm-urgency-text">
                          <strong>{opt.title}</strong>
                          <small>{opt.desc}</small>
                        </span>
                        <span className="prm-urgency-radio" aria-hidden>
                          <span className="prm-urgency-radio-dot" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Image upload */}
              <div className="prm-field">
                <span className="prm-label">
                  Добавьте фото проблемы <span className="prm-optional">необязательно</span>
                </span>
                <div
                  className={`prm-upload ${dragOver ? 'is-drag' : ''}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    addFiles(e.dataTransfer.files);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                >
                  <FiUploadCloud className="prm-upload-icon" />
                  <div className="prm-upload-text">
                    <strong>Перетащите файлы сюда</strong>
                    <span>или нажмите чтобы выбрать · PNG, JPG до 10MB</span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={(e) => {
                      addFiles(e.target.files);
                      e.target.value = '';
                    }}
                  />
                </div>

                {previews.length > 0 && (
                  <ul className="prm-preview-grid">
                    {previews.map((p) => (
                      <m.li
                        key={p.id}
                        className="prm-preview"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.22 }}
                      >
                        <img src={p.url} alt={p.name} />
                        <button
                          type="button"
                          className="prm-preview-remove"
                          onClick={() => removeFile(p.id)}
                          aria-label={`Удалить ${p.name}`}
                        >
                          <FiX />
                        </button>
                        <span className="prm-preview-meta">
                          <FiImage />
                          {p.name}
                        </span>
                      </m.li>
                    ))}
                  </ul>
                )}
              </div>

              {status === 'error' && (
                <div className="prm-form-error" role="alert">
                  <FiAlertCircle />
                  Не удалось отправить заявку. Попробуйте ещё раз.
                </div>
              )}

              <footer className="prm-footer">
                <button
                  type="button"
                  className="prm-btn prm-btn-ghost"
                  onClick={handleClose}
                  disabled={status === 'loading'}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="prm-btn prm-btn-primary"
                  disabled={!canSubmit}
                >
                  {status === 'loading' ? (
                    <>
                      <FiLoader className="prm-spin" /> Отправка…
                    </>
                  ) : (
                    <>Отправить заявку</>
                  )}
                </button>
              </footer>
            </form>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default ProblemReportModal;
