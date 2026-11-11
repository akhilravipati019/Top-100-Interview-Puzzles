/* Puzzles 51–100 (87–100 are bonus classics). */

P({ id: 51, t: "Maximum Runs in a One-Day Match", c: "Number", d: "Medium",
  q: `In a 50-over ODI with no extras, no-balls or overthrows, what's the most runs one batsman can score?`,
  hint: `The batsman must be on strike for every ball, but the ends change after every over.`,
  steps: [
    `To face every ball, our batsman must keep strike. At the end of each over the ends swap, so he must take an <b>odd</b> number of runs off the last ball of each over (except the final over) to be on strike for the next.`,
    `<b>Overs 1–49:</b> five sixes, then <b>3</b> off the 6th ball (the largest odd run without boundaries): 30 + 3 = 33 per over → 49 × 33 = <b>1617</b>.`,
    `<b>Over 50:</b> no next over to worry about → six sixes = <b>36</b>.`,
    `<table class="tbl"><tr><th>Overs</th><th>Per over</th><th>Runs</th></tr><tr><td>1–49</td><td>6,6,6,6,6,3</td><td>1617</td></tr><tr><td>50</td><td>6,6,6,6,6,6</td><td>36</td></tr><tr class="hl"><td>Total</td><td></td><td>1653</td></tr></table>`
  ],
  ans: `1653 runs.`,
  idea: `Find the binding constraint (keeping strike) and pay the smallest price for it each time.` });

P({ id: 52, t: "Completion of Task (work doubles daily)", c: "Number", d: "Easy",
  q: `A man doubles the work he does each day and finishes a job in 18 days. When had he done 25% of it?`,
  hint: `Work backwards from day 18.`,
  steps: [
    `If work doubles daily, the job done <b>by</b> each day roughly doubles too (exactly: 2<sup>n</sup> − 1 units after n days, ≈ 2<sup>n</sup>).`,
    `Work backwards: done at end of day 18 = 100%. Day 17 = 50%. Day 16 = <b>25%</b>.`,
    `(Using the exact sum, 2<sup>16</sup> − 1 out of 2<sup>18</sup> − 1 ≈ 24.99%, which is effectively 25%.)`
  ],
  ans: `At the end of day 16.`,
  idea: `With exponential growth, half of the progress happens in the last step. Work backwards.` });

P({ id: 53, t: "Find the Missing Row in Excel", c: "Number", d: "Easy",
  q: `A sheet holds the integers 1 to 50 in a jumbled order, but one is missing. How do you find it with minimal logic?`,
  hint: `What should the numbers add up to?`,
  steps: [
    `The full sum is 1 + 2 + … + 50 = 50 × 51 / 2 = <b>1275</b>.`,
    `Add up the 49 numbers in the sheet (<code>=SUM(A1:A49)</code>). The missing number is <b>1275 − SUM</b>.`,
    `In code, XOR works too: XOR all values with 1..50; everything pairs off except the missing number, and there's no overflow risk.`
  ],
  ans: `Missing = 1275 − SUM(column).`,
  idea: `Compare against a known total (sum or XOR) to find one missing item in O(n) time and O(1) space.` });

P({ id: 54, t: "Four People on a Rickety Bridge (1, 2, 7, 10)", c: "Optimization", d: "Medium",
  q: `Four people (1, 2, 7 and 10 minutes) cross a bridge at night with one torch, two at a time. What is the shortest total time?`,
  hint: `Send 7 and 10 together.`,
  steps: [
    `<b>Naive:</b> fastest escorts everyone: (1+10) + 1 + (1+7) + 1 + (1+2) → 10 + 1 + 7 + 1 + 2 = <b>21</b> min.`,
    `<b>Better:</b> the two slowest cross together so their times overlap:
      <table class="tbl"><tr><th>Move</th><th>Who</th><th>Time</th><th>Total</th></tr>
      <tr><td>Cross</td><td>1 + 2</td><td>2</td><td>2</td></tr><tr><td>Return</td><td>1</td><td>1</td><td>3</td></tr>
      <tr><td>Cross</td><td>7 + 10</td><td>10</td><td>13</td></tr><tr><td>Return</td><td>2</td><td>2</td><td>15</td></tr>
      <tr class="hl"><td>Cross</td><td>1 + 2</td><td>2</td><td>17</td></tr></table>`,
    `Rule check (see #40): 2b = 4 &lt; a + c = 8, so the "slowest together" plan wins: a + 3b + d = 1 + 6 + 10 = 17.`
  ],
  ans: `17 minutes.`,
  idea: `Make the slow costs overlap; let the fastest people do the torch shuttling.` });

P({ id: 55, t: "Man Fell in a Well (50 m)", c: "Number", d: "Easy",
  q: `A man in a 50 m well climbs 4 m each day and slips 3 m each night. When does he get out?`,
  hint: `On the last day he doesn't slip back.`,
  steps: [
    `Net gain is 1 m per full day-night, but on the final day he climbs out before night comes.`,
    `He escapes on the first day he starts at 46 m or higher (46 + 4 = 50).`,
    `After 46 full days he's at 46 m. On <b>day 47</b> he climbs to 50 m and is out.`,
    `The common wrong answer is 50 days (50 m ÷ 1 m/day), which forgets that the last climb has no slip.`
  ],
  ans: `On day 47.`,
  idea: `Treat the final step separately whenever a cycle has a "bad" half (the slip) after the "good" half.` });

P({ id: 56, t: "50 Red and 50 Blue Marbles", c: "Probability", d: "Medium",
  q: `Two boxes hold 50 red and 50 blue marbles between them. You may arrange them however you like; then a box is picked at random and one marble drawn. Maximise the chance of red.`,
  hint: `Same idea as #42.`,
  steps: [
    `Put k red marbles alone in box 1 (red is certain there) and everything else in box 2.`,
    `P(red) = ½ [1 + (50 − k)/(100 − k)]. The second fraction shrinks as k grows, so <b>k = 1</b> is best.`,
    `P = ½ (1 + 49/99) = <b>74/99 ≈ 0.7475</b>.`
  ],
  ans: `Put 1 red marble alone in one box and the other 99 in the other box: P = 74/99.`,
  idea: `Boxes are picked equally, so secure one box as cheaply as possible.` });

