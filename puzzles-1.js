/* Puzzles 1–50.  Fields: id, t (title), c (category), d (difficulty), q (problem), setup (diagram shown with problem),
   hint, fig (diagram inside solution), steps (solution steps), ans (final answer), idea (takeaway). */

P({ id: 1, t: "Pay an Employee with a 7-Unit Gold Rod", c: "Number", d: "Easy",
  q: `You hire a worker for 7 days and must pay exactly 1 unit of gold at the end of every day. You own one gold rod 7 units long. What is the fewest number of cuts that lets you pay exactly what is owed each day?`,
  hint: `The worker is allowed to hand pieces back to you as change.`,
  fig: D.rod(),
  steps: [
    `<b>The trap:</b> assuming you must hand over a fresh 1-unit piece every day (that would take 6 cuts). What actually matters is that at the end of day <i>k</i> the worker <b>holds exactly k units</b>. Pieces can move back and forth like notes and change.`,
    `So we need a few pieces whose subsets add up to every total 1, 2, …, 7. Powers of two do exactly that: <b>1, 2, 4</b> (think binary 001 to 111).`,
    `Cut after unit 1 and after unit 3 → pieces <b>1 | 2 | 4</b>. That is only <b>2 cuts</b>.`,
    `<table class="tbl"><tr><th>Day</th><th>You give</th><th>You take back</th><th>Worker holds</th></tr>
      <tr><td>1</td><td>1</td><td>–</td><td>1</td></tr><tr><td>2</td><td>2</td><td>1</td><td>2</td></tr>
      <tr><td>3</td><td>1</td><td>–</td><td>1+2 = 3</td></tr><tr><td>4</td><td>4</td><td>1, 2</td><td>4</td></tr>
      <tr><td>5</td><td>1</td><td>–</td><td>4+1 = 5</td></tr><tr><td>6</td><td>2</td><td>1</td><td>4+2 = 6</td></tr>
      <tr><td>7</td><td>1</td><td>–</td><td>7</td></tr></table>`,
    `<b>Why 1 cut fails:</b> one cut makes two pieces a and b. The worker could only ever hold 0, a, b or 7, which is at most 2 different totals below 7, but we need six (1 to 6).`
  ],
  ans: `2 cuts, giving pieces of 1, 2 and 4 units.`,
  idea: `Pieces 1, 2, 4, …, 2<sup>k−1</sup> can build every amount up to 2<sup>k</sup> − 1. Whenever a puzzle says "any amount", think binary.` });

P({ id: 2, t: "Find the Fastest 3 Horses", c: "Logic", d: "Medium",
  q: `There are 25 horses and a track that fits at most 5 horses per race. You get no timer, only the finishing order. What is the minimum number of races needed to find the 3 fastest horses?`,
  hint: `After racing the 5 group winners, count for each horse how many horses are <i>definitely</i> faster than it. Anyone with 3 or more is out.`,
  fig: D.horses(),
  steps: [
    `<b>Races 1–5:</b> split the horses into 5 groups of 5 and race each group. Now you know the order <i>inside</i> each group (A1 &gt; A2 &gt; … &gt; A5), but nothing between groups.`,
    `<b>Race 6:</b> race the 5 group winners. Rename the groups by this result so that A1 &gt; B1 &gt; C1 &gt; D1 &gt; E1. A1 beat every other winner, and each winner beat their whole group, so <b>A1 is the fastest horse</b>.`,
    `<b>Prune:</b> a horse can only be in the top 3 if fewer than 3 horses are known to be faster than it.
      <ul><li>D1 already has A1, B1, C1 ahead → all of group D and E are out.</li>
      <li>C2 has C1, B1, A1 ahead → out (so only C1 survives in C).</li>
      <li>B3 has B2, B1, A1 ahead → out (B1, B2 survive).</li>
      <li>A4 has A1, A2, A3 ahead → out (A2, A3 survive).</li></ul>`,
    `Candidates for 2nd and 3rd place: <b>A2, A3, B1, B2, C1</b>. That's exactly 5 horses, so one race settles it.`,
    `<b>Race 7:</b> race those five. The top two finishers are 2nd and 3rd overall.`,
    `<b>Why 6 races is not enough:</b> every horse must race at least once (5 races), and the winners must meet (race 6). After that, A2 and B1 have never raced each other, so a 7th race is unavoidable.`
  ],
  ans: `7 races.`,
  idea: `Track "who is definitely faster than me". It turns a messy elimination into a simple count.` });

P({ id: 3, t: "Find the Anaesthetic Injection", c: "Number", d: "Hard",
  q: `There are 240 injections and exactly one is an anaesthetic. A rat injected with it faints within 24 hours, and a fainted rat can't be reused. You have 5 rats and 48 hours. How do you find the anaesthetic?`,
  hint: `Over two days a rat can give three different results, not two.`,
  steps: [
    `With one day, each rat only says yes/no → 2<sup>5</sup> = 32 outcomes. Not enough for 240.`,
    `With two days each rat has <b>three</b> possible outcomes: faints on day 1, faints on day 2, or never faints. 5 rats give 3<sup>5</sup> = <b>243 ≥ 240</b> outcomes. So we use base 3.`,
    `Number the injections 0–239 and write each one in base 3 with 5 digits (00000 to 22222). Digit <i>k</i> belongs to rat <i>k</i>.`,
    `<b>Hour 0:</b> give rat <i>k</i> a drop of every injection whose k-th digit is <b>1</b>.<br><b>Hour 24:</b> give every rat that is still awake a drop of every injection whose k-th digit is <b>2</b>.`,
    `<b>Hour 48 – read the result:</b> faints on day 1 → digit 1; faints on day 2 → digit 2; never faints → digit 0. The five digits are the label of the anaesthetic.`,
    `<b>Example:</b> rats read 1 2 0 1 0 → 1·81 + 2·27 + 0·9 + 1·3 + 0 = <b>138</b>, so injection #138 is the anaesthetic.`,
    `A rat that fainted on day 1 never needs its day-2 doses, because its digit is already known to be 1.`
  ],
  ans: `Label injections in base 3: 5 rats over 2 days can tell apart 3<sup>5</sup> = 243 injections.`,
  idea: `(outcomes per tester)<sup>testers</sup> ≥ candidates. More rounds = more symbols per tester.` });

P({ id: 4, t: "3 Bulbs and 3 Switches", c: "Lateral", d: "Easy",
  q: `Three switches outside a closed room control three bulbs inside. You may flip switches as you like but can enter the room only once. How do you match each switch to its bulb?`,
  hint: `Light is not the only thing a bulb gives off.`,
  steps: [
    `Looking only at light, each bulb is on or off: 2 states. But we need to tell 3 switches apart, so we need a 3rd state.`,
    `A (classic, incandescent) bulb also gives off <b>heat</b>, and stays warm for a while after it's switched off.`,
    `Turn <b>S1 ON for ~10 minutes</b>, then turn it OFF. Turn <b>S2 ON</b>. Leave <b>S3</b> alone. Walk in.`,
    `<table class="tbl"><tr><th>What you see</th><th>Switch</th></tr><tr><td>Lit</td><td>S2</td></tr><tr><td>Off but warm</td><td>S1</td></tr><tr><td>Off and cold</td><td>S3</td></tr></table>`
  ],
  ans: `Use heat as the second signal: lit = S2, warm = S1, cold = S3.`,
  idea: `If one observation has too few states, look for a second hidden variable (here: time history shown by heat).` });

P({ id: 5, t: "Camel and Bananas", c: "Optimization", d: "Hard",
  q: `You must move 3000 bananas to a market 1000 km away. Your camel carries at most 1000 bananas at a time and eats 1 banana per km it walks (in either direction). How many bananas can reach the market?`,
  hint: `Work out the cost per km when the pile needs 3 trips, 2 trips, or 1 trip. Drop down a trip as soon as you can.`,
  steps: [
    `<b>Cost per km:</b> to move a pile forward by 1 km with <i>n</i> loads, the camel walks forward <i>n</i> times and back <i>n − 1</i> times, eating <b>2n − 1</b> bananas per km.
      <ul><li>3 loads (more than 2000 bananas) → 5 per km</li><li>2 loads (1001–2000) → 3 per km</li><li>1 load (≤ 1000) → 1 per km</li></ul>`,
    `<b>Stage 1 (5/km):</b> go until exactly 1000 bananas are eaten, so the pile is down to 2 loads: 1000 ÷ 5 = <b>200 km</b>. Now 2000 bananas at km 200.`,
    `<b>Stage 2 (3/km):</b> go until another 1000 are eaten: 1000 ÷ 3 ≈ <b>333.3 km</b>. Now 1000 bananas at km 533.3.`,
    `<b>Stage 3 (1/km):</b> one load walks the remaining 1000 − 533.3 = 466.7 km, eating 466.7 bananas. Arrive with 1000 − 466.7 ≈ <b>533</b>.`,
    `<b>Why switch exactly at 2000 and 1000?</b> Carrying, say, 2001 bananas forces a 3rd trip (5/km) to save one banana. Cutting down to full loads as early as possible always minimises the per-km cost.`
  ],
  ans: `About 533 bananas (533⅓ if fractions are allowed).`,
  idea: `Price each km by the number of trips it needs, then reduce the number of trips as early as possible.` });

