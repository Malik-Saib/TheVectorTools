// Expanded editorial content for tool pages — batch B (converters,
// text & file tools). Complements src/data/toolContent.ts (batch A)
// and the base registry entries in toolsRegistry.ts. Each entry adds
// deeper methodology, a multi-section guide, extra worked examples
// and extra FAQs, in the same style as the pilot entries.

import { ToolContentEntry } from './toolContent';

export const TOOL_CONTENT_B: Record<string, ToolContentEntry> = {
  // ============================================================
  // UNIT CONVERTER
  // ============================================================
  'unit-converter': {
    howItWorksExtended: `Every conversion in a category runs through that category's base unit: the input is first expressed in the base unit using an exact factor, then converted out to the target unit. The factors are international definitions, not measurements that drift — since 1959 the inch has been defined as exactly 25.4 millimetres, and the avoirdupois pound as exactly 0.45359237 kilograms, so a mile is exactly 1,609.344 metres by construction. Temperature is the one exception to the ratio pattern: Celsius and Fahrenheit scales start at different zero points, so that conversion adds or subtracts an offset as well as scaling. Arithmetic is done at full double precision and rounding is applied only to the displayed result.`,
    guide: [
      {
        heading: 'Exact factors: conversions that are definitions, not measurements',
        paragraphs: [
          `Many everyday conversion factors look suspiciously tidy — 2.54 centimetres to the inch, 0.45359237 kilograms to the pound — because they are not approximations at all. In 1959 the English-speaking countries agreed to define the yard and the pound in metric terms, fixing the inch at exactly 25.4 millimetres and the pound at exactly 0.45359237 kilograms. Every imperial length and weight conversion used today is arithmetic built on those two definitions.`,
          `This matters because it means unit conversion, done properly, introduces no error of its own: 12 inches is exactly one foot, one foot is exactly 30.48 centimetres, and a result can be checked by hand to the last digit. Where real-world conversions do go wrong, the cause is almost never the factor — it is using the wrong unit variant, such as a US gallon instead of an imperial gallon, or rounding an intermediate step before the calculation is finished.`,
        ],
      },
      {
        heading: 'Metric prefixes: one ladder for every size',
        paragraphs: [
          `The metric system scales by powers of ten using a fixed set of prefixes: milli- is a thousandth, centi- a hundredth, kilo- a thousand, mega- a million. A kilometre is 1,000 metres, a millimetre is a thousandth of a metre, and the same prefixes apply unchanged to grams, litres, watts and bytes of storage. Once the ladder is memorised, most metric conversions are just decimal-point moves rather than multiplications.`,
          `The ladder also explains the conversions people most often get wrong by a factor of a thousand. A dose of 0.5 grams is 500 milligrams, not 50; a 2-litre bottle holds 2,000 millilitres. Area and volume hide an extra trap: because they are squared and cubed quantities, the prefix factor is squared or cubed too. One square metre is 10,000 square centimetres, not 100, because each of its two dimensions contributes a factor of 100.`,
        ],
      },
      {
        heading: 'Temperature: the conversion that breaks the pattern',
        paragraphs: [
          `Temperature conversions cannot be done by simple multiplication, because the Celsius and Fahrenheit scales disagree about both the size of a degree and the position of zero. The formulas repair both differences: Fahrenheit = Celsius × 9/5 + 32, and Celsius = (Fahrenheit − 32) × 5/9. The offset is why 0 °C is a mild 32 °F rather than 0 °F, and why −40 is the single point where the two scales agree exactly.`,
          ` Kelvin removes the offset problem for science: it uses Celsius-sized degrees but starts at absolute zero, so Kelvin = Celsius + 273.15, and no value can be negative. For everyday use the anchors are worth memorising: water freezes at 0 °C / 32 °F, room temperature sits near 20 °C / 68 °F, body temperature near 37 °C / 98.6 °F, and water boils at 100 °C / 212 °F at sea-level pressure.`,
        ],
      },
      {
        heading: 'Where precision matters: cooking, medicine and making things',
        paragraphs: [
          `A rounded conversion is fine for estimating luggage weight or journey distance, but three everyday domains punish sloppy factors. In cooking, oven temperatures tolerate a few degrees of slack, yet food-safety temperatures do not: poultry is cooked through at 74 °C / 165 °F, and a conversion that lands you at 65 °C because a chart was misread is a health risk rather than a culinary detail. Gas Mark adds a third scale that must be converted deliberately, never guessed.`,
          `Medicine is stricter still, because doses are often weight-based: a child dosed in milligrams per kilogram needs the weight converted with the exact pound factor, and a factor-of-ten slip between milligrams and micrograms is a known and dangerous error class. In workshops and engineering, tolerances are frequently specified in one system and machined in the other, so a drawing converted with 25 mm to the inch instead of 25.4 produces parts that visibly fail to fit.`,
        ],
      },
      {
        heading: 'Rounding: when 8.05 and 8.04672 are both right',
        paragraphs: [
          `Five miles is exactly 8.04672 kilometres by definition, yet a road sign, a running app and an engineering report will show 8.05, 8.05 and 8.04672 respectively — all correctly. Rounding is the deliberate discarding of digits that the situation cannot use: a runner cannot act on a ten-thousandth of a kilometre, while a surveyor chaining many measurements together keeps every digit until the final step, because rounding each leg early lets small errors accumulate into a visible miss.`,
          `The working rule is to round once, at the end, and to match the precision of the input. A measurement taken as 'about 5 miles' does not justify a six-decimal answer, and presenting one implies a confidence the measurement never had. When a converted figure feeds a second calculation — a dose, a price, a material quantity — carry the unrounded value forward and round only what you finally report or pay.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'A marathon distance in kilometres',
        scenario: 'A race is advertised as 26.2 miles and you want the metric figure runners usually quote.',
        calculation: 'Use the exact mile factor: 1 mile = 1.609344 km. Multiply: 26.2 × 1.609344 = 42.1648128 km. Rounded to two decimals: 42.16 km.',
        result: '26.2 miles ≈ 42.16 km — a shade under the official marathon distance of 42.195 km, because 26.2 is itself a rounded figure',
      },
      {
        title: 'Height from feet and inches to centimetres',
        scenario: 'A form asks for height in centimetres; your height is 5 feet 9 inches.',
        calculation: 'First combine into inches: 5 × 12 + 9 = 69 inches. Then apply the exact definition: 69 × 2.54 = 175.26 cm.',
        result: '5 ft 9 in = 175.26 cm — usually entered as 175 cm on forms that take whole centimetres',
      },
    ],
    extraFaqs: [
      {
        question: 'Why do two converters sometimes give slightly different answers?',
        answer: 'Usually because one rounds at an intermediate step or displays fewer decimals, not because the factors differ — the factors are fixed international definitions. A result of 8.05 km and one of 8.04672 km for five miles are the same number at different precision. If two tools disagree in an early digit, one of them is using a different unit variant, such as a US versus imperial gallon.',
      },
      {
        question: 'Is a US gallon the same as a UK gallon?',
        answer: 'No, and the difference is large enough to matter. A US liquid gallon is defined as 3.78541 litres, while the imperial gallon used historically in the UK is 4.54609 litres — about 20 percent bigger. This is why the same car posts different fuel-economy figures in the US and UK: the miles are the same, but the gallons underneath them are not.',
      },
      {
        question: 'How do I convert a speed like 100 km/h to mph?',
        answer: 'Speed is a compound unit, but the time part is identical on both sides, so only the distance converts. Divide by the mile factor: 100 ÷ 1.609344 = 62.137 mph, shown as about 62 mph. The converter’s speed category does exactly this. The same trick works in reverse for any per-hour or per-second rate: convert the measured quantity and leave the time unit untouched.',
      },
    ],
  },

  // ============================================================
  // TIME ZONE CONVERTER
  // ============================================================
  'time-zone-converter': {
    howItWorksExtended: `A named time zone is not a fixed offset: it is a bundle of rules — a standard offset, a daylight saving offset, the dates each applies, and a history of past changes made by governments. Conversion therefore happens for a specific date, not in the abstract. The converter resolves the chosen IANA zone (such as Europe/London or America/New_York) for your exact date using the browser's built-in time zone database, applies the offset that was in force at that moment, and only then shifts the clock reading. That is why the same 3:00 PM converts differently in January and July, and why conversions for dates years ahead carry a small caveat: a government can still change the rules.`,
    guide: [
      {
        heading: 'A UTC offset is a snapshot, not a time zone',
        paragraphs: [
          `Saying a city is 'UTC−5' describes it only at one moment. New York is UTC−5 in January and UTC−4 in July, because the zone America/New_York moves between Eastern Standard Time and Eastern Daylight Time. The offset is an output of the zone's rules for a given date, not a property of the place. Any conversion, note or calendar entry that stores only an offset quietly assumes the offset never changes — an assumption that fails twice a year.`,
          `This is why the converter asks you to pick named zones rather than offsets wherever possible. A named IANA zone carries its rules with it, including historical changes, so a conversion for a past date uses the rules that actually applied then. Two places can also share an offset while following different rules: Phoenix, Arizona sits at UTC−7 all year because it does not observe daylight saving, while Denver at the same winter offset moves to UTC−6 in summer.`,
        ],
      },
      {
        heading: 'Daylight saving mismatch weeks: when the US and Europe disagree',
        paragraphs: [
          `The United States and Europe both spring forward in March, but not on the same Sunday. The US moves on the second Sunday of March, Europe on the last Sunday — leaving two to three weeks when America has shifted and Europe has not. The usual five-hour difference between London and New York shrinks to four hours for those weeks, and recurring meetings booked by the clock drift an hour earlier or later for anyone on the other side of the Atlantic.`,
          `A shorter mismatch repeats in autumn: the US falls back on the first Sunday of November, Europe on the last Sunday of October, creating about a week of reduced difference again. Teams with standing transatlantic calls feel this four times a year. The practical defence is to schedule recurring international meetings in one named zone, state that zone in the invitation, and re-check the conversion for the specific weeks after each transition rather than trusting the usual difference.`,
        ],
      },
      {
        heading: `Why 'EST' is ambiguous for half the year`,
        paragraphs: [
          `Abbreviations like EST, CST and PST name the standard-time version of a zone only. EST strictly means Eastern Standard Time, UTC−5 — but from March to November the US East Coast is actually on EDT, UTC−4. Writing '3 PM EST' for a July meeting therefore says, taken literally, an hour later than most writers intend. The same trap applies to CST, which can also mean China Standard Time (UTC+8) or Cuba Standard Time, entirely different offsets sharing one abbreviation.`,
          `The unambiguous habit is to name the city or the IANA zone: '3 PM New York time' or '3 PM America/New_York' means whatever offset is in force on that date, which is what people actually mean. If an abbreviation is unavoidable, ET (Eastern Time) or PT signals 'whichever version is current' far better than EST or PST. A converter resolves this for you when you choose the city — one more reason to convert by place, not by abbreviation.`,
        ],
      },
      {
        heading: 'Planning meetings across zones without mistakes',
        paragraphs: [
          `Most scheduling errors come from converting the time but not the date, or from converting for the wrong week. Work from a concrete date, always: 'Tuesday 14:00 Berlin' is a checkable statement, while '14:00 Berlin time' is not. Convert with the date attached, then read back the result in both directions — if converting the answer back does not return your starting time and date, something (usually a daylight saving transition or a date-line crossing) has been missed.`,
          `For groups spread across three or more zones, anchor the meeting in the zone of the organiser and publish every participant's local time in the invitation, rather than expecting each person to convert a single stated time. Rotate the inconvenience deliberately when a slot is painful for one region, and be wary of the hours around midnight: a slot that is merely late for one team can silently be a different day for another, which is how Monday meetings get attended on Sunday.`,
        ],
      },
      {
        heading: 'The date line: when the converted time is tomorrow',
        paragraphs: [
          `Travelling far enough east or west changes the calendar day, not just the hour. Sydney runs 14 to 17 hours ahead of Los Angeles depending on the season, so a morning call in Sydney lands on the previous afternoon in California — the same conversation, two different dates. Tokyo is nine hours ahead of London in winter, turning a London morning meeting into a Tokyo evening one on the same day, but push the start to late London afternoon and Tokyo is already into the next morning.`,
          `The converter shows the target date alongside the time for exactly this reason, and it is the part people most often fail to check. Any time a conversion crosses the Pacific, or the difference exceeds roughly twelve hours, state the weekday in both places when you share the time: '09:00 Tuesday Sydney / 16:00 Monday Los Angeles' cannot be misread, while the times alone can. Flight itineraries deserve the same care — arrival 'the next day' is often just this arithmetic, not a longer flight.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'London to New York during a mismatch week',
        scenario: 'A call is set for 3:00 PM in London on 15 March 2026 — after the US has sprung forward (8 March) but before the UK does (29 March).',
        calculation: 'On that date London is still on GMT (UTC+0) while New York is already on EDT (UTC−4). Difference = 4 hours, not the usual 5. 15:00 − 4 hours = 11:00.',
        result: '3:00 PM London = 11:00 AM New York on 15 March 2026 — one hour later than the winter conversion of the same clock times',
      },
      {
        title: 'Sydney morning becomes Los Angeles afternoon — yesterday',
        scenario: 'A Sydney team schedules 9:00 AM on a Tuesday in July for a joint call with Los Angeles.',
        calculation: 'In July Sydney is on standard time (UTC+10) and Los Angeles on daylight time (UTC−7): a 17-hour difference. 09:00 Tuesday minus 17 hours = 16:00 on the previous day.',
        result: '9:00 AM Tuesday in Sydney = 4:00 PM Monday in Los Angeles — same call, different calendar day',
      },
    ],
    extraFaqs: [
      {
        question: 'Why did my converted time change when I picked a different date?',
        answer: 'Because the offset belongs to the date, not the city. Zones switch between standard and daylight offsets on set dates, so the same clock time converts with one offset in January and another in July. Around the spring and autumn transitions, even a few days either side of the change can produce a different answer, which is why the converter always asks for a full date.',
      },
      {
        question: 'What do offsets like UTC+5:30 mean?',
        answer: 'Not every zone sits on a whole hour. India keeps UTC+5:30 all year with no daylight saving, Iran uses UTC+3:30, and Nepal keeps UTC+5:45. These half- and quarter-hour offsets usually reflect a capital city’s solar position or a deliberate single-zone policy for a whole country. When converting, they mean the minutes change too: 12:00 UTC is 17:30 in India, not 17:00.',
      },
      {
        question: 'Should systems and logs store times in UTC?',
        answer: 'Yes — that is the standard practice for anything recorded by software. Storing the UTC instant removes all ambiguity about which offset applied, and each viewer’s software can render it in their local zone afterwards. The exception is future human appointments: a 9:00 AM daily meeting usually means 9:00 AM local even after a daylight saving change, so the zone name should be stored alongside it and converted per date.',
      },
    ],
  },

  // ============================================================
  // CHARACTER COUNTER
  // ============================================================
  'character-counter': {
    howItWorksExtended: `A character count sounds absolute but depends on what the counter treats as one character. JavaScript strings are sequences of UTF-16 code units, and most everyday characters occupy exactly one unit — but characters outside the basic set, including most emoji, occupy two units as a surrogate pair. Accented letters add another subtlety: an é can be stored as a single precomposed character or as a letter e plus a combining accent, displaying identically while counting differently. Newlines also vary: text pasted from Windows software may carry two code units per line break. This counter reports code units in real time for both the with-spaces and without-spaces figures, while each platform meter applies that platform's own counting rules — which is why the totals can legitimately differ.`,
    guide: [
      {
        heading: 'Why platforms count the same text differently',
        paragraphs: [
          `There is no universal definition of a character. A counter can tally bytes, UTF-16 code units, Unicode code points, or grapheme clusters — the units a reader perceives as single characters. For plain English text all four agree, which is why counts only diverge once emoji, accented letters or symbols enter the text. A single family emoji, for instance, is one visible symbol assembled from seven code points joined together, and different software stops counting at different layers of that stack.`,
          `Platforms add their own rules on top. X does not count raw characters at all: it applies a weighting in which some character ranges count double and every link is counted at a fixed length regardless of how long the pasted URL really is. Messaging apps may count a pasted link in full. When two counters disagree by a few characters, the cause is almost always one of these rule differences — neither tool is broken, they are answering slightly different questions.`,
        ],
      },
      {
        heading: 'The limits that matter: posts, captions and messages',
        paragraphs: [
          `The headline limits, as published by the platforms, are the ones drafts actually run into. X allows 280 weighted characters for a standard post. LinkedIn posts can run to 3,000 characters, though only the first couple of lines show before the 'see more' fold, so the effective limit for the hook is far shorter than the technical one. Instagram captions allow 2,200 characters, with hashtags commonly placed in the caption or the first comment.`,
          `Treat these as ceilings, not targets. A caption limit includes spaces, line breaks and hashtags, and a post that fits on one platform will not automatically fit another: a full-length LinkedIn draft is roughly ten X posts. The practical workflow is to draft once, then check the text against each destination's meter and trim per platform — cutting the hook for one service and expanding the detail for another — rather than writing to the tightest limit everywhere.`,
        ],
      },
      {
        heading: 'SMS: the 160-character rule, and when it becomes 70',
        paragraphs: [
          `Standard text messages are encoded in the GSM-7 alphabet, which covers basic Latin letters, digits and common punctuation, and a single SMS segment holds 160 such characters. Write longer and the message is silently split into concatenated segments of 153 characters each (space is reserved for reassembly instructions), and you are typically billed per segment — so a 320-character text usually costs three messages, not one long one.`,
          `The trap is encoding: introduce a character outside GSM-7 — an emoji, a curly apostrophe, many non-Latin scripts — and the whole message switches to Unicode encoding, where a single segment holds only 70 characters and concatenated segments hold 67. That is how a short, friendly text with one emoji becomes two billed segments. The counter's character total plus a glance at what characters you used predicts the segments far better than length alone.`,
        ],
      },
      {
        heading: 'Emoji, accents and the invisible characters',
        paragraphs: [
          `Emoji are the biggest source of counter disagreement. In UTF-16 terms most single emoji take two code units, and compound emoji take far more: skin-tone modifiers, profession symbols and family groupings are built by joining several emoji with a special zero-width joiner character that is itself counted by raw length functions. A flag emoji is two regional-indicator symbols. None of this is visible on screen, where each composition looks like exactly one small picture.`,
          `Accented text has a quieter version of the same issue. The letter é can exist as one precomposed code point or as e followed by a combining accent mark, and text copied from different sources — a PDF, a Mac keyboard, a web form — may mix both forms in one paragraph. Normalisation tools rewrite text into a single form; a counter simply reports the storage it was given, which is why two visually identical paragraphs can honestly return counts that differ by a handful of characters.`,
        ],
      },
      {
        heading: 'Titles and headlines: length as guidance, not law',
        paragraphs: [
          `Writers often meet character counts through search and publishing conventions: page titles begin truncating in search results at roughly 50–60 characters, and meta descriptions at roughly 150–160. These are display estimates, not ranking rules or hard limits — search engines actually cut by pixel width, rewrite descriptions freely, and happily index longer titles. Hitting the numbers exactly guarantees nothing; a clear title slightly over the guide length beats a mutilated one trimmed to fit it.`,
          `The same applies to headlines and subject lines. Email subjects are truncated by the mail client and the screen, with mobile inboxes showing far fewer characters than desktop ones, so the first 30–40 characters carry the message. Count characters to keep the essential words at the front and to stay consistent in style guides and forms with genuine hard limits — not to chase a magic number that no platform actually enforces.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Segments in a 200-character SMS',
        scenario: 'You draft a plain-text SMS announcement of 200 GSM-7 characters and want to know how many segments it sends as.',
        calculation: 'A single segment holds 160 characters; longer messages use concatenated segments of 153. Ceiling of 200 ÷ 153 = 2 segments (153 + 47).',
        result: 'The 200-character message is sent and billed as 2 SMS segments',
      },
      {
        title: 'How many characters is one family emoji?',
        scenario: 'A draft contains the family emoji 👨‍👩‍👧‍👦 and a raw counter jumps by far more than one.',
        calculation: 'The symbol joins 4 person emoji with 3 zero-width joiners. UTF-16 units: 4 emoji × 2 units = 8, plus 3 joiners × 1 unit = 3, totalling 11 units — while remaining a single code-point sequence of 7 and one visible glyph.',
        result: 'One visible emoji counts as 11 by UTF-16 length, 7 by code points, and 1 by grapheme clusters',
      },
    ],
    extraFaqs: [
      {
        question: 'Why does my phone call a 100-character text two messages?',
        answer: 'Almost certainly because of one special character. A plain GSM-7 text fits 160 characters per segment, but a single emoji, smart quote or non-Latin letter flips the entire message to Unicode encoding, where segments hold 70 characters. At 100 characters you then need two segments (70 + 30). Removing the special character, or accepting the second segment, are the only real fixes.',
      },
      {
        question: 'Does a pasted link count at its full length everywhere?',
        answer: 'No. On X, links are wrapped automatically and counted at a fixed length — 23 characters — no matter how long the original URL is, so a 90-character link costs the same as a short one. Most other platforms and this counter count the link as pasted, character for character. If a draft fits here but not on X, or the reverse, the link is the first place to look.',
      },
      {
        question: 'Do spaces and line breaks really count as characters?',
        answer: 'In the with-spaces figure, yes: a space is a stored character like any other, and a line break is one character (occasionally two in text copied from Windows applications, which use a carriage return plus a line feed). Platforms differ in whether they trim leading and trailing whitespace, which is why the without-spaces count is shown alongside — it is the figure that stays comparable between tools.',
      },
    ],
  },

  // ============================================================
  // JPG TO PDF
  // ============================================================
  'jpg-to-pdf': {
    howItWorksExtended: `Building the PDF means writing a page object for every image and embedding the image data as a stream inside it. PDF measures pages in points, where one point is 1/72 of an inch, so an A4 page is 595.28 × 841.89 points and US Letter is 612 × 792 points. For each image the generator computes a placement rectangle: the printable area (page minus margins) is compared with the image's aspect ratio, and the image is scaled to fit inside that area without distortion — never stretched. The image's pixel dimensions are stored alongside the placement, which is what determines print sharpness: a 3,000-pixel-wide photo placed 8 inches wide prints at about 375 DPI, while the same file placed across two pages would fall to half that.`,
    guide: [
      {
        heading: 'Page size, margins and fit: how an image becomes a page',
        paragraphs: [
          `A PDF page has a fixed physical size — A4 (210 × 297 mm) across most of the world, US Letter (8.5 × 11 in) in North America — and your image must be mapped onto it. The converter scales the image until it fits inside the page's printable area, preserving the aspect ratio, so a wide photo on a portrait page spans the width and leaves space above and below rather than being cropped or squeezed. Choosing the page size your printer and recipient actually use avoids a second, silent rescale at print time.`,
          `Margins are the breathing room subtracted before fitting. A small margin keeps home printers from clipping edges — most cannot print to the very edge of the sheet — and gives the page a deliberate, document-like look. Zero margin suits full-bleed artwork but risks cropped edges on paper. Because the image scales to whatever area remains, margins and page size together decide the printed size of your photo, and through that, its effective resolution.`,
        ],
      },
      {
        heading: 'Fit versus fill, and why the empty bands appear',
        paragraphs: [
          `Fit and fill are the two honest ways to place a rectangle inside a differently shaped rectangle. Fit (called contain in image software) shows the whole image and accepts empty bands where the shapes disagree — the white bars above and below a landscape photo on a portrait page. Fill (cover) eliminates the bands by enlarging the image until the page is covered, which necessarily crops whatever overflows, often exactly the receipt edge or signature you needed.`,
          `For documents, fit is almost always the correct choice: a merged PDF of receipts, certificates or form pages must show every pixel of every original, and the bands are simply background page. Fill has its place in photo books and presentations where cropping is an aesthetic decision. If a converter offers orientation set to automatic, it chooses portrait or landscape per image to minimise the empty area while still fitting the whole picture — a good default for mixed batches.`,
        ],
      },
      {
        heading: 'Order is content: arranging pages before you merge',
        paragraphs: [
          `A merged PDF reads in exactly the order the images were placed, and unlike loose files in a folder, the sequence cannot be reshuffled by the reader's file manager afterwards. For multi-page material the order is information: a contract with page three before page two, or expense receipts out of date order, creates real confusion for whoever reviews it. Spend the minute with the reorder controls before converting rather than apologising for the bundle afterwards.`,
          `File names are the usual source of disorder. Cameras and scanners name files by capture order or by counters that sort badly (IMG_10 before IMG_2 in a naive alphabetical sort), so the upload order may not be the reading order even when the files looked fine in a folder. A quick preview pass — checking that first and last pages are what you expect — catches nearly all of it. Consistent naming before upload, such as 01-application, 02-id, 03-statement, makes the order self-evident.`,
        ],
      },
      {
        heading: 'Print sharpness: effective DPI at the placed size',
        paragraphs: [
          `Sharpness on paper is governed by a simple quotient: the image's pixels divided by the inches they are spread across — its effective DPI at the placed size. A 3,000 × 2,000 phone photo placed to fill the width of an A4 page (about 8.27 inches) prints its width at roughly 363 DPI, comfortably above the 300 DPI benchmark for crisp print. Place the same photo across a two-page spread and the effective DPI halves, and text in the image starts to soften.`,
          `The same arithmetic explains disappointing results in reverse. A 800 × 600 image downloaded from a chat app, placed full-page, yields under 100 DPI — visibly pixelated on paper no matter which converter handled it, because the pixels simply are not there. No PDF setting can add detail the source lacks. For screen-only sharing, 150 DPI effective is plenty; for anything destined for a printer, run the division before you convert and resize expectations, or the page, to match.`,
        ],
      },
      {
        heading: 'An image container, not a document: the missing text layer',
        paragraphs: [
          `The PDF this tool produces stores your pages as pictures. A reader sees a perfectly normal document, but there is no text layer underneath: words cannot be selected, searched, copied or read aloud by a screen reader, because as far as the file is concerned there are no words, only coloured rectangles that look like them. This surprises people the first time Ctrl+F finds nothing in a document they can plainly read.`,
          `That distinction decides when this conversion is the right tool. For sharing scans, photos of whiteboards, signed pages or visual evidence, an image PDF is exactly what recipients expect, and it has the side benefit that the content cannot be casually edited. For contracts, reports or anything a recipient must search, quote or archive accessibly, keep or produce a text-based PDF instead — or run the image PDF through an OCR tool afterwards to add a recognised text layer.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Effective DPI of a phone photo on an A4 page',
        scenario: 'A 3,000 × 2,000 pixel photo is placed to fill the full width of an A4 page and you want to know if it will print sharply.',
        calculation: 'A4 width is 210 mm = 8.27 inches. Effective DPI = 3,000 ÷ 8.27 ≈ 363 DPI. The height occupies 2,000 ÷ 363 ≈ 5.5 inches of the page height.',
        result: 'About 363 DPI at the placed size — above the 300 DPI benchmark, so the page prints crisply',
      },
      {
        title: 'Estimating the merged file size',
        scenario: 'You merge 10 phone photos of about 3 MB each into one PDF for an expense claim with a 10 MB upload limit.',
        calculation: 'A PDF embedding JPEG images stores roughly the image data plus a small overhead: 10 × 3 MB ≈ 30 MB — over the limit. Re-exporting each photo at about 1 MB brings the total to 10 × 1 MB ≈ 10 MB.',
        result: 'As shot, the PDF lands near 30 MB; resizing or recompressing the photos first brings it to roughly the 10 MB target',
      },
    ],
    extraFaqs: [
      {
        question: 'Will the text in my PDF be searchable or copyable?',
        answer: 'No. Each page of the output is a picture of your image, without a text layer, so search, copy-paste and screen readers find nothing in it. That is normal for image-based PDFs like scans. If you need searchable text, run the finished PDF through an OCR tool, which recognises the lettering and adds an invisible text layer while keeping the page looking the same.',
      },
      {
        question: 'Can I mix portrait and landscape images in one PDF?',
        answer: 'Yes. With orientation set to automatic, each page adopts the orientation of its image, so a landscape spreadsheet screenshot gets a landscape page while portrait photos keep portrait pages, and nothing is rotated sideways or cropped. If your recipient will print the file, a single fixed orientation can be tidier, but for on-screen reading the mixed, per-image layout preserves every image at its largest sensible size.',
      },
      {
        question: 'How do I make the final PDF smaller?',
        answer: 'File size is almost entirely the images; the PDF wrapper itself is tiny. Reduce the sources before converting — resize very large photos to the size they will occupy on the page, or save them at a moderate JPEG quality — and the PDF shrinks in proportion. Splitting a long bundle into two PDFs also helps when a portal enforces an upload cap.',
      },
    ],
  },

  // ============================================================
  // IMAGE FORMAT CONVERTER
  // ============================================================
  'image-format-converter': {
    howItWorksExtended: `Conversion is a decode–redraw–encode pipeline. The browser first decodes your file into raw pixels in memory, draws those pixels onto a canvas at the image's natural dimensions, and then asks the canvas to encode the result in the target format. Everything that follows comes from that middle step: the pixels are all that survive. Any editing history, layers and most embedded metadata belong to the old file, not the pixel grid, so they do not carry across. The quality setting you choose is passed to the encoder and only means something for lossy formats (JPG, WebP, AVIF); a lossless encoder such as PNG ignores it, because by definition it must reproduce every pixel exactly, which is also why its files are larger.`,
    guide: [
      {
        heading: 'PNG: lossless, transparent and heavy',
        paragraphs: [
          `PNG compresses without discarding anything: decode a PNG and you get back every pixel exactly as it was saved, which is why it remains the default for screenshots, interface graphics, diagrams and logos. It also supports a full alpha channel, so transparency can be partial — soft shadows, anti-aliased edges and glows survive intact. For images with large flat areas and sharp edges, PNG compression is not just safer but efficient, often beating a high-quality JPG on its own turf.`,
          `The cost appears with photographs. A camera image holds millions of subtly different pixels with little repetition for the compressor to exploit, so a photographic PNG can be five to ten times the size of an equivalent-quality JPG. Keeping photos in PNG 'to be safe' buys no visible quality once the photo already exists as a JPG — the lossy step already happened — and simply multiplies storage and page weight.`,
        ],
      },
      {
        heading: 'JPG: the photograph format, with no transparency',
        paragraphs: [
          `JPEG compression was designed around photographs and the quirks of human vision: it keeps brightness detail more carefully than colour detail and discards fine variation the eye is unlikely to notice at normal viewing distance. For photos that makes it remarkably efficient, and three decades of universal support mean a JPG opens on essentially every device, editor, printer and website in existence — a compatibility no newer format has yet matched.`,
          `Its two limits are absolute. JPG has no alpha channel at all, so transparency must be flattened onto a background colour during conversion — choose white and a logo meant for a dark page arrives with a white box around it. And its block-based compression handles hard edges poorly, ringing text and line art with faint smudges. Logos, screenshots and anything with crisp lettering belong in PNG or a lossless modern format instead.`,
        ],
      },
      {
        heading: 'WebP and AVIF: modern compression, honest caveats',
        paragraphs: [
          `WebP, from Google, offers both lossy and lossless modes plus full transparency, and typically produces noticeably smaller files than JPG or PNG at comparable quality. Support across modern browsers is now effectively universal, making it a safe default for images published on the web. AVIF, based on the AV1 video codec, usually compresses further still — especially at low quality settings — and handles gradients more gracefully, at the price of noticeably slower encoding.`,
          `The caveats are about the world outside the browser. Older software, some content management systems, a few social platforms and many office tools still reject or mishandle WebP or AVIF uploads, and AVIF support in desktop editors lags its browser support. Converting for your own website and converting for a file you must email to a client are different decisions: the technically best format is the wrong choice when the recipient's decade-old software cannot open it.`,
        ],
      },
      {
        heading: 'Quality settings: what the slider really trades',
        paragraphs: [
          `The quality number is not a percentage of quality kept — it is a dial controlling how aggressively the encoder quantises image detail, and its effect is not linear. Between about 95 and 85 most photographs change remarkably little in file size terms relative to the savings available, and differences are hard to spot without zooming. Below roughly 70, and especially below 50, artefacts become obvious: skies band into steps, edges grow halos, and fine texture turns to mush.`,
          `Two working rules follow. First, pick quality for the final use, not the archive: keep a lossless or very high-quality master, and export delivery copies at the setting the destination needs. Second, never re-save a lossy file repeatedly at the same setting — each generation discards a little more, a process called generation loss. Always convert from the best source you have, ideally the original, rather than from a copy that was itself converted last month.`,
        ],
      },
      {
        heading: 'When not to convert at all',
        paragraphs: [
          `Conversion cannot create quality, only redistribute size and compatibility, so several common jobs should not start here. Converting a JPG to PNG does not restore detail the JPG discarded — it preserves the artefacts losslessly in a bigger file. Upscaling a small image to a larger pixel size invents no detail either; it merely smooths the existing pixels. And converting a carefully prepared logo into a lossy format for the master copy mortgages every future use of it.`,
          `Archival material deserves the same restraint: the family-photo scan or the only copy of a document should stay in its least-processed form, with conversions made as copies for specific uses. A sane pattern is one untouched master, then per-purpose exports — WebP for the website, JPG for the client who needs compatibility, PNG for the screenshot that must stay crisp. This batch converter is built for exactly those export steps, including zipping a whole set at once.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Why BMP files are enormous: the raw pixel count',
        scenario: 'A 4,000 × 3,000 pixel photo is saved as a 24-bit BMP and the file dwarfs every other format.',
        calculation: 'Pixels: 4,000 × 3,000 = 12,000,000. BMP stores 3 bytes per pixel (red, green, blue) with no compression: 12,000,000 × 3 = 36,000,000 bytes ≈ 36 MB, plus a small header.',
        result: 'The BMP is about 36 MB for the same picture a quality-85 JPG typically holds in a few megabytes',
      },
      {
        title: 'Batch saving estimate for a set of product photos',
        scenario: 'A shop has 20 product PNGs averaging 2 MB each and considers switching the web versions to WebP.',
        calculation: 'Current total: 20 × 2 MB = 40 MB. If the WebP versions average 70 percent smaller — a planning assumption to check on a sample file, not a promise — the new average is 2 × 0.30 = 0.6 MB, and the set totals 20 × 0.6 MB = 12 MB.',
        result: 'Estimated saving: about 28 MB across the set — verify by converting one representative photo first and scaling from its real ratio',
      },
    ],
    extraFaqs: [
      {
        question: 'Why did converting my JPG to PNG make the file bigger, not better?',
        answer: 'Because PNG is lossless storage for whatever pixels it is given. The JPG artefacts — the slight smudging around edges — are already part of the image, and PNG faithfully preserves them at full size. Nothing was restored, since the discarded detail never reached the converter. PNG conversion only makes sense from a lossless source, or when you specifically need transparency or pixel-exact editing afterwards.',
      },
      {
        question: 'What happens to photo details like date, location and camera settings?',
        answer: 'In this browser-based workflow, they are generally left behind. The converter works from the decoded pixels on a canvas, and the exported file is a fresh encoding of those pixels; the EXIF block carrying GPS, timestamps and camera data is not part of the pixel grid and is not copied across. That is often a privacy benefit — but if the metadata matters, keep the original as your archive copy.',
      },
      {
        question: 'Why is AVIF slow, and why might it not open somewhere?',
        answer: 'AVIF borrows its compression from a modern video codec, and its encoder searches far harder for savings than a JPG encoder does — the same reason its files are smaller. Support is broad in current browsers, but older operating systems, office suites and some devices predate it, so a file that opens instantly for you may fail for a recipient on older software. When sending files out, compatibility usually wins.',
      },
    ],
  },

  // ============================================================
  // EXCEL / CSV CLEANER
  // ============================================================
  'excel-csv-cleaner': {
    howItWorksExtended: `The cleaner parses the uploaded spreadsheet into an in-memory table of rows and columns, then applies each selected operation to that table in a deliberate order. Normalisation comes first — trimming stray spaces and standardising casing — because a duplicate check run before trimming misses pairs like 'Smith ' and 'Smith' that differ only by an invisible trailing space. Duplicate detection then compares rows on the columns you specify (or the full row), blank-row removal discards rows whose cells are all empty or whitespace, and header standardisation rewrites column names to a consistent snake_case form. Every operation is counted for the audit report — rows removed, cells changed — and the preview shows the transformed table before anything is downloaded, so the original file on your disk is never touched.`,
    guide: [
      {
        heading: `What makes data 'dirty'`,
        paragraphs: [
          `Dirty data is rarely dramatic; it is the accumulation of small inconsistencies that each look harmless in a spreadsheet and break things downstream. The regular culprits are duplicated rows from double imports or repeated form submissions, blank rows left by deleted records, leading and trailing spaces pasted from web forms, mixed casing in names and categories ('London', 'london', 'LONDON' as three separate values to any grouping tool), and the same column holding dates in two or three different formats.`,
          `Each flaw has a characteristic failure mode. Duplicates inflate counts and mail people twice. Stray spaces defeat matching: a lookup for 'Acme Ltd' finds nothing when the stored value is 'Acme Ltd ' with a trailing space, and the join or VLOOKUP silently returns empty. Mixed date formats sort wrongly and chart wrongly. Cleaning is the unglamorous pass that removes these traps before they surface inside a CRM, a mail merge or a finance import, where they are much harder to trace.`,
        ],
      },
      {
        heading: 'Duplicates: exact, near, and the key-column question',
        paragraphs: [
          `Removing duplicates starts with a decision: what makes two rows 'the same'? A full-row comparison only catches perfect copies — same person, same email, same date — and keeps rows that repeat a customer with a newer phone number. Choosing a key column set, most often email or customer ID, declares identity by that key instead: two rows with the same email are one record, and one of them must go. Neither choice is automatically right; it depends on whether the extra rows are accidents or history.`,
          `Near-duplicates are the harder residue: 'Jon Smith' and 'John Smith' at the same address, or one company entered as 'Acme Ltd' and 'Acme Limited'. Exact-match deduplication will not catch these, and aggressive fuzzy matching risks merging genuinely different people. The cleaner's honest scope is exact duplicates after normalisation — trim, case, spacing — which is also the safe scope. Handle near-duplicates by sorting on the key column and eyeballing neighbours, where human judgement is still the best tool.`,
        ],
      },
      {
        heading: 'Why cleaning before import matters',
        paragraphs: [
          `Almost every system you feed data into — a CRM, an email platform, accounting software — validates less than you expect and stores what it is given. Duplicates imported today become two customer records with split histories, and merging them inside the CRM later is slower and riskier than removing a row now. Malformed values fail more quietly: an email with a trailing space may be accepted, then bounce every campaign, quietly damaging sender reputation with each send.`,
          `There is also an asymmetry of effort. Here, cleaning is one pass over one file with a preview and an audit count. Inside the destination system, the same fix means finding the bad records among the good, often without a bulk tool, sometimes without permission to delete. A ten-minute clean before import routinely replaces hours of record-by-record repair after it — and the audit report doubles as evidence of exactly what was changed if anyone questions the numbers later.`,
        ],
      },
      {
        heading: 'Check the totals: proving the clean file is still right',
        paragraphs: [
          `Cleaning should change a file's shape, never its substance, and control totals are how you prove it. Before cleaning, note a few figures that must behave predictably: the row count, and the sum of a numeric column that cleaning should not touch, such as invoice amounts or quantities. After cleaning, the row count should have fallen by exactly the duplicates and blank rows the audit reports — no more — and the control sum should be identical unless removed duplicates legitimately carried amounts, in which case the difference must equal the sum of the removed rows.`,
          `Discrepancies are diagnostic, not just alarming. A sum that changed when you only trimmed spaces means some 'numbers' were stored as text with spaces and are now being read as values — usually an improvement, but one you should know about. A row count shortfall beyond the audit numbers means a filter or key choice caught unintended rows. Two minutes of totals-checking catches both, and it is far cheaper than discovering the discrepancy in a board report.`,
        ],
      },
      {
        heading: 'Private by design: cleaning without uploading',
        paragraphs: [
          `Spreadsheets that need cleaning are disproportionately the sensitive ones: customer lists with emails and phone numbers, payroll exports, patient or client records. Uploading such a file to a server-based cleaner creates a copy of your most regulated data on infrastructure you do not control, subject to that service's retention habits and breach risk. This cleaner parses and transforms the file entirely in your browser's memory — the same flight-mode test applies: load the page, disconnect, and the cleaning still runs.`,
          `Local processing has honest limits worth planning around. The file is bounded by your device's memory rather than a server's, so a very large workbook may need splitting on an older machine. And privacy of transfer is not privacy of device: results downloaded to a shared computer sit there like any other file. Used on your own machine, though, the workflow leaves exactly one copy of the data — yours — which is the right number for a customer list.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Row arithmetic for an event-registration export',
        scenario: 'An export has 12,400 rows. The audit reports 312 duplicate rows and 96 fully blank rows to remove.',
        calculation: 'Start: 12,400. Remove duplicates: 12,400 − 312 = 12,088. Remove blank rows: 12,088 − 96 = 11,992.',
        result: 'Cleaned file: 11,992 rows — if your download shows any other count, stop and reconcile before importing',
      },
      {
        title: 'A control-total check that catches a problem',
        scenario: 'Before cleaning, the Quantity column sums to 18,430. You trim spaces and remove blank rows only — no deduplication.',
        calculation: 'Neither operation removes or alters a numeric row, so the expected sum afterwards is unchanged: 18,430. If the cleaned file sums to 18,412 instead, 18 units of quantity vanished — a row was likely misread or dropped.',
        result: 'Expected total 18,430; a different figure after a no-delete clean is a red flag worth investigating, not accepting',
      },
    ],
    extraFaqs: [
      {
        question: 'Which columns does duplicate removal compare?',
        answer: 'That is your choice. Comparing full rows removes only perfect copies, which is the safe default for mixed data. Selecting key columns — typically an email, ID or order number — treats rows sharing those values as the same record even when other fields differ, which suits mailing lists and CRM exports. When in doubt, run the full-row pass first and review what remains.',
      },
      {
        question: 'Will cleaning rewrite my dates and amounts?',
        answer: 'The cleaning operations target rows and text: duplicates, blank rows, stray spaces, casing and header names. They do not reformat dates or recalculate amounts. One honest caveat: spreadsheet programs re-interpret values when a file is reopened, so a date stored as text may display differently afterwards. The control-total habit from the guide — checking a numeric sum before and after — confirms in seconds that your figures survived untouched.',
      },
      {
        question: 'Can it handle a very large file, like 100,000 rows?',
        answer: 'Usually, on a modern desktop browser — the whole table is held in your device memory, so capacity depends on your machine rather than a server limit. Older laptops and phones may struggle. If a file will not process comfortably, split it into parts, clean each part with identical settings, and recombine. Splitting is safe for trimming and blank-row removal; deduplicate after recombining.',
      },
    ],
  },

  // ============================================================
  // CSV TO BUSINESS EXCEL
  // ============================================================
  'csv-to-business-excel': {
    howItWorksExtended: `A CSV file stores only characters: no types, no formats, no formulas. The formatter's first pass reads the records and, guided by the column classifications you choose — text, number, currency, percentage or date — writes each value into the workbook as a properly typed Excel cell, so that 1250.5 lands as a number Excel can sum rather than a string that merely looks like one. Display formats are then applied per type (currency symbols, thousands separators, date patterns), bold totals and summary statistics are computed from those typed values on the summary sheet, and a third sheet measures completeness — filled versus empty cells per column — from the same records. Nothing in the workbook is estimated or sampled: every figure traces back to cells in your file.`,
    guide: [
      {
        heading: 'What a raw CSV cannot say',
        paragraphs: [
          `CSV is the universal interchange format precisely because it says almost nothing: rows of comma-separated text, with no record of what the values mean. The file cannot tell Excel that a column is money rather than a plain number, that 03/04 is a date and not a fraction, or that a column of digits is an identifier that must never be summed. Every one of those meanings has to be supplied by a human or guessed by software each time the file is opened.`,
          `A formatted workbook stores those decisions once. Typed cells, number formats, frozen headers, a sheet of computed totals and a data-quality sheet turn the same records into a document a colleague can open and trust without re-asking how each column should be read. That is the actual product of this formatter: not prettier colours, but the removal of ambiguity — the CSV's silence about its own content, answered permanently.`,
        ],
      },
      {
        heading: 'The leading-zero trap: SKUs, postal codes and account numbers',
        paragraphs: [
          `Some numbers are really names. A Boston postal code 02134, a product code 00457, a staff number 0037 — their zeros carry information, and the moment such a value is stored as a number, the zeros vanish: 02134 becomes 2134, which is a different code, a different sort position and potentially a different place. Spreadsheets commit this destruction silently at import or paste time, and it is one of the commonest ways a CSV round-trip corrupts a dataset without changing a single visible digit's value.`,
          `The defence is classification: any column whose values act as identifiers — SKUs, postal codes, phone numbers, account and card references — should be written as text, which preserves every character exactly. In this formatter that is what choosing the Text classification does. The tell-tale sign you needed it: a column that your source system shows with uniform length, whose spreadsheet version suddenly shows ragged, shorter values. Fixing it afterwards means returning to the source, because the lost zeros cannot be reconstructed from the shortened values alone.`,
        ],
      },
      {
        heading: 'Long numbers and the 15-digit wall',
        paragraphs: [
          `Excel stores numbers with 15 significant digits of precision — a hard limit of its design, not a setting. Feed it a 16- to 19-digit identifier as a number and the digits beyond the fifteenth are replaced by zeros, permanently: a tracking ID like 998877665544332211 comes back as 998877665544332000. The file will look plausible, sort plausibly, and be quietly wrong in exactly the digits that made the ID unique. Scientific notation (9.98878E+17) in a cell is the usual visible clue that this has happened.`,
          `Long identifiers are not quantities; nobody adds two card numbers together. They belong in text-typed cells, where length is unlimited and every digit survives. The same applies to bank account numbers, IMEI codes, and barcodes stored as digits. When reviewing a formatted workbook, any column of long digits deserves one question — 'will anyone ever do arithmetic on this?' If the answer is no, it should be text, and this conversion step is the cheapest moment to enforce that.`,
        ],
      },
      {
        heading: 'Mixed columns: when one column holds three data types',
        paragraphs: [
          `Real exports rarely keep a column pure. A price column collects 'free' and 'POA' among the numbers; a date column mixes 2026-01-05 with 05/01/2026 and the occasional 'n/a'; a quantity column gains units, becoming '12 pcs'. A formatter can type the column by its dominant content, but the odd values then behave oddly — excluded from totals, sorted as text, or parsed into dates nobody intended — and the spreadsheet rarely warns you which cells were left behind.`,
          `The pragmatic workflow is to read the data-quality picture first: completeness and type consistency tell you which columns are mixed before you present their totals. Ambiguous entries deserve a decision, not a default. Is 03/04/2026 the third of April or the fourth of March? No software can know; your source system's convention decides, and the formatter applying one consistent choice — visibly, across the whole column — is exactly the improvement over five colleagues each reading it their own way.`,
        ],
      },
      {
        heading: 'Summary statistics: totals you can defend',
        paragraphs: [
          `A summary sheet earns its place only if every number on it can be traced to the data sheet. The statistics this workbook generates — counts, sums, averages, minimums and maximums per numeric column — are computed from the typed values of your records, all of them, not a sample. That traceability is what lets you defend a figure in a meeting: the summary says total revenue because the data sheet sums to it, and anyone can select the column and see the same total in Excel's status bar.`,
          `Averages deserve one extra check: an average over a column with blanks is computed over the filled cells, not the row count, which is correct arithmetic but changes the story if half the column is empty. That is why the workbook pairs its summary with a completeness audit — a 98 percent complete column supports confident conclusions, a 55 percent complete one supports a data-collection fix first. Reading the two sheets together turns a formatted file into an honest one.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'A postal code, saved and destroyed',
        scenario: 'A customer CSV lists a Boston address with postal code 02134. The column is imported as numbers.',
        calculation: 'As a number, 02134 is evaluated to the value 2134 — the leading zero carries no numeric value, so it is dropped. As text, the five characters 0-2-1-3-4 are stored exactly.',
        result: 'Number typing gives 2134 (wrong code, wrong sorting); text typing preserves 02134 — identifier columns must be text',
      },
      {
        title: 'An 18-digit tracking ID meets the 15-digit wall',
        scenario: 'A logistics export carries tracking ID 998877665544332211 in a column that gets typed as a number.',
        calculation: 'Excel keeps 15 significant digits: 998877665544332 followed by the remaining 3 digits replaced with zeros → 998877665544332000. The final digits 211 are lost.',
        result: 'Stored as a number, the ID becomes 998877665544332000 and no longer matches the courier’s record; stored as text it survives intact',
      },
    ],
    extraFaqs: [
      {
        question: 'Why does my date column show numbers like 46027?',
        answer: 'Because that is how Excel stores dates internally: as a serial count of days since 1900, shown as a date only when a date format is applied. If a column was written without its date classification, you see the raw serials. The values are not corrupt — formatting the column as a date turns 46027 back into the date it represents. Choosing Date classification here applies that format.',
      },
      {
        question: 'Why does 25 percent appear as 0.25 in my workbook?',
        answer: 'Spreadsheets store percentages as fractions: 25 percent is the number 0.25 wearing a percentage format. If a CSV holds 0.25 typed as a number, you see the fraction; classify it as Percentage and it displays as 25 percent. The reverse trap exists — a CSV value of 25 typed as a percentage becomes 2,500 percent. The classification step exists to make that choice once, instead of letting defaults decide.',
      },
      {
        question: 'My CSV has cells starting with = — what happens to them?',
        answer: 'Treat them with care. A CSV is plain text, so a cell containing =A1+B1 is just characters — but Excel interprets a leading equals sign as a formula when the file opens, and calculates it. That is a known nuisance, and a security concern for untrusted CSVs, since crafted formulas can trigger unwanted actions. If they are labels, not formulas, prefix them in the source so they import as text.',
      },
    ],
  },

  // ============================================================
  // SKU GENERATOR
  // ============================================================
  'sku-generator': {
    howItWorksExtended: `Generation is structured multiplication. You define fixed segments — brand, category, product — and lists of variable attributes such as colours and sizes; the generator then forms the Cartesian product of those lists, concatenating one value from each list with your chosen delimiter and casing, and appends a zero-padded sequence number to guarantee uniqueness where the attribute codes alone might collide. Three sizes and four colours therefore yield exactly twelve codes, deterministically, in a stable sorted order. Because the scheme is systematic rather than random, a code can be decoded back into its attributes by eye, duplicates are impossible within a run, and regenerating the matrix after adding one colour produces the original codes unchanged plus the new set — the property that makes the system safe to grow.`,
    guide: [
      {
        heading: 'Anatomy of a SKU: segments that carry meaning',
        paragraphs: [
          `A well-built SKU is a compressed sentence about the product, read left to right from the general to the specific. A typical pattern runs brand, then category, then product, then the variant attributes — colour, then size — and finally a sequence or check segment. In VEC-APP-TEE-BLK-M-002, each block answers one question: whose is it, what family, which product, which colour, which size, which entry in the run. Warehouse staff learn to read these fluently within days.`,
          `Segment discipline is what makes that fluency possible. Abbreviations must be fixed — BLK always means black, BLCK never appears — lengths should be consistent within a segment, and each segment should carry one attribute only. The order matters too: put the attributes staff sort and search by earliest. A SKU is not a description field; anything that changes over the product's life, such as price or supplier, does not belong in the code, because the code must never need to change.`,
        ],
      },
      {
        heading: 'Readable codes versus random codes',
        paragraphs: [
          `Random strings are tempting because a generator can guarantee their uniqueness with no thought at all — but uniqueness is the easy part. A random code cannot be proofread: mistype one character of KX7-29QD and nothing about it looks wrong, whereas a mistyped readable code often visibly breaks its own pattern (a colour segment that is not a known colour) and gets caught. In phone orders, stocktakes and returns, that self-evident correctness saves real errors.`,
          `Readable codes carry two costs, honestly stated. They require governance — someone must own the abbreviation lists, or creativity creeps in and the pattern rots. And they can leak mild information, such as which category a product belongs to or roughly when it was added. For ordinary retail and wholesale those costs are small and the operational benefits large, which is why structured SKUs remain the norm. Pure random codes suit systems where codes are only ever scanned, never read aloud or typed.`,
        ],
      },
      {
        heading: 'Consistency rules that keep a catalogue sane',
        paragraphs: [
          `Most SKU chaos is not bad codes but inconsistent ones. A handful of standing rules prevents nearly all of it: one delimiter everywhere (hyphens are safest — they survive spreadsheets, URLs and label printers, while slashes and spaces break paths and formulas); one casing convention; no characters that invite confusion when read aloud or handwritten, such as the letter O beside zero or I beside 1; and a ban on embedding spaces. Publish the rules with the abbreviation lists, in the same document.`,
          `The second rule set governs change. Never reuse a retired SKU for a different product — its history in old invoices and reports would silently attach to the new item. Never edit a live SKU's meaning; if a product genuinely changes identity, issue a new code and map old to new. And reserve room to grow: a two-character category segment caps you at a few hundred categories in practice, which is plenty until the day it suddenly is not.`,
        ],
      },
      {
        heading: 'A SKU is not a barcode',
        paragraphs: [
          `The two are constantly confused because both appear as codes on labels, but they serve different masters. A SKU is your internal identifier, invented by you, meaningful to your business, and different from every other seller's code for the same product. A barcode — UPC or EAN — is a registered, globally unique identifier issued through GS1 that identifies the product to everyone: marketplaces, retailers and point-of-sale systems worldwide. The barcode is a number rendered as bars; the SKU is an organisational system.`,
          `In practice a product usually carries both: the manufacturer's barcode for selling through channels that require one, and your SKU for your own stock, warehouse and reporting logic. Amazon and many retailers ask for both — their catalogue keys on the barcode while your inventory keys on the SKU. Generating good SKUs, as this tool does, solves the internal half completely; if you need barcodes, they must be obtained from GS1, and no generator can legitimately invent them for you.`,
        ],
      },
      {
        heading: 'From generator to shelf: an inventory workflow',
        paragraphs: [
          `The generator is step one of a short pipeline. Generate the full variant matrix for the product, review it once as a list — duplicates or missing combinations are obvious at this stage and painful later — then export to your inventory or e-commerce platform's import format, assigning each code to its variant as you create the product. Only after the codes exist in the system should labels be printed, because the label is a copy of the record, never the original.`,
          `Two habits keep the system trustworthy afterwards. Keep one master list — the spreadsheet or system of record where every issued SKU and what it denotes lives — and issue new codes from it, never from memory or from a label on a shelf. And when a product gains a new colour or size next season, extend the existing pattern rather than starting a prettier one: consistency across years beats elegance within a season, because staff, reports and returning customers all navigate by the pattern they already know.`,
        ],
      },
    ],
    extraExamples: [
      {
        title: 'Counting a shoe variant matrix before generating it',
        scenario: 'A shoe model comes in 3 colours, 5 sizes and 2 widths. How many SKUs will the matrix need?',
        calculation: 'Variant count multiplies across attributes: 3 colours × 5 sizes = 15; 15 × 2 widths = 30 distinct variants.',
        result: '30 unique SKUs — one per sellable combination; if the generator returns any other count, an attribute list is wrong',
      },
      {
        title: 'Building one code segment by segment',
        scenario: 'North Star Outdoors sells a kitchen mug, green, 350 ml. Their scheme is BRAND-CATEGORY-PRODUCT-COLOUR-SIZE plus a padded sequence.',
        calculation: 'Brand NOS, category KIT, product MUG, colour GRN, size 350 → NOS-KIT-MUG-GRN-350. The seventh item in the run takes sequence 007 under three-digit zero-padding.',
        result: 'Example code: NOS-KIT-MUG-GRN-350-007 — readable at a glance, sortable, and unambiguous on a shelf label',
      },
    ],
    extraFaqs: [
      {
        question: 'Can I reuse a SKU once a product is discontinued?',
        answer: 'It is strongly discouraged. The old code lives on in past invoices, sales reports, return records and possibly customer orders; assigning it to a different product makes all of that history ambiguous — a report spanning both products would silently mix them. Storage for codes is effectively free, while untangling merged history is not. Retire codes permanently and issue fresh ones for new products.',
      },
      {
        question: 'How long should a SKU be?',
        answer: 'As long as its attributes require and no longer — in practice, most workable retail SKUs land between about 8 and 20 characters. Much shorter and the code cannot carry brand, category and variant information; much longer and it stops being typable, overflows label layouts, and invites transcription errors. If a draft scheme passes 20 characters, the usual fix is shorter abbreviations rather than dropping an attribute.',
      },
      {
        question: 'Can I change a SKU after products are already listed?',
        answer: 'You can, but treat it as a migration, not an edit. The old code may sit on printed labels, in marketplace listings, in accounting records and in customers’ order histories; everything must move together, with an old-to-new mapping kept for returns and reports. Most businesses change SKUs only for a compelling reason — a catalogue merger, a broken scheme — and otherwise let an imperfect but stable scheme keep working.',
      },
    ],
  },
};
