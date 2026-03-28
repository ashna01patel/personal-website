import { useState } from 'react'
import './Notes.css'

const notes = [
  {
    id: 4,
    title: "What I've been up to lately", 
    date: 'March 13, 2026',
    time: '06:07 PM',
    preview: "You'll find me splitting my time between a few things lately...",
    body: `You'll find me splitting my time between a few things lately. The cliché answer is that I'm deep in using AI coding tools and building things that I'm excited about. 

The less expected one: knitting and crocheting. My mom and grandmother are both creatives, and I'm an artist too — but fiber arts are kind of new for me! Turns out there's a surprising amount of research on it: reduced stress, better cognitive function, lower risk of cognitive decline. One study found that after a single crochet session, experienced crocheters showed faster brain connectivity across regions. It also induces a "beginner's mindset" since every new stitch pattern is basically forcing your brain to rewire.

I fell down the rabbit hole watching Olympic athletes knitting before their events at the Summer '24 and Winter '26 games. Now you'll catch me with a Pomodoro timer running at my desk and knitting during the 5-minute breaks I get. Maybe it's placebo, but I think it scratches a part of my brain in a way that doom-scrolling doesn't.`,
  },
  {
    id: 3,
    title: 'The most underrated skill in product work',
    date: 'March 10, 2026',
    time: '11:15 AM',
    preview: "The art of observation. I'm an ambivert through and through — I can step in and speak...",
    body: `The art of observation. I'm an ambivert through and through — I can step in and speak up when I want to, but I may not be the first one to talk.

As a PM, you're constantly moving between engineers, designers, marketing, customers — you name it. Being an observer lets me do a few things well. In prioritization conversations, I'll sit back for a minute before jumping in — just long enough to clock who wants what and why. Then I can tailor how I bring people to the middle more efficiently. When I'm talking to customers, the same thing applies. Someone might tell me they need a specific feature, but when I watch how they're actually working, I understand their pain through their actions, not just their words. People tell you what they need. They show you what they actually need. Those are different things.

And the third thing — observation usually lets me see a couple steps ahead. I can catch things before they blow up, or nudge someone away from a hole they're about to dig for themselves. I'm not perfect at it and I definitely miss things. But when that happens, you get up, figure out what you missed, learn, and move on.`,
  },
  {
    id: 2,
    title: 'Framework for making hard decisions',
    date: 'March 06, 2026',
    time: '09:37 AM',
    preview: "When I'm stuck on a hard decision — product, career, or personal — I try to do...",
    body: `When I'm stuck on a hard decision — product, career, or personal — I try to do one thing first: slow down before I react. Yeah, yeah, it's not ALWAYS possible, but I try. I've noticed that (better) decisions come about when I give myself permission to just observe the situation before jumping in. Who does this actually affect? What am I optimizing for right now vs. later?

The other thing I've learned is that most hard decisions aren't actually hard. They feel hard because we're inadvertently attached to one of the options. When you try to strip that out, the answer is usually pretty obvious. The work is just getting honest with yourself faster.`,
  },
  {
    id: 1,
    title: 'What "good taste" means to me',
    date: 'March 02, 2026',
    time: '07:25 AM',
    preview: 'Across the industry, AI coding tools are accelerating development at an insane pace...',
    body: `Across the industry, AI coding tools are accelerating development at an insane pace. I built this site and most of my side projects with just a few lines of instructions. But the thing is, speed of development is now table stakes. What's going to define which products get picked up and which get left behind is taste.

To me, good taste is a few things. First, it's defined by who your customer is. You can't have taste in a vacuum — you have to build for them, with them, hand in hand. Second, it's about time to value. How fast can someone get to that "oh, this is exactly what I needed!" moment? And third, it's design. Not just how something looks, but how it feels to use. Does it invoke a sense of delight, or make you feel accomplished? Does it make you want to share it with your friends? That's what good taste is to me.`,
  },
]

export default function Notes() {
  const [activeNote, setActiveNote] = useState(notes[0])

  return (
    <div className="notes-app">
      <div className="notes-sidebar">
        <div className="notes-sidebar-header">Recent thoughts</div>
        {notes.map(note => (
          <div
            key={note.id}
            className={`notes-list-item ${activeNote.id === note.id ? 'active' : ''}`}
            onClick={() => setActiveNote(note)}
          >
            <div className="note-item-title">{note.title}</div>
            <div className="note-item-preview">{note.preview}</div>
          </div>
        ))}
      </div>
      <div className="notes-main">
        <div className="notes-toolbar">
          <div className="notes-format-group">
            <button className="notes-btn">Aa</button>
            <button className="notes-btn">≡</button>
            <button className="notes-btn">⊕</button>
          </div>
        </div>
        <div className="notes-content">
          <div className="notes-placeholder-content">
            <div className="notes-date">{activeNote.date} at {activeNote.time}</div>
            <h2 className="notes-title">{activeNote.title}</h2>
            <div className="notes-body">{activeNote.body}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