P({ id: 57, t: "Form Three Equilateral Triangles (move 4 sticks)", c: "Matchstick", d: "Hard",
  q: `12 matchsticks form a hexagon with its 6 spokes (6 small equilateral triangles). Move 4 sticks so the figure has exactly 3 equilateral triangles, with every stick used.`,
  setup: D.hexStart(false),
  hint: `Three separate small triangles use only 9 sticks. So one triangle must be bigger.`,
  fig: `<div class="row">${D.hexStart(true)}<span class="arrow">→</span>${D.hexEnd()}</div><p class="cap">Red = the 4 sticks to move. Green = where they go.</p>`,
  steps: [
    `Three separate small triangles use 9 sticks, leaving 3 spare. Every stick must be used, so one triangle must be <b>larger</b>: side 2 uses 6 sticks, plus two small triangles (6 sticks) = 12 ✓.`,
    `Keep two small triangles: the top-right one and the bottom one (each is two spokes + one rim stick).`,
    `Remove the other <b>4 rim sticks</b> (red). The two left-side spokes stay; they form two sides of the big triangle, each half-length.`,
    `Lay the 4 removed sticks on the outside (green): one extends each spoke to length 2, and two form the third side. That closes a big triangle of side 2.`,
    `No extra triangles appear: every gap between spokes inside the big triangle has lost its rim stick.`
  ],
  ans: `1 big triangle (side 2) + 2 small triangles.`,
  idea: `Count sticks first: it tells you what shapes are possible before you start fiddling.` });

P({ id: 58, t: "10 Identical Bottles of Pills", c: "Weighing", d: "Easy",
  q: `Ten bottles of pills; in nine every pill weighs 1.0 g, in one every pill weighs 1.1 g. With one weighing, find the heavy bottle.`,
  hint: `Same idea as #6.`,
  steps: [
    `Take <b>1 pill from bottle 1, 2 from bottle 2, …, 10 from bottle 10</b>: 55 pills.`,
    `If all were normal: 55.0 g. Each heavy pill adds 0.1 g, so the extra weight is 0.1 × (bottle number).`,
    `<b>Example:</b> 55.7 g → 0.7 g extra → <b>bottle 7</b>.`
  ],
  ans: `Take k pills from bottle k; bottle = (weight − 55) / 0.1.`,
  idea: `Unique counts per candidate turn a single measurement into an ID.` });

P({ id: 59, t: "Max Pieces of a Circle with 6 Straight Cuts", c: "Counting", d: "Medium",
  q: `What is the most pieces you can cut a circular pizza into with 6 straight cuts?`,
  hint: `How many new pieces can the n-th cut create?`,
  steps: [
    `A new cut that crosses k existing cuts is split into k + 1 segments, and each segment splits one region in two → <b>k + 1 new pieces</b>.`,
    `The n-th cut can cross all n − 1 earlier cuts (at distinct points inside the circle) → adds <b>n</b> pieces.`,
    `Pieces = 1 + (1 + 2 + … + n) = <b>1 + n(n+1)/2</b>.`,
    `<table class="tbl"><tr><th>cuts</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr><tr><th>pieces</th><td>1</td><td>2</td><td>4</td><td>7</td><td>11</td><td>16</td><td class="hl">22</td></tr></table>`,
    `To reach the max: no two cuts parallel, no three meeting at one point, all crossings inside the pizza.`
  ],
  ans: `22 pieces.`,
  idea: `Count what each new step adds; the total is then a simple sum (the "lazy caterer" sequence).` });

P({ id: 60, t: "Chain Link (5 segments of 3 links)", c: "Optimization", d: "Medium",
  q: `You have 5 chains of 3 links. Opening a link costs $1 and closing it costs $3. Join them into one open chain for under $15.`,
  hint: `Sacrifice one whole chain.`,
  steps: [
    `Joining 5 chains end to end needs 4 joins. Opening one link per join costs 4 × ($1 + $3) = <b>$16</b>. Too much.`,
    `Instead, open <b>all 3 links of one chain</b> ($3). Now you have 3 loose links and 4 chains.`,
    `4 chains need only 3 joins. Use the 3 loose links and close each one ($9).`,
    `Total $3 + $9 = <b>$12</b>.`
  ],
  ans: `$12.`,
  idea: `One piece can be broken up to supply the joints for all the others.` });

P({ id: 61, t: "The Shopkeeper and the Fake Note", c: "Lateral", d: "Easy",
  q: `A lady buys Rs 200 of goods with a Rs 1000 note. The shopkeeper changes it at a neighbour's shop and gives her Rs 800 change. Later the neighbour finds the note is fake and the shopkeeper repays him Rs 1000. What is the shopkeeper's loss (goods sold at cost)?`,
  hint: `Who ended up with something for nothing?`,
  steps: [
    `The neighbour gave Rs 1000 real and got Rs 1000 real back: he's even. Ignore him.`,
    `The lady walked away with Rs 200 of goods + Rs 800 cash and gave nothing real.`,
    `Money isn't created or destroyed here, so the shopkeeper's loss equals the lady's gain: 200 + 800 = <b>Rs 1000</b>.`,
    `Common wrong answers: Rs 1800 or Rs 2000 count the Rs 1000 change from the neighbour as a loss, but that money was paid back.`
  ],
  ans: `Rs 1000.`,
  idea: `In money puzzles, find who gained; their gain is someone else's loss.` });

P({ id: 62, t: "The Two-Egg Problem (k floors)", c: "Optimization", d: "Hard",
  q: `Generalise the egg puzzle: with 2 eggs and k floors, what's the minimum worst-case number of drops?`,
  hint: `With x drops allowed, how many floors can you cover?`,
  steps: [
    `With x drops allowed, the first drop must be at floor x at most (if it breaks, egg 2 checks x − 1 floors below one at a time).`,
    `If it survives, x − 1 drops remain, so the next jump is x − 1 floors, then x − 2, …`,
    `Total coverage: x + (x−1) + … + 1 = <b>x(x+1)/2</b> floors.`,
    `So the answer is the smallest x with x(x+1)/2 ≥ k, i.e. <b>x = ⌈(√(8k+1) − 1)/2⌉</b>.`,
    `<table class="tbl"><tr><th>floors k</th><td>10</td><td>36</td><td>100</td><td>200</td><td>1000</td></tr><tr><th>drops</th><td>4</td><td>8</td><td>14</td><td>20</td><td>45</td></tr></table>`
  ],
  ans: `x = ⌈(√(8k+1) − 1)/2⌉, the smallest x with x(x+1)/2 ≥ k.`,
  idea: `Flip the question: instead of "drops for k floors", ask "floors for x drops", which is easier to compute.` });

