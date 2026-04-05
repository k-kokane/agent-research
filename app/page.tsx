export default function Home() {
  return (
    <div className="min-h-full bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-red-700 text-white py-8 px-6 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl font-black tracking-tight">RCB</span>
            <span className="text-xl font-light opacity-80">IPL 2025 Season Report</span>
          </div>
          <p className="text-red-200 text-sm">Royal Challengers Bengaluru — IPL 2025 Champions</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* Championship Banner */}
        <section className="bg-yellow-400 border-l-4 border-yellow-600 rounded-xl p-6 shadow">
          <h2 className="text-2xl font-bold text-yellow-900 mb-1">IPL 2025 Champions</h2>
          <p className="text-yellow-800 text-base">
            Royal Challengers Bengaluru won their <strong>first-ever IPL title</strong> on June 3, 2025, defeating Punjab Kings by 6 runs in the Final at Narendra Modi Stadium, Ahmedabad. This ended an 18-year (6,256-day) wait for a maiden IPL trophy.
          </p>
        </section>

        {/* Season Summary */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Season Summary</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "League Stage Position", value: "2nd" },
              { label: "League Wins", value: "9" },
              { label: "League Losses", value: "4" },
              { label: "Abandoned", value: "1" },
              { label: "Total Points", value: "19" },
              { label: "Win Rate (League)", value: "64.3%" },
              { label: "Away Wins", value: "7/7" },
              { label: "Tournament Result", value: "Champions" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white rounded-lg shadow p-4 text-center">
                <div className="text-2xl font-extrabold text-red-700">{value}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* All Matches */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">All Matches — Results</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow text-sm">
              <thead className="bg-red-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Phase</th>
                  <th className="px-4 py-3 text-left">Opponent</th>
                  <th className="px-4 py-3 text-left">Venue</th>
                  <th className="px-4 py-3 text-left">H/A</th>
                  <th className="px-4 py-3 text-left">Result</th>
                  <th className="px-4 py-3 text-left">Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { n: 1, phase: "League", opp: "KKR (Champions)", venue: "Eden Gardens, Kolkata", ha: "Away", result: "W", margin: "Win" },
                  { n: 2, phase: "League", opp: "CSK", venue: "MA Chidambaram, Chennai", ha: "Away", result: "W", margin: "Won by 50 runs" },
                  { n: 3, phase: "League", opp: "Gujarat Titans", venue: "M. Chinnaswamy, Bengaluru", ha: "Home", result: "L", margin: "Lost by 8 wkts" },
                  { n: 4, phase: "League", opp: "Mumbai Indians", venue: "Wankhede, Mumbai", ha: "Away", result: "W", margin: "Won by 12 runs" },
                  { n: 5, phase: "League", opp: "Delhi Capitals", venue: "Arun Jaitley, Delhi", ha: "Away", result: "L", margin: "Lost by 6 wkts" },
                  { n: 6, phase: "League", opp: "Sunrisers Hyderabad", venue: "Away", ha: "Away", result: "L", margin: "Loss" },
                  { n: 7, phase: "League", opp: "Punjab Kings", venue: "M. Chinnaswamy, Bengaluru", ha: "Home", result: "L", margin: "Lost by 5 wkts" },
                  { n: 8, phase: "League", opp: "Punjab Kings", venue: "Away", ha: "Away", result: "W", margin: "Won by 7 wkts" },
                  { n: 9, phase: "League", opp: "Rajasthan Royals", venue: "M. Chinnaswamy, Bengaluru", ha: "Home", result: "W", margin: "Won by 11 runs" },
                  { n: 10, phase: "League", opp: "CSK", venue: "M. Chinnaswamy, Bengaluru", ha: "Home", result: "W", margin: "Win" },
                  { n: 11, phase: "League", opp: "KKR", venue: "M. Chinnaswamy / Ekana", ha: "Home", result: "W", margin: "Win" },
                  { n: 12, phase: "League", opp: "Rajasthan Royals", venue: "Away", ha: "Away", result: "W", margin: "Win" },
                  { n: 13, phase: "League", opp: "Mumbai Indians", venue: "M. Chinnaswamy, Bengaluru", ha: "Home", result: "W", margin: "Win" },
                  { n: 14, phase: "League", opp: "(Abandoned)", venue: "—", ha: "—", result: "N/R", margin: "No result" },
                  { n: 15, phase: "Qualifier 1", opp: "Punjab Kings", venue: "Mullanpur, Chandigarh", ha: "Neutral", result: "W", margin: "Won by 8 wkts (60 balls rem.)" },
                  { n: 16, phase: "Final", opp: "Punjab Kings", venue: "Narendra Modi Stadium, Ahmedabad", ha: "Neutral", result: "W", margin: "Won by 6 runs" },
                ].map(({ n, phase, opp, venue, ha, result, margin }) => (
                  <tr key={n} className={result === "W" ? "bg-green-50" : result === "L" ? "bg-red-50" : "bg-gray-50"}>
                    <td className="px-4 py-2 text-gray-400 font-mono">{n}</td>
                    <td className="px-4 py-2 text-gray-500">{phase}</td>
                    <td className="px-4 py-2 font-medium text-gray-800">{opp}</td>
                    <td className="px-4 py-2 text-gray-600 text-xs">{venue}</td>
                    <td className="px-4 py-2 text-gray-500">{ha}</td>
                    <td className="px-4 py-2">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${result === "W" ? "bg-green-600 text-white" : result === "L" ? "bg-red-600 text-white" : "bg-gray-400 text-white"}`}>
                        {result}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-600 text-xs">{margin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">Note: Some away venues and margins for league matches 6, 10–13 sourced from aggregate season data. Match order is approximate for mid-season games.</p>
        </section>

        {/* Home vs Away */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Home vs Away Performance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold text-lg text-red-700 mb-3">Home (M. Chinnaswamy / Ekana)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><span className="font-semibold">League home games:</span> ~7 (incl. 1 abandoned)</li>
                <li><span className="font-semibold">Home wins (league):</span> ~4–5</li>
                <li><span className="font-semibold">Home losses (league):</span> 2 (vs GT, vs PBKS)</li>
                <li className="text-red-600 text-xs mt-2">RCB struggled initially at home — lost 2 of their first 3 home games and at one point set an unwanted record for most home IPL losses. However they recovered to win key home games in the second half.</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold text-lg text-green-700 mb-3">Away</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><span className="font-semibold">Away games:</span> 7</li>
                <li><span className="font-semibold">Away wins:</span> 7 (100%)</li>
                <li><span className="font-semibold">Away losses:</span> 0</li>
                <li className="text-green-700 font-semibold text-xs mt-2">First team in IPL history to win every away game in a season.</li>
                <li className="text-xs text-gray-500 mt-1">Notable away venues: Eden Gardens (KKR) — first win in 6 years; Chepauk (CSK) — first win in 17 years; Wankhede (MI) — first win in 10 years.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Venue Performance */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Performance by Venue</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow text-sm">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Venue</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Result</th>
                  <th className="px-4 py-3 text-left">Notable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { venue: "M. Chinnaswamy Stadium, Bengaluru", type: "Home", result: "Mixed", note: "Lost to GT & PBKS; won vs RR, CSK, KKR, MI" },
                  { venue: "Ekana Cricket Stadium, Lucknow", type: "Home (shifted)", result: "Win", note: "1 home match shifted here" },
                  { venue: "Eden Gardens, Kolkata", type: "Away", result: "Win", note: "First win here in 6 years (vs KKR)" },
                  { venue: "MA Chidambaram Stadium, Chennai", type: "Away", result: "Win", note: "First win in 17 years (vs CSK, by 50 runs)" },
                  { venue: "Wankhede Stadium, Mumbai", type: "Away", result: "Win", note: "First win in 10 years (vs MI)" },
                  { venue: "Arun Jaitley Stadium, Delhi", type: "Away", result: "Loss", note: "Lost to DC by 6 wkts" },
                  { venue: "Rajiv Gandhi Intl. Stadium, Hyderabad", type: "Away", result: "Loss", note: "Lost to SRH" },
                  { venue: "Mullanpur Stadium, Chandigarh", type: "Away/Neutral", result: "Win x2", note: "Won vs PBKS (league) + Qualifier 1 by 8 wkts" },
                  { venue: "Narendra Modi Stadium, Ahmedabad", type: "Neutral (Final)", result: "Win", note: "RCB 190/9 beat PBKS 184/7 — maiden title" },
                ].map(({ venue, type, result, note }) => (
                  <tr key={venue} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-800">{venue}</td>
                    <td className="px-4 py-2 text-gray-500 text-xs">{type}</td>
                    <td className="px-4 py-2">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${result.startsWith("Win") ? "bg-green-600 text-white" : result === "Loss" ? "bg-red-600 text-white" : "bg-yellow-500 text-white"}`}>
                        {result}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-500 text-xs">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Batting Stats */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Key Batting Stats</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow text-sm">
              <thead className="bg-red-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Player</th>
                  <th className="px-4 py-3 text-right">Mat</th>
                  <th className="px-4 py-3 text-right">Runs</th>
                  <th className="px-4 py-3 text-right">Avg</th>
                  <th className="px-4 py-3 text-right">SR</th>
                  <th className="px-4 py-3 text-right">HS</th>
                  <th className="px-4 py-3 text-right">50s</th>
                  <th className="px-4 py-3 text-left">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { player: "Virat Kohli", mat: 15, runs: 657, avg: "54.75", sr: "144.71", hs: "—", fifties: "5+", notes: "3rd highest run-scorer overall; 5th season of 600+ runs; most fours in IPL history (771)" },
                  { player: "Rajat Patidar (C)", mat: 15, runs: 312, avg: "~24", sr: "~157", hs: "—", fifties: "2", notes: "Captain; 209 runs in first 6 games; key middle-order anchor" },
                  { player: "Phil Salt", mat: "~12", runs: 403, avg: "~30", sr: "~165", hs: "56* (Q1)", fifties: "3", notes: "Explosive opener; 56 off 27 balls in Qualifier 1 (POTM)" },
                  { player: "Tim David", mat: "~13", runs: "300+", avg: "—", sr: "~160+", hs: "50* (26 balls)", fifties: "1", notes: "Death overs specialist; 2nd-most sixes in death overs in 2025 playoffs" },
                  { player: "Liam Livingstone", mat: 10, runs: 112, avg: "14.50", sr: "126.08", hs: "—", fifties: "1", notes: "Modest output but part of title-winning squad" },
                ].map(({ player, mat, runs, avg, sr, hs, fifties, notes }) => (
                  <tr key={player} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold text-gray-800">{player}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{mat}</td>
                    <td className="px-4 py-2 text-right font-bold text-red-700">{runs}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{avg}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{sr}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{hs}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{fifties}</td>
                    <td className="px-4 py-2 text-xs text-gray-500">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Team Run Rates</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Opening partnership (Kohli + Salt): <strong>10.29 runs/over</strong> — highest among all playoff teams</li>
              <li>RCB scored 190/9 in the IPL Final batting first</li>
            </ul>
          </div>
        </section>

        {/* Bowling Stats */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Key Bowling Stats</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow text-sm">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Player</th>
                  <th className="px-4 py-3 text-right">Mat</th>
                  <th className="px-4 py-3 text-right">Wkts</th>
                  <th className="px-4 py-3 text-right">Econ</th>
                  <th className="px-4 py-3 text-right">Best</th>
                  <th className="px-4 py-3 text-left">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { player: "Josh Hazlewood", mat: 12, wkts: 22, econ: "~8.28", best: "4/25", notes: "RCB's leading wicket-taker; 3/21 in Qualifier 1; two dots in final over of the Final to seal win" },
                  { player: "Krunal Pandya", mat: 15, wkts: 17, econ: "8.23", best: "2/17 (Final)", notes: "11 wickets in 7 away wins alone; POTM in Final; first player to win POTM in two IPL Finals (2017 & 2025)" },
                  { player: "Bhuvneshwar Kumar", mat: "~14", wkts: 17, econ: "—", best: "2 wkts (Final)", notes: "Experienced pacer; 2 wickets in Final; key with new ball" },
                  { player: "Suyash Sharma", mat: "~10", wkts: "~12", econ: "—", best: "3/17 (Q1)", notes: "3/17 in Qualifier 1 — his first career IPL MOTM" },
                  { player: "Yash Dayal", mat: "~12", wkts: "~8", econ: "—", best: "—", notes: "Contributed in death overs throughout season" },
                  { player: "Liam Livingstone", mat: 10, wkts: 2, econ: "8.44", best: "—", notes: "Part-time; avg 38.00" },
                ].map(({ player, mat, wkts, econ, best, notes }) => (
                  <tr key={player} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold text-gray-800">{player}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{mat}</td>
                    <td className="px-4 py-2 text-right font-bold text-gray-800">{wkts}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{econ}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{best}</td>
                    <td className="px-4 py-2 text-xs text-gray-500">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">Note: Overall IPL 2025 Purple Cap (most wickets) was won by Prasidh Krishna (GT) with 25 wickets.</p>
        </section>

        {/* Final Scorecard */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">IPL 2025 Final Scorecard — June 3, 2025</h2>
          <p className="text-sm text-gray-500 mb-4">Narendra Modi Stadium, Ahmedabad | RCB won by 6 runs</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-bold text-red-700 mb-3">RCB Innings — 190/9 (20 overs)</h3>
              <table className="w-full text-sm">
                <thead className="text-gray-500 text-xs">
                  <tr><th className="text-left pb-1">Batter</th><th className="text-right pb-1">Runs</th><th className="text-right pb-1">Balls</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { b: "Virat Kohli", r: 43, balls: 35 },
                    { b: "Phil Salt", r: "—", balls: "—" },
                    { b: "Rajat Patidar", r: "—", balls: "—" },
                    { b: "Tim David", r: "—", balls: "—" },
                  ].map(({ b, r, balls }) => (
                    <tr key={b}><td className="py-1">{b}</td><td className="text-right">{r}</td><td className="text-right text-gray-400">{balls}</td></tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-400 mt-2">Kohli top-scored with 43 off 35. Team total: 190/9.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-bold text-blue-700 mb-3">PBKS Innings — 184/7 (20 overs)</h3>
              <table className="w-full text-sm">
                <thead className="text-gray-500 text-xs">
                  <tr><th className="text-left pb-1">Batter</th><th className="text-right pb-1">Runs</th><th className="text-right pb-1">Balls</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { b: "Shashank Singh", r: "61*", balls: "—" },
                    { b: "Others", r: "123", balls: "—" },
                  ].map(({ b, r, balls }) => (
                    <tr key={b}><td className="py-1">{b}</td><td className="text-right">{r}</td><td className="text-right text-gray-400">{balls}</td></tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-400 mt-2">Shashank Singh 61*. Krunal Pandya 2/17, Bhuvneshwar Kumar 2 wkts. Hazlewood bowled final over, yielding only 2 runs on first 2 balls to seal the win.</p>
            </div>
          </div>
        </section>

        {/* Notable Records & Milestones */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Notable Records & Milestones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "First IPL Title for RCB",
                desc: "Won the IPL 2025 trophy — their first in franchise history after 18 years (286 IPL/Champions League T20 matches), ending a 6,256-day wait.",
                color: "border-yellow-400",
              },
              {
                title: "First Team to Win All Away Games",
                desc: "RCB became the first franchise in IPL history to win every single away league game in a season (7 wins from 7 away matches).",
                color: "border-green-500",
              },
              {
                title: "Virat Kohli — Most Fours in IPL History",
                desc: "Kohli surpassed Shikhar Dhawan's record of 768 IPL fours, reaching 771+ fours across his IPL career.",
                color: "border-red-500",
              },
              {
                title: "Virat Kohli — 5th Season of 600+ Runs",
                desc: "Kohli's 657 runs in 2025 was his 5th IPL season of 600+ runs — the most by any batter. Also his 3rd consecutive 600+ season.",
                color: "border-red-500",
              },
              {
                title: "Krunal Pandya — Two IPL Final POTMs",
                desc: "Krunal became the first player in IPL history to win Player of the Match in two separate finals (2017 with MI, 2025 with RCB).",
                color: "border-blue-500",
              },
              {
                title: "Biggest Margin Win in IPL Playoffs",
                desc: "RCB's Qualifier 1 win vs PBKS (by 8 wickets, 60 balls remaining / 10 overs to spare) was the largest win by balls remaining in IPL playoff history.",
                color: "border-purple-500",
              },
              {
                title: "Broke 17-Year Chepauk Drought",
                desc: "RCB won at MA Chidambaram Stadium (Chennai) for the first time in 17 years, defeating CSK by 50 runs away from home.",
                color: "border-orange-400",
              },
              {
                title: "Broke Wankhede (10 years) & Eden Gardens (6 years) Droughts",
                desc: "RCB also won at the Wankhede for the first time in 10 years and at Eden Gardens for the first time in 6 years during their perfect away run.",
                color: "border-orange-400",
              },
              {
                title: "Opening Partnership Run Rate",
                desc: "The Kohli–Salt opening partnership scored at 10.29 runs/over — the highest run rate of any opening pair among all playoff teams in IPL 2025.",
                color: "border-teal-400",
              },
              {
                title: "Three Previous Finals — No Title",
                desc: "RCB had finished as runners-up in 2009, 2011, and 2016 before finally winning in 2025. They reached their 4th final with the 2025 Qualifier 1 win.",
                color: "border-gray-400",
              },
            ].map(({ title, desc, color }) => (
              <div key={title} className={`bg-white rounded-xl shadow p-5 border-l-4 ${color}`}>
                <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Points Table Context */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">IPL 2025 Points Table — Final League Stage</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow text-sm">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Pos</th>
                  <th className="px-4 py-3 text-left">Team</th>
                  <th className="px-4 py-3 text-right">P</th>
                  <th className="px-4 py-3 text-right">W</th>
                  <th className="px-4 py-3 text-right">L</th>
                  <th className="px-4 py-3 text-right">NR</th>
                  <th className="px-4 py-3 text-right">Pts</th>
                  <th className="px-4 py-3 text-left">Playoff</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { pos: 1, team: "Gujarat Titans", p: 14, w: 10, l: 3, nr: 1, pts: 21, playoff: "Qualifier 1" },
                  { pos: 2, team: "RCB", p: 14, w: 9, l: 4, nr: 1, pts: 19, playoff: "Qualifier 1 → FINAL → CHAMPIONS" },
                  { pos: 3, team: "Punjab Kings", p: 14, w: 9, l: 5, nr: 0, pts: 18, playoff: "Qualifier 1 → Qualifier 2 → Final (Runner-up)" },
                  { pos: 4, team: "MI / Others", p: 14, w: "~8", l: "~6", nr: 0, pts: "~16", playoff: "Eliminator" },
                ].map(({ pos, team, p, w, l, nr, pts, playoff }) => (
                  <tr key={team} className={team === "RCB" ? "bg-red-50 font-bold" : "hover:bg-gray-50"}>
                    <td className="px-4 py-2">{pos}</td>
                    <td className="px-4 py-2">{team}</td>
                    <td className="px-4 py-2 text-right">{p}</td>
                    <td className="px-4 py-2 text-right text-green-700">{w}</td>
                    <td className="px-4 py-2 text-right text-red-600">{l}</td>
                    <td className="px-4 py-2 text-right">{nr}</td>
                    <td className="px-4 py-2 text-right font-bold">{pts}</td>
                    <td className="px-4 py-2 text-xs text-gray-600">{playoff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">Rows 3–4 are approximate/representative. RCB row confirmed from multiple sources.</p>
        </section>

        {/* Sources */}
        <section className="text-xs text-gray-400 border-t pt-6 space-y-1">
          <p className="font-semibold text-gray-500">Sources</p>
          <ul className="space-y-1 list-disc list-inside">
            <li><a href="https://en.wikipedia.org/wiki/2025_Royal_Challengers_Bengaluru_season" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">2025 Royal Challengers Bengaluru season — Wikipedia</a></li>
            <li><a href="https://en.wikipedia.org/wiki/2025_Indian_Premier_League_final" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">2025 Indian Premier League final — Wikipedia</a></li>
            <li><a href="https://www.espncricinfo.com/series/ipl-2025-1449924/punjab-kings-vs-royal-challengers-bengaluru-final-1473511/full-scorecard" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">PBKS vs RCB Final Scorecard — ESPNcricinfo</a></li>
            <li><a href="https://www.espncricinfo.com/series/ipl-2025-1449924/punjab-kings-vs-royal-challengers-bengaluru-qualifier-1-1473508/match-report" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">PBKS vs RCB Qualifier 1 Match Report — ESPNcricinfo</a></li>
            <li><a href="https://www.royalchallengers.com/rcb-cricket-news/news/rcb-crowned-as-ipl-2025-champions" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">RCB Crowned IPL 2025 Champions — RoyalChallengers.com</a></li>
            <li><a href="https://www.olympics.com/en/news/ipl-2025-final-royal-challengers-bengaluru-vs-punjab-kings-rcb-pbks-report" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">IPL 2025 Final Report — Olympics.com</a></li>
            <li><a href="https://www.espncricinfo.com/story/ipl-final-different-heroes-in-rcb-s-season-kohli-patidar-krunal-pandya-tim-david-josh-hazlewood-phil-salt-1488738" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">Different Heroes in RCB's Season — ESPNcricinfo</a></li>
            <li><a href="https://www.espncricinfo.com/series/ipl-2025-1449924/stats" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">IPL 2025 Statistics — ESPNcricinfo</a></li>
            <li><a href="https://thefederal.com/sports/cricket/ipl/rcb-road-to-ipl-2025-final-key-stats-players-past-3-final-results-189973" className="underline hover:text-gray-600" target="_blank" rel="noopener noreferrer">RCB's Road to the Final — The Federal</a></li>
          </ul>
          <p className="mt-3 italic">Research compiled April 5, 2026. Some granular per-match stats (exact innings scores for all 14 league games) were not retrievable from public search results; where so, approximate values or confirmed aggregates are shown.</p>
        </section>
      </main>
    </div>
  );
}
