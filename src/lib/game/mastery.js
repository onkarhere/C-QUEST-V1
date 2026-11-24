import { evaluateAchievements } from "@/lib/game/achievements";
import { worldById } from "@/lib/game/curriculum";

// Mastery challenges are practical, SPPU-style lab questions: a real program,
// a fixed set of values from the lab sheet, and exact expected output.
const shell = (task) =>
  `#include <stdio.h>\n\nint main() {\n  // ${task}\n  \n  return 0;\n}\n`;

const exact = (value) => [{ type: "output", mode: "exact", value }];

const topic = (missionId, spec) => ({
  id: `topic-${missionId}`,
  kind: "topic",
  missionId,
  ...spec,
});

const world = (worldId, spec) => ({
  id: `world-${worldId}`,
  kind: "world",
  worldId,
  ...spec,
});

// ---------------------------------------------------------------------------
// Topic skip tests — one per lesson, same style as the SPPU practical list.
// ---------------------------------------------------------------------------
export const TOPIC_CHALLENGES = {
  w1m1: topic("w1m1", {
    title: "Lab banner",
    brief:
      "Practical 1: write a program to print the name of your laboratory and your university on separate lines, exactly as the lab manual shows.",
    prompt: "Print two lines: C PROGRAMMING LAB, then Savitribai Phule Pune University.",
    concepts: ["printf", "escape sequences", "statement order"],
    starter: shell("print the two banner lines"),
    checks: exact("C PROGRAMMING LAB\nSavitribai Phule Pune University"),
    hints: [
      "One printf can print one line; use \\n where the line should break.",
      "C is case sensitive: C PROGRAMMING LAB must be in capitals.",
      'printf("C PROGRAMMING LAB\\n"); then printf("Savitribai Phule Pune University\\n");',
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  printf("C PROGRAMMING LAB\\n");\n  printf("Savitribai Phule Pune University\\n");\n  return 0;\n}\n',
    reward: { xp: 70, coins: 15 },
    revisit: ["w1m1"],
  }),

  w1m2: topic("w1m2", {
    title: "Student record",
    brief:
      "Practical 2: declare variables for a student's roll number and marks, assign them, and print the record.",
    prompt: "Use roll number 23107 and marks 87. Print Roll: 23107 and Marks: 87.",
    concepts: ["int variables", "%d", "declaration vs assignment"],
    starter: shell("declare roll and marks, then print both"),
    checks: exact("Roll: 23107\nMarks: 87"),
    hints: [
      "Declare both variables before you print anything: int roll = 23107;",
      "Use %d once per integer, and pass the variable after the format string.",
      'printf("Roll: %d\\n", roll); and printf("Marks: %d\\n", marks);',
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int roll = 23107;\n  int marks = 87;\n  printf("Roll: %d\\n", roll);\n  printf("Marks: %d\\n", marks);\n  return 0;\n}\n',
    reward: { xp: 70, coins: 15 },
    revisit: ["w1m2"],
  }),

  w1m3: topic("w1m3", {
    title: "Salary slip",
    brief:
      "Practical 3: a salary slip mixes a decimal amount, a decimal bonus and a single-letter grade. Store each in the correct type.",
    prompt: "Salary 25000.50, bonus 2500.25, grade 'A'. Print each with two decimals or as a character.",
    concepts: ["double", "char", "%.2f", "%c"],
    starter: shell("store salary, bonus and grade, then print them"),
    checks: exact("Salary: 25000.50\nBonus: 2500.25\nGrade: A"),
    hints: [
      "25000.50 cannot live in an int — it needs double.",
      "%.2f keeps exactly two decimal places; %c prints a char.",
      "char grade = 'A'; uses single quotes, not double quotes.",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  double salary = 25000.50;\n  double bonus = 2500.25;\n  char grade = \'A\';\n  printf("Salary: %.2f\\n", salary);\n  printf("Bonus: %.2f\\n", bonus);\n  printf("Grade: %c\\n", grade);\n  return 0;\n}\n',
    reward: { xp: 75, coins: 16 },
    revisit: ["w1m3"],
  }),

  w1m4: topic("w1m4", {
    title: "Simple calculator",
    brief:
      "Practical 4: implement a calculator for two numbers using all five arithmetic operators. x = 17 and y = 5 come from the lab sheet.",
    prompt: "Print Sum, Difference, Product, Quotient and Remainder — one per line, in that order.",
    concepts: ["arithmetic operators", "integer division", "modulus"],
    starter: shell("x = 17, y = 5: print all five results"),
    checks: exact("Sum: 22\nDifference: 12\nProduct: 85\nQuotient: 3\nRemainder: 2"),
    hints: [
      "The five operators are + - * / and %.",
      "17 / 5 gives 3 because both numbers are ints — that is exactly what the lab expects here.",
      "Remainder comes from the modulus operator: x % y.",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int x = 17;\n  int y = 5;\n  printf("Sum: %d\\n", x + y);\n  printf("Difference: %d\\n", x - y);\n  printf("Product: %d\\n", x * y);\n  printf("Quotient: %d\\n", x / y);\n  printf("Remainder: %d\\n", x % y);\n  return 0;\n}\n',
    reward: { xp: 85, coins: 18 },
    revisit: ["w1m4"],
  }),

  w1m5: topic("w1m5", {
    title: "Percentage report",
    brief:
      "Practical 5: three subject marks out of 100 each — 78, 85 and 92. Compute the total and the percentage.",
    prompt: "Print Total: 255 and Percentage: 85.00 with two decimals.",
    concepts: ["accumulation", "double division", "%.2f"],
    starter: shell("total three marks, then compute percentage"),
    checks: exact("Total: 255\nPercentage: 85.00"),
    hints: [
      "Add the three marks into an int total.",
      "Percentage = total / 300.0 * 100. Dividing by an int truncates.",
      'printf("Percentage: %.2f\\n", percentage);',
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int m1 = 78;\n  int m2 = 85;\n  int m3 = 92;\n  int total = m1 + m2 + m3;\n  double percentage = total / 300.0 * 100;\n  printf("Total: %d\\n", total);\n  printf("Percentage: %.2f\\n", percentage);\n  return 0;\n}\n',
    reward: { xp: 95, coins: 20 },
    revisit: ["w1m5"],
  }),

  w2m1: topic("w2m1", {
    title: "Even or odd",
    brief: "Practical 6: check whether a number entered in the lab is even or odd using the modulus operator.",
    prompt: "For 47 print exactly: 47 is odd",
    concepts: ["if / else", "%", "equality"],
    starter: shell("check whether 47 is even or odd"),
    checks: exact("47 is odd"),
    hints: [
      "A number is even when n % 2 == 0.",
      "The else branch handles every other case.",
      'printf("%d is odd\\n", n); inside the else.',
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int n = 47;\n  if (n % 2 == 0) {\n    printf("%d is even\\n", n);\n  } else {\n    printf("%d is odd\\n", n);\n  }\n  return 0;\n}\n',
    reward: { xp: 80, coins: 16 },
    revisit: ["w2m1"],
  }),

  w2m2: topic("w2m2", {
    title: "Largest of three",
    brief:
      "Practical 7: the classic first-year question — find the largest of three numbers using an if-else ladder.",
    prompt: "a = 25, b = 78, c = 43. Print: Largest: 78",
    concepts: ["else-if ladder", "comparisons", "ordering conditions"],
    starter: shell("find the largest of 25, 78 and 43"),
    checks: exact("Largest: 78"),
    hints: [
      "Test a against both others first: if (a >= b && a >= c).",
      "Then test b against c in the middle rung.",
      "The last else needs no condition — it is the only one left.",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int a = 25;\n  int b = 78;\n  int c = 43;\n  if (a >= b && a >= c) {\n    printf("Largest: %d\\n", a);\n  } else if (b >= a && b >= c) {\n    printf("Largest: %d\\n", b);\n  } else {\n    printf("Largest: %d\\n", c);\n  }\n  return 0;\n}\n',
    reward: { xp: 85, coins: 17 },
    revisit: ["w2m2"],
  }),

  w2m3: topic("w2m3", {
    title: "Grade calculation",
    brief:
      "Practical 8: convert a percentage into the university's grade bands — 75+ Distinction, 60+ First Class, 50+ Second Class, 40+ Pass, otherwise Fail.",
    prompt: "For 68 print Percentage: 68.00 then Grade: First Class",
    concepts: ["else-if ladder", "boundaries", "%.2f"],
    starter: shell("percentage 68.00: print the grade band"),
    checks: exact("Percentage: 68.00\nGrade: First Class"),
    hints: [
      "Start with the highest band: if (pct >= 75).",
      "68 is not >= 75 but it is >= 60, so the second rung catches it.",
      "Print the percentage first with %.2f, then the grade.",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  double pct = 68.00;\n  printf("Percentage: %.2f\\n", pct);\n  if (pct >= 75) {\n    printf("Grade: Distinction\\n");\n  } else if (pct >= 60) {\n    printf("Grade: First Class\\n");\n  } else if (pct >= 50) {\n    printf("Grade: Second Class\\n");\n  } else if (pct >= 40) {\n    printf("Grade: Pass\\n");\n  } else {\n    printf("Grade: Fail\\n");\n  }\n  return 0;\n}\n',
    reward: { xp: 90, coins: 18 },
    revisit: ["w2m3"],
  }),

  w2m4: topic("w2m4", {
    title: "Temperature conversion",
    brief:
      "Practical 9: convert Celsius to Fahrenheit with the formula F = C * 9 / 5 + 32, keeping two decimal places.",
    prompt: "For 37 C print Celsius: 37.00 then Fahrenheit: 98.60",
    concepts: ["floating point arithmetic", "operator precedence", "%.2f"],
    starter: shell("convert 37 C to Fahrenheit"),
    checks: exact("Celsius: 37.00\nFahrenheit: 98.60"),
    hints: [
      "Divide by 5.0, not 5, or the whole expression becomes integer arithmetic.",
      "Store Celsius in a double so it prints with decimals.",
      "double f = c * 9 / 5.0 + 32;",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  double c = 37;\n  double f = c * 9 / 5.0 + 32;\n  printf("Celsius: %.2f\\n", c);\n  printf("Fahrenheit: %.2f\\n", f);\n  return 0;\n}\n',
    reward: { xp: 85, coins: 17 },
    revisit: ["w2m4"],
  }),

  w2m5: topic("w2m5", {
    title: "Leap year check",
    brief:
      "Practical 10: apply the full leap-year rule, including the century exception, to a year from the lab sheet.",
    prompt: "For 2100 print exactly: 2100 is not a leap year",
    concepts: ["compound conditions", "brackets", "&& / ||"],
    starter: shell("is 2100 a leap year?"),
    checks: exact("2100 is not a leap year"),
    hints: [
      "2100 divides by 4, so the simple rule would wrongly call it a leap year.",
      "The century exception belongs to the first half: (y % 4 == 0 && y % 100 != 0).",
      "OR that whole group with y % 400 == 0.",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int y = 2100;\n  if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) {\n    printf("%d is a leap year\\n", y);\n  } else {\n    printf("%d is not a leap year\\n", y);\n  }\n  return 0;\n}\n',
    reward: { xp: 105, coins: 21 },
    revisit: ["w2m5"],
  }),

  w3m1: topic("w3m1", {
    title: "Multiplication table",
    brief: "Practical 11: print the multiplication table of 7 from 1 to 5 using a for loop.",
    prompt: "Each line reads 7 x n = result.",
    concepts: ["for loop", "loop counter", "formatted output"],
    starter: shell("table of 7, first five rows"),
    checks: exact("7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35"),
    hints: [
      "Loop i from 1 to 5 inclusive.",
      'Print with three placeholders: printf("7 x %d = %d\\n", i, 7 * i);',
      "The loop condition must be i <= 5, not i < 5.",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  for (int i = 1; i <= 5; i++) {\n    printf("7 x %d = %d\\n", i, 7 * i);\n  }\n  return 0;\n}\n',
    reward: { xp: 85, coins: 17 },
    revisit: ["w3m1"],
  }),

  w3m2: topic("w3m2", {
    title: "Sum of digits",
    brief:
      "Practical 12: find the sum of the digits of a number using a while loop and the modulus operator.",
    prompt: "For 472 print: Sum of digits: 13",
    concepts: ["while loop", "% 10", "integer division"],
    starter: shell("sum the digits of 472"),
    checks: exact("Sum of digits: 13"),
    hints: [
      "n % 10 gives the last digit; add it to your total.",
      "n / 10 removes that digit — integer division drops the remainder.",
      "Keep looping while n > 0, using a copy so the original stays intact.",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int n = 472;\n  int sum = 0;\n  while (n > 0) {\n    sum += n % 10;\n    n = n / 10;\n  }\n  printf("Sum of digits: %d\\n", sum);\n  return 0;\n}\n',
    reward: { xp: 95, coins: 19 },
    revisit: ["w3m2"],
  }),

  w3m3: topic("w3m3", {
    title: "Factorial",
    brief: "Practical 13: compute the factorial of 6 with a running product inside a loop.",
    prompt: "Print: Factorial: 720",
    concepts: ["accumulator pattern", "for loop", "products"],
    starter: shell("factorial of 6"),
    checks: exact("Factorial: 720"),
    hints: [
      "A product accumulator must start at 1, not 0.",
      "Multiply in the loop: factorial = factorial * i;",
      "Loop i from 1 to 6.",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int fact = 1;\n  for (int i = 1; i <= 6; i++) {\n    fact = fact * i;\n  }\n  printf("Factorial: %d\\n", fact);\n  return 0;\n}\n',
    reward: { xp: 90, coins: 18 },
    revisit: ["w3m3"],
  }),

  w3m4: topic("w3m4", {
    title: "Number triangle",
    brief:
      "Practical 14: the standard pattern-printing question — a right triangle of numbers, four rows deep.",
    prompt: "Row n prints the numbers 1 to n separated by single spaces.",
    concepts: ["nested loops", "row / column counters", "pattern printing"],
    starter: shell("print a 4-row number triangle"),
    checks: exact("1\n1 2\n1 2 3\n1 2 3 4"),
    hints: [
      "The outer loop walks rows 1 to 4; the inner loop prints columns 1 to row.",
      "Print the newline after the inner loop has finished, inside the outer loop.",
      'Use printf("%d ", col) then a separate printf("\\n").',
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  for (int row = 1; row <= 4; row++) {\n    for (int col = 1; col <= row; col++) {\n      printf("%d ", col);\n    }\n    printf("\\n");\n  }\n  return 0;\n}\n',
    reward: { xp: 105, coins: 21 },
    revisit: ["w3m4"],
  }),

  w3m5: topic("w3m5", {
    title: "Prime check",
    brief:
      "Practical 15: test whether 29 is prime by trying every divisor from 2 upwards.",
    prompt: "Print exactly: 29 is prime",
    concepts: ["loops + conditions", "divisibility", "flag variables"],
    starter: shell("check whether 29 is prime"),
    checks: exact("29 is prime"),
    hints: [
      "Start a flag at 1 (assume prime) and set it to 0 when you find a divisor.",
      "Loop d from 2 while d < n; if n % d == 0 it is not prime.",
      "Print based on the flag after the loop ends.",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int n = 29;\n  int prime = 1;\n  for (int d = 2; d < n; d++) {\n    if (n % d == 0) {\n      prime = 0;\n    }\n  }\n  if (prime) {\n    printf("%d is prime\\n", n);\n  } else {\n    printf("%d is not prime\\n", n);\n  }\n  return 0;\n}\n',
    reward: { xp: 110, coins: 22 },
    revisit: ["w3m5"],
  }),

  w4m1: topic("w4m1", {
    title: "Area function",
    brief:
      "Practical 16: write a function that returns the area of a rectangle, then call it from main.",
    prompt: "int areaRect(int l, int b) with l = 14, b = 9. Print: Area: 126",
    concepts: ["function definition", "parameters", "return"],
    starter: shell("define int areaRect(int l, int b) and print areaRect(14, 9)"),
    checks: [...exact("Area: 126"), { type: "code", value: "int\\s+areaRect\\s*\\(" }],
    hints: [
      "Define the function above main(), with its return type written first.",
      "The body is a single return statement: return l * b;",
      'Call it inside printf: printf("Area: %d\\n", areaRect(14, 9));',
    ],
    solution:
      '#include <stdio.h>\n\nint areaRect(int l, int b) {\n  return l * b;\n}\n\nint main() {\n  printf("Area: %d\\n", areaRect(14, 9));\n  return 0;\n}\n',
    reward: { xp: 95, coins: 19 },
    revisit: ["w4m1"],
  }),

  w4m2: topic("w4m2", {
    title: "Digits function",
    brief:
      "Practical 17: move the sum-of-digits logic into a reusable function that takes the number as a parameter.",
    prompt: "int digitSum(int n) with n = 4726. Print: Digit sum: 19",
    concepts: ["parameters", "return values", "loops inside functions"],
    starter: shell("define int digitSum(int n) and print digitSum(4726)"),
    checks: [...exact("Digit sum: 19"), { type: "code", value: "int\\s+digitSum\\s*\\(" }],
    hints: [
      "The function needs a local total and a loop over n % 10 and n / 10.",
      "Do not print inside the function — return the number.",
      'printf("Digit sum: %d\\n", digitSum(4726));',
    ],
    solution:
      '#include <stdio.h>\n\nint digitSum(int n) {\n  int sum = 0;\n  while (n > 0) {\n    sum += n % 10;\n    n = n / 10;\n  }\n  return sum;\n}\n\nint main() {\n  printf("Digit sum: %d\\n", digitSum(4726));\n  return 0;\n}\n',
    reward: { xp: 100, coins: 20 },
    revisit: ["w4m2"],
  }),

  w4m3: topic("w4m3", {
    title: "Largest of three, as a function",
    brief:
      "Practical 18: rewrite the largest-of-three logic as a function with three parameters.",
    prompt: "int largest(int a, int b, int c) with 12, 45, 38. Print: Largest: 45",
    concepts: ["multiple parameters", "early return", "function reuse"],
    starter: shell("define int largest(int a, int b, int c) and print largest(12, 45, 38)"),
    checks: [...exact("Largest: 45"), { type: "code", value: "int\\s+largest\\s*\\(" }],
    hints: [
      "You can return the answer as soon as you know it.",
      "Compare a then b; if neither wins, c is the largest.",
      "Make sure the final return is not inside the if.",
    ],
    solution:
      '#include <stdio.h>\n\nint largest(int a, int b, int c) {\n  if (a >= b && a >= c) {\n    return a;\n  }\n  if (b >= c) {\n    return b;\n  }\n  return c;\n}\n\nint main() {\n  printf("Largest: %d\\n", largest(12, 45, 38));\n  return 0;\n}\n',
    reward: { xp: 105, coins: 21 },
    revisit: ["w4m3"],
  }),

  w4m4: topic("w4m4", {
    title: "Recursive sum",
    brief:
      "Practical 19: write a recursive function for the sum of the first n natural numbers and call it with 10.",
    prompt: "int sumTo(int n) returning 1 + 2 + ... + n. Print: Sum: 55",
    concepts: ["recursion", "base case", "recursive step"],
    starter: shell("define int sumTo(int n) recursively and print sumTo(10)"),
    checks: [...exact("Sum: 55"), { type: "code", value: "sumTo\\s*\\(\\s*n\\s*-\\s*1" }],
    hints: [
      "Base case: if (n <= 0) return 0;",
      "Recursive step: return n + sumTo(n - 1);",
      "Without the base case the call stack overflows.",
    ],
    solution:
      '#include <stdio.h>\n\nint sumTo(int n) {\n  if (n <= 0) {\n    return 0;\n  }\n  return n + sumTo(n - 1);\n}\n\nint main() {\n  printf("Sum: %d\\n", sumTo(10));\n  return 0;\n}\n',
    reward: { xp: 110, coins: 22 },
    revisit: ["w4m4"],
  }),

  w4m5: topic("w4m5", {
    title: "Recursive GCD",
    brief:
      "Practical 20: Euclid's algorithm is the standard recursion example in first-year C. Find the GCD of 48 and 18.",
    prompt: "int gcd(int a, int b). Print: GCD: 6",
    concepts: ["recursion", "modulus", "function contracts"],
    starter: shell("define int gcd(int a, int b) and print gcd(48, 18)"),
    checks: [...exact("GCD: 6"), { type: "code", value: "gcd\\s*\\(\\s*b\\s*,\\s*a\\s*%\\s*b" }],
    hints: [
      "Base case: when b is 0, a is the answer.",
      "Otherwise recurse with gcd(b, a % b).",
      "The order of the arguments swaps on purpose.",
    ],
    solution:
      '#include <stdio.h>\n\nint gcd(int a, int b) {\n  if (b == 0) {\n    return a;\n  }\n  return gcd(b, a % b);\n}\n\nint main() {\n  printf("GCD: %d\\n", gcd(48, 18));\n  return 0;\n}\n',
    reward: { xp: 125, coins: 25 },
    revisit: ["w4m5"],
  }),

  w5m1: topic("w5m1", {
    title: "Average of marks",
    brief:
      "Practical 21: store five subject marks in an array, sum them with a loop, then print the average.",
    prompt: "Marks {45, 67, 89, 34, 56}. Print: Average: 58.20",
    concepts: ["arrays", "array traversal", "double division"],
    starter: shell("average {45, 67, 89, 34, 56}"),
    checks: exact("Average: 58.20"),
    hints: [
      "Declare int marks[5] = {45, 67, 89, 34, 56};",
      "Loop i from 0 while i < 5 and add marks[i].",
      "Divide by 5.0 so the average keeps its decimals, and print with %.2f.",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int marks[5] = {45, 67, 89, 34, 56};\n  int total = 0;\n  for (int i = 0; i < 5; i++) {\n    total += marks[i];\n  }\n  double average = total / 5.0;\n  printf("Average: %.2f\\n", average);\n  return 0;\n}\n',
    reward: { xp: 100, coins: 20 },
    revisit: ["w5m1"],
  }),

  w5m2: topic("w5m2", {
    title: "Reverse an array",
    brief:
      "Practical 22: read an array from the lab sheet and print it in reverse order using a countdown loop.",
    prompt: "Array {11, 22, 33, 44, 55}. Print: 55 44 33 22 11",
    concepts: ["array indices", "reverse traversal", "spacing"],
    starter: shell("print {11, 22, 33, 44, 55} backwards"),
    checks: exact("55 44 33 22 11"),
    hints: [
      "The last valid index is 4, which is length - 1.",
      "Loop from i = 4 down to 0 with i--.",
      'Print each with printf("%d ", values[i]); — trailing spaces are ignored.',
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int values[5] = {11, 22, 33, 44, 55};\n  for (int i = 4; i >= 0; i--) {\n    printf("%d ", values[i]);\n  }\n  printf("\\n");\n  return 0;\n}\n',
    reward: { xp: 105, coins: 21 },
    revisit: ["w5m2"],
  }),

  w5m3: topic("w5m3", {
    title: "Second largest",
    brief:
      "Practical 23: find the second largest element of an array without sorting it first.",
    prompt: "Array {12, 35, 1, 10, 34, 1}. Print: Second largest: 34",
    concepts: ["best-so-far pattern", "two-track comparison", "array search"],
    starter: shell("second largest of {12, 35, 1, 10, 34, 1}"),
    checks: exact("Second largest: 34"),
    hints: [
      "Keep two values: best and runner-up.",
      "When a value beats best, the old best becomes the runner-up.",
      "When it only beats the runner-up, replace just that one.",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int v[6] = {12, 35, 1, 10, 34, 1};\n  int best = -1;\n  int second = -1;\n  for (int i = 0; i < 6; i++) {\n    if (v[i] > best) {\n      second = best;\n      best = v[i];\n    } else if (v[i] > second && v[i] != best) {\n      second = v[i];\n    }\n  }\n  printf("Second largest: %d\\n", second);\n  return 0;\n}\n',
    reward: { xp: 120, coins: 24 },
    revisit: ["w5m3"],
  }),

  w5m4: topic("w5m4", {
    title: "Palindrome string",
    brief:
      "Practical 24: check whether a word reads the same forwards and backwards, comparing characters from both ends.",
    prompt: "Word \"madam\". Print exactly: madam is a palindrome",
    concepts: ["char arrays", "strlen", "two-pointer comparison"],
    starter: shell('check whether "madam" is a palindrome'),
    checks: exact("madam is a palindrome"),
    hints: [
      "Include <string.h> for strlen.",
      "Compare word[i] with word[len - 1 - i] for i from 0.",
      "Set a flag to 0 on the first mismatch and stop.",
    ],
    solution:
      '#include <stdio.h>\n#include <string.h>\n\nint main() {\n  char word[] = "madam";\n  int len = strlen(word);\n  int palindrome = 1;\n  for (int i = 0; i < len / 2; i++) {\n    if (word[i] != word[len - 1 - i]) {\n      palindrome = 0;\n    }\n  }\n  if (palindrome) {\n    printf("%s is a palindrome\\n", word);\n  } else {\n    printf("%s is not a palindrome\\n", word);\n  }\n  return 0;\n}\n',
    reward: { xp: 125, coins: 25 },
    revisit: ["w5m4"],
  }),

  w5m5: topic("w5m5", {
    title: "Count vowels",
    brief:
      "Practical 25: count how many vowels appear in a word, treating both cases as vowels.",
    prompt: 'Word "Programming". Print: Vowels: 3',
    concepts: ["string traversal", "character comparison", "counting"],
    starter: shell('count the vowels in "Programming"'),
    checks: exact("Vowels: 3"),
    hints: [
      "Walk the string with a for loop up to strlen(word).",
      "Compare against both the lowercase and uppercase vowel.",
      "A helper condition like (c == 'a' || c == 'e' ...) gets long — that is fine here.",
    ],
    solution:
      '#include <stdio.h>\n#include <string.h>\n\nint main() {\n  char word[] = "Programming";\n  int count = 0;\n  int len = strlen(word);\n  for (int i = 0; i < len; i++) {\n    char c = word[i];\n    if (c == \'a\' || c == \'e\' || c == \'i\' || c == \'o\' || c == \'u\' ||\n        c == \'A\' || c == \'E\' || c == \'I\' || c == \'O\' || c == \'U\') {\n      count++;\n    }\n  }\n  printf("Vowels: %d\\n", count);\n  return 0;\n}\n',
    reward: { xp: 120, coins: 24 },
    revisit: ["w5m5"],
  }),

  w6m1: topic("w6m1", {
    title: "Sum through pointers",
    brief:
      "Practical 26: add two numbers using only pointers — no direct use of the variables in the arithmetic.",
    prompt: "a = 10, b = 20 with pointers p and q. Print: Sum: 30",
    concepts: ["address-of", "dereference", "pointer types"],
    starter: shell("sum 10 and 20 through pointers"),
    checks: exact("Sum: 30"),
    hints: [
      "Take addresses with &a and &b.",
      "Add the pointed-to values: *p + *q.",
      "printf(\"Sum: %d\\n\", *p + *q);",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int a = 10;\n  int b = 20;\n  int *p = &a;\n  int *q = &b;\n  printf("Sum: %d\\n", *p + *q);\n  return 0;\n}\n',
    reward: { xp: 115, coins: 23 },
    revisit: ["w6m1"],
  }),

  w6m2: topic("w6m2", {
    title: "Increment by reference",
    brief:
      "Practical 27: write a function that increments a caller's variable. In C that means passing its address.",
    prompt: "count = 5, call increment(&count). Print: Count: 6",
    concepts: ["pass by pointer", "void functions", "caller state"],
    starter: shell("void increment(int *n) and increment(&count)"),
    checks: [...exact("Count: 6"), { type: "code", value: "\\*\\s*n\\s*=\\s*\\*\\s*n\\s*\\+" }],
    hints: [
      "The parameter is a pointer: void increment(int *n).",
      "Modify the original with *n = *n + 1;",
      "Call it with the address: increment(&count);",
    ],
    solution:
      '#include <stdio.h>\n\nvoid increment(int *n) {\n  *n = *n + 1;\n}\n\nint main() {\n  int count = 5;\n  increment(&count);\n  printf("Count: %d\\n", count);\n  return 0;\n}\n',
    reward: { xp: 120, coins: 24 },
    revisit: ["w6m2"],
  }),

  w6m3: topic("w6m3", {
    title: "Swap with pointers",
    brief:
      "Practical 28: the standard swap question — exchange two values using a temporary variable and pointers.",
    prompt: "x = 25, y = 50, then swap(&x, &y). Print: x=50 y=25",
    concepts: ["pointers", "temporary variable", "side effects"],
    starter: shell("swap 25 and 50 through pointers"),
    checks: exact("x=50 y=25"),
    hints: [
      "You cannot swap with two pointers alone — you need one temp int.",
      "temp = *a; *a = *b; *b = temp;",
      "Pass addresses: swap(&x, &y);",
    ],
    solution:
      '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n  int temp = *a;\n  *a = *b;\n  *b = temp;\n}\n\nint main() {\n  int x = 25;\n  int y = 50;\n  swap(&x, &y);\n  printf("x=%d y=%d\\n", x, y);\n  return 0;\n}\n',
    reward: { xp: 120, coins: 24 },
    revisit: ["w6m3"],
  }),

  w6m4: topic("w6m4", {
    title: "Array sum by pointer arithmetic",
    brief:
      "Practical 29: total an array by moving a pointer through it instead of indexing.",
    prompt: "Array {2, 4, 6, 8, 10}. Print: Sum: 30",
    concepts: ["pointer arithmetic", "array decay", "dereference in a loop"],
    starter: shell("sum {2, 4, 6, 8, 10} with a pointer"),
    checks: exact("Sum: 30"),
    hints: [
      "int *p = data; points at the first element.",
      "*(p + i) is element i, exactly like data[i].",
      "Add all five values into a total that starts at 0.",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int data[5] = {2, 4, 6, 8, 10};\n  int *p = data;\n  int sum = 0;\n  for (int i = 0; i < 5; i++) {\n    sum += *(p + i);\n  }\n  printf("Sum: %d\\n", sum);\n  return 0;\n}\n',
    reward: { xp: 125, coins: 25 },
    revisit: ["w6m4"],
  }),

  w6m5: topic("w6m5", {
    title: "Largest via pointer",
    brief:
      "Practical 30: find the largest element of an array using only pointer dereferences.",
    prompt: "Array {7, 3, 9, 1, 5}. Print: Max: 9",
    concepts: ["pointers", "best-so-far", "dereference comparisons"],
    starter: shell("largest of {7, 3, 9, 1, 5} through a pointer"),
    checks: exact("Max: 9"),
    hints: [
      "Start max at the first element: *p.",
      "Compare *(p + i) on each pass.",
      "Replace max only when the new value is strictly larger.",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int data[5] = {7, 3, 9, 1, 5};\n  int *p = data;\n  int max = *p;\n  for (int i = 1; i < 5; i++) {\n    if (*(p + i) > max) {\n      max = *(p + i);\n    }\n  }\n  printf("Max: %d\\n", max);\n  return 0;\n}\n',
    reward: { xp: 130, coins: 26 },
    revisit: ["w6m5"],
  }),
};

