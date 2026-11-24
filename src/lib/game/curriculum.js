const shell = (task, prelude = "") =>
  `#include <stdio.h>\n${prelude}\nint main() {\n  // ${task}\n  \n  return 0;\n}\n`;

const fnShell = (signature, task) =>
  `#include <stdio.h>\n\n${signature}\n\nint main() {\n  // ${task}\n  \n  return 0;\n}\n`;

export const ACCENTS = {
  cyan: {
    text: "text-brand-ink",
    border: "border-[#C6E9A8]",
    bg: "bg-[#58CC02]",
    soft: "bg-brand-tint",
    ring: "ring-[#58CC02]/30",
    gradient: "from-[#58CC02]/20 via-[#58CC02]/5 to-transparent",
    glow: "shadow-[0_5px_0_#46A302]",
    dot: "bg-[#58CC02]",
  },
  violet: {
    text: "text-grape",
    border: "border-grape/40",
    bg: "bg-[#CE82FF]",
    soft: "bg-grape/16",
    ring: "ring-[#CE82FF]/40",
    gradient: "from-[#CE82FF]/20 via-[#CE82FF]/5 to-transparent",
    glow: "shadow-[0_5px_0_#B267E8]",
    dot: "bg-[#CE82FF]",
  },
  emerald: {
    text: "text-sun-ink",
    border: "border-sun/45",
    bg: "bg-[#FFD900]",
    soft: "bg-sun/15",
    ring: "ring-[#FFD900]/50",
    gradient: "from-[#FFD900]/25 via-[#FFD900]/5 to-transparent",
    glow: "shadow-[0_5px_0_#E0BE00]",
    dot: "bg-[#FFD900]",
  },
  amber: {
    text: "text-tangerine-ink",
    border: "border-tangerine/40",
    bg: "bg-[#FF9600]",
    soft: "bg-tangerine/15",
    ring: "ring-[#FF9600]/40",
    gradient: "from-[#FF9600]/20 via-[#FF9600]/5 to-transparent",
    glow: "shadow-[0_5px_0_#E08200]",
    dot: "bg-[#FF9600]",
  },
  blue: {
    text: "text-aqua",
    border: "border-aqua/45",
    bg: "bg-[#1CB0F6]",
    soft: "bg-aqua/15",
    ring: "ring-[#1CB0F6]/40",
    gradient: "from-[#1CB0F6]/20 via-[#1CB0F6]/5 to-transparent",
    glow: "shadow-[0_5px_0_#1197D6]",
    dot: "bg-[#1CB0F6]",
  },
  rose: {
    text: "text-coral",
    border: "border-coral/40",
    bg: "bg-[#FF4B4B]",
    soft: "bg-coral/12",
    ring: "ring-[#FF4B4B]/40",
    gradient: "from-[#FF4B4B]/20 via-[#FF4B4B]/5 to-transparent",
    glow: "shadow-[0_5px_0_#E33A3A]",
    dot: "bg-[#FF4B4B]",
  },
};