P({ id: 63, t: "Snail and the Wall (30 ft)", c: "Number", d: "Easy",
  q: `A snail climbs 3 ft every hour and then slides back 2 ft. How long to top a 30 ft wall?`,
  hint: `Same idea as #55.`,
  steps: [
    `Net 1 ft per hour, except the final climb has no slide.`,
    `It escapes on the first hour it starts at 27 ft or more (27 + 3 = 30).`,
    `After 27 hours it's at 27 ft; in <b>hour 28</b> it climbs to 30 ft and is over.`
  ],
  ans: `28 hours.`,
  idea: `Subtract the final climb, divide by net progress, then add 1.` });

P({ id: 64, t: "1000 Bulbs and 1000 People", c: "Number", d: "Medium",
  q: `1000 bulbs are off. Person 1 toggles every bulb, person 2 every 2nd bulb, person 3 every 3rd, and so on up to person 1000. How many bulbs end up on?`,
  hint: `Bulb n is toggled once for each divisor of n.`,
  fig: D.bulbs100(),
  steps: [
    `Bulb n is toggled by person d exactly when d divides n. It ends <b>on</b> if it's toggled an <b>odd</b> number of times.`,
    `Divisors come in pairs (d, n/d), e.g. 12: (1,12), (2,6), (3,4). So the count is even, unless some d = n/d, i.e. <b>n is a perfect square</b> (16: 1·16, 2·8, 4·4 → 5 divisors).`,
    `Perfect squares ≤ 1000: 1², 2², …, 31² = 961 (32² = 1024 is too big) → <b>31</b> bulbs.`
  ],
  ans: `31 bulbs (exactly the perfect squares).`,
  idea: `Only perfect squares have an odd number of divisors.` });

P({ id: 65, t: "Four Alternating Knights", c: "Invariant", d: "Hard",
  q: `On a 3×3 board, two black knights sit on the top corners and two white knights on the bottom corners. Can you reach a position where the colours alternate around the corners (diagonal corners share a colour)?`,
  setup: D.knightBoard(),
  hint: `Draw a graph: squares are nodes, knight moves are edges. What shape does it make?`,
  fig: D.knightCycle(),
  steps: [
    `Draw every knight move on the 3×3 board. The centre square has no moves. The other 8 squares form <b>one cycle</b>: a1 → b3 → c1 → a2 → c3 → b1 → a3 → c2 → a1.`,
    `So knights can only slide around this ring, one step at a time, and can't pass through an occupied square. That means their <b>order around the ring never changes</b>.`,
    `Corners in ring order are a1, c1, c3, a3 with colours <b>W, W, B, B</b>.`,
    `Alternating (diagonal corners match: a1 = c3, c1 = a3) needs ring order <b>W, B, W, B</b>. That's a different cyclic order, so it's unreachable.`,
    `By contrast, fully swapping blacks and whites keeps the order (rotate everyone 4 steps) and takes 16 moves.`
  ],
  ans: `Impossible; the knights' cyclic order can never change.`,
  idea: `Redraw the puzzle as a graph. Here it "unfolds" into a circle, which makes the invariant obvious.` });

P({ id: 66, t: "The Nine Dots", c: "Lateral", d: "Easy",
  q: `Join all 9 dots of a 3×3 grid with 4 straight lines without lifting your pen.`,
  setup: D.nineDots(false),
  hint: `Your lines are allowed to go outside the square.`,
  fig: D.nineDots(true),
  steps: [
    `The usual mistake is staying inside the square the dots form. With that limit it needs 5 lines.`,
    `Start at the bottom-left dot. <b>Line 1:</b> go up through the left column and one step beyond the top-left dot ①.`,
    `<b>Line 2:</b> come down diagonally through the top-middle and middle-right dots to one step beyond the bottom-right ②.`,
    `<b>Line 3:</b> go left along the bottom row back to the start corner.`,
    `<b>Line 4:</b> go diagonally up through the centre to the top-right dot. All 9 covered.`
  ],
  ans: `4 lines that extend beyond the grid (the origin of "thinking outside the box").`,
  idea: `Question constraints that were never stated.` });

P({ id: 67, t: "100 Cows and Milk", c: "Number", d: "Easy",
  q: `Cow i gives i litres of milk (i = 1 to 100). Divide the cows among 10 sons so each son gets 10 cows and the same amount of milk.`,
  hint: `Pair the smallest with the largest.`,
  steps: [
    `Total milk = 1 + … + 100 = 5050 L, so each son needs <b>505 L</b>.`,
    `Pair cow i with cow 101 − i: each pair gives <b>101 L</b>. Five pairs = 505 L and 10 cows. ✓`,
    `One neat split: son k gets cows 5k−4 … 5k and 101−5k … 105−5k.
      <table class="tbl"><tr><th>Son</th><th>Low block</th><th>High block</th><th>Litres</th></tr>
      <tr><td>1</td><td>1–5</td><td>96–100</td><td>15 + 490 = 505</td></tr><tr><td>2</td><td>6–10</td><td>91–95</td><td>40 + 465 = 505</td></tr>
      <tr><td>…</td><td>…</td><td>…</td><td>…</td></tr><tr><td>10</td><td>46–50</td><td>51–55</td><td>240 + 265 = 505</td></tr></table>`
  ],
  ans: `Give each son 5 pairs (i, 101 − i): 505 litres each.`,
  idea: `Gauss pairing: the first and last terms add to the same constant.` });

P({ id: 68, t: "One Mile on the Globe", c: "Geometry", d: "Hard",
  q: `How many points on Earth are there from which you can walk 1 mile south, 1 mile east, 1 mile north and end up where you started?`,
  hint: `The North Pole is one. Then think about the South Pole.`,
  steps: [
    `<b>North Pole:</b> south 1 mile, east 1 mile (along a circle of latitude), north 1 mile back to the pole. ✓`,
    `<b>Near the South Pole:</b> there's a circle of latitude whose circumference is exactly 1 mile. Start anywhere 1 mile <b>north</b> of it: walk south onto the circle, walking east 1 mile loops exactly once around, walking north brings you back. ✓`,
    `That starting circle alone has infinitely many points.`,
    `And for circles of circumference 1/2, 1/3, 1/4, … mile, walking east 1 mile loops 2, 3, 4, … times. Each gives another ring of starting points.`
  ],
  ans: `Infinitely many: the North Pole plus infinitely many rings near the South Pole.`,
  idea: `Check the special points (poles, edges) where usual geometry breaks down.` });