P({ id: 6, t: "Find the Jar with Contaminated Pills", c: "Weighing", d: "Easy",
  q: `Five jars hold pills. Normal pills weigh 10 g; every pill in one jar weighs 9 g. With a single use of a digital scale, find the bad jar.`,
  hint: `Take a different number of pills from each jar.`,
  steps: [
    `If you took one pill from every jar, the scale would say "something is 1 g light", but not which jar. Each jar needs its own <b>signature amount</b>.`,
    `Take <b>1 pill from jar 1, 2 from jar 2, … 5 from jar 5</b>: 15 pills in total. If all were normal they'd weigh <b>150 g</b>.`,
    `Every bad pill is 1 g light, so the shortfall equals the number of pills taken from the bad jar, which is that jar's number.`,
    `<b>Example:</b> the scale reads 147 g → 3 g short → <b>jar 3</b>.`
  ],
  ans: `Take k pills from jar k; bad jar = 150 − reading.`,
  idea: `Give every candidate a unique "fingerprint" so one combined measurement can be decoded.` });

P({ id: 7, t: "100 Prisoners with Red/Black Hats", c: "Logic", d: "Medium",
  q: `100 prisoners stand in a line, each seeing all hats in front but not their own or any behind. Starting from the back, each must call out 'red' or 'black' for their own hat; a wrong call means death. They may plan beforehand. How many can be guaranteed to survive?`,
  hint: `The last person can't know their own hat, so use their call to send one bit of information to everyone else.`,
  steps: [
    `Nobody ever sees the last prisoner's hat, so 100 can't be guaranteed. Aim for <b>99</b>.`,
    `<b>Plan:</b> the last prisoner counts the red hats he sees. He says <b>"red" if the count is even</b>, "black" if it is odd. He has a 50% chance; he is the messenger.`,
    `The next prisoner counts the reds she sees. If her parity matches the announced parity, her own hat is not red → "black". If it differs, her hat must be red → "red".`,
    `Everyone after does the same, adding the reds <b>called out behind them</b> (all correct) to the reds <b>they can see</b>, and comparing parity with the first announcement.`,
    `<b>Mini example</b> (front hats P1 = R, P2 = B, P3 = R; P4 is last):
      <ul><li>P4 sees R, B, R → 2 reds (even) → says "red".</li>
      <li>P3 sees B, R → 1 red (odd) ≠ even → "red" ✓</li>
      <li>P2 sees R, heard P3 = red → 2 reds (even) = even → "black" ✓</li>
      <li>P1 sees nothing, heard red, black → 1 red (odd) ≠ even → "red" ✓</li></ul>`
  ],
  ans: `99 are guaranteed; the last prisoner survives with probability ½.`,
  idea: `Parity compresses "everything in front of me" into a single bit that one person can broadcast.` });

P({ id: 8, t: "10 Coins (Blindfolded)", c: "Lateral", d: "Easy",
  q: `You are blindfolded at a table with 10 coins: exactly 5 heads and 5 tails. You can't feel which is which, but you can move and flip coins. Split them into two groups with the same number of heads.`,
  hint: `You never need to know how many heads a group has. Flipping turns heads into tails and tails into heads.`,
  steps: [
    `Make any two groups of 5. Say group A has <i>x</i> heads. Then group B has <b>5 − x</b> heads (there are 5 heads total).`,
    `Group A has 5 − x tails. <b>Flip every coin in group A</b>: its tails become heads, so it now has <b>5 − x</b> heads.`,
    `Both groups have 5 − x heads, even though you never learned x.`
  ],
  ans: `Make two piles of 5 and flip one pile completely.`,
  idea: `Choose the group size equal to the total number of heads, then flipping turns "the heads I took" into "the heads I left". Same trick as #13.` });

P({ id: 9, t: "Strategy for a 2-Player Coin Game", c: "Game", d: "Medium",
  q: `An even number of coins with values lie in a row. Two players alternately take one coin from either end. Player A moves first. Show that A can always avoid losing (greedy picking can fail).`,
  hint: `Colour the positions odd/even. Can A force B to always pick from one colour?`,
  steps: [
    `<b>Greedy fails:</b> row 8, 15, 3, 7. Greedy A takes 8, B takes 15, A takes 7, B takes 3 → A 15, B 18. A loses.`,
    `Number positions 1…n. Add up the <b>odd-position</b> coins and the <b>even-position</b> coins. A commits to whichever sum is larger.`,
    `At the start the two ends are positions 1 and n: one odd, one even. A takes the end of the chosen class.`,
    `Now the row has odd length, so <b>both ends are the other class</b>. B is forced to take one of them, which uncovers a coin of A's class at that end. Repeat.`,
    `A collects every coin of the chosen class, which is at least half the total. In 8, 15, 3, 7: odd = 11, even = 22 → A takes 7 first and ends with 22 vs 11.`,
    `For the <i>best possible</i> margin (not just "don't lose"), use DP: f(i,j) = max(v<sub>i</sub> − f(i+1,j), v<sub>j</sub> − f(i,j−1)).`
  ],
  ans: `Take all odd-position or all even-position coins, whichever total is larger; A never loses.`,
  idea: `Find a partition of the board where your move always leaves the opponent only "bad-class" moves.` });

P({ id: 10, t: "5 Pirates and 100 Gold Coins", c: "Game", d: "Hard",
  q: `Pirates A (most senior) to E split 100 coins. The most senior proposes a split; everyone votes; it passes with at least half the votes (ties favour the proposer). If it fails, the proposer is thrown overboard. Pirates want to survive, then maximise gold, then see others thrown out. What should A propose?`,
  hint: `Start with only two pirates left and work backwards.`,
  steps: [
    `<b>Only D, E:</b> D votes for himself, which is 50% → passes. D 100, E 0.`,
    `<b>C, D, E:</b> C needs 2 of 3 votes. E gets 0 if C dies, so 1 coin buys E. → C 99, D 0, E 1.`,
    `<b>B, C, D, E:</b> B needs 2 of 4. D gets 0 under C's plan, so 1 coin buys D. → B 99, C 0, D 1, E 0.`,
    `<b>A … E:</b> A needs 3 of 5 (himself + 2). Under B's plan C and E get 0, so 1 coin each buys them. → <b>A 98, B 0, C 1, D 0, E 1</b>.`,
    `<table class="tbl"><tr><th>Pirates left</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr>
      <tr><td>D,E</td><td></td><td></td><td></td><td>100</td><td>0</td></tr>
      <tr><td>C,D,E</td><td></td><td></td><td>99</td><td>0</td><td>1</td></tr>
      <tr><td>B..E</td><td></td><td>99</td><td>0</td><td>1</td><td>0</td></tr>
      <tr class="hl"><td>A..E</td><td>98</td><td>0</td><td>1</td><td>0</td><td>1</td></tr></table>`,
    `Why not buy D? D gets 1 under B's plan, so he'd need 2 coins. C and E are the cheapest votes.`
  ],
  ans: `A proposes A 98, B 0, C 1, D 0, E 1.`,
  idea: `Backward induction: solve the smallest game first, then buy the votes of whoever does worst in the next-smaller game.` });

