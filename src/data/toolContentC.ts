// Expanded editorial content for business tool pages (Stage 2, batch C).
// Each entry complements the base registry entry in toolsRegistry.ts
// (howToUse / howItWorks / example / faq) with deeper, tool-specific
// methodology, a multi-section guide, extra worked examples and extra FAQs.

import { ToolContentEntry } from './toolContent';

export const TOOL_CONTENT_C: Record<string, ToolContentEntry> = {
  // ============================================================
  // INVOICE TO EXCEL
  // ============================================================
  'invoice-to-excel': {
    howItWorksExtended: `Beyond the header fields, the harder problem is the line-item table. The converter groups text fragments into rows using their vertical positions, then separates quantity, unit price and amount by looking at the horizontal ranges the figures fall into, so a description that wraps onto a second line is rejoined to its row instead of becoming a row of its own. Tax rows, discount lines and the totals block are identified by their labels and position, and every extended amount is recomputed — quantity multiplied by unit price — and compared with the printed figure. Where the two disagree beyond a rounding cent, the row deserves a manual look before the spreadsheet is used for anything.`,
    guide: [
      {
        heading: 'An invoice is a structured document, not a page of text',
        paragraphs: [
          `Every invoice is built from the same regions, and recognising them is what makes extraction reliable. The header carries the seller, the buyer, the invoice number and the dates. Below it sits the line-item table — descriptions, quantities, unit prices and line amounts. A tax summary then breaks out the rates applied, and a totals block states the subtotal, the tax total and the amount due. Payment details and notes close the document.`,
          `Each region maps to a different place in the spreadsheet. Header fields belong in single columns on a summary sheet or as repeated columns on every row, line items become the rows themselves, and the tax and totals figures become check values at the foot of the table. When a conversion looks wrong, it is almost always because one region was read as another — a totals line absorbed into the item table, or a long address mistaken for line items.`,
        ],
      },
      {
        heading: 'Reconciliation: the check that catches extraction errors',
        paragraphs: [
          `An invoice contains its own proof. Add the extracted line amounts and compare the sum with the printed subtotal. Apply the stated tax rate to that subtotal and compare it with the printed tax total. Add the two and compare with the printed grand total. If all three checks agree within a cent of rounding, the extraction is internally consistent and very probably correct, whatever the layout looked like.`,
          `When a check fails, the size of the difference is diagnostic. A difference equal to one of the line amounts usually means a row was dropped or duplicated. A difference of a few cents points to rounding — some sellers round tax per line, others on the subtotal. A large, irregular difference suggests a column was misread, for example a quantity taken as a price. Recomputing takes seconds and is the difference between data you can trust and data you merely hope is right.`,
        ],
      },
      {
        heading: 'Where invoice extraction usually goes wrong',
        paragraphs: [
          `Certain layout habits reliably cause trouble. Merged or centred cells in the original document can push a figure into the neighbouring column. Long descriptions that wrap across two printed lines can be split into a phantom second row with no figures. Discount and credit lines are sometimes printed as negative amounts and sometimes in brackets, and a converter may read only one of those conventions correctly.`,
          `Number formats are the other classic trap. In much of the world 1,250.50 and 1.250,50 are the same number written two ways, and an extractor that assumes the wrong convention returns values a thousand times too large or too small. Multi-currency invoices add a further risk when the currency symbol sits far from the amount. None of these errors is obvious in a quick glance at the spreadsheet — which is exactly why the reconciliation check matters.`,
        ],
      },
      {
        heading: 'Multi-page invoices and credit notes',
        paragraphs: [
          `Long invoices break across pages, and the break creates artefacts. The item table may repeat its header row on every page, may carry a page subtotal that is not part of the final total, and may split a single line item across the boundary. A good extraction ignores repeated headers, treats page subtotals as check figures rather than items, and rejoins the split row — and the row-count and totals checks confirm whether it managed.`,
          `Credit notes deserve separate handling. A credit note looks like an invoice but reduces what you owe, and its amounts may be printed as positives even though their effect is negative. Log credit notes in the same register with a clearly negative total or a document-type column, never mixed invisibly into the invoice rows, or your supplier totals for the month will be overstated and the eventual payment will not match either document.`,
        ],
      },
      {
        heading: 'A month-end workflow that takes minutes, not hours',
        paragraphs: [
          `The efficient pattern is to convert invoices as they arrive rather than in a pile at month end. Drop each converted invoice into one running register sheet, with columns for date, supplier, invoice number, subtotal, tax and total. Ten minutes a week keeps the register current, and errors are far easier to chase while the invoice is still fresh in your mind and the supplier relationship is warm.`,
          `At month end, the register does the heavy lifting: sort or filter by supplier to get per-supplier totals, sum the tax column for your return, and scan for duplicate invoice numbers, which usually mean the same invoice was received twice — by email and by post, for example. Keep the original documents in a folder named to match the register rows, so any figure in the spreadsheet can be traced back to its source document in seconds.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Verifying an extracted invoice against its own totals',
        scenario: 'An invoice extracts to three lines: 12 × $45.00, 6 × $28.50 and 2 × $19.99, with 8% tax and a printed grand total of $811.06.',
        calculation: 'Lines: $540.00 + $171.00 + $39.98 = $750.98 subtotal. Tax: $750.98 × 8% = $60.08 (rounded). Total: $750.98 + $60.08 = $811.06 — matching the printed total exactly.',
        result: 'All three reconciliation checks pass, so the extraction can be imported without line-by-line reading',
      },
      {
        title: 'Building a monthly supplier total from three invoices',
        scenario: 'Three invoices from the same supplier arrive during the month, with totals of $1,240.00, $865.50 and $2,310.75, and you need the month’s spend for that supplier.',
        calculation: '$1,240.00 + $865.50 = $2,105.50; $2,105.50 + $2,310.75 = $4,416.25. A SUM over the register rows filtered by that supplier gives the same figure.',
        result: 'Monthly spend with the supplier: $4,416.25, ready for the accounts without touching a calculator',
      },
    ],
    extraFaqs: [
      {
        question: 'Why did one line item appear as two rows in the spreadsheet?',
        answer: 'This usually happens when the item description is long enough to wrap onto a second printed line. The extractor sees the continuation line, finds no figures on it, and may still create a row for it. Delete the empty row, rejoin the text to the real item if the description matters, and confirm the line-amount sum still matches the printed subtotal afterwards.',
      },
      {
        question: 'Why is the Excel total a few cents different from the printed invoice?',
        answer: 'Small differences are almost always rounding. Sellers either round the tax on each line and then add the rounded figures, or calculate tax once on the subtotal; the two methods can differ by a cent or two on a multi-line invoice. A difference within a few cents is safe to accept. A difference larger than that means a row or a figure was misread and should be investigated.',
      },
      {
        question: 'Can I combine invoices in different currencies into one spreadsheet?',
        answer: 'Yes, but keep a currency column on every row and never sum across currencies. Add the currency code from each invoice as its own field, then total per currency using a filter or separate sums. Converting everything into your home currency is a separate step that needs an exchange rate and a date for that rate, so record both, or the figures cannot be audited later.',
      },
    ],
  },

  // ============================================================
  // PDF TABLE TO EXCEL
  // ============================================================
  'pdf-table-to-excel': {
    howItWorksExtended: `A PDF table has no cells, so the converter has to rebuild the grid from geometry. It reads the position of every text fragment on the page, groups fragments that share a baseline into rows, and looks for the vertical whitespace gutters that separate one column from the next across many rows. Column boundaries are placed in those gutters, fragments are assigned to the cell they fall in, and header rows are recognised by position and repetition. Ruled lines, when the PDF contains them, strengthen the result; borderless tables rely on alignment alone, which is why a table whose columns are set close together is the hardest case and the one most worth checking after conversion.`,
    guide: [
      {
        heading: 'Why a PDF table is not a spreadsheet',
        paragraphs: [
          `A spreadsheet stores a grid: every value lives in a cell with a row and a column, and the grid exists independently of how it looks. A PDF stores something quite different — a list of drawing instructions that place individual pieces of text at exact coordinates on a page. The table you see is a visual impression created by those positions. There are no cells, no rows and no columns in the file itself.`,
          `This is why copying a table out of a PDF so often produces a jumble: the reading order in the file may jump down a column instead of across a row, and numbers that align neatly on screen may be separate fragments with a space inside them. Extraction has to infer the grid from alignment and spacing, and inference can be wrong wherever the layout is ambiguous — which is a property of the format, not a defect in any particular tool.`,
        ],
      },
      {
        heading: 'Header detection and column mapping',
        paragraphs: [
          `The first row of a table is usually its header, but real documents complicate that: headers can span two printed lines, repeat the column names in a group heading above them, or sit under a title and a date line that are not part of the table at all. Getting the header right matters because it names every column in the spreadsheet, and a header absorbed into the data — or a data row promoted into the header — corrupts the whole sheet.`,
          `Column mapping is the step where you confirm what each extracted column means and how it should be typed. A column of product codes that look numeric, such as 0042, must stay text or it loses its leading zeros. A price column must become real numbers, not text that merely looks like numbers, or sorting and summing will silently misbehave. A minute spent mapping columns at conversion time prevents the confusing errors that surface weeks later in a report.`,
        ],
      },
      {
        heading: 'Multi-page tables without losing rows',
        paragraphs: [
          `Tables in reports and catalogues routinely run to dozens of pages, and each page boundary is a hazard. Most documents repeat the header row at the top of every page; those repeats must be recognised and removed, or the spreadsheet fills with header rows masquerading as data. A row that happens to fall across the break can be split in two, its first half ending one page and its second half starting the next.`,
          `Totals create the mirror-image problem: a table may print a subtotal at the foot of each page and a grand total at the end. Those total rows are useful as checks but poison the data if left in it, because every sum you run will double-count them. The practical defences are simple: after conversion, count the data rows, compare them with a manual count from the document, and decide consciously whether total rows belong in the sheet at all.`,
        ],
      },
      {
        heading: 'Verify with row counts and column sums',
        paragraphs: [
          `A long table cannot be proofread line by line, so verify it statistically instead. Count the rows in the source — many documents state the count, or you can count rows per page and add them — and compare with the rows in the spreadsheet. Then pick any numeric column and compare its spreadsheet sum with a total printed in the document, if one exists. Agreement on both checks is strong evidence the whole table survived.`,
          `Spot checks target the rows most likely to break: the first and last row of every page, any row with an unusually long description, and any row containing brackets, negatives or multiple numbers. If the spot checks pass and the totals agree, remaining errors are rare and small. If a total disagrees, the difference often identifies the problem — a difference equal to one row's value means that row is missing or duplicated, and you can search for it directly.`,
        ],
      },
      {
        heading: 'Cleaning the result once it is in Excel',
        paragraphs: [
          `Extracted tables usually need a short clean-up pass. Trim stray spaces from text columns, because a trailing space makes two otherwise identical entries sort and match differently. Convert any numeric column that arrived as text — the tell-tale sign is numbers aligned left and refusing to sum. Split any column that merged two fields, such as a code and a description, using the fixed pattern most spreadsheets offer for that job.`,
          `Finish by making the sheet pleasant to work in: freeze the header row so it stays visible, switch on filters, widen columns to fit their contents, and save a copy of the untouched extraction before you start editing. That untouched copy is your fallback — if a clean-up step goes wrong, or a figure is questioned months later, you can re-derive your working sheet and show exactly which changes you made along the way.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Row-count check on a three-page price list',
        scenario: 'A supplier price list runs over 3 pages. You count 25 data rows on page 1, 25 on page 2 and 18 on page 3, excluding the repeated header rows.',
        calculation: '25 + 25 + 18 = 68 expected data rows. The extracted spreadsheet contains 68 data rows plus one header row.',
        result: 'Row counts agree, so no rows were dropped, duplicated or lost at the page breaks',
      },
      {
        title: 'Using an extended-price column to audit a row',
        scenario: 'One extracted row reads: item WD-40 500ml, quantity 12, unit price 4.85, extended price 58.20. You want to confirm the row was split into the right columns.',
        calculation: '12 × 4.85 = 58.20, matching the extracted extended price exactly.',
        result: 'Quantity, price and total sit in the correct columns; a mis-split row would almost never satisfy its own arithmetic',
      },
    ],
    extraFaqs: [
      {
        question: 'Why do the numbers in my spreadsheet behave like text?',
        answer: 'Extraction writes figures as text strings when the PDF prints them with spaces, currency symbols or thousands separators inside the number. Text numbers align on the left, sort alphabetically — so 100 comes before 20 — and are ignored by SUM. Select the column and convert it to numbers, removing any symbols first, then check the column total against a figure from the document to confirm it worked.',
      },
      {
        question: 'Two of my columns came out merged into one. What happened?',
        answer: 'Columns are detected from the vertical gaps between them. When two columns are set very close together, or their contents nearly touch, the gap disappears and they are read as a single column. Widen the separation in the column mapping if the tool allows it, or split the merged column afterwards in the spreadsheet — code-and-description pairs usually split cleanly at the first space or at a fixed character position.',
      },
      {
        question: 'How can I be sure nothing was lost from a very long table?',
        answer: 'Use two checks. First, count data rows per page in the document and compare the total with the spreadsheet row count; repeated page headers must be excluded from both counts. Second, sum a numeric column in the spreadsheet and compare it with any total printed in the document. Passing both checks makes a silent loss very unlikely, because a missing row would break the count and the sum as well.',
      },
    ],
  },

  // ============================================================
  // BANK STATEMENT TO EXCEL
  // ============================================================
  'bank-statement-to-excel': {
    howItWorksExtended: `Statements differ in one awkward way: some print separate debit and credit columns, while others use a single amount column where the sign — or a marker such as DR — carries the direction. The converter normalises both layouts into one debit column and one credit column, reading dates, descriptions and running balances alongside. The running balance is the built-in audit: starting from the opening balance, each row must satisfy previous balance plus credits minus debits equals the new balance. The converter can flag where that chain breaks, but only you can judge whether a flagged row is a misread figure, a missing transaction, or something in the statement itself that needs querying with the bank.`,
    guide: [
      {
        heading: 'Debit, credit and balance: getting the directions right',
        paragraphs: [
          `Bank terminology confuses everyone because it is written from the bank's point of view, not yours. On a statement, a credit is money in — salary, transfers received, interest — and a debit is money out. Some statements print two money columns for these, some print one column with plus and minus signs, and some print amounts with a DR marker for debits. Before trusting any conversion, confirm the direction of two or three transactions you recognise.`,
          `The balance column is what makes a statement self-checking, and it is worth preserving in the spreadsheet rather than discarding. It should step from the opening balance to the closing balance one transaction at a time, rising with credits and falling with debits. If your bank's statement orders transactions newest first, the chain runs backwards — each balance equals the one below it plus that row's movement — and the same check works in reverse.`,
        ],
      },
      {
        heading: 'Running-balance verification, row by row',
        paragraphs: [
          `The check is one formula repeated down the sheet: previous balance, plus credits, minus debits, must equal this row's balance. In a spreadsheet this becomes a calculated column sitting next to the bank's printed balance, with a difference column that should read zero all the way down. It takes a minute to set up and it audits every single row of the statement at once, including the ones you would never read individually.`,
          `The pattern of any failure tells you where to look. If the difference appears at one row and stays constant afterwards, a single amount on that row was misread — compare it with the statement. If the difference equals one transaction exactly, a row was probably dropped or duplicated, often at a page break. If differences come and go, the sign on a two-sided transaction such as a reversal or a fee correction was likely flipped.`,
        ],
      },
      {
        heading: 'Descriptions, references and categorising transactions',
        paragraphs: [
          `Statement descriptions are written for the bank's systems, not for your records: abbreviated merchant names, reference codes, and locations crammed into a short field. The spreadsheet is where that raw material becomes useful. Add your own notes column for what a payment actually was, keep the bank's original description untouched for traceability, and keep any reference numbers — cheque numbers, transfer references — in their own column where they can be searched.`,
          `Categorising is where the converted statement earns its keep. Add a category column — rent, payroll, suppliers, software, tax, personal — and apply a short, fixed list of category names consistently; 'fuel' and 'petrol' as separate categories will quietly split your reporting in two. Once categorised, a simple pivot or a set of SUMIF formulas turns a month of transactions into totals per category, which is the view your accountant, and your own cash-flow decisions, actually need.`,
        ],
      },
      {
        heading: 'Dates, ordering and duplicate transactions',
        paragraphs: [
          `Two statements rarely order their rows the same way. Some run oldest to newest, others newest to oldest, and a conversion that assumes the wrong order will produce a balance chain that fails everywhere. Check the first and last dates against the statement period before anything else. Date formats cause a quieter problem: 04/07 is April 7 in one convention and 4 July in another, and a spreadsheet that guesses wrong corrupts every date-dependent report downstream.`,
          `Duplicates sneak in at the seams. A transaction on the last day of one statement period can reappear at the start of the next, pending card payments can show twice — once pending, once posted — and page-break rows can be read twice. Sorting by date and amount makes duplicates visible as identical neighbours. Delete a duplicate only after confirming from the balance chain that it is truly spare; the chain must still reconcile perfectly without it.`,
        ],
      },
      {
        heading: 'Your statement is one of your most sensitive documents',
        paragraphs: [
          `A bank statement is a remarkably complete portrait of a life or a business: income, employer, rent, debts, habits, locations and problems, all dated. It is the document identity thieves and fraudsters value most, precisely because it answers so many security questions in one place. Treat the source file accordingly — keep it out of shared folders and email threads, and be wary of any service that asks you to upload it to unknown servers.`,
          `This is the practical case for converting in the browser: the statement is read into your own device's memory and the spreadsheet is generated locally, so no copy of the file travels to a third party. Extend the same care to the result. Store the exported spreadsheet where you store the statement itself, password-protect shared copies, and when you send a statement to an accountant or lender, send only the pages or period they actually need.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Checking a running balance across three transactions',
        scenario: 'A statement opens at $3,240.10. The first rows are a salary credit of $2,850.00, a rent debit of $950.00 and a utilities debit of $132.47.',
        calculation: '$3,240.10 + $2,850.00 = $6,090.10; $6,090.10 − $950.00 = $5,140.10; $5,140.10 − $132.47 = $5,007.63.',
        result: 'Each step matches the printed balance, ending at $5,007.63 — the chain reconciles, so all three amounts were read correctly',
      },
      {
        title: 'Categorising a week of grocery spending',
        scenario: 'Three debit rows in the converted statement are grocery purchases of $82.14, $64.90 and $121.37, and you tag them with the category Groceries.',
        calculation: '$82.14 + $64.90 = $147.04; $147.04 + $121.37 = $268.41. A SUMIF over the category column returns the same total.',
        result: 'Groceries for the period total $268.41, ready to compare against budget or fold into a household spending report',
      },
    ],
    extraFaqs: [
      {
        question: 'My statement has one amount column instead of debit and credit. Can it still convert?',
        answer: 'Yes. Single-column statements carry the direction in the sign of the amount or in a marker such as DR for debits. The conversion splits the column into separate debit and credit columns based on that sign, which is the layout accounting software expects. Verify the split with two transactions whose direction you know — a salary payment and a card purchase — before relying on the full sheet.',
      },
      {
        question: 'Why does the running balance stop matching halfway down the sheet?',
        answer: 'Almost always one of three causes: an amount was misread at the row where the difference first appears, a transaction row was dropped or duplicated there — page breaks are the usual place — or a debit was recorded as a credit. Find the last row where the balance matches, then compare the next few rows against the statement itself. The size of the difference identifies the culprit row.',
      },
      {
        question: 'Should I remove my account number from the file before converting?',
        answer: 'For this tool there is no need: the statement is processed in your own browser memory and is not uploaded, so the account number goes nowhere. The caution applies to the exported spreadsheet instead. If you share it — with an accountant, a colleague or a lender — consider whether they need the full account number at all, and use a copy with it removed for wider circulation.',
      },
    ],
  },

  // ============================================================
  // RECEIPT TO EXPENSE
  // ============================================================
  'receipt-to-expense': {
    howItWorksExtended: `Receipts arrive in worse shape than invoices: thermal prints, photographs taken at an angle, totals in different positions on every retailer's layout. The converter therefore separates what it can read confidently — vendor name, date, total, any tax line — from the fields that genuinely need a human decision, above all the expense category and the business purpose. The spreadsheet it builds is a log rather than a copy: one row per receipt, with subtotal, tax and payment method as their own columns, and running category subtotals computed as ordinary spreadsheet formulas, so correcting a row updates every total that depends on it instead of leaving stale typed-in figures behind.`,
    guide: [
      {
        heading: 'What turns a receipt into an expense record',
        paragraphs: [
          `A receipt on its own proves that money was spent; an expense record also shows why. The fields that matter are the date, the vendor, what was bought, the total, any tax included in that total, and how it was paid — your card, a company card, or cash you will claim back. The one field no converter can supply is the business purpose, and it is the one most likely to be questioned later: add a short note while you still remember.`,
          `Itemised receipts are worth more than card slips. A card slip shows only a total at a vendor; an itemised receipt shows what the total bought, which is what lets you — or a manager, or an accountant — judge whether the expense belongs in the category claimed for it. When a vendor offers both, keep the itemised version as the record and let the spreadsheet row carry its total.`,
        ],
      },
      {
        heading: 'Categories that stay useful at year end',
        paragraphs: [
          `A category list should be short, stable and matched to how the business actually spends. Meals, travel, accommodation, software, office supplies, fuel and professional services cover most small businesses. The discipline is in refusing to improvise: a new category invented for one receipt in March will be forgotten by June, its spending scattered, and the year-end totals will understate both categories it overlaps.`,
          `The two failure modes sit at opposite extremes. Too many categories — thirty or forty — makes logging slow and inconsistent, because similar purchases land in different buckets depending on the day. Too few, and one giant 'miscellaneous' category swallows everything interesting, hiding exactly the patterns an expense log exists to reveal. Ten to fifteen categories, reviewed once a year, is the range that tends to survive contact with real bookkeeping.`,
        ],
      },
      {
        heading: 'Tax and record-keeping, in general terms',
        paragraphs: [
          `In general terms, business expense records serve two audiences: your own accounts, and the tax authority of your country, which may allow some categories of spending to be deducted or some sales tax to be reclaimed and will expect evidence for both. The spreadsheet is the index to that evidence, not the evidence itself. The receipts behind the rows are what substantiate a claim, so the two must be kept together and the rows must match the documents.`,
          `Beyond that, honest generalities run out quickly. Which expenses are deductible, what tax can be reclaimed, how long records must be kept and what form they must take are all set by local rules that differ between countries and change over time. Treat anything here as orientation only, organise your records completely and consistently, and confirm the specific rules that apply to your business with your local tax authority's published guidance or an accountant.`,
        ],
      },
      {
        heading: 'Photographing and scanning receipts well',
        paragraphs: [
          `Most receipt-reading failures are photographic, not technical. Shoot straight down rather than at an angle, fill the frame with the receipt, keep it flat — curled thermal paper bends the text lines — and use plain, even light without flash glare on glossy paper. Check the result at full size before you throw anything away: the vendor name, date and total must be legible to your eye, because no software reads a blur better than you can.`,
          `Thermal receipts add a deadline. The print on till rolls fades with heat, sunlight and time, and a receipt that is readable in January can be a blank slip by the following year. Capture receipts the week you receive them, name the image files with the date and vendor so they can be matched to spreadsheet rows, and keep the paper originals in a simple monthly envelope as a fallback for anything that fades.`,
        ],
      },
      {
        heading: 'A monthly expense routine that sticks',
        paragraphs: [
          `Expense logging fails when it is saved up. A month of receipts reconstructed from a wallet in one sitting produces guessed purposes and missed items. The routine that survives is small and weekly: empty the week's receipts into the converter, add categories and purpose notes in one short session, and file the paper. Fifteen minutes a week replaces the miserable half-day at month end, and the records are better because they were written down while the spending was remembered.`,
          `At month end, the spreadsheet closes the loop: total by category, total tax paid, total spent per payment method, and a separate sum of anything you paid personally and need reimbursed. Compare the reimbursement total against what was actually repaid, and keep the exported workbook with the month's receipt images in one folder. That folder, complete and self-explanatory, is what an accountant or an employer actually wants to receive.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Logging a conference trip as one expense batch',
        scenario: 'Four receipts from one trip: hotel $412.60, flight $238.90, meals $96.45 and taxis $54.00. The hotel bill states its price includes 10% tax.',
        calculation: 'Trip total: $412.60 + $238.90 + $96.45 + $54.00 = $801.95. Tax inside the hotel bill: $412.60 × 10/110 = $37.51.',
        result: 'One claim of $801.95 across travel, accommodation and meals, with $37.51 of included tax identified on the hotel row',
      },
      {
        title: 'Totalling a month of small office supplies',
        scenario: 'Three supply receipts during the month come to $23.47, $58.20 and $16.99, all categorised as Office Supplies.',
        calculation: '$23.47 + $58.20 = $81.67; $81.67 + $16.99 = $98.66.',
        result: 'Office Supplies category total for the month: $98.66 — small purchases that are easy to lose add up to a real figure',
      },
    ],
    extraFaqs: [
      {
        question: 'The total on my receipt has faded and cannot be read. What can I do?',
        answer: 'Reconstruct the amount from a second source, and say so. A card or bank statement shows the sum and date for the same purchase; pair that line with the faded receipt and note in the sheet that the total was confirmed from the statement. Keep the faded original rather than discarding it — a partial document plus a matching statement line is stronger evidence than either alone.',
      },
      {
        question: 'Can one receipt be split across two expense categories?',
        answer: 'Yes, and for mixed purchases it is the correct treatment. A supermarket receipt covering both office supplies and client refreshments becomes two rows: one per category, each with its share of the total. The two shares must add back to the receipt total exactly, including a sensible split of any tax. Note the receipt number or filename on both rows so the split can be reassembled and audited later.',
      },
      {
        question: 'How long should I keep the original receipts after logging them?',
        answer: 'Keep them for as long as your local tax rules require supporting records to be retained, which in many countries is a period of years rather than months. A spreadsheet entry alone may not count as evidence in place of the document. Keeping clear digital images alongside the paper originals, organised by month, covers convenience and retention in most situations, but confirm the specific period that applies locally.',
      },
    ],
  },

  // ============================================================
  // PURCHASE ORDER TO EXCEL
  // ============================================================
  'purchase-order-to-excel': {
    howItWorksExtended: `A purchase order is a commitment document, and the extraction treats it that way: the header — PO number, supplier, order date, delivery date and delivery address — is captured once, while each ordered item becomes a spreadsheet row carrying its SKU, description, quantity, unit price and extended total. Extended totals are recomputed from quantity and unit price and checked against the printed line values, and the sum of the lines is checked against the printed order total, because a PO whose lines do not add to its total will cause a payment dispute months later. Tax and delivery charges, which some orders include and others exclude, are kept as separate labelled rows so the commitment figure is never silently mixed.`,
    guide: [
      {
        heading: 'Anatomy of a purchase order',
        paragraphs: [
          `A purchase order states who is buying, who is supplying, and exactly what has been agreed. Its header carries the PO number — the reference that will be quoted on the delivery note and the invoice — plus the order date, the buyer's and supplier's details, a delivery address and a requested delivery date. Below the header, the line items specify each product by SKU and description, with a quantity, a unit price and a line total.`,
          `The remaining elements are the ones disputes are made of: the currency, whether prices include or exclude tax, delivery charges, and the terms printed in small type at the foot — payment period, delivery conditions, and what happens with partial shipments. When a PO is converted to a spreadsheet, the header and terms should be preserved with the lines, not stripped away, because a bare list of items loses the very details that give the order its meaning.`,
        ],
      },
      {
        heading: 'From PO lines to a procurement spreadsheet',
        paragraphs: [
          `The natural shape of PO data in a spreadsheet is one row per line item, with the header data either repeated on each row or held on a summary sheet keyed by PO number. Repeating the PO number, supplier and delivery date on every row is the more practical choice for analysis: it lets you filter, sort and total across many orders without losing track of which order each line belongs to.`,
          `Add the calculated columns the document itself does not have. Extended line totals should be spreadsheet formulas — quantity multiplied by unit price — rather than typed values, so a corrected quantity updates the totals automatically. A received-quantity column and an outstanding-quantity column turn a static conversion into a live order tracker, and a status column per line lets one order be part-delivered without disguising that fact.`,
        ],
      },
      {
        heading: 'The three-way match: PO, delivery note and invoice',
        paragraphs: [
          `Accounts payable runs on a simple discipline called the three-way match. Before an invoice is paid, three documents are compared: the purchase order says what was agreed and at what price, the delivery note or goods-received record says what actually arrived, and the supplier's invoice says what is being charged. Payment is due only for the quantities that match across all three, at the prices the PO established.`,
          `The converted spreadsheet is where the match happens in practice. Put the ordered quantity and price beside the received quantity and the invoiced quantity and price, and let difference columns expose the mismatches: short deliveries, prices that crept above the PO, items invoiced that were never ordered. Each exception is resolved with the supplier before payment — afterwards, the same discrepancy becomes a slow negotiation about money already gone.`,
        ],
      },
      {
        heading: 'Delivery dates and open-order tracking',
        paragraphs: [
          `An order is open from the moment it is issued until every line is received and invoiced. Tracking that state across dozens of orders is where a spreadsheet earns its place: a delivery-due column sorted by date is a chasing list, showing which orders should have arrived, which are due this week, and which suppliers need a call. Lines delivered in parts should show the outstanding quantity, not just a vague 'partial' label.`,
          `Dates deserve care in conversion. The requested delivery date, any date the supplier confirmed, and the actual delivery date are three different facts, and collapsing them into one column destroys the record of whether the supplier performed on time. Keep all three. Over a few months, that history — promised versus actual, order by order — becomes the evidence base for renegotiating terms or moving volume to a more reliable supplier.`,
        ],
      },
      {
        heading: 'Reporting on purchasing',
        paragraphs: [
          `Once orders live in rows, questions that were previously unanswerable take a formula each. Total committed spend by supplier shows where purchasing volume — and negotiating leverage — sits. Spend by category or month shows whether buying is seasonal or drifting upward. Open commitment, the sum of lines ordered but not yet received, is the figure finance needs for cash-flow forecasting and the one most businesses cannot produce on demand.`,
          `Price history is the quietest win. The same SKU bought repeatedly appears at each order's unit price, and a scan down those rows reveals gradual increases that no single invoice would ever flag. A two-percent rise per order compounds into a serious margin leak over a year. Catching it needs nothing more exotic than the converted data, a sort by SKU and date, and the habit of looking.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Checking an order total from its lines',
        scenario: 'A PO lists 200 fasteners at $3.85, 50 hinges at $24.60 and 12 motors at $145.00, plus a delivery charge of $85.00.',
        calculation: 'Lines: 200 × $3.85 = $770.00; 50 × $24.60 = $1,230.00; 12 × $145.00 = $1,740.00. Subtotal: $770.00 + $1,230.00 + $1,740.00 = $3,740.00. With delivery: $3,740.00 + $85.00 = $3,825.00.',
        result: 'Total commitment $3,825.00, matching the printed order total — the lines and the total agree',
      },
      {
        title: 'A three-way match that catches a short delivery',
        scenario: 'The PO above ordered 200 fasteners at $3.85. The delivery note shows 196 received, but the supplier invoice bills for 200.',
        calculation: 'Value received: 196 × $3.85 = $754.60. Value billed: 200 × $3.85 = $770.00. Difference: 4 × $3.85 = $15.40.',
        result: 'Query $15.40 before paying: either 4 fasteners are still to follow, or the invoice needs a credit for the shortfall',
      },
    ],
    extraFaqs: [
      {
        question: 'What if the supplier changes a price after the PO was issued?',
        answer: 'The PO records the price agreed when the order was placed, and that is the figure the invoice should be matched against. If a supplier announces an increase, it applies to new orders, or to an amended PO both sides agree to. Never overwrite the original price: add the amended value in a new column with a note, so the record shows what was agreed and what changed.',
      },
      {
        question: 'Can one spreadsheet hold several purchase orders?',
        answer: 'Yes — that is the most useful arrangement. Keep one row per line item and repeat the PO number, supplier and delivery date on every row. The PO number column then groups any single order together with a filter, while the whole sheet can be totalled by supplier, month or status. Be disciplined about using the exact PO number as printed, because a mistyped number splits one order into two.',
      },
      {
        question: 'How do I track an order that is only partly delivered?',
        answer: 'Add two columns beside the ordered quantity: quantity received and quantity outstanding, with the outstanding figure as a formula — ordered minus received. Update the received figure at each delivery, including the delivery date and note reference. A line is complete only when outstanding reaches zero. This keeps part-delivered orders open instead of being marked done, and the sum of outstanding lines is your open commitment at any moment.',
      },
    ],
  },

  // ============================================================
  // INVOICE GENERATOR
  // ============================================================
  'invoice-generator': {
    howItWorksExtended: `The generator's arithmetic is deliberately ordinary, and that is the point: line totals are quantity multiplied by unit price, the subtotal is the sum of the lines, any discount is applied to the subtotal, tax is calculated on the discounted figure, and the grand total is the result. Keeping that order fixed matters, because applying tax before a discount produces a different — and usually wrong — total. The other half of the tool is presentational: the same figures are laid out as a formal document with the seller's and buyer's details, invoice number, dates and payment instructions positioned where a customer or an accountant instinctively looks for them.`,
    guide: [
      {
        heading: 'What a complete invoice should contain',
        paragraphs: [
          `As a matter of general good practice, an invoice should let a stranger reconstruct the entire transaction. That means the seller's name, address and contact details; the buyer's name and address; a unique invoice number; the date the invoice is issued and, where different, the date the goods or services were supplied; an itemised description of what is being charged for; and the amounts — subtotal, any tax, and the total due — shown clearly.`,
          `Two elements are forgotten most often. The first is payment instructions: the account or method the customer should actually pay, since an invoice without them waits while the customer asks. The second is any reference the customer needs in order to pay you at all — many companies cannot process an invoice that lacks their purchase order number. What the law in your country additionally requires can vary; the list above is sound practice everywhere, not a legal checklist.`,
        ],
      },
      {
        heading: 'Numbering that never repeats',
        paragraphs: [
          `Invoice numbers exist so that every invoice can be referred to unambiguously — by you, by the customer, and by anyone auditing either business. The only real rules are that numbers must be unique and should follow a sequence without unexplained gaps. A simple running number works; adding a year or month prefix, such as 2026-014, keeps the sequence readable as the business grows and makes the age of an invoice visible at a glance.`,
          `The temptation to avoid is reusing numbers. When an invoice is cancelled, do not delete it and give its number to the next customer: mark it void or cancelled and keep it in the sequence. A gap with a voided invoice behind it is explainable in seconds. A duplicate number — two different invoices claiming to be number 014 — is a small mystery that undermines trust in every other figure you present.`,
        ],
      },
      {
        heading: 'Line items, tax and discounts, shown clearly',
        paragraphs: [
          `A line item earns its place by being checkable: a description specific enough to recognise, a quantity, a unit price and the line total. 'Services rendered: $3,000' invites a query; 'Consulting, 12 hours at $250, week of 6 May' does not. Where items are taxed at different rates, show the rate on each line and summarise the tax per rate, so the customer's own bookkeeping can mirror yours without guesswork.`,
          `Discounts belong before tax, and the invoice should show the working: subtotal, the discount as its own visible line, the reduced subtotal, then tax on that figure, then the total. A discount folded silently into unit prices makes the invoice impossible to reconcile with the quote the customer accepted. Equally, never present a single unexplained total — every figure on the document should be derivable from the figures above it.`,
        ],
      },
      {
        heading: 'Payment terms that get invoices paid',
        paragraphs: [
          `State the due date as a date, not only as a phrase. 'Net 30' means thirty days from the invoice date, but customers routinely misread, misremember or quietly reinterpret terms; 'Due 14 June' cannot be misunderstood. Pair the date with complete payment details and the invoice number you want quoted on the payment, and the customer has everything needed to pay you in one sitting — the moment most invoices are actually settled.`,
          `Late payment is best handled by wording agreed before the work began, in the quote or terms the customer accepted, rather than invented on an overdue invoice. A neutral formulation states the fact and the consequence: that payment is due by the date shown, and that overdue amounts may incur the fee or interest set out in your agreed terms. Keep reminders factual and courteous; they are usually read by someone who simply needs the invoice re-sent.`,
        ],
      },
      {
        heading: 'After you send it: tracking and copies',
        paragraphs: [
          `An invoice is not finished when it is sent; it is finished when it is paid. Keep a simple record — a list or spreadsheet — of every invoice number, customer, date, amount and status: sent, paid, or overdue. That list is what turns 'I think they paid most of them' into a cash-flow position you can act on, and it is where a polite chase-up starts when a due date passes without payment.`,
          `Keep your copy of every invoice as issued, in a folder organised by month or by number. If a customer disputes a figure or an accountant samples a transaction two years later, the copy is your evidence. Corrections never edit that copy: if an issued invoice is wrong, the professional route is a credit note cancelling it and a fresh invoice with a new number, so the paper trail shows what happened and when.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'A services invoice with discount and tax',
        scenario: 'You invoice a design project: 15 hours at $70 per hour, plus $120 of licensed stock images. You offer a 10% discount, and tax is 20%.',
        calculation: 'Services: 15 × $70 = $1,050. Subtotal: $1,050 + $120 = $1,170. Discount: 10% of $1,170 = $117, leaving $1,053. Tax: 20% of $1,053 = $210.60. Total: $1,053 + $210.60 = $1,263.60.',
        result: 'Invoice total $1,263.60, with the discount applied before tax and every step visible on the document',
      },
      {
        title: 'Showing a deposit already paid',
        scenario: 'An invoice totals $2,400. The customer already paid a 30% deposit when the work was commissioned, and the invoice must show what remains due.',
        calculation: 'Deposit: 30% of $2,400 = $720. Balance: $2,400 − $720 = $1,680.',
        result: 'The invoice states the full $2,400, lists the $720 deposit as a paid line, and shows a balance due of $1,680',
      },
    ],
    extraFaqs: [
      {
        question: 'I found a mistake on an invoice I already sent. Should I just edit and resend it?',
        answer: 'No — altering an issued invoice destroys its value as a record, and your customer may already have filed the original. The clean practice is to issue a credit note that cancels the incorrect invoice in full, then a new invoice with a fresh number and the corrected figures. Explain the swap in one line to the customer. Both documents stay in your records, and the trail shows what happened.',
      },
      {
        question: 'What due date should I put on an invoice?',
        answer: `Use the terms you agreed before the work started, and print the calendar date as well as the term. Common arrangements are payment on receipt, 14 days or 30 days from the invoice date. Shorter terms suit small one-off jobs; longer terms are the price of working with larger organisations. Invoice promptly — a late-sent invoice with short terms is paid later than a prompt one with standard terms.`,
      },
      {
        question: 'Can I invoice in a currency different from the one I quoted in?',
        answer: `You can, but only by agreement, and the invoice must state the currency next to every total so there is no doubt what is owed. If a conversion is involved, name the rate or the basis for it on the document, because exchange rates move and a conversion invites a dispute about which day's rate applied. Most businesses avoid this by invoicing in the currency the price was agreed in.`,
      },
    ],
  },

  // ============================================================
  // QUOTE GENERATOR
  // ============================================================
  'quote-generator': {
    howItWorksExtended: `A quote is a priced promise, so the generator treats scope and arithmetic as equally important. Line items are structured like invoice lines — description, quantity, unit price, line total — and summed into the quote total, with optional items kept visibly separate so the headline figure is always the price of the core work alone. Around those numbers the document assembles the elements that make a quote usable as an agreement: issue date and validity date, the terms, the assumptions and exclusions, and an acceptance block with signature and date lines, so the same document that proposed the price can become the record that it was accepted.`,
    guide: [
      {
        heading: 'Quote, estimate or invoice: three different documents',
        paragraphs: [
          `The three documents form a sequence, and confusing them causes real friction. An estimate is an informed approximation — a likely price range given before the details are fully known, expected to move as the work is defined. A quote, or quotation, is a firm offer: a stated price for a stated scope, valid for a stated period, which the customer can accept and hold you to. An invoice comes afterwards and requests payment for work done or due.`,
          `The practical difference is commitment. Sending a document called a quote while thinking of it as a rough estimate is the classic small-business trap: the customer accepts in good faith, and the argument about what the price really was arrives with the work half done. Choose the word that matches your intention. If quantities or conditions might change, label the document an estimate and say what would move the price; if the price is firm, quote it and stand behind it.`,
        ],
      },
      {
        heading: 'Validity periods protect both sides',
        paragraphs: [
          `Every quote should carry an expiry date. Prices beneath your price move: materials are repriced, subcontractors revise rates, and your own diary fills up, so a price that was right in March may be impossible in June. A validity period of two to four weeks is common for services, shorter where materials dominate. The date should be printed on the document itself — 'valid until 30 April' — not left to whatever was said in conversation.`,
          `Expiry protects the customer as well. It tells them the decision has a deadline but also that an acceptance within the period locks the price, even if your costs rise afterwards. When a quote lapses unaccepted, reissue it with a new number and date rather than quietly extending the old one; the fresh document removes any doubt about which prices and terms were actually offered and accepted.`,
        ],
      },
      {
        heading: 'Scope wording that prevents disputes',
        paragraphs: [
          `Most quote disputes are not about money; they are about what the money was understood to buy. Write scope as a list of deliverables a stranger could verify: not 'website work' but 'design and build of a five-page website, including contact form and map, using text and images supplied by the client'. Quantities, rounds of revision and named inclusions belong in the document, because they are the substance of what the customer will later check the finished work against.`,
          `Exclusions deserve the same clarity, stated plainly rather than buried: what is not included, what the client must supply, and which assumptions the price rests on — access to the site, existing content being reusable, no structural work. A short 'not included' list feels blunt while you are writing it and merciful when a customer asks for the extra that was never priced. Assumptions discovered to be wrong mid-project are then a factual change to discuss, not an accusation.`,
        ],
      },
      {
        heading: 'Acceptance and sign-off turn a quote into an agreement',
        paragraphs: [
          `A quote does its job when the customer's acceptance is captured on it: a signature or authorised name, the date, and ideally the printed statement that signing accepts the scope, price and terms as written. That single block transforms the document from marketing material into the reference both sides use for the whole engagement. For business customers acting through email, a clear written acceptance referencing the quote number serves the same purpose — keep it with the quote.`,
          `Acceptance is also the natural trigger for the next steps: any deposit invoice is raised against the accepted quote, the work is scheduled, and the quote's scope becomes the checklist the work is managed against. If the customer signs a version and then asks to change it, do not amend the signed document. Issue a variation or a superseding quote, get it accepted the same way, and let the file show how the agreement evolved.`,
        ],
      },
      {
        heading: 'From accepted quote to invoice without retyping',
        paragraphs: [
          `The line items on an accepted quote are the line items of the eventual invoice — same descriptions, same quantities, same prices. Carrying them across unchanged is more than a time saving: it guarantees the customer can compare the invoice against the document they signed, line by line, and find no surprises. Any difference between the two documents should be a difference the customer has already agreed in writing as a variation.`,
          `Reference the quote number on the invoice, and split the billing the way the quote or terms promised: a deposit percentage invoiced on acceptance, progress invoices at agreed milestones, and a final invoice on completion. Each invoice should state how much of the total it represents and how much remains, so the customer can see the whole engagement in every document, not just the slice being billed that day.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Totalling a phased project quote',
        scenario: 'A website project is quoted in four phases: discovery $600, design $2,400, development $3,800 and content migration $700. An optional training session at $450 is listed separately.',
        calculation: 'Core total: $600 + $2,400 = $3,000; $3,000 + $3,800 = $6,800; $6,800 + $700 = $7,500. The optional $450 is excluded from the headline total.',
        result: 'Quote total $7,500 for the core scope, with the $450 option priced but clearly outside the figure the customer is accepting',
      },
      {
        title: 'Turning an accepted quote into a payment schedule',
        scenario: 'The $7,500 quote is accepted, on terms of 40% deposit, 40% at design sign-off and 20% on launch.',
        calculation: 'Deposit: 40% of $7,500 = $3,000. Design sign-off: 40% of $7,500 = $3,000. Launch: 20% of $7,500 = $1,500. Check: $3,000 + $3,000 + $1,500 = $7,500.',
        result: 'Three invoices of $3,000, $3,000 and $1,500 reproduce the quote total exactly, each tied to a milestone the customer can verify',
      },
    ],
    extraFaqs: [
      {
        question: 'How long should I keep a quote valid?',
        answer: 'Match the period to how stable your costs are. For services priced mainly on your own time, thirty days is a common and comfortable default. Where the price depends on materials, venues or subcontractors who can reprice quickly, fourteen days or less is more realistic. Print the actual expiry date on the quote rather than the number of days, so there is never an argument about when the clock started.',
      },
      {
        question: 'A client accepted my quote verbally. Is that enough to start?',
        answer: 'Risky for anything beyond trivial work, because memories of the conversation will differ the moment scope is disputed. Ask for acceptance in writing — a signature on the quote, or an email naming the quote number and total — before starting or ordering materials. If work must begin immediately, confirm the acceptance, scope and price in a message the same day and ask the client to reply confirming it.',
      },
      {
        question: 'The project changed after the quote was accepted. What happens to the price?',
        answer: 'The accepted quote governs the original scope; the change is handled as a variation. Describe the extra or altered work, price it, and have it accepted in writing before doing it — even as a one-line document. Raising the change on the final invoice guarantees a dispute, because the customer compares against the figure they agreed. Variations filed with the quote keep the total honest on both sides.',
      },
    ],
  },

  // ============================================================
  // RECEIPT GENERATOR
  // ============================================================
  'receipt-generator': {
    howItWorksExtended: `A receipt is a closed transaction rendered as a document, so the generator works backwards from the payment: the items and tax are totalled exactly as on an invoice, and then the payment itself is recorded — amount tendered, method, date and time, and the transaction or authorisation reference — with the balance due shown as zero. The receipt number is issued from your own sequence, and the paid status is part of the document's design rather than a note added later, because the entire purpose of the document is to be produced later, by the customer, as proof that this specific payment happened.`,
    guide: [
      {
        heading: 'A receipt proves payment; an invoice requests it',
        paragraphs: [
          `The two documents are bookends of the same transaction. An invoice is issued before or at the point of sale and asks for money: it states what is owed and by when. A receipt is issued after the money moves and confirms that it did: it states what was paid, how, and when, and that nothing remains outstanding for that transaction. Sending one where the other belongs confuses both parties' records.`,
          `The timing matters for bookkeeping on both sides. The customer's expense record hangs off the receipt, because it is the document that evidences the payment itself; the seller's sales record starts with the invoice and is closed by the payment the receipt describes. In many small transactions — a shop sale paid on the spot — the receipt is the only document that ever exists, and it does the work of both, which is why it must be complete in itself.`,
        ],
      },
      {
        heading: 'Elements of a trustworthy receipt',
        paragraphs: [
          `A receipt convinces because it is specific. It should name the merchant with address and contact details, carry its own receipt number and the date — and for point-of-sale transactions, the time — itemise what was bought with quantities and prices, and show the subtotal, any tax, and the total. Above all it records the payment: the amount, the method, and the change given if cash was tendered, so the arithmetic of the transaction can be re-performed from the document alone.`,
          `Vague receipts fail their only job. A slip that shows just a total and a first name cannot be matched to a bank statement, cannot support an expense claim, and cannot settle a disagreement about what was bought. When you generate receipts, treat completeness as the product: a stranger, two years from now, with no memory of the sale, should be able to reconstruct who paid whom, for what, and how — entirely from the paper.`,
        ],
      },
      {
        heading: 'Transaction IDs and card references',
        paragraphs: [
          `For card and electronic payments, the transaction reference is the receipt's most valuable field. The authorisation code or transaction ID ties the paper to the processor's record and to the line on both parties' bank statements, allowing any of the three to be found from any other. Record it exactly as the terminal or payment provider issued it; a mistyped reference is nearly as useless as a missing one.`,
          `Card details themselves follow a strict convention: show at most the last four digits of the card number, which is enough for the customer to recognise which card they used. A full card number should never be printed on a customer receipt or stored in your receipt records — it is a security risk to the customer and a liability for you, and no legitimate record-keeping purpose requires it. The brand of card and the last four digits identify the payment completely.`,
        ],
      },
      {
        heading: 'Refunds, corrections and reprints',
        paragraphs: [
          `Payments sometimes have to be unwound, and the paperwork should show it. A refund is a new transaction, not an edit to the old receipt: issue a refund receipt or credit document with its own number, its own date, and a reference to the original receipt number, so the pair together tell the story. Deleting or altering the original receipt leaves the customer's copy contradicting your records, which helps nobody in a dispute.`,
          `Reprints are simpler but follow the same logic. When a customer loses a receipt, reissue it from your records with the same receipt number, amounts and transaction reference, and mark it clearly as a duplicate or copy. The marking costs nothing and prevents the same purchase appearing twice — in an expense claim, for instance — which is precisely the accident an honest customer wants to avoid as much as you do.`,
        ],
      },
      {
        heading: 'Keeping receipts: an organised habit, in general terms',
        paragraphs: [
          `How long receipts must be kept is set by the rules of your country and your situation — as an employee, a sole trader or a company — and periods of several years are common for records that support tax filings. This page cannot state the period that applies to you; what it can say is that organisation decides whether retention is painless. Receipts kept in date order, in a single sequence, digital or paper, are retrievable; receipts scattered across email, drawers and gloveboxes are effectively already lost.`,
          `A workable general practice: generate receipts into a folder per month, keep the sequence unbroken, and back the folder up with the rest of your business records. For customers, advise keeping receipts at least until the payment has been matched on a statement and any warranty or returns period on the purchase has passed — and longer where the receipt supports a tax or expense record of their own.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'A retail receipt with tax and change',
        scenario: 'A customer buys two items at $24.99 and one at $15.50. Sales tax is 8.5%, and the customer pays with a $80 bill.',
        calculation: 'Items: 2 × $24.99 = $49.98; $49.98 + $15.50 = $65.48 subtotal. Tax: 8.5% of $65.48 = $5.57 (rounded). Total: $65.48 + $5.57 = $71.05. Change: $80.00 − $71.05 = $8.95.',
        result: 'Receipt shows a total of $71.05 paid in cash with $8.95 change — every figure on it can be re-derived from the items listed',
      },
      {
        title: 'Issuing a refund against an earlier receipt',
        scenario: 'A customer returns one unopened item priced at $40.00, on which 10% tax of $4.00 was charged, and presents the original receipt.',
        calculation: 'Refund: $40.00 item + $4.00 tax = $44.00 returned to the original payment method.',
        result: 'A refund receipt for $44.00 is issued with its own number, referencing the original receipt number so the sale and its reversal stay linked',
      },
    ],
    extraFaqs: [
      {
        question: 'Should a receipt ever show the customer’s full card number?',
        answer: 'No. The convention is to print the card brand and at most the last four digits — enough for the customer to recognise which card was used, useless to anyone who finds the receipt. A card number on a receipt is a security risk for the customer and a data-protection liability for the business. If a payment system produces one, that setting should be changed, not the receipt explained away.',
      },
      {
        question: 'A customer lost their receipt. Can I issue another one?',
        answer: 'Yes — reprint it from your records with the identical receipt number, date, amounts and transaction reference, and mark it as a duplicate or copy. Never create a fresh receipt with a new number for an old sale, because two original receipts for one purchase can be misused in an expense claim or a return. The duplicate marking keeps the reissue honest while restoring the customer’s proof of payment.',
      },
      {
        question: 'Is a receipt enough evidence for a customer’s expense claim?',
        answer: 'Usually an itemised receipt is the standard evidence for an expense claim, because it shows the vendor, the date, what was bought and the tax. Some employers and some categories of spending — larger purchases, or costs claimed against tax — call for a tax invoice as well. If a customer asks for both, issue both; they record different things, and providing them at the point of sale takes seconds.',
      },
    ],
  },

  // ============================================================
  // BUSINESS QR GENERATOR
  // ============================================================
  'business-qr-generator': {
    howItWorksExtended: `A QR code is simply text encoded as a pattern, and the generator's first job is to format that text correctly for each payload type: a URL as-is, WiFi credentials in the structured WIFI format phones recognise, contact details as a vCard block. The text is then encoded using the ISO QR standard: the data is converted, error-correction codewords are added at the level you choose, and the result is laid out as a grid of modules with the finder patterns in three corners. Because the code is static — the data itself, not a pointer to a server — it works forever, works offline, and can never be redirected later, which shapes every recommendation in the guide below.`,
    guide: [
      {
        heading: 'What a QR code actually encodes',
        paragraphs: [
          `Everything a QR code does follows from one fact: it is a printed container for a short piece of text. For a website code, the text is the URL itself. For WiFi, it is a structured string naming the network, its security type and its password, which the phone parses into a join prompt. For a contact card, it is a vCard — a standard block of fields for name, organisation, phone, email and address that the phone offers to save as a contact.`,
          `The container has limits. A QR code can hold, at most, a few thousand characters, and far fewer in practice if it must stay easy to scan: every additional character adds modules to the grid, making it denser and harder for cameras — especially printed small or in poor light. This is why the payload should be as short as the job allows, a theme the URL section below returns to. The code holds data; it holds nothing else — no tracking, no expiry, no behaviour.`,
        ],
      },
      {
        heading: 'Error correction: the L, M, Q and H levels',
        paragraphs: [
          `QR codes survive damage because they carry spare data. Error correction adds redundant codewords that let a scanner reconstruct the payload even when part of the code is obscured, dirty or torn. There are four standard levels, and the figures are well established: L recovers from roughly 7% damage, M from about 15%, Q from about 25%, and H from about 30% of the code being unreadable.`,
          `The trade-off is density: higher correction needs more modules, so the code becomes busier and, at a fixed print size, harder to scan in marginal conditions. Choose by environment. A crisp code on a screen or a clean leaflet is fine at M. Outdoor signage, packaging that gets scuffed, and any code carrying a centred logo — where the logo deliberately covers part of the code — should use Q or H, and the logo should stay modest: correction is a safety margin, not space reserved for decoration.`,
        ],
      },
      {
        heading: 'Size, distance and print quality',
        paragraphs: [
          `The working rule of thumb links size to scanning distance: a code is comfortably scanned from about ten times its width. A QR code 2.5 centimetres wide on a business card is therefore scanned at around 25 centimetres — exactly how a card is held. A poster meant to be scanned from two metres away needs a code at least 20 centimetres wide. Most failed codes in the wild are simply too small for the distance at which people stand.`,
          `Print quality matters as much as size. Produce the code at the resolution of the final print: as a guide, a 3-centimetre code printed at 300 dots per inch needs an image of at least about 354 × 354 pixels (3 cm is 1.18 inches; 1.18 × 300 ≈ 354). Preserve the quiet zone — the plain margin of about four modules around the code — keep the contrast strong and dark-on-light, and avoid printing across folds, curves or glossy surfaces that reflect light into the camera.`,
        ],
      },
      {
        heading: 'Point codes at short, stable URLs',
        paragraphs: [
          `A static QR code cannot be edited after printing, so its destination must be chosen for permanence. Link to a page on a domain you control and intend to keep, at an address that will not be reorganised next year. If the underlying page must move, a redirect on your own domain can carry the printed code to the new location; a code printed with a third-party short link depends on that service surviving and behaving, forever.`,
          `Short addresses are also easier codes. A 22-character URL encodes into a sparse grid that scans instantly at small sizes; a 90-character address full of parameters produces a dense block that needs size, light and a steady hand. Strip tracking parameters and session fragments from printed codes — add campaign tracking at the redirect or landing page instead, where it can be changed without reprinting anything.`,
        ],
      },
      {
        heading: 'Test like a customer before you print',
        paragraphs: [
          `Every code should be scanned, from the final artwork, at the final size, before anything goes to print. Test with more than one phone — an older device with a modest camera is the honest benchmark — and under the conditions of use: the lighting of the room, the distance of the reader, the angle of a window display. Check not only that the code scans, but what it does: the right page opens, the contact fields land in the right places, the WiFi password has no typo.`,
          `Print a single proof first, even for a digital run. Screens forgive what print does not: a code that looked crisp in the design file may sit over a photograph's busy patch, shrink below the intended size in layout, or lose its quiet zone to a trim edge. One proof, scanned in place, catches all of it for the cost of a single sheet — the cheapest quality check in the whole print process.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Sizing a QR code for a shop-window poster',
        scenario: 'Customers will scan a poster from the pavement, standing about 2 metres from the glass. You need the minimum comfortable code width.',
        calculation: 'Rule of thumb: scanning distance ≈ 10 × code width. Required width = 200 cm ÷ 10 = 20 cm.',
        result: 'Print the code at least 20 cm wide; a 5 cm code would demand the customer step to within half a metre of the glass',
      },
      {
        title: 'Checking an image is large enough for print',
        scenario: 'A code will be printed 3 cm wide on a leaflet produced at 300 DPI. You want to know the smallest image file that will print sharply.',
        calculation: '3 cm ÷ 2.54 = 1.18 inches. 1.18 × 300 DPI ≈ 354 pixels. The code image should be at least about 354 × 354 pixels.',
        result: 'Download or export the code at 354 pixels or larger — 1,000 × 1,000 gives a comfortable margin for the same 3 cm placement',
      },
    ],
    extraFaqs: [
      {
        question: 'Can I put my logo in the middle of a QR code?',
        answer: 'Yes, with care. Use a high error-correction level — Q or H — because the logo covers part of the code, and error correction lets scanners reconstruct the hidden portion. Keep the logo modest, about a fifth of the code’s area, on a plain patch, and never cover the corner finder patterns. Test the artwork on several phones: a code only the designer’s phone can read is a failed code.',
      },
      {
        question: 'Why won’t my printed QR code scan?',
        answer: 'Check the usual causes. Size first: comfortable scanning distance is about ten times the code’s width, and most failures are simply codes too small. Contrast next: coloured or reversed codes defeat many cameras, so dark modules on a light background are the reliable choice. Then check the quiet zone was not trimmed, surface is not glossy or curved, and the payload is not a very long, dense URL.',
      },
      {
        question: 'Can I change where a printed QR code leads afterwards?',
        answer: 'Not the code: a static QR encodes the URL, and what is printed is permanent. What you can change is the destination’s content or redirect. If the code points at your own domain, you can move the page, redirect the old address, and every printed code keeps working. That is why printed codes should point at your own domain rather than a link-shortening service you do not control.',
      },
    ],
  },
};
