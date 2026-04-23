import { useState, useEffect, useRef } from 'react'

// ========== DATA ==========

const SPELLING_WORDS = {
  easy: [
    { word: 'cat', emoji: '🐱' },
    { word: 'dog', emoji: '🐶' },
    { word: 'sun', emoji: '☀️' },
    { word: 'bee', emoji: '🐝' },
    { word: 'cup', emoji: '🥤' },
    { word: 'hat', emoji: '🎩' },
    { word: 'bus', emoji: '🚌' },
    { word: 'pig', emoji: '🐷' },
    { word: 'car', emoji: '🚗' },
    { word: 'fox', emoji: '🦊' },
    { word: 'bed', emoji: '🛏️' },
    { word: 'egg', emoji: '🥚' },
  ],
  medium: [
    { word: 'house', emoji: '🏠' },
    { word: 'apple', emoji: '🍎' },
    { word: 'heart', emoji: '❤️' },
    { word: 'tiger', emoji: '🐯' },
    { word: 'cloud', emoji: '☁️' },
    { word: 'pizza', emoji: '🍕' },
    { word: 'panda', emoji: '🐼' },
    { word: 'plane', emoji: '✈️' },
    { word: 'ghost', emoji: '👻' },
    { word: 'horse', emoji: '🐴' },
    { word: 'crown', emoji: '👑' },
    { word: 'flower', emoji: '🌸' },
  ],
  hard: [
    { word: 'rainbow', emoji: '🌈' },
    { word: 'elephant', emoji: '🐘' },
    { word: 'unicorn', emoji: '🦄' },
    { word: 'dolphin', emoji: '🐬' },
    { word: 'umbrella', emoji: '☂️' },
    { word: 'sandwich', emoji: '🥪' },
    { word: 'butterfly', emoji: '🦋' },
    { word: 'mountain', emoji: '⟰️' },
    { word: 'dinosaur', emoji: '🦕' },
    { word: 'kangaroo', emoji: '🦘' },
    { word: 'penguin', emoji: '🐧' },
    { word: 'astronaut', emoji: '👩‍🚀' },
  ],
}

const COUNTRIES = [
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'China', flag: '🇨🇳' },
  { name: 'Mexico', flag: '🇲🇽' },
  { name: 'Egypt', flag: '🇪🇬' },
  { name: 'Greece', flag: '🇬🇷' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Ireland', flag: '🇮🇪' },
  { name: 'New Zealand', flag: '🇳🇿' },
  { name: 'Thailand', flag: '🇹🇭' },
  { name: 'Sweden', flag: '🇸🇪' },
]

// ========== HELPERS ==========

const useLocalState = (key, initial) => {
  const [val, setVal] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    } catch { return initial }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
  }, [key, val])
  return [val, setVal]
}

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

// ========== APP ==========

export default function App() {
  const [page, setPage] = useState('home')

  return (
    <div className="app">
      <Header page={page} onBack={() => setPage('home')} />
      {page === 'home'     && <Home onNavigate={setPage} />}
      {page === 'math'     && <Math />}
      {page === 'spelling' && <Spelling />}
      {page === 'geo'      && <Geography />}
      {page === 'todo'     && <Todo />}
    </div>
  )
}

// ========== HEADER ==========

function Header({ page, onBack }) {
  const titles = {
    home: null,
    math: '✏️ Maths',
    spelling: '📖 Spelling',
    geo: '🌍 Geography',
    todo: '✨ My List',
  }

  if (page === 'home') {
    return (
      <header className="app-header">
        <div className="greeting">hello gorgeous ~</div>
        <h1 className="app-title">
          Lily's World <span className="sparkle">✨</span>
        </h1>
      </header>
    )
  }

  return (
    <header className="app-header">
      <button className="back-btn" onClick={onBack}>‹ back</button>
      <h1 className="app-title" style={{ fontSize: '1.8rem' }}>{titles[page]}</h1>
    </header>
  )
}

// ========== HOME ==========

function Home({ onNavigate }) {
  return (
    <div className="page-enter">
      <p className="home-intro">pick a game, darling 💕</p>
      <div className="tile-grid">
        <button className="tile math" onClick={() => onNavigate('math')}>
          <div className="tile-icon">✏️</div>
          <div className="tile-title">Maths</div>
          <div className="tile-sub">+ − × </div>
        </button>
        <button className="tile spelling" onClick={() => onNavigate('spelling')}>
          <div className="tile-icon">📖</div>
          <div className="tile-title">Spelling</div>
          <div className="tile-sub">picture words</div>
        </button>
        <button className="tile geo" onClick={() => onNavigate('geo')}>
          <div className="tile-icon">🌍</div>
          <div className="tile-title">Geography</div>
          <div className="tile-sub">flags & countries</div>
        </button>
        <button className="tile todo" onClick={() => onNavigate('todo')}>
          <div className="tile-icon">📝</div>
          <div className="tile-title">My List</div>
          <div className="tile-sub">things to do</div>
        </button>
      </div>
    </div>
  )
}

