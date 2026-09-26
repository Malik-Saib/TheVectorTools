import { ToolDefinition } from '../types';

export const TOOLS_REGISTRY: ToolDefinition[] = [
  // ==========================================
  // CALCULATORS
  // ==========================================
  {
    id: 'salary-calculator',
    slug: 'salary-calculator',
    name: 'Salary / Take-Home Calculator',
    shortDescription: 'Estimate your exact take-home pay, progressive tax brackets, and social contributions.',
    longDescription: 'A comprehensive European and international net salary calculator. Compute your exact take-home pay after statutory social insurance contributions, health insurance, and progressive income tax brackets for 2026 and 2025.',
    category: 'calculators',
    categoryLabel: 'Calculators',
    subcategory: 'money',
    subcategoryLabel: 'Finance & Tax',
    iconName: 'Banknote',
    popular: true,
    badge: 'Popular',
    keywords: ['salary', 'take home', 'net salary', 'gross to net', 'payroll', 'tax brackets', 'germany', 'uk', 'france', 'paycheck'],
    relatedToolSlugs: ['income-tax-calculator', 'vat-calculator', 'loan-calculator', 'compound-interest-calculator'],
    howToUse: [
      'Select your country (Germany, United Kingdom, France, Spain, Netherlands, and more).',
      'Select the applicable tax year (2026 or 2025).',
      'Enter your gross compensation and choose the pay frequency (Annual, Monthly, Weekly, or Hourly).',
      'Review your net monthly and annual take-home pay alongside visual deduction charts.'
    ],
    howItWorks: 'The salary calculator applies statutory progressive tax brackets, tax-free allowances, and statutory employee social security deductions (pension, health, unemployment, long-term care) in compliance with national revenue authority regulations.',
    example: {
      title: 'German Software Engineer (€65,000 / year)',
      scenario: 'An unmarried employee in Germany earning €65,000 gross with standard statutory health insurance in tax class 1.',
      calculation: 'Gross: €65,000 | Social Contributions: ~€13,500 | Wage Tax: ~€11,700 | Net Take-Home: ~€39,800/yr (€3,316/mo)',
      result: 'Net Monthly: ~€3,316 | Effective Total Deduction: ~38.7%'
    },
    faq: [
      {
        question: 'How accurate is this salary calculator?',
        answer: 'Our models implement official tax brackets and contribution limits for 2026 and 2025. Results are realistic estimates for standard employment without idiosyncratic individual deductions.'
      },
      {
        question: 'Are my financial figures saved anywhere?',
        answer: 'No. All calculations run strictly client-side inside your browser. No income data is ever transmitted or stored on any server.'
      },
      {
        question: 'What is the difference between gross and net salary?',
        answer: 'Gross salary is your total compensation before any government deductions. Net salary (take-home pay) is the money actually deposited into your bank account after income tax and social insurance.'
      }
    ],
    seo: {
      title: 'Salary & Take-Home Pay Calculator (2026 & 2025) – THE VECTOR TOOLS',
      metaDescription: 'Calculate your exact net salary and take-home pay after progressive income taxes and social security contributions across Europe.',
      keywords: ['salary calculator', 'take home pay calculator', 'net salary calculator', 'tax calculator 2026']
    },
    sources: [
      { name: 'German Federal Ministry of Finance (BMF)', url: 'https://www.bmf-steuerrechner.de' },
      { name: 'HM Revenue & Customs (HMRC)', url: 'https://www.gov.uk/estimate-income-tax' }
    ]
  },
  {
    id: 'income-tax-calculator',
    slug: 'income-tax-calculator',
    name: 'Income Tax Calculator',
    shortDescription: 'Calculate progressive income tax, taxable income, and effective tax rates across multiple jurisdictions.',
    longDescription: 'Analyze your progressive tax liability with a breakdown of tax bands, marginal tax rates, standard allowances, and net post-tax income.',
    category: 'calculators',
    categoryLabel: 'Calculators',
    subcategory: 'money',
    subcategoryLabel: 'Finance & Tax',
    iconName: 'Receipt',
    popular: true,
    badge: 'Essential',
    keywords: ['income tax', 'tax bracket', 'marginal tax', 'effective tax rate', 'taxable income', 'tax liability'],
    relatedToolSlugs: ['salary-calculator', 'vat-calculator', 'loan-calculator'],
    howToUse: [
      'Select your tax jurisdiction and tax year.',
      'Enter your total gross annual taxable earnings.',
      'Enter any standard tax deductions or allowances if applicable.',
      'View your step-by-step bracket breakdown and effective marginal rate.'
    ],
    howItWorks: 'Progressive tax systems divide income into chunks (brackets). Each slice of income is taxed only at its corresponding rate, rather than taxing your entire income at the highest rate.',
    example: {
      title: 'Progressive Tax Example on $75,000 Income',
      scenario: 'Under a 3-bracket system (10% up to $15k, 20% from $15k to $50k, 30% above $50k).',
      calculation: 'Bracket 1: $15,000 × 10% = $1,500 | Bracket 2: $35,000 × 20% = $7,000 | Bracket 3: $25,000 × 30% = $7,500',
      result: 'Total Tax: $16,000 | Effective Rate: 21.33% | Post-Tax Income: $59,000'
    },
    faq: [
      {
        question: 'What is the difference between marginal and effective tax rate?',
        answer: 'Your marginal tax rate is the tax rate applied to your highest dollar/euro of earnings. Your effective tax rate is your total tax paid divided by your total income.'
      },
      {
        question: 'Does earning more money ever reduce my net pay due to higher tax brackets?',
        answer: 'No. Because modern tax systems are progressive, higher tax rates only apply to income exceeding the threshold for that bracket.'
      }
    ],
    seo: {
      title: 'Income Tax Calculator – Bracket & Marginal Rate Breakdown – THE VECTOR TOOLS',
      metaDescription: 'Free progressive income tax calculator. Discover your exact tax liability, marginal bracket, and effective tax rate with step-by-step calculations.',
      keywords: ['income tax calculator', 'tax bracket calculator', 'effective tax rate', 'marginal tax rate']
    }
  },
  {
    id: 'vat-calculator',
    slug: 'vat-calculator',
    name: 'VAT Calculator',
    shortDescription: 'Add or remove Value Added Tax (VAT) with instant Net, Gross, and Tax amount breakdowns.',
    longDescription: 'Fast, accurate VAT and sales tax calculator. Calculate Gross price from Net price, extract Net price from Gross price, and compute the exact tax amount using standard European or custom VAT rates.',
    category: 'calculators',
    categoryLabel: 'Calculators',
    subcategory: 'money',
    subcategoryLabel: 'Finance & Tax',
    iconName: 'Percent',
    popular: true,
    keywords: ['vat calculator', 'sales tax', 'add vat', 'remove vat', 'gross to net vat', 'invoice tax', 'tax rate'],
    relatedToolSlugs: ['percentage-calculator', 'percentage-change-calculator', 'salary-calculator'],
    howToUse: [
      'Choose whether to Add VAT (Net → Gross) or Remove VAT (Gross → Net).',
      'Select a country preset (e.g. UK 20%, Germany 19%, France 20%, Spain 21%) or input a custom rate.',
      'Enter the price amount to immediately see the Net, VAT Amount, and Gross.'
    ],
    howItWorks: 'To add VAT: Gross = Net × (1 + Rate / 100). To extract VAT from a gross price: Net = Gross / (1 + Rate / 100), and VAT Amount = Gross - Net.',
    example: {
      title: 'Removing 20% VAT from a £120 invoice',
      scenario: 'You received a total bill of £120 including 20% VAT and need the net business expense.',
      calculation: 'Net = 120 / (1 + 0.20) = £100 | VAT Amount = £120 - £100 = £20',
      result: 'Net: £100.00 | VAT: £20.00 | Gross: £120.00'
    },
    faq: [
      {
        question: 'Why is extracting 20% VAT not the same as taking 20% off the total?',
        answer: 'Because VAT was added onto the original Net price. If Net was $100 and VAT was $20 (total $120), taking 20% off $120 would be $24, which is mathematically incorrect.'
      },
      {
        question: 'Can I use custom VAT rates?',
        answer: 'Yes, you can enter any custom decimal rate such as 5%, 7.7%, 13.5%, or 25%.'
      }
    ],
    seo: {
      title: 'VAT Calculator – Add or Remove VAT Online – THE VECTOR TOOLS',
      metaDescription: 'Calculate Value Added Tax (VAT) instantly. Add VAT to net prices or remove VAT from gross totals with European presets and custom rates.',
      keywords: ['vat calculator', 'add vat', 'remove vat', 'sales tax calculator', 'gross price to net']
    }
  },
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    shortDescription: 'Solve common percentage questions: X% of Y, what % is X of Y, and percentage increases/decreases.',
    longDescription: 'An all-in-one percentage calculation utility. Solve what is X% of Y, find out what percentage one number is of another, and compute percentage increases or discounts in real-time.',
    category: 'calculators',
    categoryLabel: 'Calculators',
    subcategory: 'everyday',
    subcategoryLabel: 'Everyday Math',
    iconName: 'Calculator',
    popular: true,
    badge: 'Popular',
    keywords: ['percentage', 'percent of', 'percent calculator', 'discount', 'ratio', 'fraction to percentage'],
    relatedToolSlugs: ['percentage-change-calculator', 'vat-calculator', 'loan-calculator'],
    howToUse: [
      'Choose the calculation mode (What is X% of Y, X is what % of Y, or Increase/Decrease).',
      'Type your numbers in the two input boxes.',
      'Instantly view the calculated result with the underlying mathematical formula displayed.'
    ],
    howItWorks: 'Percentages represent fractions out of 100. For example, X% of Y equals (X / 100) × Y. When finding what percentage X is of Y, the formula is (X / Y) × 100.',
    example: {
      title: 'Calculating a 15% Tip on a $68 Restaurant Bill',
      scenario: 'You want to calculate a 15% gratuity on a $68 check.',
      calculation: 'Calculation: (15 / 100) × 68 = 0.15 × 68 = $10.20',
      result: 'Tip: $10.20 | Total Bill: $78.20'
    },
    faq: [
      {
        question: 'How do you calculate a percentage of a number?',
        answer: 'Convert the percentage to a decimal by dividing by 100, then multiply by the total number. Example: 25% of 80 is 0.25 × 80 = 20.'
      },
      {
        question: 'Does this calculator handle negative numbers and decimals?',
        answer: 'Yes, full decimal precision and negative values are supported without errors or NaN.'
      }
    ],
    seo: {
      title: 'Percentage Calculator – Quick & Simple Math – THE VECTOR TOOLS',
      metaDescription: 'Free online percentage calculator. Quickly calculate X% of Y, what percent one number is of another, and percentage discounts.',
      keywords: ['percentage calculator', 'calculate percent', 'what is percent of', 'percent math tool']
    }
  },
  {
    id: 'percentage-change-calculator',
    slug: 'percentage-change-calculator',
    name: 'Percentage Change Calculator',
    shortDescription: 'Calculate the percentage increase, decrease, or growth rate between an original and new value.',
    longDescription: 'Determine the exact percentage increase or percentage decrease between any two numbers. Shows absolute difference, change direction, and step-by-step formula explanation.',
    category: 'calculators',
    categoryLabel: 'Calculators',
    subcategory: 'everyday',
    subcategoryLabel: 'Everyday Math',
    iconName: 'TrendingUp',
    popular: true,
    keywords: ['percentage change', 'percent increase', 'percent decrease', 'growth rate', 'variance', 'difference'],
    relatedToolSlugs: ['percentage-calculator', 'vat-calculator', 'compound-interest-calculator'],
    howToUse: [
      'Enter the Original Value (starting value).',
      'Enter the New Value (final value).',
      'Review the percentage change, whether it represents an increase or decrease, and the absolute difference.'
    ],
    howItWorks: 'Percentage change = ((New Value - Original Value) / |Original Value|) × 100%. A positive outcome indicates an increase; a negative outcome indicates a decrease.',
    example: {
      title: 'Revenue growth from $40,000 to $52,000',
      scenario: 'A company increased annual revenue from $40,000 to $52,000.',
      calculation: '((52,000 - 40,000) / 40,000) × 100 = (12,000 / 40,000) × 100 = +30%',
      result: '+30.00% Increase (+$12,000.00 difference)'
    },
    faq: [
      {
        question: 'What happens if the original value is zero?',
        answer: 'Mathematically, percentage change from zero is undefined because division by zero is not possible. The tool cleanly flags this scenario.'
      },
      {
        question: 'What is the difference between percent change and percentage points?',
        answer: 'Percentage change is the relative change. If an interest rate goes from 5% to 6%, the change is 1 percentage point, but a 20% relative increase.'
      }
    ],
    seo: {
      title: 'Percentage Change Calculator – Increase & Decrease – THE VECTOR TOOLS',
      metaDescription: 'Calculate percentage increase or decrease between two values. Free, instant percentage difference calculator with formula steps.',
      keywords: ['percentage change calculator', 'percent increase', 'percent decrease', 'percentage difference']
    }
  },
  {
    id: 'loan-calculator',
    slug: 'loan-calculator',
    name: 'Loan Calculator',
    shortDescription: 'Calculate monthly payments, total interest, and total payoff costs for personal or auto loans.',
    longDescription: 'An interactive loan payment and amortization calculator. Calculate fixed monthly installments, total interest charges, and comprehensive payoff schedules for personal loans, car loans, and student loans.',
    category: 'calculators',
    categoryLabel: 'Calculators',
    subcategory: 'loans',
    subcategoryLabel: 'Loans & Credit',
    iconName: 'Coins',
    popular: true,
    badge: 'Finance',
    keywords: ['loan calculator', 'monthly payment', 'car loan', 'personal loan', 'interest rate', 'amortization', 'total interest'],
    relatedToolSlugs: ['mortgage-calculator', 'compound-interest-calculator', 'salary-calculator'],
    howToUse: [
      'Enter your desired loan principal amount.',
      'Enter the annual interest rate (APR in %).',
      'Select the loan term (in years or months).',
      'Choose payment frequency (Monthly, Bi-weekly, or Weekly) to view your payment schedule.'
    ],
    howItWorks: 'Uses the standard annuity formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1], where P is principal, i is periodic interest rate, and n is the total number of payments.',
    example: {
      title: '$25,000 Auto Loan at 6.5% for 5 Years',
      scenario: 'Borrowing $25,000 for a car at 6.5% interest over 60 monthly payments.',
      calculation: 'Monthly Payment: $489.15 | Total Payments: $29,349.00 | Total Interest: $4,349.00',
      result: 'Monthly: $489.15 | Total Interest: $4,349.00 | Total Cost: $29,349.00'
    },
    faq: [
      {
        question: 'Does this calculator include extra payments or prepayment penalties?',
        answer: 'This provides standard amortization without prepayment penalties. Making extra payments lowers your total interest and shortens loan duration.'
      },
      {
        question: 'What is APR vs interest rate?',
        answer: 'Interest rate is the cost of borrowing principal. APR includes the interest rate plus any mandatory origination fees and lender charges.'
      }
    ],
    seo: {
      title: 'Loan Calculator – Monthly Payment & Amortization – THE VECTOR TOOLS',
      metaDescription: 'Calculate monthly loan payments, total interest paid, and full loan amortization schedules for personal and auto loans.',
      keywords: ['loan calculator', 'monthly payment calculator', 'personal loan calculator', 'amortization calculator']
    }
  },
  {
    id: 'mortgage-calculator',
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    shortDescription: 'Estimate your monthly mortgage payments including principal, interest, taxes, and home insurance.',
    longDescription: 'Plan your home financing with a complete mortgage payment calculator. Estimate monthly principal and interest, down payment impact, property taxes, home insurance, and total interest over 15, 20, or 30-year terms.',
    category: 'calculators',
    categoryLabel: 'Calculators',
    subcategory: 'loans',
    subcategoryLabel: 'Loans & Credit',
    iconName: 'Home',
    popular: true,
    badge: 'Popular',
    keywords: ['mortgage calculator', 'home loan', 'down payment', 'piti', 'interest', 'real estate', 'property tax'],
    relatedToolSlugs: ['loan-calculator', 'compound-interest-calculator', 'salary-calculator'],
    howToUse: [
      'Enter the home purchase price and your down payment (amount or %).',
      'Specify the annual interest rate and mortgage term (e.g. 30, 20, or 15 years).',
      'Optionally include annual property tax and home insurance estimates.',
      'Examine the payment breakdown (Principal & Interest vs Taxes & Insurance).'
    ],
    howItWorks: 'Computes fixed monthly principal and interest through standard amortization, and divides annual property taxes and homeowners insurance into equal monthly escrow allocations.',
    example: {
      title: '$400,000 Home Purchase with 20% Down',
      scenario: 'Home price: $400,000 | Down payment: $80,000 (20%) | Loan: $320,000 at 6.0% for 30 years.',
      calculation: 'Principal & Interest: $1,918.56/mo | Taxes (~1.2%): $400/mo | Insurance: $100/mo',
      result: 'Total Monthly Payment: ~$2,418.56 | Total 30-Year Interest: $370,682'
    },
    faq: [
      {
        question: 'What is PITI in a mortgage?',
        answer: 'PITI stands for Principal, Interest, Taxes, and Insurance. It represents your comprehensive monthly homeownership payment.'
      },
      {
        question: 'How does putting 20% down help?',
        answer: 'Putting 20% down avoids Private Mortgage Insurance (PMI), lowers your borrowed loan amount, and significantly reduces total interest paid.'
      }
    ],
    seo: {
      title: 'Mortgage Calculator – Estimate Monthly Payments – THE VECTOR TOOLS',
      metaDescription: 'Free online mortgage calculator. Calculate monthly payments, interest vs principal breakdown, and loan payoff estimates.',
      keywords: ['mortgage calculator', 'home loan payment', 'mortgage payment estimate', 'interest rate mortgage']
    }
  },
  {
    id: 'compound-interest-calculator',
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    shortDescription: 'Calculate compound interest growth with regular contributions, visual charts, and future balances.',
    longDescription: 'Visualize the power of compound interest on your savings, investments, or retirement portfolio. Model regular monthly or annual contributions across custom compounding frequencies and time horizons.',
    category: 'calculators',
    categoryLabel: 'Calculators',
    subcategory: 'money',
    subcategoryLabel: 'Finance & Tax',
    iconName: 'PiggyBank',
    popular: true,
    badge: 'Investing',
    keywords: ['compound interest', 'investment growth', 'savings calculator', 'future value', 'wealth builder', 'roi'],
    relatedToolSlugs: ['loan-calculator', 'mortgage-calculator', 'salary-calculator'],
    howToUse: [
      'Enter your initial starting balance.',
      'Enter your recurring monthly or annual contribution.',
      'Specify expected annual interest rate (%) and investment duration (years).',
      'Select compounding frequency (Daily, Monthly, Quarterly, or Annually).',
      'Inspect the final balance, total principal contributed, and interest earned.'
    ],
    howItWorks: 'Compound interest generates earnings not just on the principal amount, but also on the accumulated interest from preceding periods: A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)].',
    example: {
      title: '$10,000 invested for 20 years at 8% with $300/mo contribution',
      scenario: 'Starting with $10,000 and depositing $300 monthly at 8% annual return compounded monthly.',
      calculation: 'Total Contributed: $82,000 ($10k + $72k) | Total Interest Earned: $140,893',
      result: 'Future Balance: $222,893 after 20 years'
    },
    faq: [
      {
        question: 'What is the Rule of 72?',
        answer: 'The Rule of 72 is a quick mental estimate for how long an investment takes to double: divide 72 by the annual interest rate (e.g. at 8%, 72/8 ≈ 9 years).'
      },
      {
        question: 'How does compounding frequency impact returns?',
        answer: 'More frequent compounding (such as daily or monthly vs annually) yields slightly higher returns because accrued interest begins earning interest sooner.'
      }
    ],
    seo: {
      title: 'Compound Interest Calculator – Investment & Savings Growth – THE VECTOR TOOLS',
      metaDescription: 'Calculate compound interest with recurring deposits. Discover your future investment value with interest and contribution breakdowns.',
      keywords: ['compound interest calculator', 'investment calculator', 'savings interest', 'wealth growth calculator']
    }
  },

  // ==========================================
  // CONVERTERS
  // ==========================================
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    name: 'Unit Converter',
    shortDescription: 'Convert between metric and imperial units of length, weight, temperature, area, volume, and speed.',
    longDescription: 'A versatile, lightning-fast unit converter. Convert seamlessly across length, weight/mass, temperature, area, volume, speed, digital storage, pressure, and time with high precision.',
    category: 'converters',
    categoryLabel: 'Converters',
    subcategory: 'units',
    subcategoryLabel: 'Units & Measures',
    iconName: 'Ruler',
    popular: true,
    badge: 'Popular',
    keywords: ['unit converter', 'metric to imperial', 'celsius to fahrenheit', 'kg to lbs', 'meters to feet', 'km to miles'],
    relatedToolSlugs: ['currency-converter', 'time-zone-converter', 'percentage-calculator'],
    howToUse: [
      'Select a measurement category (Length, Weight, Temperature, Area, Volume, Speed, etc.).',
      'Enter the source value and choose the origin unit.',
      'Select your target unit to immediately get the converted result with full reciprocal conversion.'
    ],
    howItWorks: 'Standardizes input values to base SI units using international conversion constants, then converts from the base unit to the desired output unit with mathematical precision.',
    example: {
      title: 'Converting 5 miles to kilometers',
      scenario: '1 mile = 1.609344 kilometers.',
      calculation: '5 × 1.609344 = 8.04672 km',
      result: '5 miles = 8.0467 km'
    },
    faq: [
      {
        question: 'How is temperature converted between Celsius and Fahrenheit?',
        answer: 'Formula: °F = (°C × 9/5) + 32, and °C = (°F - 32) × 5/9.'
      },
      {
        question: 'Are digital storage conversions in base 10 or base 2?',
        answer: 'Both decimal (1 KB = 1000 Bytes) and binary (1 KiB = 1024 Bytes) conventions are explicitly clarified.'
      }
    ],
    seo: {
      title: 'Unit Converter – Metric & Imperial Conversion – THE VECTOR TOOLS',
      metaDescription: 'Free online unit converter. Convert length, weight, temperature, volume, area, speed, and data storage instantly.',
      keywords: ['unit converter', 'metric conversion', 'imperial conversion', 'celsius fahrenheit converter']
    }
  },
  {
    id: 'currency-converter',
    slug: 'currency-converter',
    name: 'Currency Converter',
    shortDescription: 'Convert between major world currencies (USD, EUR, GBP, JPY, CAD, AUD, CHF) with reference rates.',
    longDescription: 'Convert money between major global currencies. Clearly states reference exchange rate timestamps and enables instant currency swapping and quick benchmark amount comparisons.',
    category: 'converters',
    categoryLabel: 'Converters',
    subcategory: 'currencies',
    subcategoryLabel: 'Currencies',
    iconName: 'ArrowLeftRight',
    popular: true,
    badge: 'Updated',
    keywords: ['currency converter', 'exchange rates', 'usd to eur', 'gbp to usd', 'forex', 'money converter'],
    relatedToolSlugs: ['unit-converter', 'vat-calculator', 'salary-calculator'],
    howToUse: [
      'Enter the amount of money to convert.',
      'Select your origin currency (From).',
      'Select your destination currency (To).',
      'View the converted amount and the benchmark rate.'
    ],
    howItWorks: 'Converts through international reference baseline pairs with explicit source attribution and timestamping. Users can also enter custom manual exchange rates if desired.',
    example: {
      title: 'Converting $500 USD to Euros (EUR)',
      scenario: 'Assuming an exchange rate of 1 USD = 0.925 EUR.',
      calculation: '500 × 0.925 = 462.50 EUR',
      result: '$500.00 USD = €462.50 EUR'
    },
    faq: [
      {
        question: 'Where do the exchange rates come from?',
        answer: 'Rates are anchored to published European Central Bank (ECB) and international institutional reference benchmarks.'
      },
      {
        question: 'Do commercial banks charge fees on top of this rate?',
        answer: 'Yes. Retail banks and credit cards typically add a 1% to 3.5% foreign transaction fee or exchange rate markup.'
      }
    ],
    seo: {
      title: 'Currency Converter – Global Exchange Rates – THE VECTOR TOOLS',
      metaDescription: 'Convert world currencies instantly with reference exchange rates. USD, EUR, GBP, JPY, AUD, CAD, and more.',
      keywords: ['currency converter', 'exchange rate calculator', 'forex converter', 'usd to eur']
    },
    sources: [
      { name: 'European Central Bank (ECB) Reference Rates', url: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates' }
    ]
  },
  {
    id: 'time-zone-converter',
    slug: 'time-zone-converter',
    name: 'Time Zone Converter',
    shortDescription: 'Convert dates and times across IANA world time zones with daylight saving time awareness.',
    longDescription: 'Convert meeting times and schedules across major global cities and standard IANA time zones. Automatically accounts for Daylight Saving Time (DST) shifts.',
    category: 'converters',
    categoryLabel: 'Converters',
    subcategory: 'time',
    subcategoryLabel: 'Time & Clocks',
    iconName: 'Clock',
    popular: true,
    keywords: ['time zone converter', 'dst', 'gmt', 'utc', 'est to cet', 'london time', 'new york time', 'tokyo time'],
    relatedToolSlugs: ['age-calculator', 'unit-converter'],
    howToUse: [
      'Pick a date and time.',
      'Choose the origin time zone (e.g. New York, London, Tokyo, Sydney).',
      'Choose the target time zone to instantly see the converted local time, date, and hour difference.'
    ],
    howItWorks: 'Uses the browser\'s native internationalization engine (Intl.DateTimeFormat) with full IANA time zone database support, ensuring precise daylight saving transitions.',
    example: {
      title: 'Scheduling a call from London (GMT/BST) to San Francisco (PST/PDT)',
      scenario: '3:00 PM in London converted to Pacific Time.',
      calculation: 'London is 8 hours ahead of San Francisco.',
      result: '3:00 PM London = 7:00 AM San Francisco (same day)'
    },
    faq: [
      {
        question: 'Does this tool automatically factor in Daylight Saving Time (DST)?',
        answer: 'Yes! Because it utilizes actual IANA time zone rules for the selected date, seasonal clock shifts are automatically handled.'
      },
      {
        question: 'What is UTC?',
        answer: 'Coordinated Universal Time (UTC) is the global primary time standard by which the world regulates clocks and time.'
      }
    ],
    seo: {
      title: 'Time Zone Converter – World Meeting Planner – THE VECTOR TOOLS',
      metaDescription: 'Convert time between world cities and IANA time zones with automatic Daylight Saving Time calculations.',
      keywords: ['time zone converter', 'world clock converter', 'meeting time planner', 'dst time converter']
    }
  },
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    name: 'Age Calculator',
    shortDescription: 'Calculate exact age in years, months, days, total weeks, hours, and next birthday countdown.',
    longDescription: 'Discover your exact chronological age or the elapsed duration between any two calendar dates. Calculates precise age in years, months, days, total weeks, and days, along with a countdown to your next birthday.',
    category: 'converters',
    categoryLabel: 'Converters',
    subcategory: 'date-age',
    subcategoryLabel: 'Date & Age',
    iconName: 'Calendar',
    popular: true,
    keywords: ['age calculator', 'how old am i', 'chronological age', 'birthday countdown', 'days lived', 'date difference'],
    relatedToolSlugs: ['time-zone-converter', 'percentage-calculator'],
    howToUse: [
      'Select your Date of Birth.',
      'Select the "Age as of" date (defaults to today).',
      'View your exact chronological age in years, months, days, and total statistics.'
    ],
    howItWorks: 'Calculates the calendar difference between two dates accounting for leap years, varying month lengths (28, 29, 30, or 31 days), and precise day boundaries.',
    example: {
      title: 'Born on March 15, 1995 evaluated today',
      scenario: 'Determining exact age, total days lived, and countdown to next birthday.',
      calculation: 'Difference between March 15, 1995 and today\'s date.',
      result: '31 Years, X Months, Y Days | ~11,500+ Days lived'
    },
    faq: [
      {
        question: 'How are leap years handled?',
        answer: 'Leap years (years divisible by 4, except centuries not divisible by 400) are accurately calculated with 366 days.'
      },
      {
        question: 'Can I calculate the age of someone on a past or future date?',
        answer: 'Yes! The "Age as of" field allows you to determine age at any milestone or historic moment.'
      }
    ],
    seo: {
      title: 'Age Calculator – Exact Age in Years, Months & Days – THE VECTOR TOOLS',
      metaDescription: 'Calculate your exact age in years, months, days, hours, and minutes. Includes total days lived and birthday countdown.',
      keywords: ['age calculator', 'date of birth calculator', 'chronological age', 'how many days old am i']
    }
  },

  // ==========================================
  // TEXT & FILE TOOLS
  // ==========================================
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word Counter',
    shortDescription: 'Count words, characters, sentences, paragraphs, and estimated reading time live in your browser.',
    longDescription: 'A real-time, privacy-first text analysis editor. Count words, characters with and without whitespace, sentences, paragraphs, reading time, and speaking time completely client-side.',
    category: 'text-file',
    categoryLabel: 'Text & File Tools',
    subcategory: 'text-tools',
    subcategoryLabel: 'Text Tools',
    iconName: 'FileText',
    popular: true,
    badge: 'Popular',
    keywords: ['word counter', 'character count', 'reading time', 'text statistics', 'essay words', 'paragraph counter'],
    relatedToolSlugs: ['character-counter', 'pdf-to-jpg', 'jpg-to-pdf'],
    howToUse: [
      'Type or paste your text directly into the main editor.',
      'Watch words, characters, sentences, and reading time update instantaneously.',
      'Use the Copy or Clear buttons to manage your text content.'
    ],
    howItWorks: 'Text is parsed using Unicode-compliant regex word boundary tokenizers directly in your browser. No text is ever transmitted over the network.',
    example: {
      title: 'Analyzing a 500-word blog post',
      scenario: 'You paste a draft article into the editor.',
      calculation: 'Words: 524 | Characters: 3,110 | Sentences: 28 | Reading time: ~2.6 min',
      result: 'Instant metrics display with keyword density analysis'
    },
    faq: [
      {
        question: 'Is my text stored or sent to a server?',
        answer: 'Never. All counting and analysis happens exclusively in your local browser memory.'
      },
      {
        question: 'How is reading time estimated?',
        answer: 'We use the standard benchmark of 200 words per minute for average silent reading speed.'
      }
    ],
    seo: {
      title: 'Word Counter – Live Words, Characters & Reading Time – THE VECTOR TOOLS',
      metaDescription: 'Free online word counter and text statistics tool. Count words, characters, sentences, paragraphs, and reading time in real-time.',
      keywords: ['word counter', 'character counter', 'reading time calculator', 'text word count']
    }
  },
  {
    id: 'character-counter',
    slug: 'character-counter',
    name: 'Character Counter',
    shortDescription: 'Count characters, spaces, and lines with social media limit indicators (Twitter/X, Instagram, LinkedIn).',
    longDescription: 'Accurately count characters with and without spaces. Features real-time limit meters for social media platforms including X (Twitter 280), Instagram captions (2,200), and LinkedIn posts (3,000).',
    category: 'text-file',
    categoryLabel: 'Text & File Tools',
    subcategory: 'text-tools',
    subcategoryLabel: 'Text Tools',
    iconName: 'Type',
    popular: true,
    keywords: ['character counter', 'letter count', 'twitter character limit', 'x limit', 'spaces counter', 'social media length'],
    relatedToolSlugs: ['word-counter', 'pdf-to-jpg'],
    howToUse: [
      'Paste or type text into the input field.',
      'Check character count including spaces and excluding spaces.',
      'Review social media meters to verify if your post fits platform length constraints.'
    ],
    howItWorks: 'Evaluates string length and UTF-16 code units in real-time, accounting for newlines, tabs, and spacing variations.',
    example: {
      title: 'Drafting an X (Twitter) Post',
      scenario: 'Ensuring your announcement fits within the standard 280 character limit.',
      calculation: '215 characters used / 280 max (65 remaining).',
      result: 'Valid post length with visual progress ring'
    },
    faq: [
      {
        question: 'Why do character counters differ with emojis?',
        answer: 'Some complex emojis consist of multiple Unicode code points. Our tool accurately tracks standard string lengths.'
      },
      {
        question: 'Can I transform text to uppercase or lowercase?',
        answer: 'Yes! Quick buttons allow instant UPPERCASE, lowercase, and Title Case transformations.'
      }
    ],
    seo: {
      title: 'Character Counter – Social Media Post Limits – THE VECTOR TOOLS',
      metaDescription: 'Free character counter with space exclusions, line counts, and limits for Twitter/X, Instagram, and LinkedIn.',
      keywords: ['character counter', 'twitter character limit', 'letter counter', 'social media counter']
    }
  },
  {
    id: 'pdf-to-jpg',
    slug: 'pdf-to-jpg',
    name: 'PDF → JPG Converter',
    shortDescription: 'Convert PDF documents into high-resolution JPG images client-side in your browser.',
    longDescription: 'Convert each page of your PDF file into crisp JPG images locally in your browser. No file uploads, no server storage, and complete document confidentiality.',
    category: 'text-file',
    categoryLabel: 'Text & File Tools',
    subcategory: 'file-tools',
    subcategoryLabel: 'File & PDF Tools',
    iconName: 'FileImage',
    popular: true,
    badge: 'Privacy-First',
    keywords: ['pdf to jpg', 'convert pdf to image', 'pdf to picture', 'pdf page extractor', 'offline pdf', 'private pdf'],
    relatedToolSlugs: ['jpg-to-pdf', 'word-counter'],
    howToUse: [
      'Select or drag & drop a PDF document from your device.',
      'Preview individual rendered pages in real-time.',
      'Download individual page JPGs or all pages as an image package.'
    ],
    howItWorks: 'Renders PDF pages directly onto HTML5 canvas elements locally in client memory using WebAssembly / PDF rendering engines, then exports them as high-quality JPEG blobs.',
    example: {
      title: 'Converting a 3-page invoice into images',
      scenario: 'You need to send an image preview of a PDF contract.',
      calculation: 'The PDF is processed in your browser memory without uploading.',
      result: '3 separate high-resolution JPG images ready for download'
    },
    faq: [
      {
        question: 'Are my PDF files uploaded to any server?',
        answer: 'No. All rendering and conversion takes place entirely within your browser on your own device. Your files never leave your computer.'
      },
      {
        question: 'What is the maximum file size supported?',
        answer: 'Since conversion runs in local browser memory, files up to 50MB and up to 50 pages work smoothly on modern devices.'
      }
    ],
    seo: {
      title: 'PDF to JPG Converter – 100% Client-Side & Private – THE VECTOR TOOLS',
      metaDescription: 'Convert PDF pages into high-quality JPG images directly in your browser. Free, fast, and completely private.',
      keywords: ['pdf to jpg', 'convert pdf to jpg', 'pdf to image converter', 'free pdf converter']
    }
  },
  {
    id: 'jpg-to-pdf',
    slug: 'jpg-to-pdf',
    name: 'JPG → PDF Converter',
    shortDescription: 'Combine multiple JPG, PNG, and WebP images into a single clean PDF document.',
    longDescription: 'Convert and merge your images into a single organized PDF file. Reorder images, customize page margins and orientations, and export directly in your browser.',
    category: 'text-file',
    categoryLabel: 'Text & File Tools',
    subcategory: 'file-tools',
    subcategoryLabel: 'File & PDF Tools',
    iconName: 'FileCheck',
    popular: true,
    badge: 'Privacy-First',
    keywords: ['jpg to pdf', 'image to pdf', 'combine images to pdf', 'png to pdf', 'merge photos into pdf'],
    relatedToolSlugs: ['pdf-to-jpg', 'word-counter'],
    howToUse: [
      'Upload one or more JPG, PNG, or WebP images.',
      'Reorder images using up/down controls or remove unwanted pages.',
      'Choose page orientation (Auto, Portrait, Landscape) and margin styling.',
      'Click "Convert to PDF" to generate and download your PDF document instantly.'
    ],
    howItWorks: 'Uses client-side PDF document generation (jsPDF) to embed image streams into standard PDF page objects without sending any data over the internet.',
    example: {
      title: 'Combining 4 scanned receipts into a single PDF',
      scenario: 'You took 4 photos of receipts and need a single PDF for expense reporting.',
      calculation: 'Images are packed into consecutive A4 PDF pages with uniform margins.',
      result: 'One organized PDF file ready for submission'
    },
    faq: [
      {
        question: 'Can I upload PNG and WebP files too?',
        answer: 'Yes! The converter supports JPG, JPEG, PNG, and modern WebP image formats.'
      },
      {
        question: 'Is there a limit on how many images I can merge?',
        answer: 'You can easily merge 20+ images in a single session without quality degradation.'
      }
    ],
    seo: {
      title: 'JPG to PDF Converter – Merge Images into PDF – THE VECTOR TOOLS',
      metaDescription: 'Convert and combine JPG, PNG, and WebP images into a single PDF document. Free, client-side, and secure.',
      keywords: ['jpg to pdf', 'images to pdf', 'convert photos to pdf', 'combine jpg to pdf']
    }
  },
  {
    id: 'image-format-converter',
    slug: 'image-format-converter',
    name: 'Image Format Converter',
    shortDescription: 'Convert PNG, JPG, WebP, AVIF, and BMP images locally with transparency control and batch ZIP download.',
    longDescription: 'A unified, privacy-first image conversion tool. Convert single or multiple images between PNG, JPG, JPEG, WebP, AVIF, and BMP formats directly in your browser. Features quality compression sliders, transparency background controls, and instant batch ZIP archiving.',
    category: 'text-file',
    categoryLabel: 'Text & File Tools',
    subcategory: 'file-tools',
    subcategoryLabel: 'File & PDF Tools',
    iconName: 'Image',
    popular: true,
    badge: 'New',
    keywords: ['image format converter', 'png to jpg', 'jpg to png', 'webp to png', 'convert png to webp', 'avif converter', 'bmp converter', 'batch image converter', 'image compressor'],
    relatedToolSlugs: ['jpg-to-pdf', 'pdf-to-jpg'],
    howToUse: [
      'Select or drag & drop one or multiple images (PNG, JPG, WebP, BMP, GIF, AVIF).',
      'Select your desired output format (WebP, JPG, PNG, AVIF, or BMP).',
      'Adjust quality compression level and background color for transparent images if needed.',
      'Click "Convert All" and download individual converted images or download the entire batch as a ZIP archive.'
    ],
    howItWorks: 'Processes each image directly on HTML5 Canvas elements in your browser memory. Draws vector-sharp pixels with alpha channel handling, then exports standard image blobs with zero network transmission.',
    example: {
      title: 'Batch converting 12 transparent PNG logos to WebP',
      scenario: 'You want to optimize 12 website logos to reduce page weight without losing transparent backgrounds.',
      calculation: '12 PNG files (total 18.4 MB) converted to WebP at 90% quality.',
      result: '12 WebP files (total 2.6 MB) with 85.8% bandwidth savings, downloaded as a single ZIP archive'
    },
    faq: [
      {
        question: 'Are my photos or graphic designs uploaded to any server?',
        answer: 'No. All image format transformations happen 100% locally inside your browser memory using HTML5 Canvas. Your files never leave your computer.'
      },
      {
        question: 'What happens to transparency when converting PNG to JPG?',
        answer: 'Since JPG does not support transparent alpha channels, our converter allows you to pick a background fill color (white by default) to eliminate unsightly dark or black borders.'
      },
      {
        question: 'Can I convert multiple images at once?',
        answer: 'Yes! You can drop multiple images simultaneously, batch-convert them with one click, and download them all together in a single ZIP file.'
      }
    ],
    seo: {
      title: 'Image Format Converter – PNG, JPG, WebP, AVIF, BMP – THE VECTOR TOOLS',
      metaDescription: 'Free online image format converter. Convert PNG to JPG, WebP to PNG, JPG to WebP, AVIF, and BMP in your browser. Batch processing and ZIP download.',
      keywords: ['image format converter', 'png to jpg', 'webp converter', 'jpg to webp', 'convert images online']
    }
  },

  // ==========================================
  // BUSINESS TOOLS
  // ==========================================

  // 1. Documents & Data to Excel
  {
    id: 'invoice-to-excel',
    slug: 'invoice-to-excel',
    name: 'Invoice / Receipt → Excel',
    shortDescription: 'Convert invoices and receipts into structured Excel spreadsheets with line items and totals.',
    longDescription: 'Extract and structure invoice data—including supplier names, invoice numbers, tax breakdowns, and itemized line items—into clean, analysis-ready Microsoft Excel (XLSX) workbooks.',
    category: 'business',
    categoryLabel: 'Business Tools',
    subcategory: 'documents-data',
    subcategoryLabel: 'Documents & Data to Excel',
    iconName: 'FileSpreadsheet',
    popular: true,
    badge: 'Business',
    keywords: ['invoice to excel', 'receipt to excel', 'invoice converter', 'ocr invoice excel', 'receipt scanner spreadsheet'],
    relatedToolSlugs: ['receipt-to-expense', 'pdf-table-to-excel', 'invoice-generator'],
    howToUse: [
      'Upload an invoice or receipt in PDF, JPG, PNG, or WEBP format.',
      'Review document in browser memory and verify line items, taxes, and supplier details.',
      'Add or modify line items, quantities, and rates as needed.',
      'Click "Export to Excel (XLSX)" to generate your structured workbook.'
    ],
    howItWorks: 'Staged securely in local browser memory with architecture for OCR and machine learning document extraction. Outputs clean, formula-ready XLSX files with standard accounting headers.',
    example: {
      title: 'Converting a supplier hardware invoice',
      scenario: 'You have a PDF invoice with 4 line items and sales tax.',
      calculation: 'Invoice line items are parsed into tabular rows with quantity, price, and line totals.',
      result: 'Downloadable .xlsx spreadsheet with separate header and itemized columns'
    },
    faq: [
      {
        question: 'Are my confidential invoices stored on remote servers?',
        answer: 'No. File processing and staging occur in local browser memory. No documents are stored without explicit configuration.'
      },
      {
        question: 'Should I review extracted figures before accounting import?',
        answer: 'Yes. Always review numeric values and tax amounts before importing extracted spreadsheets into accounting systems.'
      }
    ],
    seo: {
      title: 'Invoice / Receipt to Excel Converter – THE VECTOR TOOLS',
      metaDescription: 'Convert invoices and receipts into structured Excel spreadsheets with line items, tax details, and totals.',
      keywords: ['invoice to excel', 'receipt to excel', 'invoice spreadsheet converter', 'extract invoice to xlsx']
    }
  },
  {
    id: 'pdf-table-to-excel',
    slug: 'pdf-table-to-excel',
    name: 'PDF Table → Excel',
    shortDescription: 'Extract tabular records from multi-page PDF documents into editable Excel spreadsheets.',
    longDescription: 'Transform tables locked inside PDF documents into clean, editable Microsoft Excel (XLSX) spreadsheets with custom column mapping and multi-table support.',
    category: 'business',
    categoryLabel: 'Business Tools',
    subcategory: 'documents-data',
    subcategoryLabel: 'Documents & Data to Excel',
    iconName: 'Table',
    popular: true,
    badge: 'Business',
    keywords: ['pdf table to excel', 'extract table from pdf', 'pdf to xlsx table', 'convert pdf table to spreadsheet'],
    relatedToolSlugs: ['invoice-to-excel', 'bank-statement-to-excel', 'csv-to-business-excel'],
    howToUse: [
      'Upload any PDF containing financial, statistical, or inventory tables.',
      'Inspect the detected table layout in browser memory.',
      'Add or edit rows, adjust column header names, and configure multi-table tabs.',
      'Download your formatted Excel (.xlsx) file.'
    ],
    howItWorks: 'Parses document coordinates and renders tabular arrays directly in browser memory, allowing immediate column-level modifications before XLSX compilation.',
    example: {
      title: 'Extracting product price schedule from a PDF catalog',
      scenario: 'You need to update inventory from a vendor price list PDF.',
      calculation: 'Columns for Item Code, Description, Quantity, and Price are mapped to spreadsheet cells.',
      result: 'Clean XLSX workbook preserving original column alignment'
    },
    faq: [
      {
        question: 'Can I add or remove columns before downloading?',
        answer: 'Yes! The interactive table editor allows you to add columns, edit headers, and delete unnecessary rows before generating the Excel file.'
      },
      {
        question: 'Does this handle scanned PDFs?',
        answer: 'Automated extraction from scanned image PDFs is architected to interface with cloud OCR/vision endpoints. You can also manually review and append tabular data.'
      }
    ],
    seo: {
      title: 'PDF Table to Excel Converter – Extract Tables to XLSX – THE VECTOR TOOLS',
      metaDescription: 'Extract tabular data from PDF files into editable Excel workbooks with multi-table support and custom column mapping.',
      keywords: ['pdf table to excel', 'extract tables from pdf', 'pdf to spreadsheet', 'convert pdf table']
    }
  },
  {
    id: 'bank-statement-to-excel',
    slug: 'bank-statement-to-excel',
    name: 'Bank Statement → Excel',
    shortDescription: 'Convert bank statements into standardized debit, credit, and balance Excel spreadsheets.',
    longDescription: 'Convert checking, savings, and corporate credit card bank statements into standardized Excel workbooks with separated Debit, Credit, and Balance columns.',
    category: 'business',
    categoryLabel: 'Business Tools',
    subcategory: 'documents-data',
    subcategoryLabel: 'Documents & Data to Excel',
    iconName: 'Building2',
    popular: true,
    badge: 'Finance',
    keywords: ['bank statement to excel', 'convert bank statement to spreadsheet', 'bank statement pdf to xlsx', 'statement transaction extractor'],
    relatedToolSlugs: ['receipt-to-expense', 'invoice-to-excel', 'excel-csv-cleaner'],
    howToUse: [
      'Upload a bank statement in PDF or CSV format.',
      'Select your transaction currency.',
      'Review and verify transaction descriptions, dates, debits, and credits in the ledger editor.',
      'Export the standardized transaction sheet to XLSX.'
    ],
    howItWorks: 'Formats bank statement data into standard financial transaction schemas with separate credit/debit totals and running balance verification in client memory.',
    example: {
      title: 'Reconciling monthly business checking statement',
      scenario: 'Preparing monthly bank transactions for accountant reconciliation.',
      calculation: 'Separates inflows (+) and outflows (-) into respective debit/credit columns with net period delta.',
      result: 'Reconciled Excel spreadsheet ready for QuickBooks, Xero, or manual audit'
    },
    faq: [
      {
        question: 'Is my financial data uploaded or saved?',
        answer: 'No. Staging and tabular conversion occur strictly within your browser session.'
      },
      {
        question: 'Does this work with all banks globally?',
        answer: 'Because statement layouts vary between institutions, the tool provides a standardized ledger editor so you can review and adjust any transaction entries.'
      }
    ],
    seo: {
      title: 'Bank Statement to Excel Converter – Standardized Ledger – THE VECTOR TOOLS',
      metaDescription: 'Convert PDF bank statements into clean Excel spreadsheets with separate debit, credit, reference, and balance columns.',
      keywords: ['bank statement to excel', 'convert bank statement to xlsx', 'bank statement reconciliation', 'statement to spreadsheet']
    }
  },
  {
    id: 'receipt-to-expense',
    slug: 'receipt-to-expense',
    name: 'Receipt → Expense Spreadsheet',
    shortDescription: 'Turn business receipts into categorized expense logs ready for accounting and tax filing.',
    longDescription: 'Organize purchase receipts, travel expenses, and office supplies into categorized expense spreadsheets with reclaimable tax totals and payment method tracking.',
    category: 'business',
    categoryLabel: 'Business Tools',
    subcategory: 'documents-data',
    subcategoryLabel: 'Documents & Data to Excel',
    iconName: 'Receipt',
    popular: true,
    badge: 'Accounting',
    keywords: ['receipt to expense spreadsheet', 'expense tracker excel', 'receipt to excel expense', 'tax expense spreadsheet'],
    relatedToolSlugs: ['invoice-to-excel', 'bank-statement-to-excel', 'receipt-generator'],
    howToUse: [
      'Upload a receipt photo, scan, or PDF.',
      'Assign expense categories (Meals, Travel, Software, Office Supplies, etc.).',
      'Track reclaimable tax and select the payment method used.',
      'Download your consolidated expense workbook in XLSX format.'
    ],
    howItWorks: 'Structures receipt data into categorized expense rows with automatic subtotal, sales tax, and reimbursement sum calculations.',
    example: {
      title: 'Logging conference travel expenses',
      scenario: 'Converting hotel, flight, and client dinner receipts into an expense claim.',
      calculation: 'Computes total reimbursable expenses and breaks out deductible VAT/tax.',
      result: 'Clean expense report spreadsheet ready for company reimbursement'
    },
    faq: [
      {
        question: 'Can I add multiple receipts to one spreadsheet?',
        answer: 'Yes! You can add as many expense items as needed to compile a full weekly or monthly expense report.'
      },
      {
        question: 'What expense categories are available?',
        answer: 'Standard accounting categories including Meals & Entertainment, Travel, Software, Office Supplies, Utilities, and Professional Services.'
      }
    ],
    seo: {
      title: 'Receipt to Expense Spreadsheet – Business Expense Report – THE VECTOR TOOLS',
      metaDescription: 'Turn receipts into organized, categorized expense spreadsheets with sales tax tracking and XLSX download.',
      keywords: ['receipt to expense spreadsheet', 'expense report generator excel', 'business expense tracker', 'receipt to xlsx']
    }
  },
  {
    id: 'purchase-order-to-excel',
    slug: 'purchase-order-to-excel',
    name: 'Purchase Order → Excel',
    shortDescription: 'Convert vendor purchase orders into structured procurement spreadsheets with SKU line items.',
    longDescription: 'Extract and standardize purchase order details—including PO numbers, supplier information, delivery dates, SKUs, and unit pricing—into structured Excel workbooks.',
    category: 'business',
    categoryLabel: 'Business Tools',
    subcategory: 'documents-data',
    subcategoryLabel: 'Documents & Data to Excel',
    iconName: 'Boxes',
    popular: false,
    badge: 'Procurement',
    keywords: ['purchase order to excel', 'po to spreadsheet', 'convert purchase order to xlsx', 'procurement excel converter'],
    relatedToolSlugs: ['invoice-to-excel', 'sku-generator', 'pdf-table-to-excel'],
    howToUse: [
      'Upload a Purchase Order in PDF or image format.',
      'Review PO number, delivery commitments, and vendor details.',
      'Edit item descriptions, SKUs, quantities, and pricing in the procurement table.',
      'Export the structured PO spreadsheet to XLSX.'
    ],
    howItWorks: 'Standardizes procurement order lines into structured ERP-compatible rows with unit pricing and tax calculations.',
    example: {
      title: 'Importing a vendor PO for industrial supplies',
      scenario: 'Transferring a supplier PO into warehouse inventory management.',
      calculation: 'Multiplies item quantities by unit rates to verify purchase commitments.',
      result: 'Formatted Excel procurement sheet with itemized totals'
    },
    faq: [
      {
        question: 'Does this support tracking multiple line item SKUs?',
        answer: 'Yes, you can track individual product SKUs, delivery milestones, and tax amounts per item.'
      },
      {
        question: 'Are procurement files kept confidential?',
        answer: 'Yes, all processing and staging happen locally within client memory.'
      }
    ],
    seo: {
      title: 'Purchase Order to Excel Converter – Procurement Spreadsheet – THE VECTOR TOOLS',
      metaDescription: 'Convert vendor purchase orders into structured Excel spreadsheets with SKU line items and pricing calculations.',
      keywords: ['purchase order to excel', 'po to xlsx', 'procurement spreadsheet converter', 'order to excel']
    }
  },

  // 2. Spreadsheet & Data Cleanup
  {
    id: 'excel-csv-cleaner',
    slug: 'excel-csv-cleaner',
    name: 'Excel / CSV Cleaner',
    shortDescription: 'Remove duplicate rows, eliminate blanks, trim whitespace, and audit data quality 100% in-browser.',
    longDescription: 'A fully functional browser-based dataset cleanup utility. Remove duplicate rows, strip blank rows, trim leading/trailing whitespace, standardize column names to snake_case, normalize text casing, and inspect a full data quality audit report.',
    category: 'business',
    categoryLabel: 'Business Tools',
    subcategory: 'spreadsheet-tools',
    subcategoryLabel: 'Spreadsheet & Data Cleanup',
    iconName: 'Sparkles',
    popular: true,
    badge: 'Powerful',
    keywords: ['excel csv cleaner', 'clean csv online', 'remove duplicate rows csv', 'trim whitespace spreadsheet', 'data quality audit'],
    relatedToolSlugs: ['csv-to-business-excel', 'pdf-table-to-excel', 'word-counter'],
    howToUse: [
      'Upload any CSV, XLSX, or XLS dataset.',
      'Review the automated Data Quality Audit Report (duplicates, empty rows, missing values).',
      'Select cleaning operations: remove duplicates, strip empty rows, trim whitespace, normalize casing.',
      'Click "Apply Cleaning" to preview changes, then download cleaned CSV or XLSX.'
    ],
    howItWorks: 'Processes the raw spreadsheet using binary SheetJS parsing entirely in client-side Web Workers/browser memory. Changes are auditable, non-destructive, and reversible with instant reset.',
    example: {
      title: 'Cleaning a customer mailing list export',
      scenario: 'A 5,000-row CRM export with 140 duplicates and trailing spaces.',
      calculation: 'Deduplicates identical records, trims spaces, and standardizes column headers.',
      result: 'Clean, formatted CSV ready for marketing automation import'
    },
    faq: [
      {
        question: 'Is any of my customer data sent to a cloud server?',
        answer: 'Never. The entire parsing, deduplication, and cleaning process runs strictly inside your local browser memory.'
      },
      {
        question: 'Can I undo changes if I made a mistake?',
        answer: 'Yes! You can click "Reset to Original" at any time to restore the original uploaded dataset.'
      }
    ],
    seo: {
      title: 'Excel / CSV Cleaner – Deduplicate, Trim & Audit Data – THE VECTOR TOOLS',
      metaDescription: 'Free in-browser CSV and Excel cleaner. Remove duplicate rows, strip empty rows, trim spaces, and audit data quality.',
      keywords: ['csv cleaner', 'excel cleaner', 'remove duplicates csv', 'clean spreadsheet online']
    }
  },
  {
    id: 'csv-to-business-excel',
    slug: 'csv-to-business-excel',
    name: 'CSV → Business Excel Formatter',
    shortDescription: 'Format raw CSV files into multi-sheet Excel workbooks with data quality and summary statistics.',
    longDescription: 'Transform unstyled CSV files into polished, multi-sheet Microsoft Excel workbooks featuring Sheet 1 (Clean Data), Sheet 2 (Mathematical Summary & Totals), and Sheet 3 (Data Quality Completeness Audit).',
    category: 'business',
    categoryLabel: 'Business Tools',
    subcategory: 'spreadsheet-tools',
    subcategoryLabel: 'Spreadsheet & Data Cleanup',
    iconName: 'FileSpreadsheet',
    popular: false,
    badge: 'Utility',
    keywords: ['csv to business excel', 'csv to xlsx converter', 'multi-sheet excel generator', 'format csv into excel'],
    relatedToolSlugs: ['excel-csv-cleaner', 'pdf-table-to-excel', 'invoice-to-excel'],
    howToUse: [
      'Upload a standard CSV file.',
      'Select which columns to include in the export and classify their format (Text, Number, Currency, Percentage, Date).',
      'Click "Download 3-Sheet Excel Workbook".',
      'Open the workbook to view structured data, automated statistical aggregates, and completeness metrics.'
    ],
    howItWorks: 'Analyzes CSV records, applies column typing, and generates a structured 3-tab XLSX workbook with computed statistics derived strictly from uploaded records.',
    example: {
      title: 'Transforming a sales transaction export into an executive workbook',
      scenario: 'You have a raw sales.csv and need an organized spreadsheet for leadership.',
      calculation: 'Generates Clean Data, Summary (Total revenue, Average sale, Min/Max), and Data Quality tabs.',
      result: 'Multi-sheet .xlsx workbook ready for executive presentation'
    },
    faq: [
      {
        question: 'Are fake summary numbers invented?',
        answer: 'No. All summary statistics (sum, average, minimum, maximum) are calculated strictly from your actual numeric columns.'
      },
      {
        question: 'What is included in the Data Quality sheet?',
        answer: 'The Data Quality sheet reports populated rows, missing values, format types, and overall completeness percentages per column.'
      }
    ],
    seo: {
      title: 'CSV to Business Excel Formatter – Multi-Sheet Workbook – THE VECTOR TOOLS',
      metaDescription: 'Convert raw CSV data into a polished 3-sheet Excel workbook with clean data, statistical summaries, and quality metrics.',
      keywords: ['csv to excel', 'csv to business excel', 'multi sheet xlsx generator', 'format csv to excel']
    }
  },

  // 3. Business Document Generators
  {
    id: 'invoice-generator',
    slug: 'invoice-generator',
    name: 'Invoice Generator',
    shortDescription: 'Create professional business invoices with customizable line items, tax, discounts, and instant PDF print.',
    longDescription: 'A comprehensive, professional invoice builder. Add your company branding, tax registration, client billing details, line items with tax percentages, discounts, and payment instructions. Print or save directly to PDF, or export to Excel.',
    category: 'business',
    categoryLabel: 'Business Tools',
    subcategory: 'business-documents',
    subcategoryLabel: 'Business Document Generators',
    iconName: 'DollarSign',
    popular: true,
    badge: 'Popular',
    keywords: ['invoice generator', 'free invoice maker', 'create invoice pdf', 'printable invoice', 'online invoice generator'],
    relatedToolSlugs: ['quote-generator', 'receipt-generator', 'invoice-to-excel'],
    howToUse: [
      'Fill in your business details (name, email, address, tax/VAT number).',
      'Add client billing information and invoice terms.',
      'Add line items with descriptions, quantities, unit prices, and tax rates.',
      'Click "Print / Save as PDF" for an instant print-ready invoice, or "Export XLSX" for spreadsheets.'
    ],
    howItWorks: 'Computes mathematical subtotal, tax totals, discounts, and net balances live in React state. Renders an elegant corporate document styled for standard paper printing.',
    example: {
      title: 'Billing a consulting client for 40 hours of development',
      scenario: 'Creating an itemized invoice for technical services rendered.',
      calculation: '40 hrs × $85/hr = $3,400 subtotal + 10% tax ($340) = $3,740 total due.',
      result: 'High-contrast, professional PDF invoice with banking remittance details'
    },
    faq: [
      {
        question: 'Can I choose different world currencies?',
        answer: 'Yes! Supports USD ($), EUR (€), GBP (£), PKR (₨), INR (₹), CAD, AUD, JPY, and Middle Eastern currencies.'
      },
      {
        question: 'Are my business clients and rates stored anywhere?',
        answer: 'No. All invoice generation is client-side. Nothing is stored on remote servers, protecting your commercial privacy.'
      }
    ],
    seo: {
      title: 'Free Invoice Generator – Create & Download PDF Invoices – THE VECTOR TOOLS',
      metaDescription: 'Create professional, print-ready business invoices for free. Add line items, taxes, discounts, and download PDF or Excel.',
      keywords: ['invoice generator', 'free invoice maker', 'online invoice builder', 'print invoice pdf']
    }
  },
  {
    id: 'quote-generator',
    slug: 'quote-generator',
    name: 'Quote / Estimate Generator',
    shortDescription: 'Generate formal pricing proposals and project cost estimates with client acceptance signatures.',
    longDescription: 'Create formal project quotes and cost estimates. Specify project deliverables, itemized scope pricing, estimate validity periods, terms of work, and authorized client signature lines for binding agreements.',
    category: 'business',
    categoryLabel: 'Business Tools',
    subcategory: 'business-documents',
    subcategoryLabel: 'Business Document Generators',
    iconName: 'FileSignature',
    popular: false,
    badge: 'Business',
    keywords: ['quote generator', 'estimate generator', 'price proposal maker', 'contract estimate pdf', 'scope of work estimate'],
    relatedToolSlugs: ['invoice-generator', 'receipt-generator', 'profit-margin-calculator'],
    howToUse: [
      'Enter proposal metadata including Estimate Number, Issue Date, and Validity Date.',
      'Input service provider and client organization contact details.',
      'Add scope deliverables with quantities and estimated unit rates.',
      'Click "Print / Save as PDF" to produce a signed client proposal document.'
    ],
    howItWorks: 'Calculates project subtotal and line deliverable totals while rendering an official proposal layout with client acceptance and signature verification areas.',
    example: {
      title: 'Proposing a cloud architecture implementation project',
      scenario: 'Providing a 30-day fixed quote for software deliverables.',
      calculation: '3 milestone phases totaling $9,800 with scope notes and sign-off lines.',
      result: 'Formal PDF estimate with formal signature blocks ready for client sign-off'
    },
    faq: [
      {
        question: 'Does the estimate include a signature block for client approval?',
        answer: 'Yes! The generated document features formal authorized signature and company stamp blocks.'
      },
      {
        question: 'Can I export the quote items to Excel?',
        answer: 'Yes, you can export all estimate deliverables and unit rates directly to XLSX with one click.'
      }
    ],
    seo: {
      title: 'Quote / Estimate Generator – Project Pricing Proposals – THE VECTOR TOOLS',
      metaDescription: 'Generate formal project estimates and price quotations with milestone scopes, validity dates, and signature blocks.',
      keywords: ['quote generator', 'estimate maker', 'price proposal generator', 'project estimate pdf']
    }
  },
  {
    id: 'receipt-generator',
    slug: 'receipt-generator',
    name: 'Receipt Generator',
    shortDescription: 'Generate official customer payment receipts with transaction IDs and paid watermark stamps.',
    longDescription: 'Create official proof-of-payment receipts for retail sales, professional services, and customer transactions. Features transaction authorization IDs, payment method records, and a distinctive "PAID IN FULL" verification watermark.',
    category: 'business',
    categoryLabel: 'Business Tools',
    subcategory: 'business-documents',
    subcategoryLabel: 'Business Document Generators',
    iconName: 'Receipt',
    popular: false,
    badge: 'Finance',
    keywords: ['receipt generator', 'payment receipt maker', 'paid receipt pdf', 'customer receipt generator', 'proof of payment'],
    relatedToolSlugs: ['invoice-generator', 'receipt-to-expense', 'quote-generator'],
    howToUse: [
      'Input merchant details and customer name.',
      'Set receipt number, payment date, payment method, and transaction auth reference.',
      'Add purchased items and apply any applicable sales tax.',
      'Print or save as PDF, or export the receipt data to Excel.'
    ],
    howItWorks: 'Generates a verified transaction document displaying subtotal, sales tax, total paid, zero balance due, and official paid stamp styling.',
    example: {
      title: 'Issuing a receipt for an annual software license purchase',
      scenario: 'Providing a customer with instant proof of payment.',
      calculation: '$285.00 purchase paid via Credit Card with transaction reference number.',
      result: 'Stamped PDF payment receipt ready for client tax filing'
    },
    faq: [
      {
        question: 'Can I include credit card authorization numbers on the receipt?',
        answer: 'Yes, the tool provides a dedicated Transaction Ref / Auth Code field for card, PayPal, or wire references.'
      },
      {
        question: 'Is this suitable for expense reimbursement proof?',
        answer: 'Yes! The receipt includes all standard requirements: merchant details, date, itemization, payment method, and paid verification.'
      }
    ],
    seo: {
      title: 'Official Receipt Generator – Proof of Payment Maker – THE VECTOR TOOLS',
      metaDescription: 'Create official, print-ready payment receipts with transaction IDs, itemized totals, and paid verification stamps.',
      keywords: ['receipt generator', 'payment receipt maker', 'proof of payment generator', 'paid receipt pdf']
    }
  },

  // 4. Business & Profit Calculators
  {
    id: 'profit-margin-calculator',
    slug: 'profit-margin-calculator',
    name: 'Profit Margin Calculator',
    shortDescription: 'Calculate gross margin, net margin, and markup percentage with target price solver.',
    longDescription: 'Distinguish between profit margin and markup percentage. Input Cost of Goods Sold (COGS), selling price, and operating expenses to discover gross margin, net margin, dollar profit, and target selling prices.',
    category: 'business',
    categoryLabel: 'Business Tools',
    subcategory: 'business-calculators',
    subcategoryLabel: 'Business & Profit Calculators',
    iconName: 'TrendingUp',
    popular: true,
    badge: 'Financial',
    keywords: ['profit margin calculator', 'markup calculator', 'gross margin vs markup', 'target margin calculator', 'retail pricing calculator'],
    relatedToolSlugs: ['break-even-calculator', 'vat-calculator', 'percentage-calculator'],
    howToUse: [
      'Enter Cost of Goods Sold (COGS) per unit.',
      'Enter your current or planned Selling Price.',
      'Optionally add unit operating expenses (shipping, ads, platform fees).',
      'View Gross Margin, Net Margin, Markup %, and use the Target Margin Solver.'
    ],
    howItWorks: 'Uses standard financial formulas: Gross Margin = (Price - Cost) / Price × 100; Markup = (Price - Cost) / Cost × 100; Target Price = Cost / (1 - Desired Margin).',
    example: {
      title: 'Pricing an e-commerce product',
      scenario: 'Cost is $60 and selling price is $100 with $15 ad/shipping expense.',
      calculation: 'Gross Margin: 40% ($40 profit) | Markup: 66.7% | Net Margin: 25% ($25 net profit).',
      result: 'Accurate margin vs. markup breakdown preventing retail underpricing'
    },
    faq: [
      {
        question: 'What is the fundamental difference between margin and markup?',
        answer: 'Profit Margin is profit relative to the Selling Price (what you keep from revenue), whereas Markup is profit relative to the wholesale Cost (how much you marked up the original expense).'
      },
      {
        question: 'How do I price a product to guarantee a 50% profit margin?',
        answer: 'Use the Target Margin Solver: for a 50% margin, you must double your cost (a 100% markup), because $50 profit on a $100 price is 50% margin.'
      }
    ],
    seo: {
      title: 'Profit Margin & Markup Calculator – THE VECTOR TOOLS',
      metaDescription: 'Calculate gross margin, net margin, markup percentage, and target selling prices. Master retail pricing math.',
      keywords: ['profit margin calculator', 'markup calculator', 'gross profit margin', 'margin vs markup']
    }
  },
  {
    id: 'break-even-calculator',
    slug: 'break-even-calculator',
    name: 'Break-Even Calculator',
    shortDescription: 'Calculate break-even units and revenue required to cover fixed and variable overhead.',
    longDescription: 'Determine the exact sales volume and revenue required to achieve profitability. Input fixed costs, unit variable costs, and selling prices to compute Contribution Margin, Break-Even Point (BEP), and volume sensitivity projections.',
    category: 'business',
    categoryLabel: 'Business Tools',
    subcategory: 'business-calculators',
    subcategoryLabel: 'Business & Profit Calculators',
    iconName: 'Target',
    popular: true,
    badge: 'Financial',
    keywords: ['break even calculator', 'bep calculator', 'contribution margin calculator', 'break even units', 'fixed vs variable costs'],
    relatedToolSlugs: ['profit-margin-calculator', 'loan-calculator', 'compound-interest-calculator'],
    howToUse: [
      'Enter Total Fixed Costs (rent, salaries, software, insurance).',
      'Enter Variable Cost per Unit (materials, shipping, direct labor).',
      'Enter Selling Price per Unit.',
      'Optionally specify a Target Profit Goal to find the exact units required to hit that milestone.'
    ],
    howItWorks: 'Applies cost-volume-profit (CVP) analysis: Contribution Margin = Price - Variable Cost; Break-Even Units = Fixed Costs / Contribution Margin; Target Units = (Fixed Costs + Target Profit) / Contribution Margin.',
    example: {
      title: 'Determining break-even for a SaaS or retail business',
      scenario: 'Fixed costs are $5,000/mo, unit variable cost is $25, and price is $65.',
      calculation: 'Unit Contribution Margin: $40. Break-Even Units: $5,000 / $40 = 125 units ($8,125 revenue).',
      result: 'Clear milestone projection showing profit/loss at various volume levels'
    },
    faq: [
      {
        question: 'What is Contribution Margin?',
        answer: 'Contribution Margin is the revenue remaining from each unit sold after paying its direct variable costs, which goes toward paying down your fixed overhead.'
      },
      {
        question: 'Can I calculate units needed for a specific profit target?',
        answer: 'Yes, enter your target profit amount and the calculator will automatically project the required unit sales volume and revenue.'
      }
    ],
    seo: {
      title: 'Break-Even Point (BEP) Calculator – Cost-Volume-Profit – THE VECTOR TOOLS',
      metaDescription: 'Calculate break-even sales volume, contribution margin, and revenue needed to cover fixed and variable costs.',
      keywords: ['break even calculator', 'bep calculator', 'contribution margin', 'break even point formula']
    }
  },

  // 5. Product, Inventory & Marketing
  {
    id: 'sku-generator',
    slug: 'sku-generator',
    name: 'SKU Generator',
    shortDescription: 'Generate standardized Stock Keeping Unit codes and variant inventory matrices for retail & e-commerce.',
    longDescription: 'Design standardized Stock Keeping Unit (SKU) architectures for retail, wholesale, Shopify, and Amazon stores. Customize brand, category, and product codes, configure delimiters and padding, and instantly generate full variant color/size matrices with Excel export.',
    category: 'business',
    categoryLabel: 'Business Tools',
    subcategory: 'product-marketing',
    subcategoryLabel: 'Product, Inventory & Marketing',
    iconName: 'Barcode',
    popular: false,
    badge: 'Inventory',
    keywords: ['sku generator', 'stock keeping unit generator', 'ecommerce sku generator', 'product sku matrix', 'shopify sku generator'],
    relatedToolSlugs: ['business-qr-generator', 'purchase-order-to-excel', 'excel-csv-cleaner'],
    howToUse: [
      'Define code prefixes for Brand, Category, and Product.',
      'Choose delimiter (hyphen, underscore, dot) and casing format.',
      'Enter comma-separated Colors and Sizes to generate an automated variant matrix.',
      'Copy all generated SKUs to clipboard or export directly to Excel (XLSX).'
    ],
    howItWorks: 'Constructs systematic alphanumeric codes following inventory best practices, ensuring human-readable and barcode-scanner friendly SKU identifiers.',
    example: {
      title: 'Generating an apparel catalog matrix',
      scenario: 'Brand: VEC, Category: APP, Product: TEE across 4 colors and 4 sizes.',
      calculation: 'Permutes 16 variant codes: VEC-APP-TEE-BLK-S-001, VEC-APP-TEE-BLK-M-002, etc.',
      result: '16 unique, standardized inventory codes ready for e-commerce upload'
    },
    faq: [
      {
        question: 'What makes a good SKU code?',
        answer: 'A good SKU is concise (8–12 characters), avoids ambiguous characters like letters O/I vs numbers 0/1, and establishes a logical hierarchy (Brand-Category-Product-Variant).'
      },
      {
        question: 'Can I export the generated SKUs to my inventory system?',
        answer: 'Yes! Export the full matrix directly to Excel (XLSX) or copy all values for immediate import into Shopify, Amazon, or ERP software.'
      }
    ],
    seo: {
      title: 'SKU Generator – Product Inventory Matrix Builder – THE VECTOR TOOLS',
      metaDescription: 'Generate standardized Stock Keeping Units (SKUs) for retail and e-commerce. Create variant matrices and export to Excel.',
      keywords: ['sku generator', 'stock keeping unit maker', 'inventory sku generator', 'ecommerce product code']
    }
  },
  {
    id: 'business-qr-generator',
    slug: 'business-qr-generator',
    name: 'Business QR Code Generator',
    shortDescription: 'Generate high-resolution QR codes for websites, vCard contact cards, guest WiFi, and payments.',
    longDescription: 'Create customized, high-resolution QR codes for marketing collateral, corporate business cards (vCard), guest WiFi networks, payment handles (PayPal, UPI), and plain text. Customize foreground and background colors and export as high-res PNG or printable cards.',
    category: 'business',
    categoryLabel: 'Business Tools',
    subcategory: 'product-marketing',
    subcategoryLabel: 'Product, Inventory & Marketing',
    iconName: 'QrCode',
    popular: true,
    badge: 'Marketing',
    keywords: ['business qr code generator', 'vcard qr code', 'wifi qr code', 'payment qr code', 'high resolution qr code', 'marketing qr'],
    relatedToolSlugs: ['sku-generator', 'invoice-generator', 'receipt-generator'],
    howToUse: [
      'Select QR code type: Website URL, vCard Contact, Guest WiFi, Payment, or Plain Text.',
      'Fill in the target details (contact info, network credentials, or link).',
      'Customize colors, image resolution, and error correction levels.',
      'Download high-resolution PNG or print the QR code card directly.'
    ],
    howItWorks: 'Generates ISO/IEC 18004 compliant two-dimensional barcode matrices directly inside the browser using standard error correction algorithms.',
    example: {
      title: 'Creating a vCard QR code for corporate business cards',
      scenario: 'Generating a scannable contact card for a conference badge.',
      calculation: 'Encodes name, company, title, phone, email, and website into standard vCard 3.0 format.',
      result: 'Clean, scannable QR code that instantly adds contact info to smartphones'
    },
    faq: [
      {
        question: 'Do these QR codes expire?',
        answer: 'No! These are static QR codes containing your direct data and never expire or rely on third-party redirection servers.'
      },
      {
        question: 'Can I print these on physical banners and signs?',
        answer: 'Yes! Select the 800x800 Ultra HD resolution for crisp vector-like printing on business cards, brochures, and large signs.'
      }
    ],
    seo: {
      title: 'Business QR Code Generator – vCard, WiFi & Payment QR – THE VECTOR TOOLS',
      metaDescription: 'Create high-resolution QR codes for websites, vCard contact cards, guest WiFi, and payments. Free, private, and non-expiring.',
      keywords: ['business qr code generator', 'vcard qr code', 'wifi qr code generator', 'free qr code generator']
    }
  }
];

