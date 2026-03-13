'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Calendar, Clock, Users, User, Phone, MessageSquare, CheckCircle2, Minus, Plus, AlertCircle } from 'lucide-react';

const generateTimeSlots = () => {
  const slots = [];
  let hour = 12;
  let minute = 30;
  
  while (hour < 23 || (hour === 23 && minute === 0)) {
    const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    slots.push(timeStr);
    
    minute += 30;
    if (minute >= 60) {
      minute = 0;
      hour++;
    }
  }
  
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

export default function ReservationForm() {
  const t = useTranslations('reservation');
  const locale = useLocale();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    observations: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = t('validation.required');
    if (!formData.phone.trim()) newErrors.phone = t('validation.required');
    
    if (!formData.date) {
      newErrors.date = t('validation.required');
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) newErrors.date = t('validation.pastDate');
    }
    
    if (!formData.time) {
      newErrors.time = t('validation.required');
    }
    
    if (formData.guests < 1) newErrors.guests = t('validation.minGuests');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setFormData({ name: '', phone: '', date: '', time: '', guests: 2, observations: '' });
      setErrors({});
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleGuestsChange = (delta: number) => {
    setFormData(prev => ({ ...prev, guests: Math.max(1, prev.guests + delta) }));
  };

  const getWhatsAppMessage = () => {
    return encodeURIComponent(t('whatsappMessage', {
      date: formData.date || '{data}',
      time: formData.time || '{hora}',
      guests: formData.guests || '{pessoas}',
      name: formData.name || '{nome}'
    }));
  };

  const whatsappNumber = '351968707515';
  const phoneNumber = '+351968707515';

  return (
    <div className="relative">
      <div className="bg-red/10 border border-red/20 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-red mt-0.5 flex-shrink-0" />
          <div className="text-sm text-light/80 space-y-1">
            <p className="font-medium text-light">{t('info.schedule')}</p>
            <p>{t('info.minGuests')} · {t('info.allDays')}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-light mb-2">
            <User className="w-4 h-4 text-accent-orange" />
            {t('form.name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-dark-lighter border ${errors.name ? 'border-red' : 'border-light/10'} rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/20 transition-all`}
            placeholder="João Silva"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.name}
            </p>
          )}
        </div>

        <div className="group">
          <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-light mb-2">
            <Phone className="w-4 h-4 text-accent-orange" />
            {t('form.phone')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full bg-dark-lighter border ${errors.phone ? 'border-red' : 'border-light/10'} rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/20 transition-all`}
            placeholder="+351 XXX XXX XXX"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.phone}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="group">
            <label htmlFor="date" className="flex items-center gap-2 text-sm font-medium text-light mb-2">
              <Calendar className="w-4 h-4 text-accent-orange" />
              {t('form.date')}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full bg-dark-lighter border ${errors.date ? 'border-red' : 'border-light/10'} rounded-xl px-4 py-3 text-light focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/20 transition-all`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.date}
              </p>
            )}
          </div>

          <div className="group">
            <label htmlFor="time" className="flex items-center gap-2 text-sm font-medium text-light mb-2">
              <Clock className="w-4 h-4 text-accent-orange" />
              {t('form.time')}
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`w-full bg-dark-lighter border ${errors.time ? 'border-red' : 'border-light/10'} rounded-xl px-4 py-3 text-light focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/20 transition-all`}
            >
              <option value="">Selecione</option>
              {TIME_SLOTS.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            {errors.time && (
              <p className="mt-1 text-sm text-red flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.time}
              </p>
            )}
          </div>
        </div>

        <div className="group">
          <label className="flex items-center gap-2 text-sm font-medium text-light mb-2">
            <Users className="w-4 h-4 text-accent-orange" />
            {t('form.guests')}
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleGuestsChange(-1)}
              disabled={formData.guests <= 1}
              className="bg-dark-lighter border border-light/10 hover:border-accent-orange rounded-lg p-3 transition-all disabled:opacity-50"
            >
              <Minus className="w-5 h-5 text-light" />
            </button>
            
            <div className="flex-1 bg-dark-lighter border border-light/10 rounded-xl px-6 py-3 text-center">
              <span className="text-2xl font-semibold text-light">{formData.guests}</span>
              <span className="text-sm text-light/60 ml-2">
                {formData.guests === 1 ? 'pessoa' : 'pessoas'}
              </span>
            </div>
            
            <button
              type="button"
              onClick={() => handleGuestsChange(1)}
              className="bg-dark-lighter border border-light/10 hover:border-accent-orange rounded-lg p-3 transition-all"
            >
              <Plus className="w-5 h-5 text-light" />
            </button>
          </div>
        </div>

        <div className="group">
          <label htmlFor="observations" className="flex items-center gap-2 text-sm font-medium text-light mb-2">
            <MessageSquare className="w-4 h-4 text-accent-orange" />
            {t('form.observations')}
          </label>
          <textarea
            id="observations"
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            rows={3}
            className="w-full bg-dark-lighter border border-light/10 rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:border-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange/20 transition-all resize-none"
            placeholder="Algum pedido especial?"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-red to-red-dark hover:from-red-light hover:to-red text-light px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-red/40 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? t('form.submitting') : t('form.submit')}
        </button>

        <div className="grid sm:grid-cols-2 gap-3">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-light px-6 py-3 rounded-full text-sm font-semibold transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
          
          <a
            href={`tel:${phoneNumber.replace(/\s/g, '')}`}
            className="flex items-center justify-center gap-2 bg-dark-lighter border border-light/10 hover:border-accent-orange text-light px-6 py-3 rounded-full text-sm font-semibold transition-all"
          >
            <Phone className="w-5 h-5" />
            {t('form.callNow')}
          </a>
        </div>
      </form>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-dark/95 backdrop-blur-sm rounded-2xl flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-accent-orange mx-auto mb-4" />
              <h3 className="text-2xl font-serif font-bold text-light mb-2">{t('success.title')}</h3>
              <p className="text-light/70 mb-6">{t('success.message')}</p>
              <button
                onClick={() => setShowSuccess(false)}
                className="text-accent-orange hover:text-accent-yellow transition-colors text-sm font-medium"
              >
                {t('success.close')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