P({ id: 11, t: "Minimum Cuts (5-Unit Gold Bar)", c: "Number", d: "Easy",
  q: `A worker is paid 1 unit of gold per day for 5 days. You have one 5-unit bar. What is the minimum number of cuts?`,
  hint: `Same idea as #1: the worker can give change back.`,
  steps: [
    `Two cuts make pieces <b>1, 2, 2</b>, and every total from 1 to 5 can be held: 1, 2, 1+2, 2+2, 1+2+2.`,
    `<table class="tbl"><tr><th>Day</th><th>Give</th><th>Take back</th><th>Holds</th></tr>
      <tr><td>1</td><td>1</td><td>–</td><td>1</td></tr><tr><td>2</td><td>2</td><td>1</td><td>2</td></tr>
      <tr><td>3</td><td>1</td><td>–</td><td>3</td></tr><tr><td>4</td><td>2</td><td>1</td><td>4</td></tr>
      <tr><td>5</td><td>1</td><td>–</td><td>5</td></tr></table>`,
    `<b>One cut is not enough:</b> day 1 needs a 1-unit piece, so the pieces would be 1 and 4. The worker can then hold only 1, 4 or 5, never the 2 owed on day 2.`
  ],
  ans: `2 cuts (pieces 1, 2, 2).`,
  idea: `With change allowed, the question is "which pieces can form every total", not "how many daily payments".` });

P({ id: 12, t: "Prisoner and Policeman", c: "Lateral", d: "Easy",
  q: `A policeman tells a prisoner to make one statement. If it is true, he will be hanged; if false, he will be shot. The prisoner says: 'I will be shot.' What can the policeman do?`,
  hint: `Try each verdict and see if the statement's truth matches the rule.`,
  steps: [
    `<b>Suppose it's true</b> → the rule says hang him → but then he is not shot → the statement was false. Contradiction.`,
    `<b>Suppose it's false</b> → the rule says shoot him → but then he is shot → the statement was true. Contradiction.`,
    `Neither punishment is consistent with the rule. This is the liar paradox ("this sentence is false") in disguise.`
  ],
  ans: `No punishment follows the rule, so the policeman can't carry out either; the prisoner escapes.`,
  idea: `Self-referential statements can make every option contradictory. Always test each case.` });

P({ id: 13, t: "Blind Games (50 Coins, 10 Tails)", c: "Lateral", d: "Easy",
  q: `In a dark room 50 coins lie on a table: 10 show tails and 40 heads. Without seeing, split them into two groups (sizes may differ) with an equal number of tails.`,
  hint: `How big should the first pile be?`,
  steps: [
    `Count out <b>any 10 coins</b> as pile 1 (10 = the total number of tails). If pile 1 has N tails, pile 2 (the other 40 coins) has <b>10 − N</b> tails.`,
    `Pile 1 has 10 − N heads. <b>Flip every coin in pile 1</b>: those heads become tails → pile 1 now has <b>10 − N</b> tails.`,
    `Both piles have 10 − N tails. You never needed to know N.`
  ],
  ans: `Take any 10 coins aside and flip all of them.`,
  idea: `Pile size = total count of the target side. Flipping turns "what I took" into "what I left". Same as #8.` });

P({ id: 14, t: "Chameleons Go on a Date", c: "Invariant", d: "Medium",
  q: `An island has 13 purple, 15 yellow and 17 maroon chameleons. When two of different colours meet, both switch to the third colour. Can all 45 ever become one colour?`,
  hint: `Look at the counts modulo 3.`,
  steps: [
    `A meeting of colours X and Y changes the counts by (X − 1, Y − 1, Z + 2).`,
    `Look at the differences: X − Y is unchanged; X − Z and Y − Z each change by −3. So <b>every pairwise difference stays the same mod 3</b>.`,
    `Start: (13, 15, 17) ≡ (1, 0, 2) mod 3. All three remainders are <b>different</b>, so no two counts are ever equal mod 3.`,
    `"All one colour" means the other two counts are both 0, so equal, so the same mod 3. That can never happen.`
  ],
  ans: `No, it is impossible.`,
  idea: `When a process looks too big to simulate, look for something it can't change (an invariant), often a remainder.` });

P({ id: 15, t: "Heaven and Hell", c: "Logic", d: "Easy",
  q: `Two doors: one to Heaven, one to Hell. Each has a guard; one always lies, one always tells the truth, and you don't know which. With one question to one guard, find the door to Heaven.`,
  hint: `Make the question pass through both guards, or through the same guard twice.`,
  steps: [
    `Ask either guard: <i>"If I asked the other guard which door leads to Heaven, which door would he point to?"</i>`,
    `<table class="tbl"><tr><th>You ask</th><th>Other guard would say</th><th>Reply you hear</th></tr>
      <tr><td>Truth-teller</td><td>Hell (he's the liar)</td><td>Hell (reported honestly)</td></tr>
      <tr><td>Liar</td><td>Heaven (he's truthful)</td><td>Hell (lie about it)</td></tr></table>`,
    `Exactly one lie is always in the chain, so the answer is always the <b>Hell</b> door. Take the other one.`,
    `<b>Alternative:</b> "If I asked <i>you</i> whether this door leads to Heaven, would you say yes?" The liar lies twice, which cancels out, so "yes" means Heaven.`
  ],
  ans: `Ask what the other guard would say, then take the opposite door.`,
  idea: `One lie flips the answer; two lies cancel. Design the question so the number of lies is fixed.` });

P({ id: 16, t: "Mislabeled Jars", c: "Logic", d: "Easy",
  q: `Three jars are labelled Apples, Oranges and Mixed, and every label is wrong. You may pull out one fruit from one jar without looking inside. How do you relabel all three?`,
  hint: `Which jar is guaranteed to contain only one kind of fruit?`,
  steps: [
    `The jar labelled <b>Mixed</b> can't be mixed (all labels are wrong), so it holds a single kind. One fruit from it tells you exactly what it is.`,
    `Say you pull an <b>orange</b> → that jar is Oranges.`,
    `The jar labelled <b>Apples</b> isn't apples (wrong label) and isn't oranges (taken) → it's <b>Mixed</b>. The jar labelled Oranges must be <b>Apples</b>.`,
    `If you pull an apple instead, the same chain works with the roles swapped.`,
    `<b>Why not draw from "Apples"?</b> That jar could be Oranges or Mixed. Pulling an orange wouldn't tell you which.`
  ],
  ans: `Pick one fruit from the jar labelled 'Mixed'; that fixes all three labels.`,
  idea: `Sample where one observation removes all uncertainty.` });

P({ id: 17, t: "8 Balls Problem", c: "Weighing", d: "Easy",
  q: `Eight identical-looking balls; one is lighter. Find it with a balance scale in only two weighings.`,
  hint: `A balance has three outcomes, not two. Split into three groups.`,
  steps: [
    `Split into <b>3, 3 and 2</b>. Weigh 3 vs 3.`,
    `<b>Balanced:</b> the light ball is among the 2 set aside. Weigh them against each other.`,
    `<b>One side lighter:</b> take those 3. Weigh 1 vs 1. The lighter one is it; if they balance, it's the third ball.`,
    `Each weighing has 3 outcomes (left, right, balanced), so 2 weighings can separate up to 3<sup>2</sup> = 9 balls. Splitting in halves (4 v 4) wastes the "balanced" outcome.`
  ],
  ans: `Two weighings: 3 v 3, then 1 v 1 (or the leftover pair).`,
  idea: `With a balance, split into thirds: n weighings handle up to 3<sup>n</sup> balls.` });

P({ id: 18, t: "Cheryl's Birthday", c: "Logic", d: "Medium",
  q: `Cheryl's birthday is one of: May 15, 16, 19; June 17, 18; July 14, 16; August 14, 15, 17. Albert is told the month, Bernard the day. Albert: 'I don't know, but I know Bernard doesn't know.' Bernard: 'At first I didn't know, but now I do.' Albert: 'Then I also know.' When is it?`,
  hint: `Which days appear only once? Albert is sure Bernard didn't get one of those.`,
  fig: `<table class="tbl"><tr><th></th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>19</th></tr>
    <tr class="dim"><td>May</td><td></td><td>●</td><td>●</td><td></td><td></td><td><b>●</b></td></tr>
    <tr class="dim"><td>June</td><td></td><td></td><td></td><td>●</td><td><b>●</b></td><td></td></tr>
    <tr><td>July</td><td class="x">●</td><td></td><td class="hl">●</td><td></td><td></td><td></td></tr>
    <tr><td>August</td><td class="x">●</td><td>●</td><td></td><td>●</td><td></td><td></td></tr></table>`,
  steps: [
    `<b>Albert, statement 1:</b> days 18 and 19 appear only once. If Bernard had 18 or 19 he'd know at once. Albert is <i>sure</i> Bernard doesn't know, so Albert's month contains neither → not May, not June. Left: July 14, 16; August 14, 15, 17.`,
    `<b>Bernard:</b> "now I know." Among the remaining dates, 14 appears twice (July and August), so his day isn't 14. Left: July 16, August 15, August 17.`,
    `<b>Albert:</b> "then I also know." If his month were August he'd still have two options (15, 17). So it's July.`
  ],
  ans: `July 16.`,
  idea: `In "I know that you don't know" puzzles, each statement removes possibilities. Cross them off one statement at a time.` });