export const CATEGORIES_CONFIG = [
  {
    id: 'calculators',
    name: 'Calculators',
    navName: 'Calculators',
    description: 'Smart financial, tax, mathematical, and loan calculators with instant results.',
    iconName: 'Calculator',
    color: 'emerald'
  },
  {
    id: 'converters',
    name: 'Converters',
    navName: 'Converters',
    description: 'Precision unit, currency, time zone, and chronological age converters.',
    iconName: 'ArrowLeftRight',
    color: 'blue'
  },
  {
    id: 'text-file',
    name: 'Text & File Tools',
    navName: 'Text & Files',
    description: 'Privacy-conscious text analysis, word counters, and client-side PDF converters.',
    iconName: 'FileText',
    color: 'amber'
  },
  {
    id: 'business',
    name: 'Business Tools',
    navName: 'Business Tools',
    description: 'Document extraction, spreadsheet automation, professional document generation, financial models, and inventory tools.',
    iconName: 'Building2',
    color: 'blue'
  }
];

export interface CategoryNavGroup {
  categoryId: string;
  categoryName: string;
  navName: string;
  route: string;
  subcategories: {
    key: string;
    label: string;
    tools: ToolDefinition[];
  }[];
}

export function getNavigationCategories(): CategoryNavGroup[] {
  return CATEGORIES_CONFIG.map(cat => {
    const tools = getToolsByCategory(cat.id);
    const subGroupsMap = new Map<string, { label: string; tools: ToolDefinition[] }>();
    
    tools.forEach(tool => {
      const key = (tool.subcategory as string) || 'general';
      const label = tool.subcategoryLabel || 'Tools';
      if (!subGroupsMap.has(key)) {
        subGroupsMap.set(key, { label, tools: [] });
      }
      subGroupsMap.get(key)!.tools.push(tool);
    });

    const subcategories = Array.from(subGroupsMap.entries()).map(([key, value]) => ({
      key,
      label: value.label,
      tools: value.tools
    }));

    return {
      categoryId: cat.id,
      categoryName: cat.name,
      navName: cat.navName || cat.name,
      route: `category/${cat.id}`,
      subcategories
    };
  });
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS_REGISTRY.find(t => t.slug === slug || t.id === slug);
}

export function getToolsByCategory(category: string): ToolDefinition[] {
  return TOOLS_REGISTRY.filter(t => t.category === category);
}

export function getPopularTools(): ToolDefinition[] {
  return TOOLS_REGISTRY.filter(t => t.popular);
}

export const getFeaturedTools = getPopularTools;

export function searchTools(query: string): ToolDefinition[] {
  if (!query || query.trim() === '') return TOOLS_REGISTRY;
  const q = query.toLowerCase().trim();
  return TOOLS_REGISTRY.filter(t => 
    t.name.toLowerCase().includes(q) ||
    t.shortDescription.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q) ||
    t.keywords.some(k => k.toLowerCase().includes(q))
  );
}
