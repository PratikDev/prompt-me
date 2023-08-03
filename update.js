const readline = require("readline");

// Create an interface for reading input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask the user for input
rl.question("Please enter something: ", (text) => {
  function replaceSpacesWithLineBreaks(text) {
    // Use the regular expression /\s+/g to match all occurrences of spaces (including multiple spaces) globally.
    // Replace each occurrence with a line breaker '\n'.
    return text.replace(/\s+/g, "\n");
  }

  // Replace all spaces with line breaks.
  const newText = replaceSpacesWithLineBreaks(text);

  // Display the new text.
  console.log(`\nYour updated text below: \n\n${newText}`);

  // Close the readline interface
  rl.close();
});
