'use client'

import { ArrowLeft, HelpCircle, MessageCircle, Phone, Mail, ExternalLink } from 'lucide-react'

interface HelpPageProps {
  onBack: () => void
}

export default function HelpPage({ onBack }: HelpPageProps) {
  const helpTopics = [
    {
      title: 'Getting Started',
      items: [
        'How to set up WhatsApp Web',
        'Linking your phone to WhatsApp Web',
        'Troubleshooting connection issues',
        'System requirements'
      ]
    },
    {
      title: 'Features',
      items: [
        'Sending messages and media',
        'Voice and video calls',
        'Group chats and management',
        'Status updates'
      ]
    },
    {
      title: 'Privacy & Security',
      items: [
        'End-to-end encryption',
        'Two-step verification',
        'Blocking contacts',
        'Privacy settings'
      ]
    },
    {
      title: 'Account & Profile',
      items: [
        'Changing your profile info',
        'Managing linked devices',
        'Backup and restore',
        'Deleting your account'
      ]
    }
  ]

  const contactOptions = [
    {
      icon: MessageCircle,
      title: 'Chat with us',
      description: 'Get help from our support team',
      action: () => alert('Opening support chat...')
    },
    {
      icon: Phone,
      title: 'Call support',
      description: 'Speak directly with our team',
      action: () => alert('Calling support...')
    },
    {
      icon: Mail,
      title: 'Email us',
      description: 'Send us your questions',
      action: () => alert('Opening email...')
    }
  ]

  return (
    <div className="flex-1 whatsapp-chat-bg">
      {/* Header */}
      <div className="bg-green-600 px-4 py-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-green-700 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-medium text-white">Help Center</h1>
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        {/* Search Help */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <HelpCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-lg font-medium text-gray-800">How can we help you?</h2>
          </div>
          <input
            type="text"
            placeholder="Search for help topics..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Help Topics */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {helpTopics.map((topic, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{topic.title}</h3>
              <ul className="space-y-3">
                {topic.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <button className="text-left text-gray-600 hover:text-green-600 transition-colors flex items-center">
                      <span className="mr-2">•</span>
                      {item}
                      <ExternalLink className="w-3 h-3 ml-2 opacity-50" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Still need help?</h3>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            {contactOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.action}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
              >
                <option.icon className="w-8 h-8 text-green-600 mb-2" />
                <h4 className="font-medium text-gray-800 mb-1">{option.title}</h4>
                <p className="text-sm text-gray-600 text-center">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <details className="border-b border-gray-200 pb-4">
              <summary className="cursor-pointer font-medium text-gray-800 hover:text-green-600">
                How do I link my phone to WhatsApp Web?
              </summary>
              <p className="mt-2 text-gray-600">
                Open WhatsApp on your phone, go to Settings → Linked Devices → Link a Device, 
                then scan the QR code on this page.
              </p>
            </details>
            
            <details className="border-b border-gray-200 pb-4">
              <summary className="cursor-pointer font-medium text-gray-800 hover:text-green-600">
                Why can't I see my messages?
              </summary>
              <p className="mt-2 text-gray-600">
                Make sure your phone is connected to the internet and WhatsApp is running. 
                Messages are synced from your phone to WhatsApp Web.
              </p>
            </details>
            
            <details className="border-b border-gray-200 pb-4">
              <summary className="cursor-pointer font-medium text-gray-800 hover:text-green-600">
                Is WhatsApp Web secure?
              </summary>
              <p className="mt-2 text-gray-600">
                Yes, all messages are end-to-end encrypted. Your messages are never stored on our servers 
                and can only be read by you and the person you're messaging.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
