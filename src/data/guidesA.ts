import type { GuideArticle } from './guidesRegistry';

export const GUIDES_A: GuideArticle[] = [
  {
    slug: 'how-compound-interest-works',
    title: 'How Compound Interest Works: Formula, Examples and the Rule of 72',
    metaDescription:
      'How compound interest works: the formula explained term by term, compounding frequency, monthly contributions, the Rule of 72 checked, and the cost of debt.',
    intro:
      'Compound interest is the reason long-term saving works and long-term debt hurts: it is interest calculated not just on your original money, but on all the interest that money has already earned. The effect looks unimpressive in the first year or two and dramatic over decades, which is why it rewards people who start early and punishes people who carry balances for years. This guide builds the idea up in plain steps — simple versus compound interest, the standard formula explained term by term, the real (and limited) effect of compounding more often, what happens when you add a monthly contribution, and the Rule of 72, including how accurate that famous shortcut actually is. Every figure is a worked example you can reproduce with a basic calculator, and all of them assume a fixed rate with no tax, fees or withdrawals — real accounts will differ in detail, but never in the underlying maths.',
    sections: [
      {
        heading: 'Simple Interest vs Compound Interest',
        paragraphs: [
          'Simple interest is calculated only on the original amount, called the principal. Deposit $10,000 at 6% simple interest and you earn $600 every year — the same $600 in year one and year ten — for a total of $16,000 after ten years. The interest itself never earns anything, because it is treated as if it were paid out or set aside where it cannot grow. Simple interest still appears in some short-term loans and in the way certain bonds describe their coupons, but almost no savings product works this way over long periods.',
          'Compound interest recalculates the base every period. Deposit the same $10,000 at 6% compounded annually and year one also earns $600 — but in year two the 6% applies to $10,600, earning $636, and in year three it applies to $11,236, earning about $674. Each year’s interest becomes part of the principal for the next. After ten years the balance is $10,000 × 1.06^10 = $17,908.48 — almost $1,908 more than simple interest paid on the identical deposit at the identical rate. Nothing changed except that the interest was left in the account to earn interest of its own.',
        ],
      },
      {
        heading: 'The Formula, Term by Term',
        paragraphs: [
          'The standard compound interest formula is A = P(1 + r/n)^nt. A is the final amount. P is the principal — the money you start with. r is the annual interest rate written as a decimal, so 6% becomes 0.06. n is the number of times interest is compounded per year: 1 for annually, 4 for quarterly, 12 for monthly. t is the number of years the money stays invested. The expression in brackets, (1 + r/n), is the growth factor for a single compounding period: with monthly compounding at 6%, each month multiplies the balance by 1.005. The exponent, nt, is simply the total number of periods — 120 months in ten years.',
          'Reading the formula this way explains its behaviour. The rate per period, r/n, gets smaller as n grows, but the number of multiplications grows by the same factor, which is why more frequent compounding helps only modestly (the next section puts numbers on this). The exponent is where the power lives: time multiplies the number of growth steps, so doubling the years does far more than doubling the deposit. Subtracting the principal at the end (A − P) isolates the interest earned, which is the figure worth comparing against what you put in.',
        ],
      },
      {
        heading: 'Compounding Frequency: Real Effect, Small Numbers',
        paragraphs: [
          'Banks like to advertise monthly or even daily compounding, so it is worth seeing what it is actually worth. Take $10,000 at 6% for ten years. Compounded annually, it grows to $17,908.48. Compounded monthly — twelve smaller steps a year instead of one — it grows to $10,000 × (1.005)^120 = $18,193.97. Monthly compounding earns about $285 more over a whole decade: real money, but roughly a 1.6% improvement on the final balance, not the transformation the marketing suggests. The rate and the time matter far more than the frequency.',
          'Frequency matters even less at lower rates and more at higher ones, because the effect is itself a small compounding difference. The practical lesson is about priorities: when comparing two savings products, a rate that is half a percent higher beats a fancier compounding schedule almost every time, and leaving money invested for extra years beats both. If a lender quotes you a rate, also check which frequency the quote assumes — the same nominal 6% produces slightly different true annual growth depending on n, which is why regulators in many countries require an effective annual rate (APY or AER) for honest comparison.',
        ],
      },
      {
        heading: 'Adding Regular Contributions: Where the Big Numbers Come From',
        paragraphs: [
          'Most savers do not invest one lump sum; they add money monthly. Each deposit then compounds for a different length of time — the first for the full term, the last for a single month — and the formula for the total is the future value of a series: FV = PMT × [((1 + i)^N − 1) ÷ i], where PMT is the monthly payment, i is the monthly rate and N is the number of payments. Save $200 a month for 30 years at an assumed 7% annual return compounded monthly (i = 0.07 ÷ 12) and the formula gives about $243,994. You paid in $72,000; the remaining roughly $171,994 is growth. These are illustrative figures at a constant assumed rate — markets do not pay a smooth 7%, but the structure of the result is real.',
          'Now shorten the term. The same $200 a month at the same assumed 7% for 20 years grows to about $104,185, of which you paid in $48,000. Ten fewer years removed about $140,000 from the outcome, even though the contributions only fell by $24,000 — because the missing years are the last ones, when the balance is largest and each year of growth is worth the most. This asymmetry is the single most important fact about compound growth: the final decade does the heavy lifting, so starting early is worth more than saving aggressively later. Our compound interest calculator lets you vary the deposit, rate and term to see this curve for your own numbers.',
        ],
      },
      {
        heading: 'The Rule of 72 — and How Accurate It Really Is',
        paragraphs: [
          'The Rule of 72 estimates how long money takes to double: divide 72 by the annual percentage rate. At 8%, 72 ÷ 8 = 9 years. At 6%, about 12 years. At 3%, about 24 years. The rule works because the true doubling time is ln 2 ÷ ln(1 + r), and 72 is a convenient approximation of 100 × ln 2 (about 69.3) adjusted upward to compensate for the way the exact formula bends at common interest rates — with the bonus that 72 divides neatly by 2, 3, 4, 6, 8, 9 and 12, so the mental arithmetic is easy.',
          'How accurate is it? At 8% it is almost exact: the true doubling time is 9.01 years, and 1.08^9 = 1.999 — a genuine double. At the edges it drifts. At 2%, the rule says 36 years but the exact answer is 35.0 years, so the rule overstates the wait by about a year. At 12%, the rule says 6 years but the exact answer is 6.12 years, and 1.12^6 = 1.974 — close to, but not quite, double. For quick comparisons and sanity checks the rule is excellent; for a decision involving real money, run the actual formula. The rule also works in reverse for debt and for inflation: at 3% inflation, money sitting idle loses half its buying power in roughly 24 years.',
        ],
      },
      {
        heading: 'The Debt Side — and the Inflation Caveat',
        paragraphs: [
          'Compounding does not care whose side it is on. A $5,000 credit card balance at 24% APR accrues about 2% a month. Pay only $100 a month — roughly the interest — and the balance barely moves; you are renting the debt, not repaying it. Pay a fixed $150 a month instead and the maths flips: each payment covers the interest and removes some principal, the next month’s interest is charged on a smaller balance, and the balance reaches zero in about 56 payments, with roughly $3,322 of interest paid on top of the $5,000 borrowed (approximate figures; minimum-payment formulas vary by issuer, and a final smaller payment adjusts the total). The difference between those two outcomes is not the rate — it is whether the payment exceeds the interest by enough for compounding to start working for you.',
          'Finally, a caveat that applies to every number in this guide: they are nominal, before inflation. If savings grow at 7% while prices rise at 3%, the buying power of the balance grows at roughly 4% a year (more precisely, 1.07 ÷ 1.03 − 1 ≈ 3.9%). That real return is what determines whether you are actually better off. It is also why cash under a mattress is not “safe” in the long run: at 3% inflation it loses about half its real value in 24 years, silently, with the Rule of 72 working against it the whole time.',
        ],
      },
    ],
    relatedToolSlugs: ['compound-interest-calculator', 'loan-calculator'],
    faq: [
      {
        question: 'Is daily compounding much better than monthly?',
        answer:
          'No. On $10,000 at 6% over ten years, monthly compounding gives about $18,194 and daily compounding roughly $18,221 — a difference of under $30 in a decade. Frequency is a minor detail compared with the rate itself and the number of years the money stays invested, so choose accounts on rate, fees and safety first.',
      },
      {
        question: 'Does compound interest work the same way on investments that go up and down?',
        answer:
          'The formula assumes a constant rate, and real investments do not offer one. Returns arrive unevenly, losses compound too, and the order of good and bad years affects the result. The formula is still the right way to think about long-term growth and to compare scenarios, but treat any single projected figure as an illustration, not a promise.',
      },
      {
        question: 'Why does the Rule of 72 use 72 instead of the exact number?',
        answer:
          'The mathematically exact constant is about 69.3 (100 × ln 2), but the true doubling formula bends with the rate, and 72 compensates for that bend at the rates people commonly meet, between roughly 4% and 12%. It also divides cleanly by many small numbers, which makes the mental arithmetic effortless.',
      },
      {
        question: 'Can compound interest make a small monthly saving worthwhile?',
        answer:
          'Yes, given time. Saving $100 a month at an assumed 7% compounded monthly for 30 years builds to roughly $121,997, of which only $36,000 is money you put in. Halve the term to 15 years and the result drops to about $31,700 — which shows that the years invested matter more than the amount per month.',
      },
    ],
  },
  {
    slug: 'how-loan-amortization-works',
    title: 'How Loan Amortization Works: Why Early Payments Are Mostly Interest',
    metaDescription:
      'Loan amortization explained in plain words: why early payments are mostly interest, the halfway-point illusion, term-length costs and extra payments.',
    intro:
      'Amortization is the schedule by which a loan is paid off in equal instalments — and it produces the most misunderstood fact in personal finance: at the start of a loan, most of your payment is interest, even though the payment itself never changes. Borrowers often discover this when they check a mortgage balance after years of payments and find it has barely moved. Nothing has gone wrong; that is the arithmetic working exactly as designed. This guide explains where the payment formula comes from, walks through the first three payments of a real example line by line, shows why the halfway point of a loan’s term is not the halfway point of its balance, and puts verified numbers on term length and extra payments, so you can read any amortization schedule — including the one from our loan calculator — with confidence.',
    sections: [
      {
        heading: 'Where the Fixed Payment Comes From',
        paragraphs: [
          'An amortizing loan has three ingredients: the amount borrowed (principal), the interest rate, and the term. The lender needs one fixed payment that, repeated every month, exactly clears the debt on the final date — no more, no less. Each month, interest is charged on whatever balance remains, and whatever is left of the payment reduces that balance. The payment is set by solving that process backwards: it is the amount for which the balance, growing by interest and shrinking by the payment each month, lands on exactly zero after the last payment. That solution is the annuity formula: payment = P × i(1 + i)^n ÷ ((1 + i)^n − 1), where i is the monthly rate and n the number of payments.',
          'Two consequences follow from the definition, before any numbers appear. First, because the balance starts at its maximum, the interest charged in month one is the largest interest charge of the whole loan — the rate times the full principal. Second, the split of every payment is forced: interest first (it is already owed), principal with what remains. Early in the loan the interest slice is big, so the principal slice is small, so the balance falls slowly, so next month’s interest is only slightly smaller. The schedule is not the lender being clever; it is what “interest on what you currently owe” inevitably looks like when the payment is fixed.',
        ],
      },
      {
        heading: 'The First Three Payments, Line by Line',
        paragraphs: [
          'Take a $10,000 loan at 12% annual interest, repaid over 12 monthly payments. The monthly rate is 1%, and the formula gives a payment of $888.49. Payment one: interest is 1% of $10,000, which is $100.00. The remaining $788.49 comes off the balance, leaving $9,211.51. Payment two: interest is 1% of $9,211.51, which is $92.12, so $796.37 reduces the balance, leaving $8,415.14. Payment three: interest is $84.15, principal is $804.34, and the balance falls to $7,610.80. Notice the pattern — the payment is identical each month, but the principal portion grows by a few dollars every time, and the interest portion shrinks by the same amount.',
          'On this short, expensive loan the effect is mild: even the first payment is mostly principal, because the term is only a year. Stretch the same structure over decades and the pattern becomes extreme, as the next section shows. It also explains a common confusion with loan quotes: the monthly payment is a poor summary of a loan. Two loans can share a payment and differ by thousands in total cost, because the payment hides how the split evolves. The schedule — month-by-month interest, principal and balance — is the document that actually describes what you are buying.',
        ],
      },
      {
        heading: 'The Halfway-Point Illusion',
        paragraphs: [
          'Intuition says that after half the payments, half the loan should be gone. Amortization says otherwise. Consider a $300,000 mortgage at 6% over 30 years: the payment is $1,798.65 a month. After 180 payments — exactly halfway through the term, and about $323,757 handed over — the remaining balance is about $213,147. Only about $86,853 of principal has been repaid: roughly 29%, not 50%. Of everything paid in those fifteen years, about $236,900 was interest. The balance curve is bowed: it descends slowly for years, then steepens, and the final years clear principal at several times the speed of the first years.',
          'This matters for real decisions. Selling or refinancing “halfway through” a mortgage means selling with nearly three-quarters of the original debt still attached. Building equity early depends far more on the deposit and on house prices than on the mortgage payments themselves. And it explains why the interest rate matters so much on long loans: over the full 30 years, that $300,000 mortgage at 6% costs about $347,515 in interest — more than the amount borrowed. The first decade of a long loan is, financially speaking, mostly an interest-paying decade; plan for that rather than being surprised by it.',
        ],
      },
      {
        heading: 'Term Length: The Total-Cost Trade-Off',
        paragraphs: [
          'Because interest is charged on the balance for as long as it exists, the term is the strongest lever on total cost. Borrow $20,000 at 9%. Over three years the payment is $635.99 a month and the total interest is about $2,896. Over five years the payment drops to $415.17 — about $221 a month lighter — but the total interest climbs to about $4,910. The longer loan costs roughly $2,014 more for the same car, the same rate and the same principal. Stretching the term does not make the loan cheaper; it rents you a smaller monthly payment at a price that is stated, quietly, in the total.',
          'Neither option is automatically correct. A payment that strains the monthly budget is a genuine risk, and a default costs far more than the interest saved by a shorter term. The sensible method is to start from the shortest term whose payment fits comfortably alongside your other commitments, then look at the total interest at that term. If moving one term shorter raises the payment slightly but cuts the interest a lot — a common pattern, as the example shows — that is where the real saving is. Compare loans on total cost first and payment second, and be suspicious of any offer that only ever mentions the monthly figure.',
        ],
      },
      {
        heading: 'Extra Payments: Small Money, Outsized Effect',
        paragraphs: [
          'An extra payment is powerful because every cent of it goes to principal — no interest is due on money already repaid — and the smaller balance then reduces the interest charged in every remaining month. On the $20,000, 9%, five-year loan above, adding just $50 a month to the $415.17 payment clears the debt in about 53 months instead of 60 and saves roughly $675 in interest (figures from the amortization schedule, rounded). The earlier the extra payments start, the stronger the effect, because the reduced balance has longer to compound in your favour.',
          'Two practical checks come first. Confirm the loan has no prepayment penalty, and confirm with the lender that extra amounts are applied to the principal immediately, not held as an early payment of next month’s instalment — the two treatments look similar on a statement but only the first saves interest. If your loan is one of several debts, compare rates before accelerating any of them: extra money does the most good against the highest rate. Subject to those checks, overpaying an amortizing loan is one of the few guaranteed returns in personal finance — it earns exactly the loan’s interest rate, with no market risk.',
        ],
      },
      {
        heading: 'Amortizing vs Interest-Only vs Balloon Loans',
        paragraphs: [
          'Not every loan amortizes. With an interest-only loan, the payment covers only the interest: on $200,000 at 6%, that is $1,000 a month, every month, and at the end of the term you still owe $200,000. These loans appear in some mortgages and business lending, where the plan is to sell an asset, refinance, or repay from a future lump sum — workable if the plan holds, dangerous if it does not, because no equity is built in the meantime. A balloon loan goes further in the same direction: small payments for a set period, then one large final payment of most or all of the principal. The low payments are real, but they are deferral, not savings.',
          'The fully amortizing loan — the kind this guide and our calculators describe — is the conservative structure: the payment is higher than an interest-only payment on the same debt, but the balance is guaranteed to reach zero on a known date with no final surprise. When comparing offers, identify the structure before comparing the numbers. A smaller payment on an interest-only or balloon loan is not a cheaper loan; it is a loan whose cost has been moved to the end, usually with interest accruing on a larger balance for longer.',
        ],
      },
    ],
    relatedToolSlugs: ['loan-calculator', 'mortgage-calculator'],
    faq: [
      {
        question: 'Why is my balance barely falling even though I pay every month?',
        answer:
          'Because early payments are mostly interest. Interest is charged on the outstanding balance, which is at its highest at the start, so only a small part of each early payment reduces the debt. The principal share grows every month, and the balance falls noticeably faster in the second half of the term.',
      },
      {
        question: 'Does making one extra payment a year really help?',
        answer:
          'Yes, provided it is applied to the principal. On a long loan, an extra monthly payment’s worth each year removes interest from every subsequent month and can shorten the term by months or years on a mortgage. Check first that your loan has no prepayment penalty and that the lender applies the money to the balance immediately.',
      },
      {
        question: 'Is a lower monthly payment always the cheaper loan?',
        answer:
          'No — it is often the more expensive one. Stretching a loan over more months reduces each payment but keeps the balance higher for longer, so more interest accrues. On $20,000 at 9%, moving from three years to five cuts the payment by about $221 a month but adds roughly $2,014 in total interest.',
      },
      {
        question: 'What is the difference between amortization and depreciation?',
        answer:
          'They are unrelated ideas that share a Latin root. Amortization is the repayment schedule of a loan — how each payment splits between interest and principal until the balance reaches zero. Depreciation is the fall in value of an asset over time, such as a car losing value. A car loan can involve both at once.',
      },
    ],
  },
  {
    slug: 'margin-vs-markup-explained',
    title: 'Margin vs Markup: The Difference That Changes Your Prices',
    metaDescription:
      'Margin vs markup explained with worked numbers: both formulas, conversion pairs, pricing from a target margin, and why discounts eat profit so fast.',
    intro:
      'Margin and markup describe the same profit in two different ways — and confusing them is one of the most expensive small mistakes in business. A shopkeeper who wants a 40% margin but prices with a 40% markup quietly earns 28.6% instead, and may never notice, because the business still makes money on every sale; it just makes much less than intended. The two measures differ only in their base: markup divides profit by cost, margin divides profit by selling price. This guide sets out both formulas, proves with worked numbers why a 25% markup equals only a 20% margin, gives the standard conversion pairs, shows how to price backwards from a target margin, and finishes with the discount trap — why a “small” 10% price cut can require 50% more sales just to stand still.',
    sections: [
      {
        heading: 'Two Formulas, Two Different Bases',
        paragraphs: [
          'Markup measures profit against what the item cost you: markup = (price − cost) ÷ cost. Buy something for $80 and sell it for $100, and the $20 profit is a markup of 20 ÷ 80 = 25%. Margin measures the same profit against what the customer paid: margin = (price − cost) ÷ price. On that identical sale, the margin is 20 ÷ 100 = 20%. Same product, same $20 profit, two different percentages — because the denominators differ. Markup answers “how much did I add to my cost?”, while margin answers “how much of my revenue is profit?”. The second question is the one your accounts, your tax return and your profit-and-loss statement care about.',
          'That difference in base has a hard consequence: markup can exceed 100% (double your cost and the markup is 100%; triple it and the markup is 200%), but margin can never reach 100%, because profit is always a part of the price, never the whole of it. A margin of 50% means half the price is profit; a margin of 90% means the cost is only a tenth of the price. When someone quotes you a percentage, the first thing to establish is which of the two measures they mean — a supplier’s “30% margin” and your own “30% markup” are different prices.',
        ],
      },
      {
        heading: 'Why a 25% Markup Is Only a 20% Margin',
        paragraphs: [
          'Work it once with round numbers and it never confuses you again. An item costs $100. Add a 25% markup: 25% of the $100 cost is $25, so the price becomes $125. Now compute the margin on that sale: the profit is still $25, but the margin divides by the price, $125 — 25 ÷ 125 = 20%. The markup and the margin describe the same transaction, yet they differ by five full points, because the markup percentage was calculated on the smaller number (cost) and the margin on the larger one (price). The gap widens as the percentages grow: at a 100% markup the margin is 50%, a fifty-point difference.',
          'The general conversion is just as simple. Margin = markup ÷ (1 + markup), with both written as decimals: a markup of 0.25 gives 0.25 ÷ 1.25 = 0.20. Going the other way, markup = margin ÷ (1 − margin): a margin of 0.20 gives 0.20 ÷ 0.80 = 0.25. If you remember nothing else, remember the direction: for the same sale, the margin is always the smaller number, and pricing with the markup formula when you meant the margin always underprices the product.',
        ],
      },
      {
        heading: 'The Conversion Pairs Worth Knowing',
        paragraphs: [
          'A handful of pairs covers most real pricing conversations. A markup of 10% is a margin of about 9.09%. A markup of 20% is a margin of about 16.67%. A markup of 25% is a margin of exactly 20%. A markup of 33.33% is a margin of exactly 25%. A markup of 50% is a margin of about 33.33%. And a markup of 100% — doubling your cost — is a margin of exactly 50%. Notice the pattern: the pairs are linked, because each is the other viewed from the opposite base, and the 25/20 and 33.33/25 pairs are mirror images of each other.',
          'Read the same table backwards when you start from a margin target, which is how most businesses should price. To earn a margin of 10%, you need a markup of about 11.11%. A margin of 20% needs a markup of 25%. A margin of 25% needs a markup of 33.33%. A margin of about 33.33% needs a markup of 50%, and a margin of 50% needs a markup of 100%. Our profit margin calculator converts in both directions, but having the common pairs in your head lets you sanity-check any price in a negotiation on the spot.',
        ],
      },
      {
        heading: 'Pricing Backwards From a Target Margin',
        paragraphs: [
          'If you know your cost and the margin you need, the price is one division: price = cost ÷ (1 − margin). A product that costs $80, priced for a 25% margin, gives 80 ÷ 0.75 = $106.67. Check it: at $106.67 the profit is $26.67, and 26.67 ÷ 106.67 = 25% exactly. The common error is to multiply instead — $80 × 1.25 = $100 — which applies a 25% markup and delivers a margin of only 20%. On a single item the difference looks trivial; applied across a whole catalogue, all year, it is the difference between the profit you planned and the profit you actually made.',
          'Build the target margin from your real costs, not from habit. The margin on each sale has to cover everything that is not in the item’s cost: rent, wages, marketing, software, payment fees, returns and your own income, with something left over. Businesses that price from a margin target also find discounting decisions easier, because they can see exactly how much margin a proposed discount removes (the final section shows why that matters). If your costs change — a supplier raises prices, shipping gets more expensive — the formula tells you the new price immediately: divide the new cost by the same (1 − margin).',
        ],
      },
      {
        heading: 'The Classic Mistake: A Shop That Underpriced Everything',
        paragraphs: [
          'A small shop buys a product line at $60 per unit and decides it needs a 40% margin to cover its overheads. The owner adds 40% to the cost — a markup — and prices the line at $84. But the margin at $84 is (84 − 60) ÷ 84 = about 28.6%, not 40%. The correct price for a 40% margin is 60 ÷ (1 − 0.40) = $100. Every unit sold earns $24 of profit instead of the planned $40. Across 500 units, that is $12,000 of gross profit instead of $20,000 — $8,000 quietly left on the table, from a single wrong formula, in a business that believes it is hitting its target.',
          'What makes this mistake so persistent is that nothing looks broken. Sales happen, money arrives, the markup calculation feels natural because cost is the number you start with. The error only surfaces when the accounts are compared with the plan — or never, if there is no plan. The fix takes minutes: decide margins by target, convert to prices with the division formula, and relabel any price list that was built with markups. If you inherit prices from a supplier’s “recommended margin”, verify which measure they used before trusting a single figure.',
        ],
      },
      {
        heading: 'Gross Margin, Net Margin — and the Discount Trap',
        paragraphs: [
          'Two refinements complete the picture. Gross margin uses only the direct cost of the item — what you paid for it or what it cost to make. Net margin divides the business’s final profit, after every expense, by total revenue; it is always much lower, and it is the figure that decides whether the business is actually healthy. A shop can run a healthy 40% gross margin and a 3% net margin, with the difference consumed by rent, staff and everything else. Confusing the two leads to the opposite error from the rest of this guide: believing the business is more profitable than it is.',
          'Finally, the discount trap, which is where margin thinking earns its keep. You sell at $100 with a cost of $70 — a 30% margin, $30 profit per unit. Offer a 10% discount and the price becomes $90; the cost is still $70, so profit falls to $20 a unit. That is not a 10% cut in profit, it is a 33% cut. To earn the same total profit as before, volume must rise by 50%: where 100 units earned $3,000, you now need 150 units to earn the same $3,000. Discounts are sometimes the right tool — but priced in margin, not in headline percentages, you can see exactly how much extra selling each one demands.',
        ],
      },
    ],
    relatedToolSlugs: ['profit-margin-calculator', 'break-even-calculator'],
    faq: [
      {
        question: 'Which should I use to set my prices, margin or markup?',
        answer:
          'Set prices from a target margin, because margin connects directly to your accounts: it is the share of each sale available to cover overheads and profit. Use the formula price = cost ÷ (1 − margin). Markup is still useful for quick estimates and trade conversations, but convert it before treating it as your profitability.',
      },
      {
        question: 'Can margin ever be higher than markup on the same sale?',
        answer:
          'No. Both measures share the same profit figure, but margin divides it by the price and markup divides it by the cost, and the price is always larger than the cost on a profitable sale. The larger denominator always gives the smaller percentage, so margin is always below markup for the same transaction.',
      },
      {
        question: 'What is a good margin for a small business?',
        answer:
          'There is no single healthy number, because margins differ enormously by industry: groceries run on very thin gross margins and high volume, while software and services can sustain much higher ones. What matters is whether your gross margin, after all overheads, leaves a net margin you can live with — compare against your own costs, not a headline figure.',
      },
      {
        question: 'Why do accountants prefer margin over markup?',
        answer:
          'Because financial statements are built on revenue. Gross margin is gross profit divided by revenue, so it drops straight out of a profit-and-loss statement and can be compared across periods, products and businesses of different sizes. Markup has no equivalent line in the accounts, which makes it easy to quote but hard to audit.',
      },
    ],
  },
];