export const WORLDS = [
  {
    id: "w1",
    index: 1,
    name: "First Light",
    subtitle: "Output, variables, types",
    blurb: "A dead terminal wakes up in an abandoned lab. Speak to it in the only language it remembers.",
    accent: "cyan",
    missions: [
      {
        id: "w1m1",
        order: 1,
        title: "Wake the terminal",
        tagline: "Your first C program",
        skill: "printf",
        story:
          "The lab's terminal has been dark for eleven years. A single line of text is enough to bring it back online.",
        objective: "Print exactly: Hello, World!",
        concept: {
          title: "printf writes to the screen",
          points: [
            "Every C program begins at main() and runs the statements inside it, top to bottom.",
            "printf(\"...\") sends text to standard output. The \\n at the end means 'new line'.",
          ],
          snippet: '#include <stdio.h>\n\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}',
          analogy: "printf is a loudspeaker. Whatever you put in the quotes is what the machine says out loud.",
        },
        fieldNote:
          "In every project you'll ever build, printing is your first debugging tool. If a value looks wrong, print it.",
        starter: shell("Print: Hello, World!"),
        solution: '#include <stdio.h>\n\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "contains", value: "Hello, World!" }],
        hints: [
          "Your code runs inside main(). Everything you want to happen goes between its braces.",
          'Use printf("..."); and put the text inside the double quotes.',
          'Exactly this: printf("Hello, World!\\n");',
        ],
        reward: { xp: 40, coins: 12 },
      },
      {
        id: "w1m2",
        order: 2,
        title: "Set the clock",
        tagline: "Variables hold values",
        skill: "int variables",
        story: "The lab clock reads 2147 but the terminal shows a blank. Give the machine a number it can remember.",
        objective: "Create an int called year holding 2147, then print: Year: 2147",
        concept: {
          title: "A variable is a labelled box",
          points: [
            "int year = 2147; creates a box named year and stores the whole number 2147 in it.",
            "printf(\"Year: %d\\n\", year); drops the value of year where %d sits.",
          ],
          snippet: 'int year = 2147;\nprintf("Year: %d\\n", year);',
          analogy: "%d is a placeholder on a form. You hand printf the box, and it writes what's inside.",
        },
        fieldNote:
          "Real programs are mostly named values flowing between steps. Naming them clearly is half the job.",
        starter: shell("Create int year = 2147, then print: Year: 2147"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  int year = 2147;\n  printf("Year: %d\\n", year);\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "contains", value: "Year: 2147" }],
        hints: [
          "Declare the variable first: int year = 2147;",
          "Then pass it to printf as a second argument, separated by a comma.",
          'printf("Year: %d\\n", year);',
        ],
        reward: { xp: 45, coins: 14 },
      },
      {
        id: "w1m3",
        order: 3,
        title: "Calibrate the gauges",
        tagline: "int, double and char",
        skill: "data types",
        story:
          "Three gauges are unlabelled. One counts lives, one holds an energy reading with a decimal, one stores a single letter.",
        objective:
          "Declare lives = 3 (int), energy = 87.5 (double), grade = 'A' (char). Print each on its own line as shown in the briefing.",
        concept: {
          title: "Different data needs different types",
          points: [
            "int holds whole numbers, double holds decimals, char holds one character.",
            "Each type has its own placeholder: %d, %f (or %.1f) and %c.",
          ],
          snippet:
            'int lives = 3;\ndouble energy = 87.5;\nchar grade = \'A\';\nprintf("Lives: %d\\n", lives);\nprintf("Energy: %.1f\\n", energy);\nprintf("Grade: %c\\n", grade);',
          analogy: "Types are container shapes. Pouring a decimal into an int box truncates it silently.",
        },
        fieldNote:
          "Choosing the right type early prevents a whole class of bugs: integer division, overflow, lost precision.",
        starter: shell(
          'Print "Lives: 3", "Energy: 87.5", "Grade: A" using int, double and char variables'
        ),
        solution:
          '#include <stdio.h>\n\nint main() {\n  int lives = 3;\n  double energy = 87.5;\n  char grade = \'A\';\n  printf("Lives: %d\\n", lives);\n  printf("Energy: %.1f\\n", energy);\n  printf("Grade: %c\\n", grade);\n  return 0;\n}\n',
        checks: [
          { type: "output", mode: "contains", value: "Lives: 3" },
          { type: "output", mode: "contains", value: "Energy: 87.5" },
          { type: "output", mode: "contains", value: "Grade: A" },
        ],
        hints: [
          "Use double for 87.5 — an int would store 87 and lose the .5.",
          "Use %.1f to print exactly one decimal place, and %c for the character.",
          "Three printf calls, one per gauge, each on its own line.",
        ],
        reward: { xp: 55, coins: 16 },
      },
      {
        id: "w1m4",
        order: 4,
        title: "Damage report",
        tagline: "Arithmetic and precedence",
        skill: "operators",
        story: "The console needs a single number: base damage 12, bonus 7, plus 3 overcharge. Order matters.",
        objective: "Compute base * bonus + 3 and print: Total: 87",
        concept: {
          title: "C does maths with operator precedence",
          points: [
            "* and / run before + and -, exactly like school algebra.",
            "int / int throws away the remainder. 9 / 2 is 4, not 4.5.",
          ],
          snippet: 'int total = base * bonus + 3;\nprintf("Total: %d\\n", total);',
          analogy: "Precedence is the order of operations. Brackets are how you overrule it.",
        },
        fieldNote:
          "Integer division is the single most common first-year bug. Whenever you see 0 where you expected a decimal, suspect it.",
        starter: shell("Compute base * bonus + 3 where base = 12 and bonus = 7, then print: Total: 87"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  int base = 12;\n  int bonus = 7;\n  int total = base * bonus + 3;\n  printf("Total: %d\\n", total);\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "contains", value: "Total: 87" }],
        hints: [
          "12 * 7 is computed before adding 3, so you get 87.",
          "Store the result in an int, then print it with %d.",
          "int total = base * bonus + 3;",
        ],
        reward: { xp: 60, coins: 18 },
      },
      {
        id: "w1m5",
        order: 5,
        title: "BOSS: Reactor calibration",
        tagline: "Average three readings",
        skill: "boss · mixed arithmetic",
        boss: true,
        story:
          "The reactor core is drifting. Three readings must be averaged with real precision, not truncated.",
        objective: "Average 91, 84 and 79 as a double, then print: Average: 84.67",
        concept: {
          title: "Mix int and double on purpose",
          points: [
            "(a + b + c) / 3 would do integer division and print 84. Dividing by 3.0 keeps the decimals.",
            "%.2f rounds the output to two decimal places.",
          ],
          snippet: 'double average = (a + b + c) / 3.0;\nprintf("Average: %.2f\\n", average);',
          analogy: "Adding .0 to the divisor is like switching the whole calculation into decimal mode.",
        },
        fieldNote:
          "Averages, percentages and scores are where integer division quietly destroys results. Write 3.0 on purpose.",
        starter: shell("Average 91, 84 and 79, then print: Average: 84.67"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  int a = 91;\n  int b = 84;\n  int c = 79;\n  double average = (a + b + c) / 3.0;\n  printf("Average: %.2f\\n", average);\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "contains", value: "Average: 84.67" }],
        hints: [
          "Divide by 3.0 instead of 3 so the result keeps its decimals.",
          "Store the result in a double, not an int.",
          'printf("Average: %.2f\\n", average); gives you 84.67.',
        ],
        reward: { xp: 120, coins: 40 },
      },
    ],
  },
  {
    id: "w2",
    index: 2,
    name: "Signal District",
    subtitle: "Conditions and decisions",
    blurb: "Every alley in the district runs on a rule. Learn to make the machine choose.",
    accent: "violet",
    missions: [
      {
        id: "w2m1",
        order: 1,
        title: "Overheat alarm",
        tagline: "if / else",
        skill: "if-else",
        story: "The cooling tower reports 118 degrees. Above 100 it must scream OVERHEAT, otherwise it stays quiet.",
        objective: "If temperature is above 100 print OVERHEAT, else print STABLE.",
        concept: {
          title: "if runs code only when a condition is true",
          points: [
            "if (temperature > 100) { ... } else { ... } picks exactly one branch.",
            "A condition is any expression that evaluates to non-zero (true) or zero (false).",
          ],
          snippet: 'if (temperature > 100) {\n  printf("OVERHEAT\\n");\n} else {\n  printf("STABLE\\n");\n}',
          analogy: "An if is a fork in the corridor. The condition decides which way you walk.",
        },
        fieldNote:
          "Validation lives here: reject bad input, guard divisions, choose a path. Most real logic is branches.",
        starter: shell("If temperature (118) is above 100 print OVERHEAT, else print STABLE"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  int temperature = 118;\n  if (temperature > 100) {\n    printf("OVERHEAT\\n");\n  } else {\n    printf("STABLE\\n");\n  }\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "OVERHEAT" }],
        hints: [
          "Start with: int temperature = 118;",
          "Wrap each printf in braces so it belongs to its branch.",
          "Only the OVERHEAT branch should print, because 118 > 100 is true.",
        ],
        reward: { xp: 50, coins: 14 },
      },
      {
        id: "w2m2",
        order: 2,
        title: "Grade the cohort",
        tagline: "else if ladders",
        skill: "else-if",
        story:
          "A marker bot needs to turn a score into a letter. 90+ is A, 80+ is B, 70+ is C, everything else fails.",
        objective: "For score = 87 print: Grade: B",
        concept: {
          title: "else if checks conditions in order",
          points: [
            "The first condition that is true wins, and the rest are skipped.",
            "Because of that, each test only needs the remaining range: score >= 80, not score < 90 && score >= 80.",
          ],
          snippet:
            'if (score >= 90) printf("Grade: A\\n");\nelse if (score >= 80) printf("Grade: B\\n");\nelse if (score >= 70) printf("Grade: C\\n");\nelse printf("Grade: F\\n");',
          analogy: "An else-if ladder is a sieve: each rung catches the values that didn't fit above it.",
        },
        fieldNote:
          "This exact ladder shows up in every grading, pricing tier and permission check you'll write.",
        starter: shell("Turn score 87 into a letter grade and print: Grade: B"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  int score = 87;\n  if (score >= 90) {\n    printf("Grade: A\\n");\n  } else if (score >= 80) {\n    printf("Grade: B\\n");\n  } else if (score >= 70) {\n    printf("Grade: C\\n");\n  } else {\n    printf("Grade: F\\n");\n  }\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "Grade: B" }],
        hints: [
          "87 is not >= 90, so the first branch is skipped.",
          "It is >= 80, so the second branch prints.",
          "Use >= (greater or equal), not >, or 80 itself would fail.",
        ],
        reward: { xp: 55, coins: 15 },
      },
      {
        id: "w2m3",
        order: 3,
        title: "Access gate",
        tagline: "&& and ||",
        skill: "logical operators",
        story: "The gate opens only when the badge is valid AND the clearance level is at least 5.",
        objective: "With id_valid = 1 and level = 7 print: ACCESS GRANTED",
        concept: {
          title: "Combine conditions with && and ||",
          points: [
            "&& means both sides must be true. || means at least one must be true. ! flips a condition.",
            "C short-circuits: in a && b, if a is false, b is never evaluated.",
          ],
          snippet: 'if (id_valid && level >= 5) {\n  printf("ACCESS GRANTED\\n");\n}',
          analogy: "&& is two keys in two locks. || is one key in either lock.",
        },
        fieldNote:
          "Guarding with && is how you avoid crashes: check the pointer is valid and the index is in range before using them.",
        starter: shell("Open the gate when id_valid is 1 AND level >= 5. Print ACCESS GRANTED"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  int id_valid = 1;\n  int level = 7;\n  if (id_valid && level >= 5) {\n    printf("ACCESS GRANTED\\n");\n  } else {\n    printf("DENIED\\n");\n  }\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "ACCESS GRANTED" }],
        hints: [
          "Both conditions go inside one if, joined by &&.",
          "id_valid is 1, which counts as true in C.",
          "if (id_valid && level >= 5)",
        ],
        reward: { xp: 60, coins: 17 },
      },
      {
        id: "w2m4",
        order: 4,
        title: "Deeper reading",
        tagline: "Nested conditions",
        skill: "nesting",
        story: "Compare two sensor readings, then inspect the larger one: is it even or odd?",
        objective: "With a = 42 and b = 17 print: Larger: 42 then Even",
        concept: {
          title: "if inside if",
          points: [
            "Once you know which value is larger, you can ask a second question about it.",
            "The inner if only runs when the outer branch was taken.",
          ],
          snippet:
            'if (a > b) {\n  printf("Larger: %d\\n", a);\n  if (a % 2 == 0) printf("Even\\n");\n  else printf("Odd\\n");\n}',
          analogy: "First you pick the taller twin, then you check whether that twin is wearing a hat.",
        },
        fieldNote:
          "Nesting is fine two levels deep. Beyond that, extract a function — your future self will thank you.",
        starter: shell("Find the larger of a = 42 and b = 17, print it, then print Even or Odd"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  int a = 42;\n  int b = 17;\n  if (a > b) {\n    printf("Larger: %d\\n", a);\n    if (a % 2 == 0) {\n      printf("Even\\n");\n    } else {\n      printf("Odd\\n");\n    }\n  } else {\n    printf("Larger: %d\\n", b);\n  }\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "Larger: 42\nEven" }],
        hints: [
          "Use a % 2 == 0 to test for even numbers.",
          "The even/odd check lives inside the branch where a is larger.",
          "Print the label and the value in one printf: printf(\"Larger: %d\\n\", a);",
        ],
        reward: { xp: 65, coins: 18 },
      },
      {
        id: "w2m5",
        order: 5,
        title: "BOSS: The Calendar Gate",
        tagline: "Leap year logic",
        skill: "boss · compound logic",
        boss: true,
        story:
          "The district's calendar is broken. A year is a leap year when it divides by 4, except centuries — unless they divide by 400.",
        objective: "For year = 2024 print: 2024 is a leap year",
        concept: {
          title: "Real rules need grouped logic",
          points: [
            "(year % 4 == 0 && year % 100 != 0) || year % 400 == 0",
            "Brackets decide the grouping: the century exception belongs to the first half only.",
          ],
          snippet:
            'if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {\n  printf("%d is a leap year\\n", year);\n}',
          analogy: "The rule is a checklist with a footnote. Brackets make sure the footnote attaches to the right line.",
        },
        fieldNote:
          "Turning a written spec into grouped conditions is the core of translating requirements into code.",
        starter: shell("Print whether 2024 is a leap year using the full rule"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  int year = 2024;\n  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {\n    printf("%d is a leap year\\n", year);\n  } else {\n    printf("%d is not a leap year\\n", year);\n  }\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "2024 is a leap year" }],
        hints: [
          "Test divisibility with year % 4 == 0.",
          "Group the century rule in its own brackets: (year % 4 == 0 && year % 100 != 0).",
          "Then OR it with the 400 rule: || year % 400 == 0.",
        ],
        reward: { xp: 130, coins: 42 },
      },
    ],
  },
  {
    id: "w3",
    index: 3,
    name: "Loop Citadel",
    subtitle: "Repetition and accumulation",
    blurb: "The citadel is built from repeating corridors. Learn to walk them without writing the same line twice.",
    accent: "emerald",
    missions: [
      {
        id: "w3m1",
        order: 1,
        title: "Count the steps",
        tagline: "for loops",
        skill: "for",
        story: "Five lamps line the entrance. Light them in order, one number at a time.",
        objective: "Print 1 to 5, each on its own line.",
        concept: {
          title: "for packs three things into one line",
          points: [
            "for (int i = 1; i <= 5; i++) means: start at 1, keep going while i <= 5, add 1 after each pass.",
            "The loop body runs once per value of i.",
          ],
          snippet: 'for (int i = 1; i <= 5; i++) {\n  printf("%d\\n", i);\n}',
          analogy: "A for loop is a turnstile with a counter: enter, do the work, tick, repeat.",
        },
        fieldNote:
          "Almost every array, list and file you process in a real project is walked by a for loop.",
        starter: shell("Print the numbers 1 through 5, one per line"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  for (int i = 1; i <= 5; i++) {\n    printf("%d\\n", i);\n  }\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "1\n2\n3\n4\n5" }],
        hints: [
          "Start i at 1 and stop when i is no longer <= 5.",
          "i++ adds one after each pass.",
          "printf(\"%d\\n\", i) inside the braces.",
        ],
        reward: { xp: 60, coins: 16 },
      },
      {
        id: "w3m2",
        order: 2,
        title: "Countdown",
        tagline: "while loops",
        skill: "while",
        story: "The launch sequencer counts down from five, then releases the lock.",
        objective: "Print 5 4 3 2 1 then Liftoff!, each on its own line.",
        concept: {
          title: "while repeats until the condition fails",
          points: [
            "while (n > 0) keeps running as long as n is positive.",
            "You must change something inside the loop, or it never ends.",
          ],
          snippet: 'while (n > 0) {\n  printf("%d\\n", n);\n  n--;\n}\nprintf("Liftoff!\\n");',
          analogy: "A while loop is a door that keeps opening until you turn the handle the other way.",
        },
        fieldNote:
          "Use while when you don't know how many iterations you need — reading input, waiting for a condition.",
        starter: shell('Count down from 5 to 1, then print "Liftoff!"'),
        solution:
          '#include <stdio.h>\n\nint main() {\n  int n = 5;\n  while (n > 0) {\n    printf("%d\\n", n);\n    n--;\n  }\n  printf("Liftoff!\\n");\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "5\n4\n3\n2\n1\nLiftoff!" }],
        hints: [
          "Decrement n inside the loop with n--.",
          "Liftoff prints after the loop, not inside it.",
          "Otherwise you'll print Liftoff five times.",
        ],
        reward: { xp: 65, coins: 17 },
      },
      {
        id: "w3m3",
        order: 3,
        title: "Accumulate",
        tagline: "Running totals",
        skill: "accumulator pattern",
        story: "The citadel's ledger needs the total of the first ten steps.",
        objective: "Sum 1 through 10 and print: Sum: 55",
        concept: {
          title: "Start at zero, add as you go",
          points: [
            "int sum = 0; before the loop, then sum += i inside it.",
            "The variable must be declared outside the loop or it resets every pass.",
          ],
          snippet: 'int sum = 0;\nfor (int i = 1; i <= 10; i++) {\n  sum += i;\n}\nprintf("Sum: %d\\n", sum);',
          analogy: "A running total is a bucket. The loop keeps pouring one more unit in.",
        },
        fieldNote:
          "Totals, counts, averages, scores: the accumulator pattern is the backbone of data processing.",
        starter: shell("Sum the numbers 1 through 10 and print: Sum: 55"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  int sum = 0;\n  for (int i = 1; i <= 10; i++) {\n    sum += i;\n  }\n  printf("Sum: %d\\n", sum);\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "Sum: 55" }],
        hints: [
          "Declare int sum = 0; before the loop starts.",
          "Add inside the loop with sum += i;",
          "Print after the loop closes.",
        ],
        reward: { xp: 70, coins: 19 },
      },
      {
        id: "w3m4",
        order: 4,
        title: "Tower of stars",
        tagline: "Nested loops",
        skill: "nested loops",
        story: "Each floor of the tower is one star longer than the floor below it.",
        objective: "Print a 5-row triangle of stars.",
        concept: {
          title: "A loop inside a loop",
          points: [
            "The outer loop walks the rows. The inner loop prints the stars for that row.",
            "The inner loop's limit depends on the outer counter: col <= row.",
          ],
          snippet:
            'for (int row = 1; row <= 5; row++) {\n  for (int col = 1; col <= row; col++) printf("*");\n  printf("\\n");\n}',
          analogy: "Rows of seats: you walk each row, and for every row you touch each seat in it.",
        },
        fieldNote:
          "Grids, tables, matrices and image pixels are all nested loops. This is the shape of that work.",
        starter: shell("Print 5 rows: *, **, ***, ****, *****"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  for (int row = 1; row <= 5; row++) {\n    for (int col = 1; col <= row; col++) {\n      printf("*");\n    }\n    printf("\\n");\n  }\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "*\n**\n***\n****\n*****" }],
        hints: [
          "The newline belongs to the outer loop, after the inner loop finishes.",
          "The inner loop runs from 1 to row, so row 3 prints three stars.",
          "If the triangle is one long line, move printf(\"\\n\") outside the inner loop.",
        ],
        reward: { xp: 80, coins: 22 },
      },
      {
        id: "w3m5",
        order: 5,
        title: "BOSS: FizzBuzz Gate",
        tagline: "The classic interview gate",
        skill: "boss · loops + conditions",
        boss: true,
        story:
          "The citadel's gatekeeper asks the oldest question in programming. Multiples of 3 say Fizz, of 5 say Buzz, of both say FizzBuzz.",
        objective: "Print FizzBuzz for 1 to 15, one value per line.",
        concept: {
          title: "Check the most specific case first",
          points: [
            "A number divisible by both 3 and 5 must be tested before either alone.",
            "i % 15 == 0 is the same test as divisible by 3 and 5.",
          ],
          snippet:
            'if (i % 15 == 0) printf("FizzBuzz\\n");\nelse if (i % 3 == 0) printf("Fizz\\n");\nelse if (i % 5 == 0) printf("Buzz\\n");\nelse printf("%d\\n", i);',
          analogy: "Answer the hardest question first, or the easier one will answer for it.",
        },
        fieldNote:
          "Ordering conditions from most to least specific is a habit that prevents real logic bugs.",
        starter: shell("FizzBuzz from 1 to 15"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  for (int i = 1; i <= 15; i++) {\n    if (i % 15 == 0) {\n      printf("FizzBuzz\\n");\n    } else if (i % 3 == 0) {\n      printf("Fizz\\n");\n    } else if (i % 5 == 0) {\n      printf("Buzz\\n");\n    } else {\n      printf("%d\\n", i);\n    }\n  }\n  return 0;\n}\n',
        checks: [
          {
            type: "output",
            mode: "exact",
            value:
              "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
          },
        ],
        hints: [
          "Loop i from 1 to 15.",
          "Test i % 15 first, otherwise 15 prints Fizz or Buzz only.",
          "The final else prints the number itself with %d.",
        ],
        reward: { xp: 150, coins: 48 },
      },
    ],
  },
  {
    id: "w4",
    index: 4,
    name: "Function Forge",
    subtitle: "Functions and recursion",
    blurb: "Here the citadel's machines are built. Break a big problem into small, named parts.",
    accent: "amber",
    missions: [
      {
        id: "w4m1",
        order: 1,
        title: "Forge a function",
        tagline: "Define and call",
        skill: "functions",
        story: "The forge needs a reusable tool: one that squares any number you hand it.",
        objective: "Write int square(int n) and print square(4).",
        concept: {
          title: "A function is a named machine",
          points: [
            "int square(int n) { return n * n; } takes one input, gives one output.",
            "Define it above main(), then call it like any value: square(4).",
          ],
          snippet: 'int square(int n) {\n  return n * n;\n}\n\nint main() {\n  printf("%d\\n", square(4));\n}',
          analogy: "A function is a vending machine: you put something in, one thing comes out, same every time.",
        },
        fieldNote:
          "Functions are how real codebases stay readable. If you can name it, you can test it.",
        starter: fnShell("int square(int n) {\n  // return n multiplied by itself\n}", "Print square(4)"),
        solution:
          '#include <stdio.h>\n\nint square(int n) {\n  return n * n;\n}\n\nint main() {\n  printf("%d\\n", square(4));\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "16" }],
        hints: [
          "The function needs a return statement: return n * n;",
          "Call it inside printf as the value for %d.",
          "square(4) evaluates to 16 before printf prints it.",
        ],
        reward: { xp: 70, coins: 18 },
      },
      {
        id: "w4m2",
        order: 2,
        title: "Two inputs",
        tagline: "Parameters",
        skill: "parameters",
        story: "The forge now needs a tool that takes two numbers and adds them.",
        objective: "Write int add(int a, int b) and print add(7, 35).",
        concept: {
          title: "Parameters are ordered",
          points: [
            "Each parameter gets its own type and name: int add(int a, int b).",
            "Arguments are matched by position, so add(7, 35) puts 7 in a and 35 in b.",
          ],
          snippet: 'int add(int a, int b) {\n  return a + b;\n}',
          analogy: "Parameters are slots in a machine's control panel. The order you plug things in matters.",
        },
        fieldNote:
          "Mismatched argument order is a real bug class. Name parameters so the order is obvious.",
        starter: fnShell("int add(int a, int b) {\n  // return the sum\n}", "Print add(7, 35)"),
        solution:
          '#include <stdio.h>\n\nint add(int a, int b) {\n  return a + b;\n}\n\nint main() {\n  printf("%d\\n", add(7, 35));\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "42" }],
        hints: [
          "Two parameters means two commas in the definition.",
          "The body is just return a + b;",
          "Call it as add(7, 35).",
        ],
        reward: { xp: 75, coins: 19 },
      },
      {
        id: "w4m3",
        order: 3,
        title: "Early exit",
        tagline: "Return inside if",
        skill: "return",
        story: "The forge's comparator should answer immediately once it knows the answer.",
        objective: "Write int max(int a, int b) that returns the larger value, then print max(19, 42).",
        concept: {
          title: "return ends the function immediately",
          points: [
            "Once a return runs, nothing after it in that function executes.",
            "That lets you handle the obvious case first and let the rest of the body be the fallback.",
          ],
          snippet: 'int max(int a, int b) {\n  if (a > b) return a;\n  return b;\n}',
          analogy: "A return is walking out of the room. Everything after it in the room is abandoned.",
        },
        fieldNote:
          "Early returns flatten nested code. Guard clauses at the top of a function are standard practice.",
        starter: fnShell("int max(int a, int b) {\n  // return the larger value\n}", "Print max(19, 42)"),
        solution:
          '#include <stdio.h>\n\nint max(int a, int b) {\n  if (a > b) {\n    return a;\n  }\n  return b;\n}\n\nint main() {\n  printf("%d\\n", max(19, 42));\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "42" }],
        hints: [
          "If a is bigger, return it right away.",
          "If you reach the end of the function, b must be the larger one.",
          "Make sure the second return isn't inside the if.",
        ],
        reward: { xp: 80, coins: 20 },
      },
      {
        id: "w4m4",
        order: 4,
        title: "Recursion engine",
        tagline: "A function that calls itself",
        skill: "recursion",
        story: "The forge's oldest machine computes factorials by unfolding itself until it hits one.",
        objective: "Write a recursive factorial and print factorial(5).",
        concept: {
          title: "Base case, then shrink",
          points: [
            "factorial(5) = 5 * factorial(4), down to factorial(1) = 1.",
            "The base case stops the chain. Without it, the call stack overflows.",
          ],
          snippet:
            'int factorial(int n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}',
          analogy: "Recursion is a stack of sticky notes: each one waits until the note below it is answered.",
        },
        fieldNote:
          "Recursion is the natural fit for trees, nested structures and divide-and-conquer algorithms.",
        starter: fnShell("int factorial(int n) {\n  // base case, then n * factorial(n - 1)\n}", "Print factorial(5)"),
        solution:
          '#include <stdio.h>\n\nint factorial(int n) {\n  if (n <= 1) {\n    return 1;\n  }\n  return n * factorial(n - 1);\n}\n\nint main() {\n  printf("%d\\n", factorial(5));\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "120" }],
        hints: [
          "Start with the stopping case: if (n <= 1) return 1;",
          "Otherwise return n * factorial(n - 1);",
          "Without the base case the call stack overflows and the run fails.",
        ],
        reward: { xp: 95, coins: 24 },
      },
      {
        id: "w4m5",
        order: 5,
        title: "BOSS: Fibonacci Core",
        tagline: "Two recursive calls",
        skill: "boss · recursion",
        boss: true,
        story:
          "The core computes each number as the sum of the two before it. It is slow, elegant and the classic first recursion exam question.",
        objective: "Print fib(10) using recursion. The answer is 55.",
        concept: {
          title: "Branching recursion",
          points: [
            "fib(n) = fib(n - 1) + fib(n - 2), with fib(0) = 0 and fib(1) = 1.",
            "Two recursive calls mean the work doubles at each level — this is why memoisation exists.",
          ],
          snippet: 'int fib(int n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}',
          analogy: "Each call asks two smaller questions. The tree of questions grows fast.",
        },
        fieldNote:
          "Understanding this cost is exactly what leads to dynamic programming later in your degree.",
        starter: fnShell("int fib(int n) {\n  // base case, then fib(n - 1) + fib(n - 2)\n}", "Print fib(10)"),
        solution:
          '#include <stdio.h>\n\nint fib(int n) {\n  if (n <= 1) {\n    return n;\n  }\n  return fib(n - 1) + fib(n - 2);\n}\n\nint main() {\n  printf("%d\\n", fib(10));\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "55" }],
        hints: [
          "Two base cases collapse into one: if (n <= 1) return n;",
          "The recursive step adds the previous two results.",
          "fib(10) = 55. If you get 89 you printed fib(11).",
        ],
        reward: { xp: 170, coins: 50 },
      },
    ],
  },
  {
    id: "w5",
    index: 5,
    name: "Array Archives",
    subtitle: "Arrays and strings",
    blurb: "Shelves of identical drawers, numbered from zero. The archive holds every record you'll ever need.",
    accent: "blue",
    missions: [
      {
        id: "w5m1",
        order: 1,
        title: "Open a drawer",
        tagline: "Indexing arrays",
        skill: "arrays",
        story: "Five score drawers sit in a row. Reach into the third one.",
        objective: "Store {10, 20, 30, 40, 50} in an int array and print the third value as: Third: 30",
        concept: {
          title: "Arrays are numbered from zero",
          points: [
            "int scores[5] = {10, 20, 30, 40, 50}; creates five ints in a row.",
            "The third value is scores[2] because counting starts at 0.",
          ],
          snippet: 'int scores[5] = {10, 20, 30, 40, 50};\nprintf("Third: %d\\n", scores[2]);',
          analogy: "Index 0 is the first drawer. Off-by-one is the most common bug in this world.",
        },
        fieldNote:
          "Every array, buffer and string in C is indexed from 0. Getting comfortable here prevents a thousand bugs.",
        starter: shell("Create an array {10, 20, 30, 40, 50} and print the third value: Third: 30"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  int scores[5] = {10, 20, 30, 40, 50};\n  printf("Third: %d\\n", scores[2]);\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "Third: 30" }],
        hints: [
          "Declare it with a size and an initialiser list.",
          "The third drawer is index 2, not 3.",
          "printf(\"Third: %d\\n\", scores[2]);",
        ],
        reward: { xp: 80, coins: 20 },
      },
      {
        id: "w5m2",
        order: 2,
        title: "Sum the archive",
        tagline: "Arrays and loops together",
        skill: "array traversal",
        story: "The archive needs a total of every score on the shelf.",
        objective: "Sum {10, 20, 30, 40, 50} with a loop and print: Total: 150",
        concept: {
          title: "Walk the array with an index",
          points: [
            "A for loop from 0 to 4 visits every slot: i < 5, not i <= 5.",
            "Going one past the end reads memory you don't own.",
          ],
          snippet: 'for (int i = 0; i < 5; i++) {\n  sum += scores[i];\n}',
          analogy: "You don't need to know what's in the drawers to add them up, just how many there are.",
        },
        fieldNote:
          "Loop bounds are where buffer overflows are born. Say the range out loud: zero to length minus one.",
        starter: shell("Sum the array {10, 20, 30, 40, 50} and print: Total: 150"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  int scores[5] = {10, 20, 30, 40, 50};\n  int sum = 0;\n  for (int i = 0; i < 5; i++) {\n    sum += scores[i];\n  }\n  printf("Total: %d\\n", sum);\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "Total: 150" }],
        hints: [
          "Start sum at 0 before the loop.",
          "Use i < 5 so the last index is 4.",
          "Add with sum += scores[i];",
        ],
        reward: { xp: 85, coins: 21 },
      },
      {
        id: "w5m3",
        order: 3,
        title: "Find the peak",
        tagline: "Max in an array",
        skill: "search pattern",
        story: "One reading in the archive is the highest. The machine needs to know which.",
        objective: "Find the largest value in {4, 19, 7, 23, 11} and print: Max: 23",
        concept: {
          title: "Assume the first is the best, then compare",
          points: [
            "Start with max = values[0], then loop from index 1.",
            "Only replace max when you find something strictly larger.",
          ],
          snippet:
            'int max = values[0];\nfor (int i = 1; i < 5; i++) {\n  if (values[i] > max) max = values[i];\n}',
          analogy: "Keep the champion on the podium. A challenger only replaces them by winning.",
        },
        fieldNote:
          "This 'best so far' pattern becomes min, longest, highest scoring and top-N in real applications.",
        starter: shell("Find the largest of {4, 19, 7, 23, 11} and print: Max: 23"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  int values[5] = {4, 19, 7, 23, 11};\n  int max = values[0];\n  for (int i = 1; i < 5; i++) {\n    if (values[i] > max) {\n      max = values[i];\n    }\n  }\n  printf("Max: %d\\n", max);\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "Max: 23" }],
        hints: [
          "Start max at values[0], not 0 — the array could be all negative.",
          "Loop from i = 1 since you already have the first value.",
          "Replace max only when values[i] > max.",
        ],
        reward: { xp: 90, coins: 23 },
      },
      {
        id: "w5m4",
        order: 4,
        title: "Strings are char arrays",
        tagline: "Text in C",
        skill: "strings",
        story: "A name plate needs its text and its length. In C, a string is just characters with a zero at the end.",
        objective: "Print Agent: Nova and Length: 4",
        concept: {
          title: "The terminating zero",
          points: [
            'char agent[] = "Nova"; stores N, o, v, a and a hidden \\0.',
            "printf(\"%s\") and strlen both stop at that zero. No zero means runaway memory reads.",
          ],
          snippet: 'char agent[] = "Nova";\nprintf("Agent: %s\\n", agent);\nprintf("Length: %d\\n", strlen(agent));',
          analogy: "The zero is a full stop. Without punctuation, the reader keeps going into the next sentence.",
        },
        fieldNote:
          "Every text bug you'll meet in C traces back to buffers and terminators. Respect the zero.",
        starter: shell('Print Agent: Nova and Length: 4 using a char array'),
        solution:
          '#include <stdio.h>\n#include <string.h>\n\nint main() {\n  char agent[] = "Nova";\n  printf("Agent: %s\\n", agent);\n  printf("Length: %d\\n", strlen(agent));\n  return 0;\n}\n',
        checks: [
          { type: "output", mode: "contains", value: "Agent: Nova" },
          { type: "output", mode: "contains", value: "Length: 4" },
        ],
        hints: [
          "char agent[] = \"Nova\"; lets the compiler size the array for you.",
          "Use %s to print the whole string.",
          "strlen(agent) returns 4 — the terminating zero isn't counted.",
        ],
        reward: { xp: 95, coins: 24 },
      },
      {
        id: "w5m5",
        order: 5,
        title: "BOSS: Reverse the archive",
        tagline: "Backwards through a string",
        skill: "boss · string traversal",
        boss: true,
        story: "The archive's final lock reads the word backwards. Print orbit reversed, one character at a time.",
        objective: "Reverse the string orbit and print: tibro",
        concept: {
          title: "Count down from the last index",
          points: [
            "The last character of a 5-letter word sits at index 4, which is strlen(word) - 1.",
            "Counting down with i-- and stopping at i >= 0 reverses any string.",
          ],
          snippet:
            'int len = strlen(word);\nfor (int i = len - 1; i >= 0; i--) {\n  printf("%c", word[i]);\n}',
          analogy: "Reading a sentence from the last word to the first, without moving the words themselves.",
        },
        fieldNote:
          "Reverse, palindrome and rotation checks are standard lab exercises and interview warm-ups.",
        starter: shell('Reverse the string "orbit" and print it'),
        solution:
          '#include <stdio.h>\n#include <string.h>\n\nint main() {\n  char word[] = "orbit";\n  int len = strlen(word);\n  for (int i = len - 1; i >= 0; i--) {\n    printf("%c", word[i]);\n  }\n  printf("\\n");\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "tibro" }],
        hints: [
          "Start the loop at strlen(word) - 1, not at strlen(word).",
          "Print each character with %c, not %s.",
          "The loop must keep going while i >= 0.",
        ],
        reward: { xp: 180, coins: 52 },
      },
    ],
  },
  {
    id: "w6",
    index: 6,
    name: "Pointer Wastes",
    subtitle: "Addresses and memory",
    blurb: "The last world is built from addresses. Every variable has one. Learn to follow it.",
    accent: "rose",
    missions: [
      {
        id: "w6m1",
        order: 1,
        title: "Follow the address",
        tagline: "& and *",
        skill: "pointers",
        story: "The wastes only speak in addresses. Ask a variable where it lives, then read what's inside.",
        objective: "Store 42 in energy, point p at it, then print *p.",
        concept: {
          title: "& takes an address, * follows one",
          points: [
            "int *p = &energy; stores the address of energy in p.",
            "*p reads the value living at that address — the same 42.",
          ],
          snippet: 'int energy = 42;\nint *p = &energy;\nprintf("%d\\n", *p);',
          analogy: "& is writing down a house address. * is walking to that address and looking inside.",
        },
        fieldNote:
          "Pointers are how C passes big data cheaply and how every data structure in your degree is built.",
        starter: shell("Store 42 in energy, point p at it, print *p"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  int energy = 42;\n  int *p = &energy;\n  printf("%d\\n", *p);\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "42" }],
        hints: [
          "Declare the pointer as int *p;",
          "Initialise it with the address: int *p = &energy;",
          "Print the pointed-to value with *p, not p.",
        ],
        reward: { xp: 100, coins: 26 },
      },
      {
        id: "w6m2",
        order: 2,
        title: "Write through a pointer",
        tagline: "Mutating through *",
        skill: "dereference assignment",
        story: "The shield generator is behind a locked panel. The only way in is through its address.",
        objective: "With shield = 10 and a pointer p to it, add 5 through *p, then print: Shield: 15",
        concept: {
          title: "*p = ... writes to the original",
          points: [
            "*p = *p + 5; changes the variable p points at, not a copy.",
            "This is why functions take pointers when they need to modify your variable.",
          ],
          snippet: 'int shield = 10;\nint *p = &shield;\n*p = *p + 5;',
          analogy: "You're editing the original document, not a photocopy.",
        },
        fieldNote:
          "Pass-by-pointer is how C functions return more than one value or update a caller's data.",
        starter: shell("Set shield to 10, point p at it, add 5 through *p, print: Shield: 15"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  int shield = 10;\n  int *p = &shield;\n  *p = *p + 5;\n  printf("Shield: %d\\n", shield);\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "Shield: 15" }],
        hints: [
          "The assignment target is *p, not p.",
          "*p = *p + 5; reads through the pointer and writes back.",
          "Print shield (not *p) to prove the original changed.",
        ],
        reward: { xp: 105, coins: 28 },
      },
      {
        id: "w6m3",
        order: 3,
        title: "Swap protocol",
        tagline: "Pointers into functions",
        skill: "pass by reference",
        story: "Two values are stuck in the wrong order. A function can only fix them if it holds their addresses.",
        objective: "Swap x = 9 and y = 2 using void swap(int *a, int *b), then print: x=2 y=9",
        concept: {
          title: "Pass the address, change the original",
          points: [
            "C passes arguments by value. Passing &x gives the function a way back to x.",
            "Inside swap, *a and *b are the caller's variables.",
          ],
          snippet:
            'void swap(int *a, int *b) {\n  int temp = *a;\n  *a = *b;\n  *b = temp;\n}',
          analogy: "Handing someone your locker key instead of a photo of what's inside.",
        },
        fieldNote:
          "Every sorting algorithm you'll write in second year relies on exactly this swap.",
        starter: fnShell(
          "void swap(int *a, int *b) {\n  // use a temp int and the * operator\n}",
          "Swap x = 9 and y = 2 with swap(&x, &y), then print: x=2 y=9"
        ),
        solution:
          '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n  int temp = *a;\n  *a = *b;\n  *b = temp;\n}\n\nint main() {\n  int x = 9;\n  int y = 2;\n  swap(&x, &y);\n  printf("x=%d y=%d\\n", x, y);\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "x=2 y=9" }],
        hints: [
          "Save one value in temp before overwriting it.",
          "Write through the pointers: *a = *b;",
          "Call it with addresses: swap(&x, &y);",
        ],
        reward: { xp: 115, coins: 30 },
      },
      {
        id: "w6m4",
        order: 4,
        title: "Pointer arithmetic",
        tagline: "Arrays are addresses",
        skill: "pointer arithmetic",
        story: "An array is just its first address. Walk two steps forward and see what's there.",
        objective: "With data = {3, 6, 9, 12} and p = data, print *(p + 2).",
        concept: {
          title: "Adding to a pointer moves by elements",
          points: [
            "The name of an array is the address of its first element, so p = data works.",
            "p + 2 moves two ints forward, which is the same as data[2].",
          ],
          snippet: 'int data[4] = {3, 6, 9, 12};\nint *p = data;\nprintf("%d\\n", *(p + 2));',
          analogy: "Pointer arithmetic counts in whole houses, not in metres.",
        },
        fieldNote:
          "data[i] is literally defined as *(data + i). Knowing that makes C stop feeling magical.",
        starter: shell("Point p at data = {3, 6, 9, 12} and print *(p + 2)"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  int data[4] = {3, 6, 9, 12};\n  int *p = data;\n  printf("%d\\n", *(p + 2));\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "9" }],
        hints: [
          "You don't need & for an array: int *p = data;",
          "p + 2 is an address; *(p + 2) is the value there.",
          "That's the third element, 9.",
        ],
        reward: { xp: 125, coins: 32 },
      },
      {
        id: "w6m5",
        order: 5,
        title: "BOSS: The Memory Keeper",
        tagline: "Walk the whole array",
        skill: "boss · pointer iteration",
        boss: true,
        story:
          "The keeper accepts one number: the total of every value in the array, read only through a pointer.",
        objective: "Sum {5, 8, 10, 12, 5} using a pointer and print: Sum: 40",
        concept: {
          title: "Dereference inside the loop",
          points: [
            "p + i gives the address of element i, so *(p + i) is its value.",
            "The accumulator still starts at 0 and lives outside the loop.",
          ],
          snippet: 'int *p = data;\nint sum = 0;\nfor (int i = 0; i < 5; i++) {\n  sum += *(p + i);\n}',
          analogy: "You hold one address and count doors down the corridor instead of writing down all five.",
        },
        fieldNote:
          "This is the mental model behind every buffer, packet and dynamic array you will ever touch.",
        starter: shell("Sum {5, 8, 10, 12, 5} through a pointer and print: Sum: 40"),
        solution:
          '#include <stdio.h>\n\nint main() {\n  int data[5] = {5, 8, 10, 12, 5};\n  int *p = data;\n  int sum = 0;\n  for (int i = 0; i < 5; i++) {\n    sum += *(p + i);\n  }\n  printf("Sum: %d\\n", sum);\n  return 0;\n}\n',
        checks: [{ type: "output", mode: "exact", value: "Sum: 40" }],
        hints: [
          "Set the pointer once, before the loop: int *p = data;",
          "Inside the loop add *(p + i), not p + i.",
          "The sum needs to start at 0 outside the loop.",
        ],
        reward: { xp: 220, coins: 60 },
      },
    ],
  },
];

