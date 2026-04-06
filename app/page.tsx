import Link from "next/link"
import { Card, Badge, Title, Text, Divider } from "@tremor/react"
import data from "./data.json"

const triggerColor = (trigger: string) =>
  trigger === "manual" ? "blue" : "violet"

const triggerLabel = (trigger: string) =>
  trigger === "manual" ? "Manual" : "Automated"

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 sm:py-10">
      {/* Page header */}
      <div className="mb-6 sm:mb-8">
        <Title className="text-xl sm:text-2xl">Research Hub</Title>
        <Text className="mt-1">
          Agent-driven research reports — each topic is autonomously
          investigated and published as an interactive page.
        </Text>
      </div>

      <Divider />

      {/* Research list */}
      <div className="mt-6 sm:mt-8 space-y-4">
        {data.researches.map((r) => (
          <Card key={r.id} className="p-4 sm:p-6">
            {/* Tags + trigger row */}
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              <Badge color={triggerColor(r.trigger)} size="xs">
                {triggerLabel(r.trigger)}
              </Badge>
              {r.tags.map((tag) => (
                <Badge key={tag} color="gray" size="xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title + date row */}
            <div className="flex items-start justify-between gap-3">
              <Title className="text-base sm:text-lg leading-snug">{r.title}</Title>
              <Text className="text-xs text-tremor-content-subtle shrink-0 pt-0.5">
                {new Date(r.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
            </div>

            {/* Description */}
            <Text className="mt-1.5 line-clamp-2 text-sm">{r.description}</Text>

            {/* Result + CTA row */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              {r.result && (
                <Text className="text-tremor-content-emphasis font-medium text-sm">
                  {r.result}
                </Text>
              )}
              <Link
                href={r.route}
                className="inline-flex items-center justify-center gap-1.5 rounded-tremor-default bg-tremor-brand px-4 py-2 text-sm font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis transition-colors w-full sm:w-auto"
              >
                Show Details →
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {data.researches.length === 0 && (
        <div className="mt-16 text-center">
          <Title>No research yet</Title>
          <Text className="mt-2">
            Research reports will appear here once an agent completes a task.
          </Text>
        </div>
      )}
    </main>
  )
}
