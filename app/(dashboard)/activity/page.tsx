import { ActivityTimeline } from "@/components/activity/activity-timeline";
import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { activityLogs, publishJobs } from "@/lib/demo-data";

export default function ActivityPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Audit"
        title="Activity logs"
        description="Review product changes, publish attempts, manual actions, sync events, and platform response details."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <ActivityTimeline logs={activityLogs} />
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Error log panel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activityLogs
                .filter((log) => log.severity === "error")
                .map((log) => (
                  <div key={log.id} className="rounded-lg border bg-destructive/5 p-3">
                    <Badge variant="destructive">Error</Badge>
                    <p className="mt-2 font-semibold">{log.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{log.description}</p>
                  </div>
                ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Per-platform responses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {publishJobs.map((job) => (
                <div key={job.id} className="rounded-lg border bg-muted/35 p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold capitalize">{job.platform}</span>
                    <Badge variant={job.status === "failed" ? "destructive" : "muted"}>
                      {job.status.replaceAll("_", " ")}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{job.response}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