export const MISSIONS = WORLDS.flatMap((world) =>
  world.missions.map((mission) => ({ ...mission, world: world.id, worldName: world.name }))
);

export function missionById(id) {
  return MISSIONS.find((m) => m.id === id) || null;
}

export function worldById(id) {
  return WORLDS.find((w) => w.id === id) || null;
}

export function worldOfMission(mission) {
  return mission ? worldById(mission.world) : null;
}

export function missionNumber(mission) {
  if (!mission) return 0;
  const world = worldById(mission.world);
  const index = world ? world.missions.findIndex((m) => m.id === mission.id) : 0;
  return WORLDS.slice(0, WORLDS.indexOf(world)).reduce((n, w) => n + w.missions.length, 0) + index + 1;
}

// Mastery challenge keys are shared with src/lib/game/mastery.js: `world-w1`,
// `topic-w1m4`. Kept as literals here so this module stays import-free.
export function isWorldMastered(worldId, progress) {
  return Boolean(progress?.mastery?.[`world-${worldId}`]);
}

// A world opens only when every quest in the previous world is cleared AND the
// previous world's Mastery Challenge has been passed.
export function isWorldUnlocked(worldId, progress) {
  const index = WORLDS.findIndex((w) => w.id === worldId);
  if (index <= 0) return true;
  const previous = WORLDS[index - 1];
  const cleared = previous.missions.every((m) => Boolean(progress?.missions?.[m.id]));
  return cleared && isWorldMastered(previous.id, progress);
}