// ---------------------------------------------------------------------------
// World mastery assessments — one per world, combining that world's concepts.
// ---------------------------------------------------------------------------
export const WORLD_CHALLENGES = {
  w1: world("w1", {
    title: "Payroll slip",
    brief:
      "Semester assessment, World 1: a company pays basic pay plus DA and HRA, then deducts tax. Everything is decimal money, so the formatting matters as much as the maths.",
    given: [
      "basic = 20000",
      "DA = 10% of basic",
      "HRA = 15% of basic",
      "tax = 5% of gross",
    ],
    prompt: "Print Gross: 25000.00 and Net: 23750.00 — two decimals each.",
    concepts: ["variables and types", "percentage arithmetic", "%.2f"],
    starter: shell("basic 20000, DA 10%, HRA 15%, tax 5%: print gross and net"),
    checks: exact("Gross: 25000.00\nNet: 23750.00"),
    hints: [
      "Gross = basic + 10% of basic + 15% of basic.",
      "Tax is 5% of the gross, not of the basic pay.",
      "Keep every money value in a double and print with %.2f.",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  double basic = 20000;\n  double gross = basic + basic * 10 / 100.0 + basic * 15 / 100.0;\n  double net = gross - gross * 5 / 100.0;\n  printf("Gross: %.2f\\n", gross);\n  printf("Net: %.2f\\n", net);\n  return 0;\n}\n',
    reward: { xp: 260, coins: 55 },
  }),

  w2: world("w2", {
    title: "Electricity bill",
    brief:
      "Semester assessment, World 2: a slab-based bill is the classic else-if question. Each block of units has its own rate.",
    given: ["275 units used", "first 100 units at 3.50", "next 100 units at 4.50", "remaining units at 6.50"],
    prompt: "Print: Bill: 1287.50",
    concepts: ["else-if ladders", "slab boundaries", "decimal arithmetic"],
    starter: shell("275 units: 100 @ 3.50, 100 @ 4.50, rest @ 6.50"),
    checks: exact("Bill: 1287.50"),
    hints: [
      "Split the units into three groups before you multiply anything.",
      "The third group is units - 200, and only exists above 200 units.",
      "100 * 3.5 + 100 * 4.5 + 75 * 6.5.",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int units = 275;\n  double bill = 0;\n  if (units > 200) {\n    bill = 100 * 3.5 + 100 * 4.5 + (units - 200) * 6.5;\n  } else if (units > 100) {\n    bill = 100 * 3.5 + (units - 100) * 4.5;\n  } else {\n    bill = units * 3.5;\n  }\n  printf("Bill: %.2f\\n", bill);\n  return 0;\n}\n',
    reward: { xp: 280, coins: 60 },
  }),

  w3: world("w3", {
    title: "Prime range report",
    brief:
      "Semester assessment, World 3: nested loops plus conditions. Report how many primes exist up to 50 and what they add up to.",
    given: ["range 1 to 50", "a prime has no divisor other than 1 and itself"],
    prompt: "Print Count: 15 and Sum: 328.",
    concepts: ["nested loops", "prime testing", "accumulators"],
    starter: shell("count and sum the primes from 1 to 50"),
    checks: exact("Count: 15\nSum: 328"),
    hints: [
      "Loop n from 2 to 50, and inside it test divisors d from 2.",
      "Only add n to the sum when the inner loop found no divisor.",
      "A flag per number is easier than trying to break out cleverly.",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int count = 0;\n  int sum = 0;\n  for (int n = 2; n <= 50; n++) {\n    int prime = 1;\n    for (int d = 2; d < n; d++) {\n      if (n % d == 0) {\n        prime = 0;\n      }\n    }\n    if (prime) {\n      count++;\n      sum += n;\n    }\n  }\n  printf("Count: %d\\n", count);\n  printf("Sum: %d\\n", sum);\n  return 0;\n}\n',
    reward: { xp: 300, coins: 65 },
  }),

  w4: world("w4", {
    title: "Function toolbox",
    brief:
      "Semester assessment, World 4: build two reusable functions and combine them in main — one for a series total, one for a primality test.",
    given: ["n = 10", "sumSquares(n) returns 1² + 2² + ... + n²", "isPrime(x) returns 1 or 0"],
    prompt: "Print Sum of squares: 385 and Primes: 4 (the primes up to 10 are 2, 3, 5, 7).",
    concepts: ["functions", "return values", "loops inside functions"],
    starter: shell("int sumSquares(int n) and int isPrime(int x), then print both results for 10"),
    checks: [
      ...exact("Sum of squares: 385\nPrimes: 4"),
      { type: "code", value: "int\\s+sumSquares\\s*\\(" },
      { type: "code", value: "int\\s+isPrime\\s*\\(" },
    ],
    hints: [
      "sumSquares needs a total and a loop from 1 to n, adding i * i.",
      "isPrime can loop d from 2 while d < x and return 0 on the first divisor.",
      "Count primes in main by calling isPrime for each number from 2 to 10.",
    ],
    solution:
      '#include <stdio.h>\n\nint sumSquares(int n) {\n  int total = 0;\n  for (int i = 1; i <= n; i++) {\n    total += i * i;\n  }\n  return total;\n}\n\nint isPrime(int x) {\n  if (x < 2) {\n    return 0;\n  }\n  for (int d = 2; d < x; d++) {\n    if (x % d == 0) {\n      return 0;\n    }\n  }\n  return 1;\n}\n\nint main() {\n  int count = 0;\n  for (int i = 2; i <= 10; i++) {\n    if (isPrime(i)) {\n      count++;\n    }\n  }\n  printf("Sum of squares: %d\\n", sumSquares(10));\n  printf("Primes: %d\\n", count);\n  return 0;\n}\n',
    reward: { xp: 320, coins: 70 },
  }),

  w5: world("w5", {
    title: "Marksheet report",
    brief:
      "Semester assessment, World 5: arrays plus everything before them. Produce a full report for a five-subject marksheet.",
    given: ["marks {56, 78, 90, 45, 67}", "pass mark 40", "average to two decimals"],
    prompt:
      "Print Total: 336, Average: 67.20, Highest: 90, Lowest: 45, Passed: 5 — each on its own line.",
    concepts: ["arrays", "traversal", "best/worst so far", "counting"],
    starter: shell("report on {56, 78, 90, 45, 67}"),
    checks: exact(
      "Total: 336\nAverage: 67.20\nHighest: 90\nLowest: 45\nPassed: 5"
    ),
    hints: [
      "One pass can collect the total, the highest and the lowest at the same time.",
      "Start highest and lowest at marks[0], not at 0 — marks could all be high.",
      "Count a pass whenever marks[i] >= 40.",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int marks[5] = {56, 78, 90, 45, 67};\n  int total = 0;\n  int highest = marks[0];\n  int lowest = marks[0];\n  int passed = 0;\n  for (int i = 0; i < 5; i++) {\n    total += marks[i];\n    if (marks[i] > highest) {\n      highest = marks[i];\n    }\n    if (marks[i] < lowest) {\n      lowest = marks[i];\n    }\n    if (marks[i] >= 40) {\n      passed++;\n    }\n  }\n  printf("Total: %d\\n", total);\n  printf("Average: %.2f\\n", total / 5.0);\n  printf("Highest: %d\\n", highest);\n  printf("Lowest: %d\\n", lowest);\n  printf("Passed: %d\\n", passed);\n  return 0;\n}\n',
    reward: { xp: 340, coins: 75 },
  }),

  w6: world("w6", {
    title: "Pointer audit",
    brief:
      "Semester assessment, World 6: the whole final world in one program. Read the array only through a pointer, find the maximum the same way, then swap the first and last elements.",
    given: ["values {12, 45, 7, 30, 22}", "no indexing: use p, p + i and *"],
    prompt: "Print Sum: 116, Max: 45, then the swapped array as 22 45 7 30 12.",
    concepts: ["pointers", "pointer arithmetic", "swapping through addresses"],
    starter: shell("sum, max and swap first/last of {12, 45, 7, 30, 22} using pointers"),
    checks: exact("Sum: 116\nMax: 45\n22 45 7 30 12"),
    hints: [
      "int *p = values; gives you the first element's address.",
      "Inside the loop use *(p + i); the swap needs a temp int.",
      "Swap *(p + 0) with *(p + 4) before printing the array.",
    ],
    solution:
      '#include <stdio.h>\n\nint main() {\n  int values[5] = {12, 45, 7, 30, 22};\n  int *p = values;\n  int sum = 0;\n  int max = *p;\n  for (int i = 0; i < 5; i++) {\n    sum += *(p + i);\n    if (*(p + i) > max) {\n      max = *(p + i);\n    }\n  }\n  int temp = *p;\n  *p = *(p + 4);\n  *(p + 4) = temp;\n  printf("Sum: %d\\n", sum);\n  printf("Max: %d\\n", max);\n  for (int i = 0; i < 5; i++) {\n    printf("%d ", *(p + i));\n  }\n  printf("\\n");\n  return 0;\n}\n',
    reward: { xp: 380, coins: 85 },
  }),
};

