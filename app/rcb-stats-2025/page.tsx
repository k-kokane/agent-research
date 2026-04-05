"use client"

import data from "./data.json"
import { Card } from "@/components/tremor/Card"
import { Badge } from "@/components/tremor/Badge"
import { BarChart } from "@/components/tremor/BarChart"
import { BarList } from "@/components/tremor/BarList"
import { DonutChart } from "@/components/tremor/DonutChart"

// ── KPI Card ──────────────────────────────────────────────────────────────────
function KpiCard({
  title,
  value,
  subtitle,
  badge,
  badgeVariant = "default",
}: {
  title: string
  value: string | number
  subtitle?: string
  badge?: string
  badgeVariant?: "default" | "success" | "error" | "warning" | "neutral"
}) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
      </div>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      {subtitle && (
        <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
      )}
    </Card>
  )
}

// ── Section Header ─────────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  )
}

// ── Match Result Row ───────────────────────────────────────────────────────────
function MatchRow({
  match,
}: {
  match: (typeof data.matches)[0]
}) {
  const resultVariant =
    match.result === "W"
      ? "success"
      : match.result === "L"
        ? "error"
        : "neutral"

  const resultLabel =
    match.result === "W" ? "WIN" : match.result === "L" ? "LOSS" : "N/R"

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-gray-400 w-8">{match.label}</span>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">vs {match.opponent}</span>
            <Badge variant="neutral" className="text-[10px] py-0">
              {match.homeAway}
            </Badge>
            {match.phase !== "League" && (
              <Badge variant="default" className="text-[10px] py-0">
                {match.phase}
              </Badge>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{match.venue} · {match.date}</p>
        </div>
      </div>
      <div className="text-right flex items-center gap-3">
        <div className="hidden sm:block">
          <p className="text-xs text-gray-500">{match.rcbScore} vs {match.oppScore}</p>
          {match.margin !== "—" && (
            <p className="text-xs text-gray-400">{match.margin}</p>
          )}
        </div>
        <Badge variant={resultVariant}>{resultLabel}</Badge>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function RCBStatsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-4xl">🏆</span>
                <Badge
                  variant="warning"
                  className="text-sm font-bold uppercase tracking-wide"
                >
                  IPL 2025 Champions
                </Badge>
              </div>
              <h1 className="text-3xl font-bold">
                Royal Challengers Bengaluru
              </h1>
              <p className="text-red-200 mt-1 text-sm">
                IPL 2025 Season Research · First title in franchise history after 18 years
              </p>
            </div>
            <div className="text-right">
              <p className="text-red-200 text-xs uppercase tracking-wider font-medium">Final Result</p>
              <p className="text-2xl font-bold">Won by 6 runs</p>
              <p className="text-red-200 text-sm">vs PBKS · Jun 3, 2025 · Ahmedabad</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">

        {/* KPI Cards */}
        <section>
          <SectionHeader title="Season at a Glance" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KpiCard
              title="Total Matches"
              value={data.overview.totalMatches}
              subtitle="League + Playoffs"
            />
            <KpiCard
              title="Wins"
              value={data.overview.wins}
              subtitle="9 league · 2 playoffs"
              badge="+2 in playoffs"
              badgeVariant="success"
            />
            <KpiCard
              title="Losses"
              value={data.overview.losses}
              subtitle="All in league stage"
              badge="4 losses"
              badgeVariant="error"
            />
            <KpiCard
              title="Win Rate"
              value={`${data.overview.winRate}%`}
              subtitle="11 wins from 15 completed"
              badge="73.3%"
              badgeVariant="success"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <KpiCard
              title="League Points"
              value={data.overview.leaguePoints}
              subtitle={`Finished 2nd · NRR ${data.overview.nrr}`}
            />
            <KpiCard
              title="League Position"
              value={`#${data.overview.leaguePosition}`}
              subtitle="9W · 4L · 1NR in league stage"
            />
            <KpiCard
              title="Away Record"
              value="7 / 7"
              subtitle="Won every away match played"
              badge="IPL Record"
              badgeVariant="default"
            />
            <KpiCard
              title="Title Number"
              value={`#${data.meta.titleNumber}`}
              subtitle="First IPL title in 18 years"
              badge="Historic"
              badgeVariant="warning"
            />
          </div>
        </section>

        {/* Results Breakdown + Home vs Away */}
        <section>
          <SectionHeader
            title="Results Overview"
            subtitle="Overall season results breakdown and home vs away performance"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Donut Chart */}
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Season Results Breakdown
              </h3>
              <div className="flex items-center gap-8">
                <DonutChart
                  data={data.resultsBreakdown}
                  category="result"
                  value="value"
                  colors={["emerald", "pink", "gray"]}
                  showLabel
                  label={`${data.overview.wins}W`}
                  className="h-44 w-44 shrink-0"
                />
                <div className="space-y-3">
                  {data.resultsBreakdown.map((item) => (
                    <div key={item.result} className="flex items-center gap-3">
                      <span
                        className={
                          item.result === "Wins"
                            ? "inline-block w-3 h-3 rounded-full bg-emerald-500"
                            : item.result === "Losses"
                              ? "inline-block w-3 h-3 rounded-full bg-pink-500"
                              : "inline-block w-3 h-3 rounded-full bg-gray-500"
                        }
                      />
                      <span className="text-sm text-gray-700">{item.result}</span>
                      <span className="ml-auto text-sm font-semibold text-gray-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Includes all 14 league matches + 2 playoff matches
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Home vs Away Bar Chart */}
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Home vs Away Performance
              </h3>
              <BarChart
                data={data.homeAwayChart}
                index="category"
                categories={["Wins", "Losses", "No Result"]}
                colors={["emerald", "pink", "gray"]}
                valueFormatter={(v) => `${v}`}
                showLegend
                showGridLines={false}
                yAxisWidth={30}
                className="h-48"
                type="stacked"
              />
              <div className="mt-3 flex gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  Away: 7/7 wins (IPL record)
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-pink-500" />
                  Home: 2W 4L 1NR
                </span>
              </div>
            </Card>
          </div>
        </section>

        {/* Venue Performance */}
        <section>
          <SectionHeader
            title="Venue Performance"
            subtitle="Wins and losses broken down by ground"
          />
          <Card>
            <BarChart
              data={data.venueChart}
              index="venue"
              categories={["Wins", "Losses"]}
              colors={["emerald", "pink"]}
              valueFormatter={(v) => `${v}`}
              showLegend
              yAxisWidth={30}
              className="h-64"
              type="stacked"
              layout="horizontal"
            />
          </Card>
        </section>

        {/* Match Timeline */}
        <section>
          <SectionHeader
            title="Match-by-Match Results"
            subtitle="Full season results — league stage and playoffs (* playoff matches excluded from M10 NR)"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Win / Loss per Match
              </h3>
              <BarChart
                data={data.matchResultsChart}
                index="match"
                categories={["Wins", "Losses"]}
                colors={["emerald", "pink"]}
                valueFormatter={(v) => `${v}`}
                showLegend={false}
                showYAxis={false}
                showGridLines={false}
                className="h-40"
                type="stacked"
                maxValue={1}
              />
              <p className="text-xs text-gray-400 mt-2">
                * Q1 = Qualifier 1 · FIN = Final · M10 (NR) excluded
              </p>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Win Sequence</h3>
              <div className="flex flex-wrap gap-1.5">
                {data.matches.map((m) => (
                  <div
                    key={m.label}
                    title={`${m.label}: vs ${m.opponent} (${m.homeAway}) — ${m.result === "W" ? "WIN" : m.result === "L" ? "LOSS" : "NR"}`}
                    className={[
                      "h-8 w-8 rounded flex items-center justify-center text-[10px] font-bold cursor-default",
                      m.result === "W"
                        ? "bg-emerald-100 text-emerald-700"
                        : m.result === "L"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-500",
                    ].join(" ")}
                  >
                    {m.result === "NR" ? "NR" : m.result}
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded bg-emerald-100 text-emerald-700 text-[8px] flex items-center justify-center font-bold">W</span>
                  Win
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded bg-red-100"></span>
                  Loss
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded bg-gray-100"></span>
                  No Result
                </span>
              </div>
            </Card>
          </div>
        </section>

        {/* Match Results Table */}
        <section>
          <SectionHeader title="All Match Results" />
          <Card>
            {data.matches.map((match) => (
              <MatchRow key={match.no} match={match} />
            ))}
          </Card>
        </section>

        {/* Player Stats */}
        <section>
          <SectionHeader
            title="Player Highlights"
            subtitle="Key batting and bowling statistics for IPL 2025"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Batting */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Top Run Scorers
                </h3>
                <Badge variant="neutral">Runs</Badge>
              </div>
              <BarList
                data={data.battingBarList}
                valueFormatter={(v) => `${v} runs`}
                sortOrder="descending"
              />
              <div className="mt-4 space-y-2 pt-4 border-t border-gray-100">
                {data.batting.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between text-xs text-gray-500"
                  >
                    <span className="font-medium text-gray-700 w-36 truncate">{p.name}</span>
                    <span>Avg {p.average}</span>
                    <span>SR {p.strikeRate}</span>
                    <span>{p.fifties} fifties</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Bowling */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Top Wicket Takers
                </h3>
                <Badge variant="neutral">Wickets</Badge>
              </div>
              <BarList
                data={data.bowlingBarList}
                valueFormatter={(v) => `${v} wkts`}
                sortOrder="descending"
              />
              <div className="mt-4 space-y-2 pt-4 border-t border-gray-100">
                {data.bowling.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between text-xs text-gray-500"
                  >
                    <span className="font-medium text-gray-700 w-36 truncate">{p.name}</span>
                    <span>Avg {p.average}</span>
                    <span>Econ {p.economy}</span>
                    <span>Best {p.bestFigures}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Records */}
        <section>
          <SectionHeader
            title="Notable Records & Milestones"
            subtitle="Historic achievements from RCB's 2025 title-winning season"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.records.map((record) => (
              <Card key={record.title} className="p-5">
                <div className="flex items-start gap-2 mb-2">
                  <Badge variant="success">Record</Badge>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {record.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {record.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-6 pb-10">
          <p className="text-xs text-gray-400 text-center">
            Research compiled from ESPN Cricinfo, Wikipedia, and IPLT20.com · IPL 2025 Season ·{" "}
            Some match scores are reconstructed from available reports; exact scorecards should be verified on official sources.
          </p>
        </footer>
      </div>
    </main>
  )
}