P({ id: 19, t: "The Lion and the Unicorn", c: "Logic", d: "Medium",
  q: `The Lion lies on Mon, Tue, Wed and tells the truth the other days. The Unicorn lies on Thu, Fri, Sat and tells the truth the other days. Both say: 'Yesterday was one of my lying days.' What day is it?`,
  hint: `For each speaker, the statement is consistent only on days where "lying today" and "lied yesterday" differ.`,
  steps: [
    `A truth-teller can say it only if yesterday was a lying day; a liar can say it only if yesterday was a truthful day. So the statement works exactly on days where today's mode differs from yesterday's: the <b>switch days</b>.`,
    `<b>Lion</b> switches modes on <b>Monday</b> (truth → lie) and <b>Thursday</b> (lie → truth).`,
    `<b>Unicorn</b> switches on <b>Thursday</b> (truth → lie) and <b>Sunday</b> (lie → truth).`,
    `<table class="tbl"><tr><th></th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr>
      <tr><td>Lion</td><td>L ✓</td><td>L</td><td>L</td><td class="hl">T ✓</td><td>T</td><td>T</td><td>T</td></tr>
      <tr><td>Unicorn</td><td>T</td><td>T</td><td>T</td><td class="hl">L ✓</td><td>L</td><td>L</td><td>T ✓</td></tr></table>`,
    `The only common day is <b>Thursday</b>: the Lion is telling the truth and the Unicorn is lying.`
  ],
  ans: `Thursday.`,
  idea: `"Yesterday I lied" is only sayable on days the speaker switches mode. Find the switch days.` });

P({ id: 20, t: "Farmer, Goat, Wolf and Cabbage", c: "Logic", d: "Easy",
  q: `A farmer must cross a river with a wolf, a goat and a cabbage. His boat carries him plus one item. Left alone, the wolf eats the goat and the goat eats the cabbage. How does he get everything across?`,
  hint: `The goat clashes with both others. It's allowed to make a return trip.`,
  steps: [
    `The goat is the problem item (it conflicts with both), so it goes first and must sometimes come back.`,
    `<table class="tbl"><tr><th>#</th><th>Move</th><th>Left bank</th><th>Right bank</th></tr>
      <tr><td>1</td><td>Goat →</td><td>W C</td><td>G</td></tr>
      <tr><td>2</td><td>← alone</td><td>W C</td><td>G</td></tr>
      <tr><td>3</td><td>Wolf →</td><td>C</td><td>W G</td></tr>
      <tr><td>4</td><td>← <b>Goat back</b></td><td>G C</td><td>W</td></tr>
      <tr><td>5</td><td>Cabbage →</td><td>G</td><td>W C</td></tr>
      <tr><td>6</td><td>← alone</td><td>G</td><td>W C</td></tr>
      <tr><td>7</td><td>Goat →</td><td>–</td><td>W G C</td></tr></table>`,
    `Wolf and cabbage are safe together, which is why step 5 works. Swapping wolf and cabbage in steps 3 and 5 also works.`
  ],
  ans: `7 crossings; the goat comes back once.`,
  idea: `River-crossing puzzles: identify the item that conflicts with everything and let it travel back.` });

P({ id: 21, t: "Water Jug Problem (4 L and 9 L)", c: "Measuring", d: "Medium",
  q: `With an unlimited water supply and unmarked jugs of 4 L and 9 L, can you measure every whole amount from 1 L to 9 L?`,
  hint: `Repeatedly pouring a full 4 L jug into the 9 L jug leaves remainders. What are they?`,
  steps: [
    `Moves allowed: fill a jug, empty a jug, pour one into the other until one is empty or the other full. Since <b>gcd(4, 9) = 1</b>, every whole amount up to 9 is reachable.`,
    `<table class="tbl"><tr><th>Target</th><th>How</th></tr>
      <tr><td>1 L</td><td>Fill 9 → pour into 4 (5 left) → empty 4 → pour again (<b>1</b> left in 9)</td></tr>
      <tr><td>2 L</td><td>Get 3 in the 9-jug (row below), add a full 4 → 7; refill 4 and top up 9 (takes 2) → <b>2</b> left in the 4-jug</td></tr>
      <tr><td>3 L</td><td>Pour full 4-jugs into 9: 4, 8, then the third pour fits only 1 → <b>3</b> left in the 4-jug</td></tr>
      <tr><td>4 L</td><td>Fill the 4</td></tr>
      <tr><td>5 L</td><td>Fill 9 → pour into 4 → <b>5</b> left</td></tr>
      <tr><td>6 L</td><td>2 L in the 9-jug + a full 4</td></tr>
      <tr><td>7 L</td><td>3 L in the 9-jug + a full 4</td></tr>
      <tr><td>8 L</td><td>Two full 4s into the 9</td></tr>
      <tr><td>9 L</td><td>Fill the 9</td></tr></table>`
  ],
  ans: `Yes, every amount from 1 to 9 L.`,
  idea: `With jugs a and b you can measure exactly the multiples of gcd(a, b) up to max(a, b).` });

P({ id: 22, t: "Blind Man and Pills", c: "Lateral", d: "Easy",
  q: `A blind man has 2 blue pills and 2 red pills, all identical to the touch. He must take exactly one blue and one red today, and the same tomorrow. How?`,
  hint: `He can't tell them apart, so make it not matter.`,
  steps: [
    `He can't separate colours, so he removes colour from the problem.`,
    `<b>Cut every one of the 4 pills in half.</b> Put one half of each pill on a "today" plate and the other half on a "tomorrow" plate.`,
    `Each plate gets ½ of each blue pill and ½ of each red pill: ½ + ½ = <b>1 blue + 1 red</b> worth of medicine.`
  ],
  ans: `Halve all four pills; take one half of each today and the other halves tomorrow.`,
  idea: `If you can't distinguish items, treat them all the same way so it doesn't matter which is which.` });

P({ id: 23, t: "The Burning Candles", c: "Measuring", d: "Medium",
  q: `Each of two candles burns in exactly 1 hour, but unevenly (you can't use length). How do you measure 45 minutes (and 15 minutes)?`,
  hint: `Lighting both ends of a candle halves its remaining time, however unevenly it burns.`,
  fig: D.candles(),
  steps: [
    `Key fact: if a candle has T minutes of burning left, lighting <b>both ends</b> finishes it in T/2, no matter how uneven it is (the two flames meet when together they've burned all T).`,
    `At time 0, light candle 1 at <b>both ends</b> and candle 2 at <b>one end</b>.`,
    `Candle 1 dies at <b>30 min</b>. Candle 2 has 30 min of burning left. Light its other end now.`,
    `Candle 2 dies 15 min later, at <b>45 min</b>. The gap between the two burnouts is exactly 15 min.`
  ],
  ans: `Light candle 1 at both ends and candle 2 at one end; when candle 1 dies (30 min) light candle 2's other end; it dies at 45 min.`,
  idea: `Use time, not length. "Both ends" halves remaining time, whatever the burn rate.` });

P({ id: 24, t: "Rat and Poisonous Milk Bottles", c: "Number", d: "Easy",
  q: `Four milk bottles, one poisoned. A rat dies exactly 10 hours after drinking poison. Your clock shows whole hours. Find the bottle within 24 hours with one rat.`,
  hint: `With one rat, the information must be in <i>when</i> it dies.`,
  steps: [
    `Use the <b>time of death</b> as the code. Feed the rat bottle 1 at hour 0, bottle 2 at hour 1, bottle 3 at hour 2.`,
    `<table class="tbl"><tr><th>Rat dies at</th><th>Poison in</th></tr><tr><td>hour 10</td><td>Bottle 1</td></tr><tr><td>hour 11</td><td>Bottle 2</td></tr><tr><td>hour 12</td><td>Bottle 3</td></tr><tr><td>alive after 12</td><td>Bottle 4</td></tr></table>`,
    `Everything is known by hour 12 (well inside 24). Bottle 4 is never drunk, and that's fine: "survived" is a result too.`
  ],
  ans: `Stagger the sips one hour apart; the hour of death names the bottle.`,
  idea: `Timing is information. A single tester can encode many outcomes by when it reacts.` });

