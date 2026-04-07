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

// ── KPI card ──────────────────────────────────────────────────────────────────
function KpiCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <Text>{title}</Text>
      <Metric className="mt-2">{value}</Metric>
    </Card>
  )
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <Title className="mb-3 sm:mb-4">{title}</Title>
      {children}
    </section>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const resultLabel = (r: string) =>
  r === "W" ? "Win" : r === "L" ? "Loss" : "N/R"

// ── Page ──────────────────────────────────────────────────────────────────────
export default function RCBStatsPage() {
  return (
    <main className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-10 space-y-8 sm:space-y-10">

      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge color="blue" size="lg">IPL 2025 Champions</Badge>
          <Badge color="blue">First title · 18 years in the making</Badge>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-tremor-content-strong">
          Royal Challengers Bengaluru — IPL 2025
        </h1>
        <Text className="mt-1 text-sm sm:text-base">
          Season research: match results, venue stats, batting &amp; bowling analysis.
          Won the IPL 2025 final vs Punjab Kings by 6 runs on June 3, 2025.
        </Text>
      </div>

      <Divider />

      {/* KPI Cards — 2 cols on mobile, 4 on desktop */}
      <Section title="Season at a Glance">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Matches Played" value={data.overview.totalMatches} />
          <KpiCard title="Wins" value={data.overview.wins} />
          <KpiCard title="Losses" value={data.overview.losses} />
          <KpiCard title="Win Rate" value={`${data.overview.winRate}%`} />
          <KpiCard title="League Points" value={data.overview.leaguePoints} />
          <KpiCard title="League Position" value={`#${data.overview.leaguePosition}`} />
          <KpiCard title="Away Record" value="7 / 7" />
          <KpiCard title="Final Margin" value="6 runs" />
        </div>
      </Section>

      {/* Results overview */}
      <Section title="Results Overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <Title>Season Results Breakdown</Title>
            <Text className="text-sm">All 16 matches including playoffs</Text>
            <DonutChart
              data={data.resultsBreakdown}
              category="value"
              index="result"
              className="h-40 sm:h-44 mt-4"
              label={`${data.overview.wins} Wins`}
              showLabel
              showTooltip
            />
          </Card>

          <Card>
            <Title>Home vs Away</Title>
            <Text className="text-sm">
              First IPL team to win all 7 away league matches
            </Text>
            <BarChart
              data={data.homeAwayChart}
              index="category"
              categories={["Wins", "Losses", "No Result"]}
              stack
              className="h-36 sm:h-40 mt-4"
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
          <Text className="text-sm">Home ground: M. Chinnaswamy Stadium, Bengaluru</Text>
          <BarChart
            data={data.venueChart}
            index="venue"
            categories={["Wins", "Losses"]}
            stack
            className="h-56 sm:h-64"
            showLegend
            showGridLines={false}
            yAxisWidth={40}
          />
        </Card>
      </Section>

      {/* Match Timeline */}
      <Section title="Match Timeline">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <Title>Win / Loss per Match</Title>
            <Text className="text-sm">League stage · excludes abandoned M10</Text>
            <BarChart
              data={data.matchResultsChart}
              index="match"
              categories={["Wins", "Losses"]}
              stack
              showLegend={false}
              showYAxis={false}
              showGridLines={false}
              className="h-32 sm:h-36 mt-2"
            />
          </Card>

          <Card>
            <Title>Win Sequence</Title>
            <Text className="text-sm mb-3">League + playoffs results</Text>
            <div className="flex flex-wrap gap-1.5">
              {data.matches.map((m) => (
                <div
                  key={m.label}
                  title={`${m.label}: vs ${m.opponent} (${m.homeAway}) — ${resultLabel(m.result)}`}
                  className={[
                    "h-8 w-8 rounded text-xs font-semibold flex items-center justify-center cursor-default select-none",
                    m.result === "W"
                      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                      : m.result === "L"
                        ? "bg-slate-100 text-slate-500 ring-1 ring-slate-200"
                        : "bg-gray-100 text-gray-400 ring-1 ring-gray-200",
                  ].join(" ")}
                >
                  {m.result === "NR" ? "NR" : m.result}
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-3">
              <Text className="text-xs flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded bg-blue-50 ring-1 ring-blue-200" />
                Win
              </Text>
              <Text className="text-xs flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded bg-slate-100 ring-1 ring-slate-200" />
                Loss
              </Text>
              <Text className="text-xs flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded bg-gray-100 ring-1 ring-gray-200" />
                N/R
              </Text>
            </div>
          </Card>
        </div>
      </Section>

      {/* All match results — horizontally scrollable on mobile */}
      <Section title="All Match Results">
        <Card className="p-0 sm:p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell className="pl-4">#</TableHeaderCell>
                  <TableHeaderCell>Phase</TableHeaderCell>
                  <TableHeaderCell>Date</TableHeaderCell>
                  <TableHeaderCell>Opponent</TableHeaderCell>
                  <TableHeaderCell>H/A</TableHeaderCell>
                  <TableHeaderCell>Venue</TableHeaderCell>
                  <TableHeaderCell>RCB</TableHeaderCell>
                  <TableHeaderCell>Opp</TableHeaderCell>
                  <TableHeaderCell>Margin</TableHeaderCell>
                  <TableHeaderCell>Result</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.matches.map((m) => (
                  <TableRow key={m.no}>
                    <TableCell className="pl-4 font-mono text-xs">{m.label}</TableCell>
                    <TableCell className="text-xs">{m.phase}</TableCell>
                    <TableCell className="text-xs whitespace-nowrap">{m.date}</TableCell>
                    <TableCell className="font-medium text-tremor-content-strong whitespace-nowrap">
                      vs {m.opponent}
                    </TableCell>
                    <TableCell className="text-xs">{m.homeAway}</TableCell>
                    <TableCell className="text-xs max-w-[180px] truncate">{m.venue}</TableCell>
                    <TableCell className="text-xs whitespace-nowrap">{m.rcbScore}</TableCell>
                    <TableCell className="text-xs whitespace-nowrap">{m.oppScore}</TableCell>
                    <TableCell className="text-xs whitespace-nowrap">{m.margin}</TableCell>
                    <TableCell>
                      <Badge color={m.result === "W" ? "blue" : "gray"} size="xs">
                        {resultLabel(m.result)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </Section>

      {/* Player stats */}
      <Section title="Player Highlights">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <Title>Top Run Scorers</Title>
            <Text className="text-sm mb-3">IPL 2025 — all RCB matches</Text>
            <BarList
              data={data.battingBarList}
              valueFormatter={(v: number) => `${v} runs`}
            />
            <Divider />
            <div className="overflow-x-auto">
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
                      <TableCell className="font-medium text-tremor-content-strong whitespace-nowrap">
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
            </div>
          </Card>

          <Card>
            <Title>Top Wicket Takers</Title>
            <Text className="text-sm mb-3">IPL 2025 — all RCB matches</Text>
            <BarList
              data={data.bowlingBarList}
              valueFormatter={(v: number) => `${v} wkts`}
            />
            <Divider />
            <div className="overflow-x-auto">
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
                      <TableCell className="font-medium text-tremor-content-strong whitespace-nowrap">
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
            </div>
          </Card>
        </div>
      </Section>

      {/* Records */}
      <Section title="Notable Records &amp; Milestones">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {data.records.map((r) => (
            <Card key={r.title}>
              <Badge>Record</Badge>
              <Title className="mt-2 text-sm sm:text-base">{r.title}</Title>
              <Text className="mt-1 text-xs sm:text-sm">{r.description}</Text>
            </Card>
          ))}
        </div>
      </Section>

      <Divider />
      <Text className="text-center pb-4 sm:pb-6 text-xs sm:text-sm">
        Data sourced from ESPN Cricinfo, Wikipedia, IPLT20.com · IPL 2025 ·
        Some match scores are reconstructed from available reports.
      </Text>
    </main>
  )
}