// Indexed by the challenge id (`topic-w1m4`, `world-w1`), not the lesson key.
export const CHALLENGES = [...Object.values(TOPIC_CHALLENGES), ...Object.values(WORLD_CHALLENGES)].reduce(
  (acc, challenge) => {
    acc[challenge.id] = challenge;
    return acc;
  },
  {}
);

export function challengeById(id) {
  return CHALLENGES[id] || null;
}

export function topicChallengeFor(missionId) {
  return TOPIC_CHALLENGES[missionId] || null;
}

export function worldChallengeFor(worldId) {
  return WORLD_CHALLENGES[worldId] || null;
}

export function worldMasteryKey(worldId) {
  return `world-${worldId}`;
}

export function topicMasteryKey(missionId) {
  return `topic-${missionId}`;
}

/**
 * Records a passed mastery challenge: XP and coins (scaled by hints and
 * attempts), stars for a world assessment, the achievement sweep, and — for a
 * topic test — credit for the lesson so the next one opens.
 */
export function applyMastery(save, challenge, { attempts = 1, hints = 0 } = {}) {
  const progress = save.progress || {};
  if (!challenge || progress.mastery?.[challenge.id]) {
    return { save, newly: [], already: true, xp: 0, coins: 0, stars: 0 };
  }

  const efficient = attempts <= 1 && hints === 0;
  const factor = efficient ? 1.25 : hints >= 2 ? 0.8 : 1;
  const xp = Math.round(challenge.reward.xp * factor);
  const coins = Math.round(challenge.reward.coins * (efficient ? 1.2 : 1));
  const stars = challenge.kind === "world" ? (attempts <= 1 ? 3 : attempts <= 3 ? 2 : 1) : 0;

  const missions = { ...(progress.missions || {}) };
  if (challenge.kind === "topic" && challenge.missionId && !missions[challenge.missionId]) {
    missions[challenge.missionId] = {
      stars: 0,
      attempts,
      hints,
      skipped: true,
      completedAt: new Date().toISOString(),
    };
  }

  const nextProgress = {
    ...progress,
    xp: (progress.xp || 0) + xp,
    coins: (progress.coins || 0) + coins,
    stars: (progress.stars || 0) + stars,
    missions,
    mastery: {
      ...(progress.mastery || {}),
      [challenge.id]: {
        passedAt: new Date().toISOString(),
        attempts,
        hints,
        stars,
      },
    },
  };

  const { unlocked, newly } = evaluateAchievements(nextProgress, progress.achievements || {});
  nextProgress.achievements = unlocked;

  return {
    save: { ...save, progress: nextProgress, updatedAt: new Date().toISOString() },
    newly,
    already: false,
    xp,
    coins,
    stars,
  };
}

export function masterySummary(progress) {
  const passed = Object.keys(progress?.mastery || {});
  return {
    topics: passed.filter((id) => id.startsWith("topic-")).length,
    worlds: passed.filter((id) => id.startsWith("world-")).length,
    total: passed.length,
  };
}

export function nextWorldAfter(worldId) {
  const current = worldById(worldId);
  return current ? current.index + 1 : null;
}