P({ id: 25, t: "Measure 6 L with 4 L and 9 L Buckets", c: "Measuring", d: "Easy",
  q: `Using only a 4 L and a 9 L bucket and a tap, measure exactly 6 L.`,
  hint: `6 = 9 − 3. Can you leave exactly 1 L in the 4 L bucket first?`,
  steps: [
    `Plan: get 1 L into the 4 L bucket, so it can only accept 3 more. Then a full 9 minus 3 leaves 6.`,
    `<table class="tbl"><tr><th>Step</th><th>Action</th><th>9 L</th><th>4 L</th></tr>
      <tr><td>1</td><td>Fill 9</td><td>9</td><td>0</td></tr>
      <tr><td>2</td><td>9 → 4</td><td>5</td><td>4</td></tr>
      <tr><td>3</td><td>Empty 4; 9 → 4</td><td>1</td><td>4</td></tr>
      <tr><td>4</td><td>Empty 4; pour the 1 L in</td><td>0</td><td>1</td></tr>
      <tr><td>5</td><td>Fill 9</td><td>9</td><td>1</td></tr>
      <tr class="hl"><td>6</td><td>9 → 4 (only 3 fits)</td><td>6</td><td>4</td></tr></table>`
  ],
  ans: `6 L ends up in the 9 L bucket after 6 steps.`,
  idea: `Work backwards from the target: 6 = 9 − 3, and 3 = 4 − 1.` });

P({ id: 26, t: "Six Houses P, Q, R, S, T, U", c: "Arrangement", d: "Medium",
  q: `Six houses, three on each side of a road, with different colours and heights. T, the tallest, faces the red house. The shortest faces the green house. U (orange) is between P and S. R (yellow) faces P. Q (green) faces U. P (white) is taller than R but shorter than S and Q. What colour is the tallest house, and how many are taller than R?`,
  hint: `Place P, U, S on one side first, then use the "faces" clues.`,
  steps: [
    `U is between P and S → one side is <b>P, U, S</b>.`,
    `R faces P and Q faces U → the other side is <b>R, Q, T</b> with T facing S.`,
    `T faces the red house → <b>S is red</b>. Q (green) faces U → the shortest house faces green → <b>U is shortest</b>.`,
    `Colours used: P white, U orange, S red, R yellow, Q green → <b>T is blue</b>.`,
    `Heights: T tallest; Q and S above P; P above R; U lowest → T &gt; {Q, S} &gt; P &gt; R &gt; U. R is 5th, so <b>4 houses</b> are taller.`,
    `<table class="tbl"><tr><td>P white</td><td>U orange</td><td>S red</td></tr><tr><td colspan="3"><i>road</i></td></tr><tr><td>R yellow</td><td>Q green</td><td class="hl">T blue</td></tr></table>`
  ],
  ans: `The tallest house (T) is blue; 4 houses are taller than R.`,
  idea: `Fix the strongest positional clue first, then fill attributes.` });

P({ id: 27, t: "Melting Candles", c: "Algebra", d: "Easy",
  q: `Two candles of equal length are lit together. The thick one burns out in 6 hours, the thin one in 4 hours. When is the thick one exactly twice as long as the thin one?`,
  hint: `Take the length as 1 and write each remaining length as a function of t.`,
  steps: [
    `After t hours: thick has <b>1 − t/6</b> left, thin has <b>1 − t/4</b> left.`,
    `Set 1 − t/6 = 2(1 − t/4). Multiply by 12: 12 − 2t = 24 − 6t → 4t = 12 → <b>t = 3</b>.`,
    `Check: after 3 h thick has ½, thin has ¼. ½ = 2 × ¼ ✓`
  ],
  ans: `After 3 hours.`,
  idea: `Normalise lengths to 1; then burn rates are just 1/time.` });

P({ id: 28, t: "Red Hat vs Blue Hat", c: "Probability", d: "Hard",
  q: `Three players get red or blue hats by fair coin flips. Each sees the other two hats only. All at once, each says 'red', 'blue' or 'pass'. The team wins if at least one guesses and nobody guesses wrong. Best strategy?`,
  hint: `You can't change how often each guess is right (50%), but you can choose to pile all the wrong guesses into the same few cases.`,
  steps: [
    `Of the 8 equally likely patterns, <b>6 are 2–1 splits</b> and only 2 are all the same colour.`,
    `<b>Rule:</b> if you see two hats of the same colour, guess the <b>opposite</b>. If you see two different colours, pass.`,
    `In a 2–1 split, only the odd-one-out sees a matching pair, guesses the opposite, and is right; the other two pass → <b>win</b>. In the all-same cases everyone guesses wrong → lose.`,
    `<table class="tbl"><tr><th>Hats</th><th>P1</th><th>P2</th><th>P3</th><th>Team</th></tr>
      <tr class="bad"><td>RRR</td><td>B ✗</td><td>B ✗</td><td>B ✗</td><td>lose</td></tr>
      <tr><td>RRB</td><td>pass</td><td>pass</td><td>B ✓</td><td>win</td></tr>
      <tr><td>RBR</td><td>pass</td><td>B ✓</td><td>pass</td><td>win</td></tr>
      <tr><td>BRR</td><td>B ✓</td><td>pass</td><td>pass</td><td>win</td></tr>
      <tr><td>BBR</td><td>pass</td><td>pass</td><td>R ✓</td><td>win</td></tr>
      <tr><td>BRB</td><td>pass</td><td>R ✓</td><td>pass</td><td>win</td></tr>
      <tr><td>RBB</td><td>R ✓</td><td>pass</td><td>pass</td><td>win</td></tr>
      <tr class="bad"><td>BBB</td><td>R ✗</td><td>R ✗</td><td>R ✗</td><td>lose</td></tr></table>`,
    `Count the guesses: 6 right and 6 wrong, a 50/50 split as it must be. But the 6 wrong guesses are crammed into just 2 losing cases, while the 6 right guesses are spread one per winning case.`
  ],
  ans: `75% win rate (6 of 8 cases).`,
  idea: `Concentrate failures, spread successes. This is the idea behind Hamming codes.` });

P({ id: 29, t: "Joint Family of Seven (L, M, N, O, P, Q, R)", c: "Arrangement", d: "Medium",
  q: `A joint family has two married couples. R is a housewife whose husband is a lawyer. N is M's wife. L, an engineer, is R's granddaughter. O is N's father-in-law and P's father; P is a professor. P and M are siblings of the same gender. Q is L's brother and M's son. How is L related to O, and how many males are there?`,
  hint: `"O is N's father-in-law" tells you who O's son is.`,
  steps: [
    `N is M's wife and O is N's father-in-law → <b>O is M's father</b>. O is also P's father, so M and P are brothers or sisters.`,
    `There are two couples: M + N, and the other must be <b>O + R</b> → R is O's wife, so <b>O is the lawyer</b>.`,
    `M has a wife (N) → M is male. P has the same gender → <b>P is male</b>.`,
    `Q is M's son and L's brother → L is M and N's daughter → <b>L is O's granddaughter</b> (consistent with "R's granddaughter").`,
    `<table class="tbl"><tr><td colspan="2">O (M, lawyer) ═ R (F, housewife)</td></tr><tr><td>M (M) ═ N (F)</td><td>P (M, professor)</td></tr><tr><td>L (F, engineer), Q (M)</td><td></td></tr></table>`,
    `Males: O, M, P, Q. Females: R, N, L.`
  ],
  ans: `L is O's granddaughter; there are 4 males.`,
  idea: `Draw the family tree as you read; in-law clues pin down the generations.` });

P({ id: 30, t: "The Circle of Lights", c: "Invariant", d: "Hard",
  q: `N lamps sit in a circle (N &gt; 2), all off. Each lamp's switch toggles that lamp and its two neighbours. What is the fewest switch presses to turn all lamps on?`,
  hint: `Write x<sub>i</sub> = 1 if switch i is pressed. Compare the equations for two neighbouring lamps.`,
  steps: [
    `Order doesn't matter and pressing twice cancels, so each switch is pressed 0 or 1 times: x<sub>i</sub> ∈ {0,1}. Lamp i ends on exactly when <b>x<sub>i−1</sub> + x<sub>i</sub> + x<sub>i+1</sub> is odd</b>.`,
    `Subtract the equations for lamp i and lamp i+1: x<sub>i−1</sub> + x<sub>i</sub> + x<sub>i+1</sub> ≡ x<sub>i</sub> + x<sub>i+1</sub> + x<sub>i+2</sub> → <b>x<sub>i−1</sub> = x<sub>i+2</sub></b>. So the press pattern repeats every 3 lamps.`,
    `<b>If 3 does not divide N:</b> repeating every 3 around a circle of N forces all x<sub>i</sub> equal. Then each lamp sees 3x ≡ 1 → x = 1: you must press <b>all N</b> switches, and that's the only solution.`,
    `<b>If 3 divides N:</b> the pattern (x<sub>1</sub>, x<sub>2</sub>, x<sub>3</sub>) repeats with x<sub>1</sub>+x<sub>2</sub>+x<sub>3</sub> odd: either one press in each block of 3 (N/3 presses) or all three. Best: press switches 2, 5, 8, … → <b>N/3</b> presses. You can't do better, since each press lights at most 3 lamps.`,
    `Example N = 4: pressing all four toggles each lamp 3 times → on. Example N = 9: press 2, 5, 8.`
  ],
  ans: `N/3 presses if 3 divides N, otherwise N presses.`,
  idea: `Turn toggle puzzles into equations mod 2; subtracting neighbouring equations often exposes the structure.` });

