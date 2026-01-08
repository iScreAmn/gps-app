import React, { useEffect, useMemo, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useLanguage } from "../../hooks/useLanguage";
import "./NewsletterCTA.css";

const API_URL = (() => {
  const envUrl =
    import.meta.env.VITE_API_URL && String(import.meta.env.VITE_API_URL).trim();
  if (envUrl) return envUrl.replace(/\/$/, "");
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return `http://${host}:3001`;
    }
    return "https://gps-app-server.vercel.app";
  }
  return "https://gps-app-server.vercel.app";
})();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsletterCTA = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const isValid = useMemo(() => emailRegex.test(email.trim()), [email]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsMounted(true), 100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!touched) {
      setMessage("");
      return;
    }

    if (!email.trim()) {
      setMessage("");
      return;
    }

    if (!isValid) {
      setMessage("Please enter a valid email");
      setStatus("error");
    } else if (status !== "success") {
      setMessage("");
      setStatus("idle");
    }
  }, [email, isValid, status, touched]);

  const handleChange = (event) => {
    if (!touched) setTouched(true);
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setTouched(true);
      setMessage("Please enter a valid email");
      setStatus("error");
      return;
    }

    if (!isValid) {
      setMessage("Please enter a valid email");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.message || "Subscription failed. Try again.";
        throw new Error(errorMessage);
      }

      setStatus("success");
      setMessage(data?.message || "Thank you! Check your inbox.");
      setEmail("");
      setTouched(false);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setStatus("error");
      setMessage(error.message || "Something went wrong. Try again.");
    }
  };

  const containerClasses = [
    "newsletter-cta",
    isMounted ? "newsletter-cta--visible" : "",
    status === "success" ? "newsletter-cta--success" : "",
    status === "error" ? "newsletter-cta--error" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={containerClasses} aria-live="polite">
      <div className="newsletter-cta__content">
        <h2 className="newsletter-cta__title">{t('newsletter.title')}</h2>
        <form className="newsletter-cta__form" onSubmit={handleSubmit} noValidate>
          <div
            className={[
              "newsletter-cta__input-wrapper",
              touched && !isValid && email
                ? "newsletter-cta__input-wrapper--invalid"
                : "",
              status === "success" ? "newsletter-cta__input-wrapper--success" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <FaEnvelope aria-hidden="true" className="newsletter-cta__icon" />
            <input
              type="email"
              name="email"
              className="newsletter-cta__input"
              placeholder={t('newsletter.email')}
              value={email}
              onChange={handleChange}
              onBlur={() => setTouched(true)}
              aria-label="Email address"
              aria-invalid={touched && !isValid}
              aria-describedby="newsletter-cta-message"
              disabled={status === "loading"}
            />
          </div>
          <button
            type="submit"
            className="newsletter-cta__button"
            disabled={status === "loading"}
          >
            {status === "loading" ? t('newsletter.submitting') : t('newsletter.subscribe')}
          </button>
        </form>

        <div
          id="newsletter-cta-message"
          className={[
            "newsletter-cta__message",
            status === "success" ? "newsletter-cta__message--success" : "",
            status === "error" ? "newsletter-cta__message--error" : "",
            message ? "newsletter-cta__message--visible" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {message}
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;

