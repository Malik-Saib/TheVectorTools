// Expanded editorial content for tool pages — batch A (finance tools).
// Each entry complements the base registry entry in toolsRegistry.ts
// (howToUse / howItWorks / example / faq) with deeper, tool-specific
// methodology, a multi-section guide, extra worked examples and extra FAQs.
// Merged with TOOL_CONTENT by ToolPageLayout; see toolContent.ts.

import { ToolContentEntry } from './toolContent';

export const TOOL_CONTENT_A: Record<string, ToolContentEntry> = {
  // ============================================================
  // INCOME TAX CALCULATOR
  // ============================================================
  'income-tax-calculator': {
    howItWorksExtended: `The calculation runs in three stages. First, taxable income is gross income minus allowances and deductions: Taxable = Gross − Allowances − Deductions. Second, that taxable amount is sliced at the bracket thresholds, and each slice is multiplied by its own rate — for example, the first slice at 10 percent, the next at 20 percent, and only the part above the top threshold at 30 percent. Third, any tax credits are subtracted from the summed tax, because credits reduce the bill itself rather than the income it is calculated on. The effective rate is then Total Tax ÷ Gross Income, and it is always lower than the top marginal rate whenever a lower bracket or an allowance exists. Results are estimates from the brackets entered, not an official assessment.`,
    guide: [
      {
        heading: 'Marginal and effective rates: the two numbers that matter',
        paragraphs: [
          `Your marginal rate is the rate charged on the next unit of income you earn — the rate of the highest bracket your income reaches. Your effective rate is your total tax divided by your total income, a blended average across every bracket below it. If you pay $18,000 of tax on $90,000 of income, your effective rate is 20 percent even if your marginal rate is 30 percent, because most of your income was taxed at lower rates or not taxed at all.`,
          `Each rate answers a different question. The effective rate is the right number for budgeting, comparing job offers in different places, and judging your overall tax burden. The marginal rate is the right number for decisions at the edge: taking a bonus, adding freelance work, or making a deductible contribution. Using the marginal rate for your whole income overstates your bill; using the effective rate for a new income source understates the tax on that extra income.`,
        ],
      },
      {
        heading: 'A bracket walkthrough, slice by slice',
        paragraphs: [
          `Take an income of $90,000 in a system with three brackets: 10 percent up to $20,000, 20 percent from $20,000 to $70,000, and 30 percent above $70,000. The first $20,000 is taxed at 10 percent, producing $2,000. The next $50,000 is taxed at 20 percent, producing $10,000. Only the final $20,000 above the threshold is taxed at 30 percent, producing $6,000. The slices add up to $18,000 of tax — not the $27,000 you would get by wrongly applying 30 percent to everything.`,
          `Two checkpoints keep this honest. First, crossing a threshold never re-taxes the income below it; the higher rate is not retroactive. Second, payroll withholding during the year is only an advance estimate of this walkthrough, calculated pay period by pay period. The final figure is settled in the annual assessment, which is why a refund or a small balance due at filing time is normal rather than a sign that something went wrong.`,
        ],
      },
      {
        heading: 'Allowances and deductions shrink the taxable slice',
        paragraphs: [
          `Most systems remove a first slice of income from tax entirely through a personal allowance or a zero-rate bracket. Other deductions — pension contributions, certain work expenses, interest in some systems — reduce taxable income further before any rate is applied. A $1,000 deduction is therefore worth $1,000 multiplied by your marginal rate: $300 of saved tax at a 30 percent marginal rate, but only $100 at a 10 percent rate. Deductions are worth more to higher earners for exactly this reason.`,
          `Tax credits work differently and are easy to confuse with deductions. A credit is subtracted from the calculated tax itself, dollar for dollar, so a $500 credit saves $500 of tax whatever your bracket. Some credits are refundable, meaning they can take your bill below zero and generate a payment; most are not. When you compare two tax proposals, check whether each figure quoted is a deduction or a credit — the same headline number can be worth very different amounts.`,
        ],
      },
      {
        heading: 'Why a pay rise can never cut your take-home pay',
        paragraphs: [
          `The maths makes the common fear impossible in a standard progressive system. A raise is taxed only at your marginal rate, and every marginal rate is below 100 percent. Earn $10,000 more at a 30 percent marginal rate and you keep $7,000; even at a 45 percent top rate you keep $5,500. Your effective rate rises slightly because a bigger share of your income now sits in higher slices, but your net pay always rises with your gross pay.`,
          `There are honest caveats, and they sit outside the tax brackets themselves. In some systems, means-tested benefits, subsidies or allowances are withdrawn as income passes a threshold, and losing a benefit while gaining taxed income can create a very high combined marginal rate over a narrow band. Student loan repayments collected through payroll can add a further percentage. These are cliff edges in the benefits system, not a property of the brackets — and they are specific to each country and situation.`,
        ],
      },
      {
        heading: 'Withholding, assessments and why estimates differ',
        paragraphs: [
          `What leaves your payslip each month is withholding: your employer estimates your annual tax from your current pay and remits it in advance. Bonuses, overtime, a mid-year raise or a second job all distort that estimate, because each payment is taxed as if it continued all year. The annual tax return or assessment then compares total withholding with the real walkthrough for the year and settles the difference, which is why two people with identical salaries can end the year with different refunds.`,
          `A calculator cannot see your full position: filing status, a partner's income in joint systems, tax credits, deductible expenses, capital income and local surcharges all move the final figure. Treat the result as a well-structured estimate for planning — comparing offers, checking a payslip, or previewing the effect of extra income. For a binding figure, use your tax authority's official calculator or an adviser who can see your complete circumstances.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Tax on $60,000 with a tax-free allowance',
        scenario: 'A system charges 0% on the first $10,000, 15% from $10,000 to $40,000, and 25% above $40,000. You earn $60,000 gross (worked example with illustrative brackets).',
        calculation: 'First slice: $10,000 × 0% = $0. Second slice: $30,000 × 15% = $4,500. Top slice: $20,000 × 25% = $5,000. Total tax = $0 + $4,500 + $5,000 = $9,500.',
        result: 'Total tax $9,500 | Effective rate 15.8% | Marginal rate 25% | Post-tax income $50,500 (estimate on the stated brackets)',
      },
      {
        title: 'A $10,000 raise, before and after',
        scenario: 'Under brackets of 10% up to $20,000, 20% to $70,000 and 30% above, compare gross pay of $80,000 with $90,000 (illustrative brackets).',
        calculation: 'At $80,000: $2,000 + $10,000 + $3,000 = $15,000 tax, net $65,000. At $90,000: $2,000 + $10,000 + $6,000 = $18,000 tax, net $72,000.',
        result: 'The $10,000 raise adds $3,000 of tax and $7,000 of net pay — net income rises, it never falls (estimate)',
      },
    ],
    extraFaqs: [
      {
        question: 'What is taxable income, and how does it differ from gross income?',
        answer: 'Gross income is everything you earn before anything is removed. Taxable income is what remains after the system subtracts your personal allowance and any deductions you qualify for, such as pension contributions or specific work expenses. Tax rates are then applied to the taxable figure, slice by slice. Two people with the same gross income can have different taxable incomes, which is why their tax bills differ.',
      },
      {
        question: 'What is a tax credit, and how does it differ from a deduction?',
        answer: 'A deduction reduces the income that tax is calculated on, so its value depends on your marginal rate: a $1,000 deduction saves $300 at a 30 percent rate. A credit reduces the calculated tax itself, dollar for dollar, so a $500 credit saves $500 whatever your bracket. Credits are therefore usually worth more to lower earners than deductions of the same headline size.',
      },
      {
        question: 'Why does the tax withheld from my payslip differ from the calculator result?',
        answer: 'Withholding is an advance estimate made by your employer from each payment in isolation. A bonus month is taxed as if that higher pay continued all year, and changes in income, allowances or jobs during the year are only reconciled later. The annual assessment compares total withholding with your real liability and settles the difference as a refund or a balance due.',
      },
    ],
  },

  // ============================================================
  // VAT CALCULATOR
  // ============================================================
  'vat-calculator': {
    howItWorksExtended: `Adding VAT multiplies the net price by a single factor: Gross = Net × (1 + r/100), where r is the rate in percent. Removing VAT divides by the same factor: Net = Gross ÷ (1 + r/100). A useful consequence is that the VAT contained inside a gross price is a fixed fraction of that price: VAT = Gross × r ÷ (100 + r). At 20 percent that fraction is 20/120, exactly one sixth of the total; at 19 percent it is 19/119, about 15.97 percent. Calculations are carried at full precision and rounded to the nearest cent only for display, which is why a reverse calculation can occasionally differ by one cent from the original invoice.`,
    guide: [
      {
        heading: 'The two directions: adding VAT and removing VAT',
        paragraphs: [
          `Adding VAT is a markup on the net price. At a 19 percent rate, a net price of €250 grows by €47.50 of VAT to a gross price of €297.50. Removing VAT is the reverse journey along the same road: divide the gross price by 1.19 to return to €250. The two operations are exact inverses because both use the same factor, (1 + rate/100). Every VAT question — quoting a customer, checking a receipt, reclaiming tax — is one of these two directions.`,
          `The mistake to avoid is treating removal as the mirror image of a discount. VAT was calculated on the net price, so it is a percentage of the smaller number. Taking 19 percent off a gross price removes too much, because 19 percent of the gross is a larger amount than the VAT that was added. Division by the factor is the only correct way back, and the gap between the two methods grows as the rate rises.`,
        ],
      },
      {
        heading: 'Reverse VAT: finding the tax inside a price',
        paragraphs: [
          `Shelf prices, receipts and most consumer invoices show one combined figure, but a business often needs the tax hidden inside it — to reclaim the VAT on a purchase, or to record the expense net. The VAT inside a gross price is the gross multiplied by rate ÷ (100 + rate). At the UK rate of 20 percent this simplifies beautifully: the VAT is exactly one sixth of the total, so a £120 receipt contains £20 of VAT and £100 net.`,
          `At other rates the fraction is less tidy but just as fixed. At Germany's 19 percent, the VAT share of a gross price is 19/119, roughly 15.97 percent: a €119 purchase contains €19 of VAT. At Spain's 21 percent it is 21/121, about 17.36 percent. Memorable or not, the fraction never changes for a given rate, which makes it a quick sanity check on any invoice: if the stated VAT is far from that fraction of the total, something is wrong.`,
        ],
      },
      {
        heading: 'Standard VAT rates around Europe',
        paragraphs: [
          `Every EU member state sets its own standard rate within a common framework that requires at least 15 percent. At the time of writing, Luxembourg applies the lowest standard rate at 17 percent and Hungary the highest at 27 percent. Between them sit Germany at 19 percent, France and Austria at 20 percent, Spain and the Netherlands at 21 percent, Italy at 22 percent, Ireland and Poland at 23 percent, and Denmark, Sweden and Croatia at 25 percent. The United Kingdom, outside the EU, applies 20 percent.`,
          `Most countries also apply reduced rates to categories such as food, books, hotels or passenger transport, and a few goods are zero-rated or exempt — which are not the same thing, since exempt suppliers cannot reclaim VAT on their own costs. Rates change with budgets and temporary measures, so treat any printed list, including this one, as a starting point and confirm the current rate for your exact good or service in the official source before invoicing.`,
        ],
      },
      {
        heading: 'Rounding: where the missing cents go',
        paragraphs: [
          `VAT almost never lands on a whole cent. A net price of €49.99 at 20 percent gives €9.998 of VAT, which must be rounded to €10.00 before it can be charged or recorded. Rounding is normally half-up to the nearest cent, and tax rules in many countries allow it per invoice line or on the invoice total — two legitimate methods that can produce totals one cent apart on a long invoice. Neither business has made an error; they have rounded at different stages.`,
          `This is also why reverse calculations can miss by a cent. If a gross price of €59.99 already contains rounded VAT, dividing by 1.20 returns a net of €49.99 and VAT of €10.00, which is consistent to the cent even though the unrounded figures were not. Accounting software handles this by rounding the tax at document level and letting the final line absorb the difference. A one-cent discrepancy between two correct calculators is normal and is not a sign of a broken tool.`,
        ],
      },
      {
        heading: 'VAT on invoices: what must be shown',
        paragraphs: [
          `A proper VAT invoice separates the three figures this calculator produces: the net amount, the rate applied, and the VAT amount, with the gross total as their sum. It also carries the supplier's VAT identification number, a unique invoice number, the date, and a description of what was supplied. These are not decoration — a customer generally cannot reclaim VAT on a document that lacks the required details, and the supplier remains liable for tax on sales it failed to invoice correctly.`,
          `For business-to-business sales into another EU country, the reverse charge often applies: the supplier invoices the net amount without VAT, and the customer accounts for the tax in its own country at its own rate. The invoice must say so and carry both parties' VAT numbers. Consumer sales across borders follow different rules again, and smaller traders below their national registration threshold may not charge VAT at all. This page explains the arithmetic; your registration duties depend on your situation.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Adding 19% VAT to a €250 net quote',
        scenario: 'A German freelancer quotes €250 net and must show the gross amount a private customer will actually pay (example figures).',
        calculation: 'VAT = €250 × 0.19 = €47.50. Gross = €250 × 1.19 = €297.50.',
        result: 'Net: €250.00 | VAT: €47.50 | Gross: €297.50',
      },
      {
        title: 'Removing 20% VAT from a €59.99 receipt',
        scenario: 'A UK purchase receipt shows €59.99 paid including 20% VAT; you need the net expense and the reclaimable VAT (example figures).',
        calculation: 'Net = 59.99 ÷ 1.20 = €49.9916…, rounded to €49.99. VAT = €59.99 − €49.99 = €10.00 (equivalently, one sixth of the gross).',
        result: 'Net: €49.99 | VAT: €10.00 | Gross: €59.99 — the one-cent rounding is absorbed by the VAT figure',
      },
    ],
    extraFaqs: [
      {
        question: 'What fraction of a VAT-inclusive price is the VAT itself?',
        answer: 'The fraction is rate divided by (100 + rate). At 20 percent it is exactly one sixth of the total price, about 16.67 percent. At 19 percent it is 19/119, about 15.97 percent, and at 25 percent it is exactly one fifth. This is why the VAT inside a price is always a smaller percentage of the total than the headline rate suggests.',
      },
      {
        question: 'Do I charge VAT when selling to a business customer in another EU country?',
        answer: 'Usually not on the invoice itself. For business-to-business supplies of goods and most services within the EU, the reverse charge applies: you invoice the net amount, note the reverse charge, and include both VAT identification numbers, while the customer accounts for VAT in their own country. Consumer sales follow different place-of-supply rules. This is general information about the mechanism, not advice for your specific situation.',
      },
      {
        question: 'Why do two VAT calculators sometimes differ by one cent?',
        answer: 'Because VAT produces fractions of a cent that must be rounded, and tools may round at different stages — per line, per tax amount, or only on the final total. A gross-to-net reversal of an already rounded invoice can also shift a cent between the net and VAT figures. Both results can be arithmetically correct; accounting rules in most countries accept the document-level rounding shown on the invoice itself.',
      },
    ],
  },

  // ============================================================
  // PERCENTAGE CHANGE CALCULATOR
  // ============================================================
  'percentage-change-calculator': {
    howItWorksExtended: `The formula is Change = ((New − Original) ÷ Original) × 100, with the original value as the base. Dividing by the original is what makes the measure asymmetric: a move from 100 to 125 is +25 percent, but the return move from 125 to 100 is −20 percent, because the second division uses 125 as its base. When the original value is negative, the calculator divides by its absolute value so the sign of the result still describes the direction of movement. A sequence of changes is never added together; each step multiplies a factor — +10 percent is ×1.10 — and the overall change is the product of the factors minus one. A starting value of zero has no defined percentage change, since division by zero is impossible.`,
    guide: [
      {
        heading: 'The formula and the all-important base',
        paragraphs: [
          `Every percentage change is a comparison against a starting point. The numerator is simple — new value minus original value — but the denominator decides the answer: you always divide by the original. A price rising from $40 to $50 has gained $10 on a base of $40, a 25 percent increase. The same $10 movement measured from $50 would be 20 percent, which is why quoting a percentage without its base is meaningless, and why the same event can honestly carry two different percentages.`,
          `This is also why the direction of a comparison matters in reports and headlines. Saying a budget grew 25 percent and saying it must be cut 20 percent to return to its old level are both true of the same $40-to-$50 move. When you check a claim, ask which value was treated as the original. Reputable sources use the earlier value in time, but comparisons between two groups at one moment can quietly pick whichever base flatters the argument.`,
        ],
      },
      {
        heading: 'Why increases and decreases do not cancel out',
        paragraphs: [
          `A 50 percent increase followed by a 50 percent decrease does not bring you home. Start at 100: the increase acts on 100 and takes you to 150, but the decrease acts on 150, removing 75 and leaving 75 — a net loss of 25 percent. The second percentage is always calculated on the value the first one created, so equal percentages in opposite directions never offset unless both are measured on the same base, which by definition they are not.`,
          `The recovery side of this asymmetry is the part that surprises investors and businesses. After a fall of 20 percent, a gain of 20 percent is not enough: you stand at 80 and need to gain 20 on a base of 80, which is a 25 percent rise. After a 50 percent fall you need a 100 percent gain just to break even. The deeper the fall, the more disproportionate the recovery required — the mathematics behind the advice to avoid large losses in the first place.`,
        ],
      },
      {
        heading: 'Percentage points versus percent',
        paragraphs: [
          `When the values being compared are themselves percentages, two different changes exist side by side. If a central bank moves its rate from 4 percent to 5 percent, the rate has risen by 1 percentage point — the simple arithmetic difference. Measured relatively, it has also risen by 25 percent, because 1 is a quarter of 4. Both statements are correct; they answer different questions, and professional reporting uses percentage points for the difference precisely to avoid ambiguity.`,
          `The confusion appears when a speaker picks the more dramatic option. A support rating moving from 40 percent to 44 percent is a gain of 4 percentage points but a 10 percent relative increase; a headline choosing the second phrasing makes the shift sound larger. Whenever you see a percentage change applied to something already expressed in percent — interest rates, tax rates, margins, poll shares — check whether the source means points or relative change before drawing conclusions.`,
        ],
      },
      {
        heading: 'Growth over several periods and the CAGR idea',
        paragraphs: [
          `Over multiple periods, changes chain together by multiplication, not addition. Growth of 10 percent in each of three years is not 30 percent overall but 1.10 × 1.10 × 1.10 = 1.331, a 33.1 percent total increase, because each year's growth also applies to the growth already banked. The same chaining explains why a volatile path — up 30 percent, down 10 percent — ends somewhere different from its steady equivalent even when the simple average of the yearly figures looks similar.`,
          `The compound annual growth rate (CAGR) compresses a whole path into the single steady rate that would have produced it: CAGR = (End ÷ Start) raised to the power (1 ÷ years), minus one. Growing from $10,000 to $13,310 in three years gives (1.331)^(1/3) − 1 = 10 percent per year, matching the chained example above. CAGR is the honest way to compare growth over different time spans, but it hides the bumps: two investments with the same CAGR can have taken very different journeys.`,
        ],
      },
      {
        heading: 'Common percentage-change errors',
        paragraphs: [
          `The most frequent error is averaging percentages. Yearly changes of +20 percent and −10 percent average to +5 percent, but the chained result is 1.20 × 0.90 = 1.08, an 8 percent total gain, or about 3.9 percent per year compounded. Close behind is dividing by the new value instead of the original, which understates increases and overstates decreases. Both errors survive because the wrong answers look plausible; only reconstructing the base exposes them.`,
          `Language causes its own errors. An increase of 100 percent means the value doubled; an increase of 200 percent means it tripled, because the increase alone is twice the original. Phrases like "three times more" are genuinely ambiguous between three and four times as much, which is why careful writers state the factor directly. And a decrease can never exceed 100 percent for a quantity that cannot go negative — a claim of a 150 percent price cut signals a confused base, not a bargain.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'A jacket discounted from $80 to $60',
        scenario: 'A jacket originally priced at $80 is reduced to $60 in a sale (example figures).',
        calculation: 'Change = (60 − 80) ÷ 80 × 100 = (−20 ÷ 80) × 100 = −25%.',
        result: '−25% — a 25% decrease ($20 less). Note the reverse trip, $60 back to $80, would be a +33.3% increase',
      },
      {
        title: 'An investment that rises, then falls',
        scenario: 'A holding grows from $200 to $230 in year one, then falls to $207 in year two (example figures).',
        calculation: 'Year one: (230 − 200) ÷ 200 = +15%. Year two: (207 − 230) ÷ 230 = −10%. Overall: (207 − 200) ÷ 200 = +3.5%, matching the chained factors 1.15 × 0.90 = 1.035.',
        result: '+3.5% overall — the +15% and −10% do not average or cancel to +5% or +2.5%',
      },
    ],
    extraFaqs: [
      {
        question: 'How do I find the original value if I only know the final value and the percentage change?',
        answer: 'Divide the final value by the change factor. If a price rose 25 percent to reach $125, the factor is 1.25 and the original was 125 ÷ 1.25 = $100. If a value fell 20 percent to $80, the factor is 0.80 and the original was 80 ÷ 0.80 = $100. Never reconstruct the original by subtracting the percentage of the final value.',
      },
      {
        question: 'Can a percentage decrease be greater than 100 percent?',
        answer: 'Not for a quantity that cannot fall below zero, such as a price or a population. A 100 percent decrease reaches zero, so a larger decrease would require negative values. Figures above 100 percent do appear for quantities that can go negative — a profit can fall by more than 100 percent if it turns into a loss — but such a claim means the wrong base was used.',
      },
      {
        question: 'What does it mean when something increases by 200 percent?',
        answer: 'It means the increase itself equals twice the original value, so the final value is three times the original: 50 increased by 200 percent becomes 50 + 100 = 150. This is different from "increased to 200 percent", which means the final value is twice the original. Because the two phrasings are so often confused, stating the multiplying factor — doubled, tripled — is clearer than either.',
      },
    ],
  },

  // ============================================================
  // LOAN CALCULATOR
  // ============================================================
  'loan-calculator': {
    howItWorksExtended: `Each period, interest is charged on the outstanding balance: Interest = Balance × i, where i is the periodic rate (the annual rate divided by 12 for monthly payments). The rest of the fixed payment reduces the balance. Setting the payment so the balance reaches exactly zero after n payments gives M = P × i(1 + i)^n ÷ ((1 + i)^n − 1). Two useful checks follow from the structure: the first payment's interest is simply P × i, the largest interest slice you will ever pay, and at a zero interest rate the formula's limit is M = P ÷ n — the principal spread evenly. The calculation assumes a fixed rate, equal payments and no fees — a clean model of the loan, not a lender's quote.`,
    guide: [
      {
        heading: 'Anatomy of a monthly payment',
        paragraphs: [
          `Every fixed payment does two jobs at once: it pays the interest that has accrued on the balance since last month, and it repays some principal. On a $10,000 loan at 12 percent, the first month accrues $100 of interest, so of an $888.49 payment only $788.49 reduces the debt. By the final month the balance is small, the interest slice is under $9, and almost the whole payment clears principal. The payment never changes — its internal split changes every single month.`,
          `This front-loading of interest is not a lender's trick; it is arithmetic. Interest is charged on what you currently owe, and you owe the most at the start. It also means the balance falls slowly at first and faster later: halfway through the term of a typical loan you have usually repaid noticeably less than half the principal. An amortisation schedule makes this visible month by month, and it is the schedule, not the headline rate, that shows what a loan really does to your money.`,
        ],
      },
      {
        heading: 'The true total cost of credit',
        paragraphs: [
          `The honest price of a loan is the total of all payments minus the amount you borrowed — the total interest — plus any fees the loan carries. Two offers with the same principal and rate can differ by thousands purely through term length, and an offer with a lower rate but heavy origination fees can cost more than a fee-free offer at a slightly higher rate. This is why regulators require an annual percentage rate that folds mandatory fees into one figure for comparison.`,
          `Use total cost, not the monthly payment, as your comparison number. A dealer or lender can make almost any loan look affordable by stretching the term until the monthly figure fits your budget, while the total quietly grows. The payment tells you whether you can carry the loan month to month; the total cost tells you whether the loan is good value. A sound decision needs both numbers, and this calculator shows both for every scenario you enter.`,
        ],
      },
      {
        heading: 'Term length: lower payment, higher cost',
        paragraphs: [
          `Stretching a loan over more payments cuts each payment because the principal is spread thinner — but the balance stays higher for longer, accruing interest the whole time. Borrowing $20,000 at 9 percent costs about $636 a month over three years and about $415 a month over five years. The five-year version feels $221 a month lighter, yet its total interest is roughly $4,910 against roughly $2,895 — about $2,015 more paid for the same car, the same rate and the same principal (example figures).`,
          `Neither choice is automatically right. A shorter term demands room in the monthly budget, and a payment you cannot sustain is worse than a longer loan you can. The practical approach is to find the shortest term whose payment still fits comfortably alongside your other commitments, then check the total interest at that term. If the difference between the comfortable term and the next one down is small in payment but large in interest, that is where the real saving hides.`,
        ],
      },
      {
        heading: 'Fixed versus variable rates',
        paragraphs: [
          `A fixed-rate loan locks the interest rate — and therefore the payment — for the whole term. Budgeting is simple and the total cost is known on day one; the trade-off is that you do not benefit if market rates fall, and repaying early to escape the rate can trigger a prepayment fee on some products. Most personal and car loans in many markets are fixed, which is the situation this calculator models with its single amortisation formula.`,
          `A variable-rate loan tracks a benchmark, so the payment or the term moves when the benchmark moves. Variable rates often start lower, sometimes with an introductory period, and may carry caps limiting how far or how fast they can rise. The risk is asymmetric: your budget must absorb the payment at the capped worst case, not at today's attractive rate. Comparing a variable offer against a fixed one means comparing a certainty with a range of outcomes.`,
        ],
      },
      {
        heading: 'Paying extra: the cheapest interest you can avoid',
        paragraphs: [
          `An extra payment goes entirely to principal — no interest is due on money you have already repaid — so it shrinks every future interest calculation. On a $20,000 loan at 9 percent over five years, adding $50 a month to the $415.17 payment clears the debt in about 52 months instead of 60 and saves roughly $680 of interest (estimate from the amortisation schedule). The effect is stronger the earlier extra payments begin, because the reduced balance compounds in your favour for longer.`,
          `Before paying extra, check two things. First, confirm the loan has no prepayment penalty, and that your lender applies extra amounts to principal rather than treating them as early payment of the next instalment. Second, compare against your other debts: extra money earns the most where the interest rate is highest, so clearing an expensive card balance before accelerating a cheap loan is usually the better order. Subject to those checks, overpaying a fixed-rate loan is a guaranteed, tax-free return equal to its rate.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: '$10,000 personal loan at 12% for 12 months',
        scenario: 'Borrowing $10,000 at a 12% annual rate, repaid in 12 equal monthly payments (example figures).',
        calculation: 'i = 0.12 ÷ 12 = 0.01. M = 10,000 × 0.01 × (1.01)^12 ÷ ((1.01)^12 − 1) ≈ $888.49. First payment: interest $100.00, principal $788.49.',
        result: 'Monthly ≈ $888.49 | Total paid ≈ $10,661.85 | Total interest ≈ $661.85 (estimates from the formula)',
      },
      {
        title: 'Same $20,000 loan over 3 years vs 5 years',
        scenario: 'Borrowing $20,000 at 9% — compare a 36-month term with a 60-month term (example figures).',
        calculation: '3 years: M ≈ $635.97, total ≈ $22,895, interest ≈ $2,895. 5 years: M ≈ $415.17, total ≈ $24,910, interest ≈ $4,910.',
        result: 'The longer term cuts the payment by ≈ $220.80/month but adds ≈ $2,015 of interest (estimates)',
      },
    ],
    extraFaqs: [
      {
        question: 'Why is so much of my early payment interest?',
        answer: 'Interest is charged on the balance you currently owe, and the balance is at its highest at the start of the loan. With a fixed payment, whatever is not needed for that month\'s interest reduces the principal, so the interest share shrinks and the principal share grows every month. It is a property of the amortisation maths, not an extra charge imposed by the lender.',
      },
      {
        question: 'Does a shorter term always make a loan cheaper overall?',
        answer: 'At the same interest rate and with no fees, yes: the balance is repaid sooner, so less interest accrues, and the total cost falls even though each payment is higher. The qualification is fees and rate differences — a short loan with heavy origination fees can cost more in total than a longer fee-free loan. Compare the total of all payments plus fees, not the term alone.',
      },
      {
        question: 'What does the payment become if the interest rate is 0 percent?',
        answer: 'The loan is simply divided into equal slices of principal: payment equals principal divided by the number of payments. Borrowing $6,000 at 0 percent over 24 months costs exactly $250 a month and $6,000 in total. The standard formula appears to break at zero because it divides by the rate, but its limiting value is exactly this even split, which is how the calculator handles it.',
      },
    ],
  },

  // ============================================================
  // MORTGAGE CALCULATOR
  // ============================================================
  'mortgage-calculator': {
    howItWorksExtended: `The loan amount is the price minus the down payment: L = Price − Down. Principal and interest are then the standard amortisation payment on L at the monthly rate i = annual rate ÷ 12 over n = years × 12 payments. Taxes and insurance are not amortised; they are annual amounts divided by 12, collected monthly as escrow, so the full payment is P&I + (annual tax ÷ 12) + (annual insurance ÷ 12), plus any mortgage insurance. Two consequences are worth noting: the P&I part is fixed for a fixed-rate loan, but the escrow part is recalculated as tax and insurance bills change, and total interest over the term is simply (P&I × n) − L, which is why it grows fast with longer terms.`,
    guide: [
      {
        heading: 'PITI: the four parts of a full housing payment',
        paragraphs: [
          `A mortgage quote often shows only principal and interest, but the payment that actually leaves your account usually has four parts. Principal repays the loan balance; interest is the lender's charge on that balance; taxes are your property tax, collected monthly and held for the annual bill; and insurance covers the homeowner's policy the lender requires. Together they form PITI. On many loans the tax and insurance parts add a fifth or more on top of principal and interest, which is why comparing homes on P&I alone misleads.`,
          `Taxes and insurance are typically held in an escrow (impound) account: the lender collects one twelfth of the estimated annual bills each month and pays the authorities and insurer when due. The lender may keep a small cushion in the account, and it re-analyses the escrow yearly. If taxes or premiums rose, your total monthly payment rises to match — even though your fixed-rate principal and interest never changed, and even though your loan balance is lower than when you started.`,
        ],
      },
      {
        heading: 'The deposit: how the down payment changes everything',
        paragraphs: [
          `Every dollar of down payment is a dollar you do not borrow, do not pay interest on, and do not need to insure against default. On a $350,000 home at 6.5 percent over 30 years, moving from 10 percent down to 20 percent down cuts the loan from $315,000 to $280,000 and the principal-and-interest payment from about $1,991 to about $1,770 a month. Total interest over the term falls by roughly $44,600 (example figures) — a guaranteed saving bought entirely at the start.`,
          `The down payment also changes what else you are charged. In US practice, loans above 80 percent of the property's value usually require private mortgage insurance, an extra monthly premium that protects the lender, not you, until the balance falls below the threshold. A larger deposit can also unlock better rates, since the lender's risk is smaller. Against this sits a real cost: money locked in the house cannot serve as an emergency fund, so the biggest possible deposit is not automatically the wisest.`,
        ],
      },
      {
        heading: '15 years versus 30 years: the term trade-off',
        paragraphs: [
          `On a $300,000 loan at 6 percent, the 30-year payment is about $1,798.65 a month and the 15-year payment about $2,531.57 — roughly 41 percent more each month. But the 30-year loan repays so slowly that its total interest reaches about $347,514, more than the amount borrowed. The 15-year loan's interest is about $155,682. Choosing the shorter term saves roughly $191,832 of interest in this example — the single biggest financial lever in the whole mortgage decision, larger than most rate negotiations.`,
          `The shorter term builds equity faster for the same reason: a much larger share of each payment is principal from the very first month. The counter-argument is flexibility. A 30-year loan with a lower required payment leaves monthly room for other goals, and in many markets you may overpay it voluntarily — though you must actually do so, every month, for decades, to match the 15-year outcome. Compare the two terms on total interest and on how the required payment fits your budget, in that order.`,
        ],
      },
      {
        heading: 'Affordability rules of thumb — and their limits',
        paragraphs: [
          `Lenders and advisers often quote two ratios as rules of thumb. The housing ratio suggests keeping the full PITI payment near or below about 28 percent of gross monthly income; the total-debt ratio suggests keeping all debt payments, including cards and car loans, near or below about 36 percent. A related shortcut caps the purchase price at roughly three to four times annual income. These are screening devices used in parts of the US market — useful for a first sanity check, nothing more.`,
          `Treat them as exactly that: rules of thumb, not laws and not personal advice. They ignore the cost of living where you live, childcare, job stability, other goals, and the taxes stacked on top of the payment. A household with no other debts and low expenses may comfortably carry more than 28 percent; a household with high fixed costs may find 25 percent too much. Run the ratios, then test the actual payment against your real monthly budget before trusting either.`,
        ],
      },
      {
        heading: 'Taxes, insurance and the costs beyond the mortgage',
        paragraphs: [
          `The mortgage payment is not the whole cost of owning. Property taxes are reassessed and can climb as values rise; insurance premiums have their own inflation; both flow straight into your escrow and raise the total payment even on a fixed-rate loan. Owners also pay for maintenance and repairs that a renter never sees. A common planning heuristic sets aside roughly 1 percent of the property's value per year for upkeep — a rough average over many years, labelled as such, not a bill that arrives evenly.`,
          `There are also one-off costs at both ends of the loan: arrangement, valuation and legal fees at purchase, and possible early-repayment charges if you refinance or sell during a fixed period. When you compare two mortgage offers, add these to the interest over the period you realistically expect to keep the loan — most mortgages are repaid or refinanced long before their full term — rather than comparing headline rates or even full-term interest alone.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: '$300,000 loan at 6%: 15-year vs 30-year term',
        scenario: 'Borrowing $300,000 at a fixed 6% — compare the two classic terms (example figures).',
        calculation: '30 years: payment ≈ $1,798.65/mo, total ≈ $647,514, interest ≈ $347,514. 15 years: payment ≈ $2,531.57/mo, total ≈ $455,682, interest ≈ $155,682.',
        result: 'Paying ≈ $732.92/month more on the 15-year term saves ≈ $191,832 of interest (estimates)',
      },
      {
        title: 'Building the full PITI payment on a $350,000 home',
        scenario: 'Price $350,000, 10% down, loan $315,000 at 6.5% for 30 years; property tax 1.1% of price per year; insurance $1,800/year; mortgage insurance estimated at 0.5% of the loan per year (illustrative US-style figures).',
        calculation: 'Principal & interest ≈ $1,990.99. Tax: $3,850 ÷ 12 ≈ $320.83. Insurance: $1,800 ÷ 12 = $150.00. Mortgage insurance: $1,575 ÷ 12 ≈ $131.25.',
        result: 'Total monthly payment ≈ $2,593.07 — about $602 more than the principal-and-interest figure alone (estimates)',
      },
    ],
    extraFaqs: [
      {
        question: 'What is an escrow account, and why is it added to my payment?',
        answer: 'Escrow is a holding account your lender manages alongside the loan. Each month you pay one twelfth of your estimated annual property tax and homeowner\'s insurance into it, and the lender pays those bills when they fall due. It smooths two large annual bills into the monthly payment and guarantees the lender that the property stays taxed and insured. The amounts are estimates, adjusted in a yearly escrow analysis.',
      },
      {
        question: 'Why can my total payment rise even though my rate is fixed?',
        answer: 'The fixed rate locks only the principal-and-interest part of the payment. The escrow part is recalculated whenever your property tax assessment or insurance premium changes, and both tend to rise over time. Your lender then increases the monthly escrow collection, sometimes with an additional catch-up amount if the account ran short. The loan itself has not changed — the bills bundled into the payment have.',
      },
      {
        question: 'Is a bigger down payment always better?',
        answer: 'Not automatically. A bigger deposit cuts the loan, the interest and possibly mortgage insurance, and can improve the rate offered. But money used as a deposit cannot also be your emergency fund, an investment, or repair money for the new home. Many buyers are better served keeping a cash reserve and accepting a larger loan. The calculator compares the interest saved per deposit size against what you would give up.',
      },
    ],
  },

  // ============================================================
  // COMPOUND INTEREST CALCULATOR
  // ============================================================
  'compound-interest-calculator': {
    howItWorksExtended: `The core formula is A = P(1 + r/n)^(nt): P is the starting principal, r the annual rate as a decimal, n the number of compounding periods per year, and t the years. Regular contributions form a growing series that sums to PMT × [((1 + r/n)^(nt) − 1) ÷ (r/n)], assuming each contribution lands at the end of its period. A consequence hidden in the formula is the effective annual rate: compounding at a nominal 8 percent monthly produces (1 + 0.08/12)^12 − 1 ≈ 8.30 percent over a year. The model assumes a constant rate and no taxes, fees or withdrawals, so it projects what steady growth would look like rather than predicting any real investment, whose returns vary year to year.`,
    guide: [
      {
        heading: 'The formula, piece by piece',
        paragraphs: [
          `A = P(1 + r/n)^(nt) looks compact because each symbol does one job. P is where you start. The rate r is divided by n because interest is credited period by period: at 8 percent compounded monthly, each month adds 0.08 ÷ 12 ≈ 0.667 percent. The exponent nt counts how many times that happens — 240 monthly periods in 20 years. Growth lives in the exponent, which is why time matters more than any other input: doubling the years does not double the result, it squares the growth factor.`,
          `Compounding frequency changes the result through the effective annual rate. A nominal 8 percent compounded annually yields exactly 8 percent; compounded monthly it yields about 8.30 percent, and daily about 8.33 percent. The jumps shrink as frequency rises — most of the gain comes from the first step, from annual to monthly. When you compare two accounts quoting the same headline rate with different compounding, the effective rate is the only fair basis, and it is always the slightly larger, less advertised number.`,
        ],
      },
      {
        heading: 'Contributions: the quiet engine',
        paragraphs: [
          `A lump sum compounds only itself; a contribution habit compounds a growing army. Each monthly deposit starts its own clock, so early deposits — which compound the longest — contribute far more growth than identical later ones. In long plans the pattern is consistent: contributions dominate the balance in the early years, then accumulated interest overtakes them and eventually dwarfs them. The crossover point, where interest earned passes total contributions, is where a savings plan starts to feel self-propelling.`,
          `This is also why contribution size and duration trade against each other unevenly. Doubling your monthly deposit roughly doubles the contributions part of the outcome but leaves the original principal's growth untouched; extending the term raises every part at once. When a target looks out of reach, extending the horizon is usually more powerful than stretching the monthly amount — and when the horizon cannot move, the calculator shows exactly how much extra per month closes the gap at your assumed rate.`,
        ],
      },
      {
        heading: 'The Rule of 72 and its limits',
        paragraphs: [
          `The Rule of 72 estimates doubling time: divide 72 by the annual return in percent. At 6 percent money doubles in about 12 years; at 8 percent in about 9; at 9 percent in about 8. It works because 72 approximates 100 × ln 2 with a small correction that happens to fit the rates people actually meet, and because 72 divides cleanly by 2, 3, 4, 6, 8, 9 and 12, making the mental arithmetic easy. It is an approximation, not a formula.`,
          `Its accuracy is best roughly between 5 and 10 percent. At very low rates it slightly overstates the doubling time, and at high rates it understates it: at 20 percent the rule says 3.6 years while exact compounding needs about 3.8. Related shortcuts exist — 114 for tripling, 144 for quadrupling — built the same way. Use the rule for quick comparisons and sanity checks, then use the full formula, as this calculator does, whenever a decision depends on the number.`,
        ],
      },
      {
        heading: 'Inflation: the return you actually keep',
        paragraphs: [
          `A balance is only meaningful in what it buys. If investments grow at a nominal 7 percent while prices rise at 3 percent, the purchasing power of the money grows at roughly 4 percent a year — precisely, 1.07 ÷ 1.03 − 1 ≈ 3.88 percent. Over 30 years that gap is the difference between a nominal balance that looks impressive and a real balance about 40 percent smaller in today's terms. Long-horizon results should always be mentally discounted this way.`,
          `The same logic applies in reverse to cash. Money kept uninvested loses purchasing power at the inflation rate: at 3 percent inflation its buying power halves in about 24 years — the Rule of 72 works for decay as well as growth. None of this makes risky assets automatically right; returns vary and can fall as well as rise. It does mean the honest comparison for any plan is the real, after-inflation figure, not the headline nominal one.`,
        ],
      },
      {
        heading: 'Why starting early beats saving more',
        paragraphs: [
          `Because growth is exponential, the last years of a long plan contribute more than the first years — which means removing the first years is devastating. Saving $200 a month at 7 percent for 35 years builds roughly $360,000; the same habit over 25 years builds roughly $162,000 (example figures). The ten missing years are the earliest and cheapest ones, yet they account for well over half the difference, because every later year's growth would have compounded on top of them.`,
          `Catching up is possible but expensive. To reach that same roughly $360,000 in only 25 years at the same assumed 7 percent, the monthly deposit must rise from $200 to about $445 — more than double, for a plan that is ten years shorter. Starting early is the one input that cannot be bought back later at any reasonable price. Treat these figures as illustrations of the maths at a steady assumed rate, not as predictions: real returns arrive unevenly, year by year.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Starting at 25 vs 35: $200 a month at 7%',
        scenario: 'Saving $200 monthly at an assumed 7% annual return, compounded monthly — 35 years of saving versus 25 years (illustrative figures, not a forecast).',
        calculation: '35 years: 420 deposits of $200 = $84,000 contributed; future value ≈ $360,229. 25 years: 300 deposits = $60,000 contributed; future value ≈ $161,998.',
        result: 'Starting 10 years earlier adds ≈ $198,231 of outcome for only $24,000 of extra contributions (estimates at a constant rate)',
      },
      {
        title: 'Checking the Rule of 72: $5,000 at 9% for 24 years',
        scenario: 'A single $5,000 deposit left untouched at 9% compounded annually for 24 years (example figures).',
        calculation: 'Rule of 72: 72 ÷ 9 = 8 years per doubling, so 24 years is three doublings: $5,000 → $10,000 → $20,000 → $40,000. Exact formula: $5,000 × (1.09)^24 ≈ $5,000 × 7.911 ≈ $39,555.',
        result: 'Exact ≈ $39,555 vs the rule\'s $40,000 estimate — close enough for a sanity check, which is what the rule is for',
      },
    ],
    extraFaqs: [
      {
        question: 'What is the difference between simple and compound interest?',
        answer: 'Simple interest is charged or earned only on the original principal: $1,000 at 8 percent simple earns a flat $80 every year. Compound interest is earned on the principal plus all previously accumulated interest, so the amount grows each period — $80 in year one, $86.40 in year two, and accelerating from there. Over long periods the gap between the two becomes very large, which is why compounding matters.',
      },
      {
        question: 'Why does compounding frequency make only a small difference?',
        answer: 'Because interest on interest needs time, and the extra periods are short. At a nominal 8 percent, annual compounding yields 8.00 percent over a year, monthly about 8.30 percent, and daily about 8.33 percent. Moving from annual to monthly is worthwhile; moving from monthly to daily adds nothing of consequence. The rate itself and the number of years have far more influence on the final balance than the compounding schedule.',
      },
      {
        question: 'Does this calculator account for inflation, taxes or fees?',
        answer: 'No. The projection is a nominal, pre-tax model at a constant rate you choose: no inflation adjustment, no tax on interest or gains, no fund or account fees, and no variation in returns. Real outcomes will differ, usually downward once inflation and costs are counted. Use the result to compare scenarios — different rates, terms and contribution levels — rather than as a prediction of a future balance.',
      },
    ],
  },

  // ============================================================
  // PROFIT MARGIN CALCULATOR
  // ============================================================
  'profit-margin-calculator': {
    howItWorksExtended: `Both measures start from the same profit, Profit = Price − Cost, and differ only in the denominator. Margin divides by the selling price, so it can never exceed 100 percent; markup divides by the cost, so it can rise without limit. The two convert exactly: Margin = Markup ÷ (1 + Markup), and Markup = Margin ÷ (1 − Margin) — a 50 percent markup is a 33.3 percent margin, and a 50 percent margin requires a 100 percent markup. Pricing backwards from a target margin uses Price = Cost ÷ (1 − Margin). For net margin, operating expenses per unit are subtracted from profit before dividing by price, so gross and net figures describe the same sale at two depths of cost.`,
    guide: [
      {
        heading: 'Margin and markup: same profit, two different stories',
        paragraphs: [
          `Margin and markup describe the identical profit from two different vantage points. Margin asks: of each pound or dollar the customer paid, how much is profit? Markup asks: by what percentage did I raise the cost to reach the price? A product bought for $60 and sold for $100 earns $40 either way — but that is a 40 percent margin and a 66.7 percent markup. Both are correct; quoting one while your listener hears the other is where the trouble starts.`,
          `The conversion between them is exact and worth memorising at the common landmarks. A 20 percent markup is a 16.7 percent margin. A 50 percent markup is a 33.3 percent margin. A 100 percent markup — doubling the cost — is a 50 percent margin. Going the other way, a target margin of 25 percent needs a 33.3 percent markup, and a 75 percent margin needs a 300 percent markup. Margins compress as markups grow, because the denominator — the price — grows with the profit itself.`,
        ],
      },
      {
        heading: 'The classic pricing mistake',
        paragraphs: [
          `A retailer wants a 30 percent margin on a product costing $70 and, reaching for the wrong tool, applies a 30 percent markup instead. The price becomes $91 and the profit $21. But margin is profit divided by price: $21 ÷ $91 is 23.1 percent, not 30. The correct price for a 30 percent margin is $70 ÷ (1 − 0.30) = $100, earning $30 a unit. The shortcut cost $9 of profit on every single sale, invisibly.`,
          `Scale turns that quiet error into a business problem. Sell 1,000 units and the underpricing has given away $9,000 of profit — often the difference between a viable year and a loss, with nothing to show for it, since customers rarely notice a price that is merely lower than intended. The mistake survives because the resulting margin, 23 percent, still sounds respectable. Any time a target margin is set, the price must be built by dividing cost by (1 − margin), never by adding the percentage to cost.`,
        ],
      },
      {
        heading: 'Gross margin versus net margin',
        paragraphs: [
          `Gross margin measures a sale against its direct costs only: the product, its materials, the labour that made it. Net margin measures the same sale against everything — rent, salaries, marketing, software, shipping subsidies, payment fees. Between the two sits the whole operating business. A shop can post a healthy 45 percent gross margin and a negative net margin if its overheads are heavy enough, which is why a good gross margin is a starting point for analysis, never the conclusion.`,
          `Each margin has its own job. Gross margin judges pricing and purchasing: if it falls, either prices slipped, costs rose, or the sales mix shifted toward cheaper products. Net margin judges the business model as a whole, including whether the operation is the right size for its sales. Comparing the two over time shows where pressure is coming from — a stable gross margin with a shrinking net margin points at overheads, not at pricing, and the fix is different in each case.`,
        ],
      },
      {
        heading: 'Pricing from a target margin — including fees',
        paragraphs: [
          `Working backwards from a target margin is one formula: Price = Cost ÷ (1 − Margin). It becomes more useful when other percentage charges ride on the price. If a marketplace takes 10 percent of the selling price in fees and you want a 30 percent margin on a product costing $45, the price must satisfy all three claims at once: Price = $45 ÷ (1 − 0.30 − 0.10) = $45 ÷ 0.60 = $75. Check it: fees take $7.50, profit is $22.50, and $22.50 is exactly 30 percent of $75.`,
          `The same algebra handles discounts before they happen. If you know a product will regularly sell at 20 percent off, price the undiscounted tag so that the discounted price still delivers your margin: divide cost by (1 − margin) to get the needed selling price, then gross that up by dividing by 0.80. Businesses that skip this step discover during sale season that their promotions are funded entirely out of profit — the margin they planned existed only at a price nobody actually paid.`,
        ],
      },
      {
        heading: 'When a lower margin wins',
        paragraphs: [
          `Margin is a rate, not an amount, and businesses bank amounts. A product earning a 10 percent margin that sells 1,000 units a month at $50 returns $5,000 of gross profit; a 40 percent margin product at the same price selling 80 units returns $1,600. Turnover — how fast stock converts back into cash — is the missing multiplier, which is why supermarkets accept margins that would bankrupt a jeweller: their shelves sell the same money many times a year.`,
          `Deliberately thin margins also appear as strategy: an entry product priced keenly to win a customer whose later purchases carry normal margins, or a line priced to keep a production run viable. These can be sound decisions, but only when they are decisions — made with the contribution figures in front of you, for a defined period, with the rest of the range priced properly. An accidental low margin, discovered at year end, is not a strategy; it is the classic mistake wearing a disguise.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'The 25% markup that is not a 25% margin',
        scenario: 'A product costs $80. A seller adds a 25% markup and believes the margin is 25% (example figures).',
        calculation: 'Markup price: $80 × 1.25 = $100. Profit: $20. Margin: $20 ÷ $100 = 20%. For a true 25% margin: Price = $80 ÷ (1 − 0.25) = $106.67, a markup of 33.3%.',
        result: 'A 25% markup gives a 20% margin — pricing for a real 25% margin requires $106.67, not $100',
      },
      {
        title: 'Gross vs net margin in one month of trading',
        scenario: 'A small shop records $20,000 of sales in a month; the goods sold cost $12,000, and operating expenses (rent, wages, marketing, fees) total $5,000 (example figures).',
        calculation: 'Gross profit: $20,000 − $12,000 = $8,000 → gross margin $8,000 ÷ $20,000 = 40%. Net profit: $8,000 − $5,000 = $3,000 → net margin $3,000 ÷ $20,000 = 15%.',
        result: 'Gross margin 40%, net margin 15% — the 25-point gap is the cost of running the business',
      },
    ],
    extraFaqs: [
      {
        question: 'Can a profit margin ever exceed 100 percent?',
        answer: 'No. Margin divides profit by the selling price, and profit is part of that price, so the maximum margin approaches 100 percent only as cost approaches zero. Markup can exceed 100 percent — a 300 percent markup means the price is four times the cost, which is a 75 percent margin. If a calculation shows a margin above 100 percent, the cost and price have almost certainly been swapped.',
      },
      {
        question: 'What is a good profit margin for my business?',
        answer: 'There is no universal figure. Margins differ between industries — high-turnover grocery retail runs on very thin margins, while software and specialist services run on much higher ones — and between businesses in the same trade. The useful comparisons are against your own past results and your direct competitors, and the practical test is whether the margin, multiplied by your sales volume, covers your operating costs with something left over.',
      },
      {
        question: 'Should shipping and platform fees count as cost or as expenses?',
        answer: 'Either treatment can be correct; what matters is consistency. Fees that attach to each individual sale, such as marketplace commissions and per-order shipping subsidies, are often included in unit cost so the gross margin reflects a single transaction honestly. General overheads belong below the gross line. Whichever you choose, use the same treatment every period — moving fees between categories makes margins appear to change when nothing real has moved.',
      },
    ],
  },

  // ============================================================
  // BREAK-EVEN CALCULATOR
  // ============================================================
  'break-even-calculator': {
    howItWorksExtended: `Profit at volume Q is Profit = (Price − Variable Cost) × Q − Fixed Costs. The term (Price − Variable Cost) is the contribution margin each unit contributes toward fixed costs. Setting profit to zero and solving for Q gives Break-Even Units = Fixed Costs ÷ Contribution Margin. Dividing contribution margin by price gives the contribution margin ratio, and Break-Even Revenue = Fixed Costs ÷ CM Ratio — the same point in money instead of units; both answers always agree, since BEP units × price equals BEP revenue. For a target profit, it joins the fixed costs in the numerator: Units = (Fixed Costs + Target Profit) ÷ Contribution Margin. If price is at or below variable cost, the contribution is zero or negative and no break-even volume exists.`,
    guide: [
      {
        heading: 'The break-even formula, derived in plain language',
        paragraphs: [
          `Imagine every sale as two-step: the money arrives, the unit's own costs leave immediately, and what remains — the contribution — is dropped into a pot that must eventually cover all the fixed costs: rent, salaries, insurance, software. Break-even is the moment the pot exactly fills. If each unit contributes $12 and fixed costs are $12,000 a month, you need 1,000 contributions: 1,000 units. Unit 1,001 is the first one whose contribution is profit rather than recovery.`,
          `Nothing in the formula predicts whether you will sell that many units — it converts your cost structure into a target. That is its real value in planning: it tells a founder the minimum the market must deliver before the business pays for itself, expressed in the units they actually think in — meals served, subscriptions sold, hours billed. Every assumption is visible in the three inputs, so anyone can challenge the price, the variable cost or the fixed total and see the target move.`,
        ],
      },
      {
        heading: 'Break-even revenue and the contribution margin ratio',
        paragraphs: [
          `Sometimes units are the wrong language — a business selling many products at many prices thinks in revenue. The contribution margin ratio converts the same idea: it is contribution divided by price, the share of every revenue dollar that survives variable costs. With a price of $45 and a variable cost of $27, the contribution is $18 and the ratio is 40 percent. Break-even revenue is then Fixed Costs ÷ Ratio: $9,000 ÷ 0.40 = $22,500 — matching 500 units at $45 each.`,
          `The ratio is also a quick diagnostic for comparing products or periods. Two lines can share a price yet contribute very differently if one carries heavier materials, commissions or delivery costs. A falling ratio across a whole business, with prices unchanged, means variable costs are creeping — supplier prices, waste, discounting recorded as revenue reduction. Break-even revenue rises automatically as the ratio falls, which is how a business can sell more each month yet feel no closer to profit.`,
        ],
      },
      {
        heading: 'What-if: how sensitive is your break-even point?',
        paragraphs: [
          `Small input changes move the break-even point more than intuition suggests, because it sits on a difference — price minus variable cost — rather than on either number alone. Take fixed costs of $9,000, a price of $45 and variable costs of $27: break-even is 500 units. Raise the price 10 percent to $49.50 and contribution jumps from $18 to $22.50, a 25 percent improvement from a 10 percent price change, and break-even falls to 400 units — a fifth less selling required.`,
          `Sensitivity runs in the other direction too. If the variable cost rises from $27 to $31.50 through supplier increases while the price stays at $45, contribution shrinks to $13.50 and break-even climbs to about 667 units — a third more sales needed just to stand still. Running these what-ifs before signing a lease or a supply contract is the cheapest risk analysis a small business can do: it shows which input deserves your negotiating effort, and which assumption, if wrong, hurts most.`,
        ],
      },
      {
        heading: 'Fixed costs are not fixed forever',
        paragraphs: [
          `The label "fixed" means fixed with respect to volume, within a range and a period — not fixed for all time. Rent is fixed until you need a bigger premises; one salary is fixed until sales force a second hire. Costs like these move in steps: flat across a band of activity, then jumping. A break-even calculated just below a step can be dangerously optimistic, because the extra hundred units that trigger a new hire or a larger unit raise the fixed total and push the real break-even point further away.`,
          `Some costs refuse the classification entirely. Electricity has a standing charge plus a usage element; a delivery driver costs wages whether or not the van is full, plus fuel per trip. Semi-variable costs like these should be split — the standing part into fixed costs, the per-unit part into variable cost — rather than forced wholly into either box. The quality of a break-even figure is decided less by the arithmetic, which is trivial, than by this honest sorting of the costs feeding it.`,
        ],
      },
      {
        heading: 'The limits of break-even analysis',
        paragraphs: [
          `The model assumes the world holds still while you sell: one price, one variable cost per unit, a constant product mix, and every unit produced actually sold. Real businesses discount, waste stock, shift mix toward cheaper lines and watch costs drift. Break-even also ignores timing — a business can be profitable on paper across a year and still fail in a month when fixed bills land before slow-paying customers settle. Profit and cash are different quantities, and this tool measures the first.`,
          `Used within those limits, break-even analysis is a planning instrument, not a forecast. It disciplines pricing discussions, sizes the sales effort a new venture needs, and stress-tests cost changes in seconds. It cannot tell you whether the demand exists at your price, what competitors will do, or when the money will arrive. Pair the break-even target with evidence about demand — pre-orders, conversion rates, comparable businesses — and revisit the calculation whenever a real cost or price changes, rather than treating the first figure as permanent.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Break-even for a small workshop, then a price rise',
        scenario: 'Fixed costs are $12,000/month, variable cost is $18 per unit, and the selling price is $30 (example figures).',
        calculation: 'Contribution margin: $30 − $18 = $12. Break-even: $12,000 ÷ $12 = 1,000 units = $30,000 revenue. After a price rise to $33: contribution $15, break-even $12,000 ÷ $15 = 800 units = $26,400 revenue.',
        result: 'A 10% price rise cuts the break-even volume by 20% — from 1,000 to 800 units',
      },
      {
        title: 'Units needed for a $6,000 monthly profit target',
        scenario: 'Same workshop: fixed costs $12,000/month, contribution margin $12 per unit at the $30 price (example figures).',
        calculation: 'Units = (Fixed Costs + Target Profit) ÷ Contribution = ($12,000 + $6,000) ÷ $12 = 1,500 units. Check: 1,500 × $12 = $18,000 − $12,000 fixed = $6,000 profit.',
        result: '1,500 units/month ($45,000 revenue) hits the $6,000 target — 500 units beyond break-even',
      },
    ],
    extraFaqs: [
      {
        question: 'What if my variable cost per unit is higher than my price?',
        answer: 'Then no break-even point exists. Every unit sold loses money before fixed costs are even considered, so selling more makes the total loss larger, not smaller. The contribution margin is negative and the formula returns a meaningless negative volume. The only remedies are structural: raise the price, reduce the variable cost, or stop selling that unit in that form. Break-even analysis is valuable precisely because it exposes this situation immediately.',
      },
      {
        question: 'How do I calculate break-even when I sell several products?',
        answer: 'Use a weighted average contribution margin from your sales mix. If product A contributes $10 and is 60 percent of units, and product B contributes $25 at 40 percent, the average contribution is 0.6 × $10 + 0.4 × $25 = $16, and break-even is fixed costs ÷ $16. The result depends entirely on the mix assumption — if the mix shifts toward product A, the real break-even point rises.',
      },
      {
        question: 'Is break-even the same as covering my cash costs?',
        answer: 'Not quite. The standard calculation includes non-cash costs such as depreciation, but it ignores the timing of payments and receipts. A cash break-even excludes non-cash items and asks only when cash in covers cash out. A business can be above accounting break-even for the year and still face a cash squeeze in a month when quarterly bills land before customers pay. Both views are useful; they answer different questions.',
      },
    ],
  },

  // ============================================================
  // AGE CALCULATOR
  // ============================================================
  'age-calculator': {
    howItWorksExtended: `Age is computed by calendar subtraction, not by counting days and dividing. Years, months and days are differenced separately; if the days difference is negative, one month is borrowed and the days in the month preceding the "as of" month are added — which is why February's length and leap years matter to the result. If the months difference then goes negative, twelve months are borrowed from the years. A separate day count sums the actual calendar days between the two dates, walking real month lengths and each 29 February in between, so totals like days lived are exact rather than a 365.25-day approximation. Next-birthday logic finds the next occurrence of the birth month and day on or after the reference date and counts whole days to it.`,
    guide: [
      {
        heading: 'Calendar subtraction: borrowing days and months',
        paragraphs: [
          `Work out an age the way you would subtract by hand, largest unit first. Subtract the years, then the months, then the days, repairing any negative result by borrowing from the next unit up. If the birthday's day-of-month is larger than the current day, borrow one month: the borrowed month is worth the number of days in the month just ended, because those are the days that have actually elapsed since the same date last month.`,
          `A concrete pass: someone born on 20 June 1990, measured on 5 March 2026. The raw differences are 36 years, minus 3 months, minus 15 days. Borrowing twelve months into the months column turns it into 35 years and 9 months; borrowing one of those months into days — February 2026 has 28 days — adds 28 to the days, giving 35 years, 8 months and 13 days. Every age calculator, including this one, is performing exactly this repair work behind the scenes.`,
        ],
      },
      {
        heading: 'Leap years: the rule and the exceptions',
        paragraphs: [
          `A year is a leap year if it is divisible by 4 — with a catch that catches people out. Century years are exceptions: they must be divisible by 400. So 1900 was not a leap year despite dividing by 4, 2000 was because it divides by 400, and 2100 will not be. The rule exists because the solar year is about 365.2422 days; adding a day every four years slightly overcorrects, and skipping three leap days every four centuries brings the calendar back in line.`,
          `Leap days affect age arithmetic twice. They add a real extra day to every total-days count spanning a 29 February, and they create the famous edge case of leap-day birthdays: someone born on 29 February has a true anniversary only one year in four. In the intervening years their age still increments by the borrowing logic above — the calendar subtraction works whether or not the date exists this year — but the celebration date becomes a matter of convention, covered in the final section.`,
        ],
      },
      {
        heading: 'Why you cannot just divide by 365',
        paragraphs: [
          `A tempting shortcut takes the days between two dates and divides by 365 to get years. It fails in both directions. Leap days accumulate at roughly one every four years, so over a 40-year life about ten extra days are silently absorbed into the "years" figure, and months of 28 to 31 days make any months estimate from a day count unreliable by weeks. The shortcut can be off by enough to put a birthday in the wrong month.`,
          `The deeper point is that "how old" and "how many days" are different questions with different correct methods. Years-months-days age is a statement about calendar position, computed by the borrowing subtraction; total days is a duration, computed by summing real days. Even the astronomers' average year of 365.25 days is only an approximation — fine for rough science, wrong for a form that asks your exact age on a specific date, where being a day out can matter legally.`,
        ],
      },
      {
        heading: 'Age is not counted the same way everywhere',
        paragraphs: [
          `The completed-years system used by this calculator is the international legal standard, but it is not the only system in use. In the traditional Chinese reckoning, a child is one sui at birth and gains a year at each Lunar New Year, so a baby born just before the new year can be two sui within days. Traditional Korean age worked similarly — one at birth, incrementing each 1 January — and could put a person two years ahead of their international age.`,
          `South Korea formally unified on the international system for legal and administrative purposes in June 2023, though the traditional count survives socially in some contexts. The practical lesson for forms, eligibility and official documents is to use completed years unless the document explicitly asks otherwise — school entry, benefits, drinking ages and retirement rules are all written in that system in most countries, usually as "age on" a specified date. When a rule matters, check its exact wording rather than assuming.`,
        ],
      },
      {
        heading: 'Next birthdays, milestones and countdowns',
        paragraphs: [
          `A birthday countdown is a small piece of date logic: take the birth month and day, place them in the current year, and if that date has already passed, roll to next year; the countdown is the whole days between today and that occurrence. For 29 February birthdays the occurrence needs a stand-in in common years — commonly 28 February or 1 March depending on the convention chosen — which is why two countdown tools can occasionally disagree by a day for leap-day babies.`,
          `Milestones need more care than countdowns. Many rules are framed as reaching an age by a cut-off: a child must be five by 1 September to start a school year, a benefit starts the month after a birthday, a licence class opens at an exact age. The calculator's "age as of" date exists for exactly these questions — set it to the rule's cut-off date rather than today. But the rule itself, including which date and which convention it uses, always comes from the authority applying it.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Born 20 June 1990, measured on 5 March 2026',
        scenario: 'Working out an exact age, total days lived, and the wait for the next birthday on a fixed reference date (example dates).',
        calculation: 'Calendar subtraction with borrowing: 35 years, 8 months, 13 days. Total days: 35 years to 20 June 2025 = 12,784 days (including 9 leap days), plus 258 days to 5 March 2026 = 13,042 days = 1,863 weeks and 1 day. Next birthday (20 June 2026) is 107 days after 5 March.',
        result: 'Age: 35 years, 8 months, 13 days | Days lived: 13,042 | Next birthday in 107 days',
      },
      {
        title: 'Duration between two ordinary dates',
        scenario: 'A project runs from 15 January 2026 to 30 November 2026; how long is it in months-and-days and in total days? (Example dates.)',
        calculation: 'Months: 15 January to 15 November is exactly 10 months; 15 November to 30 November adds 15 days. Total days: 16 (rest of January) + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30 (November) = 319 days.',
        result: 'Duration: 10 months, 15 days — 319 days in total (2026 is not a leap year, so February has 28 days)',
      },
    ],
    extraFaqs: [
      {
        question: 'Why does my total days lived not divide evenly by 365?',
        answer: 'Because years are not 365 days long. Roughly one year in four has 366 days, and those leap days are part of your life, so your day count is 365 times your age in years plus the leap days you have lived through, adjusted for your birthday\'s position. Dividing by 365 always leaves a remainder that grows with age — the discrepancy is the leap days, not an error.',
      },
      {
        question: 'How old is someone born on 29 February in a year without one?',
        answer: 'Their completed years still increase by one each year — age is counted from the date of birth, not from anniversaries. The celebration date in common years is a matter of convention and, for legal purposes, of local law: some jurisdictions treat 28 February as the legal birthday in non-leap years, others 1 March. For everyday purposes most leap-day babies pick one of the two and stay consistent.',
      },
      {
        question: 'Can I use this to find the duration between two dates that are not birthdays?',
        answer: 'Yes — the arithmetic is identical. Enter the earlier date as the start and the later date as the "as of" date, and the years, months and days result is the elapsed duration: useful for project lengths, tenancy periods, ages of buildings, and time since an event. The total-days figure gives the same span as a single number when you need to multiply by a daily rate or compare durations.',
      },
    ],
  },
};
