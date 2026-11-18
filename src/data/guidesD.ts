import type { GuideArticle } from './guidesRegistry';

export const GUIDES_D: GuideArticle[] = [
  {
    slug: `how-currency-conversion-works`,
    title: `How Currency Conversion Works: Mid-Market Rates, Spreads and Fees`,
    metaDescription: `How currency conversion works: the mid-market rate, the spread and the fees providers add, why your rate differs from Google's, and how to compare true cost.`,
    intro: `Search for the price of any currency and you get one clean number: one US dollar equals 0.92 euros, one pound equals 1.17 euros, and so on. It looks like a price you should be able to transact at, but you almost never can. That number is the mid-market rate — a reference point quoted between banks — and every bank, card network, bureau and transfer service you will ever use builds its own, worse rate on top of it by adding a margin called the spread, often plus visible fees on top. The difference between the rate you see and the rate you get is where the entire retail currency industry makes its money, and it is deliberately hard to see, because most providers advertise the fees (small, or "zero") rather than the rate (where the real cost hides). This guide explains what the mid-market rate actually is, how the spread works, where the extra charges sit, and finishes with a fully worked example converting $1,000 into euros three ways, so you can calculate the true cost of any provider before you hand over your money.`,
    sections: [
      {
        heading: `The Mid-Market Rate: A Reference Price, Not an Offer`,
        paragraphs: [
          `The mid-market rate (also called the interbank rate) is the midpoint between the price at which banks are willing to buy a currency and the price at which they are willing to sell it on the global market at that moment. It is the rate quoted by news sites, financial data feeds and search engines, because it is the fairest single summary of what a currency is worth right now. If a search engine says one dollar is worth 0.92 euros, it means banks are trading dollars among themselves at prices clustered tightly around that figure.`,
          `Two properties of this rate matter for everything that follows. First, it moves constantly while markets are open — sometimes by fractions of a cent per hour, sometimes sharply when economic news lands — so the rate you checked this morning is not guaranteed to be the rate available this afternoon. Second, it is not a product anyone sells. It exists between institutions trading in millions; a retail customer converting a few hundred or thousand units always deals with a provider who has taken that wholesale price and added their margin. Understanding conversion is therefore mostly about understanding the margin.`,
        ],
      },
      {
        heading: `Bid, Ask and the Spread: Where the Margin Lives`,
        paragraphs: [
          `Every currency quote has two sides. The bid is what a provider will pay you for a currency; the ask is what they will charge you for it. The gap between them is the spread, and it always works against you in both directions: you sell your currency slightly cheap and buy the other slightly dear, with the provider keeping the difference. When a provider builds its customer rate from the mid-market rate, it typically moves the rate by a percentage — say 1% or 2% — in its own favour. That percentage is the real price of the conversion, whether or not any fee is charged.`,
          `Spreads vary enormously by channel and by currency pair. Major pairs like USD/EUR are traded in huge volumes, so margins can be thin; less common currencies carry wider spreads because the provider takes more risk holding them. Walk-up airport and hotel bureaus are usually the most expensive way to convert, high-street banks sit in the middle, and specialist online transfer services tend to be narrowest — but these are tendencies, not rules, and any individual provider can beat or undercut its category on a given day. The practical lesson is that "no commission" or "zero fees" advertising tells you nothing: it usually just means the entire margin has been moved into the rate, where it is harder to compare.`,
        ],
      },
      {
        heading: `Fees on Top: Fixed Charges, Percentage Fees and Timing Markups`,
        paragraphs: [
          `On top of the spread, many providers add explicit fees, and their structure matters as much as their size. A fixed fee — say $4.99 per transfer — is proportionally brutal on small amounts (5% of a $100 transfer) and nearly irrelevant on large ones (0.05% of $10,000). A percentage fee scales with the amount instead. Some services charge both, some charge for speed, and some add a minimum fee that quietly raises the cost of small conversions. Because fee structures differ, two providers with identical exchange rates can deliver noticeably different amounts to the recipient.`,
          `Timing adds one more hidden layer. Currency markets close over the weekend, from Friday evening to Monday morning in most centres. A provider who lets you lock a rate on Saturday cannot trade at that moment, so many protect themselves by padding the weekend rate with an extra margin — convert the same amount on a Tuesday and a Saturday and you may get different results from the same service. Card spending abroad has its own variant: the rate is usually set by the card network close to mid-market, but your own bank may add a foreign-transaction percentage on top, which is a fee by another name.`,
        ],
      },
      {
        heading: `Worked Example: Converting $1,000 to Euros Three Ways`,
        paragraphs: [
          `Take a concrete case. The mid-market rate is 1 US dollar = 0.9200 euros, so $1,000 converted at that rate would buy exactly €920.00. No retail customer gets this, but it is the yardstick every real offer should be measured against. Now suppose a provider applies a 2% spread: the effective rate becomes 0.9200 × 0.98 = 0.9016 euros per dollar, and your $1,000 buys €901.60. The conversion "cost" €18.40 — not charged as a fee anywhere, simply missing from what you received.`,
          `Now add a fixed fee of $4.99, deducted from the amount before conversion, as many services do. Only $995.01 is converted, at the same spread-adjusted rate: $995.01 × 0.9016 = €897.10. Against the €920.00 mid-market benchmark, the total cost of the transfer is €22.90 — about 2.5% of the value — even though the advertised fee was under five dollars. This is why the only honest comparison between providers is the amount of foreign currency actually delivered for the same amount sent, checked at the same moment, because rates move. Everything else — headline rates, fee banners, "zero commission" — is marketing around that single number.`,
        ],
      },
      {
        heading: `Why the Rate You Get Differs From the One on Google`,
        paragraphs: [
          `People often assume their bank has made an error when the converted amount does not match a search engine's answer. In almost every case there is no error: the search engine quoted the mid-market rate, and the bank applied its retail rate, and the gap between them is the bank's margin plus any fees. A second, subtler cause of confusion is quote direction. The same price can be written two ways: euros per dollar (1 USD = 0.9200 EUR) or dollars per euro (1 EUR = 1.0870 USD). They are the same rate inverted — 1 ÷ 1.0870 = 0.9200 — but a provider quoting the less familiar direction can make its rate look different from a competitor's when it is actually identical, or slightly better when it is worse.`,
          `The amount you convert also plays a role. Providers price risk and handling per transaction, so larger conversions frequently receive rates closer to mid-market than small ones, and some services openly tier their margin by amount. Finally, there is simple timing: if you checked the rate online, then converted hours later after a market move, part of the difference is the market itself, not your provider. The defence against all of this is the same — compare delivered amounts, at the same time, for the same sum.`,
        ],
      },
      {
        heading: `How to Compare Providers Honestly`,
        paragraphs: [
          `Start by finding the mid-market rate for your pair at the moment you plan to convert; our currency converter uses that reference rate, which makes it a useful yardstick even if you convert elsewhere. Then get a firm quote from each provider for the exact amount you want to send, and note the foreign currency amount each one will deliver, after every fee. The gap between the delivered amount and the mid-market value, divided by the mid-market value, is that provider's true total cost in percent — the only figure worth comparing.`,
          `A few habits consistently save money. For card spending abroad, if a terminal or ATM offers to charge you in your home currency, decline and choose the local currency: the home-currency option (dynamic currency conversion) uses a rate set by the merchant's provider, which is usually worse than your card network's rate. For regular transfers, judge providers on total cost per transfer, not on a first-transfer promotional rate. And for large one-off conversions — a property deposit, a vehicle, a relocation — the spread matters far more than any fixed fee, so a provider charging a visible fee but a tight rate will usually beat a "fee-free" provider with a wide one.`,
        ],
      },
    ],
    relatedToolSlugs: [`currency-converter`, `unit-converter`],
    faq: [
      {
        question: `Why does Google show a better exchange rate than my bank offers?`,
        answer: `Google and other search engines display the mid-market (interbank) rate — the midpoint price at which banks trade with each other. Your bank or transfer service adds its own margin, the spread, plus any fees, so the retail rate you are offered is always worse. The size of that gap is the provider's real charge, and it varies a lot between providers.`,
      },
      {
        question: `What counts as a good spread on a currency conversion?`,
        answer: `It depends on the currency pair and the channel, but as a rough guide for major pairs like USD/EUR: a total cost under 1% of the amount converted is competitive, 1–3% is common at traditional banks, and walk-up bureaus at airports or hotels can cost considerably more. Always measure total cost — spread plus all fees — as a percentage of what you would receive at the mid-market rate.`,
      },
      {
        question: `Should I accept payment in my home currency when paying by card abroad?`,
        answer: `Almost never. This option, called dynamic currency conversion, lets the merchant's provider set the exchange rate, and that rate is typically marked up well beyond what your card network would charge. Choose to be charged in the local currency instead, and your card network's rate — usually close to mid-market, plus any foreign-transaction fee your own bank sets — will apply.`,
      },
      {
        question: `Do exchange rates really change over the weekend?`,
        answer: `The underlying market is closed from Friday evening to Monday morning in most financial centres, so the mid-market rate effectively freezes at Friday's close. However, many providers widen their margin on weekend conversions to protect themselves against the market moving before it reopens, so the rate you are offered on a Saturday can be worse than the same provider's Friday rate even though the market has not moved.`,
      },
    ],
  },
  {
    slug: `how-to-calculate-percentage-change`,
    title: `How to Calculate Percentage Change (Increase, Decrease and Reverse)`,
    metaDescription: `How to calculate percentage change step by step: increases, decreases, percentage points vs percent, and why reversing a change takes a different percentage.`,
    intro: `Percentage change is the standard language for describing movement: prices rise by 4%, a salary goes up 8%, website traffic falls 25%. The formula behind it is a single line of arithmetic, yet it produces a surprising number of errors — in spreadsheets, in news reports and in everyday decisions. Almost all of those errors come from three places: dividing by the wrong value, confusing percentage points with percent, and assuming that a rise and a fall of the same percentage cancel each other out (they do not). This guide covers the formula itself, worked examples of increases and decreases, the percentage-point distinction that changes the meaning of headlines, and the part most people get wrong: reversing a percentage change, including how to recover an original price from a discounted one. Every example is worked in full so you can check your own calculations — or check ours — line by line.`,
    sections: [
      {
        heading: `The Formula: Always Divide by the Original Value`,
        paragraphs: [
          `Percentage change measures how much a value moved relative to where it started. The formula is: percentage change = ((new value − old value) ÷ old value) × 100. The subtraction gives the absolute change; dividing by the old value expresses that change as a fraction of the starting point; multiplying by 100 turns the fraction into a percentage. The sign carries the direction: a positive result is an increase, a negative result is a decrease.`,
          `A quick example. A salary rises from $50,000 to $54,000. The absolute change is $4,000, and $4,000 ÷ $50,000 = 0.08, so the percentage change is +8%. The single most common mistake is dividing by the new value instead: $4,000 ÷ $54,000 gives 7.4%, which is wrong, because the change happened to the original $50,000, not to the final amount. Whenever you calculate a percentage change, ask yourself "a percentage of what?" — the answer must always be the value you started from.`,
        ],
      },
      {
        heading: `Percentage Increase: Worked Examples`,
        paragraphs: [
          `For an increase, the new value is larger than the old, and the formula returns a positive number. A jacket's price rises from $80 to $100: the change is $20, and $20 ÷ $80 = 0.25, so the price increased by 25%. A useful shortcut gives the same answer: divide the new value by the old (100 ÷ 80 = 1.25) and subtract 1 — the result, 0.25, is the increase as a fraction. This ratio method is worth learning because it makes multi-step changes easy to handle correctly.`,
          `Successive increases multiply rather than add, because each one applies to a new, larger base. A price that rises 10% and then another 10% does not rise 20% overall: $100 becomes $110 after the first rise, and the second 10% applies to $110, giving $121 — a total increase of 21%. The same multiplication principle explains investment growth and inflation over several years: chain the ratios (1.10 × 1.10 = 1.21) instead of adding the percentages, or your totals will quietly drift away from reality.`,
        ],
      },
      {
        heading: `Percentage Decrease and Negative Results`,
        paragraphs: [
          `Decreases use exactly the same formula; the result simply comes out negative. A price falls from $100 to $80: the change is −$20, and −$20 ÷ $100 = −0.20, a decrease of 20%. Notice the asymmetry already hiding in these two examples: going from $80 to $100 is +25%, but coming back from $100 to $80 is only −20%. The same $20 movement is a different percentage depending on the starting point, because the base changed. This is not a quirk of the formula — it is the whole reason reversing changes needs care, as a later section shows.`,
          `One boundary is worth knowing: for quantities that cannot go below zero (prices, counts, balances), a decrease can never exceed 100%, because a 100% decrease means the value has reached zero. Increases have no such ceiling — a value can rise 200% or 2,000%. So when a report claims something "fell by 150%", it is either using a different definition, describing a quantity that can go negative (like profit turning into loss), or simply wrong. As a second example: a shop's footfall drops from 2,400 visitors a month to 1,800. The change is −600, and −600 ÷ 2,400 = −0.25 — a 25% decrease.`,
        ],
      },
      {
        heading: `Percentage Points vs Percent: The Distinction That Changes Headlines`,
        paragraphs: [
          `When the thing changing is itself a percentage — an interest rate, a tax rate, an unemployment rate — there are two different ways to describe the movement, and mixing them up changes the story completely. If a central bank raises its interest rate from 4% to 5%, the rate has risen by 1 percentage point. But relative to its starting level, it has risen by 25%: 1 ÷ 4 = 0.25. Both statements are true; they answer different questions. Percentage points measure the arithmetic difference between two percentages. Percent measures the proportional change.`,
          `This is why careful publications write "up one percentage point" for rates and save "up 25%" for the relative framing — and why less careful ones can make a modest change sound dramatic or a dramatic one sound modest. The same applies in business: if a profit margin improves from 10% to 12%, the margin gained 2 percentage points, which is a 20% relative improvement (2 ÷ 10 = 0.20). Whenever you see a percentage used to describe the change of another percentage, stop and work out which of the two meanings is intended before drawing any conclusion from it.`,
        ],
      },
      {
        heading: `Reversing a Percentage Change: Why +20% Then −20% Is Not Break-Even`,
        paragraphs: [
          `Here is the trap in its purest form. Start with $100. Increase it by 20%: $100 × 1.20 = $120. Now decrease the result by 20%: $120 × 0.80 = $96. You are $4 down, not back where you started. The reason is the base again: the 20% increase was calculated on $100 (worth $20), while the 20% decrease was calculated on $120 (worth $24). Equal percentages of different bases are different amounts of money, so they cannot cancel out.`,
          `To undo a percentage change exactly, you must divide by the factor that created it — or equivalently, apply the correct reverse percentage. To undo a 20% increase, divide by 1.20 ($120 ÷ 1.20 = $100), which corresponds to a decrease of 16.67%, because $20 is 16.67% of $120. Undoing a decrease takes a larger percentage than the original fall: a price that dropped 25%, from $200 to $150, needs an increase of 33.33% to return to $200, because $50 is a third of the reduced base of $150. The general rule: to reverse a change of p%, divide the current value by (1 + p ÷ 100) for an increase, or by (1 − p ÷ 100) for a decrease.`,
        ],
      },
      {
        heading: `Finding the Original Value and Checking Your Answer`,
        paragraphs: [
          `The reverse calculation also answers a common shopping and accounting question: what was the original price before a discount or tax? If an item costs $75 after a 25% discount, the $75 represents 75% of the original price, so the original was $75 ÷ 0.75 = $100. The common wrong method — adding 25% of $75 back on — gives $93.75, because 25% of the reduced price is smaller than 25% of the original. The same pattern works for tax-inclusive prices: a total of $54 that includes 8% tax contains an original of $54 ÷ 1.08 = $50, with $4 of tax.`,
          `Finally, build the habit of sanity-checking. Three quick tests catch most errors. Direction: an increase must produce a value above the start, a decrease below it. Magnitude: a 25% change moves a value by a quarter of its starting size — if your answer moved $80 by $40 and you called it 25%, something is off. Round-trip: apply your percentage, then reverse it with the method above; if you do not land back on the starting value, one of the two calculations used the wrong base. Our percentage change calculator applies the same formula — run your numbers through it and compare against your hand calculation when the result matters.`,
        ],
      },
    ],
    relatedToolSlugs: [`percentage-change-calculator`, `percentage-calculator`],
    faq: [
      {
        question: `What is the percentage change if the original value is zero?`,
        answer: `It is undefined. The formula divides by the original value, and division by zero has no answer — going from 0 sales to 50 sales cannot be expressed as a percentage increase. In that situation, describe the change in absolute terms ("sales rose from 0 to 50 units") or compare against a different baseline period that has a non-zero value.`,
      },
      {
        question: `If I lose 50% and then gain 50%, am I back where I started?`,
        answer: `No. Start with $100: a 50% loss leaves $50, and a 50% gain on $50 adds only $25, leaving $75. To recover from a 50% loss you need a 100% gain, because the gain is calculated on the halved amount. This asymmetry grows with the size of the loss — after an 80% fall, you need a 400% rise just to break even.`,
      },
      {
        question: `How do I calculate percentage change in a spreadsheet?`,
        answer: `Put the old value in one cell and the new value in another, then use the formula =(new − old)/old — for example =(B2−A2)/A2 — and format the result as a percentage. The spreadsheet multiplies by 100 for display when you apply percentage formatting, so do not multiply by 100 in the formula as well, or your results will be a hundred times too large.`,
      },
      {
        question: `Why do two successive 10% increases add up to 21%, not 20%?`,
        answer: `Because the second increase is calculated on the already-increased value. $100 rises 10% to $110, then the next 10% is 10% of $110 — $11 — giving $121. Percentages applied in sequence multiply as factors (1.10 × 1.10 = 1.21) rather than adding, which is the same compounding effect that makes interest grow faster over time.`,
      },
    ],
  },
  {
    slug: `how-to-write-an-invoice-that-gets-paid-on-time`,
    title: `How to Write an Invoice That Gets Paid on Time`,
    metaDescription: `What a clear, professional invoice needs so it gets paid on time: the required fields, numbering, payment terms, itemised lines and late-payment follow-ups.`,
    intro: `When an invoice is paid late, the client usually gets the blame — and sometimes deserves it. But a large share of late payments are caused by the invoice itself: it went to the wrong person, it lacks the purchase-order number the client's system requires, the total does not match the quote, or the due date is expressed so vaguely that nobody can act on it. An invoice is not just a bill; it is a document that has to travel through someone else's process, often an accounts department that knows nothing about your project and will park anything it cannot process cleanly. The easier your invoice is to verify and approve, the faster it moves. This guide covers the fields every invoice should carry, how to number invoices properly, how to write payment terms people can actually act on, how to itemise work so it does not trigger queries, and how to follow up on overdue payment firmly without damaging the relationship. The advice is general and international — specific legal requirements vary by country.`,
    sections: [
      {
        heading: `The Fields Every Invoice Should Carry`,
        paragraphs: [
          `A processable invoice answers every question an accounts department might ask, without them having to contact you. Include your full business name, address and contact details; the client's correct legal or trading name and address; a unique invoice number; the date the invoice was issued; the due date; a description of what was supplied; the amounts, including any tax shown separately where it applies; the currency; the total payable; and clear payment instructions — bank details or payment link, plus the reference the payer should quote so you can match the money when it arrives. If the client gave you a purchase-order or reference number, print it on the invoice: in many larger organisations, an invoice without one is rejected automatically.`,
          `Two of these fields cause a disproportionate share of delays. The first is the client's name: billing "the marketing team" or a contact's personal name instead of the company that must pay can stall approval or create tax problems for both sides, so ask for the exact billing entity when the work is agreed, not when you invoice. The second is your own tax identification number, which businesses in many countries are required to show and which clients often need for their own records. Exact requirements differ by jurisdiction, so check your local rules once and build them into a template you reuse every time.`,
        ],
      },
      {
        heading: `Numbering: Sequential, Unique and Never Reused`,
        paragraphs: [
          `Every invoice needs a number that is unique within your records, and the simplest robust system is a running sequence with a prefix, such as INV-2026-001, INV-2026-002, and so on. Sequential numbering is not just tidiness: it lets you spot a missing invoice instantly, gives both sides an unambiguous reference for every conversation ("invoice 014 is still open" beats "the invoice from March"), and in many countries a continuous sequence is what tax authorities expect to see. Gaps invite questions; duplicates create real confusion when a client pays one and is chased for the other.`,
          `Two rules protect the integrity of the sequence. First, never reuse a number, even for an invoice that was cancelled before sending — void it in your records and move on. Second, never edit an invoice after it has been issued. If you made an error, cancel it formally with a credit note that references the original number, then issue a corrected invoice with the next number in the sequence. It feels bureaucratic, but this paper trail is exactly what resolves disputes in minutes instead of weeks.`,
        ],
      },
      {
        heading: `Payment Terms and Due Dates People Can Act On`,
        paragraphs: [
          `Terms only work if they are agreed before the invoice arrives. State your payment terms on the quote or proposal — due on receipt, 7 days, 14 days, 30 days — so the invoice itself holds no surprises. Then, on the invoice, convert the terms into an actual calendar date: "Due 14 March 2026" gets acted on; "Net 30" forces the reader to calculate, and many will not. If you charge for work in stages, say so up front and invoice at each milestone rather than sending one large bill at the end; smaller, expected invoices are approved faster than large, surprising ones.`,
          `For new clients or large projects, a deposit before work begins is normal commercial practice and filters out many payment problems before they exist. For example, on a project quoted at $970, a 30% deposit is $291, leaving a balance of $679 on delivery — the client has committed real money, and your exposure if something goes wrong is limited to the balance. Apply whatever terms you choose consistently: clients learn quickly when due dates are decorative. Late-payment interest or fees can only be charged where your agreed terms and local law allow them, so if you intend to use them, put them in the original agreement, not in a frustrated email afterwards.`,
        ],
      },
      {
        heading: `Itemised Descriptions That Prevent Queries`,
        paragraphs: [
          `Every line on an invoice should let a stranger verify that line against the agreement in seconds. Break the work into its natural units, each with a short description, a quantity, a rate and a line total: "Website copywriting — 10 hours × $85 = $850" is verifiable; "Services rendered — $850" is not, and vague lines are the single most common trigger for the "can you just clarify…" email that quietly adds two weeks to your payment. Add one-off costs as their own lines — "Hosting setup (one-off) — $120" — so the client can see the build-up to the total of $970 rather than wondering where the extra came from.`,
          `Descriptions should match the words used in your quote or contract, even down to the product names. If the quote said "Phase 2: checkout integration", the invoice should not rename it "E-commerce work (final)". Accounts staff reconcile documents literally, and mismatched wording reads to them like mismatched work. Where you supplied something over a period, include the dates or the delivery reference ("Delivered 28 February, files v3"). The goal is an invoice that nobody needs to ask a question about, because every question costs you a payment cycle.`,
        ],
      },
      {
        heading: `Sending, Confirming and Following Up Politely`,
        paragraphs: [
          `Send the invoice to the person or mailbox that actually processes payments, which is often not your day-to-day contact — ask, when the work is agreed, "who should invoices go to, and do you need a PO number?" Send it promptly on delivery or at the agreed milestone; your payment clock only starts when the invoice arrives, and an invoice sent three weeks late has effectively granted three free weeks of credit. A short covering message naming the project, the amount and the due date helps it get routed correctly, and for larger invoices a brief confirmation that it was received is worth requesting — invoices do land in spam folders and wrong inboxes.`,
          `Follow-up works best as a calm, predictable ladder. A friendly reminder a few days before the due date suits large invoices ("just flagging that invoice 014 for $970 is due on Friday"). On the due date or the day after, a short note that the date has passed. After that, firmer messages at weekly intervals, restating the invoice number, amount and original due date, and asking whether there is a problem you should know about. Keep every message factual and courteous; the person reading it is rarely the person who caused the delay. If payment stalls completely, stop further work under your agreed terms and escalate through the client's management with the full paper trail — which is where your numbering and records earn their keep.`,
        ],
      },
      {
        heading: `Mistakes That Reliably Delay Payment`,
        paragraphs: [
          `The same handful of errors accounts for most avoidable delays. Billing the wrong entity, or a slightly wrong version of its name. Omitting the client's purchase-order number. Arithmetic that does not add up — line items, tax and total disagreeing with each other — which fails automated checks in larger companies and triggers manual review everywhere else. Quoting one currency and invoicing in another. Forgetting to include your payment details, or changing bank accounts without flagging it prominently, which routes your invoice into fraud-verification procedures. And sending the invoice to a contact who left the company two months ago.`,
          `Two more deserve emphasis because they are so common among freelancers and small firms. The first is editing an issued invoice to "fix" it and resending the same number: now two different documents with one number exist, and the client's system will pay neither until it is untangled — use a credit note and a fresh number instead. The second is invoicing late and in batches: three months of work billed in one afternoon guarantees queries about at least one line, and queries delay the whole batch. Invoice promptly, invoice per milestone, and keep each invoice small enough to be approved without a meeting.`,
        ],
      },
    ],
    relatedToolSlugs: [`invoice-generator`, `quote-generator`, `receipt-generator`],
    faq: [
      {
        question: `What is the difference between a quote, an invoice and a receipt?`,
        answer: `A quote (or estimate/proposal) states the price before work is agreed or done. An invoice is the formal request for payment, issued when work is delivered or a milestone is reached, with a number, dates and a total due. A receipt is proof that payment happened, issued after the money arrives. The three documents form a chain — quote, invoice, receipt — and keeping all three is what lets you resolve any payment question quickly.`,
      },
      {
        question: `When should I send an invoice?`,
        answer: `As soon as the agreed trigger is reached: on delivery, at a completed milestone, or on the date your agreement specifies. Your payment terms only start counting from when the client receives the invoice, so every day you delay sending it is a day added to your payment date. For ongoing work, a fixed rhythm — for example invoicing on the last working day of each month — makes your invoices predictable and easier for the client to process.`,
      },
      {
        question: `Can I add a late-payment fee to an overdue invoice?`,
        answer: `Only if late fees were part of the terms the client agreed to before the work began, and only where your local law permits them — rules on this differ significantly by country, and some jurisdictions give businesses a statutory right to interest on late payment while others restrict it. A fee invented after the fact is generally unenforceable and mainly damages the relationship. If late payment is a recurring problem, the more effective levers are deposits, shorter terms and pausing further work.`,
      },
      {
        question: `What should I do if a client disputes part of an invoice?`,
        answer: `Ask them to identify the disputed lines precisely and to pay the undisputed balance on the normal date — most clients will, and it keeps most of your cash flow moving. Investigate the disputed part against your quote and delivery records. If you made an error, cancel the original with a credit note and issue a corrected invoice with a new number rather than editing the issued document, so both sets of books stay consistent.`,
      },
    ],
  },
  {
    slug: `how-to-clean-a-messy-csv-file`,
    title: `How to Clean a Messy CSV File: Duplicates, Dates, Numbers and Encoding`,
    metaDescription: `How to clean a messy CSV file step by step: fix encoding and delimiter problems, standardise dates and numbers, remove duplicates, and verify totals afterwards.`,
    intro: `A CSV file is the simplest data format in common use — plain text, one row per line, values separated by commas — and yet moving one between systems reliably produces scrambled characters, dates that flip day and month, numbers that refuse to add up, and columns that collapse into one. None of this is mysterious once you know the cause: a CSV file carries almost no information about how it should be interpreted, so every program guesses — and different programs guess differently. The delimiter, the character encoding, whether a value like 03/04/2026 means 3 April or March 4, whether 1,234 is a number or text: all of it is convention, not fact stored in the file. This guide explains the four problem areas that account for nearly all messy CSVs — encoding and delimiters, dates, numbers, and duplicate or broken rows — and then sets out a step-by-step cleaning workflow that ends, as every cleaning job should, with checking that the totals still agree.`,
    sections: [
      {
        heading: `First, Look at the Raw File`,
        paragraphs: [
          `Before opening a CSV in a spreadsheet, open it in a plain text editor. Thirty seconds of looking at the raw text tells you things the spreadsheet will hide: what the header row actually says, which character separates the fields, whether text values are wrapped in quotes, and whether the file looks consistent from top to bottom. Note the row count and, if there is an amount column, make a rough note of what it should total — you will want both figures later to prove your cleaning did not silently lose or change data.`,
          `Then make a copy and work only on the copy. Cleaning involves deletions — duplicate rows, blank rows, broken rows — and a deletion you later regret is unrecoverable if the original is gone. Keep the untouched export somewhere safe, name your working file clearly (for example customers-clean.csv), and treat the original as read-only evidence. This one habit converts every cleaning disaster into a minor inconvenience: worst case, you start again from the original.`,
        ],
      },
      {
        heading: `Encoding and Delimiter Problems: Garbled Text and One-Column Spreadsheets`,
        paragraphs: [
          `Encoding decides how bytes become characters, and a mismatch produces the classic mojibake: accented letters and currency symbols turn into sequences like Ã© or â‚¬, or a mysterious ï»¿ appears at the very start of the file — that last one is a byte-order mark (BOM) being displayed as text. The fix is to open or save the file explicitly as UTF-8, the encoding that handles virtually all character sets, and to make sure the program reading it knows that is what it is getting. If a file arrives garbled, do not edit and save it in that state, or you will bake the damage in permanently; re-import it with the correct encoding selected.`,
          `Delimiter problems are just as common. Despite the name "comma-separated", many files use semicolons — standard in much of Europe, where the comma serves as the decimal separator — or tabs, or pipes. Open a semicolon file in a tool expecting commas and every row lands in a single column, because the tool never finds a comma to split on. Text fields create the opposite risk: a value like "Smith, John" contains a comma, which is why well-formed CSV wraps such values in double quotes. When you import, state the delimiter and quote character explicitly rather than letting the software guess, and the one-column and split-column problems both disappear.`,
        ],
      },
      {
        heading: `Dates and Numbers That Are Not What They Seem`,
        paragraphs: [
          `Dates are the most dangerous CSV problem because they can be wrong silently. The string 03/04/2026 means 3 April in most of the world and March 4 in the United States, and a spreadsheet will happily convert it to the wrong date without any warning — every date in the file with a day number of 12 or below is suspect. The robust fix is to standardise dates to ISO format, YYYY-MM-DD (2026-04-03), which is unambiguous and also sorts correctly as text. During cleaning, check a few dates against a known reference — an invoice date you recognise — to confirm the interpretation before converting the whole column.`,
          `Numbers fail in quieter ways. Values arrive stored as text because they carry currency symbols, spaces, or a leading apostrophe, and text values are ignored by sums — a column can total far less than it should with no error shown. European-formatted numbers reverse the separators (1.234,56 means 1,234.56), which other systems read as two fields or as nonsense. And identifiers suffer the cruellest fate: postcodes, account numbers and product codes with leading zeros (01234) are interpreted as numbers and lose the zero, because numerically 01234 and 1234 are the same. Any column that is an identifier rather than a quantity should be imported and kept as text, always.`,
        ],
      },
      {
        heading: `Duplicates, Empty Rows and Ragged Rows`,
        paragraphs: [
          `Duplicate rows creep in whenever exports are merged, a download is run twice, or data is appended to a file that already contained it. Distinguish exact duplicates — every field identical — from near-duplicates, where the same customer or transaction appears twice with a small difference, such as a trailing space in the name or a differently formatted phone number. Exact duplicates on a genuine key (an order ID, an invoice number) are safe to remove. Near-duplicates need the data standardised first — trim spaces, normalise formats — and then a judgement call, because two similar rows are sometimes two real events.`,
          `Structural damage is the third category. Empty rows appear from blank lines in the source or careless copy-paste; harmless in themselves, they break some import routines and sorting operations. Ragged rows are worse: a row with one field too few or too many shifts every subsequent value into the wrong column, so a price lands in the quantity column and a name lands in the date. Ragged rows usually trace back to an unquoted delimiter inside a text field. Find them by checking that every row has the same number of fields as the header — most cleaning tools report this — and fix the source values rather than deleting the rows, since a ragged row usually contains real data in the wrong shape.`,
        ],
      },
      {
        heading: `A Step-by-Step Cleaning Workflow`,
        paragraphs: [
          `With the problem areas in mind, a reliable workflow looks like this. One: save an untouched copy of the original. Two: open the raw file in a text editor and note the delimiter, the encoding, the header names and the row count. Three: import with those settings stated explicitly — correct delimiter, UTF-8 encoding, identifier columns set to text. Four: standardise the headers (short, consistent names with no spaces or duplicates) and trim leading and trailing spaces from text fields, which fixes a large share of failed matches and near-duplicates.`,
          `Five: convert the columns to their proper types deliberately — dates to ISO format, amounts to numbers with one consistent decimal convention — checking a sample of values after each conversion. Six: remove blank rows, then exact duplicates on your chosen key, reviewing near-duplicates by eye. Seven: repair or set aside ragged rows. Eight: sort the file by a key column and scan the top and bottom of each column; sorting pushes blanks, errors and absurd values (a price of 0, a date in 1970, a quantity of 99999) to the ends where you can see them. Only then is the file ready to use — after the verification step below.`,
        ],
      },
      {
        heading: `Verify Before You Trust It: Totals and Row Counts`,
        paragraphs: [
          `Cleaning that cannot be verified is just editing. Two checks catch almost everything. First, row counts: if the raw file had 1,000 data rows and you deliberately removed 12 exact duplicates and 3 blank rows, the cleaned file must have exactly 985 rows — not approximately, exactly. If the count differs by anything you did not intend, stop and find out why before the file is used for anything. Second, control totals: sum the important numeric columns before and after cleaning. Removing duplicates of course changes the total of an amount column — by exactly the value of the rows removed, which you can calculate and reconcile. Reformatting dates and numbers, by contrast, must not change any total at all; if it did, a conversion went wrong somewhere.`,
          `Finish with spot checks. Pick a handful of rows — the first, the last, and a few at random — and compare them field by field against the original file. Check the largest and smallest values in each numeric column for plausibility. Confirm that a customer whose name contains an accent or an apostrophe survived the journey intact, since those are the records encoding problems hit first. When counts, totals and spot checks all agree, the file is clean in the only sense that matters: you can demonstrate that what is in it is what was in the original, minus exactly what you meant to remove. Our Excel CSV Cleaner applies this kind of standardisation in the browser; whichever tool you use, run the same verification afterwards.`,
        ],
      },
    ],
    relatedToolSlugs: [`excel-csv-cleaner`, `csv-to-business-excel`, `invoice-to-excel`],
    faq: [
      {
        question: `Why does my CSV open as a single column in Excel?`,
        answer: `Because the file's delimiter is not the one Excel expects — most commonly the file uses semicolons (standard in many European locales) while Excel is splitting on commas, or the reverse. Do not try to fix it by editing the file. Instead, import it through Excel's import wizard (Data → From Text/CSV) or use Text to Columns, and state the correct delimiter explicitly; the columns will separate properly.`,
      },
      {
        question: `Why do names and symbols appear as Ã© or ï»¿ in my file?`,
        answer: `That is an encoding mismatch: the file was written in one character encoding (usually UTF-8) and read as another. The strange sequences are the bytes of the original characters being displayed wrongly. Re-import the file specifying UTF-8 as the encoding. Crucially, do not save the garbled version, or the wrong characters become permanent; always go back to the original file and re-open it with the right setting.`,
      },
      {
        question: `Why did my product codes and postcodes lose their leading zeros?`,
        answer: `Because the spreadsheet treated them as numbers, and the number 01234 is stored simply as 1234. Codes, postcodes, phone numbers and account references are identifiers, not quantities — you never add them up — so they must be imported and formatted as text. In the import wizard, set those columns to Text before loading the data; once the zeros are stripped and the file saved, they cannot be recovered except from the original.`,
      },
      {
        question: `Is it safe to remove all duplicate rows automatically?`,
        answer: `Only exact duplicates, and ideally duplicates identified by a genuine key column such as an order or invoice number. Two rows can look similar yet both be legitimate — the same customer buying the same item twice, for example. Remove exact duplicates first, then review near-duplicates (same key, small differences in other fields) manually, and always reconcile row counts and totals afterwards so you can prove what was removed.`,
      },
    ],
  },
  {
    slug: `break-even-point-explained`,
    title: `Break-Even Point Explained: Formula, Example and What It Misses`,
    metaDescription: `Break-even point explained with a fully worked example: fixed and variable costs, contribution margin, the formula in units and revenue, and what it misses.`,
    intro: `Every business, product and side project has a break-even point: the level of sales at which total revenue exactly covers total costs — no profit, no loss. Below it, you are paying for the privilege of being in business; above it, each additional sale starts adding profit. The calculation itself needs only three numbers and one division, which makes it one of the most useful quick tests in business: it tells a founder how many units must move before an idea pays for itself, and it exposes prices that could never work no matter how hard they are sold. This guide explains how to sort costs into fixed and variable, what contribution margin means and why it is the heart of the method, the break-even formula in both units and revenue with a fully worked example, how sensitive the answer is to small changes in price or cost, and — just as important — the real-world complications the simple model leaves out, so you know how far to trust it.`,
    sections: [
      {
        heading: `Fixed Costs and Variable Costs: Sorting Your Costs Honestly`,
        paragraphs: [
          `Break-even analysis begins by sorting every cost into one of two buckets. Fixed costs stay the same regardless of how much you sell, at least over the period you are examining: rent, salaried staff, insurance, software subscriptions, loan repayments. Sell one unit or one thousand, the rent is the rent. Variable costs scale with each unit sold or delivered: raw materials, packaging, per-transaction card fees, shipping, sales commissions, the hourly labour directly tied to producing one more unit. The distinction is not about whether a cost is large or small, or whether you like it — only about whether it moves when volume moves.`,
          `The sorting deserves honesty, because the answer is only as good as the buckets. Some costs are mixed: a utility bill with a fixed standing charge plus usage, or staff who are salaried but need paid overtime at high volume. Split mixed costs into their fixed and variable parts as best you can. Some costs are fixed only within a range — one premises, one machine, one team can handle up to a certain volume, after which a second of each is needed. And a classic trap: founders who exclude their own salary from fixed costs produce a break-even point at which the business "profits" only because the founder works free. Include a realistic cost for your own labour, or remember to interpret the result accordingly.`,
        ],
      },
      {
        heading: `Contribution Margin: What Each Sale Actually Contributes`,
        paragraphs: [
          `The key figure in the whole method is the contribution margin: selling price per unit minus variable cost per unit. If a product sells for $50 and the materials, packaging and transaction fees for one unit come to $30, the contribution margin is $20. The name explains the idea: each sale contributes $20 towards covering the fixed costs, and once those are fully covered, each sale contributes $20 of profit. Everything in break-even analysis is a consequence of that one number, which is why small errors in estimating variable cost — a forgotten fee, an optimistic materials price — distort the result so much.`,
          `The margin is also expressed as a ratio: contribution margin divided by price. Here, $20 ÷ $50 = 0.40, a 40% contribution margin ratio, meaning 40 cents of every revenue dollar is available to cover fixed costs and then profit, while 60 cents is consumed by variable costs. The ratio form is what you use when you want break-even in revenue terms, or when a business sells many products and works with an average margin across the mix. Both forms describe the same reality; units are usually clearer for a single product, revenue clearer for a whole business.`,
        ],
      },
      {
        heading: `The Formula and a Fully Worked Example`,
        paragraphs: [
          `The break-even formula in units is: break-even units = fixed costs ÷ contribution margin per unit. Take a small business with fixed costs of $12,000 per month — rent, salaries, insurance and subscriptions — selling one product at $50 with a variable cost of $30, so a contribution margin of $20. Break-even is $12,000 ÷ $20 = 600 units per month. In revenue terms, that is 600 × $50 = $30,000, which the ratio formula confirms directly: $12,000 ÷ 0.40 = $30,000 of monthly sales needed to break even.`,
          `Always verify with the full picture at exactly 600 units. Revenue: 600 × $50 = $30,000. Variable costs: 600 × $30 = $18,000. Fixed costs: $12,000. Total costs are $18,000 + $12,000 = $30,000 — precisely equal to revenue, profit zero, as the formula promised. Sell unit 601 and profit rises by exactly its contribution margin, $20; sell only 550 and the month loses 50 × $20 = $1,000. This verification habit matters: if the full picture at your calculated break-even does not produce zero, an input was mis-sorted or mis-copied, and it is far better to discover that on paper than in the accounts.`,
        ],
      },
      {
        heading: `How Sensitive Is It? Price and Cost Changes`,
        paragraphs: [
          `Break-even points move sharply when prices or costs move, because a price change lands entirely on the contribution margin. Keep the example: fixed costs $12,000, variable cost $30. Cut the price from $50 to $45 and the margin falls from $20 to $15, so break-even jumps from 600 to $12,000 ÷ $15 = 800 units — a 10% price cut demands 33% more sales just to stand still. This is the arithmetic that makes discounting so dangerous: the discount comes straight out of margin, while the volume needed to compensate is always larger than intuition suggests.`,
          `Cost increases work the same way from the other side. If the variable cost rises from $30 to $35 — a supplier price increase, a higher card fee — the margin again becomes $15 and break-even again rises to 800 units. Conversely, raising the price to $55 lifts the margin to $25 and drops break-even to $12,000 ÷ $25 = 480 units. Run these what-ifs before you need them: knowing in advance that a $5 cost increase costs you 200 extra units a month turns a surprise into a decision — raise the price, find a cheaper input, or accept the new target with open eyes.`,
        ],
      },
      {
        heading: `Using Break-Even in Real Decisions`,
        paragraphs: [
          `The most common use is as a feasibility test. If break-even for a new product is 600 units a month and your realistic market is a few hundred customers, the idea fails on paper before it fails in the bank account — either the price, the cost structure or the idea itself has to change. The second use is target-setting: break-even extends naturally to target profit by treating the desired profit as an extra fixed cost. To make $6,000 a month in the example above, the business needs ($12,000 + $6,000) ÷ $20 = 900 units — a concrete sales target derived in one line.`,
          `For businesses with several products, calculate with a weighted-average contribution margin based on the actual sales mix — if 70% of sales come from a 40%-margin product and 30% from a 20%-margin product, the blended ratio is 0.7 × 40% + 0.3 × 20% = 34%, and break-even revenue is fixed costs ÷ 0.34. Watch the mix as well as the total: a shift towards low-margin products raises the break-even point even if revenue stays the same, which is why "sales are up but profit is down" so often traces back to mix. Our break-even calculator runs these figures for you; the judgement about whether the required volume is achievable remains, unavoidably, yours.`,
        ],
      },
      {
        heading: `What Break-Even Analysis Misses`,
        paragraphs: [
          `The model rests on simplifying assumptions, and knowing them is part of using it well. It assumes the price stays constant at any volume — but in reality, selling more often requires discounts, and buying more inputs can raise or lower their cost. It assumes fixed costs truly stay fixed, yet step costs appear as you grow: the second premises, the second delivery van, the first manager. It assumes everything produced is sold, so it says nothing about unsold inventory tying up cash. And it is usually calculated per period in profit terms, ignoring cash timing entirely: a business can be above break-even on paper while struggling to pay this month's rent because customers pay 60 days late. Profit and cash are different things, and break-even only measures the first.`,
          `It also says nothing about demand. Break-even tells you the volume you need; it cannot tell you whether that volume exists at that price. Taxes, financing costs and one-off expenditures usually sit outside the simple model too. None of this invalidates the tool — it remains the fastest sanity check in business — but it defines its role: a first filter and a target-setting device, not a business plan. Use it to kill unworkable pricing quickly, to set volume targets, and to understand your sensitivity to price and cost changes. Then do the harder work of checking whether the customers are actually there.`,
        ],
      },
    ],
    relatedToolSlugs: [`break-even-calculator`, `profit-margin-calculator`],
    faq: [
      {
        question: `Is break-even the same as payback period?`,
        answer: `No. Break-even is about a period's ongoing trading: the sales level at which revenue covers the fixed and variable costs of that period. Payback period is about an investment: how long it takes for the cash generated by a project to repay its initial upfront cost. A business can be past break-even every month and still be years from paying back the money spent setting it up.`,
      },
      {
        question: `How do I calculate break-even for a service business with no product?`,
        answer: `Treat the billable hour (or the project) as the unit. Your price is the hourly rate; your variable cost is the direct cost of delivering one hour — the freelancer or staff time bought per hour, per-project tools or subcontractors. Fixed costs are rent, salaries, software and insurance as usual. Break-even units then becomes the number of billable hours you must sell per month, which for many service firms is the most useful number in the business.`,
      },
      {
        question: `Should my own salary be included in fixed costs?`,
        answer: `Yes, if you want the break-even point to mean "the business genuinely supports itself". If your salary is excluded, the calculated break-even is the point where the business covers everything except paying you — and the apparent "profit" above it is partly just your unpaid labour. Including a realistic salary gives a higher, more honest target. Sole traders who draw profit instead of a salary should at least know which of the two numbers they are looking at.`,
      },
      {
        question: `What if I sell several products with different margins?`,
        answer: `Use a weighted-average contribution margin based on your sales mix. Multiply each product's margin ratio by its share of total revenue and add the results: for example, 70% of revenue at a 40% margin and 30% at a 20% margin gives a blended 34%, and break-even revenue is fixed costs divided by 0.34. Recalculate when the mix shifts, because selling proportionally more low-margin products raises your break-even point even at identical total revenue.`,
      },
    ],
  },
  {
    slug: `how-mortgage-payments-are-calculated`,
    title: `How Mortgage Payments Are Calculated: Principal, Interest and Term`,
    metaDescription: `How mortgage payments are calculated: the amortisation formula in plain words, why early payments are mostly interest, and how the term changes the total cost.`,
    intro: `A mortgage payment looks deceptively simple: the same amount leaves your account every month for decades. Yet borrowers are often unsettled by their first annual statement, which shows that after a year of payments the balance has barely moved. Nothing has gone wrong — that is how amortisation is designed to work. The monthly payment is calculated so that a fixed sum, paid every month, exactly clears the loan plus all its interest by the end of the term, and in the early years most of that payment is interest because the balance it is charged on is at its largest. This guide explains the moving parts, translates the amortisation formula into plain words, works a complete example — $300,000 borrowed at 6% — shows why the interest/principal split shifts over time, compares a 15-year term with a 30-year term using real numbers, and covers fixed versus variable rates and the surprisingly large effect of modest overpayments.`,
    sections: [
      {
        heading: `The Moving Parts: Principal, Rate, Term and Frequency`,
        paragraphs: [
          `Four inputs determine a mortgage payment. The principal is the amount borrowed — the property price minus your deposit. The interest rate is the annual rate the lender charges; for a monthly-payment mortgage it is applied as a monthly rate, the annual rate divided by 12 (some countries and lenders compound slightly differently, which shifts results by small amounts). The term is the number of years over which the loan is scheduled to be repaid, converted into the number of payments: 12 per year over 30 years is 360 payments. And the payment frequency — monthly for most mortgages — sets how often interest is charged and the balance reduced.`,
          `One clarification saves a lot of confusion: the figure produced by the standard formula covers principal and interest only. The amount that actually leaves your account may be higher, because many lenders and servicers add property taxes, buildings insurance or mortgage insurance to the monthly collection, and arrangements differ widely by country. When a real payment differs from a calculator's answer, the difference is almost always these add-ons or fees, not a different formula. Keep that separation in mind throughout this guide: everything here is about the principal-and-interest core of the payment.`,
        ],
      },
      {
        heading: `The Amortisation Formula in Plain Words`,
        paragraphs: [
          `The formula is: monthly payment = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments. It looks forbidding, but its logic is plain. The lender needs a level monthly payment such that, if every payment is made on schedule, the loan is exactly repaid at payment n — no balance left over, none overpaid. The formula solves for that payment directly, taking into account that each payment must cover that month's interest and chip away at the balance, with the balance — and therefore the interest — shrinking every month.`,
          `The mechanism inside each payment is simple enough to state in one sentence: every month, interest is charged on the balance outstanding at the start of the month, and whatever is left of the fixed payment after paying that interest reduces the balance. Because the payment is fixed but the interest portion falls as the balance falls, the principal portion automatically grows over time. That single rule generates the entire amortisation schedule — every row of it — and explains every behaviour described in the rest of this guide, including why early payments feel unproductive and why overpayments are so powerful.`,
        ],
      },
      {
        heading: `Worked Example: $300,000 at 6% Over 30 Years`,
        paragraphs: [
          `Borrow $300,000 at a fixed annual rate of 6%, repaid monthly over 30 years. The monthly rate is r = 0.06 ÷ 12 = 0.005, and the number of payments is n = 360. The growth factor (1.005)^360 works out to about 6.0226. Putting it together: payment = $300,000 × 0.005 × 6.0226 ÷ (6.0226 − 1) = $300,000 × 0.030113 ÷ 5.0226, which gives a monthly payment of $1,798.65. That is the level payment which, made 360 times, exactly clears the loan.`,
          `Now look at the first payment through the mechanism from the previous section. Interest on the opening balance: $300,000 × 0.005 = $1,500. The payment is $1,798.65, so the principal repaid is $1,798.65 − $1,500 = $298.65 — just 17% of the payment — and the balance falls to $299,701.35. Over the full term, the 360 payments total about $647,515, of which roughly $347,515 is interest: more than the amount originally borrowed. That total is not a lender trick or a penalty; it is the arithmetic consequence of owing an average balance in the hundreds of thousands for three decades at 6%. It is also the number to hold in mind when comparing terms, as the next sections show.`,
        ],
      },
      {
        heading: `Why the Split Shifts: Interest-Heavy at the Start`,
        paragraphs: [
          `Because interest is charged on the outstanding balance, and the balance starts at its maximum, interest dominates early payments and fades as the balance falls. The scale of the effect surprises most people. After five years of payments on the example loan — 60 payments totalling $107,919 — the balance has fallen by only about $20,837, to roughly $279,163. Over $87,000 of those five years of payments went to interest. Nothing was misapplied; with a balance near $300,000, the interest charge alone is near $1,500 a month, leaving little of a $1,798.65 payment to cut the balance.`,
          `The crossover comes slowly. Halfway through the term, after 15 years, the balance is still about $213,147, and the next payment splits into $1,065.73 of interest — 59% of the payment — and $732.92 of principal. Only in the later years, once the balance is well down, does principal become the larger share and the balance start falling visibly fast. Two practical conclusions follow. First, judging a mortgage by its first statements is misleading; the schedule is back-loaded by design. Second, extra payments made early attack the balance when interest is being charged on its largest value, which is why overpayments punch above their weight — the subject of the final section.`,
        ],
      },
      {
        heading: `Term Length: Lower Payment, Much Higher Total Cost`,
        paragraphs: [
          `Shorten the same loan — $300,000 at 6% — to a 15-year term and the formula gives a monthly payment of $2,531.57. That is $732.92 more per month than the 30-year payment of $1,798.65, which is a serious difference in a monthly budget. But look at the totals: 180 payments of $2,531.57 come to about $455,683, of which roughly $155,683 is interest. Compared with the 30-year term's roughly $347,515 of interest, the shorter term saves about $191,832 — the borrower pays back barely more than half as much interest, because the balance is attacked faster and has far less time to accrue charges.`,
          `Neither choice is simply "better"; they trade monthly affordability against total cost. The 30-year term's lower required payment leaves room in the budget and provides a safety margin if income drops — a missed payment has consequences no interest saving justifies. The 15-year term builds equity far faster and costs dramatically less overall, but commits you to the higher payment in good months and bad. A middle path many borrowers use is a longer term combined with overpayments when times are good — though that only works if the overpayments actually happen, and some loans limit them.`,
        ],
      },
      {
        heading: `Fixed vs Variable Rates, and the Effect of Overpayments`,
        paragraphs: [
          `With a fixed rate, the rate — and therefore the principal-and-interest payment — stays the same for the fixed period, and the amortisation schedule printed at the start remains accurate for years. The lender carries the risk of rates rising; you carry the risk that rates fall and you are stuck above the market until the fixed period ends or you pay any early-repayment charges to leave. With a variable (floating or tracker) rate, the rate moves with a reference rate set by a central bank or the lender, and each change re-runs the calculation: the lender recomputes your payment so the loan still clears by the end of the term at the new rate. Variable rates often start lower than fixed ones, but "often" is not "always", and the honest comparison includes what happens to your budget if the rate rises by two or three percentage points.`,
          `Overpayments exploit the mechanism directly: every extra dollar paid reduces the balance, so every future month's interest charge is smaller. On the example loan, adding just $200 a month — paying $1,998.65 instead of $1,798.65 — clears the loan in about 278 months instead of 360, nearly seven years early, and saves roughly $91,000 in interest. The saving is so large because the extra $200 is pure principal reduction applied from the very first month, when the balance and therefore the interest are at their peak. Before relying on this strategy, check your loan's terms: some mortgages cap overpayments (a percentage of the balance per year is a common limit) or charge fees for early repayment during a fixed period, and those rules vary by lender and country. Our mortgage calculator lets you test term and rate combinations against these examples; run your own figures before committing to a term.`,
        ],
      },
    ],
    relatedToolSlugs: [`mortgage-calculator`, `loan-calculator`, `compound-interest-calculator`],
    faq: [
      {
        question: `Why is my first mortgage payment mostly interest?`,
        answer: `Because interest is charged on the full outstanding balance, which is at its largest at the start. On a $300,000 loan at 6%, the first month's interest alone is $1,500 of the $1,798.65 payment, leaving $298.65 for principal. As the balance falls, the interest share shrinks and the principal share grows automatically — by the final years, almost the entire payment is principal.`,
      },
      {
        question: `How does a bigger deposit change the monthly payment?`,
        answer: `It reduces the principal, and the payment scales in direct proportion at the same rate and term. Borrowing $240,000 instead of $300,000 (a 20% smaller loan) at 6% over 30 years gives a payment of $1,798.65 × 0.8 = $1,438.92 — exactly 20% lower. A bigger deposit also usually means borrowing at a lower loan-to-value band, which can qualify for better rates, compounding the benefit.`,
      },
      {
        question: `Is it better to take a shorter term, or a longer term and overpay?`,
        answer: `Mathematically, the shorter term guarantees the interest saving, because the higher payment is compulsory. The longer-term-plus-overpayments route can reach a similar result with more flexibility — you can pause overpayments in a tight month — but it depends entirely on discipline, and the required payment stays low while the balance stays high if overpayments lapse. Check overpayment limits too: some fixed-rate loans cap annual overpayments or charge early-repayment fees, which can change which option wins.`,
      },
      {
        question: `Why is my actual monthly payment higher than the calculator shows?`,
        answer: `The standard formula — and most calculators, including ours — calculates principal and interest only. Many lenders add property taxes, buildings insurance, mortgage insurance or service fees to the monthly collection, and these vary by country and lender. If your payment differs, ask the lender for the breakdown; the principal-and-interest component should match the formula's result for your balance, rate and term.`,
      },
    ],
  },
];
