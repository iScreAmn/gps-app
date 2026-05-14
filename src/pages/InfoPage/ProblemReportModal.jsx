import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  FiScissors,
  FiMaximize2,
  FiLayers,
} from 'react-icons/fi';
import './ProblemReportModal.css';

const PR_NS = 'infoPage.problemReport';

/* ------------------------------------------------------------------ */
/*  Device-type config: model lists + problem mode                     */
/* ------------------------------------------------------------------ */
const DEVICE_DEFS = [
  { value: 'printer', icon: <FiPrinter />, problemMode: 'select', models: null },
  {
    value: 'cutting',
    icon: <FiScissors />,
    problemMode: 'text',
    models: ['IECHO', 'Teneth', 'Ideal'],
  },
  {
    value: 'wideformat',
    icon: <FiMaximize2 />,
    problemMode: 'text',
    models: ['Audley', 'Nocai'],
  },
  {
    value: 'finishing',
    icon: <FiLayers />,
    problemMode: 'text',
    models: ['Ideal', 'Rapid', 'RecoSystems', 'Teneth', 'Matrix'],
  },
];

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* ------------------------------------------------------------------ */
/*  Reusable custom dropdown                                           */
/* ------------------------------------------------------------------ */
const Dropdown = ({
  value,
  options,
  placeholder,
  invalid,
  onChange,
  onBlur,
  leadingIcon,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div
      ref={ref}
      className={`prm-select ${open ? 'is-open' : ''} ${invalid ? 'is-invalid' : ''}`}
    >
      <button
        type="button"
        className={`prm-select-trigger ${leadingIcon ? 'has-leading' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onBlur={onBlur}
      >
        {leadingIcon && <span className="prm-select-leading">{leadingIcon}</span>}
        <span className={`prm-select-value ${selected ? 'has-value' : ''}`}>
          {selected ? selected.label : placeholder}
        </span>
        <FiChevronDown className="prm-select-caret" />
      </button>
      <AnimatePresence>
        {open && (
          <m.ul
            className="prm-select-list"
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={value === opt.value}
                className={`prm-select-option ${
                  value === opt.value ? 'is-selected' : ''
                }`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                <span className="prm-select-option-text">
                  {opt.icon && <span className="prm-select-option-icon">{opt.icon}</span>}
                  {opt.label}
                </span>
                {value === opt.value && <FiCheck />}
              </li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ================================================================== */
const ProblemReportModal = ({ open, onClose }) => {
  const { t, i18n } = useTranslation();
  const prmLang =
    String(i18n.resolvedLanguage || i18n.language || 'ka').split('-')[0] === 'ka'
      ? 'ka'
      : 'en';

  const reduce = useReducedMotion();
  const tr = useCallback((key) => t(`${PR_NS}.${key}`), [t]);

  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const fileInputRef = useRef(null);

  const [deviceType, setDeviceType] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [problemSelect, setProblemSelect] = useState('');
  const [problemText, setProblemText] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [urgency, setUrgency] = useState('');
  const [files, setFiles] = useState([]);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');
  const [dragOver, setDragOver] = useState(false);

  const currentDevice = DEVICE_DEFS.find((d) => d.value === deviceType);

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
    setDeviceType('');
    setDeviceModel('');
    setProblemSelect('');
    setProblemText('');
    setErrorCode('');
    setUrgency('');
    setFiles([]);
    setTouched({});
    setStatus('idle');
  }, []);

  const handleClose = useCallback(() => {
    if (status === 'loading') return;
    onClose?.();
  }, [onClose, status]);

  /* Body-scroll lock + autofocus */
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimeout(focusTimer);
    };
  }, [open]);

  /* Reset shortly after close so the exit animation doesn't flash empty */
  useEffect(() => {
    if (!open) {
      const tm = setTimeout(resetForm, 350);
      return () => clearTimeout(tm);
    }
  }, [open, resetForm]);

  /* Clear dependent state when device type changes */
  useEffect(() => {
    setDeviceModel('');
    setProblemSelect('');
    setProblemText('');
    setErrorCode('');
    setTouched((p) => ({ ...p, model: false, problem: false }));
  }, [deviceType]);

  /* ESC + focus trap */
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

  /* Validation */
  const isDeviceValid = deviceType !== '';
  const hasPresetModels = currentDevice?.models != null;
  const showModelField = deviceType !== '';
  const modelRequired = deviceType === 'printer';
  const isModelValid =
    !showModelField || !modelRequired || deviceModel.trim().length > 0;
  const isProblemValid =
    currentDevice?.problemMode === 'select'
      ? problemSelect !== ''
      : currentDevice?.problemMode === 'text'
        ? problemText.trim().length > 0
        : false;
  const canSubmit =
    isDeviceValid && isModelValid && isProblemValid && status !== 'loading';

  const addFiles = (incoming) => {
    const list = Array.from(incoming || [])
      .filter((f) => f.type.startsWith('image/'))
      .map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
        file,
      }));
    if (list.length) setFiles((prev) => [...prev, ...list]);
  };

  const removeFile = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ device: true, model: true, problem: true });
    if (!canSubmit) return;
    setStatus('loading');
    try {
      await new Promise((res) => setTimeout(res, 1400));
      setStatus('success');
      setTimeout(() => handleClose(), 1800);
    } catch {
      setStatus('error');
    }
  };

  /* Dropdown option lists */
  const printerProblems = useMemo(() => {
    const arr = t(`${PR_NS}.printerProblems`, { returnObjects: true });
    return Array.isArray(arr) ? arr : [];
  }, [t]);

  const deviceOptions = DEVICE_DEFS.map((d) => ({
    value: d.value,
    label: tr(`devices.${d.value}`),
    icon: d.icon,
  }));
  const modelOptions = currentDevice?.models
    ? currentDevice.models.map((mname) => ({ value: mname, label: mname }))
    : [];
  const problemOptions = printerProblems.map((label, i) => ({
    value: `p${i}`,
    label,
  }));

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
            data-prm-lang={prmLang}
            role="dialog"
            aria-modal="true"
            aria-labelledby="prm-title"
            aria-describedby="prm-subtitle"
            ref={dialogRef}
            {...panelAnim}
          >
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
                  <h3>{tr('successTitle')}</h3>
                  <p>{tr('successDesc')}</p>
                </m.div>
              )}
            </AnimatePresence>

            <header className="prm-header">
              <div className="prm-header-text">
                <span className="prm-eyebrow">
                  <FiZap /> {tr('eyebrow')}
                </span>
                <h2 id="prm-title">{tr('title')}</h2>
                <p id="prm-subtitle">{tr('subtitle')}</p>
              </div>
            </header>

            <form className="prm-form" onSubmit={handleSubmit} noValidate>
              {/* 1. Device type */}
              <div className="prm-field">
                <label className="prm-label">
                  {tr('deviceLabel')} <span className="prm-req">*</span>
                </label>
                <Dropdown
                  value={deviceType}
                  options={deviceOptions}
                  placeholder={tr('devicePlaceholder')}
                  invalid={touched.device && !isDeviceValid}
                  onChange={(v) => {
                    setDeviceType(v);
                    setTouched((p) => ({ ...p, device: true }));
                  }}
                  onBlur={() => setTouched((p) => ({ ...p, device: true }))}
                  leadingIcon={currentDevice?.icon}
                />
                {touched.device && !isDeviceValid && (
                  <span className="prm-error">
                    <FiAlertCircle /> {tr('errDevice')}
                  </span>
                )}
              </div>

              {/* 2a. Model — every device; preset list or free text (printer) */}
              <AnimatePresence initial={false}>
                {showModelField && (
                  <m.div
                    key={`model-field-${deviceType}`}
                    className="prm-field"
                    initial={{ opacity: 0, height: 0, marginTop: -10 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
                    exit={{ opacity: 0, height: 0, marginTop: -10 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <label
                      className="prm-label"
                      {...(!hasPresetModels ? { htmlFor: 'prm-model-free' } : {})}
                    >
                      {tr('modelLabel')}{' '}
                      {modelRequired ? (
                        <span className="prm-req">*</span>
                      ) : (
                        <span className="prm-optional">{tr('optional')}</span>
                      )}
                    </label>
                    {hasPresetModels ? (
                      <Dropdown
                        value={deviceModel}
                        options={modelOptions}
                        placeholder={tr('modelPlaceholder')}
                        invalid={touched.model && !isModelValid}
                        onChange={(v) => {
                          setDeviceModel(v);
                          setTouched((p) => ({ ...p, model: true }));
                        }}
                        onBlur={() => setTouched((p) => ({ ...p, model: true }))}
                      />
                    ) : (
                      <div
                        className={`prm-input-wrap ${
                          touched.model && !isModelValid ? 'is-invalid' : ''
                        }`}
                      >
                        <input
                          id="prm-model-free"
                          type="text"
                          className="prm-input"
                          placeholder={tr('modelFreePlaceholder')}
                          value={deviceModel}
                          onChange={(e) => setDeviceModel(e.target.value)}
                          onBlur={() => setTouched((p) => ({ ...p, model: true }))}
                          autoComplete="off"
                        />
                      </div>
                    )}
                    {touched.model && !isModelValid && (
                      <span className="prm-error">
                        <FiAlertCircle /> {tr('errModel')}
                      </span>
                    )}
                  </m.div>
                )}
              </AnimatePresence>

              {/* 2b/3. Problem — select (printer) or textarea (others) */}
              <AnimatePresence initial={false} mode="wait">
                {currentDevice?.problemMode === 'select' && (
                  <m.div
                    key="problem-select"
                    className="prm-field"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                  >
                    <label className="prm-label">
                      {tr('problemLabel')} <span className="prm-req">*</span>
                    </label>
                    <Dropdown
                      value={problemSelect}
                      options={problemOptions}
                      placeholder={tr('problemSelectPlaceholder')}
                      invalid={touched.problem && !isProblemValid}
                      onChange={(v) => {
                        setProblemSelect(v);
                        setTouched((p) => ({ ...p, problem: true }));
                      }}
                      onBlur={() => setTouched((p) => ({ ...p, problem: true }))}
                    />
                    {touched.problem && !isProblemValid && (
                      <span className="prm-error">
                        <FiAlertCircle /> {tr('errProblem')}
                      </span>
                    )}
                  </m.div>
                )}

                {currentDevice?.problemMode === 'text' && (
                  <m.div
                    key="problem-text"
                    className="prm-field"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                  >
                    <label htmlFor="prm-problem-text" className="prm-label">
                      {tr('problemTextLabel')} <span className="prm-req">*</span>
                    </label>
                    <textarea
                      id="prm-problem-text"
                      className={`prm-textarea ${
                        touched.problem && !isProblemValid ? 'is-invalid' : ''
                      }`}
                      placeholder={tr('problemTextPlaceholder')}
                      rows={3}
                      value={problemText}
                      onChange={(e) => setProblemText(e.target.value)}
                      onBlur={() => setTouched((p) => ({ ...p, problem: true }))}
                    />
                    {touched.problem && !isProblemValid && (
                      <span className="prm-error">
                        <FiAlertCircle /> {tr('errProblem')}
                      </span>
                    )}
                  </m.div>
                )}
              </AnimatePresence>

              {/* 4. Error code (optional) — printers only */}
              <AnimatePresence initial={false}>
                {deviceType === 'printer' && (
                  <m.div
                    key="error-code-field"
                    className="prm-field"
                    initial={{ opacity: 0, height: 0, marginTop: -10 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
                    exit={{ opacity: 0, height: 0, marginTop: -10 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <label htmlFor="prm-code" className="prm-label">
                      {tr('errorCodeLabel')}{' '}
                      <span className="prm-optional">{tr('optional')}</span>
                    </label>
                    <div className="prm-input-wrap">
                      <FiHash className="prm-input-icon" />
                      <input
                        id="prm-code"
                        type="text"
                        className="prm-input"
                        placeholder={tr('errorCodePlaceholder')}
                        value={errorCode}
                        onChange={(e) => setErrorCode(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                    <span className="prm-hint">{tr('errorCodeHint')}</span>
                  </m.div>
                )}
              </AnimatePresence>

              {/* 5. Urgency */}
              <div className="prm-field">
                <span className="prm-label">{tr('urgencyLabel')}</span>
                <div className="prm-urgency-grid">
                  {[
                    {
                      value: 'critical',
                      title: tr('urgencyCriticalTitle'),
                      icon: <FiAlertTriangle />,
                    },
                    {
                      value: 'partial',
                      title: tr('urgencyPartialTitle'),
                      icon: <FiActivity />,
                    },
                  ].map((opt) => {
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
                        </span>
                        <span className="prm-urgency-radio" aria-hidden>
                          <span className="prm-urgency-radio-dot" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. Upload */}
              <div className="prm-field">
                <span className="prm-label">
                  {tr('uploadLabel')} <span className="prm-optional">{tr('optional')}</span>
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
                    <strong>{tr('uploadMain')}</strong>
                    <span>{tr('uploadSub')}</span>
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
                          aria-label={`${tr('removeAria')}: ${p.name}`}
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
                  {tr('formError')}
                </div>
              )}

              <footer className="prm-footer">
                <button
                  type="button"
                  className="prm-btn prm-btn-ghost"
                  onClick={handleClose}
                  disabled={status === 'loading'}
                >
                  {tr('cancel')}
                </button>
                <button
                  type="submit"
                  className="prm-btn prm-btn-primary"
                  disabled={!canSubmit}
                >
                  {status === 'loading' ? (
                    <>
                      <FiLoader className="prm-spin" /> {tr('submitting')}
                    </>
                  ) : (
                    <>{tr('submit')}</>
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
