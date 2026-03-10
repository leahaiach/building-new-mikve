// app/page.tsx
'use client';
import { useEffect, useState } from 'react';
//import { metadata } from './layout';

type StatsResponse = { count: number };
type PostResponse = { ok?: boolean; count?: number; error?: string };

export default function HomePage() {
  const [count, setCount] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [neighborhood, setNeighborhood] = useState('גבעת מרדכי');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [wantsToVolunteer, setWantsToVolunteer] = useState(false);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
   
  useEffect(() => {
    fetch('/api/signature')
      .then((res) => res.json())
      .then((data: StatsResponse) => setCount(data.count))
      .catch(() => setCount(null));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          neighborhood,
          phone,
          email,
          wantsToVolunteer,
          note,
        }),
      });

      const data: PostResponse = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'אירעה שגיאה בעת שליחת הטופס.');
      } else {
        setSuccessMsg('תודה! החתימה שלך התקבלה.');
        setCount(data.count ?? count);
        setName('');
        setNeighborhood('גבעת מרדכי');
        setPhone('');
        setEmail('');
        setWantsToVolunteer(false);
        setNote('');
      }
    } catch {
      setErrorMsg('לא ניתן להתחבר לשרת. נסו שוב מאוחר יותר.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>

      <header className="hero">
        <div className="hero-overlay" />
        <div className="hero-inner">
          <h1> בגבעת מרדכי בונות יחד מקווה חדש לכולן</h1>
          <p className="hero-subtitle">
        החתימה שלך מצטרפת לקולות התושבות המבקשות מקווה טהרה מכובד 
            לנשות השכונה .
          </p>
          <div className="hero-stats-row">
            <div className="hero-count-card">
              <span className="hero-count-number">
                {count === null ? '—' : count}
              </span>
              <span className="hero-count-label">חתימות עד עכשיו</span>
            </div>
            <a href="#signature-form" className="hero-cta">
          מצטרפת 
            </a>
          </div>
        </div>
      </header>

      <main>
  {/* Content */}
<div style={{
  backgroundImage: "url('/mikve.png')",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  opacity: 0.2, // Transparency
  zIndex: -1,
  backgroundSize: 'cover'
}}>
</div>

        <section className="section section-grid">
          <div>
            <h2>למה אנחנו צריכות מקווה חדש?</h2>
            
            <p>
              יוזמה זו נועדה לרכז חתימות של תושבות השכונה כדי להציג תמונה ברורה
              לרשויות ולגופים הרלוונטיים, ולהראות שיש רצון אמיתי ומכובד לבניית מקווה חדש
            </p>
          </div>
          <div className="section-highlight-box">
            <h3>מה חשוב לנו?</h3>
            <ul className="bullet-list">
              <li> להתאחד יחד ובשלום למטרה אחת : בניית מקווה חדש</li>
              <li>     להראות לגורמים הרלוונטיים בעירייה כי יש רצון אמיתי לבניית מקווה חדש</li>
            </ul>
          </div>
        </section>

        <section className="section section-accent">
          <h2>כמות החתימות עד עכשיו</h2>
          <p className="counter">
            נכון לעכשיו חתמו{' '}
            
              {count === null ? '—' : `${count} תושבות מגבעת מרדכי`}
            
            .
          </p>
          <p className="muted">
            כל חתימה נוספת מחזקת את קול הקהילה מול מקבלי ההחלטות ומקדמת אותנו צעד נוסף
            לעבר מקווה חדש, מכובד וראוי לשם שמים.
          </p>
        </section>

        <section id="signature-form" className="section section-form">
          <h2>חותמות  </h2>
          <p className="muted">
            אנא מלאו את הפרטים בטופס. שם וטלפון משמשים לאימות ולקשר במידת הצורך בלבד.
            ניתן לסמן אם תרצו להצטרף גם למעגל המתנדבות לקידום הפרויקט.
          </p>

          <form onSubmit={handleSubmit} className="form-card">
            <div className="form-grid">
              <label>
                שם פרטי ומשפחה (חובה)
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="לדוגמה: יעל כהן"
                />
              </label>

              <label>
                שכונה
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="גבעת מרדכי או שכונה אחרת"
                />
              </label>
            </div>

            <div className="form-grid">
              <label>
                טלפון (חובה)
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="מספר טלפון לניהול קשר במידת הצורך"
                />
              </label>

              <label>
                אימייל (לא חובה)
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="למשל: name@example.com"
                />
              </label>
            </div>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={wantsToVolunteer}
                onChange={(e) => setWantsToVolunteer(e.target.checked)}
              />
              אני מעוניינת להצטרף למעגל המתנדבים לקידום הפרויקט
            </label>

            <label>
              הערה (לא חובה)
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="אפשר לכתוב הערה, מחשבה או הצעה לשיפור"
              />
            </label>

            {errorMsg && <div className="alert error">{errorMsg}</div>}
            {successMsg && <div className="alert success">{successMsg}</div>}

            <button type="submit" disabled={loading} className="primary-button">
              {loading ? 'שולח…' : 'שליחת החתימה והצטרפות '}
            </button>
          </form>
        </section>

        <section className="section section-footer">
          <h2>שאלות, רעיונות והצעות</h2>
          <p>
            אם יש לכן שאלות או רעיונות לקידום המהלך בצורה מכובדת ומאחדת,
            נשמח לשמוע:
          </p>
          <p>
          אפשר לפנות במייל  :{' '}
            <a href="mailto:aiach.leah@gmail.com">  mikvegm@gmail.com</a>
          </p>
        </section>

      </main>
    </>
  );
}