P({ id: 31, t: "9 Students and Red/Black Hats", c: "Logic", d: "Medium",
  q: `Nine students each get a red or black hat. There is at least one red, and more black than red. Each sees all others but not their own. Nobody speaks after the first 20 minutes or after 10 more; then within 5 more minutes everyone names their colour. How many reds?`,
  hint: `If there were only one red hat, what would its wearer see?`,
  steps: [
    `"At least one red" and "more black than red" with 9 students → possible red counts: <b>1, 2, 3 or 4</b>.`,
    `<b>1 red:</b> that student sees zero reds, knows there's at least one → it's them → speaks in round 1. Silence rules this out.`,
    `<b>2 reds:</b> each red sees one red. "If that were the only red, they'd have spoken in round 1. They didn't, so I'm red too" → both speak in round 2. Silence again rules this out.`,
    `<b>3 reds:</b> each red sees two reds and, after two silent rounds, concludes they're red → speak in <b>round 3</b>. ✓ This matches.`,
    `The black-hat students see 3 reds; the count could be 3 or 4. When the reds speak in round 3, the count is 3, so they know they're black.`,
    `<table class="tbl"><tr><th>Reds</th><th>A red sees</th><th>Can answer in</th></tr><tr><td>1</td><td>0</td><td>round 1</td></tr><tr><td>2</td><td>1</td><td>round 2</td></tr><tr class="hl"><td>3</td><td>2</td><td>round 3 ← happened</td></tr><tr><td>4</td><td>3</td><td>round 4</td></tr></table>`
  ],
  ans: `3 red hats and 6 black.`,
  idea: `With k special people, they all realise it on round k. Silence carries information. Same logic as #91.` });

P({ id: 32, t: "Light All the Bulbs", c: "Invariant", d: "Hard",
  q: `2014 bulbs sit in a circle; exactly 2 are on. Pressing a bulb toggles its two neighbours (not itself). Can you turn all of them on?`,
  hint: `A press flips two bulbs that are two apart. What does that preserve? Then try to light a block of 4 off bulbs.`,
  steps: [
    `<b>Invariant:</b> a press flips bulbs i−1 and i+1, which have the <b>same parity of position</b>. So in the odd positions the number of lit bulbs changes by 0 or ±2 (parity unchanged), and the same for even positions.`,
    `Goal: all 2014 on → 1007 lit in odd positions and 1007 in even positions: <b>both odd</b>. So the two starting bulbs must be one odd and one even position, i.e. an <b>odd distance apart</b>. If they're an even distance apart, it's impossible.`,
    `<b>Construction (adjacent pair):</b> the other 2012 bulbs form one off block. Take 4 consecutive off bulbs b1 b2 b3 b4:
      <ul><li>Press b2 → b1, b3 turn on.</li><li>Press b3 → b2, b4 turn on.</li></ul>All four are on, and nothing else changed.`,
    `2012 = 4 × 503, so repeat for 503 blocks and everything is lit. (A linear-algebra check confirms that every odd distance works.)`
  ],
  ans: `Yes, when the two lit bulbs are adjacent (more generally, any odd distance apart); no if they're an even distance apart.`,
  idea: `Find what a move can't change (parity per class) to rule cases out, then build a small local "gadget" to solve the rest.` });

P({ id: 33, t: "Distribute the Water (3, 5, 8 L)", c: "Measuring", d: "Medium",
  q: `An 8 L jug is full; 3 L and 5 L jugs are empty. Using only these, end with 4 L in the 5 L jug and 4 L in the 8 L jug.`,
  hint: `Cycle the water 8 → 5 → 3 → 8.`,
  steps: [
    `A reliable pattern: always pour <b>8 → 5</b>, <b>5 → 3</b>, and <b>3 → 8</b> (when 3 is full).`,
    `<table class="tbl"><tr><th>Step</th><th>Pour</th><th>3 L</th><th>5 L</th><th>8 L</th></tr>
      <tr><td>0</td><td>start</td><td>0</td><td>0</td><td>8</td></tr>
      <tr><td>1</td><td>8 → 5</td><td>0</td><td>5</td><td>3</td></tr>
      <tr><td>2</td><td>5 → 3</td><td>3</td><td>2</td><td>3</td></tr>
      <tr><td>3</td><td>3 → 8</td><td>0</td><td>2</td><td>6</td></tr>
      <tr><td>4</td><td>5 → 3</td><td>2</td><td>0</td><td>6</td></tr>
      <tr><td>5</td><td>8 → 5</td><td>2</td><td>5</td><td>1</td></tr>
      <tr><td>6</td><td>5 → 3 (needs 1)</td><td>3</td><td>4</td><td>1</td></tr>
      <tr class="hl"><td>7</td><td>3 → 8</td><td>0</td><td>4</td><td>4</td></tr></table>`
  ],
  ans: `7 pours; final state 3 L: 0, 5 L: 4, 8 L: 4.`,
  idea: `Pick one pouring cycle and stick to it; it walks through every reachable amount.` });

P({ id: 34, t: "Same Number of Hairs on Two Heads?", c: "Counting", d: "Easy",
  q: `Can you prove that in a big city at least two people have exactly the same number of hairs on their heads?`,
  hint: `Pigeonhole principle.`,
  steps: [
    `A human head has at most around 150,000–200,000 hairs. So the possible counts are 0, 1, 2, …, ~200,000: about 200,001 "boxes".`,
    `A big city has millions of people ("pigeons").`,
    `More pigeons than boxes → at least two people share a box, i.e. the same hair count. In a city of 5 million, some count must be shared by at least ⌈5,000,000 / 200,001⌉ = <b>25</b> people.`
  ],
  ans: `Yes, by the pigeonhole principle.`,
  idea: `When items outnumber categories, some category must repeat. You don't need to know which.` });

P({ id: 35, t: "Weight of the Heavy Ball (2187 balls)", c: "Weighing", d: "Easy",
  q: `2187 balls look identical; one is heavier. With a balance scale, what is the minimum number of weighings that guarantees finding it?`,
  hint: `2187 is a power of 3.`,
  steps: [
    `Each weighing has 3 outcomes (left heavy, right heavy, balanced), so it can cut the candidates to one third.`,
    `Split into three groups of 729 and weigh two of them. The heavy ball is in the heavier group, or in the third group if they balance.`,
    `2187 → 729 → 243 → 81 → 27 → 9 → 3 → 1: <b>7 weighings</b>.`,
    `<b>Lower bound:</b> 6 weighings give at most 3<sup>6</sup> = 729 distinct outcomes, fewer than 2187 possibilities. So 7 is optimal.`
  ],
  ans: `7 weighings (3<sup>7</sup> = 2187).`,
  idea: `Minimum weighings = ⌈log<sub>3</sub>(n)⌉ when you know the fake is heavier.` });

P({ id: 36, t: "Find the Ages of the Daughters", c: "Logic", d: "Medium",
  q: `Alok's three daughters' ages multiply to 72. Their sum is his house number, but Shyam still can't tell the ages. Then Alok says 'the eldest likes strawberry ice cream.' Now Shyam knows. What are the ages?`,
  hint: `Why would knowing the sum not be enough? List every triple.`,
  steps: [
    `List all triples with product 72 and their sums:
      <table class="tbl"><tr><th>Ages</th><th>Sum</th><th>Ages</th><th>Sum</th></tr>
      <tr><td>1,1,72</td><td>74</td><td>1,2,36</td><td>39</td></tr><tr><td>1,3,24</td><td>28</td><td>1,4,18</td><td>23</td></tr>
      <tr><td>1,6,12</td><td>19</td><td>1,8,9</td><td>18</td></tr><tr><td>2,2,18</td><td>22</td><td>2,3,12</td><td>17</td></tr>
      <tr><td>2,4,9</td><td>15</td><td class="hl">2,6,6</td><td class="hl">14</td></tr><tr><td class="hl">3,3,8</td><td class="hl">14</td><td>3,4,6</td><td>13</td></tr></table>`,
    `Shyam knows the house number yet can't decide → the sum must be shared by two triples. Only <b>14</b> repeats: (2, 6, 6) and (3, 3, 8).`,
    `"The eldest" means there is a single oldest daughter. In (2, 6, 6) the two oldest are twins, so it's out.`
  ],
  ans: `3, 3 and 8.`,
  idea: `"I still don't know" is a clue: the data must be ambiguous. Find where the ambiguity is.` });

