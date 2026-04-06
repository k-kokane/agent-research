import Link from "next/link"
import { Card, Badge, Title, Text, Divider } from "@tremor/react"
import data from "./data.json"

const triggerColor = (trigger: string) =>
  trigger === "manual" ? "blue" : "violet"

const triggerLabel = (trigger: string) =>
  trigger === "manual" ? "Manual" : "Automated"

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="mb-8">
        <Title className="text-2xl">Research Hub</Title>
        <Text className="mt-1">
          Agent-driven research reports — each topic is autonomously
          investigated and published as an interactive page.
        </Text>
      </div>

      <Divider />

      {/* Research list */}
      <div className="mt-8 space-y-4">
        {data.researches.map((r) => (
          <Card key={r.id}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              {/* Left: content */}
              <div className="flex-1 min-w-0">
                {/* Tags + trigger */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge color={triggerColor(r.trigger)} size="xs">
                    {triggerLabel(r.trigger)}
                  </Badge>
                  {r.tags.map((tag) => (
                    <Badge key={tag} color="gray" size="xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Title */}
                <Title>{r.title}</Title>

                {/* Description */}
                <Text className="mt-1 line-clamp-2">{r.description}</Text>

                {/* Result */}
                {r.result && (
                  <Text className="mt-2 text-tremor-content-emphasis font-medium">
                    {r.result}
                  </Text>
                )}
              </div>

              {/* Right: date + CTA */}
              <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
                <Text className="text-tremor-content-subtle text-xs whitespace-nowrap">
                  {new Date(r.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
                <Link
                  href={r.route}
                  className="inline-flex items-center gap-1.5 rounded-tremor-default bg-tremor-brand px-3 py-1.5 text-sm font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis transition-colors"
                >
                  Show Details →
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty state (only shown when list is empty, kept for future) */}
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