P({ id: 69, t: "Three Matchsticks to Three Squares", c: "Matchstick", d: "Medium",
  q: `12 matchsticks form a 2×2 grid (4 small squares). Move exactly 3 matchsticks so you have exactly 3 equal squares, using every stick.`,
  setup: D.grid2x2(false),
  hint: `Break two diagonal squares and use the freed sticks to build a new square on the outside.`,
  fig: `<div class="row">${D.grid2x2(true)}<span class="arrow">→</span>${D.grid2x2End()}</div><p class="cap">Red = sticks to move. Green = where they go.</p>`,
  steps: [
    `Squares may share sides, but every stick must belong to a square and there must be exactly 3 squares.`,
    `Remove the <b>left and bottom</b> sticks of the bottom-left square and the <b>top</b> stick of the top-right square. Both of those squares are now broken; the top-left and bottom-right squares remain.`,
    `Use the 3 sticks to build a new square to the <b>right of the top-right cell</b>, reusing its right side as the new square's left side.`,
    `Result: top-left, bottom-right and the new square, 3 squares, all 12 sticks used, every stick part of a square.`
  ],
  ans: `Move 3 sticks to build a new square on the outside (see diagram).`,
  idea: `A shared side lets 3 sticks make a whole new square.` });

P({ id: 70, t: "The Counters and the Board", c: "Arrangement", d: "Hard",
  q: `Place 2n counters on an n × n board (n &gt; 1) so that no row, column or diagonal holds more than two counters.`,
  hint: `Place counters in 2×2 blocks of adjacent pairs and spread the blocks so no diagonal gets three.`,
  fig: D.counters8(),
  steps: [
    `2n counters with at most 2 per row → every row has <b>exactly</b> 2, and likewise every column.`,
    `Rows and columns are easy. Diagonals are the hard part. A good pattern: place counters as <b>horizontal pairs</b> (two adjacent cells) and arrange the pairs like a scattered "queens" layout so each column pair is used twice and diagonals stay light.`,
    `Layout for n = 8 (rows top to bottom, columns 1–8): pairs in columns (1,2), (1,2), (5,6), (7,8), (3,4), (7,8), (3,4), (5,6).`,
    `Check: each row has 2, each column has 2, and every ↘ and ↗ diagonal has at most 2 (verified exhaustively). Small cases work too, e.g. n = 3: leave the main diagonal empty and fill the other 6 cells.`
  ],
  ans: `Possible; for n = 8, use the layout shown.`,
  idea: `Satisfy the easy constraints with structure (pairs), then search for a placement that satisfies the hard ones (diagonals).` });

P({ id: 71, t: "Six Matches, Right Foot Forward", c: "Matchstick", d: "Easy",
  q: `With six matchsticks, make 'nothing'.`,
  hint: `"Nothing" can be a number or a word.`,
  steps: [
    `This is lateral thinking: "nothing" can be <b>written</b> rather than shown.`,
    `<b>Zero:</b> six sticks form a hexagon-shaped 0.`,
    `<b>Word:</b> N (3 sticks) + I (1 stick) + L (2 sticks) = <b>NIL</b>, which means nothing.`
  ],
  ans: `Make a 0 (hexagon) or spell NIL.`,
  idea: `Read the question literally and look for a wordplay.` });

P({ id: 72, t: "How Much Did He Have Initially?", c: "Algebra", d: "Easy",
  q: `At each of 4 temples, Rama's money doubles as he enters and he donates Rs 100 as he leaves. After the 4th temple he has nothing. What did he start with?`,
  hint: `Work backwards: undo "−100" then undo "×2".`,
  steps: [
    `Reverse each temple: <b>add 100, then halve</b>.`,
    `<table class="tbl"><tr><th>Temple</th><th>Leaves with</th><th>Before donating</th><th>Entered with</th></tr>
      <tr><td>4</td><td>0</td><td>100</td><td>50</td></tr><tr><td>3</td><td>50</td><td>150</td><td>75</td></tr>
      <tr><td>2</td><td>75</td><td>175</td><td>87.5</td></tr><tr class="hl"><td>1</td><td>87.5</td><td>187.5</td><td>93.75</td></tr></table>`,
    `<b>Algebra check:</b> after 4 temples: 16x − 100(8 + 4 + 2 + 1) = 16x − 1500 = 0 → x = 93.75.`
  ],
  ans: `Rs 93.75.`,
  idea: `When the end state is known, run the process in reverse.` });

P({ id: 73, t: "3 Cuts for 8 Equal Pieces of Cake", c: "Lateral", d: "Easy",
  q: `Cut a round cake into 8 equal pieces with only 3 straight cuts.`,
  hint: `A cake has height too.`,
  steps: [
    `Two vertical cuts through the centre at right angles → 4 equal quarters.`,
    `Third cut: <b>horizontal</b>, slicing the cake in half through its height. Each quarter becomes two layers.`,
    `4 × 2 = <b>8 equal pieces</b>. (Another valid answer: stack the halves after cut 1 and cut through the stack.)`
  ],
  ans: `Two perpendicular vertical cuts plus one horizontal cut.`,
  idea: `Use the third dimension.` });

P({ id: 74, t: "Two Creepers Climbing a Tree", c: "Geometry", d: "Medium",
  q: `A jasmine and a rose creeper start together at the foot of a tree and both reach the first branch together. The jasmine makes 5 full twists and the rose 3, twisting in opposite directions. How many times do they cross, excluding bottom and top?`,
  hint: `Ignore height. Look down from above: two points going round a circle in opposite directions.`,
  steps: [
    `From above, each creeper is a point moving around a circle as it climbs. Jasmine makes 5 turns, rose makes 3, in opposite directions.`,
    `They meet whenever their <b>combined</b> angle covers another full circle. Relative turns = 5 + 3 = <b>8</b> over the whole climb → they meet 8 times (after the start).`,
    `The 8th meeting is at the branch (top), which is excluded. So <b>7 crossings</b> in between.`,
    `If they twisted the same way, the relative turns would be 5 − 3 = 2 → only 1 crossing in between.`
  ],
  ans: `7 crossings.`,
  idea: `Use relative motion: opposite directions add, same directions subtract.` });