P({ id: 37, t: "Total Distance Travelled by a Bee", c: "Algebra", d: "Easy",
  q: `Two trains 100 km apart head toward each other at 50 km/h and 70 km/h. A bee flies at 80 km/h from one train to the other, back and forth, until they meet. How far does it fly?`,
  hint: `Don't follow the bee. How long is it flying?`,
  steps: [
    `Summing the zig-zags is an infinite series. Instead, ask how <b>long</b> the bee flies.`,
    `The gap closes at 50 + 70 = 120 km/h → the trains meet after 100/120 = <b>5/6 hour</b> (50 min).`,
    `The bee flies the whole time at 80 km/h: 80 × 5/6 = <b>66.67 km</b>.`
  ],
  ans: `200/3 ≈ 66.67 km.`,
  idea: `Distance = speed × time. Find the time from a simpler object.` });

P({ id: 38, t: "6×6 Grid: How Many Paths?", c: "Counting", d: "Easy",
  q: `In a 6×6 grid of squares, moving only right or down from the top-left square to the bottom-right square, how many paths are there?`,
  hint: `How many right moves and down moves does every path have?`,
  fig: D.pascal(6),
  steps: [
    `From the top-left to the bottom-right square you move 5 steps right and 5 steps down: <b>10 moves</b> in some order.`,
    `A path is decided by choosing which 5 of the 10 moves are "right": <b>C(10, 5) = 252</b>.`,
    `Check with Pascal's rule (table above): each cell = cell above + cell to the left, because the last move into a cell comes from above or from the left.`
  ],
  ans: `252 paths.`,
  idea: `Grid paths with R right and D down moves: C(R + D, R).` });

P({ id: 39, t: "Monty Hall Problem", c: "Probability", d: "Medium",
  q: `A car is behind one of three doors. You pick door 1. The host, who knows where the car is, opens another door showing a goat and offers a switch. Should you switch?`,
  hint: `The host never opens the car door. How likely was your first pick to be right?`,
  steps: [
    `Your first pick is right with probability <b>1/3</b>, so the car is behind one of the other two doors with probability <b>2/3</b>.`,
    `The host <i>always</i> opens a goat door among those two (he knows where the car is). He never reveals the car, so the whole 2/3 moves onto the one door he leaves shut.`,
    `<table class="tbl"><tr><th>Car behind</th><th>Host opens</th><th>Stay</th><th>Switch</th></tr>
      <tr><td>Door 1</td><td>2 or 3</td><td>WIN</td><td>lose</td></tr><tr><td>Door 2</td><td>3</td><td>lose</td><td>WIN</td></tr>
      <tr><td>Door 3</td><td>2</td><td>lose</td><td>WIN</td></tr></table>`,
    `<b>Intuition with 100 doors:</b> you pick 1, the host opens 98 goats and leaves one door shut. Would you stay with your 1/100 guess?`
  ],
  ans: `Switch: you win 2/3 of the time (staying wins 1/3).`,
  idea: `The host's choice is informed, not random. Information that is filtered changes the probabilities.` });

P({ id: 40, t: "Torch and Bridge (1, 2, 5, 8 min)", c: "Optimization", d: "Medium",
  q: `Four people (1, 2, 5, 8 minutes) must cross a bridge at night with one torch. At most two cross at a time at the slower person's pace. Can they all cross in 15 minutes?`,
  hint: `The two slowest should cross together, and neither should ever bring the torch back.`,
  steps: [
    `Time is wasted when slow people walk. Pair the two slowest (5 and 8) so their times overlap, and use the fast ones as torch runners.`,
    `<table class="tbl"><tr><th>Move</th><th>Who</th><th>Time</th><th>Total</th></tr>
      <tr><td>Cross</td><td>1 + 2</td><td>2</td><td>2</td></tr><tr><td>Return</td><td>1</td><td>1</td><td>3</td></tr>
      <tr><td>Cross</td><td>5 + 8</td><td>8</td><td>11</td></tr><tr><td>Return</td><td>2</td><td>2</td><td>13</td></tr>
      <tr class="hl"><td>Cross</td><td>1 + 2</td><td>2</td><td>15</td></tr></table>`,
    `<b>General rule</b> for a ≤ b ≤ c ≤ d: "fastest escorts everyone" costs 2a + b + c + d = 17 here; "two slowest together" costs a + 3b + d = 15. Use the second when <b>2b &lt; a + c</b> (4 &lt; 6 ✓).`
  ],
  ans: `Yes, exactly 15 minutes.`,
  idea: `Group the slow items together so their costs overlap instead of adding.` });

P({ id: 41, t: "2 Eggs and 100 Floors", c: "Optimization", d: "Hard",
  q: `With 2 eggs and a 100-floor building, find the highest safe floor. What is the minimum number of drops in the worst case?`,
  hint: `If egg 1 breaks on its k-th drop, egg 2 must check the gap floor by floor. Make the worst case the same everywhere.`,
  steps: [
    `Egg 1 jumps up in steps; when it breaks, egg 2 tests the floors in that gap one by one from the bottom.`,
    `Suppose the worst case is x drops. Egg 1's first drop can be at floor <b>x</b> at most: if it breaks, egg 2 needs up to x − 1 more drops (floors 1 … x−1).`,
    `If it survives, one drop is used up, so the next jump can be only <b>x − 1</b> floors, then x − 2, … Total floors covered: x + (x−1) + … + 1 = <b>x(x+1)/2</b>.`,
    `Smallest x with x(x+1)/2 ≥ 100 is <b>14</b> (14·15/2 = 105; 13·14/2 = 91 is too small).`,
    `Drop egg 1 at <b>14, 27, 39, 50, 60, 69, 77, 84, 90, 95, 99, 100</b>. Example: it breaks at 50 (4th drop) → egg 2 checks 40…49 (up to 10 drops) → at most 14.`
  ],
  ans: `14 drops.`,
  idea: `Balance the worst case: every earlier drop "costs" one, so later gaps must shrink by one each time. See #62 for the general formula.` });

P({ id: 42, t: "Maximise the Probability of a White Ball", c: "Probability", d: "Medium",
  q: `You have 50 white and 50 black balls and two jars. You place all balls in the jars. Then a jar is chosen at random and a ball drawn from it. How should you distribute them to maximise the chance of white?`,
  hint: `Each jar is picked half the time, no matter how many balls it holds.`,
  steps: [
    `Each jar is chosen with probability ½ regardless of size. So make one jar a <b>guaranteed</b> white with as few balls as possible.`,
    `Jar 1: <b>a single white ball</b> → P(white) = 1.`,
    `Jar 2: the other 99 balls (49 white, 50 black) → P(white) = 49/99.`,
    `P(white) = ½ × 1 + ½ × 49/99 = <b>74/99 ≈ 0.747</b>. An even split gives just 0.5.`
  ],
  ans: `1 white ball alone in one jar, all other balls in the other; P = 74/99 ≈ 0.747.`,
  idea: `When choices are weighted equally (not by size), spend the minimum to secure one choice.` });

P({ id: 43, t: "Poison and Rat (1000 bottles)", c: "Number", d: "Medium",
  q: `1000 wine bottles, one poisoned. A rat that drinks poison dies within an hour. All rats drink once at the start. What is the minimum number of rats to identify the bottle in one hour?`,
  hint: `Each rat gives one bit: dead or alive.`,
  steps: [
    `Each rat gives one bit (dead / alive), so k rats can tell apart 2<sup>k</sup> bottles. 2<sup>10</sup> = 1024 ≥ 1000 &gt; 2<sup>9</sup> → <b>10 rats</b>.`,
    `Number the bottles and write each number in 10-bit binary. <b>Rat i drinks from every bottle whose i-th bit is 1.</b>`,
    `After an hour, write 1 for each dead rat and 0 for each live one. That binary number is the poisoned bottle.`,
    `<b>Example:</b> rats 2, 4 and 6 die → 0000101010 = 42 → bottle #42.`
  ],
  ans: `10 rats.`,
  idea: `Binary encoding: each tester is one bit. With more rounds or more outcomes use a bigger base (see #3).` });

