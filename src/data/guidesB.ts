import type { GuideArticle } from './guidesRegistry';

export const GUIDES_B: GuideArticle[] = [
  {
    slug: 'vat-explained-add-remove-reverse-calculate',
    title: 'VAT Explained: How to Add VAT, Remove VAT and Reverse-Calculate It',
    metaDescription:
      'Add VAT, remove VAT or reverse-calculate it from a gross price: formulas, the fraction trick, EU and UK standard rates, rounding and common mistakes.',
    intro:
      'Value Added Tax looks simple — one percentage on top of a price — yet it produces a surprising number of everyday errors. Freelancers add it to invoices, shopkeepers take it back out of shelf prices, employees meet it on every receipt, and at some point almost everyone needs to answer one of three questions: what is the gross price including VAT, what is the net price hiding inside a VAT-inclusive total, and how much of that total is the tax itself? The three calculations are short, but the second one is not just the first one run backwards with the same percentage, and that single misunderstanding explains most VAT mistakes. This guide explains what VAT is and why it is charged in stages, gives you the formulas for adding VAT, removing VAT and reverse-calculating the tax content of a gross amount, lists the standard rates used across major European states and the UK, and walks through rounding and the errors that cost people real money. All rates and examples are general information at the time of writing, not tax advice for your specific situation.',
    sections: [
      {
        heading: 'What VAT Is: A Tax on Value Added, Collected in Stages',
        paragraphs: [
          'VAT is a consumption tax. Unlike a sales tax that is charged once at the till, VAT is collected in slices at every stage of the chain from producer to final customer. A manufacturer charges VAT on what it sells and hands that tax to the tax office, but it also reclaims the VAT it paid on its own purchases. A wholesaler and then a retailer do exactly the same. Each business in the chain therefore effectively passes on tax only on the value it added — the difference between its buying and selling prices — which is where the name comes from. The one person who cannot reclaim anything is the final consumer, and that is by design: the consumer quietly bears the full VAT on the final price.',
          'This mechanism explains two things that otherwise seem odd. First, businesses usually think and quote in net prices, because the VAT on their invoices is money passing through rather than revenue. Second, consumer prices in countries with VAT are normally displayed gross — tax included — because the person paying cannot separate the tax out afterwards. When you use the formulas in this guide, always start by asking which figure you actually have: a net amount (before tax) or a gross amount (tax included). Almost every VAT error is, at root, confusing those two starting points.',
        ],
      },
      {
        heading: 'Adding VAT: From Net Price to Gross Price',
        paragraphs: [
          'Adding VAT is the straightforward direction. Take the net price, multiply it by one plus the rate expressed as a decimal, and you have the gross price. In symbols: gross = net × (1 + rate). At a 20% rate the multiplier is 1.20; at 19% it is 1.19. So a service priced at €250 net becomes €250 × 1.20 = €300 gross at 20% VAT, of which €50 is the tax. At the German standard rate of 19%, a net price of €500 becomes €500 × 1.19 = €595 gross, and the VAT content is €95. If you only need the tax amount rather than the gross total, multiply the net price by the rate alone: €500 × 0.19 = €95.',
          'The same arithmetic works line by line on an invoice. Each line’s net amount is taxed at that item’s rate, the VAT amounts are added up, and the invoice total is net total plus VAT total. Where an invoice mixes rates — standard-rated goods alongside reduced-rated items, for example — keep the groups separate and subtotal each rate on its own, because a single blended percentage applied to the whole bill will almost never match the correct sum of the individually taxed lines.',
        ],
      },
      {
        heading: 'Removing VAT: Reverse-Calculating From a Gross Price',
        paragraphs: [
          'Removing VAT is where people go wrong, because the tempting shortcut — knock the percentage off the gross price — is mathematically incorrect. If a price of €300 already includes 20% VAT, the net price is not €300 minus 20% of €300. The 20% was calculated on the smaller net figure, not on the total you are holding. The correct move is to divide by the same multiplier you would use to add the tax: net = gross ÷ (1 + rate). So €300 ÷ 1.20 = €250 net, and the VAT inside the €300 is €300 − €250 = €50. At 19%, a gross price of €595 gives €595 ÷ 1.19 = €500 net and €95 of VAT.',
          'There is an equivalent shortcut worth knowing, often called the fraction trick. The VAT content of a gross price is the fraction rate ÷ (100 + rate) of that gross amount. At 20%, that fraction is 20/120, which simplifies to exactly one sixth: the VAT in any 20%-inclusive price is simply the gross divided by 6 (€300 ÷ 6 = €50). At 19% the fraction is 19/119, about 15.97% of the gross — check it against the example above: €595 × 19/119 = €95. These fractions are also the fastest sanity check on a till receipt or an invoice someone else has prepared for you.',
        ],
      },
      {
        heading: 'Standard Rates Across Europe and the UK',
        paragraphs: [
          'Every EU member state sets its own standard VAT rate, subject to an EU minimum of 15%, and most cluster around one fifth of the price. As commonly published at the time of writing, the standard rates in the largest economies are: Germany 19%, France 20%, Spain 21%, Italy 22% and the Netherlands 21%. The United Kingdom, which runs its own VAT system outside the EU framework, has a standard rate of 20%. Neighbouring states sit in the same broad range, with a few outliers at either end, so never assume a rate you know from one country travels with you to another.',
          'Alongside the standard rate, almost every system has reduced rates for categories such as basic foodstuffs, books, medicines, passenger transport or hospitality, and a small number of zero-rated or exempt categories — and the exact category boundaries differ by country. A book, a meal or a renovation job can legitimately be taxed at three different rates in three different countries. Treat the figures above as orientation only: before issuing invoices or pricing a product for a new market, confirm the current rate for your exact category in the official guidance of that country’s tax authority.',
        ],
      },
      {
        heading: 'Rounding to Cents, and How Invoices Handle It',
        paragraphs: [
          'Real prices rarely divide cleanly, so VAT results are rounded to the nearest cent — and where you round makes a small but real difference. Consider three invoice lines of €10.33 net each at 20%. Taxing line by line: €10.33 × 0.20 = €2.066, which rounds to €2.07 per line, giving €6.21 of VAT in total. Taxing the combined net instead: €30.99 × 0.20 = €6.198, which rounds to €6.20. Both methods are used in practice, and the one-cent gap between them is a normal rounding artefact, not an error — accounting systems and national rules generally accept one consistent method. What matters is that a business picks one approach and applies it consistently, rather than mixing methods until the totals look nicer.',
          'Good invoice practice follows from the calculations above. Show the net amount, the VAT rate applied, the VAT amount and the gross total as separate figures, with a subtotal per rate when more than one rate appears. Give the invoice a unique, sequential number and a clear date, and keep your own copies: if a customer later challenges a total, the invoice itself should contain everything needed to re-derive it. None of this is decoration — a VAT invoice is the document that supports the tax figures both sides report, and it can only do that job if the arithmetic on its face is complete and reproducible.',
        ],
      },
      {
        heading: 'Common VAT Mistakes (and What They Cost)',
        paragraphs: [
          'The classic mistake is taking the percentage of the gross price and calling it the VAT. On a €300 price that includes 20% VAT, 20% of €300 is €60 — but the real VAT content is €50, as the fraction trick shows. Someone who records €60 of VAT and a €240 net price has understated their net revenue by €10 and overstated the tax by €10 on a single €300 sale; repeated across a year of sales, that error grows into a serious bookkeeping problem and a tax return that does not reconcile. The second common mistake is treating add and remove as mirror images: adding 20% and then subtracting 20% does not return you to the start (€250 becomes €300, but €300 minus 20% is €240), because the two percentages act on different bases.',
          'Two quieter errors deserve equal attention. The first is mixing up gross and net when comparing prices: a supplier quoting €1,000 net and another quoting €1,150 gross may look €150 apart, but at 20% VAT the second price is €958.33 net — actually the cheaper offer for a business that reclaims VAT. The second is assuming one rate fits everything on a document: deliveries, mixed bundles and cross-border sales can each carry their own treatment. When a figure matters — a quote, a contract, an annual return — slow down, identify whether each number is net or gross, apply the matching formula from this guide, and let a calculator do the arithmetic while you check the logic.',
        ],
      },
    ],
    relatedToolSlugs: ['vat-calculator', 'invoice-generator'],
    faq: [
      {
        question: 'Are shop prices usually shown with VAT included?',
        answer:
          'In the EU and the UK, prices shown to consumers are normally gross — the shelf or menu price already includes VAT at the applicable rate, and the tax portion is broken out on the receipt. Business-to-business prices are the opposite convention: suppliers usually quote net, with VAT added on the invoice, because registered businesses reclaim it.',
      },
      {
        question: 'Why is the VAT in a €300 price €50 and not €60?',
        answer:
          'Because the 20% rate was charged on the net price, not on the gross total. The net price is €250, and 20% of €250 is €50. The gross €300 is 120% of the net, so the tax inside it is 20/120 — exactly one sixth — of the total: €300 ÷ 6 = €50. Taking 20% of the gross double-counts tax on the tax itself.',
      },
      {
        question: 'Which VAT rate applies to what I sell?',
        answer:
          'Most goods and services take the standard rate of the country where the sale is taxed, but many categories — basic foods, books, medicines, transport, hospitality — carry reduced rates that differ from country to country. There is no universal list. Check the official guidance of the relevant tax authority for your exact product category before pricing or invoicing.',
      },
      {
        question: 'Can I claim VAT back?',
        answer:
          'A VAT-registered business generally can: it offsets the VAT it paid on purchases (input VAT) against the VAT it charged on sales (output VAT) and settles only the difference with the tax office. Private consumers cannot reclaim VAT on their purchases — bearing that final slice of tax is precisely how the system is designed to work.',
      },
    ],
  },
  {
    slug: 'how-to-read-a-bank-statement',
    title: 'How to Read a Bank Statement: Every Column Explained',
    metaDescription:
      'Bank statement columns explained: debits vs credits, running balances, transaction codes, spotting errors, and turning a statement into a simple budget.',
    intro:
      'A bank statement is the official diary of your money: every payment in, every payment out, and the balance that resulted, recorded in the bank’s own bookkeeping language. Most people glance at the closing balance and file it away, which means the document’s real value — catching errors, understanding spending, proving income or expenses — goes unused. The language is the barrier. Words like debit and credit appear to mean the opposite of what everyday speech suggests, transaction descriptions are compressed into codes, and the balance column only makes sense once you know the order the bank processed things in. This guide decodes a statement piece by piece: its anatomy, the debit-and-credit puzzle explained from both points of view, a worked example you can use to verify any running balance yourself, the common descriptions you will meet, how to spot mistakes and duplicate charges, and finally how to turn a pile of statements into a simple budget review — plus why this ordinary-looking document deserves careful, private handling.',
    sections: [
      {
        heading: 'The Anatomy of a Statement: Header, Period and Balances',
        paragraphs: [
          'Every statement opens with identification and framing information. You will find the account holder’s name and address, the account number or IBAN (often partly masked), the branch or bank details, and — most importantly — the statement period: the exact start and end dates the document covers. Statements are snapshots of a defined window, not a live feed, which is why a payment made on the last day sometimes appears on the next statement instead. Many banks also summarise the period near the header: total money in, total money out, and the number of transactions, which gives you a quick reasonableness check before you read a single line.',
          'Two figures frame the whole document: the opening balance and the closing balance. The opening balance is what the account held at the start of the period — it should match the closing balance of the previous statement exactly, and if it does not, something has been restated or missed. The closing balance is the opening balance plus everything that arrived, minus everything that left, during the period. Between those two anchors sits the transaction list, usually in date order, and each row connects the two: start at the opening balance, apply every row in sequence, and you must arrive at the closing balance. That simple chain is the key to verifying a statement yourself, as the worked example below shows.',
        ],
      },
      {
        heading: 'Debit and Credit: Whose Point of View?',
        paragraphs: [
          'Here is the confusion that makes statements feel backwards. In everyday language, a credit sounds like money coming to you and a debit like money leaving — and on your statement that is exactly how it works: credits increase your balance, debits decrease it. The puzzle is why the bank uses those words, and the answer is that the statement is written from the bank’s accounting perspective, not yours. To the bank, the money in your account is a liability — a debt the bank owes you. When you deposit money, the bank’s debt to you grows, and in double-entry bookkeeping an increase in a liability is recorded as a credit. When you spend, the bank’s debt shrinks, recorded as a debit. Your statement is a copy of the bank’s ledger for that liability, which is why the labels describe the bank’s books rather than your wallet.',
          'Once you see it that way, the related vocabulary falls into place. A debit card is named from your side of the transaction: it pulls money straight out of your account, producing debit entries on the statement. A credit card is a separate borrowing account altogether — its statement runs the other way, showing money you owe the card issuer, which is why its layout and wording feel different. On an ordinary current-account statement, though, you only need one reliable rule: money in is a credit, money out is a debit, and the balance column confirms it — if a row makes the balance rise, it was a credit, whatever abbreviation the bank printed beside it.',
        ],
      },
      {
        heading: 'Verifying the Running Balance: A Worked Example',
        paragraphs: [
          'The running balance column is the balance immediately after each transaction, and checking it takes nothing more than addition and subtraction in order. Take an account that opens the month at €1,250.00. Row one is a salary credit of €2,400.00: €1,250.00 + €2,400.00 = €3,650.00. Row two is a rent payment, a debit of €950.00: €3,650.00 − €950.00 = €2,700.00. Row three is a card payment, a debit of €86.40: €2,700.00 − €86.40 = €2,613.60. Row four is a small interest credit of €3.25: €2,613.60 + €3.25 = €2,616.85. If the statement’s closing balance says €2,616.85, the chain is intact.',
          'This five-minute check is more powerful than it looks. If your arithmetic and the bank’s column diverge at a particular row, you have localised the problem to a single transaction — a wrong amount, a duplicated entry or a payment you do not recognise — instead of vaguely distrusting the whole document. Two practical notes: banks process transactions in their own order within a day (often credits before debits), so an intraday difference in ordering is normal and only the end-of-day balance is decisive; and pending card payments may show in your app before they formally enter the statement, so verify against settled, posted entries rather than pending ones.',
        ],
      },
      {
        heading: 'Decoding Transaction Descriptions and Codes',
        paragraphs: [
          'Statement descriptions were designed for computer systems, not readers, so they compress hard. You will meet abbreviations such as DD or D/D for a direct debit (a recurring pull by a company you authorised, like a utility), SO for a standing order (a fixed push you instructed yourself, like rent), POS or similar for a point-of-sale card payment, ATM for a cash withdrawal, and short codes for transfers, fees and interest. The wording beside them usually combines a truncated merchant or sender name with a location or reference — which is why a familiar purchase can appear under an unfamiliar name: card payments are often recorded under the payment processor’s or parent company’s name rather than the shop’s trading name.',
          'When a description defeats you, work through the clues in order: date, amount and the running balance around it. An amount you recognise on an odd date is often a weekend or holiday transaction that posted on the next working day. A small, round, regular amount is probably a subscription or savings transfer; an unfamiliar name with a familiar amount is usually a processor alias — searching the exact description text often identifies the merchant. Keep a simple note of what each recurring code means the first time you decode it, and future statements become a quick scan instead of a research project.',
        ],
      },
      {
        heading: 'Spotting Errors, Duplicates and Charges You Do Not Recognise',
        paragraphs: [
          'Genuine bank arithmetic errors are rare, but wrong charges are not: merchants occasionally bill twice, subscriptions continue after cancellation, a refund is promised and never lands, or an amount is keyed in incorrectly. Read each statement with three specific hunts in mind. First, duplicates: two identical amounts to the same name within a day or two, where you only made one purchase. Second, zombies: recurring debits for services you cancelled or stopped using, which hide easily because each amount is small. Third, strangers: any entry you cannot connect to your own activity after checking the date-and-amount clues in the previous section. Your running-balance check from earlier turns each suspicion into a precise question about one row.',
          'If you find something, act promptly and factually. Note the date, amount and exact description, gather anything that supports your side (a receipt, a cancellation confirmation, your own record of the single genuine purchase), and contact the bank or the merchant through their official channels to dispute or query that specific transaction. Keep the statement and your notes together until it is resolved. What not to do is equally important: do not ignore a small unfamiliar debit because it is small — test charges are a known pattern before larger misuse — and do not rely on memory alone; the whole point of the statement is that it remembers for you.',
        ],
      },
      {
        heading: 'From Statement to Budget — and Handling Statements Safely',
        paragraphs: [
          'A statement you have verified becomes a ready-made budget tool, because it records what you actually did rather than what you planned. Take one month and sort the debits into a handful of honest categories — housing, food, transport, subscriptions, eating out, other — then total each one; converting the statement to a spreadsheet makes this a ten-minute job and lets you sort and sum without touching the original document. Two numbers usually carry the lesson: your largest category that is not housing, and your subscription total, which most people underestimate until they see the debits gathered in one list. Repeat quarterly rather than monthly if time is short; spending patterns are seasonal, and three statements side by side show trends a single month hides.',
          'Finally, treat statements as what they are: some of the most sensitive documents you own. A single statement reveals your income, employer, address, spending habits, subscriptions and account identifiers — a near-complete profile for anyone building a convincing impersonation. Store paper statements somewhere private rather than in open paperwork, keep digital copies in a protected folder rather than an email inbox or a shared drive, and shred or securely delete copies you no longer need. When a lender, landlord or authority legitimately asks for statements, send them through that organisation’s secure channel, share only the period requested, and never post or send full statements to unknown contacts, however official their message appears.',
        ],
      },
    ],
    relatedToolSlugs: ['bank-statement-to-excel', 'receipt-to-expense'],
    faq: [
      {
        question: 'Why does my app balance differ from my statement balance?',
        answer:
          'Because they describe different moments. The statement is a fixed record up to its closing date, while the app shows today, including payments that are still pending — authorised but not yet posted. Pending card payments reduce what you can spend before they formally appear as statement rows, so the two balances legitimately disagree until everything settles.',
      },
      {
        question: 'What is the difference between available balance and current balance?',
        answer:
          'The current (or posted) balance is the result of all settled transactions. The available balance is what you can actually use right now: the current balance minus pending payments and any holds, such as a hotel or car-rental deposit block. A purchase can be refused against the available figure even when the current balance looks comfortably higher.',
      },
      {
        question: 'How long should I keep bank statements?',
        answer:
          'There is no single rule, but keeping several years is common practice: statements serve as proof of income, rent payments and major purchases, and are routinely requested for loan, visa and tenancy applications going back months or years. Digital copies cost nothing to store securely, so most people keep those indefinitely and shred old paper ones.',
      },
      {
        question: 'Is it safe to share a bank statement with someone?',
        answer:
          'Only with a party you have verified, through their secure channel, and only the pages and period they actually need. A statement exposes your income, address, account identifiers and spending pattern. Some organisations accept copies with unrelated details covered; never send full statements to unknown contacts, and never share them in response to an unexpected message.',
      },
    ],
  },
];