P({ id: 75, t: "Number of Legs in the Palace", c: "Number", d: "Easy",
  q: `You are in a palace with 5 guards. Each guard watches 5 rooms, each room has 5 adult tigers, each tiger has 5 cubs. How many legs are in the palace?`,
  hint: `Don't forget anyone.`,
  steps: [
    `Rooms: 5 × 5 = 25. Adult tigers: 25 × 5 = 125. Cubs: 125 × 5 = 625. Tigers: 750 → <b>3000 legs</b>.`,
    `Humans: 5 guards + <b>you</b> = 6 people → 12 legs.`,
    `Total 3000 + 12 = <b>3012</b>. The trap is forgetting yourself.`
  ],
  ans: `3012 legs.`,
  idea: `Re-read the question for hidden participants, especially "you".` });

P({ id: 76, t: "Days of the Month with 2 Dice", c: "Lateral", d: "Medium",
  q: `Write one digit on each face of two cubes so that together they can show every date from 01 to 31.`,
  hint: `Which digits must appear on both cubes? Then you're one face short, unless a digit can be turned upside down.`,
  steps: [
    `<b>11 and 22</b> need a 1 on both cubes and a 2 on both cubes.`,
    `<b>01–09</b> need a 0 next to each of 1–9. Nine digits can't all fit on one cube, so <b>both</b> cubes need a 0.`,
    `That's 0, 1, 2 on each cube, leaving 3 + 3 = 6 free faces for the 7 digits 3–9. One short!`,
    `<b>Trick:</b> a 6 turned upside down is a 9. So we only need 3, 4, 5, 6, 7, 8 (6 digits).`,
    `<table class="tbl"><tr><th>Cube 1</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr><tr><th>Cube 2</th><td>0</td><td>1</td><td>2</td><td>6/9</td><td>7</td><td>8</td></tr></table>`
  ],
  ans: `Cube 1: 0 1 2 3 4 5; Cube 2: 0 1 2 6 7 8 (the 6 doubles as 9).`,
  idea: `When you're exactly one short, look for a physical trick (here: rotation).` });

P({ id: 77, t: "Make 4 Triangles with 6 Matchsticks", c: "Matchstick", d: "Easy",
  q: `Using 6 identical matchsticks, make 4 equilateral triangles whose sides are one stick long.`,
  hint: `Don't stay flat.`,
  steps: [
    `4 separate triangles would need 12 sticks, so every stick must be shared by 2 triangles. In a flat layout 6 sticks give at most 2 such triangles.`,
    `Go 3D: lay 3 sticks as a triangle, then stand the other 3 up from its corners so they meet at a point above the centre.`,
    `This <b>tetrahedron</b> has 4 faces, each an equilateral triangle, and each stick is an edge shared by exactly 2 faces.`
  ],
  ans: `Build a tetrahedron (triangular pyramid).`,
  idea: `If a count doesn't work in 2D, try 3D.` });

P({ id: 78, t: "Last Palindrome Date before 10/02/2001", c: "Number", d: "Hard",
  q: `In MMDDYYYY format, 10/02/2001 → 10022001 is a palindrome. When was the previous palindrome date?`,
  hint: `The year decides everything: reversing the year gives MMDD.`,
  steps: [
    `For M₁M₂D₁D₂Y₁Y₂Y₃Y₄ to be a palindrome: <b>month = Y₄Y₃</b> and <b>day = Y₂Y₁</b>. So each year has at most one palindrome date.`,
    `<b>2000:</b> month = 00 → invalid. <b>1400–1999:</b> day = Y₂1 with Y₂ ≥ 4 → day ≥ 41 → invalid.`,
    `<b>1300s:</b> day = 31. Month = Y₄Y₃ must be a month with 31 days.`,
    `Going down from 1399: months 99, 89, …, invalid until <b>1390</b> → month 09, day 31, but September has 30 days → invalid. <b>1380</b> → month 08, day 31 → August 31 ✓`
  ],
  ans: `August 31, 1380 (08311380).`,
  idea: `Find the one free variable (the year) that determines everything, then scan it in order.` });

P({ id: 79, t: "10 Balls in 5 Lines", c: "Geometry", d: "Medium",
  q: `Arrange 10 balls in 5 straight lines with exactly 4 balls on each line.`,
  hint: `5 lines × 4 balls = 20 "slots" but only 10 balls. So each ball must lie on two lines.`,
  fig: D.pentagram(),
  steps: [
    `5 lines × 4 balls = 20 ball-slots with only 10 balls → every ball lies on exactly <b>2 lines</b>, i.e. every ball is an intersection.`,
    `5 lines in general position meet in C(5, 2) = <b>10</b> points, exactly one per pair, and each line meets the other 4 → 4 points per line ✓`,
    `A <b>five-pointed star</b> (pentagram) draws this neatly: the 5 tips and 5 inner corners.`
  ],
  ans: `Place them at the 10 points of a five-pointed star.`,
  idea: `Double counting: slots ÷ items tells you how many lines each item must be on.` });

P({ id: 80, t: "Round Table Coin Game", c: "Game", d: "Medium",
  q: `Two players take turns placing identical coins flat on a round table without overlap. The player who can't place a coin loses. Who wins?`,
  hint: `The table has a centre of symmetry.`,
  fig: D.coinsTable(),
  steps: [
    `The first player puts a coin <b>exactly at the centre</b>. This spot has no mirror partner, so it must be used first.`,
    `Whenever the second player places a coin, the first player places one at the <b>diametrically opposite</b> point (reflection through the centre).`,
    `The position is always symmetric, so if B's spot was free, its mirror spot is free too (and still on the table). B always runs out of moves first.`
  ],
  ans: `The first player wins: centre first, then mirror every move.`,
  idea: `Symmetry strategy: take the unique centre, then copy your opponent.` });

P({ id: 81, t: "Chessboard and Dominoes", c: "Invariant", d: "Easy",
  q: `Remove two diagonally opposite corner squares from a chessboard. Can 31 dominoes (each covering 2 adjacent squares) cover the remaining 62 squares?`,
  setup: D.chessCorners(),
  hint: `Colour matters.`,
  steps: [
    `Diagonally opposite corners are the <b>same colour</b>. Removing them leaves 30 of that colour and 32 of the other.`,
    `Every domino covers two adjacent squares, which are always one light and one dark. So 31 dominoes cover exactly 31 of each.`,
    `30 ≠ 31 and 32 ≠ 31 → impossible.`
  ],
  ans: `No; the colour count doesn't match.`,
  idea: `A colouring invariant: count what each piece must cover and compare with what's available.` });

