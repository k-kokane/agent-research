"use client"

import {
  Card,
  Title,
  Text,
  Metric,
  Badge,
  BarChart,
  DonutChart,
  BarList,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Divider,
} from "@tremor/react"
import data from "./data.json"

// ── KPI card (no colors — tremor defaults) ────────────────────────────────────
function KpiCard({
  title,
  value,
  sub,
}: {
  title: string
  value: string | number
  sub: string
}) {
  return (
    <Card>
      <Text>{title}</Text>
      <Metric className="mt-1">{value}</Metric>
      <Text className="mt-1">{sub}</Text>
    </Card>
  )
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <Title className="mb-4">{title}</Title>
      {children}
    </section>
  )
}

// ── Result badge ──────────────────────────────────────────────────────────────
const resultColor = (r: string) =>
  r === "W" ? "emerald" : r === "L" ? "red" : "gray"

const resultLabel = (r: string) =>
  r === "W" ? "Win" : r === "L" ? "Loss" : "N/R"

// ── Page ──────────────────────────────────────────────────────────────────────
export default function RCBStatsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">

      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge color="emerald" size="lg">IPL 2025 Champions</Badge>
          <Badge color="blue">First title · 18 years in the making</Badge>
        </div>
        <h1 className="text-2xl font-bold text-tremor-content-strong">
          Royal Challengers Bengaluru — IPL 2025
        </h1>
        <Text className="mt-1">
          Season research: match results, venue stats, batting &amp; bowling analysis.
          Won the IPL 2025 final vs Punjab Kings by 6 runs on June 3, 2025.
        </Text>
      </div>

      <Divider />

      {/* KPI Cards */}
      <Section title="Season at a Glance">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <KpiCard title="Matches Played" value={data.overview.totalMatches} sub="League + Playoffs" />
          <KpiCard title="Wins" value={data.overview.wins} sub="9 league · 2 playoffs" />
          <KpiCard title="Losses" value={data.overview.losses} sub="All in league stage" />
          <KpiCard title="Win Rate" value={`${data.overview.winRate}%`} sub="11 of 15 completed" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <KpiCard title="League Points" value={data.overview.leaguePoints} sub={`2nd place · NRR ${data.overview.nrr}`} />
          <KpiCard title="League Position" value={`#${data.overview.leaguePosition}`} sub="9W · 4L · 1NR" />
          <KpiCard title="Away Record" value="7 / 7" sub="Won every away match (IPL record)" />
          <KpiCard title="Final Margin" value="6 runs" sub="RCB 190/9 vs PBKS 184/7" />
        </div>
      </Section>

      {/* Results overview */}
      <Section title="Results Overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Donut */}
          <Card>
            <Title>Season Results Breakdown</Title>
            <Text className="mb-4">All 16 matches including playoffs</Text>
            <DonutChart
              data={data.resultsBreakdown}
              category="value"
              index="result"
              colors={["emerald", "rose", "gray"]}
              className="h-44 mt-4"
              label={`${data.overview.wins} Wins`}
              showLabel
              showTooltip
            />
          </Card>

          {/* Home vs Away stacked bar */}
          <Card>
            <Title>Home vs Away</Title>
            <Text className="mb-4">
              First IPL team in history to win all 7 away league matches
            </Text>
            <BarChart
              data={data.homeAwayChart}
              index="category"
              categories={["Wins", "Losses", "No Result"]}
              colors={["emerald", "rose", "gray"]}
              stack
              className="h-40 mt-4"
              showLegend
              showYAxis={false}
              showGridLines={false}
            />
          </Card>
        </div>
      </Section>

      {/* Venue breakdown */}
      <Section title="Performance by Venue">
        <Card>
          <Title>Wins &amp; Losses at Each Ground</Title>
          <Text className="mb-4">Home ground: M. Chinnaswamy Stadium, Bengaluru</Text>
          <BarChart
            data={data.venueChart}
            index="venue"
            categories={["Wins", "Losses"]}
            colors={["emerald", "rose"]}
            stack
            className="h-64"
            showLegend
            showGridLines={false}
          />
        </Card>
      </Section>

      {/* Win sequence + match results chart */}
      <Section title="Match Timeline">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* W/L bar per match */}
          <Card>
            <Title>Win / Loss per Match</Title>
            <Text className="mb-4">League stage · excludes abandoned M10</Text>
            <BarChart
              data={data.matchResultsChart}
              index="match"
              categories={["Wins", "Losses"]}
              colors={["emerald", "rose"]}
              stack
              showLegend={false}
              showYAxis={false}
              showGridLines={false}
              className="h-36"
            />
          </Card>

          {/* Win sequence tiles */}
          <Card>
            <Title>Win Sequence</Title>
            <Text className="mb-4">Hover tiles for opponent details</Text>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {data.matches.map((m) => (
                <div
                  key={m.label}
                  title={`${m.label}: vs ${m.opponent} (${m.homeAway}) — ${resultLabel(m.result)}`}
                  className={[
                    "h-8 w-8 rounded text-xs font-semibold flex items-center justify-center cursor-default select-none",
                    m.result === "W"
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                      : m.result === "L"
                        ? "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
                        : "bg-gray-100 text-gray-500 ring-1 ring-gray-200",
                  ].join(" ")}
                >
                  {m.result === "NR" ? "NR" : m.result}
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-3">
              <Text>
                <span className="inline-block w-3 h-3 rounded bg-emerald-50 ring-1 ring-emerald-200 mr-1" />
                Win
              </Text>
              <Text>
                <span className="inline-block w-3 h-3 rounded bg-rose-50 ring-1 ring-rose-200 mr-1" />
                Loss
              </Text>
              <Text>
                <span className="inline-block w-3 h-3 rounded bg-gray-100 ring-1 ring-gray-200 mr-1" />
                N/R
              </Text>
            </div>
          </Card>
        </div>
      </Section>

      {/* All match results table */}
      <Section title="All Match Results">
        <Card>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>#</TableHeaderCell>
                <TableHeaderCell>Phase</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Opponent</TableHeaderCell>
                <TableHeaderCell>H/A</TableHeaderCell>
                <TableHeaderCell>Venue</TableHeaderCell>
                <TableHeaderCell>RCB Score</TableHeaderCell>
                <TableHeaderCell>Opp Score</TableHeaderCell>
                <TableHeaderCell>Margin</TableHeaderCell>
                <TableHeaderCell>Result</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.matches.map((m) => (
                <TableRow key={m.no}>
                  <TableCell>{m.label}</TableCell>
                  <TableCell>{m.phase}</TableCell>
                  <TableCell>{m.date}</TableCell>
                  <TableCell className="font-medium text-tremor-content-strong">
                    vs {m.opponent}
                  </TableCell>
                  <TableCell>{m.homeAway}</TableCell>
                  <TableCell>{m.venue}</TableCell>
                  <TableCell>{m.rcbScore}</TableCell>
                  <TableCell>{m.oppScore}</TableCell>
                  <TableCell>{m.margin}</TableCell>
                  <TableCell>
                    <Badge color={resultColor(m.result)}>
                      {resultLabel(m.result)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Section>

      {/* Player stats */}
      <Section title="Player Highlights">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Batting */}
          <Card>
            <Title>Top Run Scorers</Title>
            <Text className="mb-4">IPL 2025 — all matches played for RCB</Text>
            <BarList
              data={data.battingBarList}
              valueFormatter={(v: number) => `${v} runs`}
              className="mt-2"
            />
            <Divider />
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Player</TableHeaderCell>
                  <TableHeaderCell>Runs</TableHeaderCell>
                  <TableHeaderCell>Avg</TableHeaderCell>
                  <TableHeaderCell>SR</TableHeaderCell>
                  <TableHeaderCell>50s</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.batting.map((p) => (
                  <TableRow key={p.name}>
                    <TableCell className="font-medium text-tremor-content-strong">
                      {p.name}
                    </TableCell>
                    <TableCell>{p.runs}</TableCell>
                    <TableCell>{p.average}</TableCell>
                    <TableCell>{p.strikeRate}</TableCell>
                    <TableCell>{p.fifties}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Bowling */}
          <Card>
            <Title>Top Wicket Takers</Title>
            <Text className="mb-4">IPL 2025 — all matches played for RCB</Text>
            <BarList
              data={data.bowlingBarList}
              valueFormatter={(v: number) => `${v} wkts`}
              className="mt-2"
            />
            <Divider />
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Player</TableHeaderCell>
                  <TableHeaderCell>Wkts</TableHeaderCell>
                  <TableHeaderCell>Avg</TableHeaderCell>
                  <TableHeaderCell>Econ</TableHeaderCell>
                  <TableHeaderCell>Best</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.bowling.map((p) => (
                  <TableRow key={p.name}>
                    <TableCell className="font-medium text-tremor-content-strong">
                      {p.name}
                    </TableCell>
                    <TableCell>{p.wickets}</TableCell>
                    <TableCell>{p.average}</TableCell>
                    <TableCell>{p.economy}</TableCell>
                    <TableCell>{p.bestFigures}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </Section>

      {/* Records */}
      <Section title="Notable Records &amp; Milestones">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.records.map((r) => (
            <Card key={r.title}>
              <Badge color="emerald" className="mb-2">Record</Badge>
              <Title className="mt-2">{r.title}</Title>
              <Text className="mt-1">{r.description}</Text>
            </Card>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <Divider />
      <Text className="text-center pb-6">
        Data sourced from ESPN Cricinfo, Wikipedia, IPLT20.com · IPL 2025 ·
        Some match scores are reconstructed from available reports.
      </Text>
    </main>
  )
}
