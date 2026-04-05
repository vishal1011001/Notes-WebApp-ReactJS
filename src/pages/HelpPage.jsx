import { useState } from "react";
import './HelpPage.css';
import { useNavigate } from "react-router-dom";
export default function HelpPage({ API_URL }) {
  const [fbInput, setFbInput] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const navigate = useNavigate();

  const faqs = [
    {
      id: 1,
      question: "How do I create a new note?",
      answer: "Click on the input field at the top of the notes list. Type your note content and click 'ADD' to store it. Your note will be instantly saved to your account."
    },
    {
      id: 2,
      question: "Can I search through my notes?",
      answer: "Yes! Use the search bar at the top of your notes list to find notes by keywords, titles, or content. The search returns results in real-time as you type, making it easy to locate specific notes quickly."
    },
    {
      id: 3,
      question: "How do I delete a note?",
      answer: "Open the note you want to delete and click the 'Delete' button (usually represented by a trash icon). Once deleted, the note cannot be recovered, so make sure you no longer need it."
    },
    {
      id: 4,
      question: "Are my notes accessible from multiple devices?",
      answer: "Yes! Once you log into your account on any device, all your notes are automatically synced and accessible. Your notes are stored securely on our servers and will appear across all your devices in real-time."
    },
    {
      id: 5,
      question: "Is my data encrypted and secure?",
      answer: "Your privacy and security are our top priority. All your notes are encrypted and stored securely on our servers. Your account is protected with authentication, and we never share your personal data with third parties."
    },
    {
      id: 6,
      question: "Can I export or backup my notes?",
      answer: "Currently, all your notes are automatically backed up on our servers. You can view, edit, and organize them anytime you're logged in. For additional backup copies, you can manually copy and save your note content as needed."
    }
  ];

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleSend = async () => {
    const msg = fbInput;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/help/feedback`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: msg }),
      })

      if (response.ok) {
        setFbInput('');
      } else {
        throw new Error("Error sending feedback!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleBack = () => {
    navigate('/');
  }

  return (
    <div style={{ padding: '3vh' }}>
      <button className="back-button"
        onClick={handleBack}
      >Back To Home</button>

      <div className="faq-div">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-container">
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleFAQ(faq.id)}
              >
                <span>{faq.question}</span>
                <span className={`faq-toggle ${expandedFAQ === faq.id ? 'open' : ''}`}>
                  {expandedFAQ === faq.id ? '−' : '+'}
                </span>
              </button>
              {expandedFAQ === faq.id && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="feedback-div">
          <h3>Help us improve:</h3>
          <textarea className="fb-input-bar"
            onChange={(e) => (setFbInput(e.target.value))}
            value={fbInput}
            placeholder="Enter your feedback" />
          <button onClick={handleSend}
            className="fb-send-button"
          >Send</button>
        </div>
      </div>
    </div>
  );
}