P({ id: 82, t: "3 Ants on a Triangle", c: "Probability", d: "Easy",
  q: `Three ants sit on the corners of a triangle. Each picks one of the two edges at random and walks along it. What is the probability that at least two collide?`,
  hint: `Count the safe cases instead.`,
  steps: [
    `Each ant has 2 choices → 2³ = 8 equally likely outcomes.`,
    `No collision only if all go the same way round: all clockwise or all anticlockwise → <b>2</b> safe cases.`,
    `P(collision) = 1 − 2/8 = <b>3/4</b>. (For n ants on an n-gon: 1 − 2/2ⁿ.)`
  ],
  ans: `3/4.`,
  idea: `When "at least one" is messy, count the complement.` });

P({ id: 83, t: "Measure 45 Minutes with Two Wires", c: "Measuring", d: "Easy",
  q: `Two identical wires each burn in exactly 1 hour, but unevenly. Measure 45 minutes.`,
  hint: `Same trick as #23.`,
  fig: D.wires(),
  steps: [
    `Light wire 1 at <b>both ends</b> and wire 2 at <b>one end</b>.`,
    `Wire 1 burns out after <b>30 minutes</b> (the two flames together burn its 60 minutes in 30). Wire 2 now has 30 minutes of burn left.`,
    `Immediately light wire 2's other end: its remaining 30 minutes now takes <b>15</b>. Total 45.`
  ],
  ans: `30 + 15 = 45 minutes.`,
  idea: `Lighting both ends halves the remaining time, regardless of uneven burning.` });

P({ id: 84, t: "The Elevator", c: "Lateral", d: "Easy",
  q: `A man on the 10th floor rides down to the ground every evening. In the morning he rides up only to the 7th floor and walks the last three, except on rainy days or when someone else is in the lift. Why?`,
  hint: `What's different about rainy days and having company?`,
  steps: [
    `He's short. He can reach the G button and the 7 button, but not the 10 button.`,
    `When someone else is in the lift, they press 10 for him.`,
    `On rainy days he carries an umbrella and uses it to press 10.`
  ],
  ans: `He can't reach the '10' button.`,
  idea: `Explain every exception: they usually point straight at the hidden constraint.` });

P({ id: 85, t: "Last Ball to Remain", c: "Invariant", d: "Medium",
  q: `A bag has 20 red and 16 blue balls. Repeatedly take out two: if they're the same colour, put back a blue; if different, put back a red. What colour is the last ball?`,
  hint: `Track the number of red balls mod 2.`,
  steps: [
    `<table class="tbl"><tr><th>Take out</th><th>Put back</th><th>Change in reds</th></tr><tr><td>Red + Red</td><td>Blue</td><td>−2</td></tr><tr><td>Blue + Blue</td><td>Blue</td><td>0</td></tr><tr><td>Red + Blue</td><td>Red</td><td>0</td></tr></table>`,
    `Reds change by 0 or −2, so the <b>parity of the red count never changes</b>.`,
    `Each step removes one ball, so eventually one ball remains. Reds start at 20 (even). A single red would mean 1 red (odd), which is impossible.`
  ],
  ans: `Blue.`,
  idea: `Find the quantity whose parity is preserved; it decides the end state without simulating.` });

P({ id: 86, t: "100 People in a Circle with a Gun", c: "Number", d: "Hard",
  q: `100 people stand in a circle. Person 1 shoots person 2 and passes the gun to 3, who shoots 4, and so on round the circle. Who survives?`,
  hint: `Try n = 1…8 by hand. What happens when n is a power of 2?`,
  steps: [
    `<b>Small cases:</b>
      <table class="tbl"><tr><th>n</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr><tr><th>survivor</th><td>1</td><td>1</td><td>3</td><td>1</td><td>3</td><td>5</td><td>7</td><td>1</td></tr></table>`,
    `<b>Power of 2:</b> each lap kills exactly half and the gun returns to person 1, so the circle stays a power of 2 with person 1 starting. <b>Person 1 survives.</b>`,
    `<b>n = 100 = 64 + 36:</b> after 36 people are shot (2, 4, …, 72), 64 remain, a power of 2, and the gun is with <b>person 73</b>. He now plays the role of "person 1" → he survives.`,
    `<b>Formula:</b> write n = 2<sup>m</sup> + L (0 ≤ L &lt; 2<sup>m</sup>); survivor = 2L + 1. Here 2·36 + 1 = 73. (Equivalently: rotate n's binary left by one bit: 1100100 → 1001001 = 73.)`
  ],
  ans: `Person 73.`,
  idea: `Josephus problem: reduce to the nearest power of 2, where the answer is trivial.` });

P({ id: 87, t: "12 Coins, One Fake (Heavier or Lighter)", c: "Weighing", d: "Hard",
  q: `Of 12 coins, one is fake and is either heavier or lighter, and you don't know which. Find it and say whether it's heavy or light in 3 weighings.`,
  hint: `24 possibilities, 27 outcomes. In the second weighing, mix coins from both pans and bring in a known-good coin.`,
  steps: [
    `24 possibilities (12 coins × heavy/light) ≤ 3³ = 27 outcomes, so it's possible in principle, but every weighing must split the suspects into three near-equal groups.`,
    `<b>Weighing 1:</b> coins 1–4 vs 5–8.`,
    `<b>If balanced</b> → fake is in 9–12 (1–8 are good). Weigh 9, 10, 11 vs 1, 2, 3.
      <ul><li>Balanced → coin 12; weigh it vs a good coin to see heavy/light.</li>
      <li>9–11 heavier → one of them is heavy; weigh 9 vs 10 (heavier one, or 11 if balanced). Same idea if lighter.</li></ul>`,
    `<b>If 1–4 heavier</b> → suspects: 1,2,3,4 heavy or 5,6,7,8 light (8 cases). Weigh <b>1, 2, 5 vs 3, 6, G</b> (G = good coin from 9–12):
      <table class="tbl"><tr><th>Result</th><th>Suspects left</th><th>Weighing 3</th></tr>
      <tr><td>Balanced</td><td>4 heavy, 7 light, 8 light</td><td>7 vs 8: lighter is fake; balance → 4 heavy</td></tr>
      <tr><td>Left heavier</td><td>1 heavy, 2 heavy, 6 light</td><td>1 vs 2: heavier is fake; balance → 6 light</td></tr>
      <tr><td>Left lighter</td><td>3 heavy, 5 light</td><td>3 vs G: heavier → 3; balance → 5 light</td></tr></table>`,
    `<b>If 5–8 heavier</b> → the same as above with the roles of 1–4 and 5–8 swapped.`
  ],
  ans: `3 weighings suffice; the tree above finds the coin and whether it's heavy or light.`,
  idea: `Information budget: each weighing must divide the remaining cases by ~3. Moving coins between pans is how you do that.` });