// ========== MATH ==========

function Math() {
  const [op, setOp] = useState('+')
  const [streak, setStreak] = useLocalState('lily_math_streak', 0)
  const [question, setQuestion] = useState(() => makeQuestion('+'))
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState('idle') // idle, correct, wrong
  const [celebrating, setCelebrating] = useState(false)
  const inputRef = useRef(null)

  function makeQuestion(operation) {
    let a, b, ans, display
    if (operation === '+') {
      a = rand(1, 50); b = rand(1, 50); ans = a + b
      display = { a, b }
    } else if (operation === '-') {
      a = rand(5, 50); b = rand(1, a); ans = a - b
      display = { a, b }
    } else if (operation === '×') {
      a = rand(2, 10); b = rand(2, 10); ans = a * b
      display = { a, b }
    }
    return { ...display, answer: ans, op: operation }
  }

  const handleOpChange = (newOp) => {
    setOp(newOp)
    setQuestion(makeQuestion(newOp))
    setAnswer('')
    setStatus('idle')
  }

  const check = () => {
    if (answer === '') return
    const correct = parseInt(answer) === question.answer
    setStatus(correct ? 'correct' : 'wrong')
    if (correct) {
      setStreak(streak + 1)
      setCelebrating(true)
      setTimeout(() => {
        setCelebrating(false)
        setQuestion(makeQuestion(op))
        setAnswer('')
        setStatus('idle')
        inputRef.current?.focus()
      }, 1200)
    } else {
      setStreak(0)
      setTimeout(() => {
        setStatus('idle')
        setAnswer('')
        inputRef.current?.focus()
      }, 1000)
    }
  }

  return (
    <div className="page-enter">
      <div className="math-select">
        {['+', '-', '×'].map(o => (
          <button
            key={o}
            className={`op-btn ${op === o ? 'active' : ''}`}
            onClick={() => handleOpChange(o)}
          >
            <div className="op-symbol">{o}</div>
            <div className="op-label">
              {o === '+' ? 'add' : o === '-' ? 'take away' : 'times'}
            </div>
          </button>
        ))}
      </div>

      <div className="streak-bar">
        <span>streak</span>
        <span className="streak-num">{streak}</span>
        <span>🔥</span>
      </div>

      <div className="card">
        <div className="math-question">
          <div className="math-expr">
            {question.a}
            <span className="op-sign">{question.op}</span>
            {question.b}
            <span className="op-sign">=</span>
            <input
              ref={inputRef}
              type="number"
              inputMode="numeric"
              className={`math-input ${status}`}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && check()}
              disabled={status !== 'idle'}
              autoFocus
            />
          </div>
          <button
            className="primary-btn"
            onClick={check}
            disabled={answer === '' || status !== 'idle'}
          >
            {status === 'correct' ? 'Yay! 🌸' : status === 'wrong' ? 'Oops!' : 'Check'}
          </button>
        </div>
      </div>

      {celebrating && <Celebration text="Correct! 💖" />}
    </div>
  )
}

// ========== SPELLING ==========

