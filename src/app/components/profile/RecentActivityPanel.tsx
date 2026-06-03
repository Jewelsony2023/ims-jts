import { Activity, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { UserActivity } from "../../types/profile";

interface RecentActivityPanelProps {
  activity: UserActivity[];
}

export function RecentActivityPanel({ activity }: RecentActivityPanelProps) {
  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="h-5 w-5 text-emerald-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Activity</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Related Entity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activity.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {item.activity}
                  </div>
                </TableCell>
                <TableCell className="text-slate-600">{item.timestamp}</TableCell>
                <TableCell className="font-medium text-slate-700">
                  {item.relatedEntity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