P({ id: 88, t: "Clock Angle at 3:15", c: "Number", d: "Easy",
  q: `What is the angle between the hour and minute hands at 3:15?`,
  hint: `The hour hand doesn't stay on 3.`,
  steps: [
    `Minute hand: 15 min × 6°/min = <b>90°</b> from 12.`,
    `Hour hand: 30° per hour + 0.5° per minute → 3 × 30 + 15 × 0.5 = <b>97.5°</b>.`,
    `Difference: 97.5 − 90 = <b>7.5°</b>. General formula: |30H − 5.5M| (take 360 minus it if over 180).`
  ],
  ans: `7.5°.`,
  idea: `The hour hand moves continuously at 0.5° per minute. That's the trap.` });

P({ id: 89, t: "How Often Do Clock Hands Overlap?", c: "Number", d: "Medium",
  q: `How many times a day do the hour and minute hands of a clock overlap?`,
  hint: `Relative speed of the minute hand over the hour hand.`,
  steps: [
    `Minute hand: 360°/h. Hour hand: 30°/h. The minute hand gains <b>330°/h</b>, so it laps the hour hand every 360/330 = <b>12/11 h</b> ≈ 65.45 min.`,
    `In 24 hours: 24 ÷ (12/11) = <b>22</b> overlaps.`,
    `That's why there's no overlap between 11 and 1 (beyond 12:00): the "11 o'clock" overlap happens exactly at 12:00.`
  ],
  ans: `22 times.`,
  idea: `Use relative speed for "how often do two moving things meet".` });

P({ id: 90, t: "Birthday Paradox", c: "Probability", d: "Medium",
  q: `How many people must be in a room for there to be a better-than-even chance that two share a birthday?`,
  hint: `Compute the probability that everyone's birthday is different.`,
  steps: [
    `P(all different) = 365/365 × 364/365 × 363/365 × … for n people.`,
    `This drops below ½ at n = 23 → P(shared) ≈ <b>50.7%</b>.`,
    `<table class="tbl"><tr><th>n</th><td>10</td><td>20</td><td>23</td><td>30</td><td>50</td><td>70</td></tr><tr><th>P(shared)</th><td>11.7%</td><td>41.1%</td><td class="hl">50.7%</td><td>70.6%</td><td>97.0%</td><td>99.9%</td></tr></table>`,
    `It feels small because we think "someone shares <i>my</i> birthday". What matters is <b>pairs</b>: 23 people form C(23, 2) = 253 pairs.`
  ],
  ans: `23 people.`,
  idea: `Count pairs, not people; and compute "at least one" via the complement.` });

P({ id: 91, t: "Blue-Eyed Islanders", c: "Logic", d: "Hard",
  q: `On an island, k people have blue eyes; nobody knows their own eye colour and there are no mirrors. Anyone who works out they have blue eyes must leave that night. A visitor announces: 'At least one of you has blue eyes.' What happens?`,
  hint: `Solve k = 1, then k = 2, and look for the pattern.`,
  steps: [
    `<b>k = 1:</b> the blue-eyed person sees nobody with blue eyes, so it must be them → leaves on night 1.`,
    `<b>k = 2:</b> each sees one blue. "If they were the only one, they'd leave on night 1." Nobody leaves → there must be a second, me → both leave on <b>night 2</b>.`,
    `<b>By induction:</b> with k blue-eyed people, each sees k − 1 and waits. When nobody leaves on night k − 1, they all conclude they're blue → <b>all k leave on night k</b>.`,
    `<b>Why the announcement matters</b> even if k ≥ 2 and everyone already knew "someone has blue eyes": it makes the fact <i>common knowledge</i> (everyone knows that everyone knows that …), which starts the shared countdown.`
  ],
  ans: `All k blue-eyed people leave together on night k.`,
  idea: `Induction plus common knowledge. Silence each night carries information (same as #31).` });

P({ id: 92, t: "Handshakes at a Party", c: "Counting", d: "Easy",
  q: `At a party of n people, everyone shakes hands with everyone else exactly once. How many handshakes?`,
  hint: `A handshake is a pair of people.`,
  steps: [
    `Each handshake is an unordered pair → <b>C(n, 2) = n(n − 1)/2</b>.`,
    `Another view: each person shakes n − 1 hands → n(n − 1), but each handshake is counted twice (once per person).`,
    `6 people → 15. 10 people → 45.`
  ],
  ans: `n(n − 1)/2.`,
  idea: `Count from each side, then divide out double counting.` });

P({ id: 93, t: "Socks in the Dark", c: "Counting", d: "Easy",
  q: `A drawer holds black and white socks mixed. In the dark, how many socks must you take to be sure of a matching pair?`,
  hint: `How many colours are there?`,
  steps: [
    `2 colours = 2 "boxes". Worst case, the first two socks are different colours.`,
    `The 3rd sock must match one of them → <b>3 socks</b> (pigeonhole).`,
    `<b>Variant:</b> a pair of a <i>specific</i> colour depends on counts. With 10 black and 10 white, the worst case is all 10 whites first, then 2 blacks → 12.`
  ],
  ans: `3 socks.`,
  idea: `Pigeonhole: with c categories, c + 1 items guarantee a repeat.` });

P({ id: 94, t: "The Missing Rupee (Hotel Puzzle)", c: "Lateral", d: "Easy",
  q: `Three friends pay Rs 30 for a room. The manager says it's Rs 25 and sends Rs 5 back with a bellboy, who keeps Rs 2 and returns Rs 1 to each. Now each paid 9 (27 total) plus the bellboy's 2 is 29. Where did the last rupee go?`,
  hint: `Should the bellboy's 2 be added to 27 or is it already inside it?`,
  steps: [
    `The 27 they paid <b>already includes</b> the bellboy's 2: 27 = 25 (hotel) + 2 (bellboy).`,
    `The correct balance: 30 = 25 (hotel) + 2 (bellboy) + 3 (returned).`,
    `"27 + 2" adds a number that should be subtracted. It's a meaningless sum.`
  ],
  ans: `Nothing is missing: 27 = 25 + 2, and 25 + 2 + 3 = 30.`,
  idea: `Write where every rupee ends up. Bad accounting adds things from different sides of the equation.` });