function Spelling() {
  const [difficulty, setDifficulty] = useLocalState('lily_spell_diff', 'easy')
  const [streak, setStreak] = useLocalState('lily_spell_streak', 0)
  const [current, setCurrent] = useState(() => pick(SPELLING_WORDS.easy))
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('idle')
  const [celebrating, setCelebrating] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    setCurrent(pick(SPELLING_WORDS[difficulty]))
    setInput('')
    setStatus('idle')
  }, [difficulty])

  const check = () => {
    if (input.trim() === '') return
    const correct = input.trim().toLowerCase() === current.word.toLowerCase()
    setStatus(correct ? 'correct' : 'wrong')
    if (correct) {
      setStreak(streak + 1)
      setCelebrating(true)
      setTimeout(() => {
        setCelebrating(false)
        let next = pick(SPELLING_WORDS[difficulty])
        while (next.word === current.word) next = pick(SPELLING_WORDS[difficulty])
        setCurrent(next)
        setInput('')
        setStatus('idle')
        inputRef.current?.focus()
      }, 1200)
    } else {
      setStreak(0)
      setTimeout(() => {
        setStatus('idle')
        inputRef.current?.focus()
      }, 1000)
    }
  }

  return (
    <div className="page-enter">
      <div className="difficulty-row">
        {['easy', 'medium', 'hard'].map(d => (
          <button
            key={d}
            className={`diff-btn ${difficulty === d ? 'active' : ''}`}
            onClick={() => setDifficulty(d)}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="streak-bar">
        <span>streak</span>
        <span className="streak-num">{streak}</span>
        <span>⭐</span>
      </div>

      <div className="card">
        <div className="spell-picture">{current.emoji}</div>
        <p className="spell-hint">can you spell it?</p>
        <input
          ref={inputRef}
          type="text"
          className={`spell-input ${status}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && check()}
          disabled={status !== 'idle'}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="type here..."
        />
        <button
          className="primary-btn"
          onClick={check}
          disabled={input.trim() === '' || status !== 'idle'}
        >
          {status === 'correct' ? 'Perfect! ✨' :
           status === 'wrong' ? `It was "${current.word}"` : 'Check'}
        </button>
      </div>

      {celebrating && <Celebration text="Spell-tacular! ⭐" />}
    </div>
  )
}

// ========== GEOGRAPHY ==========

function Geography() {
  const [streak, setStreak] = useLocalState('lily_geo_streak', 0)
  const [round, setRound] = useState(() => makeGeoRound())
  const [chosen, setChosen] = useState(null)
  const [celebrating, setCelebrating] = useState(false)

  function makeGeoRound() {
    const target = pick(COUNTRIES)
    const distractors = shuffle(COUNTRIES.filter(c => c.name !== target.name)).slice(0, 3)
    const choices = shuffle([target, ...distractors])
    return { target, choices }
  }

  const choose = (country) => {
    if (chosen) return
    setChosen(country.name)
    const correct = country.name === round.target.name
    if (correct) {
      setStreak(streak + 1)
      setCelebrating(true)
      setTimeout(() => {
        setCelebrating(false)
        setRound(makeGeoRound())
        setChosen(null)
      }, 1400)
    } else {
      setStreak(0)
      setTimeout(() => {
        setRound(makeGeoRound())
        setChosen(null)
      }, 1600)
    }
  }

  return (
    <div className="page-enter">
      <div className="streak-bar">
        <span>streak</span>
        <span className="streak-num">{streak}</span>
        <span>🌟</span>
      </div>

      <div className="card">
        <div className="geo-flag">{round.target.flag}</div>
        <p className="geo-prompt">Which country is this?</p>
        <div className="geo-choices">
          {round.choices.map(c => {
            let cls = 'geo-choice'
            if (chosen) {
              if (c.name === round.target.name) cls += ' correct'
              else if (c.name === chosen) cls += ' wrong'
              else cls += ' dimmed'
            }
            return (
              <button key={c.name} className={cls} onClick={() => choose(c)}>
                {c.name}
              </button>
            )
          })}
        </div>
      </div>

      {celebrating && <Celebration text="Brilliant! 🌟" />}
    </div>
  )
}

// ========== TODO ==========

function Todo() {
  const [items, setItems] = useLocalState('lily_todo', [])
  const [draft, setDraft] = useState('')

  const add = () => {
    const text = draft.trim()
    if (!text) return
    setItems([{ id: Date.now(), text, done: false }, ...items])
    setDraft('')
  }

  const toggle = (id) => {
    setItems(items.map(i => i.id === id ? { ...i, done: !i.done } : i))
  }

  const remove = (id) => {
    setItems(items.filter(i => i.id !== id))
  }

  return (
    <div className="page-enter">
      <div className="todo-input-row">
        <input
          className="todo-input"
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder="what do you want to do?"
        />
        <button className="add-btn" onClick={add} aria-label="add">+</button>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          no jobs yet ~ add something cute ✨
        </div>
      ) : (
        <ul className="todo-list">
          {items.map(item => (
            <li key={item.id} className={`todo-item ${item.done ? 'done' : ''}`}>
              <button className="todo-check" onClick={() => toggle(item.id)} aria-label="tick">
                {item.done && '✓'}
              </button>
              <span className="todo-text">{item.text}</span>
              <button className="todo-delete" onClick={() => remove(item.id)} aria-label="remove">
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ========== CELEBRATION ==========

function Celebration({ text }) {
  const confetti = ['🌸', '💖', '✨', '⭐', '🦋', '🌷', '🩷', '💜', '🌟']
  const pieces = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.4,
    emoji: confetti[Math.floor(Math.random() * confetti.length)],
  }))

  return (
    <>
      <div className="celebration">{text}</div>
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti"
          style={{ left: `${p.left}%`, animationDelay: `${p.delay}s` }}
        >
          {p.emoji}
        </div>
      ))}
    </>
  )
}
