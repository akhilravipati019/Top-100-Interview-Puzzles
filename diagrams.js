/* Diagram builders. Each returns an SVG/HTML string. Colours come from CSS classes so they follow the theme. */
window.PUZZLES = [];
window.P = function (o) { window.PUZZLES.push(o); };

window.D = (function () {
  const svg = (vb, body, w) =>
    `<svg viewBox="${vb}" role="img" style="max-width:${w || 420}px">${body}</svg>`;
  const line = (a, b, cls, w) =>
    `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="${cls}" stroke-width="${w || 2}" stroke-linecap="round"/>`;
  const text = (x, y, t, cls, size) =>
    `<text x="${x}" y="${y}" class="${cls || 'tx'}" font-size="${size || 12}" text-anchor="middle" dominant-baseline="middle">${t}</text>`;
  const circ = (x, y, r, cls) => `<circle cx="${x}" cy="${y}" r="${r}" class="${cls}"/>`;
  const rect = (x, y, w, h, cls, extra) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${cls}" ${extra || ''}/>`;

  /* generic timeline: rows [{label, segs:[[start,end,cls,label]]}], ticks [[t,label]] */
  function timeline(max, rows, ticks) {
    const x0 = 90, W = 400, sc = W / max, rh = 34;
    let b = '';
    rows.forEach((r, i) => {
      const y = 10 + i * rh;
      b += `<text x="${x0 - 8}" y="${y + 12}" class="tx" font-size="12" text-anchor="end" dominant-baseline="middle">${r.label}</text>`;
      r.segs.forEach(s => {
        b += rect(x0 + s[0] * sc, y, (s[1] - s[0]) * sc, 24, s[2] + ' sl', 'rx="4"');
        b += `<text x="${x0 + (s[0] + s[1]) / 2 * sc}" y="${y + 12}" class="tl" font-size="11" text-anchor="middle" dominant-baseline="middle">${s[3] || ''}</text>`;
      });
    });
    const yb = 10 + rows.length * rh;
    ticks.forEach(t => {
      const x = x0 + t[0] * sc;
      b += `<line x1="${x}" y1="4" x2="${x}" y2="${yb}" class="sm" stroke-dasharray="3 3"/>`;
      b += text(x, yb + 10, t[1], 'tx', 11);
    });
    return svg(`0 0 ${x0 + W + 20} ${yb + 22}`, b, 520);
  }

  /* matchstick helpers */
  const stick = (a, b, cls) => line(a, b, cls, 6);

  return {
    rod() {
      const cls = ['fw', 'fa', 'fa', 'fo', 'fo', 'fo', 'fo'];
      let b = '';
      for (let i = 0; i < 7; i++) b += rect(20 + i * 50, 30, 50, 40, cls[i] + ' sl');
      [70, 170].forEach(x => (b += `<line x1="${x}" y1="18" x2="${x}" y2="82" class="sb" stroke-width="3" stroke-dasharray="5 4"/>` + text(x, 10, 'cut', 'tb', 11)));
      b += text(45, 92, 'piece 1', 'tx', 12) + text(120, 92, 'piece 2', 'tx', 12) + text(270, 92, 'piece 4', 'tx', 12);
      return svg('0 0 390 102', b, 420);
    },

    horses() {
      const keep = { A1: 'fo', A2: 'fw', A3: 'fw', B1: 'fw', B2: 'fw', C1: 'fw' };
      let b = '';
      'ABCDE'.split('').forEach((g, r) => {
        for (let c = 1; c <= 5; c++) {
          const id = g + c, cl = keep[id] || 'fs';
          const out = !keep[id];
          b += `<g opacity="${out ? 0.45 : 1}">` + circ(30 + (c - 1) * 46, 24 + r * 42, 17, cl + ' sl') + text(30 + (c - 1) * 46, 24 + r * 42, id, keep[id] ? 'tl' : 'tx', 12) + '</g>';
        }
      });
      b += text(300, 40, 'green = fastest', 'tx', 11) + text(300, 58, 'yellow = race 7', 'tx', 11) + text(300, 76, 'faded = eliminated', 'tx', 11);
      return svg('0 0 370 220', b, 380);
    },

    candles() {
      return timeline(45, [
        { label: 'Candle 1', segs: [[0, 30, 'fw', 'lit at BOTH ends']] },
        { label: 'Candle 2', segs: [[0, 30, 'fa', 'one end'], [30, 45, 'fo', 'both ends']] }
      ], [[0, '0'], [30, '30 min'], [45, '45 min']]);
    },

    wires() {
      return timeline(45, [
        { label: 'Wire 1', segs: [[0, 30, 'fw', 'lit at BOTH ends']] },
        { label: 'Wire 2', segs: [[0, 30, 'fa', 'one end'], [30, 45, 'fo', 'other end too']] }
      ], [[0, '0'], [30, '30 min'], [45, '45 min']]);
    },

    hourglass() {
      return timeline(9, [
        { label: '4-min', segs: [[0, 4, 'fa', 'run'], [4, 8, 'fa', 'flipped']] },
        { label: '7-min', segs: [[0, 7, 'fw', 'run 7'], [7, 8, 'fw', '1'], [8, 9, 'fo', '1']] }
      ], [[0, '0'], [4, '4'], [7, '7'], [8, '8'], [9, '9 ✓']]);
    },

    knightBoard() {
      let b = '';
      for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++)
        b += `<rect x="${c * 50}" y="${r * 50}" width="50" height="50" fill="${(r + c) % 2 ? '#b58863' : '#f0d9b5'}"/>`;
      const k = (c, r, white) => `<text x="${c * 50 + 25}" y="${r * 50 + 28}" font-size="36" text-anchor="middle" dominant-baseline="middle" fill="${white ? '#fff' : '#1f2937'}" stroke="${white ? '#1f2937' : 'none'}" stroke-width="1">♞</text>`;
      b += k(0, 0) + k(2, 0) + k(0, 2, 1) + k(2, 2, 1);
      ['a', 'b', 'c'].forEach((f, i) => (b += text(i * 50 + 25, 162, f, 'tx', 11)));
      ['3', '2', '1'].forEach((n, i) => (b += text(-9, i * 50 + 25, n, 'tx', 11)));
      return svg('-18 -4 172 174', b, 200);
    },

    knightCycle() {
      const lab = ['a1', 'b3', 'c1', 'a2', 'c3', 'b1', 'a3', 'c2'];
      const col = { a1: 'W', c1: 'W', c3: 'B', a3: 'B' };
      const cx = 120, cy = 115, R = 85;
      const pts = lab.map((_, i) => {
        const a = (-90 + i * 45) * Math.PI / 180;
        return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
      });
      let b = '';
      pts.forEach((p, i) => (b += line(p, pts[(i + 1) % 8], 'sm', 2)));
      pts.forEach((p, i) => {
        const c = col[lab[i]];
        b += circ(p[0], p[1], c ? 19 : 13, c === 'B' ? 'fk sl' : c === 'W' ? 'fwh sl' : 'fs sm');
        b += text(p[0], p[1], lab[i], c === 'B' ? 'tw' : c === 'W' ? 'tl' : 'tx', c ? 12 : 10);
      });
      b += text(cx, cy - 8, 'knight-move', 'tx', 11) + text(cx, cy + 8, 'cycle', 'tx', 11);
      return svg('0 0 240 230', b, 280);
    },

    nineDots(sol) {
      const P = [40, 80, 120];
      let b = '';
      if (sol) b += `<polyline points="40,120 40,0 160,120 40,120 120,40" fill="none" class="sb" stroke-width="3" stroke-linejoin="round"/>`;
      P.forEach(x => P.forEach(y => (b += circ(x, y, 7, 'fk'))));
      if (sol) {
        b += circ(40, 120, 11, 'none so-ring');
        b += text(40, -8 + 0, '', 'tx');
        b += text(20, 0, '①', 'tx', 13) + text(170, 132, '②', 'tx', 13) + text(25, 135, 'start', 'tx', 10);
      }
      return svg(sol ? '0 -14 185 160' : '20 20 120 120', b, sol ? 260 : 160);
    },

    hexStart(hl) {
      const p = (x, y) => [100 + 40 * x, 100 - 40 * y];
      const s = Math.sqrt(3) / 2;
      const V = [p(1, 0), p(.5, s), p(-.5, s), p(-1, 0), p(-.5, -s), p(.5, -s)], O = p(0, 0);
      const move = hl ? [1, 2, 3, 5] : [];
      let b = '';
      for (let i = 0; i < 6; i++) b += stick(V[i], V[(i + 1) % 6], move.includes(i) ? 'sb' : 'sw');
      for (let i = 0; i < 6; i++) b += stick(O, V[i], 'sw');
      return svg('50 52 100 96', b, 170);
    },

    hexEnd() {
      const p = (x, y) => [100 + 40 * x, 100 - 40 * y];
      const s = Math.sqrt(3) / 2;
      const V = [p(1, 0), p(.5, s), p(-.5, s), p(-1, 0), p(-.5, -s), p(.5, -s)], O = p(0, 0);
      const Pp = p(-2, 0), Q = p(-1, 2 * s), M = p(-1.5, s);
      let b = '';
      [[O, V[3]], [O, V[2]], [O, V[0]], [V[0], V[1]], [V[1], O], [O, V[4]], [V[4], V[5]], [V[5], O]].forEach(e => (b += stick(e[0], e[1], 'sw')));
      [[V[3], Pp], [V[2], Q], [Pp, M], [M, Q]].forEach(e => (b += stick(e[0], e[1], 'so')));
      return svg('10 22 140 122', b, 240);
    },

    grid2x2(hl) {
      const g = (i, j) => [20 + 50 * i, 20 + 50 * j];
      const rm = hl ? ['0,1-0,2', '0,2-1,2', '1,0-2,0'] : [];
      let b = '';
      const e = (a, c, d, f) => {
        const key = `${a},${c}-${d},${f}`;
        b += stick(g(a, c), g(d, f), rm.includes(key) ? 'sb' : 'sw');
      };
      for (let j = 0; j <= 2; j++) for (let i = 0; i < 2; i++) e(i, j, i + 1, j);
      for (let i = 0; i <= 2; i++) for (let j = 0; j < 2; j++) e(i, j, i, j + 1);
      return svg('0 0 140 140', b, 160);
    },

    grid2x2End() {
      const g = (i, j) => [20 + 50 * i, 20 + 50 * j];
      const keep = [[0, 0, 1, 0], [0, 1, 1, 1], [1, 1, 2, 1], [1, 2, 2, 2], [0, 0, 0, 1], [1, 0, 1, 1], [1, 1, 1, 2], [2, 0, 2, 1], [2, 1, 2, 2]];
      const add = [[2, 0, 3, 0], [3, 0, 3, 1], [2, 1, 3, 1]];
      let b = '';
      keep.forEach(k => (b += stick(g(k[0], k[1]), g(k[2], k[3]), 'sw')));
      add.forEach(k => (b += stick(g(k[0], k[1]), g(k[2], k[3]), 'so')));
      return svg('0 0 190 140', b, 210);
    },

    counters8() {
      const L = [[0, 1], [0, 1], [4, 5], [6, 7], [2, 3], [6, 7], [2, 3], [4, 5]];
      let b = '';
      for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++)
        b += `<rect x="${c * 28}" y="${r * 28}" width="28" height="28" fill="${(r + c) % 2 ? '#b58863' : '#f0d9b5'}"/>`;
      L.forEach((cs, r) => cs.forEach(c => (b += `<circle cx="${c * 28 + 14}" cy="${r * 28 + 14}" r="10" fill="#d1453b" stroke="#fff" stroke-width="2"/>`)));
      return svg('0 0 224 224', b, 260);
    },

    chessCorners() {
      let b = '';
      for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
        const x = c * 26, y = r * 26;
        const gone = (r === 0 && c === 0) || (r === 7 && c === 7);
        b += `<rect x="${x}" y="${y}" width="26" height="26" fill="${gone ? 'transparent' : (r + c) % 2 ? '#6b4a2b' : '#ead7b0'}"/>`;
        if (gone) b += `<path d="M${x + 4} ${y + 4}L${x + 22} ${y + 22}M${x + 22} ${y + 4}L${x + 4} ${y + 22}" class="sb" stroke-width="2.5"/>`;
      }
      return svg('-2 -2 212 212', b, 230);
    },

    pentagram() {
      const cx = 110, cy = 110, R = 92, r = R * Math.cos(72 * Math.PI / 180) / Math.cos(36 * Math.PI / 180);
      const out = [], inn = [];
      for (let k = 0; k < 5; k++) {
        const a = (-90 + 72 * k) * Math.PI / 180, a2 = (-90 + 36 + 72 * k) * Math.PI / 180;
        out.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]);
        inn.push([cx + r * Math.cos(a2), cy + r * Math.sin(a2)]);
      }
      let b = '';
      for (let k = 0; k < 5; k++) b += line(out[k], out[(k + 2) % 5], 'sa', 2);
      out.concat(inn).forEach(p => (b += circ(p[0], p[1], 8, 'fb sl')));
      return svg('5 5 210 200', b, 260);
    },

    cake() {
      let b = rect(20, 20, 260, 140, 'fc sl', 'rx="4"');
      b += `<g transform="rotate(-20 210 50)">` + rect(185, 35, 50, 30, 'fs', 'stroke-dasharray="4 3" class="sl"') + `</g>`;
      b += line([45, 160], [255, 20], 'sb', 3);
      b += circ(150, 90, 5, 'fb') + circ(210, 50, 5, 'fa');
      b += text(150, 106, 'cake centre', 'tx', 11) + text(222, 82, 'hole centre', 'tx', 11);
      return svg('10 10 280 160', b, 360);
    },

    coinsTable() {
      let b = circ(150, 110, 100, 'fc sl');
      b += circ(150, 110, 16, 'fa sl') + text(150, 110, 'A', 'tl', 12);
      const pairs = [[95, 60], [205, 75], [110, 165]];
      pairs.forEach((p, i) => {
        const q = [300 - p[0], 220 - p[1]];
        b += `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" class="sm" stroke-dasharray="3 3"/>`;
        b += circ(p[0], p[1], 16, 'fb sl') + text(p[0], p[1], 'B' + (i + 1), 'tl', 11);
        b += circ(q[0], q[1], 16, 'fa sl') + text(q[0], q[1], 'A' + (i + 1), 'tl', 11);
      });
      return svg('40 0 220 220', b, 260);
    },

    cube() {
      let b = rect(30, 30, 80, 80, 'fs sl') + rect(110, 30, 80, 80, 'fc sl');
      b += line([30, 110], [190, 30], 'sb', 3) + circ(30, 110, 6, 'fo') + circ(190, 30, 6, 'fb');
      b += text(70, 124, '1', 'tx', 12) + text(150, 124, '1', 'tx', 12) + text(18, 70, '1', 'tx', 12);
      b += text(110, 16, 'two faces unfolded: 2 × 1', 'tx', 11) + text(140, 64, '√5', 'tb', 14);
      return svg('0 0 220 136', b, 300);
    },

    stick() {
      const o = [30, 190], s = 160;
      const P = (a, c) => [o[0] + a * s, o[1] - c * s];
      let b = `<polygon points="${[P(0, 0), P(1, 0), P(0, 1)].map(p => p.join(',')).join(' ')}" class="fs sl"/>`;
      b += `<polygon points="${[P(.5, 0), P(.5, .5), P(0, .5)].map(p => p.join(',')).join(' ')}" class="fo sl"/>`;
      b += text(110, 205, 'piece a →', 'tx', 11) + `<text x="14" y="110" class="tx" font-size="11" text-anchor="middle" transform="rotate(-90 14 110)">piece b →</text>`;
      b += text(140, 50, 'green = all pieces < ½', 'tx', 11) + text(140, 66, 'area = ¼ of the triangle', 'tx', 11);
      return svg('0 20 240 200', b, 280);
    },

    bulbs100() {
      let b = '';
      for (let n = 1; n <= 100; n++) {
        const r = Math.floor((n - 1) / 10), c = (n - 1) % 10, on = Number.isInteger(Math.sqrt(n));
        b += circ(16 + c * 30, 16 + r * 30, 12, on ? 'fw sl' : 'fs sl');
        if (on) b += text(16 + c * 30, 16 + r * 30, n, 'tl', 9);
      }
      return svg('0 0 300 300', b, 320);
    },

    pascal(n) {
      let h = '<table class="tbl grid">';
      const g = [];
      for (let r = 0; r < n; r++) {
        g[r] = [];
        h += '<tr>';
        for (let c = 0; c < n; c++) {
          g[r][c] = r === 0 || c === 0 ? 1 : g[r - 1][c] + g[r][c - 1];
          h += `<td class="${r === n - 1 && c === n - 1 ? 'hl' : ''}">${g[r][c]}</td>`;
        }
        h += '</tr>';
      }
      return h + '</table>';
    },

    timeline
  };
})();
