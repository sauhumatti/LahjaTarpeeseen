'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Status {
  type: '' | 'info' | 'success' | 'error';
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<Status>({ type: '', message: '' });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: 'info', message: 'Lähetetään viestiä...' });

    // In production, you would send this to your API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus({
        type: 'success',
        message: 'Kiitos viestistäsi! Palaamme asiaan mahdollisimman pian.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Viestin lähetys epäonnistui. Yritä uudelleen tai lähetä sähköpostia suoraan.'
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Ota yhteyttä</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nimi
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Sähköposti
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Aihe
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Viesti
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required
              ></textarea>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition"
              >
                Lähetä viesti
              </button>
            </div>

            {status.message && (
              <div className={`p-4 rounded-md ${
                status.type === 'success' ? 'bg-green-50 text-green-700' :
                status.type === 'error' ? 'bg-red-50 text-red-700' :
                'bg-blue-50 text-blue-700'
              }`}>
                {status.message}
              </div>
            )}
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Muut yhteydenottotavat
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sähköposti</h3>
                <p className="text-gray-600">
                  <a 
                    href="mailto:info@lahjatarpeeseen.fi" 
                    className="text-teal-600 hover:text-teal-700"
                  >
                    info@lahjatarpeeseen.fi
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Vastausaika</h3>
                <p className="text-gray-600">
                  Pyrimme vastaamaan kaikkiin yhteydenottoihin 1-2 arkipäivän kuluessa.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Yhteistyö</h3>
                <p className="text-gray-600">
                  Olemme kiinnostuneita yhteistyöstä yritysten kanssa. 
                  Kerro meille ideoistasi, ja katsotaan miten voisimme tehdä yhteistyötä!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-teal-50 rounded-lg p-8 mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Usein kysytyt kysymykset
            </h3>
            <p className="text-gray-600 mb-4">
              Löydät vastauksia yleisimpiin kysymyksiin UKK-sivultamme.
            </p>
            <a 
              href="/ukk" 
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Lue UKK →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}