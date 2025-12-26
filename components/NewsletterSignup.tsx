'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Check, AlertCircle } from 'lucide-react';
import { subscribeToNewsletter, validateEmail } from '@/lib/newsletter';
import { trackNewsletterSignup } from '@/lib/analytics';

interface NewsletterSignupProps {
  variant?: 'inline' | 'modal' | 'footer';
  source: string;
  showName?: boolean;
  className?: string;
}

export default function NewsletterSignup({
  variant = 'inline',
  source,
  showName = false,
  className = '',
}: NewsletterSignupProps) {
  const t = useTranslations('newsletter');
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage(t('invalidEmail'));
      return;
    }

    // Check GDPR consent
    if (!gdprConsent) {
      setStatus('error');
      setErrorMessage(t('gdprRequired'));
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const result = await subscribeToNewsletter(
        email,
        showName ? name : undefined,
        source
      );

      if (result.success) {
        setStatus('success');
        setEmail('');
        setName('');
        setGdprConsent(false);
        
        // Track analytics
        trackNewsletterSignup(source);
        
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(result.message === 'Already subscribed' 
          ? t('alreadySubscribed') 
          : t('error')
        );
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const variantStyles = {
    inline: 'bg-gray-50 p-6 rounded-lg',
    modal: 'bg-white p-8',
    footer: 'bg-transparent',
  };

  if (status === 'success') {
    return (
      <div className={`${variantStyles[variant]} ${className}`}>
        <div className="flex items-center gap-3 text-green-600">
          <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Check size={24} />
          </div>
          <div>
            <p className="font-semibold">{t('success')}</p>
            <p className="text-sm text-gray-600">{t('successDescription')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${variantStyles[variant]} ${className}`}>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {variant === 'modal' ? t('exitIntent.title') : t('title')}
        </h3>
        <p className="text-gray-600">
          {variant === 'modal' ? t('exitIntent.description') : t('description')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {showName && (
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('namePlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        )}

        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('emailPlaceholder')}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id={`gdpr-${source}`}
            checked={gdprConsent}
            onChange={(e) => setGdprConsent(e.target.checked)}
            className="mt-1 w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
            required
          />
          <label htmlFor={`gdpr-${source}`} className="text-sm text-gray-600">
            {t('gdpr')}
          </label>
        </div>

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Mail size={20} />
          {isSubmitting ? t('subscribing') : t('subscribe')}
        </button>

        <p className="text-xs text-gray-500 text-center">
          {t('privacyNote')}
        </p>
      </form>
    </div>
  );
}
