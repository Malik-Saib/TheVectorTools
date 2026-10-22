// Expanded editorial content for tool pages.
// Each entry complements the base registry entry in toolsRegistry.ts
// (howToUse / howItWorks / example / faq) with deeper, tool-specific
// methodology, a multi-section guide, extra worked examples and extra FAQs.

export interface ToolContentEntry {
  howItWorksExtended?: string;
  guide: { heading: string; paragraphs: string[] }[];
  extraExamples?: { title: string; scenario: string; calculation: string; result: string }[];
  extraFaqs?: { question: string; answer: string }[];
}

export const TOOL_CONTENT: Record<string, ToolContentEntry> = {
  // ============================================================
  // SALARY CALCULATOR
  // ============================================================
  'salary-calculator': {
    howItWorksExtended: `Beyond applying headline tax brackets, a gross-to-net calculation works out your taxable income: gross pay minus the standard employee expenses lump sum and a small special-expenses allowance, unless higher actual deductions are entered. German wage tax then follows the statutory progressive tariff, in which the marginal rate rises through the progression zone before reaching the top rates. Social insurance is calculated separately on gross pay, branch by branch — pension and unemployment at half the total rate each, health at half the base rate plus half of your insurer's additional contribution, and long-term care with a surcharge for childless employees over 23. Each branch stops at its own contribution ceiling, which softens deductions at very high incomes. All results are estimates on standard assumptions, not payroll-grade figures.`,
    guide: [
      {
        heading: 'From gross to net in Germany, step by step',
        paragraphs: [
          `A German payslip calculation always runs in the same order. First, social insurance contributions are calculated on your gross salary, separately for pension, unemployment, health and long-term care insurance. Second, wage tax (Lohnsteuer) is worked out — not simply on the full gross amount, but on taxable pay after standard allowances such as the employee expenses lump sum. Only after both blocks are known can anything else be deducted.`,
          `If you are a member of a church that levies church tax, that tax is charged as a percentage of your wage tax — 8 percent in Bavaria and Baden-Württemberg, 9 percent in the other states. The solidarity surcharge now only applies at very high incomes, so most employees see it as zero. What remains after all deductions is your net pay, transferred to your bank account. Your employer's own social contributions are paid on top of your gross salary and are not deducted from it.`,
        ],
      },
      {
        heading: 'Reading your Lohnabrechnung line by line',
        paragraphs: [
          `The header of a German payslip (Lohnabrechnung) carries the settings that drive the whole calculation: your tax class, child allowances (Kinderfreibeträge), religious affiliation, health insurer, and your social insurance number. If any of these are wrong — a missing child allowance, for example — every figure below them will be off, so this block is worth checking whenever you change employer, marry, or have a child. Most payslips also show cumulative year-to-date totals next to the monthly figures.`,
          `The body of the payslip moves from Gesamtbrutto (total gross) through the individual tax and contribution lines to your Nettoentgelt (net entitlement). The final Auszahlungsbetrag (payment amount) can still differ from that net figure: advances, benefits in kind, capital-forming payments (vermögenswirksame Leistungen) or garnishments are settled after net pay is established. A difference between net entitlement and the amount actually paid out is therefore normal and is explained by these final lines.`,
        ],
      },
      {
        heading: 'The six tax classes explained',
        paragraphs: [
          `Tax class I applies to single employees without children and is the default most people start in. Class II is reserved for single parents and includes an additional relief amount. Married couples are placed in the combination IV/IV by default; they can switch to III/V, where the higher earner in class III is withheld much less each month and the partner in class V correspondingly more, or choose the factor method under class IV, which spreads the withholding more evenly between them.`,
          `Class VI applies to a second or further job held alongside a main job, and withholds tax without the basic allowances, which makes a second job look heavily taxed month to month. In every case, the tax class only changes the monthly advance withholding — your final annual tax bill is settled in the annual tax assessment. Couples who choose III/V are required to file a return, and it is common for that return to balance out the monthly advantage.`,
        ],
      },
      {
        heading: 'Common gross-to-net mistakes',
        paragraphs: [
          `The most frequent mistake is comparing gross salaries across countries as if they were equivalent. A gross salary in Germany funds pension, health, unemployment and care insurance through the contribution block, while a similar-looking gross figure elsewhere may leave you paying for private health cover or retirement saving yourself. Meaningful comparisons start from net pay plus what the contributions actually buy you in each system.`,
          `A second group of mistakes comes from one-off payments. Bonuses, holiday pay and a thirteenth salary are taxed as other payments (sonstige Bezüge) using a projected annual figure, so the month containing a bonus is withheld at a noticeably higher rate than a normal month. Multiplying one good or bad month by twelve therefore misleads in both directions; annual figures are the reliable basis for planning.`,
        ],
      },
      {
        heading: 'Why an estimate can differ from real payroll',
        paragraphs: [
          `No calculator can see the individual settings stored in your employer's payroll system. Your health insurer's exact additional contribution rate, a tax allowance (Freibetrag) registered on your payroll tax record, a company car taxed under the 1 percent rule, or salary sacrifice into a pension scheme all move the final figure — sometimes by more than a hundred euros a month — without changing your gross salary at all.`,
          `Employers also run payroll using the finance ministry's official calculation scheme, apply its rounding rules, and correct earlier months when data changes retroactively, for instance after a health insurer raises its additional contribution in January. Many employers perform an annual wage tax adjustment in December, which is why the last payslip of the year often deviates from the pattern. Treat any calculator result as a planning figure that should land close to, but not necessarily exactly on, your real payslip.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Monthly payslip at €4,000 gross (tax class I, no church tax)',
        scenario: 'A single employee in Germany earns €4,000 gross per month, is in tax class I, has children, and is not liable for church tax. Social contributions are estimated at the standard employee shares.',
        calculation: 'Social insurance: pension 9.3% = €372.00, unemployment 1.3% = €52.00, health 8.55% = €342.00, long-term care 1.8% = €72.00 → total €838.00. Estimated wage tax ≈ €505. Net = €4,000 − €838 − €505 = €2,657.',
        result: 'Estimated net: ~€2,657 per month (wage tax is an estimate; the exact figure depends on payroll settings)',
      },
      {
        title: 'Same salary in tax class III',
        scenario: 'The same employee marries and, as the higher-earning partner, moves to tax class III while the partner takes class V. Gross pay and social contributions do not change; only the monthly wage tax withholding falls.',
        calculation: 'Social insurance stays €838.00 (9.3% + 1.3% + 8.55% + 1.8% of €4,000). Estimated wage tax in class III ≈ €260. Net = €4,000 − €838 − €260 = €2,902.',
        result: 'Estimated net: ~€2,902 per month — about €245 more monthly, settled finally in the couple’s joint annual assessment',
      },
    ],
    extraFaqs: [
      {
        question: 'Does the calculator include church tax?',
        answer: 'Many estimates default to no church tax, which is correct only if you are not a member of a tax-levying church. Church members pay 8 percent of their wage tax in Bavaria and Baden-Württemberg and 9 percent elsewhere, so on €500 of monthly wage tax that is an extra €40 to €45 deducted every month — enough to explain most of a gap between an estimate and a real payslip.',
      },
      {
        question: 'Why is my December payslip different from the other months?',
        answer: 'December is where payroll corrections land. Many employers run an annual wage tax adjustment (Lohnsteuerjahresausgleich) that trues up rounding and small over- or under-withholding across the year, and Christmas bonuses or back pay are often settled in the same month. A December figure that is higher or lower than your usual net is usually this adjustment at work, not an error.',
      },
      {
        question: 'What is the midijob transition zone (Übergangsbereich)?',
        answer: 'Earnings just above the minijob threshold fall into a transition zone in which employee social contributions are not charged at the full rate from the first euro. Instead, the employee share is calculated with a formula that phases contributions in gradually up to the top of the zone. This makes part-time jobs in that band noticeably cheaper in contributions than a simple percentage-of-gross estimate would suggest.',
      },
    ],
  },

  // ============================================================
  // PERCENTAGE CALCULATOR
  // ============================================================
  'percentage-calculator': {
    howItWorksExtended: `The word percent means per hundred, so every percentage problem is a fraction problem: p percent of a quantity is the fraction p/100 multiplied by that quantity. The calculator covers the three standard forms — a percentage of a number, one number expressed as a percentage of another, and a percentage increase or decrease — by converting the percentage to a decimal, applying it, and converting back. For changes, the crucial detail is the reference base: an increase is calculated on the original value, while a later decrease acts on the new, larger value. Results use decimal precision and are rounded only for display. Reverse operations divide by the growth factor (1.20 for a 20 percent increase) rather than subtracting the percentage, which would use the wrong base.`,
    guide: [
      {
        heading: 'The three core formulas, and where they come from',
        paragraphs: [
          `Almost every percentage question reduces to one proportion: part divided by whole equals percent divided by 100. Rearranging that single proportion gives all three core formulas. To find a percentage of a number, multiply: 30 percent of 250 is (30/100) × 250 = 75. To express one number as a percentage of another, divide and multiply by 100: 45 out of 180 is (45/180) × 100 = 25 percent.`,
          `The third formula covers change: percentage change equals (new value − old value) / old value × 100. The denominator is always the old value, because change is measured relative to where you started. A price rising from €80 to €100 has changed by (100 − 80)/80 × 100 = 25 percent — not 20 percent, which is the answer you get if you mistakenly divide by the new value.`,
        ],
      },
      {
        heading: 'Percentage points are not percent',
        paragraphs: [
          `When the thing being measured is itself a percentage, two different kinds of change exist. If a central bank raises its interest rate from 2 percent to 3 percent, the rate has risen by 1 percentage point — but it has risen by 50 percent relative to its previous level, because (3 − 2)/2 × 100 = 50 percent. Both statements describe the same event; they answer different questions.`,
          `Confusing the two is one of the most common errors in news and business reporting. A party whose support grows from 20 percent to 24 percent has gained 4 percentage points, which is a 20 percent relative increase in its vote share. Whenever you read that a rate, margin or share changed by some percent, check whether the writer means points or a relative change — the practical difference can be a factor of ten or more.`,
        ],
      },
      {
        heading: 'Reverse percentages: undoing an increase or decrease',
        paragraphs: [
          `Reverse percentage problems start from the value after a change and ask for the original. The tempting method — subtracting the same percentage — is wrong, because the percentage was charged on the original base, not on the final amount. If a sale price of €60 already includes a 25 percent discount, the original price is not €60 plus 25 percent of €60 (€75). It is €60 / 0.75 = €80, because the sale price is 75 percent of the original.`,
          `The same logic extracts tax from a tax-inclusive price. If an item costs €119 including 19 percent VAT, the net price is €119 / 1.19 = €100 and the tax inside it is €19. Taking 19 percent of €119 (€22.61) overstates the tax, because VAT is charged on the net price, not on itself. Dividing by the growth factor — 1.19 here — is the general method for every reverse percentage problem.`,
        ],
      },
      {
        heading: 'Discounts and tax combined',
        paragraphs: [
          `When a discount and a tax both apply, the operations are sequential multiplications, and each percentage acts on the result of the previous step. A €120 jacket with 25 percent off costs €120 × 0.75 = €90; adding 8 percent sales tax gives €90 × 1.08 = €97.20. Combined, the two steps equal a single factor of 0.75 × 1.08 = 0.81 — you pay 81 percent of the list price, which is neither 25 − 8 = 17 percent off nor any simple sum of the two rates.`,
          `Real bills can deviate from this clean pattern for practical reasons. Some jurisdictions charge tax on shipping, some coupons are applied after tax, and cashback or loyalty credit is usually calculated on the amount actually paid rather than the list price. When a receipt does not match your calculation, the difference is almost always in what base each percentage was applied to — checking the base of each step resolves most discrepancies.`,
        ],
      },
      {
        heading: 'The most common percentage errors',
        paragraphs: [
          `Adding and averaging percentages with different bases is the classic trap. A portfolio that falls 50 percent and then rises 50 percent has not broken even: €100 becomes €50, and 50 percent of €50 is only €25, leaving €75. Recovering from a 50 percent loss requires a 100 percent gain, because the recovery percentage is calculated on the reduced base. The deeper the loss, the more disproportionate the required recovery.`,
          `Two quieter errors deserve equal care. First, percentage change must always be divided by the original value, never the new one. Second, a percent of a percent is usually tiny: 10 percent of a 5 percent tax is 0.5 percent of the whole, not 15 percent of anything. Writing down the base next to every percentage — '25 percent of what?' — prevents nearly all of these mistakes before any calculation begins.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Discount first, then sales tax',
        scenario: 'A jacket is listed at $120. The store offers 25% off, and 8% sales tax is charged on the discounted price at checkout.',
        calculation: 'Discounted price: $120 × 0.75 = $90.00. Tax: $90 × 0.08 = $7.20. Total: $90 + $7.20 = $97.20.',
        result: 'You pay $97.20 — an effective 19% below the list price, not 25% − 8% = 17%',
      },
      {
        title: 'Finding the salary before a raise (reverse percentage)',
        scenario: 'After a 12% pay rise, an employee now earns €3,360 per month. What was the salary before the rise?',
        calculation: 'The new salary is 112% of the old one, so old salary = €3,360 / 1.12 = €3,000. Check: €3,000 × 1.12 = €3,360. (Subtracting 12% of €3,360 would wrongly give €2,956.80.)',
        result: 'Original salary: €3,000 per month',
      },
    ],
    extraFaqs: [
      {
        question: 'If something increases by 50% and then decreases by 50%, is it back to the original?',
        answer: 'No. The increase and the decrease act on different bases. Starting at 200, a 50 percent increase gives 300, but a 50 percent decrease from 300 removes 150, leaving 150 — a net loss of 25 percent overall. To return exactly to the start after a 50 percent rise, the fall would need to be 33.33 percent, because that percentage is taken from the larger intermediate value.',
      },
      {
        question: 'How do I find the price before VAT was added?',
        answer: 'Divide the tax-inclusive price by 1 plus the VAT rate as a decimal. For a €238 price that includes 19 percent VAT, the net price is €238 / 1.19 = €200, and the VAT inside it is €38. Do not subtract 19 percent of €238 (€45.22): VAT was charged on the net price, so it must be removed by division, not as a percentage of the gross.',
      },
      {
        question: 'What is the difference between a percent and a percentile?',
        answer: 'A percent is a share of a whole: scoring 80 percent on a test means you earned 80 of every 100 marks. A percentile is a position: scoring in the 80th percentile means you did as well as or better than 80 percent of candidates. A difficult exam can put a 55 percent score in the 90th percentile, and an easy one can put 90 percent in the 60th.',
      },
    ],
  },

  // ============================================================
  // CURRENCY CONVERTER
  // ============================================================
  'currency-converter': {
    howItWorksExtended: `A converter multiplies your amount by a quoted exchange rate, but the important detail is which rate. Reference converters typically show mid-market or central-bank reference rates: a benchmark derived from wholesale trading, useful for comparison and accounting but not a price at which any bank will deal. The opposite direction uses the inverse rate (1 divided by the original rate), and conversions between two non-base currencies are routed through a common base currency. The multiplication is carried out at full precision; only the displayed result is rounded — to two decimal places, or whole units for currencies such as the yen, which are not subdivided in everyday use. Because reference rates update on a schedule rather than continuously, a converter figure is a benchmark, not a locked quote.`,
    guide: [
      {
        heading: 'The mid-market rate, and why you cannot quite get it',
        paragraphs: [
          `Banks trade currencies with each other in a wholesale market where every currency pair has two prices: a bid price, at which the market buys, and an ask price, at which it sells. The mid-market rate is simply the midpoint between those two. News sites, search engines and reference converters quote this midpoint because it is the fairest single summary of what a currency is worth at a given moment.`,
          `Retail customers, however, never trade at the midpoint. A bank or exchange service moves its customer rate away from the mid-market rate by a margin, and that margin is how the service gets paid even when it advertises zero commission. A converter showing the mid-market rate therefore tells you the value before any provider's margin — the benchmark against which every real quote should be measured, not a promise of the amount you will receive.`,
        ],
      },
      {
        heading: 'Spreads and fees: the two costs of exchanging money',
        paragraphs: [
          `The spread is the gap between the rate at which a provider sells a currency and the rate at which it buys the same currency back. If the mid-market rate for a pair is 1.00 and a bureau sells to you at the equivalent of 0.97 while buying back at 1.03, the round trip alone costs about 6 percent before any explicit fee. Wide spreads are typical at airports and hotels; banks and specialist transfer services usually quote much closer to the mid-market rate.`,
          `On top of the spread, many providers add visible charges: a fixed transfer fee, a percentage commission, or a foreign transaction fee on card payments. Fixed fees punish small conversions disproportionately — a flat €5 fee is 5 percent of a €100 exchange but only 0.5 percent of €1,000. Comparing the total amount of foreign currency you actually receive for a given payment, rather than comparing headline rates or fee claims, is the only comparison that captures both costs at once.`,
        ],
      },
      {
        heading: 'Why two quotes for the same conversion always differ',
        paragraphs: [
          `Give the same amount and currency pair to five providers and you will receive five different results. Each provider sets its own margin over the mid-market rate according to its costs and business model, so the quote difference is mostly margin difference. Quotes also move with the market: exchange rates shift continuously while markets are open, so a quote captured in the morning is not measuring exactly the same market as one captured in the afternoon.`,
          `Timing effects explain the rest. Some providers refresh their customer rates only at set intervals and add a protective buffer at weekends, when wholesale markets are closed and the rate could jump before trading reopens. Large conversions may qualify for a better tier than small ones at the same provider. None of this means one quote is wrong — it means each quote is a retail price from a different seller, built on the same moving wholesale benchmark.`,
        ],
      },
      {
        heading: 'Rounding and minor units',
        paragraphs: [
          `Most familiar currencies divide into 100 minor units — cents, pence, centimes — and converted amounts are rounded to the nearest minor unit, so a calculated result like €46.275 is paid as €46.28. Some currencies work differently: the Japanese yen has no minor unit in everyday circulation and amounts are rounded to whole yen, while a few currencies divide into 1,000 parts. A good converter applies the correct convention for the target currency automatically.`,
          `Rounding also happens in cash. Several countries have withdrawn their smallest coins, so physical cash totals are rounded to the nearest 5 cents even though card payments remain exact to the cent. During a calculation itself, rounding should happen only at the very end: rounding an intermediate rate or a cross-rate leg early can shift the final figure by more than the final rounding ever would, especially on large amounts.`,
        ],
      },
      {
        heading: 'Historical and reference rates: which rate, on which day?',
        paragraphs: [
          `Central banks publish reference rates for exactly the situations where a neutral, citable figure is needed. The European Central Bank, for example, publishes euro reference rates once per working day, derived from a daily concertation between central banks in the early afternoon European time. These rates are not tradable prices; they exist so that accounts, tax filings, customs valuations and contracts can all point to the same impartial number.`,
          `The practical consequence is that the date of a rate matters as much as its value. An invoice issued on the last day of a month is usually converted at that day's (or that month's) reference rate, and using a rate from a week later will create a reconciliation difference even if every other figure is right. When a document states an amount in two currencies, recording which reference rate and which date were used alongside it makes the conversion auditable later.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Mid-market conversion vs. what a bank actually pays (hypothetical rates)',
        scenario: 'Hypothetical example with clearly illustrative rates: suppose the mid-market rate is 1 EUR = 1.08 USD, and you exchange €250. A bank applies a 2% margin to its customer rate.',
        calculation: 'At the mid-market rate: €250 × 1.08 = $270.00. With a 2% margin, the effective rate is 1.08 × 0.98 = 1.0584, so you receive €250 × 1.0584 = $264.60.',
        result: 'Benchmark value $270.00 vs. $264.60 actually received — the 2% margin costs $5.40 on this exchange',
      },
      {
        title: 'Converting into a currency with no minor unit (hypothetical rate)',
        scenario: 'Hypothetical example: suppose the rate is 1 USD = 155 JPY, and you convert $200 into Japanese yen for a trip.',
        calculation: '$200 × 155 = ¥31,000. Because the yen is not subdivided in everyday use, the result is a whole number — there is no rounding to decimals to consider.',
        result: '$200 = ¥31,000 at the illustrative rate of 155 (the inverse rate is 1 JPY = 1/155 ≈ 0.00645 USD)',
      },
    ],
    extraFaqs: [
      {
        question: 'What is an inverse rate and how is it calculated?',
        answer: 'The inverse rate is the same exchange rate read in the opposite direction. If 1 USD = 0.92 EUR, then 1 EUR = 1 / 0.92 ≈ 1.087 USD. Converters compute the reverse direction this way rather than storing a second, independent rate, which guarantees that converting an amount and converting it straight back returns the starting figure before any provider margin is applied.',
      },
      {
        question: 'Why does the rate change over a weekend?',
        answer: 'Wholesale currency markets close from Friday evening to Monday morning in each major time zone sequence, so there is no live market rate to quote over the weekend. Providers typically hold Friday’s last rate and add a wider buffer to protect themselves against a gap when trading reopens. A reference rate published on Friday therefore stays in force until the next working day’s publication.',
      },
      {
        question: 'Should I use a reference rate for invoicing a client abroad?',
        answer: 'A published central-bank reference rate is a defensible choice because it is neutral, public and archived by date, so both parties can verify the figure later. State the rate, its source and its date on the invoice. Bear in mind the amount your bank credits will differ slightly, because it converts at its own customer rate when the payment arrives, not at the reference rate on the invoice.',
      },
    ],
  },

  // ============================================================
  // WORD COUNTER
  // ============================================================
  'word-counter': {
    howItWorksExtended: `Counting involves real decisions. Text is first normalised — punctuation is separated from the words it touches, and sequences of letters, numbers and internal apostrophes or hyphens are treated as single tokens, so words like "state-of-the-art" and figures like "1,250" are handled consistently instead of being split apart. Sentences are detected from terminal punctuation, with care for abbreviations and decimal points that use the same marks without ending a sentence, and paragraphs are counted from blank-line breaks rather than single line wraps. Characters are reported with and without spaces, because platforms and assignments use different conventions. Reading and speaking times are then derived from the word count using average pace benchmarks, which is why they are labelled estimates for a typical reader or speaker.`,
    guide: [
      {
        heading: 'Reading and speaking time: the benchmarks behind the numbers',
        paragraphs: [
          `Reading-time estimates start from average silent reading speeds for adults, which research and publishing practice generally place in a band of roughly 180 to 250 words per minute for ordinary non-fiction in a reader's first language. Many tools, including this one, settle on a round figure inside that band. Dense technical, legal or academic text is read much more slowly, while familiar, lightly formatted material is skimmed considerably faster, so any single estimate is a midpoint, not a prediction.`,
          `Speaking is slower than reading. A comfortable presentation pace is roughly 120 to 150 words per minute; faster delivery becomes hard to follow, and pauses, emphasis and audience reaction consume additional time. As a planning rule, a 1,500-word script therefore produces about ten to twelve minutes of speech. Speakers preparing for a fixed slot should always rehearse aloud once, because a script's difficulty — names, numbers, quotations — affects real delivery more than its raw length does.`,
        ],
      },
      {
        heading: 'Keyword density: what it measures and what it does not',
        paragraphs: [
          `Keyword density is the share of a text taken up by a chosen word or phrase: occurrences divided by total words, multiplied by 100. If a 1,000-word article uses a key term 15 times, its density is 1.5 percent. For a multi-word phrase, counting conventions differ — some tools count the phrase as one unit, others count every word inside it — so two tools can report different densities for the identical text.`,
          `Density is a descriptive statistic, not a quality score. Very high density usually signals awkward, repetitive writing that readers and search engines both dislike, while very low density may mean the page never clearly addresses its topic. Experienced editors use the figure mainly as a sanity check — confirming the main term actually appears and that no word has been repeated to the point of distraction — rather than aiming at any target percentage.`,
        ],
      },
      {
        heading: 'Character limits on the platforms you actually use',
        paragraphs: [
          `Character limits are the hard version of word counting. A standard post on X allows 280 characters, and the count is weighted: most characters count as one, characters in scripts such as Chinese, Japanese and Korean count as two, and every link is counted at a fixed length regardless of its real length. Instagram captions allow up to 2,200 characters, and LinkedIn posts up to 3,000 characters, though both platforms cut off the visible preview long before the limit is reached.`,
          `Text messages have their own arithmetic: a single SMS segment holds 160 characters in the basic GSM alphabet, but adding characters outside that alphabet — many accented letters or any emoji — switches the message to a Unicode encoding that holds only 70 characters per segment, which is why one emoji can turn a one-part message into a three-part bill. Platform limits also change over time, so treat any published figure as current at the time of checking rather than permanent.`,
        ],
      },
      {
        heading: 'How writers and editors actually use word counts',
        paragraphs: [
          `Professionally, word count is a contract and planning tool before it is anything else. Briefs specify lengths because length drives layout, print signatures, translation cost and reading effort; a feature commissioned at 2,000 words that arrives at 3,400 creates real production problems. Editors cutting an over-long draft often work to a percentage — 'this needs to lose 20 percent' — and use the counter to track the cut objectively instead of relying on feel.`,
          `Counts also shape revision inside the text. Average sentence length, visible in the sentence and word totals together, is a practical readability signal: a draft averaging 30 words per sentence will usually feel heavy, and splitting the longest sentences is a reliable way to lift it. Translators and localisation teams watch counts for a different reason — translated text is often longer or shorter than its source, so the original count drives layout buffers and subtitling decisions.`,
        ],
      },
      {
        heading: 'Word count and SEO: an honest account',
        paragraphs: [
          `There is no official minimum word count that makes a page rank, and search engines have repeatedly said word count is not itself a ranking factor. The belief that longer is automatically better comes from a real observation — pages that cover a topic thoroughly tend to satisfy searchers, and thorough coverage usually takes more words — confused into a rule. Padding a thin answer with filler to reach an arbitrary target adds length without coverage and can make a page worse for readers.`,
          `Used properly, word count is a diagnostic. If every competing page answering a question runs to 1,500 words and yours runs to 200, the gap hints at subtopics you have not covered — examples, exceptions, steps, definitions — rather than proving you must write 1,500 words. The constructive response is to list what the longer pages explain that yours does not, cover the genuinely useful parts in your own structure, and let the final count be whatever that takes.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Timing a spoken presentation',
        scenario: 'You have written a 750-word script for a talk and expect to present at a measured pace of about 130 words per minute.',
        calculation: '750 / 130 = 5.77 minutes, and 0.77 × 60 ≈ 46 seconds, so the spoken time is about 5 minutes 46 seconds — before pauses, slides or questions.',
        result: 'Speaking time: ~5¾ minutes; in a strict 5-minute slot you would need to cut roughly 100 words',
      },
      {
        title: 'Working out keyword density by hand',
        scenario: 'An 800-word article mentions its main keyword 12 times. You want the keyword density as a percentage.',
        calculation: 'Density = (12 / 800) × 100 = 0.015 × 100 = 1.5%.',
        result: 'Keyword density: 1.5% — a moderate figure that mainly confirms the term is present without dominating the text',
      },
    ],
    extraFaqs: [
      {
        question: 'Why does this counter give a different word count from my word processor?',
        answer: 'Programs disagree at the edges. Word processors include text in text boxes, footnotes, endnotes and headers in their totals, while a pasted-into-the-browser count only sees the text you pasted. Tools also differ on whether numbers, hyphenated compounds and words joined by slashes count as one word or several. Small differences are therefore normal; large differences mean one tool is counting extra document elements the other cannot see.',
      },
      {
        question: 'Do hyphenated words and numbers count as one word or several?',
        answer: 'Most counters, including this one, treat a hyphenated compound such as "well-known" as a single word, and a formatted number such as "1,250" or "3.14" as a single word too. Not every tool agrees — some split on every hyphen — which is one reason counts vary between tools. For submissions, what matters is the convention of the tool your institution or publisher uses, so check borderline cases against it.',
      },
      {
        question: 'How many words is a 10-minute speech?',
        answer: 'At a comfortable presentation pace of roughly 120 to 150 words per minute, ten minutes of speech needs about 1,200 to 1,500 words of script. Plan toward the lower end if your talk includes demonstrations, pauses for laughter or applause, video clips or questions, because all of those consume slot time without consuming script. A single timed rehearsal is worth more than any formula for hitting an exact slot.',
      },
    ],
  },

  // ============================================================
  // PDF TO JPG
  // ============================================================
  'pdf-to-jpg': {
    howItWorksExtended: `A PDF page is a set of resolution-independent drawing instructions — text, vector shapes and embedded images on a page measured in points, where 1 point is 1/72 of an inch. Converting to JPG means rasterising those instructions: the engine evaluates the page at a scale factor, paints it onto a pixel canvas, and encodes the canvas as a JPEG. That scale factor is what people call the output DPI — scale 1 gives 72 pixels per inch, scale 2 gives 150, and so on up to print resolution. Embedded bitmap images keep their own native resolution, so a page built around a low-resolution scan gains no detail from a higher setting. JPEG encoding discards some image information for a much smaller file, the quality setting controlling how much.`,
    guide: [
      {
        heading: 'DPI explained: 72, 150 or 300 — which do you need?',
        paragraphs: [
          `DPI (dots per inch) links the physical size of a PDF page to the pixel size of the image produced from it: pixels equal inches multiplied by DPI. An A4 page is about 8.27 × 11.69 inches, so at 72 DPI it becomes roughly 595 × 842 pixels, at 150 DPI roughly 1,240 × 1,754 pixels, and at 300 DPI roughly 2,480 × 3,508 pixels. Each step up multiplies the total pixel count — and usually the file size — by about four when the DPI doubles.`,
          `The right choice depends on where the image will be used. For on-screen viewing, messaging and quick previews, 72 to 150 DPI is normally enough, because screens display a limited number of pixels anyway. Use 150 DPI when the image will be read carefully on screen or enlarged moderately. Reserve 300 DPI for anything destined for print, or for pages whose fine print must survive enlargement, since 300 DPI is the long-standing standard for printed output at normal reading distance.`,
        ],
      },
      {
        heading: 'How a PDF page becomes an image',
        paragraphs: [
          `Rendering replays the PDF's instructions in order: backgrounds and vector shapes are drawn, embedded images are placed and scaled, and text is drawn from the embedded fonts at exactly the requested resolution. Because text and vector art are stored as mathematical descriptions rather than pixels, they render crisply at any DPI — this is why a digitally created PDF can produce a sharp 300 DPI image even though the file itself never mentioned pixels.`,
          `The exception is scanned documents. A scan-based PDF page is usually one big embedded photograph of the paper page, and its true detail is fixed by the scanner settings used when it was made. Rendering such a page at 300 DPI when the embedded scan only holds the equivalent of 120 DPI produces a larger file with smoother-looking edges, but no new detail: letterforms that were blobs in the scan stay blobs. Checking whether a PDF is digital or scanned explains most conversion surprises.`,
        ],
      },
      {
        heading: 'File size versus quality: the JPEG trade-off',
        paragraphs: [
          `JPEG compression shrinks images by discarding fine detail the human eye notices least, and the quality setting decides how much is discarded. High quality settings (around 90 and above) keep text edges and lines close to the rendered original at the cost of larger files; low settings can halve the file size again but introduce visible fuzz and blocky artefacts around letters and sharp colour boundaries — exactly the features documents are full of.`,
          `Pixel count matters as much as the quality setting. Because doubling the DPI quadruples the pixels, a 300 DPI page can easily produce a file several times larger than its 150 DPI version at the same quality. For most sharing purposes — email, forms, previews — 150 DPI at a high quality setting is the practical sweet spot. Step up to 300 DPI when the image will be printed, archived as a faithful copy, or cropped into, since cropping spends pixels quickly.`,
        ],
      },
      {
        heading: 'Privacy and security of client-side conversion',
        paragraphs: [
          `This converter renders pages inside your own browser using JavaScript and WebAssembly, so the PDF is never uploaded to a server. That removes a whole category of risk that server-based converters carry: your document cannot be retained, logged, breached or read on someone else's machine, and the conversion still works with the network cable pulled. For contracts, invoices, identity documents and medical or legal paperwork, that distinction is the main reason to prefer a client-side tool.`,
          `Two limits are worth knowing. First, the output JPG is an ordinary image: any protection the PDF carried — an open password, restrictions on copying or printing — does not transfer to the image, so treat the JPG with the same care as the document itself. Second, client-side processing protects the transfer, not your device; converting on a shared or compromised computer exposes the document there regardless of how private the tool is.`,
        ],
      },
      {
        heading: 'Batch tips, and fixing blurry output',
        paragraphs: [
          `For long documents, convert in batches rather than all at once: rendering holds every finished page in browser memory until you download it, so a 200-page file at 300 DPI can strain a modest laptop. Downloading pages in groups, or as a single archive when offered, keeps memory use predictable. A consistent naming scheme — document name plus page number — saves real time later, because a folder of images named 'page 1, page 2' becomes unsearchable almost immediately.`,
          `Blurry output has three usual causes, in order of likelihood. The render DPI was simply too low for how the image is being viewed — re-render at the next step up. The source page is a low-resolution scan, in which case no setting can restore detail that was never captured, and the honest fix is a better scan. Or the JPG has been re-saved repeatedly: every JPEG save discards a little more, so always re-export from the original PDF rather than re-saving an edited JPG.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Pixel size of an A4 page at 300 DPI',
        scenario: 'You need to convert an A4 PDF page for print and want to know the pixel dimensions the 300 DPI setting will produce.',
        calculation: 'A4 measures 210 mm × 297 mm, which is 8.27 in × 11.69 in. Width: 8.27 × 300 = 2,480 pixels (approx.). Height: 11.69 × 300 = 3,508 pixels (approx.). Total ≈ 2,480 × 3,508 ≈ 8.7 million pixels.',
        result: 'Output image: roughly 2,480 × 3,508 px (about 8.7 megapixels) — true print resolution for A4',
      },
      {
        title: 'Pixel size of a US Letter page at 150 DPI',
        scenario: 'A US Letter document (8.5 in × 11 in) is converted at 150 DPI for comfortable on-screen reading and emailing.',
        calculation: 'Width: 8.5 × 150 = 1,275 pixels. Height: 11 × 150 = 1,650 pixels.',
        result: 'Output image: 1,275 × 1,650 px — sharp on screen at full-page size, and a far smaller file than the 300 DPI version',
      },
    ],
    extraFaqs: [
      {
        question: 'Is rendering a page the same as extracting the images inside the PDF?',
        answer: 'No. Rendering draws the page — text, vector graphics and images combined — as one picture, exactly as the page looks. Extraction pulls out the embedded image files untouched, which can be higher quality but gives you only the pictures, without text, layout or anything drawn as vector art. Choose rendering to capture the page as it appears, and extraction when you only need a photo from inside it.',
      },
      {
        question: 'What happens to links, form fields and annotations in the JPG?',
        answer: 'They are flattened into the picture. A hyperlink looks like link text but is no longer clickable, filled form values appear as printed text, and comments or annotations that are set to display will be drawn into the image while hidden ones are not. Anything interactive in the PDF should be checked and, if needed, captured before converting, because none of it can be recovered from the JPG afterwards.',
      },
      {
        question: 'Why is my JPG sometimes larger than the original PDF?',
        answer: 'A PDF stores text and vector shapes as instructions — a text page can be a few kilobytes — while a JPG must store a colour value for every pixel of the page, millions at print resolution. More graphics and higher DPI widen the gap. This is expected, not a fault — and why PDFs remain better for archiving what you do not need as images.',
      },
    ],
  },
};
