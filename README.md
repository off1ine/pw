Welcome to the Automatic Password Creator!

In order to use this script, simply add a phrase after the 'pw' command. For example:

  pw twitt3r

(If you don't give the phrase as an argument, we will ask for it.)
The script will then ask for a key. This can be any combination of integers and letters and should be at least 6 figures (in order to get a sufficiently long password). 
Make sure this key is secret and remains the same so you are able to reconstruct the password if you have to, for example:

  123abc      (don't actually use that, though!)

Construction of the resulting password construction works as follows:
- Cycle through characters in phrase.
- Alternate between adding and subtracting the number values of key to/from phrase character values (a=1, b=2, etc.)
- Turn result back into letter.
- Every second character is upper case.
- After every second character, add sum of letter values of two preceding characters.
- If sum is greater than 16, display as hex, otherwise display cross sum as decimal.

For our example phrase "twitter" and the example key "123456abc" this would result in the following password:

   uU2alS1fvZ2e!

Let's deconstruct that!

- adding the first character's value (1) of our key to the first letter of our phrase (t) makes "u"
- subtracting the second key character's value (2) from the second phrase character's value (w) makes "U" (remember, we capitalize every second letter!)
- the sum of the previous two character's values (u + U = 21 + 21 = 42) is greater than 16, so we produce the hex-value "2a"
- adding the third key character's value (3) to the third phrase character (i) makes "l"
- subtracting the fourth key character's value (1) from the fourth phrase character (t) makes "S"
- the sum of the previous two character's values (l + S = 12 + 19 = 31) is greater than 16, so we produce the hex-value "1f"
- adding the fifth key character's value (2) to the fifth phrase character's value (t) makes "v"
- subtracting the sixth key character's value (3) from the sixth phrase character (3) makes 0 which turns back into 26 = "Z"
- the sum of the previous two character's values (v + Z = 22 + 26 = 48) is greater than 16, so we produce the hex-value "2e"
- lastly, we add an exclamation point for good measure and to satisfy password policies and voilà: uU2alS1fvZ2e!
