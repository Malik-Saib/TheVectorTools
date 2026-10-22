import type { GuideArticle } from './guidesRegistry';

export const GUIDES_C: GuideArticle[] = [
  {
    slug: 'word-count-guide',
    title: 'Word Count Guide: Essays, Speeches, Books and Social Media',
    metaDescription:
      'Word counts explained: why tools disagree, reading time at 200 wpm, speaking time at 130 wpm, typical essay, novel and post lengths, and the character limits that bind.',
    intro: `Word count is the first number anyone asks about a piece of writing, and quietly one of the least standardised numbers in it. Ask two tools how many words the same document contains and you can get two different answers; ask how long the document should be and you get a range that depends on the essay brief, the speech slot, the book genre or the platform it will appear on. Yet the number genuinely matters. Exam boards enforce it, event organisers convert it into minutes, publishers plan catalogues around it, and social platforms stop counting words entirely and switch to characters without telling you. This guide explains the whole chain: why honest tools disagree about a count, how to turn words into reading and speaking time using the standard benchmarks of about 200 words a minute for reading and about 130 for speaking, the typical length conventions for essays, speeches, blog posts and books, the character limits that actually bind online, how to cut a draft to a limit, and finally an honest account of what word count does and does not do for search rankings.`,
    sections: [
      {
        heading: 'Why Two Tools Give You Two Different Counts',
        paragraphs: [
          `A word count is really a tokenisation decision: a rule for what counts as one word. Most tools treat a hyphenated compound such as "state-of-the-art" or "well-known" as a single word, and a formatted number such as "1,250" as a single word too. Others split on every hyphen and count three or four words where the first tool counted one. The same disagreement applies to contractions, to words joined by an em dash with no spaces around it, and to web addresses and email addresses, which most counters treat as one token however long they are. None of these tools is lying; they are applying different rules at the edges, which is why counts on the same text routinely differ by a percent or two.`,
          `The second cause is scope: what parts of the document are being counted at all. Depending on its settings, a word processor may include footnotes, endnotes, text boxes, headers, footers and captions in its total, while an online counter only sees the text you actually selected and pasted. Paste the body of a report but not its footnotes and the count falls, even though nothing was deleted. Tables, pull quotes and repeated page headers widen the gap further. For everyday drafting the difference is noise, but for a strict submission limit the only safe approach is to count the way the receiver counts: if an exam board or a journal specifies a tool or a convention, test your final draft against that convention, not against whichever counter happens to be open.`,
        ],
      },
      {
        heading: 'From Words to Time: Reading and Speaking Benchmarks',
        paragraphs: [
          `Reading time is a simple division once you accept a benchmark. The figure most counters use for average adult silent reading of English is about 200 words per minute: unhurried enough for ordinary articles and fiction, optimistic for dense technical or legal text, where 100 to 150 words per minute is more realistic because readers pause, re-read and check references. At 200 words per minute, a 1,000-word article takes about 5 minutes, a 2,000-word essay about 10 minutes, and a 5,000-word report chapter about 25 minutes. Publishers and websites display reading time precisely because it lets a reader budget attention before starting, and it is always an estimate for a typical reader, never a promise about you.`,
          `Speaking is slower, because breath, emphasis and pauses are part of the delivery. The standard presentation benchmark is about 130 words per minute, which is the figure our word counter uses for speaking time. The worked conversion every speaker needs is this: minutes multiplied by 130 gives words. A 10-minute talk therefore needs about 1,300 words of script — and if two of those ten minutes are reserved for questions, you are really scripting 8 minutes, which is about 1,040 words. The same arithmetic explains audiobooks: a 90,000-word novel read aloud at 130 words per minute runs for roughly 692 minutes, about eleven and a half hours, which is exactly the length of a typical unabridged audiobook. Treat the formula as a starting point and time one rehearsed page, then scale; your own pace beats any benchmark.`,
        ],
      },
      {
        heading: 'How Long Should It Be? Typical Lengths for Essays, Posts and Books',
        paragraphs: [
          `In education and on the web, quoted lengths are conventions set by briefs and habits, not laws of nature. School essays are commonly set at 500 to 1,000 words, undergraduate assignments more often at 1,500 to 3,000, and many institutions allow a tolerance of about ten percent either side of the stated figure — but the brief in front of you always overrules the convention, and markers may stop reading at the limit. Blog posts are commonly published at somewhere between 1,000 and 2,000 words, which reflects how much space a typical how-to topic needs rather than any platform requirement; a short announcement or a news update may be complete at 400 words and lose nothing by it.`,
          `Fiction uses the most formalised conventions of all, taken from publishing and award categories. A short story runs up to about 7,500 words, a novelette from about 7,500 to 17,500, and a novella from about 17,500 to 40,000; above 40,000 a work is categorised as a novel, although commercial adult fiction typically lands between 70,000 and 100,000 words, with fantasy often longer and young adult fiction usually in the 60,000 to 80,000 range. These bands exist so agents, editors and prize judges can shelve things, not because a story fails at 39,000 words. Famous outliers prove the point in both directions: Hemingway's The Old Man and the Sea is roughly 27,000 words — a novella by the bands above — and nobody considers it unfinished.`,
        ],
      },
      {
        heading: 'When Characters, Not Words, Are the Real Limit',
        paragraphs: [
          `Several platforms never look at your word count at all, because their limit is in characters, spaces included. A post on X is limited to 280 characters, and even that is a weighted count: most characters count as one, characters in Chinese, Japanese and Korean scripts count as two, and every link counts as a fixed 23 characters however long it really is — so a link-heavy post can hit the ceiling at well under fifty words. LinkedIn allows up to 3,000 characters for a post, and an Instagram caption up to 2,200 characters. Working in characters changes how you write: long words, URLs and emoji all spend the same budget, and the character counter, not the word counter, is the tool that tells you the truth.`,
          `Text messages are the sneakiest case, because the limit changes with the content. An SMS written in the basic GSM alphabet allows 160 characters in a single segment. Add one character outside that alphabet — a curly quote, an emoji, or most non-Latin scripts — and the entire message is re-encoded in Unicode, which fits only 70 characters per segment. Long messages are then split into segments of 153 characters (GSM) or 67 (Unicode), because part of each segment is used to stitch the parts back together. So a plain 200-character text is two segments (153 plus 47), while the same 200 characters containing a single emoji become three Unicode segments (67 plus 67 plus 66) — and on plans that bill per segment, one emoji just raised the price of the message by half.`,
        ],
      },
      {
        heading: 'Cutting to a Limit Without Gutting the Piece',
        paragraphs: [
          `Start by turning the cut into a percentage, because that tells you the strategy. A 2,750-word draft that must become 2,500 words needs 250 words removed, which is about nine percent — roughly one word in every eleven. A nine percent cut should be spread across the whole draft, a sentence or two per section, rather than amputating one part and leaving the structure lopsided. Spend the first pass on the cheapest words: throat-clearing openings ("In today's society...", "Since the dawn of time..."), redundant pairs such as "each and every" and "past history", filler intensifiers like "very", "really" and "just", and the weaker of two examples that make the same point.`,
          `The second pass works at sentence level. Turning a passive construction into an active one often saves words as a side effect; two short sentences that repeat the same subject can usually merge into one; and a sentence you stumble over when reading aloud is frequently two sentences compressed into one and can be split and shortened at the same time. Protect the load-bearing material — the thesis, the key evidence and the conclusion are cut last and least, and if the required cut is much larger than ten percent, the honest move is to remove a whole sub-argument cleanly rather than shave every paragraph until the piece says everything weakly. Recount with the same tool the limit will be checked with, and leave a small margin under the ceiling.`,
        ],
      },
      {
        heading: 'Word Count and SEO: The Honest Version',
        paragraphs: [
          `There is no minimum word count for ranking in search results, and search engines do not reward length in itself — Google's representatives have said this repeatedly and consistently for years. A focused 400-word page that completely answers a narrow question can and does outrank a padded 3,000-word page covering the same ground, because the ranking systems are trying to measure whether the searcher got what they came for, not how much text surrounded it. Studies reporting that top-ranking pages "average" a certain length are describing a correlation found in some topics: longer pages often rank because they cover more of the sub-questions searchers ask, not because a counter reached a magic number.`,
          `The practical approach is to let coverage decide length. List the questions a reader with this search genuinely has, answer all of them properly, and stop when there is nothing left that earns its place. Padding — repeated points, generic introductions, paragraphs written to hit a number — adds words without adding coverage, and can work against you by boring the readers who do arrive. Use word count where it is genuinely useful: planning your writing time, estimating reading time for your audience, and matching a brief or a submission limit. As a ranking lever, it simply is not one, and any tool or freelancer who sells it as one is selling you the padding, not the result.`,
        ],
      },
    ],
    relatedToolSlugs: ['word-counter', 'character-counter'],
    faq: [
      {
        question: 'Does a hyphenated word like "well-known" count as one word or two?',
        answer: `Most mainstream tools, including Microsoft Word and our word counter, count a hyphenated compound as one word, because the parts are joined without spaces. A few simple counters split on every hyphen and count two. On a long document the difference is trivial, but against a strict submission limit it can matter, so check borderline cases against the convention your institution or publisher uses.`,
      },
      {
        question: 'How many words do I need for a five-minute speech?',
        answer: `At the standard presentation pace of about 130 words per minute, five minutes needs roughly 650 words — five multiplied by 130. Deliver more slowly and deliberately and it is nearer 600; speak at full conversational speed and you might fit 750. Use the formula to draft, then trust a single timed rehearsal of the actual script over any benchmark.`,
      },
      {
        question: 'Why is the count lower when I paste my document into an online counter?',
        answer: `Your word processor's total usually covers more than the main text: footnotes, endnotes, headers, text boxes and captions can all be included, depending on settings. When you copy into a browser tool you take only the body text, so those elements drop out of the count. Gaps of one to three percent are normal and mean something was counted differently, not that text went missing.`,
      },
      {
        question: 'Is there an ideal word count for a blog post?',
        answer: `No. Published posts commonly land between 1,000 and 2,000 words, but that is an average of what different topics happened to need, not a target to aim at. A narrow question can be answered completely in 500 words, and a full buyer's guide may legitimately need 3,000. Decide length by coverage — answer everything the reader came for, then stop — rather than padding to reach a number.`,
      },
    ],
  },
  {
    slug: 'how-to-schedule-meetings-across-time-zones',
    title: 'How to Schedule Meetings Across Time Zones Without the 2 AM Mistake',
    metaDescription:
      'Schedule across time zones safely: named zones vs offsets, the US-Europe daylight-saving mismatch weeks, date-line traps, three-region overlaps and a checking workflow.',
    intro: `Every cross-time-zone scheduling disaster has the same shape. Someone picks a perfectly reasonable time — 9 AM, say — in their own city, sends the invite, and discovers later that it landed at 2 AM on the other side of the world, or that the weekly call everyone had settled into quietly moved by an hour for three weeks in March. None of this is bad luck, and none of it requires genius to avoid. It is the predictable result of three knowable things: confusing fixed offsets with named time zones, forgetting that the United States and Europe change their clocks on different dates, and ignoring the date line, which can put your Tuesday meeting on somebody else's Wednesday — or their Monday. This guide explains each trap with worked examples you can verify yourself, sets out the least-bad overlap windows when three regions have to meet at once, and finishes with a way of writing meeting times, and a two-minute checking workflow using our time zone converter, that make the 2 AM mistake very hard to repeat.`,
    sections: [
      {
        heading: 'An Offset Is a Number; a Zone Is a Rulebook',
        paragraphs: [
          `An offset such as UTC+5 is pure arithmetic: five hours ahead of Coordinated Universal Time, always, in every month of the year. A named zone such as America/New_York or Europe/London is something different — a rulebook that says which offset applies on which date, including when daylight saving starts and ends and how the rules have changed historically. New York is UTC−5 in winter and UTC−4 in summer, and the words "New York time" handle both cases automatically. A bare offset, or an invite created against one, cannot: it keeps applying January's offset to a July meeting. This is why calendar software stores named zones, and why you should always think and schedule in named city zones rather than numbers.`,
          `Abbreviations are where the ambiguity breeds. EST properly means Eastern Standard Time, UTC−5, which New York only observes in winter; in July the same city is on EDT, UTC−4. Most people who write "EST" in summer simply mean "Eastern Time", but a careful reader — or software — may take them literally and land an hour out. Worse, the same three letters are used for an eastern zone in Australia at UTC+10, and IST can mean India (UTC+5:30), Ireland or Israel depending on who typed it. The fix costs nothing: never schedule by abbreviation. Name the city — "9 AM New York time" can only mean one thing, anywhere on Earth.`,
        ],
      },
      {
        heading: 'Daylight Saving and the Mismatch Weeks',
        paragraphs: [
          `The deepest trap is that the two biggest English-speaking regions do not change their clocks together. In 2026 the United States starts daylight saving on the second Sunday of March (8 March) and ends it on the first Sunday of November (1 November), while the United Kingdom and Europe start on the last Sunday of March (29 March) and end on the last Sunday of October (25 October). For roughly three weeks in spring, and about a week in autumn, the two continents are out of step with each other — and during those windows the normal gap between them is different by one hour, in both directions of the year.`,
          `Here is what that does to a real meeting. New York and London are normally five hours apart: 15:00 in London is 10:00 in New York, in winter and summer alike. But on Monday 16 March 2026, London is still on GMT (UTC+0) while New York has already moved to EDT (UTC−4), so the gap is four hours and 15:00 in London is 11:00 in New York. Nobody changed the invite; the London-anchored call simply arrives an hour later for the New York side, stays wrong for three weeks, then silently returns to normal. Southern-hemisphere zones such as Sydney change on opposite dates again — Sydney is on daylight saving from October to April — which is why the Sydney–London gap swings between nine and eleven hours across the year.`,
        ],
      },
      {
        heading: 'The Date Line: Your Tuesday Is Their Monday',
        paragraphs: [
          `Cross the Pacific and the problem stops being hours and becomes days. Take a concrete case in July: Tuesday 09:00 in Sydney, which is on AEST (UTC+10) in its winter, is exactly the same moment as Monday 16:00 in Los Angeles, on PDT (UTC−7) — a seventeen-hour gap (10 minus −7) that also crosses the date line, so the meeting falls on different weekdays and different calendar dates for the two sides. Run the same pair in the other direction and you manufacture the literal 2 AM mistake: a friendly Monday 09:00 in Los Angeles is Tuesday 02:00 in Sydney. The organiser chose a civilised morning time; the attendee's phone still buzzes in the middle of the night.`,
          `This is why place-free time words are dangerous in international teams. "Tomorrow", "end of day", "by Friday" and "first thing in the morning" all smuggle in an unstated location. A deadline should carry a city and a date: "17:00 Berlin time on Friday 17 July" means the same thing to everyone who reads it. Calendar invites themselves store an absolute instant and display it correctly in each person's local time — the technology is rarely the failure. The failure is the human message wrapped around the invite, the cheerful "see you Tuesday!" that is true for the sender and false for half the attendees. State times for the other person's city and day, not your own, and the whole class of error disappears.`,
        ],
      },
      {
        heading: 'Finding an Overlap When Three Regions Must Meet',
        paragraphs: [
          `Two regions are easy: afternoon in Europe is morning on the US East Coast, and a wide, comfortable window exists. Adding East or Southeast Asia breaks the geometry, because there is no hour of the UTC day that is working hours everywhere. The least-bad meeting point, in summer, is early afternoon UTC. At 14:00 UTC it is 15:00 in London, 16:00 in Berlin, 10:00 in New York, 19:30 in Mumbai and 22:00 in Singapore. Read that list honestly: Europe and the US get a normal working hour, and Asia takes a late evening. Nobody is in the middle of the night, which is the real criterion — the goal is not a perfect slot, it is the slot whose worst hour is the least bad.`,
          `If that series runs weekly, rotate the burden instead of fixing it permanently on the same people. An alternative window at 12:00 UTC in summer gives 08:00 in New York, 13:00 in London, 14:00 in Berlin, 17:30 in Mumbai and 20:00 in Singapore — New York starts early so Singapore can finish at a more reasonable hour, and alternating between the two windows shares the inconvenience visibly and fairly. Some pairings work better than the triangle suggests: the US West Coast and Asia meet comfortably across the Pacific, since 18:00 in Los Angeles is 09:00 the next morning in Singapore. What never works is pretending a single perfect time exists and letting the same region absorb 11 PM forever.`,
        ],
      },
      {
        heading: 'How to Write a Meeting Time So It Cannot Be Misread',
        paragraphs: [
          `There is a confirmation formula that eliminates nearly every ambiguity at once: weekday, full date, 24-hour clock time, named city zone, the UTC equivalent in brackets, and each other side's local time spelled out. It looks like this: "Tuesday 14 July, 15:00 London time (14:00 UTC) — that is 10:00 on Tuesday in New York and 22:00 on Tuesday in Singapore." Writing out the other side's time feels redundant, and that is the point: any error in your conversion shows up as a contradiction the reader can spot, and the weekday-plus-date pairing catches date-line cases, where the same instant is a different weekday for different attendees and an honest confirmation must say so.`,
          `Two smaller habits complete the defence. First, always use the 24-hour clock in writing: "3:00" invites the 3 AM disaster, "15:00" cannot be misread, and "12:00" beats the genuinely ambiguous "noon" conventions some people reverse. Second, set the calendar event itself to the named city zone of the organiser or anchor location — not to a raw offset and never to "floating" time, which displays the same clock reading in every zone and is wrong everywhere except one. Then spot-check the first occurrence of a recurring series after the next clock change in each region involved, because that occurrence, not the first one, is where a wrongly built invite reveals itself.`,
        ],
      },
      {
        heading: 'A Two-Minute Checking Workflow',
        paragraphs: [
          `The workflow has five steps and takes less time than apologising for a missed call. One: choose the anchor city — usually the organiser's location, or the city with the most attendees. Two: enter the candidate time in the time zone converter for the specific date of the meeting, not for today. Three: read off every attendee's local time and, just as carefully, their local day and date, and reject anything that lands in sleeping hours or on a different day than you intended. Four: ask whether any region involved changes its clocks between now and the meeting; if one does, re-verify that exact date rather than trusting a conversion made under today's offsets. Five: send the written confirmation in the formula from the previous section.`,
          `Step two deserves emphasis, because skipping it is the single most common cause of the spring mix-ups. A conversion performed in February for a late-March meeting silently uses February's offsets, and in the mismatch weeks that answer is wrong by an hour — delivered with complete confidence. A proper converter does not use today's offsets at all: it applies the IANA time zone rules for the exact date and minute you enter, including daylight saving, which is precisely the part mental arithmetic cannot do. Make the check a standing habit for any meeting more than two weeks away, or falling anywhere near March, April, October or November, and cross-zone scheduling stops being a lottery.`,
        ],
      },
    ],
    relatedToolSlugs: ['time-zone-converter', 'age-calculator'],
    faq: [
      {
        question: 'Why did my weekly meeting suddenly move by an hour?',
        answer: `Because the invite is anchored to one city's zone, and the two cities changed their clocks on different dates. For a few weeks in spring and autumn — the US already on daylight saving while Europe is not yet, or the reverse in October — the gap between you is an hour different from usual. Nothing is broken; it returns to its old local time once both regions have changed.`,
      },
      {
        question: 'What does "9 AM EST" actually mean if the meeting is in July?',
        answer: `Strictly, EST is Eastern Standard Time, UTC−5 — which New York does not observe in July, when it is on EDT, UTC−4. Almost everyone who writes EST in summer means "Eastern Time" generally, so read it as New York time, but confirm when it matters: the same abbreviation is used for zones elsewhere in the world. When in doubt, ask for the city, not the abbreviation.`,
      },
      {
        question: 'Is there a time of day that works for Europe, the US and Asia together?',
        answer: `Not a comfortable one. The least-bad window is early afternoon UTC: around 14:00 UTC in summer is 10:00 in New York, 15:00 in London, 19:30 in Mumbai and 22:00 in Singapore, so Asia takes a late evening in exchange for nobody taking the middle of the night. For a recurring meeting, alternate with a slightly earlier window so the same people are not always staying up late.`,
      },
      {
        question: 'Should I put UTC in the calendar invite itself?',
        answer: `Put UTC in the written confirmation, where it acts as a neutral reference nobody can misread. In the calendar event itself, set the named city zone of the organiser instead: calendar software then converts correctly for every guest and keeps handling future clock changes, while a raw UTC event, though technically correct, forces each guest to do the conversion in their head every time they glance at it.`,
      },
    ],
  },
];
