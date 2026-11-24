// Turns a failed run into mentor-style feedback instead of a raw compiler dump.

export function buildTutorFeedback({ result, evaluation, mission, attempts = 1 }) {
  const error = result?.error;

  if (error) {
    const line = error.line ? ` (line ${error.line})` : "";

    if (error.kind === "name") {
      return {
        tone: "error",
        title: "A name the machine doesn't recognise",
        body: `${error.message}${line}`,
        analogy: "It's like calling a contact that was never saved. The name looks familiar, but there's nothing behind it yet.",
        tip: "Declare variables before using them, and check spelling — C is case sensitive.",
      };
    }

    if (error.kind === "syntax") {
      if (/Expected ';'/.test(error.message)) {
        return {
          tone: "error",
          title: "A missing semicolon",
          body: `${error.message}${line}`,
          analogy: "C needs a full stop at the end of every statement. Without it the compiler keeps reading the next line as part of the same sentence.",
          tip: "Look at the line just above the one the error mentions.",
        };
      }
      if (/Expected '\}'|closing/.test(error.message)) {
        return {
          tone: "error",
          title: "An unclosed block",
          body: `${error.message}${line}`,
          analogy: "Every { opens a room and every } closes it. One door is still open.",
          tip: "Count the braces of the block you just edited.",
        };
      }
      return {
        tone: "error",
        title: "The structure doesn't parse",
        body: `${error.message}${line}`,
        analogy: "The compiler is a very literal reader. One wrong symbol and the sentence stops making sense to it.",
        tip: "Re-read the line the error names, then the line above it.",
      };
    }

    if (error.kind === "format") {
      return {
        tone: "error",
        title: "printf and its values disagree",
        body: `${error.message}${line}`,
        analogy: "A form with more boxes than answers. Every placeholder expects one value after the format string.",
        tip: "Count the % signs, then count the values after the comma.",
      };
    }

    if (error.kind === "memory") {
      return {
        tone: "error",
        title: "That pointer went somewhere unsafe",
        body: `${error.message}${line}`,
        analogy: "You followed an address that doesn't belong to this program. The key works, but the door isn't there.",
        tip: "Only dereference a pointer after it has been given a real address with &.",
      };
    }

    if (error.kind === "timeout") {
      return {
        tone: "error",
        title: "This loop never stops",
        body: `${error.message}${line}`,
        analogy: "A record player stuck in the groove. It's playing, but it will never reach the next track.",
        tip: "Make sure the loop variable actually moves toward the exit condition.",
      };
    }

    if (error.kind === "runtime") {
      return {
        tone: "error",
        title: "The program stopped mid-run",
        body: `${error.message}${line}`,
        analogy: "The machine hit an operation it cannot perform, so it halted instead of guessing.",
        tip: "Check the values going into the operation — a zero divisor or a runaway recursion will do this.",
      };
    }

    return {
      tone: "error",
      title: "The program stopped",
      body: `${error.message}${line}`,
      analogy: "Something broke while the code was running, not while it was being read.",
      tip: "Print your intermediate values to see how far it got.",
    };
  }

  const failed = (evaluation?.results || []).find((r) => !r.pass);
  if (!failed) {
    return {
      tone: "neutral",
      title: "Close, but not quite",
      body: "The program ran. Something in the mission's checks still doesn't match.",
      analogy: "The machine did what you asked — it just wasn't quite what the mission wanted.",
      tip: "Compare your output character by character with the objective.",
    };
  }

  if (failed.type === "output") {
    const expected =
      failed.mode === "exact" ? failed.value : failed.mode === "regex" ? "the pattern described in the briefing" : failed.value;
    const preview = (result.stdout || "").trim() || "(nothing printed)";
    const truncated = preview.length > 220 ? preview.slice(0, 220) + "…" : preview;

    return {
      tone: "hint",
      title: "The output doesn't match yet",
      body: `Expected: ${expected}\nYou printed: ${truncated}`,
      analogy: "A delivery with the right box and the wrong label. The shape is close; the content isn't.",
      tip:
        failed.mode === "exact"
          ? "Exact matches include line breaks. One stray newline or an extra line will fail the check."
          : "Check spelling, capital letters and punctuation in what you print.",
      attempts,
    };
  }

  if (failed.type === "var") {
    return {
      tone: "hint",
      title: `The value of ${failed.name} isn't right`,
      body: `The mission expects ${failed.name} to hold ${failed.equals} when the program ends.`,
      analogy: "The box is labelled correctly but it's holding the wrong thing.",
      tip: "Print the variable right before the end of main to see what it actually holds.",
    };
  }

  return {
    tone: "hint",
    title: "Not there yet",
    body: "The program ran but the mission's conditions aren't satisfied.",
    analogy: "You're in the right building, on the wrong floor.",
    tip: "Re-read the objective and reveal a hint if you're stuck.",
  };
}