// The world the learner is working in: a locked world, a world with quests left,
// or a finished world whose Mastery Challenge is still pending.
export function activeWorld(progress) {
  for (const world of WORLDS) {
    if (!isWorldUnlocked(world.id, progress)) return world;
    if (world.missions.some((m) => !progress?.missions?.[m.id])) return world;
    if (!isWorldMastered(world.id, progress)) return world;
  }
  return WORLDS[WORLDS.length - 1];
}

// A lesson can be challenged once it is on the trail and not yet cleared.
export function canSkipMission(missionId, progress) {
  const mission = missionById(missionId);
  if (!mission) return false;
  if (progress?.missions?.[missionId]) return false;
  if (progress?.mastery?.[`topic-${missionId}`]) return false;
  return isMissionUnlocked(missionId, progress);
}

export function worldCleared(worldId, progress) {
  const world = worldById(worldId);
  return Boolean(world) && world.missions.every((m) => Boolean(progress?.missions?.[m.id]));
}

export function isMissionUnlocked(missionId, progress) {
  const mission = missionById(missionId);
  if (!mission) return false;
  if (!isWorldUnlocked(mission.world, progress)) return false;
  const world = worldById(mission.world);
  const index = world.missions.findIndex((m) => m.id === missionId);
  if (index === 0) return true;
  return Boolean(progress?.missions?.[world.missions[index - 1].id]);
}

export function currentMission(progress) {
  const world = activeWorld(progress);
  if (!world) return null;
  const pending = world.missions.find((m) => !progress?.missions?.[m.id]);
  return pending || world.missions[world.missions.length - 1] || null;
}

export function worldProgress(world, progress) {
  const done = world.missions.filter((m) => progress?.missions?.[m.id]).length;
  return { done, total: world.missions.length, pct: Math.round((done / world.missions.length) * 100) };
}

export function nextMission(missionId) {
  const index = MISSIONS.findIndex((m) => m.id === missionId);
  return index >= 0 ? MISSIONS[index + 1] || null : null;
}