P({ id: 95, t: "Ant on a Cube", c: "Geometry", d: "Medium",
  q: `An ant walks on the surface of a unit cube from one corner to the opposite corner. What's the shortest path?`,
  hint: `Unfold the cube.`,
  fig: D.cube(),
  steps: [
    `The ant must stay on the surface, so the space diagonal √3 isn't allowed.`,
    `Unfold two adjacent faces into a flat 2 × 1 rectangle. The start and end corners become opposite corners of that rectangle.`,
    `On a flat surface the shortest path is a straight line: √(2² + 1²) = <b>√5 ≈ 2.236</b>. It crosses the shared edge at its midpoint.`,
    `Compare: along the edges it's 3. There are 6 such shortest routes (one per choice of the pair of faces).`
  ],
  ans: `√5 ≈ 2.236.`,
  idea: `Unfold 3D surfaces into the plane; shortest paths become straight lines.` });

P({ id: 96, t: "Broken Stick Triangle", c: "Probability", d: "Hard",
  q: `A stick is broken at two random points. What is the probability that the three pieces form a triangle?`,
  hint: `Three lengths form a triangle exactly when no piece is at least half the stick.`,
  fig: D.stick(),
  steps: [
    `Triangle inequality with total length 1: each side must be shorter than the other two combined → <b>every piece &lt; ½</b>.`,
    `Describe the pieces as (a, b, 1 − a − b). All possibilities form the triangle a, b ≥ 0, a + b ≤ 1.`,
    `"All pieces &lt; ½" is a &lt; ½, b &lt; ½, a + b &gt; ½: the <b>middle triangle</b> joining the midpoints of the sides.`,
    `The midpoint triangle has exactly <b>¼</b> of the area.`
  ],
  ans: `1/4.`,
  idea: `Turn continuous probability into geometry: probability = favourable area / total area.` });

P({ id: 97, t: "Trailing Zeros in 100!", c: "Number", d: "Easy",
  q: `How many zeros does 100! end with?`,
  hint: `Each trailing zero needs a 10 = 2 × 5. Which factor is scarcer?`,
  steps: [
    `Each trailing zero needs one factor 10 = 2 × 5. Factors of 2 are plentiful, so <b>count factors of 5</b>.`,
    `Multiples of 5 up to 100: ⌊100/5⌋ = <b>20</b>. Multiples of 25 contribute an extra 5: ⌊100/25⌋ = <b>4</b>. ⌊100/125⌋ = 0, so stop.`,
    `20 + 4 = <b>24</b>.`
  ],
  ans: `24 zeros.`,
  idea: `Legendre's formula: count multiples of p, p², p³, …` });

P({ id: 98, t: "Expected Tosses for Two Heads in a Row", c: "Probability", d: "Medium",
  q: `On average, how many fair coin tosses until you get two heads in a row?`,
  hint: `Set up states: "no progress" and "last toss was H".`,
  steps: [
    `Let E₀ = expected tosses from scratch, E₁ = expected tosses when the last toss was H.`,
    `From scratch: toss once; H → state 1, T → back to scratch: <b>E₀ = 1 + ½E₁ + ½E₀</b> → E₀ = 2 + E₁.`,
    `From state 1: toss once; H → done, T → scratch: <b>E₁ = 1 + ½·0 + ½E₀</b>.`,
    `Substitute: E₀ = 2 + 1 + E₀/2 → E₀/2 = 3 → <b>E₀ = 6</b> (and E₁ = 4).`,
    `Compare: HT takes only 4 tosses on average, because a failed attempt at HT doesn't throw away the H.`
  ],
  ans: `6 tosses.`,
  idea: `For "expected time until a pattern", write one equation per state and solve.` });

P({ id: 99, t: "Squares on a Chessboard", c: "Counting", d: "Easy",
  q: `How many squares of all sizes are on an 8 × 8 chessboard?`,
  hint: `Count squares of each size k × k separately.`,
  steps: [
    `A k × k square can start in (9 − k) columns and (9 − k) rows → <b>(9 − k)²</b> of them.`,
    `<table class="tbl"><tr><th>Side</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><th>Sum</th></tr><tr><th>Count</th><td>64</td><td>49</td><td>36</td><td>25</td><td>16</td><td>9</td><td>4</td><td>1</td><td class="hl">204</td></tr></table>`,
    `1² + 2² + … + 8² = 8·9·17/6 = <b>204</b>. (Rectangles, for comparison: C(9,2)² = 1296.)`
  ],
  ans: `204 squares.`,
  idea: `Split by size, count positions for each size, then sum.` });

P({ id: 100, t: "Missionaries and Cannibals", c: "Logic", d: "Medium",
  q: `Three missionaries and three cannibals must cross a river in a boat that holds two. On either bank, cannibals must never outnumber missionaries (if any missionaries are present). How do they cross?`,
  hint: `Cannibals alone on a bank are harmless. Move them first.`,
  steps: [
    `Someone must always bring the boat back, so plan the return trips. Cannibals can safely gather on the far bank while no missionaries are there.`,
    `<table class="tbl"><tr><th>#</th><th>Boat</th><th>Left bank</th><th>Right bank</th></tr>
      <tr><td>1</td><td>2C →</td><td>3M 1C</td><td>2C</td></tr><tr><td>2</td><td>← 1C</td><td>3M 2C</td><td>1C</td></tr>
      <tr><td>3</td><td>2C →</td><td>3M</td><td>3C</td></tr><tr><td>4</td><td>← 1C</td><td>3M 1C</td><td>2C</td></tr>
      <tr><td>5</td><td>2M →</td><td>1M 1C</td><td>2M 2C</td></tr><tr class="hl"><td>6</td><td>← 1M 1C</td><td>2M 2C</td><td>1M 1C</td></tr>
      <tr><td>7</td><td>2M →</td><td>2C</td><td>3M 1C</td></tr><tr><td>8</td><td>← 1C</td><td>3C</td><td>3M</td></tr>
      <tr><td>9</td><td>2C →</td><td>1C</td><td>3M 2C</td></tr><tr><td>10</td><td>← 1C</td><td>2C</td><td>3M 1C</td></tr>
      <tr><td>11</td><td>2C →</td><td>–</td><td>3M 3C</td></tr></table>`,
    `The key move is step 6: a missionary <i>and</i> a cannibal return together, so both banks stay balanced (1–1 and 2–2).`,
    `A breadth-first search over states (M left, C left, boat side) confirms 11 is the minimum.`
  ],
  ans: `11 crossings (table above).`,
  idea: `Model it as a state graph and search; the "middle" step (send a balanced pair back) is the insight.` });
