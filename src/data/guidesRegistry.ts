import { GUIDES_A } from './guidesA';
import { GUIDES_B } from './guidesB';
import { GUIDES_C } from './guidesC';

export interface GuideArticle {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  relatedToolSlugs: string[];
  faq: { question: string; answer: string }[];
}

export const GUIDES: GuideArticle[] = [
  {
    slug: 'how-to-calculate-take-home-pay-in-germany',
    title: 'How to Calculate Take-Home Pay in Germany (2026 Guide)',
    metaDescription:
      'Learn how a German gross salary becomes net pay in 2026: social contributions, progressive income tax, tax classes and church tax explained, with a fully worked €60,000 example.',
    intro:
      'If you have just received a job offer in Germany, the salary on the contract is almost never the amount that lands in your bank account. German payslips deduct two large blocks before payment: social security contributions (Sozialversicherungsbeiträge) and wage tax (Lohnsteuer), which is an advance payment on your income tax. Depending on your tax class, family situation and church membership, the total deductions on a typical employee salary usually land somewhere between 35% and 42% of gross pay. That surprises many newcomers, but the system is predictable once you understand the order of the calculation: start with gross pay, subtract social contributions, then subtract income tax (plus the solidarity surcharge and church tax where they apply), and what remains is your net salary. This guide walks through each step for 2026, explains the six tax classes, and finishes with a fully worked example on a €60,000 salary so you can check any online calculator — including ours — against the real arithmetic. All figures in the example are estimates for illustration, not a substitute for payroll advice.',
    sections: [
      {
        heading: 'Step 1: Start With Your Gross Salary (Brutto)',
        paragraphs: [
          'Everything begins with your Bruttogehalt — the gross salary agreed in your contract, before any deductions. Payslips may show it monthly or annually, and confusing the two is the most basic source of error: a €5,000 monthly salary and a €60,000 annual salary are the same thing. On top of the base salary, your payslip can include extras such as overtime, a Christmas or holiday bonus (Weihnachtsgeld), capital-forming payments (vermögenswirksame Leistungen) or benefits in kind such as a company car. One-off payments like bonuses are taxed under a slightly different annualised method, which is why a bonus month often looks disappointing on the payslip even though the annual tax return later evens things out.',
          'It also helps to know that your gross salary is not your employer’s total cost. Your employer pays its own share of social contributions — roughly another 21% on top of your gross salary, plus accident insurance — so a €60,000 salary costs the company noticeably more than €72,000. None of that employer share is deducted from your pay, but it explains why German employers talk about total personnel costs rather than salary alone. This guide only follows the employee side: the money that leaves your gross pay before the net amount (Netto) is transferred to you, usually at the end of the month.',
        ],
      },
      {
        heading: 'Step 2: Deduct Social Security Contributions (Sozialversicherung)',
        paragraphs: [
          'The first and most mechanical deduction is social security. Employees in Germany are compulsorily insured in four branches, and for most of them the cost is split roughly half and half between employee and employer. Statutory pension insurance (Rentenversicherung) costs 18.6% of gross pay, so 9.3% comes from you. Unemployment insurance (Arbeitslosenversicherung) costs 2.6%, so 1.3% from you. Statutory health insurance (Krankenversicherung) has a base rate of 14.6%, plus a supplementary contribution (Zusatzbeitrag) set by your individual health insurer, which has averaged around 2.5% in recent years; both parts are split evenly, so your health share is typically 7.3% plus about 1.25%. Long-term care insurance (Pflegeversicherung) costs 3.6% in total, normally 1.8% from you — but employees over 23 without children pay a 0.6% childless surcharge alone, taking their care share to 2.4%, while parents with two or more young children receive small discounts.',
          'Added together, the employee share of social contributions usually comes to roughly 21% of gross pay — about 20.95% for a parent at an average supplementary health rate, or about 21.55% for a childless employee. Two details matter for higher earners. First, contributions are capped: health and care insurance are charged only up to an annual income ceiling (Beitragsbemessungsgrenze) of roughly €69,750 in 2026, and pension and unemployment insurance up to a higher ceiling of roughly €101,400. Above those ceilings the percentage deduction stops growing, which is why the effective deduction rate falls at very high salaries. Second, these contributions are not lost money in an accounting sense: they buy you pension entitlements, unemployment benefit eligibility, full health coverage and care coverage, and most of them are tax-deductible, which becomes relevant in the next step.',
        ],
      },
      {
        heading: 'Step 3: Deduct Income Tax (Lohnsteuer / Einkommensteuer)',
        paragraphs: [
          'Only after social contributions comes income tax. What your employer deducts each month is called Lohnsteuer — literally wage tax — and it is not a separate tax: it is an advance instalment of your annual Einkommensteuer (income tax), calculated as if your current monthly salary continued for the whole year. At the end of the year, the tax office compares what you prepaid against your actual tax liability; file a tax return (Steuererklärung) and any overpayment comes back as a refund, which is very common for people who started or left a job mid-year or had large deductible expenses.',
          'German income tax is progressive. The first slice of taxable income — the Grundfreibetrag, roughly €12,300 in 2026 — is taxed at 0%. Above that, the marginal rate starts at 14% and rises in steps to 42%, which applies to taxable income above roughly €68,000 for a single person, with a top rate of 45% only at very high incomes. The crucial point is the difference between marginal and effective rates: earning €60,000 does not mean 42% tax on everything. Only the top slice of your income reaches the higher bands, so the effective (average) tax rate on a €60,000 salary for a single person is typically in the region of 18–19% of gross — significant, but far from the headline marginal rate. Taxable income is also lower than gross salary, because employee pension contributions, most health and care contributions, unemployment contributions, a standard €1,230 employee expenses allowance (Werbungskostenpauschale) and a €36 special-expenses allowance are deducted first.',
          'The solidarity surcharge (Solidaritätszuschlag) deserves a short note because many guides still list it as a standard 5.5% deduction. Since 2021 it has been abolished for the large majority of employees: it now only applies above a high exemption threshold, so on a €60,000 salary in tax class I it is normally €0. It still appears on the payslip as a line item — just with nothing next to it.',
        ],
      },
      {
        heading: 'Step 4: Church Tax and the Six Tax Classes (Steuerklassen)',
        paragraphs: [
          'If you are a registered member of the Catholic or Protestant church in Germany, you also pay church tax (Kirchensteuer): 9% of your income tax in most states, and 8% in Bavaria and Baden-Württemberg. On an income tax bill of €11,000 that is roughly another €990 a year, so it is far from trivial. The tax office learns your religion from the registration data when you register your address (Anmeldung); people who were baptised abroad are sometimes recorded by default, so check your first payslip and correct any error quickly. Leaving the church (Kirchenaustritt) is done at a local registry or court office for a small fee, and the tax stops the following month.',
          'Your monthly wage tax also depends heavily on your Steuerklasse (tax class), which mainly reflects your marital status. Class I is the default for single, divorced or widowed employees. Class II is for single parents and includes extra relief. Married couples can choose between IV/IV (sensible when both earn similar amounts), III/V (the higher earner takes III with low deductions, the lower earner takes V with high deductions — the household total during the year is similar, but the split between the two payslips changes dramatically), or IV with a factor (Faktorverfahren), which distributes the tax most accurately. Class VI applies to a second or additional job and has the highest deductions, because allowances are already used in the first job. A common mistake is judging a job offer by the payslip alone in class V: the household’s final annual tax is the same either way, and couples in III/V are obliged to file a tax return, which settles the difference.',
        ],
      },
      {
        heading: 'Worked Example: €60,000 Gross, Single, Tax Class I',
        paragraphs: [
          'Let us put the steps together for a concrete case. Assumptions: an employee earning €60,000 gross per year (€5,000 per month), single, tax class I, no church tax, statutory health insurance with an average supplementary contribution, over 23 and without children, living in a western German state, and below all contribution ceilings. Social contributions first. Pension: 9.3% of €60,000 is €5,580. Unemployment: 1.3% is €780. Health: 8.55% (7.3% base share plus 1.25% supplementary share) is €5,130. Long-term care including the childless surcharge: 2.4% is €1,440. Total social contributions: €5,580 + €780 + €5,130 + €1,440 = €12,930 per year.',
          'Income tax next. After deducting the tax-free allowances and deductible contributions described above, taxable income works out to roughly €46,500, and applying the progressive 2026 tariff gives an estimated wage tax of about €11,030 for the year. This is an estimate: the exact figure depends on the official payroll tables and your personal details, and can shift by a few hundred euros either way. The solidarity surcharge is €0 at this income, and church tax is €0 by assumption. Total deductions are therefore €12,930 + €11,030 = €23,960. Net pay: €60,000 − €23,960 = €36,040 per year, which is about €3,003 per month — roughly 60% of gross arriving in the bank account. For context, your employer additionally pays about €12,570 in employer social contributions plus accident insurance, so the job costs the company at least €72,570 a year. Try the same numbers in our salary calculator and vary one assumption at a time — church tax, for example, would reduce the net by roughly another €990 a year.',
        ],
      },
      {
        heading: 'Reading Your Payslip and Avoiding Common Mistakes',
        paragraphs: [
          'A German payslip (Gehaltsabrechnung) lists everything in a fixed order, and once you know the layout you can verify it in a minute. It starts with gross pay (Gesamtbrutto), then a tax block showing Lohnsteuer, Solidaritätszuschlag and Kirchensteuer, then a social security block with your employee shares for health (KV), pension (RV), unemployment (AV) and care (PV), and finally the Nettogehalt. The amount actually transferred (Auszahlungsbetrag) can differ slightly from net pay if there are additional items such as a company pension contribution, a job ticket or repayments. If a line you expect is missing — or church tax appears even though you are not a church member — ask payroll promptly, because corrections are much easier within the same tax year.',
          'The mistakes we see most often are simple. People compare their German net salary with a net salary from another country without noticing that health insurance and pension contributions are inside the German deduction, not extra costs on top. People panic about a 42% marginal rate without realising their effective rate is under 20%. People forget that a bonus is taxed as if it were paid every month, and that the annual tax return refunds the overshoot. And people choose tax classes III/V for the nicer monthly payslip without knowing it obliges them to file a return and can produce a back-payment. The safest habit is this: estimate with a calculator before you sign, verify against your first real payslip, and file a tax return every year — for most employees in Germany, it pays money back.',
        ],
      },
    ],
    relatedToolSlugs: ['salary-calculator', 'income-tax-calculator'],
    faq: [
      {
        question: 'Why is my first German payslip lower than I expected?',
        answer:
          'Almost always because both deduction blocks apply from day one: roughly 21% social contributions plus progressive wage tax. On a €60,000 salary, a single person in tax class I typically keeps about 60% of gross. Check whether church tax was deducted by mistake and whether your tax class is correct — both are common first-payslip errors.',
      },
      {
        question: 'Do I still pay the solidarity surcharge (Solidaritätszuschlag)?',
        answer:
          'Almost certainly not. Since 2021 the surcharge only applies above a high exemption threshold on income tax, which a typical employee salary does not reach. It still appears as a line on your payslip, but for most employees the amount next to it is €0. It mainly survives for very high incomes and some investment income.',
      },
      {
        question: 'Will I get money back if I file a German tax return?',
        answer:
          'Often, yes. Wage tax is calculated as if every month were identical, so anyone who started mid-year, received a bonus, changed tax class or had deductible expenses above the standard allowances has usually overpaid. Filing a Steuererklärung compares prepaid tax with your real liability and refunds the difference, which is why most employees who file receive money back.',
      },
      {
        question: 'Why does a salary calculator give a slightly different result from my payslip?',
        answer:
          'Calculators work with standard assumptions: average supplementary health contribution, standard allowances and no individual extras. Your real payslip reflects your actual insurer’s supplementary rate, your exact tax class and data stored with the tax office, plus items like a company car or pension scheme. Small differences of a few euros per month are normal; large ones are worth asking payroll about.',
      },
    ],
  },
  {
    slug: 'how-to-convert-pdf-to-jpg-without-uploading',
    title: 'How to Convert PDF to JPG Without Uploading Your Files',
    metaDescription:
      'Convert PDF pages to JPG images entirely in your own browser — no uploads and no server storage. DPI, quality and file size explained, with troubleshooting for blurry or huge results.',
    intro:
      'Converting a PDF page into a JPG image sounds trivial, and dozens of free websites offer to do it in seconds. The catch is how most of them work: you upload your document to a stranger’s server, the conversion happens there, and you download the result — trusting that the copy left behind is really deleted. For a concert ticket that hardly matters. For a signed contract, a payslip, a bank statement or a scan of your passport, it matters a great deal. The good news is that uploading is not technically necessary at all. Modern browsers can open, render and export a PDF entirely on your own device, using the same rendering technology built into the browser itself. This guide explains the privacy risk of upload-based converters, how browser-based (client-side) conversion actually works under the hood, how to do it step by step with the PDF to JPG tool on this site, and how to choose resolution and quality settings that keep your images sharp without producing absurd file sizes.',
    sections: [
      {
        heading: 'Why Uploading Documents to Random Converters Is a Privacy Risk',
        paragraphs: [
          'Think about what a typical PDF contains. Invoices carry bank details and addresses. Employment contracts carry salaries. Medical letters, tax documents, visa applications and identity scans carry some of the most sensitive information a person has. When you upload such a file to a free conversion website, you hand a complete copy to an operator you know nothing about: you do not know which country the server is in, how long the file is kept, who can access it, whether it is encrypted at rest, or whether it is used to train systems or sold on in anonymised form. Privacy policies on these sites are often vague — phrases like “files are deleted after a few hours” are promises, not technical guarantees, and they say nothing about backups, logs or breaches that happen in between.',
          'None of this means every upload-based converter is malicious; many are legitimate businesses. The point is that the risk is unnecessary. A data breach at a conversion service would expose documents people would never post publicly, and unlike a password, you cannot change your date of birth, signature or bank account history afterwards. Data-protection law in many regions treats the uploader — often you, or your employer — as responsible for where personal data goes. If a document can be processed locally instead, the safest copy of it is the one that never leaves your device. That is exactly what browser-based conversion does, and the next section explains how it works so you can judge the claim for yourself rather than taking it on faith.',
        ],
      },
      {
        heading: 'How Browser-Based Conversion Works Under the Hood',
        paragraphs: [
          'A client-side converter runs as JavaScript inside the web page you have open. When you select a PDF, the browser reads the file from your disk into memory using the File API — the same mechanism that shows you a file name in an upload form, except here nothing is transmitted anywhere. A PDF engine written in JavaScript and WebAssembly (the widely used PDF.js library is the best known example, and a version of it ships inside Firefox itself) then parses the document: it reads the page tree, fonts, vector shapes and embedded images, and can report how many pages the file has and how large each page is.',
          'Rendering is the key step. A PDF page is a set of drawing instructions — text here, a line there, an image at these coordinates — designed to be resolution-independent. To turn a page into a JPG, the converter draws those instructions onto an HTML canvas element at a scale you choose: it multiplies the page’s physical size by the resolution (in dots per inch) to get pixel dimensions, paints the page at that size, and then asks the canvas for an image using the browser’s built-in JPEG encoder. The result is handed back to you as a download through a temporary object URL. At no point does the file, the rendered image or any text from your document cross the network. You can verify this yourself: load the tool page, switch your device to flight mode, and the conversion still works — a server-based tool would simply fail. Closing the tab discards everything held in memory.',
        ],
      },
      {
        heading: 'Step by Step: Converting a PDF to JPG in Your Browser',
        paragraphs: [
          'Start by opening the PDF to JPG converter on this site and selecting your document — either click to browse or drag and drop the file onto the page. Multiple PDFs can be added at once if you need images from several documents. The tool reads the files locally and shows the pages it finds, so you can confirm you picked the right document before converting. If your PDF has many pages and you only need one or two, look for the page previews and download only the pages you actually need instead of converting the whole file.',
          'Next, choose your resolution. If the tool offers a quality or DPI setting, use the guidance in the next section: 150 DPI is a sensible default for most purposes, 300 DPI for anything destined for print, and 72 DPI only for small on-screen previews. Then run the conversion and download the results — individual JPGs for single pages, or a combined package when you converted many pages at once. Finally, do a ten-second quality check before you rely on the images: open one page, zoom to 100%, and look at the smallest text on it. If the fine print is crisp, you are done. If it is soft or fuzzy, re-run at a higher DPI rather than trying to sharpen the JPG afterwards — detail that was never rendered cannot be recovered by editing.',
        ],
      },
      {
        heading: 'Choosing DPI and Quality: The Sharpness vs File-Size Trade-Off',
        paragraphs: [
          'DPI (dots per inch) decides how many pixels each rendered page gets, and it is the single biggest factor in both sharpness and file size. The maths is simple: multiply the page size in inches by the DPI. An A4 page measures 8.27 × 11.69 inches, so at 72 DPI it renders at about 595 × 842 pixels — fine for a thumbnail or a quick preview on a phone, but visibly soft when viewed full-screen. At 150 DPI the same page is about 1,240 × 1,754 pixels, which looks sharp on screen and prints acceptably; this is the right default for sharing, emailing and uploading to portals. At 300 DPI you get about 2,480 × 3,508 pixels, the standard for good-quality printing and archiving, at the cost of much larger files.',
          'File size grows fast because doubling the DPI means four times as many pixels (twice as wide and twice as tall). A text page that produces a 150 KB JPG at 150 DPI can easily become 600 KB or more at 300 DPI, and a 40-page document multiplies that by forty. JPEG quality works on top of this: the quality slider (typically 1–100) controls how aggressively the encoder discards fine detail. Around 80–90 is the sweet spot for documents — dropping to 50 makes text edges visibly blotchy, while pushing to 100 inflates the file for a difference most people cannot see. Practical rule: pick the DPI for the final use (screen or print), leave quality near 85, and only raise settings when the quality check from the previous section actually fails.',
        ],
      },
      {
        heading: 'When JPG Is the Wrong Format',
        paragraphs: [
          'JPEG was designed for photographs, and it shows. It is a lossy format: it deliberately throws away detail it thinks you will not notice, and around high-contrast edges — exactly what black text on white paper is — that produces faint smudges and halos called compression artifacts. For a page you mainly need to read on screen, JPG at 150 DPI or above is perfectly serviceable. But if the page is a diagram, a screenshot, a form with fine lines, or text you will zoom into heavily, PNG is usually the better choice. PNG compression is lossless and keeps text razor-sharp; its files are larger for photos, but for text-heavy pages PNG can actually be smaller than a high-quality JPG while looking cleaner.',
          'There are also things no image format can do. A JPG of a page is a picture of text: you cannot select it, copy from it, or search it, and screen readers cannot read it. If the document needs to stay searchable or accessible, keep the PDF itself or use a tool that preserves the text layer. JPG also has no transparency support and handles flat colour blocks poorly compared with PNG. A reasonable workflow is: JPG for previews, messaging apps, marketplaces and web uploads that demand an image; PNG for crisp documentation and diagrams; and the original PDF whenever the document itself — not a picture of it — is what matters. If you later need to bundle images back into a document, our JPG to PDF tool does that locally too, though it cannot restore the original text layer.',
        ],
      },
      {
        heading: 'Troubleshooting: Blurry, Huge or Blank Results',
        paragraphs: [
          'Blurry output is almost always a resolution problem, not a broken tool: the page was rendered at a low DPI and then viewed large. Re-convert at 150 or 300 DPI and check again at 100% zoom. The opposite problem — enormous files — comes from the same dial turned too far, often 300 DPI applied to a long document where 150 would have done. Remember that scanned PDFs are a special case: each page is already a photograph inside the PDF, so converting it cannot add detail beyond the original scan; a blurry scan stays blurry at any DPI, it just gets bigger.',
          'Blank or missing pages have a few typical causes. Password-protected or rights-managed PDFs cannot be rendered until the password is removed by a tool that supports it. Damaged or unusually structured files may fail to parse in the browser engine even though a desktop reader opens them — re-saving (“print to PDF”) the file in a desktop reader often repairs the structure. Very large PDFs can also hit the memory limits of a phone or older laptop, because every rendered page is held as a full-size image; converting in smaller batches, or on a desktop browser, usually solves it. Finally, colours can shift slightly because PDFs sometimes use the CMYK colour space while browsers render in RGB — for casual use this is invisible, but for print-critical work, proof the images before sending them anywhere.',
        ],
      },
    ],
    relatedToolSlugs: ['pdf-to-jpg', 'jpg-to-pdf', 'image-format-converter'],
    faq: [
      {
        question: 'Is my PDF really not uploaded when I use a browser-based converter?',
        answer:
          'Correct — with a client-side tool, the file is read from your disk into the browser’s memory and processed by code running in the page. Nothing is sent to a server. You can prove it yourself: load the tool, turn on flight mode, and convert a file. A genuinely server-based converter cannot work offline at all.',
      },
      {
        question: 'Which DPI should I choose for printing a converted page?',
        answer:
          'Use 300 DPI for anything that will be printed and read at normal distance — that is the long-standing print standard and gives an A4 page of about 2,480 × 3,508 pixels. For drafts or pages that will only be viewed on screen, 150 DPI is sharp enough and produces files roughly a quarter of the size.',
      },
      {
        question: 'Can I convert a password-protected PDF to JPG?',
        answer:
          'Only if the protection can be lifted first. A PDF with an open password cannot be parsed until that password is entered, and PDFs with owner restrictions may render but block export in some tools. Remove the password in a desktop PDF reader using the password you already know, then convert the unlocked copy in the browser as normal.',
      },
      {
        question: 'Why can’t I select or search the text in my converted JPG?',
        answer:
          'Because a JPG is a photograph of the page, not the page itself. During conversion the text is painted as pixels, so the text layer, links and structure of the PDF are gone. If you need searchable text, keep the original PDF, or use OCR software, which recognises characters in the image and rebuilds an approximate text layer.',
      },
    ],
  },
  ...GUIDES_A,
  ...GUIDES_B,
  ...GUIDES_C,
];

export const getGuideBySlug = (slug: string): GuideArticle | undefined => GUIDES.find((g) => g.slug === slug);