P({ id: 44, t: "Hourglasses (4 min and 7 min → 9 min)", c: "Measuring", d: "Medium",
  q: `Using a 4-minute and a 7-minute hourglass, measure exactly 9 minutes.`,
  hint: `When the 4-minute glass runs out the second time, how much sand has fallen in the 7-minute glass since you last flipped it?`,
  fig: D.hourglass(),
  steps: [
    `Start both at 0.`,
    `<b>t = 4:</b> 4-min glass empties → flip it.`,
    `<b>t = 7:</b> 7-min glass empties → flip it. The 4-min glass has 1 minute left.`,
    `<b>t = 8:</b> 4-min glass empties. The 7-min glass has run exactly 1 minute since its flip → <b>flip it again</b> so that 1 minute of sand runs back.`,
    `<b>t = 9:</b> it empties. Done.`
  ],
  ans: `Start both; flip the 4 at 4 min, the 7 at 7 min, and the 7 again at 8 min; it runs out at 9 min.`,
  idea: `Flipping a partly-run glass "measures" the sand that already fell: the difference of two timers.` });

P({ id: 45, t: "Ratio of Boys and Girls (families stop at a boy)", c: "Probability", d: "Medium",
  q: `In a country, every family keeps having children until they get a boy, then stops. Each birth is 50/50. What is the long-run ratio of boys to girls?`,
  hint: `Look at all births in each "round" across every family.`,
  steps: [
    `<b>Round 1:</b> all N families have a child → N/2 boys, N/2 girls. The N/2 girl families try again.`,
    `<b>Round 2:</b> N/4 boys, N/4 girls. <b>Round 3:</b> N/8 each, and so on.`,
    `<table class="tbl"><tr><th>Round</th><th>Boys</th><th>Girls</th></tr><tr><td>1</td><td>N/2</td><td>N/2</td></tr><tr><td>2</td><td>N/4</td><td>N/4</td></tr><tr><td>3</td><td>N/8</td><td>N/8</td></tr><tr class="hl"><td>Total</td><td>≈ N</td><td>≈ N</td></tr></table>`,
    `Every round makes equal numbers of each, so the totals are equal. The deeper reason: <b>each birth is still a fair coin</b>. A stopping rule changes family sizes, not the odds of any single birth.`
  ],
  ans: `1 : 1.`,
  idea: `Stopping rules can't change the expected ratio of independent fair outcomes.` });

P({ id: 46, t: "Car Wheel (4 tyres + 1 spare)", c: "Optimization", d: "Easy",
  q: `A car has 4 tyres plus a spare. Each tyre lasts 20,000 km. Swapping freely, how far can you drive before buying a tyre?`,
  hint: `Count total tyre-kilometres available.`,
  steps: [
    `Total life: 5 × 20,000 = 100,000 tyre-km. The car uses 4 tyres at once, so the best possible is 100,000 / 4 = <b>25,000 km</b>.`,
    `It's achievable: drive 5 legs of 5,000 km, resting a different tyre each leg. Each tyre runs 4 × 5,000 = 20,000 km.`,
    `<table class="tbl"><tr><th>km</th><th>T1</th><th>T2</th><th>T3</th><th>T4</th><th>Spare</th></tr>
      <tr><td>0–5k</td><td>on</td><td>on</td><td>on</td><td>on</td><td class="x">rest</td></tr>
      <tr><td>5–10k</td><td class="x">rest</td><td>on</td><td>on</td><td>on</td><td>on</td></tr>
      <tr><td>10–15k</td><td>on</td><td class="x">rest</td><td>on</td><td>on</td><td>on</td></tr>
      <tr><td>15–20k</td><td>on</td><td>on</td><td class="x">rest</td><td>on</td><td>on</td></tr>
      <tr><td>20–25k</td><td>on</td><td>on</td><td>on</td><td class="x">rest</td><td>on</td></tr></table>`
  ],
  ans: `25,000 km.`,
  idea: `Find the total resource and divide by the rate of use, then show a schedule that wears everything evenly.` });

P({ id: 47, t: "Maximum Chocolates (Rs 15, 3 wrappers = 1)", c: "Number", d: "Easy",
  q: `A chocolate costs Rs 1 and 3 wrappers buy one more. With Rs 15, how many can you eat?`,
  hint: `Keep trading in wrappers, and don't forget the wrappers of the chocolates you got by trading.`,
  steps: [
    `Buy 15, eat them → 15 wrappers.`,
    `15 wrappers → 5 chocolates → 5 wrappers.`,
    `Trade 3 → 1 chocolate. Now 2 + 1 = 3 wrappers → 1 more chocolate → 1 wrapper left.`,
    `Total: 15 + 5 + 1 + 1 = <b>22</b>.`,
    `<b>Shortcut:</b> each trade turns 3 wrappers into 1 (a net loss of 2 wrappers), so for n bought you eat n + ⌊(n − 1)/2⌋ = 15 + 7 = 22.`
  ],
  ans: `22 chocolates.`,
  idea: `Track leftovers carefully, or find the "net cost per trade" to get a formula.` });

P({ id: 48, t: "Splitting a Cake with a Missing Piece", c: "Geometry", d: "Medium",
  q: `A rectangular cake had a rectangular piece (any size, any angle) cut out. With one straight vertical cut, split what's left into two equal parts.`,
  hint: `Which lines cut a rectangle exactly in half?`,
  fig: D.cake(),
  steps: [
    `Any straight line through the <b>centre</b> of a rectangle cuts it into two equal halves (a rectangle is symmetric under 180° rotation about its centre).`,
    `Draw the line through <b>both</b> centres: it halves the whole cake and halves the missing piece at the same time.`,
    `Each side gets (½ cake) − (½ hole). Equal halves minus equal halves are equal.`
  ],
  ans: `Cut along the line joining the centre of the cake and the centre of the missing piece.`,
  idea: `Centre-symmetric shapes are halved by any line through their centre; two such shapes are halved together by the line joining their centres.` });

P({ id: 49, t: "Girl or Boy (Tuesday boy)", c: "Probability", d: "Hard",
  q: `A man has two children. At least one is a boy born on a Tuesday. What is the probability that both are boys? (Sex and weekday are independent and uniform.)`,
  hint: `Each child has 14 equally likely types. Count ordered pairs.`,
  steps: [
    `<b>Baseline:</b> "at least one boy" gives 1/3 (BB out of BB, BG, GB).`,
    `Each child is one of 14 types (2 sexes × 7 days) → 14 × 14 = 196 equally likely ordered pairs.`,
    `Pairs with at least one Tuesday boy:
      <table class="tbl"><tr><th>Case</th><th>Count</th></tr><tr><td>Tue-boy + any girl</td><td>7</td></tr><tr><td>any girl + Tue-boy</td><td>7</td></tr><tr><td>boy + boy, at least one Tuesday</td><td>49 − 36 = 13</td></tr><tr class="hl"><td>Total</td><td>27</td></tr></table>`,
    `Of these 27, 13 are two boys → <b>13/27 ≈ 0.48</b>.`,
    `Why it moves toward ½: the more specific the detail, the more it singles out one particular child, and the closer it gets to "this child is a boy, what about the other?" (which is ½).`
  ],
  ans: `13/27.`,
  idea: `Conditioning on rare details changes probabilities. Count outcomes carefully instead of trusting intuition.` });

P({ id: 50, t: "Average Salary Without Revealing Salaries", c: "Lateral", d: "Easy",
  q: `Four colleagues want their average salary but nobody wants to reveal their own. How can they find it?`,
  hint: `Hide the running total behind a random number.`,
  steps: [
    `A picks a large secret random number <b>r</b>, adds her salary, and whispers <b>s₁ + r</b> to B.`,
    `B adds his salary and passes it to C; C adds hers and passes to D; D adds his and passes back to A. Each person only sees a meaningless masked total.`,
    `A subtracts r: the result is s₁ + s₂ + s₃ + s₄. Divide by 4.`,
    `Caveat: if two people collude (e.g. B and D compare numbers) they can learn C's salary. Stronger versions have each person split their salary into random shares.`
  ],
  ans: `Pass around a running sum masked by a secret random number; the first person removes it at the end.`,
  idea: `Masking with randomness is the basic idea behind secure multi-party computation.` });
