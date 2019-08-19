
  let pwd = [];


  $(document).ready(function() {

    TooltipKey = new jBox('Tooltip', {
    	attach: '.tooltip_key',
      target: '.input_key',
      title: 'Secret key',
      adjustPosition: true,
      adjustTracker: true,
      content: 'Enter at least 5 alphanumerical characters.',
      position: {
      	x: 'right',
        y: 'center'
      },
      outside: 'x'
    });

    TooltipPhrase = new jBox('Tooltip', {
      attach: '.tooltip_phrase',
      target: '.input_phrase',
      title: 'Phrase',
      adjustPosition: true,
      adjustTracker: true,
      content: 'Enter any phrase/service name.',
      position: {
        x: 'right',
        y: 'center'
      },
      outside: 'x'
    });

  });

  const checksum = function(a) {
      return a < 10 ? a : a % 9;
  }


function password() {

  // clean up phrase and turn string into array
  const phrase = document.getElementById('phrase').value.replace(/\s+|["']/g, '').replace('ß', 'ss').replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue').split('').map(function(x){ return x.toLowerCase() });

  // clean up key and turn string into array
  const key = document.getElementById('key').value.replace(/\s+|["']/g, '').replace('ß', 'ss').replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue').split('').map(function(x){ return x.toLowerCase() });

  // prepare reference alphabet for index generation
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const output = document.getElementById('pwd');
  const validation = document.getElementById('validation');
  const keyinput = document.getElementById('key');
  const phraseinput = document.getElementById('phrase');

  output.innerHTML = '';
  var phraseNum = [];
  pwd = [];

  validation.innerHTML = '';
  keyinput.style.boxShadow = '';
  keyinput.style.border = '1px solid #bbb';
  phraseinput.style.boxShadow = '';
  phraseinput.style.border = '1px solid #bbb';

switch (true) {
  case phrase.length < 1:
  validation.innerHTML = 'Yo! Throw me a bone here - I need a phrase.';
  phraseinput.style.boxShadow = '0px 0px 5px 1px rgba(255,0,0,0.75)';
  phraseinput.style.border = '1px solid red';
  return;
    break;
  default:

}

  switch (true) {
    case key.length < 5:
      validation.innerHTML = 'Yo! Check your <code>key.length</code>, dog! ' + keyinput.value.length + ' don\'t cut it.';
      keyinput.style.boxShadow = '0px 0px 5px 1px rgba(255,0,0,0.75)';
      keyinput.style.border = '1px solid red';
      return;
      break;
    default:

  }

    //convert letters in phrase to index of alphabet + key

    for (var i = 0; i < key.length; i++) {
      if (i >= phrase.length) {
        var phrase_i = i - phrase.length;
          if (phrase_i >= phrase.length) {
            phrase_i = i - (parseInt(i/phrase.length) * phrase.length);
          }
      } else {
        phrase_i = i;
      }
      var phrase_numeric = parseInt(phrase[phrase_i]);
      var key_numeric = parseInt(key[i]);
      var phrase_char = alphabet.indexOf(phrase[phrase_i]);
      var key_char = alphabet.indexOf(key[i])


      if (i%2 === 0) {
        if (isNaN(phrase[phrase_i]) && !isNaN(key[i])) {
          phraseNum.push(phrase_char + key_numeric);
        } else if (!isNaN(phrase[phrase_i]) && isNaN(key[i])) {
          phraseNum.push(phrase_numeric + key_char + 1);
        } else if (!isNaN(phrase[phrase_i]) && !isNaN(key[i])) {
          phraseNum.push(phrase_numeric + key_numeric);
        } else {
          phraseNum.push(phrase_char + key_char + 1);
        }

      } else {

        if (isNaN(phrase[phrase_i]) && !isNaN(key[i])) {
          phraseNum.push(phrase_char - key_numeric);
        } else if (!isNaN(phrase[phrase_i]) && isNaN(key[i])) {
          phraseNum.push(phrase_numeric - key_char - 1);
        } else if (isNaN(phrase[phrase_i]) && isNaN(key[i])) {
          phraseNum.push(phrase_char - key_char - 1);
        } else {
          phraseNum.push(phrase_numeric - key_numeric - 1);
        }
      }

      if (phraseNum[i] > (alphabet.length - 1)) {
        phraseNum[i] = phraseNum[i] - alphabet.length;
      } else if (phraseNum[i] < 0) {
        phraseNum[i] = alphabet.length - (phraseNum[i] * - 1);
      } else {
        phraseNum[i] = phraseNum[i];
      }

      if (i > 0) {
        var phrase_prev = phrase[phrase_i-1];
        var key_prev = key[i-1];
        var pwd_num = parseInt(phraseNum[i] + phraseNum[i-1] + 2);
      }
      if (pwd_num > 15) {
        pwd_num = parseInt(pwd_num, 10).toString(16);
      } else {
        pwd_num = checksum(pwd_num);
      }

      if (i > 0 && !(i%2 == 0)) {
        pwd.push(alphabet[phraseNum[i]].toUpperCase() + pwd_num);
      } else {
        pwd.push(alphabet[phraseNum[i]]);
      }
    }
  output.style.display = 'inline'
  output.innerHTML = pwd.join('') + '!';
  output.disabled = false;
  output.select();
  document.execCommand("copy");
  output.innerHTML = '';
  output.disabled = true;
  output.style.display = 'none';

  var inputphrase = document.getElementById('phrase');
    inputphrase.value = '';
  var inputkey = document.getElementById('key');
    inputkey.value = '';

    keyinput.style.boxShadow = '0px 0px 5px 1px rgba(0,255,0,0.75)';
    keyinput.style.border = '1px solid green';
    keyinput.style.transition = 'all 0.5s ease-out';

    keyinput.placeholder = 'Password copied.'

    phraseinput.style.boxShadow = '0px 0px 5px 1px rgba(0,255,0,0.75)';
    phraseinput.style.border = '1px solid green';
    phraseinput.style.transition = 'all 0.5s ease-out';

    phraseinput.placeholder = 'Success!'

}
